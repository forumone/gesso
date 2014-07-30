<?php
/**
 * @file
 * Default simple view template to display a list of rows.
 */
?>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>

<?php foreach ($rows as $id => $row): ?>

  <?php if ($classes_array[$id]) { print '<div class="' . $classes_array[$id] . '">'; } ?>
    <?php print $row; ?>
  <?php if ($classes_array[$id]) { print '</div>'; } ?>

<?php endforeach; ?>
