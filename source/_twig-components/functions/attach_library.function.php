<?php

/**
 * @file
 * Creates an "attach_library" function for Pattern Lab.
 */

/**
 * Add availability of attach_library function to PatternLab.
 */
function add_attach_library_function(\Twig_Environment &$env, $config) {
  $env->addFunction(new \Twig_SimpleFunction('attach_library', function ($string) {
    return;
  }));
}
