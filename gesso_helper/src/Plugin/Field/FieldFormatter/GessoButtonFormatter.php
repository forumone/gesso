<?php

namespace Drupal\gesso_helper\Plugin\Field\FieldFormatter;

use Drupal\Component\Utility\Html;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Path\PathValidatorInterface;
use Drupal\Core\Render\RendererInterface;
use Drupal\Core\Theme\ThemeManagerInterface;
use Drupal\link\Plugin\Field\FieldFormatter\LinkFormatter;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Plugin implementation of the 'Gesso Button' formatter.
 *
 * @FieldFormatter(
 *   id = "gesso_helper_gesso_button",
 *   label = @Translation("Gesso Button"),
 *   field_types = {
 *     "link"
 *   }
 * )
 */
class GessoButtonFormatter extends LinkFormatter {

  /**
   * @var \Drupal\Core\Render\RendererInterface
   */
  protected $renderer;

  /**
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * @var \Drupal\Core\Theme\ThemeManagerInterface
   */
  protected $themeManager;

  /**
   * Constructs a new LinkFormatter.
   *
   * @param string $plugin_id
   *   The plugin_id for the formatter.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Field\FieldDefinitionInterface $field_definition
   *   The definition of the field to which the formatter is associated.
   * @param array $settings
   *   The formatter settings.
   * @param string $label
   *   The formatter label display setting.
   * @param string $view_mode
   *   The view mode.
   * @param array $third_party_settings
   *   Third party settings.
   * @param \Drupal\Core\Path\PathValidatorInterface $path_validator
   *   The path validator service.
   * @param \Drupal\Core\Render\RendererInterface $renderer
   *   The renderer service.
   * @param \Drupal\Core\Config\ConfigFactoryInterface $configFactory
   *   The config factory service.
   * @param \Drupal\Core\Theme\ThemeManagerInterface $themeManager
   *   The theme manager service.
   */
  public function __construct($plugin_id, $plugin_definition, FieldDefinitionInterface $field_definition, array $settings, $label, $view_mode, array $third_party_settings, PathValidatorInterface $path_validator, RendererInterface $renderer, ConfigFactoryInterface $configFactory, ThemeManagerInterface $themeManager) {
    parent::__construct($plugin_id, $plugin_definition, $field_definition, $settings, $label, $view_mode, $third_party_settings, $path_validator);
    $this->renderer = $renderer;
    $this->configFactory = $configFactory;
    $this->themeManager = $themeManager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $plugin_id,
      $plugin_definition,
      $configuration['field_definition'],
      $configuration['settings'],
      $configuration['label'],
      $configuration['view_mode'],
      $configuration['third_party_settings'],
      $container->get('path.validator'),
      $container->get('renderer'),
      $container->get('config.factory'),
      $container->get('theme.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'button_size' => 'Standard',
      'button_style' => 'Primary',
    ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $elements = parent::settingsForm($form, $form_state);
    $defaultThemeConfig = $this->configFactory->get('system.theme');
    $themeName = $defaultThemeConfig->get('default');
    $sizes = array_values($this->getSizes($themeName));
    $styles = array_values($this->getStyles($themeName));
    $sizeOptions = [];
    $styleOptions = [];
    foreach ($sizes as $size) {
      $sizeOptions[$size] = $size;
    }
    foreach ($styles as $style) {
      $styleOptions[$style] = $style;
    }
    $elements['button_size'] = [
      '#type' => 'select',
      '#title' => $this->t('Size'),
      '#required' => TRUE,
      '#options' => $sizeOptions,
      '#default_value' => $this->getSetting('button_size'),
    ];
    $elements['button_style'] = [
      '#type' => 'select',
      '#title' => $this->t('Style'),
      '#required' => TRUE,
      '#options' => $styleOptions,
      '#default_value' => $this->getSetting('button_style'),
    ];
    $themeConfig = $this->configFactory->get($themeName . '.settings');
    $this->renderer->addCacheableDependency($elements, $themeConfig);
    $this->renderer->addCacheableDependency($elements, $defaultThemeConfig);

    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary[] = $this->t(
      "Size: @size\n Style: @style",
      [
        '@size' => $this->getSetting('button_size'),
        '@style' => $this->getSetting('button_style'),
      ]
    );
    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $element = parent::viewElements($items, $langcode);
    $settings = $this->getSettings();
    $themeName = $this->themeManager->getActiveTheme()->getName();
    $sizes = array_flip($this->getSizes($themeName));
    $styles = array_flip($this->getStyles($themeName));

    foreach ($items as $delta => $item) {
      if (!empty($element[$delta]) &&
        empty($element[$delta]['#plain_text']) &&
        !empty($settings['button_size']) &&
        !empty($settings['button_style']) &&
        !empty($sizes[$settings['button_size']]) &&
        !empty($styles[$settings['button_style']])
      ) {
        $sizeClasses = explode('.', $sizes[$settings['button_size']]);
        foreach ($sizeClasses as $class) {
          $element[$delta]['#options']['attributes']['class'][] = Html::cleanCssIdentifier($class);
        }
        $styleClasses = explode('.', $styles[$settings['button_style']]);
        foreach ($styleClasses as $class) {
          $element[$delta]['#options']['attributes']['class'][] = Html::cleanCssIdentifier($class);
        }
      }
    }
    $themeConfig = $this->configFactory->get($themeName . '.settings');
    $this->renderer->addCacheableDependency($element, $themeConfig);

    return $element;
  }

  /**
   * Get the button sizes from a given theme's settings.
   *
   * @param string $theme
   *   The machine name of the theme.
   *
   * @return array
   *   The set of sizes, keyed by CSS classes.
   */
  private function getSizes($theme) {
    $sizes = [];
    $theme_sizes = theme_get_setting('button_sizes', $theme) ?? "c-button|Standard\nc-button.c-button--small|Small\nc-button.c-button--large|Large";
    $theme_sizes = str_replace(["\r\n", "\r"], "\n", trim($theme_sizes));
    $theme_sizes = explode("\n", $theme_sizes);
    foreach ($theme_sizes as $theme_size) {
      $pieces = explode('|', $theme_size);
      if (count($pieces) == 2) {
        $sizes[trim($pieces[0])] = trim($pieces[1]);
      }
    }
    return $sizes;
  }

  /**
   * Get the button styles from a given theme's settings.
   *
   * @param string $theme
   *   The machine name of the theme.
   *
   * @return array
   *   The set of styles, keyed by CSS classes.
   */
  private function getStyles($theme) {
    $styles = [];
    $theme_styles = theme_get_setting('button_styles', $theme) ?? "c-button|Primary\nc-button.c-button--secondary|Secondary\nc-button.c-button--danger|Danger";
    $theme_styles = str_replace(["\r\n", "\r"], "\n", trim($theme_styles));
    $theme_styles = explode("\n", $theme_styles);
    foreach ($theme_styles as $theme_style) {
      $pieces = explode('|', $theme_style);
      if (count($pieces) == 2) {
        $styles[trim($pieces[0])] = trim($pieces[1]);
      }
    }
    return $styles;
  }

}
