<?php

namespace Drupal\gesso_helper;

/**
 * Iterator to include directories.
 */
class GessoHelperDirFilterInclude extends \RecursiveFilterIterator {

  /**
   * Directories to include.
   *
   * @var array<int, string>
   */
  protected array $includeDirs = [
    'includes',
    'templates',
    'config',
  ];

  /**
   * Files to include.
   *
   * @var array<int, string>
   */
  protected array $includeFiles = [
    'gesso.libraries.yml',
    'gesso.theme',
    'theme-settings.php',
  ];

  /**
   * Whether this directory or file should be included.
   */
  public function accept(): bool {
    /** @var \RecursiveDirectoryIterator $inner */
    $inner = $this->getInnerIterator();
    return ($inner->isDir() && in_array($inner->getFilename(), $this->includeDirs, TRUE) ||
      !$inner->isDir() && in_array($inner->getFilename(), $this->includeFiles, TRUE));
  }

  /**
   * Get children.
   *
   * Once inside an included directory, switch to the exclude filter so nested
   * contents are copied except for known junk directories.
   */
  public function getChildren(): ?GessoHelperDirFilterExclude {
    /** @var \RecursiveDirectoryIterator $inner */
    $inner = $this->getInnerIterator();
    return new GessoHelperDirFilterExclude($inner->getChildren());
  }

}
