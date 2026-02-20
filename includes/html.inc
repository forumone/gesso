<?php

/**
 * @file
 * HTML-related hook implementations.
 */

/**
 * Implements hook_preprocess().
 */
function gesso_preprocess(array &$variables): void {
  if (!empty($variables['directory'])) {
    $variables['image_path'] = '/' . $variables['directory'] . '/dist/images';
    $variables['#attached']['drupalSettings']['gesso']['imagePath'] = '/' . $variables['directory'] . '/dist/images';
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_html(array &$variables): void {
  $variables['include_back_to_top']
    = theme_get_setting('include_back_to_top') ?? TRUE;
  /** @var \Drupal\Core\Render\Renderer $renderer */
  $renderer = \Drupal::service('renderer');
  $themeConfig = \Drupal::config('gesso.settings');
  $renderer->addCacheableDependency($variables, $themeConfig);
}

/**
 * Implements hook_page_attachments_alter().
 */
function gesso_page_attachments_alter(array &$attachments): void {
  $include_back_to_top = theme_get_setting('include_back_to_top') ?? TRUE;
  $add_external_link_icons = theme_get_setting('add_external_link_icons') ?? FALSE;

  if ($include_back_to_top || $add_external_link_icons) {
    if ($include_back_to_top) {
      $attachments['#attached']['drupalSettings']['gesso']['backToTopThreshold']
        = theme_get_setting('threshold');
      $attachments['#attached']['drupalSettings']['gesso']['backToTopSmoothScroll']
        = theme_get_setting('smooth_scroll');
    }

    if ($add_external_link_icons) {
      $attachments['#attached']['library'][] = 'core/components.gesso--external-link';
      $attachments['#attached']['drupalSettings']['gesso']['externalLinkExitDisclaimer']
        = theme_get_setting('exit_disclaimer');
      $attachments['#attached']['drupalSettings']['gesso']['externalLinkAllowedDomains']
        = explode(
          "\n",
          str_replace(
            ["\r\n", "\r"],
            "\n",
            trim(theme_get_setting('allowed_domains'))
          )
        );
      $attachments['#attached']['drupalSettings']['gesso']['externalLinkAllowedLinks']
        = explode(
          "\n",
          str_replace(
            ["\r\n", "\r"],
            "\n",
            trim(theme_get_setting('allowed_links'))
          )
        );
    }

    /** @var \Drupal\Core\Render\Renderer $renderer */
    $renderer = \Drupal::service('renderer');
    $themeConfig = \Drupal::config('gesso.settings');
    $renderer->addCacheableDependency($attachments, $themeConfig);
  }
}
