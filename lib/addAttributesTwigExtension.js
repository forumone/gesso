// @ts-check

/**
 * Generates an attributes string
 * @param {{[key: string]: any}} [additionalAttributes]
 * @param {string} [_originalAttributes]
 * @return {string}
 */
function handleAddAttributes(
  additionalAttributes = {},
  _originalAttributes = ''
) {
  const attributes = Object.entries(additionalAttributes).map(
    ([key, value]) => {
      // Exclude the _keys array and any attributes that are null, false, or
      // undefined.
      if (
        key === '_keys' ||
        value === null ||
        typeof value === 'undefined' ||
        value === false
      ) {
        return null;
      }
      // If multiples items in value as array (e.g., class: ['one', 'two']).
      if (Array.isArray(value)) {
        return `${key}="${value.join(' ')}"`;
      }
      if (typeof value === 'string' && value.includes('=')) {
        return value;
      }
      return `${key}="${value}"`;
    }
  );

  return attributes.join(' ');
}

/**
 * Emulates add_attributes in Twig JS.
 * Forked from https://www.npmjs.com/package/add-attributes-twig-extension
 * @param {import('twig').Twig} Twig
 */
function addAttributesTwigExtension(Twig) {
  Twig.extendFunction('add_attributes', handleAddAttributes);
}

export default addAttributesTwigExtension;
