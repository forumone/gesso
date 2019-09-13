<?php

/**
 * @file
 * Creates an "link" function for Pattern Lab.
 */

/**
 * Add availability of link function to PatternLab.
 */
function add_link_function(\Twig_Environment &$env, $config) {
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
