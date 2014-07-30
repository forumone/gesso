<?php
/**
 * @file
 * Display Suite slat layout configuration.
 */

function ds_slat() {
  return array(
    'label' => t('Slat'),
    'regions' => array(
      'header' => t('Header'),
      'media' => t('Media'),
      'main_content' => t('Content'),
    ),
  );
}
