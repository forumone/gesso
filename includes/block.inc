<?php
/**
 * @file
 * Block-related functions.
 */

/**
 * Implements hook_preprocess_block().
 */
function gesso_preprocess_block(&$vars) {
  $module = $vars['block']->module;
  $module_class = drupal_html_class($module);
  $delta = $vars['block']->delta;
  $delta_class = drupal_html_class($delta);
  $only_use_smacss = theme_get_setting('only_use_smacss');

  // Remove some default block classes.
  if ($only_use_smacss) {
    $vars['classes_array'] = array_values(array_diff($vars['classes_array'], array(
      'block-' . $module_class,
      'block-menu',
    )));
  }

  // Add new default block classes.
  $vars['classes_array'][] = 'block--' . drupal_html_class($module_class);
  $vars['classes_array'][] = 'block--' . drupal_html_class($module_class) . '-' . drupal_html_class($delta_class);

  // Add default title & content classes.
  $vars['title_attributes_array']['class'][] = 'block__title';
  $vars['content_attributes_array']['class'][] = 'block__content';

  // Add attributes if using Clean Markup Blocks module.
  if (module_exists('clean_markup_blocks')) {
    if ($vars['block']->subject) {
      // Add title attributes to Clean Markup without overwriting classes.
      $vars['title_attributes_array']['class'] = array_merge($vars['title']['#attributes']['class'], $vars['title_attributes_array']['class']);
      $vars['title']['#attributes'] = array_merge($vars['title']['#attributes'], $vars['title_attributes_array']);

      // Remove unwanted classes.
      $vars['title']['#attributes']['class'] = array_values(array_diff($vars['title']['#attributes']['class'], array('title', 'block-title')));
    }

    if (is_array($vars['content'])) {
      // Add content attributes to Clean Markup.
      $vars['content']['#attributes'] = array_merge_recursive($vars['content']['#attributes'], $vars['content_attributes_array']);

      // Remove unwanted classes.
      if ($only_use_smacss) {
        $vars['content']['#attributes']['class'] = array_values(array_diff($vars['content']['#attributes']['class'], array(
          'content',
        )));
      }
    }
  }

  // Markup for blockify logo block.
  if ($delta == 'blockify-logo') {
    $vars['theme_hook_suggestions'][] = 'block__logo';

    $site_name = filter_xss_admin(variable_get('site_name', 'Drupal'));

    // Strip the base_path from the beginning of the logo path.
    $path = preg_replace('|^' . base_path() . '|', '', theme_get_setting('logo'));

    $image = array(
      '#theme' => 'image',
      '#path' => $path,
      '#alt' => t('!site_name Logo', array(
        '!site_name' => $site_name,
      )),
    );

    $vars['logo'] = $image;
    $vars['site_name'] = $site_name;
    $vars['front_page'] = url();
  }

  // Markup for blockify site name block.
  elseif ($delta == 'blockify-site-name') {
    $vars['theme_hook_suggestions'][] = 'block__site_name';

    $site_name = filter_xss_admin(variable_get('site_name', 'Drupal'));

    $vars['site_name'] = $site_name;
    $vars['front_page'] = url();
  }

  // Markup for  blockify site slogan block.
  elseif ($delta == 'blockify-site-slogan') {
    $vars['theme_hook_suggestions'][] = 'block__site_slogan';

    $slogan = filter_xss_admin(variable_get('site_slogan', 'Drupal'));

    $vars['slogan'] = $slogan;
  }

  // Markup for blockify page title block.
  elseif ($delta == 'blockify-page-title') {
    $vars['theme_hook_suggestions'][] = 'block__page_title';

    $vars['title'] = drupal_get_title();
  }
  elseif ($vars['block']->delta == 'blockify-messages') {
    $vars['theme_hook_suggestions'][] = 'block__messages';
  }

  // Markup for blockify breadcrumbs block.
  elseif ($delta == 'blockify-breadcrumb') {
    $vars['theme_hook_suggestions'][] = 'block__breadcrumbs';

    $breadcrumbs = drupal_get_breadcrumb();

    $vars['breadcrumbs'] = theme('breadcrumb', $breadcrumbs);
  }

  // Markup for blockify tabs block.
  elseif ($delta == 'blockify-tabs') {
    $vars['theme_hook_suggestions'][] = 'block__tabs';

    $primary = menu_primary_local_tasks();
    $secondary = menu_secondary_local_tasks();

    $tabs = array(
      'primary' => $primary,
      'secondary' => $secondary,
    );

    $tabs = theme('menu_local_tasks', $tabs);

    $vars['tabs'] = $tabs;
  }

  // Markup for blockify actions block.
  elseif ($delta == 'blockify-actions') {
    $vars['theme_hook_suggestions'][] = 'block__actions';

    $actions = menu_local_actions();
    $vars['actions'] = $actions;
  }

  // Markup for blockify feed icons block.
  elseif ($delta == 'blockify-feed-icons') {
    $vars['theme_hook_suggestions'][] = 'block__feed_icons';

    $icons = drupal_get_feeds();
    $vars['icons'] = $icons;
  }
}
