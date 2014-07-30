<?php
/**
 * @file
 * This template handles the layout of the views exposed filter form.
 */
?>
<?php if (!empty($q)): ?>
  <?php
    // This ensures that, if clean URLs are off, the 'q' is added first so that
    // it shows up first in the URL.
    print $q;
  ?>
<?php endif; ?>
<?php if ($only_use_smacss): ?>
  <?php foreach ($widgets as $id => $widget): ?>
    <div id="<?php print $widget->id; ?>" class="views-widget views-widget--<?php print $id; ?>">
      <?php if (!empty($widget->label)): ?>
        <label class="views-widget__label" for="<?php print $widget->id; ?>">
          <?php print $widget->label; ?>
        </label>
      <?php endif; ?>
      <?php if (!empty($widget->operator)): ?>
        <div class="views-widget__operator">
          <?php print $widget->operator; ?>
        </div>
      <?php endif; ?>
      <?php print $widget->widget; ?>
      <?php if (!empty($widget->description)): ?>
        <div class="views-widget__description">
          <?php print $widget->description; ?>
        </div>
      <?php endif; ?>
    </div>
  <?php endforeach; ?>
  <?php if (!empty($sort_by)): ?>
    <div class="views-widget views-widget--sort-by">
      <?php print $sort_by; ?>
    </div>
    <div class="views-widget views-widget--sort-order">
      <?php print $sort_order; ?>
    </div>
  <?php endif; ?>
  <?php if (!empty($items_per_page)): ?>
    <div class="views-widget views-widget--items-per-page">
      <?php print $items_per_page; ?>
    </div>
  <?php endif; ?>
  <?php if (!empty($offset)): ?>
    <div class="views-widget views-widget--offset">
      <?php print $offset; ?>
    </div>
  <?php endif; ?>
  <div class="views-widget views-widget--submit">
    <?php print $button; ?>
  </div>
  <?php if (!empty($reset_button)): ?>
    <div class="views-widget views-widget--reset">
      <?php print $reset_button; ?>
    </div>
  <?php endif; ?>
<?php else: ?>
  <div class="views-exposed-form">
    <div class="views-exposed-widgets clearfix">
      <?php foreach ($widgets as $id => $widget): ?>
        <div id="<?php print $widget->id; ?>-wrapper" class="views-exposed-widget views-widget-<?php print $id; ?> views-widget views-widget--<?php print $id; ?>">
          <?php if (!empty($widget->label)): ?>
            <label class="views-widget__label" for="<?php print $widget->id; ?>">
              <?php print $widget->label; ?>
            </label>
          <?php endif; ?>
          <?php if (!empty($widget->operator)): ?>
            <div class="views-operator views-widget__operator">
              <?php print $widget->operator; ?>
            </div>
          <?php endif; ?>
          <?php print $widget->widget; ?>
          <?php if (!empty($widget->description)): ?>
            <div class="description views-widget__description">
              <?php print $widget->description; ?>
            </div>
          <?php endif; ?>
        </div>
      <?php endforeach; ?>
      <?php if (!empty($sort_by)): ?>
        <div class="views-exposed-widget views-widget-sort-by views-widget views-widget--sort-by">
          <?php print $sort_by; ?>
        </div>
        <div class="views-exposed-widget views-widget-sort-order views-widget views-widget--sort-order">
          <?php print $sort_order; ?>
        </div>
      <?php endif; ?>
      <?php if (!empty($items_per_page)): ?>
        <div class="views-exposed-widget views-widget-per-page views-widget views-widget--items-per-page">
          <?php print $items_per_page; ?>
        </div>
      <?php endif; ?>
      <?php if (!empty($offset)): ?>
        <div class="views-exposed-widget views-widget-offset views-widget views-widget--offset">
          <?php print $offset; ?>
        </div>
      <?php endif; ?>
      <div class="views-exposed-widget views-submit-button views-widget views-widget--submit">
        <?php print $button; ?>
      </div>
      <?php if (!empty($reset_button)): ?>
        <div class="views-exposed-widget views-reset-button views-widget views-widget--reset">
          <?php print $reset_button; ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
<?php endif; ?>
