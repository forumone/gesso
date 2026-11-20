<?php

namespace Drupal\gesso;

use Drupal\Core\Theme\StarterKitInterface;
use Symfony\Component\Filesystem\Filesystem;

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
    // Core's "**" globs do not match dot-directories, so the "node_modules/**"
    // entry in gesso.starterkit.yml misses node_modules/.cache (created by
    // Storybook). Remove the whole directory.
    (new Filesystem())->remove("$working_dir/node_modules");

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

    // Skip gesso_helper: it is copied unedited, so there is nothing to restore.
    $iterator = new \RecursiveIteratorIterator(
      new \RecursiveCallbackFilterIterator(
        new \RecursiveDirectoryIterator($working_dir, \FilesystemIterator::SKIP_DOTS),
        static fn (\SplFileInfo $file): bool => !($file->isDir() && $file->getFilename() === 'gesso_helper'),
      )
    );
    foreach ($iterator as $file) {
      if (!$file->isFile() || !preg_match('/\.(inc|module|theme|php|yml|twig)$/', $file->getFilename())) {
        continue;
      }
      self::replaceInFile($file->getPathname(), $replacements);
    }

    // Storybook resolves SDC component IDs (e.g. "gesso:button") through a
    // Twig namespace named after the theme. Core rewrites the IDs in the Twig
    // files, so the namespace in this (otherwise unedited) file must match.
    self::replaceInFile("$working_dir/.storybook/main.js", [
      "gesso: resolve(__dirname, '../', 'components')" => "{$machine_name}: resolve(__dirname, '../', 'components')",
    ]);

    // The original theme always exists at generation time, so a second copy of
    // the Gesso Helper module is expected until it is removed.
    fwrite(STDERR, "\nNOTE: The gesso_helper module was copied into $machine_name unchanged. Only one copy of\n"
      . "gesso_helper may exist in your codebase. Delete the original gesso theme (or its gesso_helper\n"
      . "directory) before enabling $machine_name.\n\n");
  }

  /**
   * Applies literal string replacements to a file, if it exists.
   *
   * @param string $path
   *   The file path.
   * @param array<string, string> $replacements
   *   Search strings mapped to their replacements.
   */
  private static function replaceInFile(string $path, array $replacements): void {
    if (!is_file($path)) {
      return;
    }
    $contents = file_get_contents($path);
    $updated = str_replace(array_keys($replacements), array_values($replacements), $contents);
    if ($updated !== $contents) {
      file_put_contents($path, $updated);
    }
  }

}
