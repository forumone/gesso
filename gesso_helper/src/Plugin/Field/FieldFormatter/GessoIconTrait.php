<?php

namespace Drupal\gesso_helper\Plugin\Field\FieldFormatter;

use Drupal\Core\Form\FormStateInterface;

/**
 * This trait provides methods for adding an icon to a link.
 */
trait GessoIconTrait {

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'icon_name' => '',
      'icon_is_hidden' => TRUE,
      'icon_label' => '',
      'icon_position' => 'before',
      'icon_direction' => '',
    ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm($form, FormStateInterface $form_state) {
    $elements = parent::settingsForm($form, $form_state);
    $elements['icon_name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Icon Name'),
      '#default_value' => $this->getSetting('icon_name'),
      '#required' => FALSE,
      '#description' => $this->t('The name of the icon to display as it appears in the sprite file. Example: <code>magnifying-glass</code>'),
    ];
    $elements['icon_is_hidden'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Hide icon from screen readers'),
      '#default_value' => $this->getSetting('icon_is_hidden'),
    ];
    $elements['icon_label'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Icon Label'),
      '#default_value' => $this->getSetting('icon_label'),
      '#states' => [
        'visible' => [
          ':input[name$="icon_is_hidden]"]' => ['checked' => FALSE],
        ],
        'required' => [
          ':input[name$="icon_is_hidden]"]' => ['checked' => FALSE],
        ],
      ],
      '#description' => $this->t('The label for the icon. Example: <code>Search</code>'),
    ];
    $elements['icon_position'] = [
      '#type' => 'select',
      '#title' => $this->t('Icon Position'),
      '#default_value' => $this->getSetting('icon_position'),
      '#states' => [
        'required' => [
          ':input[name$="icon_name]"]' => ['empty' => FALSE],
        ],
      ],
      '#options' => [
        'before' => $this->t('Before'),
        'after' => $this->t('After'),
        'both' => $this->t('Both'),
      ],
    ];
    $elements['icon_direction'] = [
      '#type' => 'select',
      '#title' => $this->t('Icon Direction'),
      '#default_value' => $this->getSetting('icon_direction'),
      '#options' => [
        '' => $this->t('None'),
        'down' => $this->t('Down'),
        'left' => $this->t('Left'),
        'right' => $this->t('Right'),
      ],
    ];
    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = parent::settingsSummary();
    $summary['icon_name'] = $this->t('Icon: @icon', ['@icon' => $this->getSetting('icon_name')]);
    return $summary;
  }

}
