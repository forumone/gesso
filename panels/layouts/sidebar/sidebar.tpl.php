<?php
/**
 * @file
 * Template for the sidebar panels layout.
 */

$wrapper_attributes = array('class' => array('layout-sidebar'));
$preface_open = '';
$preface_close = '';
$main_open = '';
$main_close = '';
$sidebar_open = '';
$sidebar_close = '';

if (!empty($css_id)) {
  $wrapper_attributes['id'] = $css_id;
}

if (!empty($content['preface'])) {
  $preface_open = '<div class="layout-sidebar__header">';
  $preface_close = '</div>';
}

if (!empty($content['main'])) {
  $main_open = '<div class="layout-sidebar__main">';
  $main_close = '</div>';
}

if (!empty($content['sidebar'])) {
  $wrapper_attributes['class'][] = 'has-sidebar';
  $sidebar_open = '<div class="layout-sidebar__sidebar">';
  $sidebar_close = '</div>';
}
?>
<div<?php print drupal_attributes($wrapper_attributes); ?>>
  <?php print $preface_open; ?>
    <?php print $content['preface']; ?>
  <?php print $preface_close; ?>

  <?php print $main_open; ?>
    <?php print $content['main']; ?>
  <?php print $main_close; ?>

  <?php print $sidebar_open; ?>
    <?php print $content['sidebar']; ?>
  <?php print $sidebar_close; ?>
</div>
