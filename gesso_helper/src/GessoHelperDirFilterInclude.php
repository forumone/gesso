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
  public function accept() {
    return ($this->isDir() && in_array($this->getFilename(), $this->includeDirs) ||
      !$this->isDir() && in_array($this->getFilename(), $this->includeFiles));
  }

  /**
   * Get children.
   */
  public function getChildren() {
    return new GessoHelperDirFilterExclude($this->getInnerIterator()->getChildren());
  }

}
