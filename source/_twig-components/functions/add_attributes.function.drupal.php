<?php
/**
 * @file
 * Creates an "add_attributes" function for Drupal that adds attributes
 * with optional additions while preventing attributes from trickling down
 * through includes.
 * Based on https://github.com/drupal-pattern-lab/add-attributes-twig-extension
 */

use Drupal\Core\Template\Attribute;

$function = new Twig_SimpleFunction('add_attributes', function ($context, $additional_attributes = [], $attribute_type = 'attributes') {

  if (class_exists('Drupal')) {
    $attributes = new Attribute();

    $context_attribute = &$context;
    foreach(explode('.', $attribute_type) as $segment) {
      $context_attribute = &$context_attribute[$segment];
    }

    // if attribute doesn't exist, create it
    if (!$context_attribute) {
      $context_attribute = new Attribute();
    }

    if (!empty($additional_attributes)) {
      foreach ($additional_attributes as $key => $value) {
        if (is_array($value)) {
          foreach ($value as $index => $item) {
            if ($item instanceof Attribute) {
              // Remove the item.
              unset($value[$index]);
              $value = array_merge($value, $item->toArray()[$key]);
            }
          }
        }
        else {
          if ($value instanceof Attribute) {
            $value = $value->toArray()[$key];
          }
          elseif (is_string($value)) {
            $value = [$value];
          }
          else {
            continue;
          }
        }

        // Merge additional attribute values with existing ones.
        if ($context_attribute->offsetExists($key)) {
          $existing_attribute = $context_attribute->offsetGet($key)->value();
          $value = array_merge($existing_attribute, $value);
        }

        $context_attribute->setAttribute($key, $value);
      }
    }

    // Set all attributes.
    foreach($context_attribute as $key => $value) {
      $attributes->setAttribute($key, $value);
      // Remove this attribute from context so it doesn't filter down to child
      // elements.
      $context_attribute->removeAttribute($key);
    }

    return $attributes;
  }

}, array('needs_context' => true, 'is_safe' => array('html')));
