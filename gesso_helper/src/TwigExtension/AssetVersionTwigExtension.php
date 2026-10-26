<?php

namespace Drupal\gesso_helper\TwigExtension;

use Drupal\Core\Asset\AssetQueryStringInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

/**
 * Gesso theme twig extension for cache-busting static theme assets.
 */
class AssetVersionTwigExtension extends AbstractExtension {

  /**
   * Constructs an AssetVersionTwigExtension object.
   *
   * @param \Drupal\Core\Asset\AssetQueryStringInterface $assetQueryString
   *   The asset query string service.
   */
  public function __construct(
    protected AssetQueryStringInterface $assetQueryString,
  ) {}

  /**
   * Provide helper name.
   */
  public function getName(): string {
    return 'gesso_helper_asset_version';
  }

  /**
   * Add asset_version Twig function.
   */
  public function getFunctions(): array {
    $functions = parent::getFunctions();
    $functions[] = new TwigFunction('asset_version', $this->assetVersion(...));
    return $functions;
  }

  /**
   * Return the current asset version string.
   *
   * This is the same value Drupal appends to CSS and JS URLs, and it changes
   * whenever all caches are flushed (e.g., on deployment).
   */
  public function assetVersion(): string {
    return $this->assetQueryString->get();
  }

}
