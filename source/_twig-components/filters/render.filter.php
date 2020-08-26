<?php

/**
 * @file
 * Gesso Twig Extension.
 */

/**
 * Passthrough to the render function which prepares information for display.
 *
 * @param Twig_Environment $env
 *   Current Twig environment.
 * @param string $config
 *   Current configuration state.
 */
function add_render_filter(Twig_Environment &$env, $config) {
  // Drupal Render filter.
  $env->addFilter(new Twig_SimpleFilter('render', function ($string) {
    return $string;
  }));
}
