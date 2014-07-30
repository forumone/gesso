<?php
/**
 * @file
 * Theme implementation to display a single node.
 */
hide($content['comments']);
hide($content['links']);
?>
<article<?php print $attributes; ?>>
  <?php print render($title_prefix); ?>

  <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>>
      <a href="<?php print $node_url; ?>" rel="bookmark"><?php print $title; ?></a>
    </h2>
  <?php endif; ?>

  <?php print render($title_suffix); ?>
  <?php print $unpublished; ?>

  <?php if ($display_submitted): ?>
    <footer>
      <?php print $user_picture; ?>
      <p class="node__submitted"><?php print $submitted; ?></p>
    </footer>
  <?php endif; ?>

  <div<?php print $content_attributes; ?>>
    <?php print render($content); ?>
  </div>

  <?php print render($content['links']); ?>
  <?php print render($content['comments']); ?>
</article>
