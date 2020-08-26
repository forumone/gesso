<?php

/**
 * @file
 * Gesso Twig Extension to clean class names.
 */

/**
 * Helper function to clean up potential class names.
 *
 * @param Twig_Environment $env
 *   Current Twig environment.
 * @param string $config
 *   Current configuration state.
 */
function add_clean_class_filter(Twig_Environment &$env, $config) {
  $env->addFilter(new Twig_SimpleFilter('clean_class', function ($string) {
    $filters = [
      ' ' => '-',
      '_' => '-',
      '/' => '-',
      '[' => '-',
      ']' => '',
    ];
    $string = str_replace(array_keys($filters), array_values($filters), $string);
    $string = preg_replace('/[^\x{002D}\x{0030}-\x{0039}\x{0041}-\x{005A}\x{005F}\x{0061}-\x{007A}\x{00A1}-\x{FFFF}]/u', '', $string);
    $string = preg_replace([
      '/^[0-9]/',
      '/^(-[0-9])|^(--)/',
    ], ['_', '__'], $string);
    return $string;
  }));
}
