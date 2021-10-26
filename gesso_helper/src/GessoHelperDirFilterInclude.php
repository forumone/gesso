<?php

namespace Drupal\gesso_helper;

class GessoHelperDirFilterInclude extends \RecursiveFilterIterator {

  /**
   * @var array
   *   Directories to include
   */
  protected array $includeDirs = [
    'includes',
    'templates'
  ];

  protected array $includeFiles = [
    'gesso.libraries.yml',
    'gesso.theme',
    'theme-settings.php'
  ];

  public function accept() {
    return ($this->isDir() && in_array($this->getFilename(), $this->includeDirs) ||
      !$this->isDir() && in_array($this->getFilename(), $this->includeFiles));
  }

  public function getChildren() {
    return new GessoHelperDirFilterExclude($this->getInnerIterator()->getChildren());
  }

}
