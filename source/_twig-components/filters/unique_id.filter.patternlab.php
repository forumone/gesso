<?php

/**
 * @file
 * Twig filter to polyfill the unique_id filter for Pattern Lab.
 */

/**
 * Generate a unique ID in Pattern Lab.
 *
 * @param Twig_Environment $env
 *   Current Twig environment.
 * @param string $config
 *   Current configuration state.
 */
function add_unique_id_filter(Twig_Environment &$env, $config) {
  $env->addFilter(new Twig_SimpleFilter('unique_id', function ($string) {
    return $string . '--' . uniqid();
  }));
}
