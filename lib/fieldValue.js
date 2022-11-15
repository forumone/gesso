// Stub the field_value filter provided by Twig Field Value in Drupal.
// For Storybook purposes, return the value unchanged.
module.exports = function fieldValue(twigInstance) {
  twigInstance.extendFilter('field_value', value => value);
};
