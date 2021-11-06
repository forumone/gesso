<?php

namespace Drupal\gesso_helper;

/**
 * Iterator to exclude directories.
 */
class GessoHelperDirFilterExclude extends \RecursiveFilterIterator {

  /**
   * @var array
   *   Directories to exclude.
   */
  protected array $exclude = [
    'node_modules',
    'gesso_helper',
    'dist',
    '.git',
  ];

  /**
   *
   */
  public function accept() {
    return !($this->isDir() && in_array($this->getFilename(), $this->exclude));
  }

  /**
   *
   */
  public function getChildren() {
    return new GessoHelperDirFilterExclude($this->getInnerIterator()->getChildren());
  }

}
