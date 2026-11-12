import { isRecord } from '../utils/isRecord.ts';
import type { TwigExtension } from './types.ts';

/**
 * Mocks the Drupal create_attribute() Twig function.
 * For Storybook, just returns an object containing any attributes you put it.
 * @see https://www.drupal.org/docs/develop/theming-drupal/twig-in-drupal/functions-in-twig-templates#s-create-attributeattributes
 */
function createAttribute(
  startingAttributes: unknown = {}
): Record<string, unknown> {
  return isRecord(startingAttributes) ? startingAttributes : {};
}

/**
 * Creates the Twig extension for create_attribute.
 */
const createAttributeTwigExtension: TwigExtension = Twig => {
  Twig.extendFunction('create_attribute', createAttribute);
};

export default createAttributeTwigExtension;
