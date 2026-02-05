// @ts-check

/**
 * Follows the same general process as the PHP Twig Extension:
 * attributes are merged if arrays, overwritten otherwise.
 * @param {{[key: string]: any}} existingAttributes
 * @param {{[key: string]: any}} newAttributes
 */
function mergeAttributes(existingAttributes, newAttributes) {
  const mergedAttributes = { ...existingAttributes };
  // Always treat classes as an array so they can be merged.
  // Drupal takes care of this for us, but for Storybook, we have to do it ourselves.
  if (
    Object.hasOwn(mergedAttributes, 'class') &&
    typeof mergedAttributes.class === 'string'
  ) {
    mergedAttributes.class = [mergedAttributes.class];
  }
  Object.entries(newAttributes).forEach(([key, value]) => {
    const valueAsArray = typeof value === 'string' ? [value] : value;
    if (
      Object.hasOwn(mergedAttributes, key) &&
      Array.isArray(mergedAttributes[key])
    ) {
      mergedAttributes[key] = mergedAttributes[key].concat(valueAsArray);
    } else {
      mergedAttributes[key] = valueAsArray;
    }
  });
  return mergedAttributes;
}

/**
 * Generates an attributes string
 * @param {{[key: string]: any}} [additionalAttributes]
 * @param {string} [originalAttributes]
 * @return {string}
 */
function handleAddAttributes(
  additionalAttributes = {},
  originalAttributes = 'attributes'
) {
  let attributesToAdd = additionalAttributes;
  if (typeof originalAttributes === 'object') {
    attributesToAdd = mergeAttributes(originalAttributes, additionalAttributes);
  } else if (
    typeof originalAttributes === 'string' &&
    originalAttributes.length > 0
  ) {
    const { context } = this;
    let contextAttribute = { ...context };
    originalAttributes.split('.').forEach(attribute => {
      if (!contextAttribute[attribute]) {
        contextAttribute = {};
      } else {
        contextAttribute = contextAttribute[attribute];
      }
    });
    attributesToAdd = mergeAttributes(contextAttribute, additionalAttributes);
  }

  const attributes = Object.entries(attributesToAdd).map(([key, value]) => {
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
  });

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
