import type { TwigExtension } from './types.ts';

/**
 * Stubs the field_value filter provided by Twig Field Value in Drupal.
 * For Storybook purposes, returns the value unchanged.
 */
const fieldValueTwigExtension: TwigExtension = twigInstance => {
  twigInstance.extendFilter('field_value', value => value);
};

export default fieldValueTwigExtension;
