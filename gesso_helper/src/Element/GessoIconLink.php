<?php

namespace Drupal\gesso_helper\Element;

use Drupal\Component\Utility\NestedArray;
use Drupal\Core\Render\BubbleableMetadata;
use Drupal\Core\Render\Element\RenderElement;
use Drupal\Core\Url as CoreUrl;

/**
 * Provides an icon link render element.
 *
 * Properties:
 * - #title: The link text.
 * - #url: \Drupal\Core\Url object containing URL information pointing to an
 *   internal or external link. See \Drupal\Core\Utility\LinkGeneratorInterface.
 * - #icon_name: The name of the icon to display as it appears in the sprite file.
 * - #icon_is_hidden: Whether to hide the icon from screen readers.
 * - #icon_label: The label to use for the icon.
 * - #icon_position: The position of the icon relative to the link text.
 * - #icon_direction: The direction of the icon.
 *
 * Usage example:
 * @code
 * $build['example_icon_link'] = [
 *   '#title' => $this->t('Search'),
 *   '#type' => 'gesso_icon_link',
 *   '#url' => \Drupal\Core\Url::fromRoute('examples.description'),
 *   '#icon_name' => 'magnifying-glass',
 *   '#icon_is_hidden' => TRUE,
 *   '#icon_position' => 'before',
 * ];
 * @endcode
 *
 * @RenderElement("gesso_icon_link")
 */
class GessoIconLink extends RenderElement {
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

  public static function preRenderLink($element) {
    $link_content = [];
    if ($element['#icon_position'] == 'before' || $element['#icon_position'] == 'both') {
      $link_content['icon_before'] = [
        '#type' => 'gesso_icon',
        '#icon_name' => $element['#icon_name'],
        '#icon_label' => $element['#icon_label'],
      ];
    }
    $link_content['link_text'] = $element['#title'];
    if ($element['#icon_position'] == 'after' || $element['#icon_position'] == 'both') {
      $link_content['icon_after'] = [
        '#type' => 'gesso_icon',
        '#icon_name' => $element['#icon_name'],
        '#icon_label' => $element['#icon_label'],
      ];
    }
    if (!empty($element['#url']) && $element['#url'] instanceof CoreUrl) {
      $options = NestedArray::mergeDeep($element['#url']->getOptions(), $element['#options']);
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
