<?php
/**
 * @file
 * Theme implementation to present the source of the feed.
 *
 * The contents are rendered above feed listings when browsing source feeds.
 * For example, "example.com/aggregator/sources/1".
 */
?>
<div class="feed-source">
  <div class="feed-source__description">
    <?php print $source_icon; ?>
    <?php print $source_description; ?>
  </div>

  <?php print $source_image; ?>

  <dl class="feed-source__details">
    <dt class="feed-source__url"><?php print t('URL:'); ?></dt>
    <dd><a href="<?php print $source_url; ?>"><?php print $source_url; ?></a></dd>

    <dt class="feed-source__updated"><?php print t('Updated:'); ?></dt>
    <dd><?php print $last_checked; ?></dd>
  </dl>
</div>
