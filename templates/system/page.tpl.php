<?php
/**
 * @file
 * Theme implementation to display a single Drupal page.
 */
?>
<?php if ($page['utility']): ?>
  <?php print render($page['utility']); ?>
<?php endif; ?>

<header class="header" role="banner">
  <?php if ($page['header']): ?>
    <?php print render($page['header']); ?>
  <?php endif; ?>
</header>

<?php if ($page['navigation']): ?>
  <?php print render($page['navigation']); ?>
<?php endif; ?>

<?php if ($page['preface']): ?>
  <?php print render($page['preface']); ?>
<?php endif; ?>

<?php if ($page['content']): ?>
  <main id="main" class="main" role="main">
    <?php print render($page['content']); ?>
  </main>
<?php endif; ?>

<?php if ($page['postscript']): ?>
  <?php print render($page['postscript']); ?>
<?php endif; ?>

<?php if ($page['footer']): ?>
  <footer class="footer" role="contentinfo">
    <?php print render($page['footer']); ?>
  </footer>
<?php endif; ?>
