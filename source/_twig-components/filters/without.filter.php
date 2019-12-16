<?php

/**
 * @file
 * Gesso Twig extension for without function.
 */

/**
 * Leave elements out of the render pipeline.
 *
 * @param \Twig_Environment $env
 *   Current Twig environment.
 * @param string $config
 *   Current configuration state.
 */
function addWithoutFilter(\Twig_Environment &$env, $config) {
  $env->addFilter(new Twig_SimpleFilter('without', function ($string) {
    return $string;
  }));
}
