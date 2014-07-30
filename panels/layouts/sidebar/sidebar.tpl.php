<?php
  $preface = (empty($content['preface']) ? 'preface-empty' : 'preface');
  $main = (empty($content['main']) ? 'main-empty' : 'main');
  $sidebar = (empty($content['sidebar']) ? 'sidebar-empty' : 'sidebar');
  $classes = "$preface $main $sidebar";
?>

<div<?php if (!empty($css_id)): ?> id="<?php print $css_id; ?>"<?php endif; ?> class="l-panels-sidebar <?php print $classes; ?>">
  <?php if (!empty($content['preface'])): ?>
    <div class="l-preface">
      <?php print $content['preface']; ?>
    </div>
  <?php endif; ?>
  <?php if (!empty($content['main'])): ?>
    <div class="l-main">
      <?php print $content['main']; ?>
    </div>
  <?php endif; ?>
  <?php if (!empty($content['sidebar'])): ?>
    <aside class="l-sidebar">
      <?php print $content['sidebar']; ?>
    </aside>
  <?php endif; ?>
</div>

