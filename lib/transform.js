// @ts-check

const { NaniError, fromArray } = require('nani');

/**
 * @param {import('yaml').ast.AstNode} node
 * @return {node is import('yaml').ast.ScalarNode}
 */
function isScalar(node) {
  const type = node.type;
  return (
    type === 'BLOCK_FOLDED' ||
    type === 'BLOCK_LITERAL' ||
    type === 'PLAIN' ||
    type === 'QUOTE_DOUBLE' ||
    type === 'QUOTE_SINGLE'
  );
}

/** @type {import('./types').ScalarTransformer} */
const brandTransformer = (node, doc, map) => {
  const key = String(node.value);
  const keys = ['gesso', 'palette', ...key.split('.')];

  // @ts-ignore
  const value = doc.getIn(keys);
  if (value === undefined) {
    throw map.errorForRange(`Could not resolve '${key}' in gesso.palette`, node.range);
  }

  return value;
};

/** @type {import('./types').ScalarTransformer} */
const colorTransformer = (node, doc, map) => {
  const key = String(node.value);
  const keys = ['gesso', 'colors', ...key.split('.')];

  // @ts-ignore
  const value = doc.getIn(keys, /* keep node */ true);
  if (value === undefined) {
    throw map.errorForRange(`Could not resolve '${key}' in gesso.colors`, node.range);
  }

  return brandTransformer(value, doc, map);
}

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
    return brandTransformer;
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

    if (prefix === 'color') {
      return colorTransformer;
    }

    return (node, doc, map) => {
      const key = node.value;
      const keys = ['gesso', 'typography', prefix];

      // First, attempt a lookup of the typography at gesso.typography - this'll weed
      // out token declarations we don't know about.
      // @ts-ignore
      if (!doc.getIn(keys)) {
        throw map.errorForRange(`Unknown property "${prefix}`, node.range);
      }

      // Push key onto our nested access array.
      keys.push(/** @type {string | number} */ (key));

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
