<?php

/**
 * @param Twig_Environment $env - The Twig Environment - https://twig.symfony.com/api/1.x/Twig_Environment.html
 * @param $config - Config of `@basalt/twig-renderer`
 */
function addCustomExtension(\Twig_Environment &$env, $config) {

  /**
   * @example `<h1>Hello {{ customTwigFunctionThatSaysWorld() }}!</h1>` => `<h1>Hello Custom World</h1>`
   */
//  $env->addFunction(new \Twig_SimpleFunction('customTwigFunctionThatSaysWorld', function () {
//    return 'Custom World';
//  }));

  $env->addFunction(new \Twig_SimpleFunction('url', function ($string) {
    return '#';
  }));

  $env->addFilter(new \Twig_SimpleFilter('t', function ($string) {
    return $string;
  }));

  $env->addFilter(new Twig_SimpleFilter('without', function ($string) {
    return $string;
  }));

  $env->addFunction(new Twig_SimpleFunction(
    'link',
    function ($title, $url, $attributes) {
      if (isset($attributes) && isset($attributes['class'])) {
        $classes = join(' ', $attributes['class']);
        return '<a href="' . $url . '" class="' . $classes . '">' . $title . '</a>';
      } else {
        return '<a href="' . $url . '">' . $title . '</a>';
      }
    },
    array('is_safe' => array('html'))
  ));

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



  /*
   * Reverse a string
   * @param string $theString
   * @example `<p>{{ reverse('abc') }}</p>` => `<p>cba</p>`
   */
//  $env->addFunction(new \Twig_SimpleFunction('reverse', function ($theString) {
//    return strrev($theString);
//  }));


//  $env->addExtension(new \My\CustomExtension());

//  `{{ foo }}` => `bar`
//  $env->addGlobal('foo', 'bar');

  // example of enabling the Twig debug mode extension (ex. {{ dump(my_variable) }} to check out the template's available data) -- comment out to disable
  // $env->addExtension(new \Twig_Extension_Debug());

}
