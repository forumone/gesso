<?php
/**
 * @file
 * Display Suite article layout configuration.
 */

function ds_article() {
  return array(
    'label' => t('Article'),
    'regions' => array(
      'header' => t('Header'),
      'main_content' => t('Content'),
      'footer' => t('Footer'),
    ),
  );
}
