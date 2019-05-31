<?php
function addAttachLibraryFunction(\Twig_Environment &$env, $config) {
  $env->addFunction(new \Twig_SimpleFunction('attach_library', function ($string) {
    return;
  }));
}
