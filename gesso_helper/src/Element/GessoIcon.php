<?php

namespace Drupal\gesso_helper\Element;

use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Render\Element\RenderElement;
use Drupal\Core\Theme\ThemeManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides an SVG icon element.
 *
 * @RenderElement("gesso_icon")
 */
class GessoIcon extends RenderElement implements ContainerFactoryPluginInterface {

  /**
   * @var \Drupal\Core\Theme\ThemeManagerInterface
   *  The theme manager.
   */
  protected ThemeManagerInterface $themeManager;

  /**
   * Constructs a new GessoIcon.
   *
   * @param array $configuration
   * @param $plugin_id
   * @param $plugin_definition
   * @param \Drupal\Core\Theme\ThemeManagerInterface $theme_manager
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, ThemeManagerInterface $theme_manager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->themeManager = $theme_manager;
  }

  /**
   * Creates an instance of the plugin.
   *
   * @param \Symfony\Component\DependencyInjection\ContainerInterface $container
   *   The container to pull out services used in the plugin.
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin ID for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   *
   * @return static
   *   Returns an instance of this plugin.
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static($configuration, $plugin_id, $plugin_definition, $container
      ->get('theme.manager'));
  }

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
    // For now, since this module is called Gesso Helper, we're going to
    // assume that Gesso is the currently active theme. A future enhancement
    // might be to check multiple places or to make the icon path configurable.
    $theme = $this->themeManager->getActiveTheme();
    $element['icon'] = [
      '#type' => 'html_tag',
      '#tag' => 'use',
      '#attributes' => [
        'xlink:href' => base_path() . $theme->getPath()
          . '/dist/images/sprite.artifact.svg#' . $element['#icon_name'],
      ],
    ];
    if (!empty($element['#icon_title'])) {
      $element['icon_title'] = [
        '#markup' => $element['#icon_title'],
      ];
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
      '#icon' => [],
      '#icon_name' => '',
      '#icon_title' => '',
    ];
  }

}
