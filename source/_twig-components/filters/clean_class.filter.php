<?php
function addCleanClassFilter(\Twig_Environment &$env, $config) {
  $env->addFilter(new \Twig_SimpleFilter('clean_class', function ($string) {
    return $string;
  }));
}