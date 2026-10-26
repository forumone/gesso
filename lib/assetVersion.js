function assetVersion(twigInstance) {
  // Mirrors the gesso_helper asset_version() Twig function. Outside Drupal
  // (e.g., Storybook) there is no version, so an empty string is returned.
  twigInstance.extendFunction(
    'asset_version',
    () => window.drupalSettings?.gesso?.assetVersion ?? ''
  );
}

export default assetVersion;
