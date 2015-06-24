<?php
/**
 * @file
 * figure.tpl.php
 */
if ($caption_classes) {
  $caption_classes = ' class="'. trim($caption_classes) . '"';
}
?>
<figure class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <?php print $media; ?>

  <?php if ($caption && $caption != "&nbsp;"): ?>
    <figcaption<?php print $caption_classes; ?>><?php print ($caption); ?></figcaption>
  <?php endif; ?>
</figure>
