<?php
  $preface = (empty($content['preface']) ? 'preface-empty' : 'preface');
  $first = (empty($content['first']) ? 'first-empty' : 'first');
  $second = (empty($content['second']) ? 'second-empty' : 'second');
  $third = (empty($content['third']) ? 'third-empty' : 'third');
  $classes = "$preface $first $second $third";
?>

<div<?php if (!empty($css_id)): ?> id="<?php print $css_id; ?>"<?php endif; ?> class="layout-panels-three-column <?php print $classes; ?>">
  <?php if (!empty($content['preface'])): ?>
    <div class="layout-preface">
      <?php print $content['preface']; ?>
    </div>
  <?php endif; ?>
  <?php if (!empty($content['first'])): ?>
    <aside class="layout-first">
      <?php print $content['first']; ?>
    </aside>
  <?php endif; ?>
  <?php if (!empty($content['second'])): ?>
    <div class="layout-second">
      <?php print $content['second']; ?>
    </div>
  <?php endif; ?>
  <?php if (!empty($content['third'])): ?>
    <div class="layout-third">
      <?php print $content['third']; ?>
    </div>
  <?php endif; ?>
</div>
