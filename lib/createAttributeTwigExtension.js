/**
 * Mocks the Drupal create_attribute() Twig function.
 * For Storybook, just returns an object containing any attributes you put it.
 * @see https://www.drupal.org/docs/develop/theming-drupal/twig-in-drupal/functions-in-twig-templates#s-create-attributeattributes
 * @param startingAttributes
 * @returns {{}}
 */
function createAttributes(startingAttributes = {}) {
  return startingAttributes;
}

/**
 * Creates the Twig extension for create_attribute.
 * @param Twig
 */
function createAttributesTwigExtension(Twig) {
  Twig.extendFunction('create_attribute', createAttributes);
}

export default createAttributesTwigExtension;
