<?php
/**
 * @file
 * Theme implementation to display a single taxonomy term.
 */
?>
<article<?php print $attributes; ?>>

  <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>>
      <a href="<?php print $term_url; ?>"><?php print $term_name; ?></a>
    </h2>
  <?php endif; ?>

  <div<?php print $content_attributes; ?>>
    <?php print render($content); ?>
  </div>

</article>
