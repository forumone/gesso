import type { TwigExtension } from './types.ts';

interface WindowWithDrupalSettings {
  drupalSettings?: { gesso?: { assetVersion?: unknown } };
}

/**
 * Mirrors the gesso_helper asset_version() Twig function. Outside Drupal
 * (e.g., Storybook) there is no version, so an empty string is returned.
 */
const assetVersionTwigExtension: TwigExtension = twigInstance => {
  twigInstance.extendFunction('asset_version', () => {
    if (typeof window === 'undefined') {
      return '';
    }
    const { drupalSettings } = window as WindowWithDrupalSettings;
    return drupalSettings?.gesso?.assetVersion ?? '';
  });
};

export default assetVersionTwigExtension;
