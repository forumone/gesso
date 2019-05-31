<?php
function addCleanIdFilter(\Twig_Environment &$env, $config) {
  $env->addFilter(new \Twig_SimpleFilter('clean_id', function ($string) {
    return $string;
  }));
}