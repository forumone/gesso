<?php
/**
 * @file
 * Theme implementation to display a single Drupal page while offline.
 *
 * All the available variables are mirrored in page.tpl.php.
 */
?><!DOCTYPE html>
<!--[if lt IE 7]>      <html class="ie6 lt-ie9 lt-ie8 lt-ie7 no-js" <?php print $html_attributes; ?>> <![endif]-->
<!--[if IE 7]>         <html class="ie7 lt-ie9 lt-ie8 no-js" <?php print $html_attributes; ?>> <![endif]-->
<!--[if IE 8]>         <html class="ie8 lt-ie9 no-js" <?php print $html_attributes; ?>> <![endif]-->
<!--[if IE 9]>         <html class="ie9 no-js" <?php print $html_attributes; ?>> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js" <?php print $html_attributes; ?>> <!--<![endif]-->
  <head>
    <?php print $head; ?>
    <title><?php print $head_title; ?></title>
    <meta name="HandheldFriendly" content="true">
    <meta name="MobileOptimized" content="width">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="cleartype" content="on">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <?php print $styles; ?>
    <?php print $scripts; ?>
  </head>
  <body class="<?php print $classes; ?>"<?php print $body_attributes; ?>>
    <div class="skip-links">
      <a href="#main" class="skip-links__link element-invisible element-focusable"><?php print t('Skip to main content'); ?></a>
    </div>

    <?php print $page_top; ?>

    <header class="header" role="banner">
      <?php if ($site_name): ?>
        <h1 class="site-name">
          <a href="<?php print $base_path; ?>" title="<?php print t('Home'); ?>" rel="home"><span><?php print $site_name; ?></span></a>
        </h1>
      <?php endif; ?>

      <?php if ($site_slogan): ?>
        <span class="site-slogan"><?php print $site_slogan; ?></span>
      <?php endif; ?>
    </header>

    <main id="main" role="main">
      <?php if ($messages): ?>
        <div id="messages" role="alertdialog"><?php print $messages; ?></div>
      <?php endif; ?>

      <?php print render($title_prefix); ?>

      <?php if ($title): ?>
        <h1 class="page-title"><?php print $title; ?></h1>
      <?php endif; ?>

      <?php print render($title_suffix); ?>
      <?php print $content; ?>
    </main>

    <?php print $page_bottom; ?>
  </body>
</html>
