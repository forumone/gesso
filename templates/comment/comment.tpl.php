<?php
/**
 * @file
 * Theme implementation for comments.
 */
hide($content['links']);
?>
<article<?php print $attributes; ?>>
  <?php print render($title_prefix); ?>

  <?php if ($new): ?>
    <mark class="comment__new"><?php print $new; ?></mark>
  <?php endif; ?>

  <h3<?php print $title_attributes; ?>>
    <?php print $title; ?>
  </h3>

  <?php print render($title_suffix); ?>

  <footer>
    <?php print $user_picture; ?>
    <p class="comment__submitted">
      <cite class="comment__author"><?php print $author; ?></cite>
      <?php print $created; ?>
    </p>
    <?php print $permalink; ?>
  </footer>

  <div<?php print $content_attributes; ?>>
    <?php print render($content); ?>

    <?php if ($signature): ?>
    <aside class="comment__signature">
      <?php print $signature; ?>
    </aside>
    <?php endif; ?>
  </div>

  <?php print render($content['links']); ?>
</article>
