<?php
/**
 * @file
 * Template for the sidebar multi-row panels layout.
 */

$wrapper_attributes = array('class' => array('layout-sidebar-multi-row'));
$preface_open = '';
$preface_close = '';
$sidebar_open = '';
$sidebar_close = '';
$row_1_open = '';
$row_1_close = '';
$row_2_first_open = '';
$row_2_first_close = '';
$row_2_second_open = '';
$row_2_second_close = '';
$row_2_third_open = '';
$row_2_third_close = '';
$row_3_first_open = '';
$row_3_first_close = '';
$row_3_second_open = '';
$row_3_second_close = '';
$row_3_third_open = '';
$row_3_third_close = '';
$row_4_first_open = '';
$row_4_first_close = '';
$row_4_second_open = '';
$row_4_second_close = '';
$row_4_third_open = '';
$row_4_third_close = '';
$postscript_open = '';
$postscript_close = '';

if (!empty($css_id)) {
  $wrapper_attributes['id'] = $css_id;
}

if (!empty($content['preface'])) {
  $preface_open = '<div class="layout-sidebar-multi-row__preface">';
  $preface_close = '</div>';
}

if (!empty($content['sidebar'])) {
  $wrapper_attributes['class'][] = 'has-sidebar';
  $sidebar_open = '<div class="layout-sidebar-multi-row__sidebar">';
  $sidebar_close = '</div>';
}

if (!empty($content['row-1'])) {
  $row_1_open = '<div class="layout-sidebar-multi-row__row-1">';
  $row_1_close = '</div>';
}

if (!empty($content['row-2-first'])) {
  $wrapper_attributes['class'][] = 'has-row-2-first';
  $row_2_first_open = '<div class="layout-sidebar-multi-row__row-2-first">';
  $row_2_first_close = '</div>';
}
else {
  $wrapper_attributes['class'][] = 'empty-row-2-first';
}

if (!empty($content['row-2-second'])) {
  $wrapper_attributes['class'][] = 'has-row-2-second';
  $row_2_second_open = '<div class="layout-sidebar-multi-row__row-2-second">';
  $row_2_second_close = '</div>';
}
else {
  $wrapper_attributes['class'][] = 'empty-row-2-second';
}

if (!empty($content['row-2-third'])) {
  $wrapper_attributes['class'][] = 'has-row-2-third';
  $row_2_third_open = '<div class="layout-sidebar-multi-row__row-2-third">';
  $row_2_third_close = '</div>';
}
else {
  $wrapper_attributes['class'][] = 'empty-row-2-third';
}

if (!empty($content['row-3-first'])) {
  $wrapper_attributes['class'][] = 'has-row-3-first';
  $row_3_first_open = '<div class="layout-sidebar-multi-row__row-3-first">';
  $row_3_first_close = '</div>';
}
else {
  $wrapper_attributes['class'][] = 'empty-row-3-first';
}

if (!empty($content['row-3-second'])) {
  $wrapper_attributes['class'][] = 'has-row-3-second';
  $row_3_second_open = '<div class="layout-sidebar-multi-row__row-3-second">';
  $row_3_second_close = '</div>';
}
else {
  $wrapper_attributes['class'][] = 'empty-row-3-second';
}

if (!empty($content['row-3-third'])) {
  $wrapper_attributes['class'][] = 'has-row-3-third';
  $row_3_third_open = '<div class="layout-sidebar-multi-row__row-3-third">';
  $row_3_third_close = '</div>';
}
else {
  $wrapper_attributes['class'][] = 'empty-row-3-third';
}

if (!empty($content['row-4-first'])) {
  $wrapper_attributes['class'][] = 'has-row-4-first';
  $row_4_first_open = '<div class="layout-sidebar-multi-row__row-4-first">';
  $row_4_first_close = '</div>';
}
else {
  $wrapper_attributes['class'][] = 'empty-row-4-first';
}

if (!empty($content['row-4-second'])) {
  $wrapper_attributes['class'][] = 'has-row-4-second';
  $row_4_second_open = '<div class="layout-sidebar-multi-row__row-4-second">';
  $row_4_second_close = '</div>';
}
else {
  $wrapper_attributes['class'][] = 'empty-row-4-second';
}

if (!empty($content['row-4-third'])) {
  $wrapper_attributes['class'][] = 'has-row-4-third';
  $row_4_third_open = '<div class="layout-sidebar-multi-row__row-4-third">';
  $row_4_third_close = '</div>';
}
else {
  $wrapper_attributes['class'][] = 'empty-row-4-third';
}

if (!empty($content['postscript'])) {
  $preface_open = '<div class="layout-sidebar-multi-row__postscript">';
  $preface_close = '</div>';
}
?>
<div<?php print drupal_attributes($wrapper_attributes); ?>>
  <?php print $preface_open; ?>
    <?php print $content['preface']; ?>
  <?php print $preface_close; ?>
  <div class="layout-sidebar-multi-row__main-wrapper">
    <?php print $sidebar_open; ?>
      <?php print $content['sidebar']; ?>
    <?php print $sidebar_close; ?>

    <div class="layout-sidebar-multi-row__rows-wrapper">
      <?php print $row_1_open; ?>
        <?php print $content['row-1']; ?>
      <?php print $row_1_close; ?>
      <div class="layout-sidebar-multi-row__row-2">
        <?php print $row_2_first_open; ?>
          <?php print $content['row-2-first']; ?>
        <?php print $row_2_first_close; ?>

        <?php print $row_2_second_open; ?>
          <?php print $content['row-2-second']; ?>
        <?php print $row_2_second_close; ?>

        <?php print $row_2_third_open; ?>
          <?php print $content['row-2-third']; ?>
        <?php print $row_2_third_close; ?>
      </div>
      <div class="layout-sidebar-multi-row__row-3">
        <?php print $row_3_first_open; ?>
          <?php print $content['row-3-first']; ?>
        <?php print $row_3_first_close; ?>

        <?php print $row_3_second_open; ?>
          <?php print $content['row-3-second']; ?>
        <?php print $row_3_second_close; ?>

        <?php print $row_3_third_open; ?>
          <?php print $content['row-3-third']; ?>
        <?php print $row_3_third_close; ?>
      </div>
      <div class="layout-sidebar-multi-row__row-4">
        <?php print $row_4_first_open; ?>
          <?php print $content['row-4-first']; ?>
        <?php print $row_4_first_close; ?>

        <?php print $row_4_second_open; ?>
          <?php print $content['row-4-second']; ?>
        <?php print $row_4_second_close; ?>

        <?php print $row_4_third_open; ?>
          <?php print $content['row-4-third']; ?>
        <?php print $row_4_third_close; ?>
      </div>
    </div>
  </div>

  <?php print $postscript_open; ?>
    <?php print $content['postscript']; ?>
  <?php print $postscript_close; ?>
</div>
