<?php

/**
 * @file
 * Block-related hook implementations.
 */

use Drupal\block_content\BlockContentInterface;

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 *
 * @phpstan-param array<int, string> $suggestions
 *   The theme suggestions.
 * @phpstan-param array<string, mixed> $variables
 *   The template variables.
 */
function gesso_theme_suggestions_block_alter(array &$suggestions, array $variables): void {
  $content = $variables['elements']['content'];
  if (isset($content['#block_content']) and $content['#block_content'] instanceof BlockContentInterface) {
    $suggestions = [];
    $bundle = $content['#block_content']->bundle();
    $view_mode = $content['#view_mode'];
    $suggestions[] = 'block__' . $bundle;
    $suggestions[] = 'block__' . $view_mode;
    $suggestions[] = 'block__' . $bundle . '__' . $view_mode;
    if (!empty($variables['elements']['#id'])) {
      $suggestions[] = 'block__' . $variables['elements']['#id'];
    }
  }
}
