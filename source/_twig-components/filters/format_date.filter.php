<?php

/**
 * @file
 * Gesso extension for formatting dates.
 */

/**
 * Helper function that is a passthrough to the D8 format_date function.
 *
 * @todo This needs to be ported to D8 date handling most likely.
 *
 * @param Twig_Environment $env
 *   Current Twig environment.
 * @param string $config
 *   Current configuration state.
 */
function add_format_date_filter(Twig_Environment &$env, $config) {
  $env->addFilter(new Twig_SimpleFilter('format_date', function ($string) {
    return $string;
  }));
}
