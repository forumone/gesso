<?php

namespace Drupal\gesso_helper\Plugin\Field\FieldFormatter;

use Drupal\Component\Utility\Html;
use Drupal\Component\Utility\Unicode;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Path\PathValidatorInterface;
use Drupal\Core\Render\RendererInterface;
use Drupal\Core\Theme\ThemeManagerInterface;
use Drupal\Core\Utility\Token;
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
  use GessoModifierClassesTrait, GessoIconTrait {
    GessoModifierClassesTrait::cleanModifierClasses as private;
    GessoModifierClassesTrait::defaultSettings as modifierDefaultSettings;
    GessoModifierClassesTrait::settingsForm as modifierSettingsForm;
    GessoModifierClassesTrait::settingsSummary as modifierSettingsSummary;
    GessoIconTrait::defaultSettings as iconDefaultSettings;
    GessoIconTrait::settingsForm as iconSettingsForm;
    GessoIconTrait::settingsSummary as iconSettingsSummary;
  }


  /**
   * The renderer service.
   *
   * @var \Drupal\Core\Render\RendererInterface
   */
  protected $renderer;

  /**
   * The config factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * The theme manager.
   *
   * @var \Drupal\Core\Theme\ThemeManagerInterface
   */
  protected $themeManager;

  /**
   * The token service.
   *
   * @var \Drupal\Core\Utility\Token
   */
  protected Token $token;

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
   * @param \Drupal\Core\Utility\Token $token
   *   The token service.
   */
  public function __construct($plugin_id, $plugin_definition, FieldDefinitionInterface $field_definition, array $settings, $label, $view_mode, array $third_party_settings, PathValidatorInterface $path_validator, RendererInterface $renderer, ConfigFactoryInterface $configFactory, ThemeManagerInterface $themeManager, Token $token) {
    parent::__construct($plugin_id, $plugin_definition, $field_definition, $settings, $label, $view_mode, $third_party_settings, $path_validator);
    $this->renderer = $renderer;
    $this->configFactory = $configFactory;
    $this->themeManager = $themeManager;
    $this->token = $token;
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
      $container->get('theme.manager'),
      $container->get('token')
    );
  }

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'button_size' => 'Standard',
      'button_style' => 'Primary',
    ] + parent::defaultSettings() +
      static::modifierDefaultSettings() +
      static::iconDefaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $elements = $this->modifierSettingsForm($form, $form_state) + $this->iconSettingsForm($form, $form_state);
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
    $summary = $this->modifierSettingsSummary() + $this->iconSettingsSummary();
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
    $entity = $items->getEntity();
    $settings = $this->getSettings();
    $themeName = $this->themeManager->getActiveTheme()->getName();
    $sizes = array_flip($this->getSizes($themeName));
    $styles = array_flip($this->getStyles($themeName));

    foreach ($items as $delta => $item) {
      // By default, use the full URL as the link text.
      $url = $this->buildUrl($item);
      $link_title = $url->toString();

      // If the title field value is available, use it for the link text.
      if (empty($settings['url_only']) && !empty($item->title)) {
        // Unsanitized token replacement here because the entire link title
        // gets auto-escaped during link generation in
        // \Drupal\Core\Utility\LinkGenerator::generate().
        $link_title = $this->token->replace($item->title, [$entity->getEntityTypeId() => $entity], ['clear' => TRUE]);
      }

      // Trim the link text to the desired length.
      if (!empty($settings['trim_length'])) {
        $link_title = Unicode::truncate($link_title, $settings['trim_length'], FALSE, TRUE);
      }
      $element[$delta] = [
        '#type' => 'gesso_button',
        '#title' => $link_title,
        '#url' => $url,
        '#options' => $url->getOptions(),
        '#icon_is_hidden' => $settings['icon_is_hidden'],
        '#icon_name' => $settings['icon_name'],
        '#icon_label' => $settings['icon_label'],
        '#icon_position' => $settings['icon_position'],
        '#icon_direction' => $settings['icon_direction'],
      ];
      if (
        !empty($settings['button_size']) &&
        !empty($settings['button_style']) &&
        !empty($sizes[$settings['button_size']]) &&
        !empty($styles[$settings['button_style']])
      ) {
        $element[$delta]['#options'] += ['attributes' => []];
        $element[$delta]['#options']['attributes'] += ['class' => []];
        $sizeClasses = explode('.', $sizes[$settings['button_size']]);
        foreach ($sizeClasses as $class) {
          $element[$delta]['#options']['attributes']['class'][] = Html::cleanCssIdentifier($class);
        }
        $styleClasses = explode('.', $styles[$settings['button_style']]);
        foreach ($styleClasses as $class) {
          $element[$delta]['#options']['attributes']['class'][] = Html::cleanCssIdentifier($class);
        }
      }
      if (!empty($settings['modifier_classes'])) {
        $element[$delta]['#options'] += ['attributes' => []];
        $element[$delta]['#options']['attributes'] += ['class' => []];
        $element[$delta]['#options']['attributes']['class'] = array_merge($element[$delta]['#options']['attributes']['class'], $this->cleanModifierClasses($settings['modifier_classes']));
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
