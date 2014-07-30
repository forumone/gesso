<?php
/**
 * @file
 * Default simple view template to display a rows in a grid.
 */
?>
<?php if (!empty($title)) : ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>

<div class="<?php print $class; ?>"<?php print $attributes; ?>>

  <?php foreach ($rows as $row_number => $columns): ?>
    <div class="l-grid__row<?php print ($row_classes[$row_number]) ? ' ' . $row_classes[$row_number] : ''; ?>">

      <?php foreach ($columns as $column_number => $item): ?>
        <div class="l-grid__column<?php print ($column_classes[$row_number][$column_number]) ? ' ' . $column_classes[$row_number][$column_number] : '' ?>">
          <?php print $item; ?>
        </div>
      <?php endforeach; ?>

    </div>
  <?php endforeach; ?>

</div>
