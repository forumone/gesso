<?php
function addPathFunction(\Twig_Environment &$env, $config) {
  $env->addFunction(new \Twig_SimpleFunction('path', function ($string) {
    if ($string === '<front>') {
      return '/';
    } else {
      return $string;
    }
  }));
}
