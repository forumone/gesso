<?php
/**
 * @file
 * article.tpl.php
 */
?>
<article class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <?php if ($header && $header != "&nbsp;"): ?>
    <header><?php print ($header); ?></header>
  <?php endif; ?>

  <?php print $main_content; ?>

  <?php if ($footer && $footer != "&nbsp;"): ?>
    <footer><?php print ($footer); ?></footer>
  <?php endif; ?>
</article>
