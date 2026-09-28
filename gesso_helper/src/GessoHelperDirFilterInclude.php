<?php

namespace Drupal\gesso_helper;

/**
 * Iterator to include directories.
 */
final class GessoHelperDirFilterInclude extends \RecursiveFilterIterator {

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
   * Directories to exclude once inside an included directory.
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
   * Constructs a new GessoHelperDirFilterInclude.
   *
   * @param \RecursiveIterator<mixed, mixed> $iterator
   *   The iterator to filter.
   * @param bool $insideIncludedDir
   *   Whether this instance is already inside an included directory.
   */
  public function __construct(\RecursiveIterator $iterator, protected bool $insideIncludedDir = FALSE) {
    parent::__construct($iterator);
  }

  /**
   * Whether this directory or file should be included.
   */
  public function accept(): bool {
    /** @var \RecursiveDirectoryIterator $inner */
    $inner = $this->getInnerIterator();
    if ($this->insideIncludedDir) {
      return !($inner->isDir() && in_array($inner->getFilename(), $this->exclude, TRUE));
    }
    return ($inner->isDir() && in_array($inner->getFilename(), $this->includeDirs, TRUE) ||
      !$inner->isDir() && in_array($inner->getFilename(), $this->includeFiles, TRUE));
  }

  /**
   * Get children.
   *
   * Once inside an included directory, switch to excluding known junk
   * directories so the rest of the nested contents are copied.
   */
  public function getChildren(): static {
    /** @var \RecursiveDirectoryIterator $inner */
    $inner = $this->getInnerIterator();
    return new static($inner->getChildren(), TRUE);
  }

}
