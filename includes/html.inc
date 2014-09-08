<?php
/**
 * @file
 * HTML template functions.
 */

/**
 * Implements hook_preprocess_maintenance_page().
 */
function gesso_preprocess_maintenance_page(&$vars, $hook) {
  // While markup for normal pages is split into page.tpl.php and html.tpl.php,
  // the markup for the maintenance page is all in the single
  // maintenance-page.tpl.php template. So, to have what's done in
  // gesso_preprocess_html() also happen on the maintenance page, it has to be
  // called here.
  gesso_preprocess_html($vars, $hook);
  gesso_preprocess_page($vars, $hook);

  // This preprocessor will also be used if the db is inactive. To ensure your
  // theme is used, add the following line to your settings.php file:
  // $conf['maintenance_theme'] = 'gesso';
  // Also, check $vars['db_is_active'] before doing any db queries.
}

/**
 * Implements hook_process_maintenance_page().
 */
function gesso_process_maintenance_page(&$vars, $hook) {
  // When a variable is manipulated or added in preprocess_html or
  // preprocess_page, that same work is probably needed for the maintenance page
  // as well, so we can just re-use those functions to do that work here.
  gesso_process_html($vars, $hook);
}

/**
 * Implements hook_preprocess_html().
 */
function gesso_preprocess_html(&$vars, $hook) {
  // Add theme variables.
  $vars['base_path'] = base_path();
  $vars['theme_path'] = drupal_get_path('theme', $GLOBALS['theme_key']);

  // Send X-UA-Compatible HTTP header to force IE to use the most recent
  // rendering engine or use Chrome's frame rendering engine if available.
  // This also prevents the IE compatibility mode button to appear when using
  // conditional classes on the html tag.
  if (is_null(drupal_get_http_header('X-UA-Compatible'))) {
    drupal_add_http_header('X-UA-Compatible', 'IE=edge,chrome=1');
  }

  // HTML element attributes.
  if (!isset($vars['html_attributes_array'])) {
    $vars['html_attributes_array'] = array();
  }

  $vars['html_attributes_array']['lang'] = $vars['language']->language;
  $vars['html_attributes_array']['dir'] = $vars['language']->dir;

  // Body element attributes.
  $vars['body_attributes_array'] = array();

  // Hide styles.css from IE8 and below.
  drupal_add_css(
    $vars['theme_path'] . '/css/styles.css',
    array(
      'group' => CSS_THEME,
      'browsers' => array('IE' => 'gte IE 9'),
    )
  );

  // Add non media-query stylesheet for IE8 and below.
  drupal_add_css(
    $vars['theme_path'] . '/css/no-mq.css',
    array(
      'group' => CSS_THEME,
      'browsers' => array('IE' => 'lt IE 9', '!IE' => FALSE),
    )
  );

  // Return early so the maintenance page does not call any of the code below.
  if ($hook != 'html') {
    return;
  }

  // Serialize RDF Namespaces into an RDFa 1.1 prefix attribute.
  if (isset($vars['rdf_namespaces'])) {
    $prefixes = array();
    foreach (explode("\n  ", ltrim($vars['rdf_namespaces'])) as $namespace) {
      // Remove xlmns: and ending quote and fix prefix formatting.
      $prefixes[] = str_replace('="', ': ', substr($namespace, 6, -1));
    }
    $vars['rdf_namespaces'] = ' prefix="' . implode(' ', $prefixes) . '"';
  }

  // Remove unwanted body classes.
  $vars['classes_array'] = array_values(array_diff($vars['classes_array'], array(
    'html',
    'two-sidebars',
    'one-sidebar sidebar-first',
    'one-sidebar sidebar-second',
    'no-sidebars',
  )));
  $vars['classes_array'] = preg_grep('/^page-node/', $vars['classes_array'], PREG_GREP_INVERT);

  if (!$vars['is_front']) {
    // Add path class.
    $path = drupal_get_path_alias($_GET['q']);
    $vars['classes_array'][] = drupal_html_class('path-' . $path);

    // Add section class.
    list($section) = explode('/', $path, 2);
    $arg = explode('/', $_GET['q']);
    if ($arg[0] == 'node' && isset($arg[1])) {
      if ($arg[1] == 'add') {
        $section = 'node-add';
      }
      elseif (isset($arg[2]) && is_numeric($arg[1]) && ($arg[2] == 'edit' || $arg[2] == 'delete')) {
        $section = 'node-' . $arg[2];
      }
    }
    $vars['classes_array'][] = drupal_html_class('section-' . $section);

    // Store the menu item since it has some useful information.
    $vars['menu_item'] = menu_get_item();

    // Add class for Views and Panel pages.
    if ($vars['menu_item']) {
      switch ($vars['menu_item']['page_callback']) {
        case 'views_page':
          $vars['classes_array'][] = 'page-views';
          break;

        case 'page_manager_blog':
        case 'page_manager_blog_user':
        case 'page_manager_contact_site':
        case 'page_manager_contact_user':
        case 'page_manager_node_add':
        case 'page_manager_node_edit':
        case 'page_manager_node_view_page':
        case 'page_manager_page_execute':
        case 'page_manager_poll':
        case 'page_manager_search_page':
        case 'page_manager_term_view_page':
        case 'page_manager_user_edit_page':
        case 'page_manager_user_view_page':
          $vars['classes_array'][] = 'page-panels';
          break;
      }
    }
  }
}

/**
 * Implements hook_process_html().
 */
function gesso_process_html(&$vars, $hook) {
  // Flatten out html_and body_attributes.
  $vars['html_attributes'] = empty($vars['html_attributes_array']) ? '' : drupal_attributes($vars['html_attributes_array']);
  $vars['body_attributes'] = empty($vars['body_attributes_array']) ? '' : drupal_attributes($vars['body_attributes_array']);
}

/**
 * Implements hook_process_html_tag().
 */
function gesso_process_html_tag(&$vars) {
  $tag = &$vars['element'];

  if ($tag['#tag'] == 'style') {
    // Remove media="all" but leave others unaffected.
    if (isset($tag['#attributes']['media']) && $tag['#attributes']['media'] === 'all') {
      unset($tag['#attributes']['media']);
    }
  }
}
