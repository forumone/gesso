<?php

/**
 * @file
 * Functions to support theme settings.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_FORM_ID_alter() for system_theme_settings.
 */
function gesso_form_system_theme_settings_alter(&$form, FormStateInterface $form_state) {
  // Work-around for a core bug affecting admin themes.
  // See https://www.drupal.org/docs/8/theming-drupal-8/creating-advanced-theme-settings.
  if (isset($form_id)) {
    return;
  }

  $form['back_to_top'] = [
    '#type' => 'details',
    '#title' => t('Back to Top'),
    '#open' => theme_get_setting('include_back_to_top') ?? TRUE,
  ];
  $form['back_to_top']['include_back_to_top'] = [
    '#type' => 'checkbox',
    '#title' => t('Include back to top'),
    '#default_value' => theme_get_setting('include_back_to_top') ?? TRUE,
  ];
  $form['back_to_top']['threshold'] = [
    '#type' => 'textfield',
    '#title' => t('Back to top threshold'),
    '#description' => t('How far, in pixels, a user should scroll down the page before the back to top component appears'),
    '#default_value' => theme_get_setting('threshold') ?? 200,
  ];
  $form['back_to_top']['smooth_scroll'] = [
    '#type' => 'checkbox',
    '#title' => t('Enable smooth scroll'),
    '#description' => t('Whether to animate the scroll back to the top'),
    '#default_value' => theme_get_setting('smooth_scroll') ?? TRUE,
  ];

  $form['breadcrumb'] = [
    '#type' => 'details',
    '#title' => t('Breadcrumb'),
    '#open' => TRUE,
  ];
  $form['breadcrumb']['include_current_page_in_breadcrumb'] = [
    '#type' => 'checkbox',
    '#title' => t('Include current page in breadcrumb'),
    '#default_value' => theme_get_setting('include_current_page_in_breadcrumb') ?? TRUE,
  ];

  $form['external_links'] = [
    '#type' => 'details',
    '#title' => t('External Links'),
    '#open' => TRUE,
  ];
  $form['external_links']['add_external_link_icons'] = [
    '#type' => 'checkbox',
    '#title' => t('Add icons to external links'),
    '#default_value' => theme_get_setting('add_external_link_icons') ?? FALSE,
  ];
  $form['external_links']['exit_disclaimer'] = [
    '#type' => 'textfield',
    '#title' => t('Exit Disclaimer'),
    '#description' => t('Disclaimer text used for exit links.'),
    '#default_value' => theme_get_setting('exit_disclaimer') ?? 'Exit this website',
  ];
  $form['external_links']['allowed_domains'] = [
    '#type' => 'textarea',
    '#title' => t('Allowed Domains'),
    '#description' => t('Links with these domains won’t get external link icons. Enter multiple domains on separate lines.'),
    '#default_value' => theme_get_setting('allowed_domains') ?? "example-allowed-domain.com\nforumone.github.io",
  ];
  $form['external_links']['allowed_links'] = [
    '#type' => 'textarea',
    '#title' => t('Allowed Links'),
    '#description' => t('Links with these URLs (typically used for social media) won’t get external link icons. Enter multiple links on separate lines.'),
    '#default_value' => theme_get_setting('allowed_links') ?? "https://www.vimeo.com/example-allowed-link\nhttps://www.youtube.com/example-allowed-link",
  ];
}
