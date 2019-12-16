<?php

/**
 * @file
 * Gesso Twig extension to handle library additions.
 */

/**
 * Stub that doesn't currently do anything.
 *
 * @param \Twig_Environment $env
 *   Current Twig environment.
 * @param string $config
 *   Current configuration state.
 */
function addAttachLibraryFunction(\Twig_Environment &$env, $config) {
  $env->addFunction(new \Twig_SimpleFunction('attach_library', function ($string) {
    return;
  }));
}
