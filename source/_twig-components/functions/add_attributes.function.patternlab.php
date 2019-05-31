<?php
/**
 * @file
 * Creates an "add_attributes" function for Pattern Lab
 * that adds attributes, title_attributes, or content_attributes with optional
 * additions while preventing attributes from trickling down through includes.
 * Based on https://github.com/drupal-pattern-lab/add-attributes-twig-extension
 */
function addAddAttributesFunction(\Twig_Environment &$env, $config) {
  //use Drupal\Core\Template\Attribute;
  $env->addFunction(new Twig_SimpleFunction('add_attributes', function ($context, $additional_attributes = [], $attribute_type = 'attributes') {
    if (!in_array($attribute_type, ['attributes','title_attributes','content_attributes'])) {
      throw new Exception('Invalid attribute type.');
    }

    if (class_exists('Drupal')) {
      $attributes = new Attribute();

      if (!empty($additional_attributes)) {
        foreach ($additional_attributes as $key => $value) {
          if (is_array($value)) {
            foreach ($value as $index => $item) {
              // Handle bem() output.
              if ($item instanceof Attribute) {
                // Remove the item.
                unset($value[$index]);
                $value = array_merge($value, $item->toArray()[$key]);
              }
            }
          }
          else {
            // Handle bem() output.
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
          if ($context[$attribute_type]->offsetExists($key)) {
            $existing_attribute = $context[$attribute_type]->offsetGet($key)->value();
            $value = array_merge($existing_attribute, $value);
          }

          $context[$attribute_type]->setAttribute($key, $value);
        }
      }

      // Set all attributes.
      foreach($context[$attribute_type] as $key => $value) {
        $attributes->setAttribute($key, $value);
        // Remove this attribute from context so it doesn't filter down to child
        // elements.
        $context[$attribute_type]->removeAttribute($key);
      }

      return $attributes;
    }
    // Pattern Lab.
    else {
      $attributes = [];

      foreach ($additional_attributes as $key => $value) {
        if (is_array($value)) {
          foreach ($value as $index => $item) {
            // Handle bem() output.
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
          // Handle bem() output.
          if (strpos($value, $key . '=') !== FALSE) {
            $attributes[] = $value;
          }
          else {
            $attributes[] = $key . '="' . $value . '"';
          }
        }
      }

      return implode(' ', $attributes);
    }

  }, array('needs_context' => true, 'is_safe' => array('html'))));

}