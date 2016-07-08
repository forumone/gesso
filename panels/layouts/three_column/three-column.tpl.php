<?php
/**
 * @file
 * Template for the three column panels layout.
 */

$wrapper_attributes = array('class' => array('layout-three-column'));
$preface_open = '';
$preface_close = '';
$first_open = '';
$first_close = '';
$second_open = '';
$second_close = '';
$third_open = '';
$third_close = '';

if (!empty($css_id)) {
  $wrapper_attributes['id'] = $css_id;
}

if (!empty($content['preface'])) {
  $preface_open = '<div class="layout-three-column__preface">';
  $preface_close = '</div>';
}

if (!empty($content['first'])) {
  $wrapper_attributes['class'][] = 'has-first';
  $first_open = '<div class="layout-three-column__first">';
  $first_close = '</div>';
}
else {
  $wrapper_attributes['class'][] = 'empty-first';
}

if (!empty($content['second'])) {
  $wrapper_attributes['class'][] = 'has-second';
  $second_open = '<div class="layout-three-column__second">';
  $second_close = '</div>';
}
else {
  $wrapper_attributes['class'][] = 'empty-second';
}

if (!empty($content['third'])) {
  $wrapper_attributes['class'][] = 'has-third';
  $third_open = '<div class="layout-three-column__third">';
  $third_close = '</div>';
}
else {
  $wrapper_attributes['class'][] = 'empty-third';
}
?>
<div<?php print drupal_attributes($wrapper_attributes); ?>>
  <?php print $preface_open; ?>
    <?php print $content['preface']; ?>
  <?php print $preface_close; ?>

  <?php print $first_open; ?>
    <?php print $content['first']; ?>
  <?php print $first_close; ?>

   <?php print $second_open; ?>
    <?php print $content['second']; ?>
  <?php print $second_close; ?>

   <?php print $third_open; ?>
    <?php print $content['third']; ?>
  <?php print $third_close; ?>
</div>
