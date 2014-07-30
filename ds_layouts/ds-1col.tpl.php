<?php
/**
 * @file
 * ds-1col.tpl.php
 */
?>
<div class="<?php print $classes;?> <?php print $ds_content_classes;?>">

  <?php if (isset($title_suffix['contextual_links'])): ?>
    <?php print render($title_suffix['contextual_links']); ?>
  <?php endif; ?>

  <?php print $ds_content; ?>
</div>
