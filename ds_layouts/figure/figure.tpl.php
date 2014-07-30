<?php
/**
 * @file
 * figure.tpl.php
 */
?>
<figure class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <?php print $media; ?>

  <?php if ($caption && $caption != "&nbsp;"): ?>
    <figcaption><?php print ($caption); ?></figcaption>
  <?php endif; ?>
</figure>
