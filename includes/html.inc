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
  /** @var \Drupal\Core\Extension\ThemeSettingsProvider $themeSettings */
  $themeSettings = \Drupal::service('Drupal\Core\Extension\ThemeSettingsProvider');
  $variables['include_back_to_top']
    = $themeSettings->getSetting('include_back_to_top') ?? TRUE;
  /** @var \Drupal\Core\Render\Renderer $renderer */
  $renderer = \Drupal::service('renderer');
  $themeConfig = \Drupal::config('gesso.settings');
  $renderer->addCacheableDependency($variables, $themeConfig);
}

/**
 * Implements hook_page_attachments_alter().
 */
function gesso_page_attachments_alter(array &$attachments): void {
  /** @var \Drupal\Core\Extension\ThemeSettingsProvider $themeSettings */
  $themeSettings = \Drupal::service('Drupal\Core\Extension\ThemeSettingsProvider');
  $include_back_to_top = $themeSettings->getSetting('include_back_to_top') ?? TRUE;
  $add_external_link_icons = $themeSettings->getSetting('add_external_link_icons') ?? FALSE;

  if ($include_back_to_top || $add_external_link_icons) {
    if ($include_back_to_top) {
      $attachments['#attached']['drupalSettings']['gesso']['backToTopThreshold']
        = $themeSettings->getSetting('threshold');
      $attachments['#attached']['drupalSettings']['gesso']['backToTopSmoothScroll']
        = $themeSettings->getSetting('smooth_scroll');
    }

    if ($add_external_link_icons) {
      $attachments['#attached']['library'][] = 'gesso/external-link';
      $attachments['#attached']['drupalSettings']['gesso']['externalLinkExitDisclaimer']
        = $themeSettings->getSetting('exit_disclaimer');
      $attachments['#attached']['drupalSettings']['gesso']['externalLinkAllowedDomains']
        = explode(
          "\n",
          str_replace(
            ["\r\n", "\r"],
            "\n",
            trim($themeSettings->getSetting('allowed_domains'))
          )
        );
      $attachments['#attached']['drupalSettings']['gesso']['externalLinkAllowedLinks']
        = explode(
          "\n",
          str_replace(
            ["\r\n", "\r"],
            "\n",
            trim($themeSettings->getSetting('allowed_links'))
          )
        );
    }

    /** @var \Drupal\Core\Render\Renderer $renderer */
    $renderer = \Drupal::service('renderer');
    $themeConfig = \Drupal::config('gesso.settings');
    $renderer->addCacheableDependency($attachments, $themeConfig);
  }
}
