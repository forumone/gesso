<?php
/**
 * @file
 * Theme implementation to present profile categories.
 */
?>
<section class="<?php print $classes; ?>">
  <?php if ($title) : ?>
    <h2<?php print $title_attributes; ?>><?php print $title; ?></h2>
  <?php endif; ?>

  <dl<?php print $attributes; ?>>
    <?php print $profile_items; ?>
  </dl>
</section>
