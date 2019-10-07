<?php
/**
 * @file
 * Creates an "add_attributes" function for Pattern Lab that adds attributes
 * with optional additions while preventing attributes from trickling down
 * through includes.
 * Based on https://github.com/drupal-pattern-lab/add-attributes-twig-extension
 */

function addAddAttributesFunction(\Twig_Environment &$env, $config) {
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


  }, array('needs_context' => true, 'is_safe' => array('html'))));

}