import type { TwigExtension } from './types.ts';

/**
 * Mocks the subheading_level filter: "h2" becomes "h3", capped at "h6". Other
 * strings are lowercased. Non-string values are returned unchanged.
 */
const subheadingLevelTwigExtension: TwigExtension = twigInstance => {
  twigInstance.extendFilter('subheading_level', value => {
    if (typeof value !== 'string') {
      return value;
    }
    const lowerValue = value.toLowerCase();
    const matches = /^h(\d)$/.exec(lowerValue);
    if (matches !== null) {
      const newLevel = Math.min(Number(matches[1]) + 1, 6);
      return `h${newLevel}`;
    }
    return lowerValue;
  });
};

export default subheadingLevelTwigExtension;
