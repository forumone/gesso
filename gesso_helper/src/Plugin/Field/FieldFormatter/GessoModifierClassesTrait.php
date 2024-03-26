<?php

namespace Drupal\gesso_helper\Plugin\Field\FieldFormatter;

use Drupal\Component\Utility\Html;
use Drupal\Core\Form\FormStateInterface;

/**
 * Trait GessoModifierClassesTrait.
 *
 * This trait provides methods for handling modifier classes in
 * a render element.
 */
trait GessoModifierClassesTrait {

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'modifier_classes' => '',
    ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $elements = parent::settingsForm($form, $form_state);

    $elements['modifier_classes'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Modifier Classes'),
      '#default_value' => $this->getSetting('modifier_classes'),
      '#description' => $this->t('One or more modifier classes to add to the link. Example: <code>c-link--small</code>'),
    ];
    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = parent::settingsSummary();
    $summary['modifier_classes'] = $this->t('Modifier classes: @modifier_classes', ['@modifier_classes' => $this->getSetting('modifier_classes')]);
    return $summary;
  }

  /**
   * Cleans and sanitizes the provided modifier classes.
   *
   * @param string $modifier_classes
   *   The modifier classes to be cleaned and sanitized.
   *
   * @return array
   *   An array of cleaned and sanitized modifier classes.
   */
  public function cleanModifierClasses(string $modifier_classes): array {
    $clean_modifier_classes = explode(' ', $modifier_classes);
    foreach ($clean_modifier_classes as $key => $class) {
      $clean_modifier_classes[$key] = strtolower(Html::cleanCssIdentifier($class));
    }
    return $clean_modifier_classes;
  }

}
