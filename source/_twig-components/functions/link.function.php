<?php

/**
 * @file
 * Gesso extension for handling links in Twig.
 */

/**
 * Accepts a path, attributes, and title and returns a valid a html element.
 *
 * @param Twig_Environment $env
 *   The current Twig environment.
 * @param string $config
 *   Current configuration.
 */
function add_link_function(Twig_Environment &$env, $config) {
  $env->addFunction(new Twig_SimpleFunction(
    'link',
    function ($title, $url, $attributes) {
      if (isset($attributes) && isset($attributes['class'])) {
        $classes = implode(' ', $attributes['class']);
        return '<a href="' . $url . '" class="' . $classes . '">' . $title . '</a>';
      }
      else {
        return '<a href="' . $url . '">' . $title . '</a>';
      }
    },
    ['is_safe' => ['html']]
  ));
}
