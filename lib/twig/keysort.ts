import { isRecord } from '../utils/isRecord.ts';
import type { TwigExtension } from './types.ts';

/**
 * Whether a key is a plain number ("2", "10", "1.5"), to be sorted numerically.
 */
function isNumericKey(key: string): boolean {
  return key.trim() !== '' && Number.isFinite(Number(key));
}

/**
 * Compares object keys: numeric keys first, in numeric order, then all other
 * keys in string order.
 */
function compareKeys(a: string, b: string): number {
  const aNumeric = isNumericKey(a);
  const bNumeric = isNumericKey(b);
  if (aNumeric && bNumeric) {
    return Number(a) - Number(b);
  }
  if (aNumeric !== bNumeric) {
    return aNumeric ? -1 : 1;
  }
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
}

/**
 * Mocks the keysort filter (PHP ksort).
 *
 * JS objects always iterate integer-like keys first, in ascending order,
 * regardless of insertion order, so the sorted order can't be stored in the
 * object's own key order. Instead, the result carries the sorted keys in the
 * "_keys" property, which Twig.js uses for iteration order in `for` loops. It
 * is non-enumerable so that it isn't rendered by json_encode, etc.
 */
const keysortTwigExtension: TwigExtension = twigInstance => {
  twigInstance.extendFilter('keysort', value => {
    if (!isRecord(value)) {
      return value;
    }
    const sortedKeys = Object.keys(value)
      .filter(key => key !== '_keys')
      .sort(compareKeys);
    const sorted: Record<string, unknown> = {};
    sortedKeys.forEach(key => {
      sorted[key] = value[key];
    });
    Object.defineProperty(sorted, '_keys', {
      value: sortedKeys,
      enumerable: false,
      writable: true,
      configurable: true,
    });
    return sorted;
  });
};

export default keysortTwigExtension;
