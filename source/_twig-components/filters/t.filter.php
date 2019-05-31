<?php
function addTFilter(\Twig_Environment &$env, $config) {
  // Drupal translate filter
  $env->addFilter(new \Twig_SimpleFilter('t', function ($string) {
    return $string;
  }));
}