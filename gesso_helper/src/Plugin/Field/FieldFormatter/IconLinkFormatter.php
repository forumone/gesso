<?php

namespace Drupal\gesso_helper\Plugin\Field\FieldFormatter;

use Drupal\Component\Utility\Unicode;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Path\PathValidatorInterface;
use Drupal\Core\Utility\Token;
use Drupal\link\Plugin\Field\FieldFormatter\LinkFormatter;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Plugin implementation of the 'Icon Link' formatter.
 *
 * @FieldFormatter(
 *   id = "gesso_helper_icon_link",
 *   label = @Translation("Icon Link"),
 *   field_types = {
 *     "link"
 *   }
 * )
 */
class IconLinkFormatter extends LinkFormatter {
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
   * The token service.
   *
   * @var \Drupal\Core\Utility\Token
   */
  protected Token $token;

  /**
   * Constructs a new instance of the class.
   *
   * @param string $plugin_id
   *   The plugin ID.
   * @param mixed $plugin_definition
   *   The plugin definition.
   * @param \Drupal\Core\Field\FieldDefinitionInterface $field_definition
   *   The field definition.
   * @param array $settings
   *   An array of settings.
   * @param mixed $label
   *   The label.
   * @param mixed $view_mode
   *   The view mode.
   * @param array $third_party_settings
   *   An array of third party settings.
   * @param \Drupal\Core\Path\PathValidatorInterface $path_validator
   *   The path validator.
   * @param mixed $token
   *   The token.
   *
   * @return void
   */
  public function __construct($plugin_id, $plugin_definition, FieldDefinitionInterface $field_definition, array $settings, $label, $view_mode, array $third_party_settings, PathValidatorInterface $path_validator, $token) {
    parent::__construct($plugin_id, $plugin_definition, $field_definition, $settings, $label, $view_mode, $third_party_settings, $path_validator);
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
      $container->get('token')
    );
  }

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'trim_length' => '',
      'rel' => '',
      'target' => '',
    ] + parent::defaultSettings() +
      static::modifierDefaultSettings() +
      static::iconDefaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    return $this->modifierSettingsForm($form, $form_state) +
      $this->iconSettingsForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    return $this->modifierSettingsSummary() + $this->iconSettingsSummary();
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $element = parent::viewElements($items, $langcode);
    $entity = $items->getEntity();
    $settings = $this->getSettings();

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
        '#type' => 'gesso_icon_link',
        '#title' => $link_title,
        '#url' => $url,
        '#options' => $url->getOptions(),
        '#icon_is_hidden' => $settings['icon_is_hidden'],
        '#icon_name' => $settings['icon_name'],
        '#icon_label' => $settings['icon_label'],
        '#icon_position' => $settings['icon_position'],
        '#icon_direction' => $settings['icon_direction'],
      ];

      if (!empty($item->_attributes)) {
        $element[$delta]['#options'] += ['attributes' => []];
        $element[$delta]['#options']['attributes'] += $item->_attributes;
        // Unset field item attributes since they have been included in the
        // formatter output and should not be rendered in the field template.
        unset($item->_attributes);
      }

      if (!empty($settings['modifier_classes'])) {
        $element[$delta]['#options'] += ['attributes' => []];
        $element[$delta]['#options']['attributes'] += ['class' => []];
        $element[$delta]['#options']['attributes']['class'] = array_merge($element[$delta]['#options']['attributes']['class'], $this->cleanModifierClasses($settings['modifier_classes']));
      }
    }
    return $element;
  }

}
