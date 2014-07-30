<?php
/**
 * @file
 * Page template functions.
 */

/**
 * Implements hook_preprocess_page().
 */
function gesso_preprocess_page(&$vars, $hook) {
  // Determine if Panels is rendering this page.
  $vars['is_panel'] = FALSE;
  if (module_exists('page_manager') && count(page_manager_get_current_page())) {
    $vars['is_panel'] = TRUE;

    // Add template suggestion for page--panel.tpl.php.
    $vars['theme_hook_suggestions'][] = 'page__panel';
  }

  // Drupal 7 incorrectly sets the page title to "User account" for all three of
  // these pages.
  $title = drupal_get_title();
  if (arg(0) === 'user' && $title == t('User account')) {
    if (arg(1) === 'login' || arg(1) == '') {
      drupal_set_title(t('User login'));
    }
    if (arg(1) === 'password') {
      drupal_set_title(t('Request new password'));
    }
    if (arg(1) === 'register') {
      drupal_set_title(t('Create new account'));
    }
  }

  // Add template suggestion for page--nodetype.tpl.php.
  if (isset($vars['node'])) {
    $vars['theme_hook_suggestions'][] = 'page__' . $vars['node']->type;
  }

  // Remove default home page content.
  unset($vars['page']['content']['system_main']['default_message']);

  // Remove block wrapper from main system block.
  if (isset($vars['page']['content']['system_main']['#theme_wrappers']) && is_array($vars['page']['content']['system_main']['#theme_wrappers'])) {
    $vars['page']['content']['system_main']['#theme_wrappers'] = array_diff($vars['page']['content']['system_main']['#theme_wrappers'], array('block'));
  }

  // Uncomment the following if you want to change page.tpl.php variables based
  // on node type.
  //if (isset($vars['node'])) {
  //  switch ($vars['node']->type) {
  //    case 'page':
  //      break;
  //  }
  //}
}
