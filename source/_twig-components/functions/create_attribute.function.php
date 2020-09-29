<?php

/**
 * @file
 * Add "create_attribute" function for Pattern Lab.
 */

/**
 * Add attributes to an element.
 *
 * @param Twig_Environment $env
 *   Current twig environment.
 * @param string $config
 *   Current config.
 */
function add_create_attribute_function(Twig_Environment &$env, $config) {
  $function = new Twig_SimpleFunction(
    'create_attribute',
    function ($attributes = []) {
      foreach ($attributes as $key => $value) {
        if (!is_array($value)) {
          $value = [$value];
        }
        print ' ' . $key . '="' . implode(' ', $value) . '"';
      }
    },
    ['is_safe' => ['html']]
  );
  $env->addFunction($function);
}
