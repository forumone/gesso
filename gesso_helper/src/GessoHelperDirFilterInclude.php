<?php

namespace Drupal\gesso_helper;

/**
 * Iterator to include directories.
 */
class GessoHelperDirFilterInclude extends \RecursiveFilterIterator {

  /**
   * Directories to include.
   *
   * @var array
   */
  protected array $includeDirs = [
    'includes',
    'templates',
    'config',
  ];

  /**
   * Files to include.
   *
   * @var array
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
    $inner = $this->getInnerIterator();
    return ($inner->isDir() && in_array($inner->getFilename(), $this->includeDirs) ||
      !$inner->isDir() && in_array($inner->getFilename(), $this->includeFiles));
  }

  /**
   * Get children.
   */
  public function getChildren(): ?GessoHelperDirFilterExclude {
    return new GessoHelperDirFilterExclude($this->getInnerIterator()->getChildren());
  }

}
