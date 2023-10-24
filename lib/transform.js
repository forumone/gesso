// @ts-check

const { NaniError, fromArray, iterate } = require('nani');

const { isMap, isSeq, isPair, isScalar: libIsScalar } = require('yaml');
const { SassValue } = require('./SassValue');

/**
 * @param {import('yaml').ParsedNode} node
 * @returns {node is import('yaml').Scalar}
 */
function isScalar(node) {
  const { tag } = node;

  return (
    libIsScalar(node) ||
    // If we have a tagged sass value, always consider it a scalar
    // (even if it's a structured object with a 'fallback' field)
    tag === '!sass'
  );
}

/** @type {import('./types').ScalarTransformer} */
const identityTransformer = (node, _doc, _map) => node.value;

/** @type {import('./types').ScalarTransformer} */
const paletteTransformer = (node, doc, map) => {
  const value = node instanceof SassValue ? node : node.value;

  // Bypass key lookups for SassValue objects
  if (value instanceof SassValue) {
    return value;
  }

  // If the value is a quoted string, don't try to look it up anywhere.
  if (node.type === 'QUOTE_DOUBLE' || node.type === 'QUOTE_SINGLE') {
    return identityTransformer(node, doc, map);
  }

  const key = String(value);
  const keys = ['gesso', 'palette', ...key.split('.')];

  const valueByKey = /** @type {import('./types').GessoScalar | undefined } */ (
    doc.getIn(keys)
  );
  if (valueByKey === undefined) {
    if (node.range) {
      throw map.errorForRange(
        `Could not resolve '${key}' in gesso.palette`,
        node.range
      );
    } else {
      throw new NaniError(`Could not resolve '${key}' in gesso.palette`);
    }
  }

  return valueByKey;
};

/** @type {import('./types').ScalarTransformer} */
const colorTransformer = (node, doc, map) => {
  // If the value is a quoted string, don't try to look it up anywhere.
  if (node.type === 'QUOTE_DOUBLE' || node.type === 'QUOTE_SINGLE') {
    return identityTransformer(node, doc, map);
  }

  const value = node instanceof SassValue ? node : node.value;

  if (value instanceof SassValue) {
    return value;
  }

  const key = String(value);
  const keys = ['gesso', 'colors', ...key.split('.')];

  // Start by checking if the value is a reference to gesso.colors.
  const valueByKey =
    /** @type {import('yaml').Scalar<import('./types').GessoScalar> | undefined } */ (
      doc.getIn(keys, /* keep node */ true)
    );
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

/** @type {import('./types').ScalarTransformer} */
const fontFamilyTransformer = (node, doc, map) => {
  const value = node instanceof SassValue ? node : node.value;

  if (value instanceof SassValue) {
    return value;
  }

  const key = String(value);
  const keys = ['gesso', 'typography', 'font-family', ...key.split('.')];

  const valueByKey =
    /** @type {import('yaml').Scalar<import('./types').GessoScalar> | undefined } */ (
      doc.getIn(keys, /* keep node */ true)
    );
  if (valueByKey === undefined) {
    if (node.range) {
      throw map.errorForRange(
        `Could not resolve '${key}' in gesso.colors`,
        node.range
      );
    } else {
      throw new NaniError(`Could not resolve '${key}' in gesso.colors`);
    }
  }

  return identityTransformer(valueByKey, doc, map);
};

/**
 * @param {readonly (string | number)[]} path
 *
 * @return {import('./types').ScalarTransformer}
 */
function getScalarVisitor(path) {
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

    if (prefix === 'letter-spacing') {
      return identityTransformer;
    }

    if (prefix === 'font-style') {
      return identityTransformer;
    }

    if (prefix === 'text-transform') {
      return identityTransformer;
    }

    if (prefix === 'responsive-font-size') {
      return identityTransformer;
    }

    if (prefix === 'color') {
      return colorTransformer;
    }

    if (prefix === 'font-family') {
      return fontFamilyTransformer;
    }

    return (node, doc, map) => {
      const value = node instanceof SassValue ? node : node.value;

      if (value instanceof SassValue) {
        return value;
      }

      const key = value;
      const keys = ['gesso', 'typography', prefix];

      // First, attempt a lookup of the typography at gesso.typography - this'll weed
      // out token declarations we don't know about.
      if (!doc.getIn(keys)) {
        if (node.range) {
          throw map.errorForRange(`Unknown property "${prefix}`, node.range);
        } else {
          throw new NaniError(`Unknown property "${prefix}`);
        }
      } else {
        // Push key onto our nested access array.
        keys.push(/** @type {string | number} */ (key));

        // Perform another lookup
        const valueByKey =
          /** @type {import('./types').GessoScalar | undefined } */ (
            doc.getIn(keys)
          );
        if (
          valueByKey === null ||
          valueByKey === undefined ||
          (typeof valueByKey === 'object' &&
            Object.keys(valueByKey).length === 0)
        ) {
          if (node.range) {
            throw map.errorForRange(
              `Could not resolve '${prefix}.${key}'`,
              node.range
            );
          } else {
            throw new NaniError(`Could not resolve '${prefix}.${key}'`);
          }
        } else {
          node.value = valueByKey;
          return node.value;
        }
      }
    };
  }

  return (node, doc, map) =>
    node instanceof SassValue ? node : identityTransformer(node, doc, map);
}

/**
 * @param {import('yaml').ParsedNode} node
 * @param {readonly (string | number)[]} path
 * @param {import('./CodeMap')} map
 * @param {import('./types').ParsedSource<import('yaml').ParsedNode, true>} parsed
 * @param {Error[]} errors
 *
 * @returns {import('./types').GessoScalar | import('./types').GessoObject | import('./types').GessoArray}
 */
function createDataObject(node, path, map, parsed, errors) {
  if (isScalar(node)) {
    const visitor = getScalarVisitor(path);
    try {
      return visitor(
        /** @type {import('yaml').Scalar<import('./types').GessoScalar>} */ (
          node
        ),
        parsed.ast,
        map
      );
    } catch (error) {
      if (
        error instanceof Error &&
        !errors.some(err => err.message === error.message)
      ) {
        errors.push(error);
      }
      return /** @type {import('yaml').Scalar<import('./types').GessoScalar>} */ (
        node
      ).value;
    }
  }

  if (isMap(node)) {
    /** @type {import('./types').GessoObject} */
    const data = Object.create(null);

    node.items.forEach(item => {
      if (!isPair(item)) {
        errors.push(
          map.errorForRange(`Can't handle non-pair '${item}'`, node.range)
        );
      } else {
        const keyNode = item.key;
        if (!isScalar(keyNode)) {
          errors.push(
            map.errorForRange(
              `Can't handle complex key '${keyNode}'`,
              keyNode.range
            )
          );
        } else {
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
        }
      }
    });

    return data;
  }

  if (isSeq(node)) {
    /** @type {import('./types').GessoArray} */
    const data = [];

    // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries
    // eslint-disable-next-line no-restricted-syntax
    for (const [index, item] of node.items.entries()) {
      data.push(createDataObject(item, [...path, index], map, parsed, errors));
    }

    return data;
  }

  errors.push(
    map.errorForRange(`Can't handle YAML node '${node}'`, node.range)
  );
  return false;
}

/**
 * @param {import('./types').ParsedSource<import('yaml').ParsedNode, true>} parsed
 * @returns {import('./types').TransformedSource}
 */
function transform(parsed) {
  const { map } = parsed;
  const node = parsed.ast.contents;

  if (!isMap(node)) {
    throw new NaniError('Root document not a YAML map.');
  }

  /** @type {Error[]} */
  const errors = [];

  const data = createDataObject(node, [], map, parsed, errors);

  if (typeof data !== 'object' || !('gesso' in data)) {
    throw new NaniError('Root document does not contain a gesso object.');
  }

  if (errors.length > 0) {
    const multiError = fromArray(errors);
    if (typeof multiError === 'object') {
      // @see https://sripberger.github.io/nani/#iterate
      // eslint-disable-next-line no-restricted-syntax
      for (const err of iterate(
        /** @type {import('nani').MultiError} */ (multiError)
      )) {
        // eslint-disable-next-line no-console
        console.error(err.message);
      }
      throw new NaniError('Failed to transform design tokens');
    } else {
      throw multiError;
    }
  }

  return /** @type {import('./types').TransformedSource} */ ({
    ...parsed,
    data,
  });
}

module.exports = transform;
