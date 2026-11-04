<?php

namespace Drupal\gesso;

use Drupal\Core\Theme\StarterKitInterface;

/**
 * Post-processes themes generated from Gesso.
 */
final class StarterKit implements StarterKitInterface {

  /**
   * {@inheritdoc}
   *
   * Core replaces "gesso" everywhere in the files it edits. Restore the
   * references that belong to the Gesso Helper module or to files that are
   * not renamed.
   */
  public static function postProcess(string $working_dir, string $machine_name, string $theme_name): void {
    $replacements = [
      // The Gesso Helper module is not renamed.
      "{$machine_name}_helper" => 'gesso_helper',
      // Element types and theme hooks provided by Gesso Helper.
      "'{$machine_name}_icon_link'" => "'gesso_icon_link'",
      "'{$machine_name}_button'" => "'gesso_button'",
      "'{$machine_name}_icon__custom'" => "'gesso_icon__custom'",
      "_theme_suggestions_{$machine_name}_icon_alter" => '_theme_suggestions_gesso_icon_alter',
      // The drupalSettings key read by the (unedited) front-end code.
      "['drupalSettings']['{$machine_name}']" => "['drupalSettings']['gesso']",
      // The macro file is not renamed.
      "{$machine_name}.macro.twig" => 'gesso.macro.twig',
    ];

    $iterator = new \RecursiveIteratorIterator(
      new \RecursiveDirectoryIterator($working_dir, \FilesystemIterator::SKIP_DOTS)
    );
    foreach ($iterator as $file) {
      if (!$file->isFile() || !preg_match('/\.(inc|module|theme|php|yml|twig)$/', $file->getFilename())) {
        continue;
      }
      $contents = file_get_contents($file->getPathname());
      $updated = str_replace(array_keys($replacements), array_values($replacements), $contents);
      if ($updated !== $contents) {
        file_put_contents($file->getPathname(), $updated);
      }
    }
  }

}
