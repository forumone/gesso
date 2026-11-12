import type { TwigExtension } from './types.ts';

/**
 * Mocks the unique_id filter: appends a pseudo-random suffix to the value.
 * Unique ID generator via https://stackoverflow.com/a/48593447
 */
const uniqueIdTwigExtension: TwigExtension = twigInstance => {
  twigInstance.extendFilter(
    'unique_id',
    value =>
      `${String(value)}--${(Date.now() * 1000 + Math.random() * 1000)
        .toString(16)
        .replace(/\./g, '')
        .padEnd(14, '0')}`
  );
};

export default uniqueIdTwigExtension;
