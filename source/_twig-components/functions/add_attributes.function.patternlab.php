<?php

/**
 * @file
 * Based on https://github.com/drupal-pattern-lab/add-attributes-twig-extension.
 *
 * Creates an "add_attributes" function for Pattern Lab that adds attributes
 * with optional additions while preventing attributes from trickling down
 * through includes.
 */

/**
 * Control scope of attribute inclusion.
 *
 * @param \Twig_Environment $env
 *   Access to twig environment.
 * @param array $config
 *   Unused in this context.
 */
function add_add_attributes_function(\Twig_Environment &$env, array $config) {
  $env->addFunction(new Twig_SimpleFunction('add_attributes', function ($context, $additional_attributes = [], $attribute_type = 'attributes') {

    $attributes = [];

    foreach ($additional_attributes as $key => $value) {
      if (is_array($value)) {
        foreach ($value as $index => $item) {
          if (strpos($item, $key . '=') !== FALSE) {
            parse_str($item, $result);
            // Remove the item.
            unset($value[$index]);
            // Strip surrounding quotes.
            $value[] = substr($result[$key], 1, -1);
          }
        }

        $attributes[] = $key . '="' . implode(' ', $value) . '"';
      }
      else {
        if (strpos($value, $key . '=') !== FALSE) {
          $attributes[] = $value;
        }
        else {
          $attributes[] = $key . '="' . $value . '"';
        }
      }
    }

    return implode(' ', $attributes);

  }, ['needs_context' => TRUE, 'is_safe' => ['html']]));

}
