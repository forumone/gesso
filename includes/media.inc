<?php

/**
 * @file
 * Media-related hook implementations.
 */

use Drupal\Component\Utility\Html;
use Drupal\filter\Render\FilteredMarkup;

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_filter_caption(array &$variables) {
  $dom = Html::load($variables['node']);
  foreach ($dom->getElementsByTagName('drupal-media') as $dom_media_element) {
    /** @var \DOMElement $new_media_element */
    $new_media_element = $dom_media_element->cloneNode(TRUE);

    // Re-insert the caption attribute into the media tag so that it is
    // available when rendering the media itself. This allows us to make
    // decisions during media rendering based upon whether or not there's a
    // caption.
    $new_media_element->setAttribute('data-caption', $variables['caption']);
    $dom_media_element->parentNode->replaceChild($new_media_element, $dom_media_element);

    // Grab the view mode and alignment info from the embedded media tag and
    // make it available to the filter-caption template.
    foreach (['data-view-mode' => 'view_mode', 'data-align' => 'align'] as $attribute => $var) {
      $variables[$var] = $dom_media_element->getAttribute($attribute);
    }

    // Add media bundle to variables to handle custom theming by bundle.
    $uuid = $dom_media_element->getAttribute('data-entity-uuid');
    $entity_type = $dom_media_element->getAttribute('data-entity-type');
    $media = \Drupal::service('entity.repository')->loadEntityByUuid($entity_type, $uuid);
    $variables['media_bundle'] = $media->bundle();
  }

  // If caption is empty, add blank space to allow CKEditor to add captions.
  if ($variables['logged_in'] && empty($variables['caption'])) {
    $variables['caption'] = ' ';
  }

  $variables['node'] = FilteredMarkup::create(Html::serialize($dom));
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_image(array &$variables) {
  if (empty($variables['attributes']['alt'])) {
    $variables['attributes']['alt'] = '';
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_media(array &$variables) {
  $variables['has_caption'] = isset($variables['attributes']['data-caption']);
  $variables['bundle'] = $variables['media']->bundle();
}
