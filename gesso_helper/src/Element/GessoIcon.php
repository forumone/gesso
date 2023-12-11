<?php

namespace Drupal\gesso_helper\Element;

use Drupal\Core\Render\Element\RenderElement;

/**
 * Provides an SVG icon element.
 *
 * @RenderElement("gesso_icon")
 */
class GessoIcon extends RenderElement {

  /**
   * Prerenders icon.
   *
   * @param array $element
   *   Associative array containing properties and children of the element.
   *
   * @return array
   *   The element.
   */
  public function preRenderIcon(array $element) {
    if ($element['#icon_is_hidden']) {
      $element['#attributes']['role'] = 'presentation';
      $element['#attributes']['aria-hidden'] = 'true';
    }
    else {
      $element['#attributes']['role'] = 'img';
      if (!empty($element['#icon_label'])) {
        $element['icon_label'] = [
          '#markup' => $element['#icon_label'],
        ];
      }
    }
    if (!empty($element['#icon_direction'])) {
      $element['#attributes']['class'][] = 'is-' . $element['#icon_direction'];
    }
    $element['icon_name'] = [
      '#plain_text' => $element['#icon_name'],
    ];
    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function getInfo() {
    return [
      '#pre_render' => [
        [$this, 'preRenderIcon'],
      ],
      '#theme' => 'gesso_icon',
      '#icon' => '',
    ];
  }

}
