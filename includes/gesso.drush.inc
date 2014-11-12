<?php
/**
 * @file
 * Drush command to create a new theme based on the Gesso theme.
 */

/**
 * Implements hook_drush_command().
 */
function gesso_drush_command() {
  return array('gesso' => array(
    'description' => 'Create a new theme based on the Gesso theme.',
    'arguments' => array(
      'name' => 'The name of your theme.',
    ),
    'options' => array(
      'description' => 'A short description of your new theme.',
      'location' => 'The location of your new theme. Defaults to sites/all/themes.',
      'machine_name' => 'The machine-readable name of your new theme. This will be auto-generated from the human-readable name if omitted.',
    ),
    'examples' => array(
      'drush gesso "New Theme Name"' => 'Creates a new theme called "New Theme Name" with a machine name of "new_theme_name".',
      'drush gesso "New Theme Name" --machine-name=new_theme' => 'Creates a new theme called "New Theme Name" with a machine name of "new_theme".',
      'drush gesso "New Theme Name" --location=sites/all/themes/custom' => 'Creates a new theme called "New Theme Name" in sites/all/themes/custom.',
    ),
  ));
}

/**
 * Implements hook_drush_help().
 */
function gesso_drush_help($section) {
  switch ($section) {
    case 'drush:gesso':
      return dt('This command will create a new theme based on the Gesso theme.');
  }
}

/**
 * Implements drush_hook_COMMAND_validate().
 */
function drush_gesso_validate($name = NULL) {
  system_rebuild_theme_data();

  $description = drush_get_option('description');
  $location = drush_get_option('location', 'sites/all/themes');
  $machine_name = drush_get_option('machine_name', _gesso_machine_name($name));

  drush_set_option('machine_name', $machine_name);

  if (!_gesso_theme_exists('gesso')) {
    return drush_set_error(
      'GESSO_ERROR',
      dt('Where is the Gesso theme? I could not find it.')
    );
  }

  if (_gesso_theme_exists($machine_name)) {
    return drush_set_error(
      'GESSO_ERROR',
      dt('A theme with that name already exists. The machine-readable name must be unique.')
    );
  }

  if (!$machine_name || !preg_match('/^[a-z][a-z0-9_]*$/', $machine_name)) {
    return drush_set_error(
      'GESSO_ERROR',
      dt('The machine name was invalid or could not be generated properly. It must start with a letter and may only contain lowercase letters, numbers, and underscores.')
    );
  }
}

/**
 * Converts $name to a machine-readable format.
 */
function _gesso_machine_name($name) {
  $name = str_replace(' ', '_', strtolower($name));
  $search = array(
    '/[^a-z0-9_]/', // Remove characters not valid in function names.
    '/^[^a-z]+/',   // Functions must begin with an alpha character.
  );
  $name = preg_replace($search, '', $name);
  $name = str_replace('__', '_', $name);
  $name = trim($name, '_');

  return $name;
}

/**
 * Checks if $theme_name already exists in Drupal.
 */
function _gesso_theme_exists($theme_name) {
  $themes = list_themes();

  return isset($themes[$theme_name]);
}

/**
 * Implements drush_hook_COMMAND().
 */
function drush_gesso($name = NULL) {
  // Get new theme options.
  if (!isset($name)) {
    $name = drush_get_option('name');
  }
  $machine_name = drush_get_option('machine_name', _gesso_machine_name($name));
  $description = drush_get_option('description');

  // Get theme paths.
  $gesso_path = drush_normalize_path(drush_get_context('DRUSH_DRUPAL_ROOT') . '/' . drupal_get_path('theme', 'gesso'));
  $theme_path = 'sites/all/themes';
  if ($location = drush_get_option('location')) {
    $theme_path = drush_trim_path($location);
  }
  $new_path = drush_normalize_path(drush_get_context('DRUSH_DRUPAL_ROOT') . '/' . $theme_path . '/' . $machine_name);

  // Copy the Gesso theme directory recursively to the new theme’s location.
  drush_op('drush_copy_dir', $gesso_path, $new_path);

  // Remove Gesso’s drush file from the new theme.
  drush_op('unlink', "$new_path/includes/gesso.drush.inc");

  // Rename the .info file.
  $gesso_info_file = drush_normalize_path($new_path . '/' . 'gesso.info');
  $new_info_file = drush_normalize_path($new_path . '/' . $machine_name . '.info');
  drush_op('rename', $gesso_info_file, $new_info_file);

  // Update the .info file based on the command options.
  $changes = array(
    'Gesso' => $name,
    'Sass-based starter theme.' => $description,
  );
  drush_op('gesso_file_str_replace', $new_info_file, array_keys($changes), $changes);

  // Replace all occurrences of 'gesso' with the machine name of the new theme.
  $files = array(
    'theme-settings.php',
    'includes/aggregator.inc',
    'includes/block.inc',
    'includes/breadcrumb.inc',
    'includes/comments.inc',
    'includes/css.inc',
    'includes/date.inc',
    'includes/entity.inc',
    'includes/feed-icon.inc',
    'includes/field-collection.inc',
    'includes/field.inc',
    'includes/file.inc',
    'includes/form.inc',
    'includes/html.inc',
    'includes/js.inc',
    'includes/lists.inc',
    'includes/messages.inc',
    'includes/navigation.inc',
    'includes/node.inc',
    'includes/page.inc',
    'includes/pager.inc',
    'includes/panels-ipe.inc',
    'includes/panels.inc',
    'includes/progress-bar.inc',
    'includes/region.inc',
    'includes/user.inc',
    'includes/views.inc',
    'js/scripts.js',
    'panels/layouts/sidebar/sidebar.inc',
    'panels/layouts/three_column/three_column.inc',
  );
  foreach ($files as $file) {
    drush_op('gesso_file_str_replace', drush_normalize_path($new_path . '/' . $file), 'gesso', $machine_name);
  }

  // Update box-sizing polyfill path.
  drush_op('gesso_file_str_replace', drush_normalize_path($new_path . '/sass/partials/global/variables/_layout.scss'), 'sites/all/themes/gesso', $theme_path . '/' . $machine_name);

  // Notify user of the newly created theme.
  drush_print(dt(
    "\nThe \"!name\" theme has been created in: !path\n",
    array(
      '!name' => $name,
      '!path' => $new_path,
    )
  ));
}

/**
 * Replace strings in a file.
 */
function gesso_file_str_replace($file_path, $find, $replace) {
  $file_path = drush_normalize_path($file_path);
  $file_contents = file_get_contents($file_path);
  $file_contents = str_replace($find, $replace, $file_contents);
  file_put_contents($file_path, $file_contents);
}
