<?php
/**
 * @file
 * Display Suite figure layout configuration.
 */

function ds_figure() {
  return array(
    'label' => t('Figure'),
    'regions' => array(
      'media' => t('Media'),
      'caption' => t('Caption'),
    ),
  );
}
