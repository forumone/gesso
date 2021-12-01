<?php

namespace Drupal\gesso_helper\TwigExtension;

use Drupal\Core\Template\Attribute;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

/**
 * Gesso theme twig extension for adding attributes.
 */
class AddAttributesTwigExtension extends AbstractExtension {

  /**
   * @inheritdoc
   */
  public function getName() {
    return 'gesso_helper_add_attributes';
  }

  /**
   * @inheritdoc
   */
  public function getFunctions(): array {
    $functions = parent::getFunctions();
    $functions[] = new TwigFunction(
      'add_attributes',
      [$this, 'addAttributes'],
      ['needs_context' => TRUE, 'is_safe' => ['html']]
    );
    return $functions;
  }

  /**
   * Creates an "add_attributes" function for Drupal that adds attributes.
   *
   * There are optional additions while preventing attributes from trickling
   * down through includes. Based on
   * https://github.com/drupal-pattern-lab/add-attributes-twig-extension.
   */
  public function addAttributes($context, $additional_attributes = [], $attribute_type = 'attributes'): Attribute {
    $attributes = new Attribute();

    $context_attribute = &$context;
    foreach (explode('.', $attribute_type) as $segment) {
      $context_attribute = &$context_attribute[$segment];
    }

    // If attribute doesn't exist, create it.
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
          if (is_array($existing_attribute)) {
            $value = array_merge($existing_attribute, $value);
          }
        }

        $context_attribute->setAttribute($key, $value);
      }
    }

    // Set all attributes.
    foreach ($context_attribute as $key => $value) {
      $attributes->setAttribute($key, $value);
      // Remove this attribute from context so it doesn't filter down to child
      // elements.
      $context_attribute->removeAttribute($key);
    }

    return $attributes;
  }

}
