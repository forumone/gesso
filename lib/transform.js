// @ts-check

const {
  NaniError,
  fromArray
} = require('nani');

const SassValue = require('./SassValue');

/**
 * @param {import('yaml').ast.AstNode} node
 * @return {node is import('yaml').ast.ScalarNode}
 */
function isScalar(node) {
  const {
    tag,
    type
  } = node;

  return (
    type === 'BLOCK_FOLDED' ||
    type === 'BLOCK_LITERAL' ||
    type === 'PLAIN' ||
    type === 'QUOTE_DOUBLE' ||
    type === 'QUOTE_SINGLE' ||
    // If we have a tagged sass value, always consider it a scalar
    // (even if it's a structured object with a 'fallback' field)
    tag === '!sass'
  );
}

/** @type {import('./types').ScalarTransformer} */
const paletteTransformer = (node, doc, map) => {
  // Bypass key lookups for SassValue objects
  const nodeValue = node.value;
  if (nodeValue instanceof SassValue) {
    return nodeValue;
  }

  // If the value is a quoted string, don't try to look it up anywhere.
  if (node.type === 'QUOTE_DOUBLE' ||
    node.type === 'QUOTE_SINGLE') {
    return identityTransformer(node);
  }

  const key = String(node.value);
  const keys = ['gesso', 'palette', ...key.split('.')];

  // @ts-ignore
  const value = doc.getIn(keys);
  if (value === undefined) {
    throw map.errorForRange(
      `Could not resolve '${key}' in gesso.palette`,
      node.range,
    );
  }

  return value;
};

/** @type {import('./types').ScalarTransformer} */
const colorTransformer = (node, doc, map) => {
  // If the value is a quoted string, don't try to look it up anywhere.
  if (node.type === 'QUOTE_DOUBLE' || node.type === 'QUOTE_SINGLE') {
    return identityTransformer(node);
  }

  const nodeValue = node.value;
  if (nodeValue instanceof SassValue) {
    return nodeValue;
  }

  const key = String(nodeValue);
  const keys = ['gesso', 'colors', ...key.split('.')];

  // Start by checking if the value is a reference to gesso.colors.
  // @ts-ignore
  const value = doc.getIn(keys, /* keep node */ true);
  if (value !== undefined) {
    return paletteTransformer(value, doc, map);
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
  const nodeValue = node.value;
  if (nodeValue instanceof SassValue) {
    return nodeValue;
  }

  const key = String(nodeValue);
  const keys = ['gesso', 'typography', 'font-family', ...key.split('.')];

  // @ts-ignore
  const value = doc.getIn(keys, /* keep node */ true);
  if (value === undefined) {
    throw map.errorForRange(
      `Could not resolve '${key}' in gesso.colors`,
      node.range,
    );
  }

  return identityTransformer(value, doc, map);
};

/** @type {import('./types').ScalarTransformer} */
const identityTransformer = node => node.value;

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
      const nodeValue = node.value;
      if (nodeValue instanceof SassValue) {
        return nodeValue;
      }

      const key = nodeValue;
      const keys = ['gesso', 'typography', prefix];

      // First, attempt a lookup of the typography at gesso.typography - this'll weed
      // out token declarations we don't know about.
      // @ts-ignore
      if (!doc.getIn(keys)) {
        throw map.errorForRange(`Unknown property "${prefix}`, node.range);
      }

      // Push key onto our nested access array.
      keys.push( /** @type {string | number} */ (key));

      // Perform another lookup
      // @ts-ignore
      const value = doc.getIn(keys);
      if (value === undefined) {
        throw map.errorForRange(
          `Could not resolve '${prefix}.${key}'`,
          node.range,
        );
      }

      return (node.value = value);
    };
  }

  return identityTransformer;
}

/**
 * @param {import('./types').ParsedSource} parsed
 * @returns {import('./types').TransformedSource}
 */
function transform(parsed) {
  const map = parsed.map;
  const node = parsed.ast.contents;

  if (node.type !== 'MAP') {
    throw new NaniError('Root document not a YAML map');
  }

  /** @type {Error[]} */
  const errors = [];

  const data = createDataObject(node, []);

  if (errors.length > 0) {
    throw fromArray(errors);
  }

  return {
    ...parsed,
    data,
  };

  /**
   * @param {import('yaml').ast.AstNode} node
   * @param {readonly (string | number)[]} path
   *
   * @return {import('./types').GessoData}
   */
  function createDataObject(node, path) {
    if (isScalar(node)) {
      const visitor = getScalarVisitor(path);
      try {
        return visitor(node, parsed.ast, map);
      } catch (error) {
        errors.push(error);
        return node.value;
      }
    }

    if (node.type === 'MAP') {
      /** @type {import('./types').GessoObject} */
      const data = Object.create(null);

      for (const item of node.items) {
        if (item.type !== 'PAIR') {
          errors.push(
            map.errorForRange(
              `Can't handle non-pair '${item.type}'`,
              item.range,
            ),
          );

          continue;
        }

        const keyNode = item.key;
        if (!isScalar(keyNode)) {
          errors.push(
            map.errorForRange(
              `Can't handle complex key of type '${keyNode.type}'`,
              keyNode.range,
            ),
          );

          continue;
        }

        const key = String(keyNode.value);

        data[key] = createDataObject(item.value, [...path, key]);
      }

      return data;
    }

    if (node.type === 'SEQ') {
      /** @type {import('./types').GessoArray} */
      const data = [];

      for (const [index, item] of node.items.entries()) {
        data.push(createDataObject(item, [...path, index]));
      }

      return data;
    }

    errors.push(
      map.errorForRange(
        `Can't handle YAML node of type '${node.type}'`,
        node.range,
      ),
    );
  }
}

module.exports = transform;
