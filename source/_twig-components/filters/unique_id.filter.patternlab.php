<?php

/**
 * @file
 * Twig filter to polyfill the unique_id filter for Pattern Lab.
 */
function addUniqueIdFilter(\Twig_Environment &$env, $config) {
  $env->addFilter(new \Twig_SimpleFilter('unique_id', function($string) {
    return $string . '--' . uniqid();
  }));
}
