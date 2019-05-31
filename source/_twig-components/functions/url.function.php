<?php
function addUrlFunction(\Twig_Environment &$env, $config) {
  // https://www.drupal.org/node/2486991
  $env->addFunction(new \Twig_SimpleFunction('url', function ($string) {
    return '#';
  }));
}
