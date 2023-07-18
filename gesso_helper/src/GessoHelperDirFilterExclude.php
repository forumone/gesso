<?php

namespace Drupal\gesso_helper;

/**
 * Iterator to exclude directories.
 */
class GessoHelperDirFilterExclude extends \RecursiveFilterIterator {

  /**
   * Directories to include.
   *
   * @var array
   */
  protected array $exclude = [
    'node_modules',
    'gesso_helper',
    'dist',
    '.git',
  ];

  /**
   * Whether this directory or file should be excluded.
   */
  public function accept() {
    return !($this->isDir() && in_array($this->getFilename(), $this->exclude));
  }

  /**
   * Get children.
   */
  public function getChildren() {
    return new GessoHelperDirFilterExclude($this->getInnerIterator()->getChildren());
  }

}
