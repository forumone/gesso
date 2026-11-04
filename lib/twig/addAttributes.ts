import { isRecord } from '../utils/isRecord.ts';
import type { TwigExtension, TwigTemplateScope } from './types.ts';

type Attributes = Record<string, unknown>;

/**
 * Follows the same general process as the PHP Twig Extension:
 * attributes are merged if arrays, overwritten otherwise.
 */
function mergeAttributes(
  existingAttributes: Attributes,
  newAttributes: Attributes
): Attributes {
  const mergedAttributes: Attributes = { ...existingAttributes };
  // Always treat classes as an array so they can be merged.
  // Drupal takes care of this for us, but for Storybook, we have to do it ourselves.
  if (typeof mergedAttributes.class === 'string') {
    mergedAttributes.class = [mergedAttributes.class];
  }
  Object.entries(newAttributes).forEach(([key, value]) => {
    // For string values, converts them to an array so they can be merged with
    // existing strings. For other value types (arrays and booleans), leaves
    // as-is.
    const standardizedValue = typeof value === 'string' ? [value] : value;
    const existingValue = mergedAttributes[key];
    if (Array.isArray(existingValue)) {
      mergedAttributes[key] = existingValue.concat(standardizedValue);
    } else {
      mergedAttributes[key] = standardizedValue;
    }
  });
  return mergedAttributes;
}

/**
 * Looks up a dot-separated path (e.g., "foo.attrs") in the template context.
 * Returns an empty object if any part of the path is missing or isn't an object.
 */
function findContextAttributes(context: Attributes, path: string): Attributes {
  let found: unknown = context;
  for (const segment of path.split('.')) {
    if (!isRecord(found) || !found[segment]) {
      return {};
    }
    found = found[segment];
  }
  return isRecord(found) ? found : {};
}

/**
 * Generates an attributes string.
 */
function handleAddAttributes(
  this: TwigTemplateScope,
  additionalAttributes: unknown = {},
  originalAttributes: unknown = 'attributes'
): string {
  const additional = isRecord(additionalAttributes) ? additionalAttributes : {};
  let attributesToAdd = additional;
  if (typeof originalAttributes === 'object') {
    attributesToAdd = mergeAttributes(
      isRecord(originalAttributes) ? originalAttributes : {},
      additional
    );
  } else if (
    typeof originalAttributes === 'string' &&
    originalAttributes.length > 0
  ) {
    attributesToAdd = mergeAttributes(
      findContextAttributes(this.context, originalAttributes),
      additional
    );
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
    // Boolean attributes (e.g., inert, disabled) render bare, with no value.
    if (value === true) {
      return key;
    }
    // If multiples items in value as array (e.g., class: ['one', 'two']).
    if (Array.isArray(value)) {
      const escaped = value.join(' ').replace(/"/g, '&quot;');
      return `${key}="${escaped}"`;
    }
    if (typeof value === 'string' && value.includes('=')) {
      return value;
    }
    return `${key}="${String(value)}"`;
  });

  return attributes.join(' ');
}

/**
 * Emulates add_attributes in Twig JS.
 * Forked from https://www.npmjs.com/package/add-attributes-twig-extension
 */
const addAttributesTwigExtension: TwigExtension = Twig => {
  Twig.extendFunction('add_attributes', handleAddAttributes);
};

export default addAttributesTwigExtension;
