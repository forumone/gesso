<?php

/**
 * @file
 * HTML-related hook implementations.
 */

/**
 * Implements hook_preprocess().
 *
 * @phpstan-param array<string, mixed> $variables
 *   The template variables.
 */
function gesso_preprocess(array &$variables): void {
  if (!empty($variables['directory'])) {
    $variables['image_path'] = '/' . $variables['directory'] . '/dist/images';
    $variables['#attached']['drupalSettings']['gesso']['imagePath'] = '/' . $variables['directory'] . '/dist/images';
    // Used to cache-bust the SVG sprite when it is referenced from JS.
    $variables['#attached']['drupalSettings']['gesso']['assetVersion'] = \Drupal::service('asset.query_string')->get();
  }
}

/**
 * Implements hook_preprocess_HOOK().
 *
 * @phpstan-param array<string, mixed> $variables
 *   The template variables.
 */
function gesso_preprocess_html(array &$variables): void {
  $variables['include_back_to_top']
    = gesso_helper_get_theme_setting('include_back_to_top') ?? TRUE;
  /** @var \Drupal\Core\Render\Renderer $renderer */
  $renderer = \Drupal::service('renderer');
  $themeName = \Drupal::theme()->getActiveTheme()->getName();
  $themeConfig = \Drupal::config($themeName . '.settings');
  // Renderer::addCacheableDependency() takes an untyped array by reference,
  // so cacheability metadata is exchanged through an isolated local array
  // rather than passing $variables directly through that looser boundary.
  $cacheable = ['#cache' => $variables['#cache'] ?? []];
  $renderer->addCacheableDependency($cacheable, $themeConfig);
  $variables['#cache'] = $cacheable['#cache'];
}

/**
 * Implements hook_page_attachments_alter().
 *
 * @phpstan-param array<string, mixed> $attachments
 *   The attachments array.
 */
function gesso_page_attachments_alter(array &$attachments): void {
  $include_back_to_top = gesso_helper_get_theme_setting('include_back_to_top') ?? TRUE;
  $add_external_link_icons = gesso_helper_get_theme_setting('add_external_link_icons') ?? FALSE;

  if ($include_back_to_top || $add_external_link_icons) {
    if ($include_back_to_top) {
      $attachments['#attached']['drupalSettings']['gesso']['backToTopThreshold']
        = gesso_helper_get_theme_setting('threshold') ?? 200;
      $attachments['#attached']['drupalSettings']['gesso']['backToTopSmoothScroll']
        = gesso_helper_get_theme_setting('smooth_scroll') ?? TRUE;
    }

    if ($add_external_link_icons) {
      $attachments['#attached']['library'][] = 'gesso/external_link';
      $attachments['#attached']['drupalSettings']['gesso']['externalLinkExitDisclaimer']
        = gesso_helper_get_theme_setting('exit_disclaimer') ?? 'Exit this website';
      $attachments['#attached']['drupalSettings']['gesso']['externalLinkAllowedDomains']
        = explode(
          "\n",
          str_replace(
            ["\r\n", "\r"],
            "\n",
            trim(gesso_helper_get_theme_setting('allowed_domains') ?? '')
          )
        );
      $attachments['#attached']['drupalSettings']['gesso']['externalLinkAllowedLinks']
        = explode(
          "\n",
          str_replace(
            ["\r\n", "\r"],
            "\n",
            trim(gesso_helper_get_theme_setting('allowed_links') ?? '')
          )
        );
    }

    /** @var \Drupal\Core\Render\Renderer $renderer */
    $renderer = \Drupal::service('renderer');
    $themeName = \Drupal::theme()->getActiveTheme()->getName();
    $themeConfig = \Drupal::config($themeName . '.settings');
    // Renderer::addCacheableDependency() takes an untyped array by reference,
    // so cacheability metadata is exchanged through an isolated local array
    // rather than passing $attachments directly through that looser boundary.
    $cacheable = ['#cache' => $attachments['#cache'] ?? []];
    $renderer->addCacheableDependency($cacheable, $themeConfig);
    $attachments['#cache'] = $cacheable['#cache'];
  }
}
