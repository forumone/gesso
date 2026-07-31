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
    = gesso_helper_get_theme_setting('include_back_to_top') ?? TRUE;
  /** @var \Drupal\Core\Render\Renderer $renderer */
  $renderer = \Drupal::service('renderer');
  $themeName = \Drupal::theme()->getActiveTheme()->getName();
  $themeConfig = \Drupal::config($themeName . '.settings');
  $renderer->addCacheableDependency($variables, $themeConfig);
}

/**
 * Implements hook_page_attachments_alter().
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
    $renderer->addCacheableDependency($attachments, $themeConfig);
  }
}
