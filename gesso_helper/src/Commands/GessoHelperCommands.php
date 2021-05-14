<?php

namespace Drupal\gesso_helper\Commands;

use Consolidation\SiteAlias\SiteAliasManagerAwareInterface;
use Consolidation\SiteAlias\SiteAliasManagerAwareTrait;
use Drupal\Core\Extension\ThemeHandlerInterface;
use Drush\Drush;
use Drush\Commands\DrushCommands;
use Symfony\Component\Filesystem\Filesystem;
use Webmozart\PathUtil\Path;

/**
 * A Drush commandfile.
 *
 * In addition to this file, you need a drush.services.yml
 * in root of your module, and a composer.json file that provides the name
 * of the services file to use.
 *
 * See these files for an example of injecting Drupal services:
 *   - http://cgit.drupalcode.org/devel/tree/src/Commands/DevelCommands.php
 *   - http://cgit.drupalcode.org/devel/tree/drush.services.yml
 */
class GessoHelperCommands extends DrushCommands implements SiteAliasManagerAwareInterface {

  use SiteAliasManagerAwareTrait;

  /**
   * The theme handler service.
   *
   * @var Drupal\Core\Extension\ThemeHandlerInterface
   */
  protected $themeHandler;

  /**
   * Set of available themes.
   *
   * @var array
   */
  protected $themeList;

  /**
   * GessoHelperCommands constructor.
   *
   * @param Drupal\Core\Extension\ThemeHandlerInterface $themeHandler
   *   The theme handler.
   */
  public function __construct(ThemeHandlerInterface $themeHandler) {
    parent::__construct();
    $this->themeHandler = $themeHandler;
  }

  /**
   * Create a new theme based on the Gesso theme.
   *
   * @param string $name
   *   The name of your theme.
   * @param array $options
   *   An associative array of options whose values come from cli,
   *   aliases, config, etc.
   *
   * @option description
   *   A short description of your new theme.
   * @option machine-name
   *   The machine-readable name of your new theme. This will be
   *   auto-generated from the human-readable name if omitted.
   * @usage drush gesso "New Theme Name"
   *   Creates a new theme called "New Theme Name" with a machine name
   *   of "new_theme_name".
   * @usage drush gesso "New Theme Name" --machine-name=new_theme
   *   Creates a new theme called "New Theme Name" with a machine name
   *   of "new_theme".
   *
   * @command gesso
   *
   * @throws \Exception
   */
  public function gesso(
    $name,
    array $options = ['description' => NULL, 'machine-name' => NULL]
  ) {
    // Get new theme options.
    if (!isset($name)) {
      $name = $options['name'];
    }
    $machine_name = $options['machine-name'] ?: $this->gessoMachineName($name);
    $description = $options['description'];

    // Validate the command.
    if (!$this->gessoThemeExists('gesso')) {
      throw new \Exception(dt('Where is the Gesso theme? I could not find it.'));
    }

    if ($this->gessoThemeExists($machine_name)) {
      throw new \Exception(dt('A theme with that name already exists. The machine-readable name must be unique.'));
    }

    if (!$machine_name || !preg_match('/^[a-z][a-z0-9_]*$/', $machine_name)) {
      throw new \Exception(dt('The machine name was invalid or could not be generated properly. It must start '
        . 'with a letter and may only contain lowercase letters, numbers, and underscores.'));
    }

    $this->io()->text(dt('Setting up the theme. This may take a while...'));
    // Get theme paths.
    $drupalRoot = Drush::bootstrapManager()->getRoot();
    $gesso_path = Path::join($drupalRoot, drupal_get_path('theme', 'gesso'));
    $theme_path = substr($gesso_path, 0, strrpos($gesso_path, '/'));
    $new_path = Path::join($theme_path, $machine_name);

    // Copy the Gesso theme directory recursively to the new theme’s location.
    $fs = new Filesystem();
    $fs->mirror($gesso_path, $new_path);

    // Remove Gesso’s helper module from the new theme.
    $this->gessoRecursiveRm(Path::join($new_path, 'gesso_helper'));

    // Rename the .info.yml file.
    $gesso_info_file = Path::join($new_path, 'gesso.info.yml');
    $new_info_file = Path::join($new_path, $machine_name . '.info.yml');
    drush_op('rename', $gesso_info_file, $new_info_file);

    // Update the .info.yml file based on the command options.
    $changes = [
      'Gesso' => $name,
      'Sass-based starter theme.' => $description,
      'gesso' => $machine_name,
    ];
    $this->gessoFileStrReplace($new_info_file, array_keys($changes), $changes);

    // Rename the .breakpoints.yml file.
    $gesso_info_file = Path::join($new_path, 'gesso.breakpoints.yml');
    $new_info_file = Path::join($new_path, $machine_name . '.breakpoints.yml');
    drush_op('rename', $gesso_info_file, $new_info_file);

    // Rename the .libraries.yml file.
    $gesso_libraries_file = Path::join($new_path, 'gesso.libraries.yml');
    $new_libraries_file = Path::join($new_path, $machine_name . '.libraries.yml');
    drush_op('rename', $gesso_libraries_file, $new_libraries_file);

    // Rename the .layouts.yml file.
    $gesso_layouts_file = Path::join($new_path, 'gesso.layouts.yml');
    $new_layouts_file = Path::join($new_path, $machine_name . '.layouts.yml');
    drush_op('rename', $gesso_layouts_file, $new_layouts_file);

    // Rename the .theme file.
    $gesso_theme_file = Path::join($new_path, 'gesso.theme');
    $new_theme_file = Path::join($new_path, $machine_name . '.theme');
    drush_op('rename', $gesso_theme_file, $new_theme_file);

    // Replace all occurrences of 'gesso'
    // with the machine name of the new theme.
    $breakpoints_file = $machine_name . '.breakpoints.yml';
    $libraries_file = $machine_name . '.libraries.yml';
    $layouts_file = $machine_name . '.layouts.yml';
    $theme_file = $machine_name . '.theme';
    $files = [
      $breakpoints_file,
      $libraries_file,
      $theme_file,
      $layouts_file,
      'includes/block.inc',
      'includes/field.inc',
      'includes/form.inc',
      'includes/html.inc',
      'includes/navigation.inc',
      'includes/taxonomy.inc',
      'includes/views.inc',
    ];
    foreach ($files as $file) {
      $this->gessoFileStrReplace(
        Path::join($new_path, $file),
        ['gesso', 'Gesso'],
        [$machine_name, $name]
      );
    }

    // Notify user of the newly created theme.
    $this->io()->block(dt(
      "\nThe \"!name\" theme has been created in: !path\n",
      [
        '!name' => $name,
        '!path' => $new_path,
      ]
    ), 'SUCCESS', 'fg=black;bg=green', ' ! ');

    // Warn the user that they might have some additional steps.
    $this->io()->caution(dt('If you want to remove the gesso theme entirely, be sure to copy and rename the '
      . 'gesso_helper module first.'));
  }

  /**
   * Converts $name to a machine-readable format.
   */
  private function gessoMachineName($name) {
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
  private function gessoThemeExists($theme_name) {
    if (empty($this->themeList)) {
      $this->themeList = $this->themeHandler->rebuildThemeData();
    }

    return isset($this->themeList[$theme_name]);
  }

  /**
   * Replace strings in a file.
   */
  private function gessoFileStrReplace($file_path, $find, $replace) {
    $file_path = Path::normalize($file_path);
    $file_contents = file_get_contents($file_path);
    $file_contents = str_replace($find, $replace, $file_contents);
    drush_op('file_put_contents', $file_path, $file_contents);
  }

  /**
   * Recursively removes all files and subfolders in a directory.
   *
   * It later also removes the directory itself.
   *
   * @param string $path
   *   Path to the top-level directory.
   */
  private function gessoRecursiveRm($path) {
    if (is_dir($path)) {
      $dir_contents = scandir($path);
      foreach ($dir_contents as $item) {
        if ($item !== '.' && $item !== '..') {
          $subpath = Path::join($path, $item);
          if (is_dir($subpath)) {
            $this->gessoRecursiveRm($subpath);
          }
          else {
            drush_op('unlink', $subpath);
          }
        }
      }
      drush_op('rmdir', $path);
    }
  }

}
