<?php

/**
 * @file
 * Drush command to create a new theme based on the Gesso theme.
 */

/**
 * Implements hook_drush_command().
 */
function gesso_drush_command() {
  return [
    'gesso' => [
      'description' => 'Create a new theme based on the Gesso theme.',
      'arguments' => [
        'name' => 'The name of your theme.',
      ],
      'options' => [
        'description' => 'A short description of your new theme.',
        'machine-name' => 'The machine-readable name of your new theme. This will be auto-generated from the human-readable name if omitted.',
      ],
      'examples' => [
        'drush gesso "New Theme Name"' => 'Creates a new theme called "New Theme Name" with a machine name of "new_theme_name".',
        'drush gesso "New Theme Name" --machine-name=new_theme' => 'Creates a new theme called "New Theme Name" with a machine name of "new_theme".',
      ],
    ],
  ];
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
  $machine_name = drush_get_option('machine-name', _gesso_machine_name($name));

  drush_set_option('machine-name', $machine_name);

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
  $search = [
  // Remove characters not valid in function names.
    '/[^a-z0-9_]/',
  // Functions must begin with an alpha character.
    '/^[^a-z]+/',
  ];
  $name = preg_replace($search, '', $name);
  $name = str_replace('__', '_', $name);
  $name = trim($name, '_');

  return $name;
}

/**
 * Checks if $theme_name already exists in Drupal.
 */
function _gesso_theme_exists($theme_name) {
  $theme_handler = \Drupal::service('theme_handler');
  $themes = $theme_handler->listInfo();

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
  $machine_name = drush_get_option('machine-name', _gesso_machine_name($name));
  $description = drush_get_option('description');

  // Get theme paths.
  $gesso_path = drush_normalize_path(drush_get_context('DRUSH_DRUPAL_ROOT') . '/' . drupal_get_path('theme', 'gesso'));
  $theme_path = substr($gesso_path, 0, strrpos( $gesso_path, '/'));
  $new_path = drush_normalize_path($theme_path . '/' . $machine_name);

  // Copy the Gesso theme directory recursively to the new theme’s location.
  drush_op('drush_copy_dir', $gesso_path, $new_path);

  // Remove Gesso’s drush file from the new theme.
  drush_op('unlink', "$new_path/includes/gesso.drush.inc");

  // Rename the .info.yml file.
  $gesso_info_file = drush_normalize_path($new_path . '/' . 'gesso.info.yml');
  $new_info_file = drush_normalize_path($new_path . '/' . $machine_name . '.info.yml');
  drush_op('rename', $gesso_info_file, $new_info_file);

  // Update the .info.yml file based on the command options.
  $changes = [
    'Gesso' => $name,
    'Sass-based starter theme.' => $description,
    'gesso' => $machine_name,
  ];
  drush_op('gesso_file_str_replace', $new_info_file, array_keys($changes), $changes);

  // Rename the .breakpoints.yml file.
  $gesso_info_file = drush_normalize_path($new_path . '/' . 'gesso.breakpoints.yml');
  $new_info_file = drush_normalize_path($new_path . '/' . $machine_name . '.breakpoints.yml');
  drush_op('rename', $gesso_info_file, $new_info_file);

  // Rename the .libraries.yml file.
  $gesso_libraries_file = drush_normalize_path($new_path . '/' . 'gesso.libraries.yml');
  $new_libraries_file = drush_normalize_path($new_path . '/' . $machine_name . '.libraries.yml');
  drush_op('rename', $gesso_libraries_file, $new_libraries_file);

  // Rename the .theme file.
  $gesso_theme_file = drush_normalize_path($new_path . '/' . 'gesso.theme');
  $new_theme_file = drush_normalize_path($new_path . '/' . $machine_name . '.theme');
  drush_op('rename', $gesso_theme_file, $new_theme_file);

  // Replace all occurrences of 'gesso' with the machine name of the new theme.
  $breakpoints_file = $machine_name . '.breakpoints.yml';
  $libraries_file = $machine_name . '.libraries.yml';
  $theme_file = $machine_name . '.theme';
  $files = [
    $breakpoints_file,
    $libraries_file,
    $theme_file,
    'js/scripts.js',
    'includes/block.inc',
    'includes/form.inc',
    'includes/html.inc',
    'includes/navigation.inc',
    'includes/taxonomy.inc',
    'includes/views.inc',
  ];
  foreach ($files as $file) {
    drush_op('gesso_file_str_replace', drush_normalize_path($new_path . '/' . $file), 'gesso', $machine_name);
  }

  // Notify user of the newly created theme.
  drush_print(dt(
    "\nThe \"!name\" theme has been created in: !path\n",
    [
      '!name' => $name,
      '!path' => $new_path,
    ]
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
