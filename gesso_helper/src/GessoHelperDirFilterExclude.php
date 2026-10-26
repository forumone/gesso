<?php

namespace Drupal\gesso_helper;

/**
 * Iterator to exclude directories.
 */
final class GessoHelperDirFilterExclude extends \RecursiveFilterIterator {

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
  public function getChildren(): static {
    /** @var \RecursiveDirectoryIterator $inner */
    $inner = $this->getInnerIterator();
    return new static($inner->getChildren());
  }

}
