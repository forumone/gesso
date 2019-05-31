<?php
function addFormatDateFilter(\Twig_Environment &$env, $config) {
  $env->addFilter(new \Twig_SimpleFilter('format_date', function ($string) {
    return $string;
  }));
}