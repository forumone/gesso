<?php
/**
 * @file
 * article.tpl.php
 */
if ($header_classes) {
  $header_classes = ' class="'. trim($header_classes) . '"';
}

if ($footer_classes) {
  $footer_classes = ' class="'. trim($footer_classes) . '"';
}
?>
<article class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <?php if ($header && $header != "&nbsp;"): ?>
    <header<?php print $header_classes; ?>><?php print ($header); ?></header>
  <?php endif; ?>

  <?php print $main_content; ?>

  <?php if ($footer && $footer != "&nbsp;"): ?>
    <footer<?php print $footer_classes; ?>><?php print ($footer); ?></footer>
  <?php endif; ?>
</article>
