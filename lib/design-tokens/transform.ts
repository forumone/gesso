import { NaniError, fromArray, iterate } from 'nani';
import {
  isMap,
  isSeq,
  isPair,
  isScalar as libIsScalar,
  type ParsedNode,
  type Scalar,
} from 'yaml';

import { isRecord } from '../utils/isRecord.ts';
import type { CodeMap } from './CodeMap.ts';
import { SassValue } from './SassValue.ts';
import type {
  GessoArray,
  GessoObject,
  GessoScalar,
  ParsedSource,
  ScalarTransformer,
  TransformedSource,
} from './types.ts';

type Path = readonly (string | number)[];

type TransformedNode = GessoScalar | GessoObject | GessoArray;

/**
 * Determines whether a node should be treated as a scalar.
 */
export function isScalar(node: ParsedNode): node is Scalar.Parsed {
  const { tag } = node;

  return (
    libIsScalar(node) ||
    // If we have a tagged sass value, always consider it a scalar
    // (even if it's a structured object with a 'fallback' field)
    tag === '!sass'
  );
}

/**
 * Returns the node as a SassValue if it is one. The `!sass` single-value
 * shorthand (`foo: !sass some-function(a, b)`) is parsed by the yaml package as
 * a plain scalar carrying the `!sass` tag, so it is converted here.
 */
export function asSassValue(node: unknown): SassValue | undefined {
  if (node instanceof SassValue) {
    return node;
  }
  if (libIsScalar(node) && node.tag === '!sass') {
    return new SassValue(undefined, node.value);
  }
  return undefined;
}

/**
 * The scalar visitors may receive a Scalar, or a SassValue (a map node that is
 * treated as a scalar). This returns whichever is the "value" of the node.
 */
function nodeValue(node: Scalar<GessoScalar>): GessoScalar {
  return asSassValue(node) ?? node.value;
}

function isQuoted(node: Scalar): boolean {
  return node.type === 'QUOTE_DOUBLE' || node.type === 'QUOTE_SINGLE';
}

function throwForNode(map: CodeMap, node: Scalar, message: string): never {
  if (node.range) {
    throw map.errorForRange(message, node.range);
  }
  throw new NaniError(message);
}

export const identityTransformer: ScalarTransformer = (node, _doc, _map) =>
  node.value;

export const paletteTransformer: ScalarTransformer = (node, doc, map) => {
  const value = nodeValue(node);

  // Bypass key lookups for SassValue objects
  if (value instanceof SassValue) {
    return value;
  }

  // If the value is a quoted string, don't try to look it up anywhere.
  if (isQuoted(node)) {
    return identityTransformer(node, doc, map);
  }

  const key = String(value);
  const keys = ['gesso', 'palette', ...key.split('.')];

  const valueByKey = doc.getIn(keys) as GessoScalar | undefined;
  if (valueByKey === undefined) {
    return throwForNode(
      map,
      node,
      `Could not resolve '${key}' in gesso.palette`
    );
  }

  return valueByKey;
};

export const colorTransformer: ScalarTransformer = (node, doc, map) => {
  // If the value is a quoted string, don't try to look it up anywhere.
  if (isQuoted(node)) {
    return identityTransformer(node, doc, map);
  }

  const value = nodeValue(node);

  if (value instanceof SassValue) {
    return value;
  }

  const key = String(value);
  const keys = ['gesso', 'colors', ...key.split('.')];

  // Start by checking if the value is a reference to gesso.colors.
  const valueByKey = doc.getIn(keys, /* keep node */ true) as
    Scalar<GessoScalar> | undefined;
  if (valueByKey !== undefined) {
    return paletteTransformer(valueByKey, doc, map);
  }
  // If it's not, we have three possibilities:
  // 1) It's actually a palette color.
  // 2) It's an invalid key.
  // 3) It's actually a string we want to use as-is.
  // Since the paletteTransformer can handle all of these cases,
  // just kick it over there and let it throw any errors.
  return paletteTransformer(node, doc, map);
};

export const fontFamilyTransformer: ScalarTransformer = (node, doc, map) => {
  const value = nodeValue(node);

  if (value instanceof SassValue) {
    return value;
  }

  const key = String(value);
  const keys = ['gesso', 'typography', 'font-family', ...key.split('.')];

  const valueByKey = doc.getIn(keys, /* keep node */ true) as
    Scalar<GessoScalar> | undefined;

  if (valueByKey === undefined) {
    return throwForNode(
      map,
      node,
      `Could not resolve '${key}' in gesso.typography.font-family`
    );
  }

  const sassValue = asSassValue(valueByKey);
  if (sassValue) {
    return sassValue;
  }

  return identityTransformer(valueByKey, doc, map);
};

/**
 * Resolves a value in a `gesso.typography.display.*` entry by looking it up in
 * the matching `gesso.typography.<prefix>` group.
 */
function createTypographyTransformer(
  prefix: string | number | undefined
): ScalarTransformer {
  return (node, doc, map) => {
    const value = nodeValue(node);

    if (value instanceof SassValue) {
      return value;
    }

    const keys: (string | number)[] = ['gesso', 'typography', String(prefix)];

    // First, attempt a lookup of the typography at gesso.typography - this'll weed
    // out token declarations we don't know about.
    if (!doc.getIn(keys)) {
      return throwForNode(map, node, `Unknown property "${prefix}"`);
    }

    // Push key onto our nested access array.
    keys.push(value as string | number);

    // Perform another lookup
    const valueByKey = doc.getIn(keys) as GessoScalar | undefined;
    if (
      valueByKey === null ||
      valueByKey === undefined ||
      (typeof valueByKey === 'object' && Object.keys(valueByKey).length === 0)
    ) {
      return throwForNode(map, node, `Could not resolve '${prefix}.${value}'`);
    }

    node.value = valueByKey;
    return valueByKey;
  };
}

export function getScalarVisitor(path: Path): ScalarTransformer {
  // You are here: ['gesso', 'colors', ...]
  if (path.length > 2 && path[0] === 'gesso' && path[1] === 'colors') {
    return paletteTransformer;
  }

  // NB. You are here: ['gesso', 'typography', 'display', *, key]
  if (
    path.length === 5 &&
    path[0] === 'gesso' &&
    path[1] === 'typography' &&
    path[2] === 'display'
  ) {
    const prefix = path[4];

    if (
      prefix === 'font-style' ||
      prefix === 'text-transform' ||
      prefix === 'responsive-font-size'
    ) {
      return identityTransformer;
    }

    if (prefix === 'color') {
      return colorTransformer;
    }

    if (prefix === 'font-family') {
      return fontFamilyTransformer;
    }

    return createTypographyTransformer(prefix);
  }

  return (node, doc, map) =>
    asSassValue(node) ?? identityTransformer(node, doc, map);
}

export function createDataObject(
  node: ParsedNode,
  path: Path,
  map: CodeMap,
  parsed: ParsedSource<ParsedNode, true>,
  errors: Error[]
): TransformedNode {
  if (isScalar(node)) {
    const sassValue = asSassValue(node);
    if (sassValue) {
      return sassValue;
    }

    const visitor = getScalarVisitor(path);
    try {
      return visitor(node as Scalar<GessoScalar>, parsed.ast, map);
    } catch (error) {
      if (
        error instanceof Error &&
        !errors.some(err => err.message === error.message)
      ) {
        errors.push(error);
      }
      return (node as Scalar<GessoScalar>).value;
    }
  }

  if (isMap(node)) {
    const data: GessoObject = Object.create(null) as GessoObject;

    node.items.forEach(item => {
      if (!isPair(item)) {
        errors.push(
          map.errorForRange(
            `Can't handle non-pair '${String(item)}'`,
            node.range
          )
        );
        return;
      }
      const keyNode = item.key;
      if (!isScalar(keyNode)) {
        errors.push(
          map.errorForRange(
            `Can't handle complex key '${String(keyNode)}'`,
            keyNode.range
          )
        );
        return;
      }
      const key = String(keyNode.value);
      if (item.value) {
        data[key] = createDataObject(
          item.value,
          [...path, key],
          map,
          parsed,
          errors
        );
      }
    });

    return data;
  }

  if (isSeq(node)) {
    const data: GessoArray = [];

    node.items.forEach((item, index) => {
      data.push(createDataObject(item, [...path, index], map, parsed, errors));
    });

    return data;
  }

  errors.push(
    map.errorForRange(`Can't handle YAML node '${String(node)}'`, node.range)
  );
  return false;
}

function isGessoObject(value: unknown): value is GessoObject {
  return isRecord(value) && !(value instanceof SassValue);
}

export function transform(
  parsed: ParsedSource<ParsedNode, true>
): TransformedSource {
  const { map } = parsed;
  const node = parsed.ast.contents;

  if (!isMap(node)) {
    throw new NaniError('Root document not a YAML map.');
  }

  const errors: Error[] = [];

  const data = createDataObject(node, [], map, parsed, errors);

  if (!isGessoObject(data) || !isGessoObject(data['gesso'])) {
    throw new NaniError('Root document does not contain a gesso object.');
  }

  if (errors.length > 0) {
    const multiError = fromArray(errors);
    if (multiError !== null) {
      // @see https://sripberger.github.io/nani/#iterate
      for (const err of iterate(multiError)) {
        console.error(err.message);
      }
    }
    throw new NaniError('Failed to transform design tokens');
  }

  return {
    ...parsed,
    data: { ...data, gesso: data['gesso'] },
  };
}
