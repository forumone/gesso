<?php

namespace Drupal\gesso_helper;

/**
 * Iterator to exclude directories.
 */
class GessoHelperDirFilterExclude extends \RecursiveFilterIterator {

  /**
   * Directories to exclude.
   *
   * @var array<int, string>
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
  public function accept(): bool {
    /** @var \RecursiveDirectoryIterator $inner */
    $inner = $this->getInnerIterator();
    return !($inner->isDir() && in_array($inner->getFilename(), $this->exclude, TRUE));
  }

  /**
   * Get children.
   */
  public function getChildren(): ?GessoHelperDirFilterExclude {
    /** @var \RecursiveDirectoryIterator $inner */
    $inner = $this->getInnerIterator();
    return new GessoHelperDirFilterExclude($inner->getChildren());
  }

}
