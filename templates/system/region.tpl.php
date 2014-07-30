<?php
/**
 * @file
 * Theme implementation to display a region.
 */
?>
<?php if ($content): ?>
  <?php print $region_open; ?>
  <?php print $content; ?>
  <?php print $region_close; ?>
<?php endif; ?>
