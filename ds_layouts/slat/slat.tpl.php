<?php
/**
 * @file
 * slat.tpl.php
 */
?>
<article class="l-slat <?php print $classes; ?>"<?php print $attributes; ?>>
  <?php if ($header && $header != "&nbsp;"): ?>
    <div class="l-slat__header"><?php print $header; ?></div>
  <?php endif; ?>

  <?php if ($media && $media != "&nbsp;"): ?>
    <div class="l-slat__media"><?php print $media; ?></div>
  <?php endif; ?>

  <?php if ($main_content && $main_content != "&nbsp;"): ?>
    <div class="l-slat__content"><?php print $main_content; ?></div>
  <?php endif; ?>
</article>
