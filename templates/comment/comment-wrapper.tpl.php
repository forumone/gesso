<?php
/**
 * @file
 * Theme implementation to provide an HTML container for comments.
 */

// Render the comments and form first to see if we need headings.
$comments = render($content['comments']);
$comment_form = render($content['comment_form']);
?>
<section<?php print $attributes; ?>>
  <?php if ($comments && $node->type != 'forum'): ?>
    <?php print render($title_prefix); ?>
    <h2<?php print $title_attributes ?>><?php print t('Comments'); ?></h2>
    <?php print render($title_suffix); ?>
  <?php endif; ?>

  <?php print $comments; ?>

  <?php if ($comment_form): ?>
    <h2<?php print $form_title_attributes ?>><?php print t('Add new comment'); ?></h2>
    <?php print $comment_form; ?>
  <?php endif; ?>
</section>
