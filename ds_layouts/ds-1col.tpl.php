<?php
/**
 * @file
 * ds-1col.tpl.php
 */
?>
<<?php print $ds_content_wrapper; ?> class="<?php print $classes; ?>"<?php print $layout_attributes; ?>>

  <?php if (isset($title_suffix['contextual_links'])): ?>
    <?php print render($title_suffix['contextual_links']); ?>
  <?php endif; ?>

  <?php print $ds_content; ?>
</<?php print $ds_content_wrapper; ?>>

<?php if (!empty($drupal_render_children)): ?>
  <?php print $drupal_render_children ?>
<?php endif; ?>
