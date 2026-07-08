<?php

namespace Drupal\gesso_helper\Element;

use Drupal\Component\Utility\NestedArray;
use Drupal\Core\Render\BubbleableMetadata;
use Drupal\Core\Render\Element\RenderElementBase;
use Drupal\Core\Url as CoreUrl;

/**
 * Provides a link render element, styled as a button.
 *
 * Properties:
 * - #title: The link text.
 * - #url: \Drupal\Core\Url object containing URL information pointing to an
 *   internal or external link. See \Drupal\Core\Utility\LinkGeneratorInterface.
 * - #icon_name: The name of the icon to display as it appears in the
 *   sprite file.
 * - #icon_is_hidden: Whether to hide the icon from screen readers.
 * - #icon_label: The label to use for the icon.
 * - #icon_position: The position of the icon relative to the link text.
 * - #icon_direction: The direction of the icon.
 *
 * Usage example:
 * @code
 * $build['example_button'] = [
 *   '#title' => $this->t('Search'),
 *   '#type' => 'gesso_button',
 *   '#url' => \Drupal\Core\Url::fromRoute('examples.description'),
 *   '#icon_name' => 'magnifying-glass',
 *   '#icon_is_hidden' => TRUE,
 *   '#icon_position' => 'before',
 * ];
 * @endcode
 *
 * @RenderElement("gesso_button")
 */
class GessoButton extends RenderElementBase {

  /**
   * {@inheritdoc}
   */
  public function getInfo() {
    $class = static::class;
    return [
      '#pre_render' => [
        [$class, 'preRenderLink'],
      ],
    ];
  }

  /**
   * Pre-renders a link element.
   *
   * @param array $element
   *   The link element array.
   *
   * @return array
   *   The pre-rendered link element array.
   */
  public static function preRenderLink($element) {
    $link_content = [];
    if (!empty($element['#icon_name'])) {
      $icon_content = [
        '#type' => 'gesso_icon',
        '#icon_name' => $element['#icon_name'],
        '#icon_label' => $element['#icon_label'],
        '#icon_is_hidden' => $element['#icon_is_hidden'],
        '#icon_direction' => $element['#icon_direction'],
        '#attributes' => [
          'class' => [
            'c-button__icon',
          ],
        ],
      ];
    }
    if (isset($icon_content) && ($element['#icon_position'] == 'before' || $element['#icon_position'] == 'both')) {
      $link_content['icon_before'] = $icon_content;
      $link_content['icon_before']['#attributes']['class'][] = 'is-spaced-after';
    }
    $link_content['link_text'] = [
      '#type' => 'inline_template',
      '#template' => '{{ value|nl2br }}',
      '#context' => [
        'value' => $element['#title'],
      ],
    ];
    if (isset($icon_content) && ($element['#icon_position'] == 'after' || $element['#icon_position'] == 'both')) {
      $link_content['icon_after'] = $icon_content;
      $link_content['icon_after']['#attributes']['class'][] = 'is-spaced-before';
    }
    $element['#options']['attributes']['class'][] = 'c-button';
    if (!empty($element['#url']) && $element['#url'] instanceof CoreUrl) {
      $options = !empty($element['#options']) ? NestedArray::mergeDeep($element['#url']->getOptions(), $element['#options']) : $element['#url']->getOptions();
      /** @var \Drupal\Core\Utility\LinkGenerator $link_generator */
      $link_generator = \Drupal::service('link_generator');
      $generated_link = $link_generator->generate($link_content, $element['#url']->setOptions($options));
      $element['#markup'] = $generated_link;
      $generated_link->merge(BubbleableMetadata::createFromRenderArray($element))
        ->applyTo($element);
    }
    return $element;
  }

}
