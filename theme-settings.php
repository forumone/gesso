<?php

/**
 * @file
 * Functions to support theme settings.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_FORM_ID_alter() for system_theme_settings.
 */
function gesso_form_system_theme_settings_alter(array &$form, FormStateInterface $form_state, ?string $form_id = NULL): void {
  // Work-around for a core bug affecting admin themes.
  // See https://www.drupal.org/docs/8/theming-drupal-8/creating-advanced-theme-settings.
  if (isset($form_id)) {
    return;
  }

  if ($form['config_key'] && $form['config_key']['#value']) {
    $theme = explode('.', $form['config_key']['#value'])[0];
  }
  else {
    $theme = \Drupal::theme()->getActiveTheme()->getName();
  }

  $form['back_to_top'] = [
    '#type' => 'details',
    '#title' => t('Back to Top'),
    '#open' => gesso_helper_get_theme_setting('include_back_to_top', $theme) ?? TRUE,
  ];
  $form['back_to_top']['include_back_to_top'] = [
    '#type' => 'checkbox',
    '#title' => t('Include back to top'),
    '#default_value' => gesso_helper_get_theme_setting('include_back_to_top', $theme) ?? TRUE,
  ];
  $form['back_to_top']['threshold'] = [
    '#type' => 'textfield',
    '#title' => t('Back to top threshold'),
    '#description' => t('How far, in pixels, a user should scroll down the page before the back to top component appears'),
    '#default_value' => gesso_helper_get_theme_setting('threshold', $theme) ?? 200,
  ];
  $form['back_to_top']['smooth_scroll'] = [
    '#type' => 'checkbox',
    '#title' => t('Enable smooth scroll'),
    '#description' => t('Whether to animate the scroll back to the top'),
    '#default_value' => gesso_helper_get_theme_setting('smooth_scroll', $theme) ?? TRUE,
  ];

  $form['breadcrumb'] = [
    '#type' => 'details',
    '#title' => t('Breadcrumb'),
    '#open' => TRUE,
  ];
  $form['breadcrumb']['include_current_page_in_breadcrumb'] = [
    '#type' => 'checkbox',
    '#title' => t('Include current page in breadcrumb'),
    '#default_value' => gesso_helper_get_theme_setting('include_current_page_in_breadcrumb', $theme) ?? TRUE,
  ];

  $form['external_links'] = [
    '#type' => 'details',
    '#title' => t('External Links'),
    '#open' => TRUE,
  ];
  $form['external_links']['add_external_link_icons'] = [
    '#type' => 'checkbox',
    '#title' => t('Add icons to external links'),
    '#default_value' => gesso_helper_get_theme_setting('add_external_link_icons', $theme) ?? FALSE,
  ];
  $form['external_links']['exit_disclaimer'] = [
    '#type' => 'textfield',
    '#title' => t('Exit Disclaimer'),
    '#description' => t('Disclaimer text used for exit links.'),
    '#default_value' => gesso_helper_get_theme_setting('exit_disclaimer', $theme) ?? 'Exit this website',
  ];
  $form['external_links']['allowed_domains'] = [
    '#type' => 'textarea',
    '#title' => t('Allowed Domains'),
    '#description' => t('Links with these domains won’t get external link icons. Enter multiple domains on separate lines.'),
    '#default_value' => gesso_helper_get_theme_setting('allowed_domains', $theme) ?? "example-allowed-domain.com\nforumone.github.io",
  ];
  $form['external_links']['allowed_links'] = [
    '#type' => 'textarea',
    '#title' => t('Allowed Links'),
    '#description' => t('Links with these URLs (typically used for social media) won’t get external link icons. Enter multiple links on separate lines.'),
    '#default_value' => gesso_helper_get_theme_setting('allowed_links', $theme) ?? "https://www.vimeo.com/example-allowed-link\nhttps://www.youtube.com/example-allowed-link",
  ];
}
