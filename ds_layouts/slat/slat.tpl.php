<?php
/**
 * @file
 * slat.tpl.php
 */
?>
<<?php print $layout_wrapper; ?> class="layout-slat <?php print $classes; ?>"<?php print $attributes; ?>>
  <?php if ($header && $header != "&nbsp;"): ?>
    <<?php print $header_wrapper; ?> class="layout-slat__header<?php print $header_classes; ?>"><?php print $header; ?></<?php print $header_wrapper; ?>>
  <?php endif; ?>

  <?php if ($media && $media != "&nbsp;"): ?>
    <<?php print $media_wrapper; ?> class="layout-slat__media<?php print $media_classes; ?>"><?php print $media; ?></<?php print $media_wrapper; ?>>
  <?php endif; ?>

  <?php if ($main_content && $main_content != "&nbsp;"): ?>
    <<?php print $main_content_wrapper; ?> class="layout-slat__content<?php print $main_content_classes; ?>"><?php print $main_content; ?></<?php print $main_content_wrapper; ?>>
  <?php endif; ?>
</<?php print $layout_wrapper; ?>>
