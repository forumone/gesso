<?php

/**
 * @file
 * Place to allow placeholder filtering.
 */

/**
 * Stub function to allow for placeholder filtering.
 *
 * @param Twig_Environment $env
 *   Current Twig environment.
 * @param string $config
 *   Current configuration state.
 */
function add_placeholder_filter(Twig_Environment &$env, $config) {
  $env->addFilter(new Twig_SimpleFilter('placeholder', function ($string) {
    return $string;
  }));
}
