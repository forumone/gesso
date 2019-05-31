<?php
function addWithoutFilter(\Twig_Environment &$env, $config) {
  $env->addFilter(new Twig_SimpleFilter('without', function ($string) {
    return $string;
  }));
}
