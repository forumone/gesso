<?php
/**
 * @file
 * Returns HTML for an Entity View Attachment.
 */
?>
<div class="<?php print $classes; ?>">
  <?php print render($title_prefix); ?>

  <?php if ($title): ?>
    <h3><?php print $title; ?></h3>
  <?php endif; ?>

  <?php print render($title_suffix); ?>

  <?php if ($header): ?>
    <div class="view__header">
      <?php print $header; ?>
    </div>
  <?php endif; ?>

  <?php if ($attachment_before): ?>
    <div class="view__attachment-before">
      <?php print $attachment_before; ?>
    </div>
  <?php endif; ?>

  <?php if ($rows): ?>
    <?php print $rows; ?>
  <?php elseif ($empty): ?>
    <?php print $empty; ?>
  <?php endif; ?>

  <?php if ($pager): ?>
    <?php print $pager; ?>
  <?php endif; ?>

  <?php if ($attachment_after): ?>
    <div class="view__attachment-after">
      <?php print $attachment_after; ?>
    </div>
  <?php endif; ?>

  <?php if ($more): ?>
    <?php print $more; ?>
  <?php endif; ?>

  <?php if ($footer): ?>
    <div class="view__footer">
      <?php print $footer; ?>
    </div>
  <?php endif; ?>

  <?php if ($feed_icon): ?>
    <?php print $feed_icon; ?>
  <?php endif; ?>

</div>
