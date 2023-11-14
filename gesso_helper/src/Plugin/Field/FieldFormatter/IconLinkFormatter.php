<?php

namespace Drupal\gesso_helper\Plugin\Field\FieldFormatter;

use Drupal\Component\Utility\Unicode;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\link\Plugin\Field\FieldFormatter\LinkFormatter;

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
class IconLinkFormatter  extends LinkFormatter {

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
      'trim_length' => '',
      'rel' => '',
      'target' => '',
    ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $elements = parent::settingsForm($form, $form_state);

    $elements['icon_name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Icon Name'),
      '#default_value' => $this->getSetting('icon_name'),
      '#required' => TRUE,
      '#description' => $this->t('The name of the icon to display as it appears in the sprite file. Example: <code>magnifying-glass</code>'),
    ];
    // Add a checkbox field for icon_is_hidden.
    $elements['icon_is_hidden'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Hide icon from screen readers'),
      '#default_value' => $this->getSetting('icon_is_hidden'),
    ];
    // Add a text field for icon label, and require it if icon_is_hidden is FALSE.
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
    // Add a select field with three options, before, after, or both, for icon_position.
    $elements['icon_position'] = [
      '#type' => 'select',
      '#title' => $this->t('Icon Position'),
      '#default_value' => $this->getSetting('icon_position'),
      '#required' => TRUE,
      '#options' => [
        'before' => $this->t('Before'),
        'after' => $this->t('After'),
        'both' => $this->t('Both'),
      ],
    ];
    // Add an optional select field with three options, down, left, and right, for icon_direction.
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
    $summary[] = $this->t('Icon: @icon', ['@icon' => $this->getSetting('icon_name')]);
    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $element = [];
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
        $link_title = \Drupal::token()->replace($item->title, [$entity->getEntityTypeId() => $entity], ['clear' => TRUE]);
      }

      // Trim the link text to the desired length.
      if (!empty($settings['trim_length'])) {
        $link_title = Unicode::truncate($link_title, $settings['trim_length'], FALSE, TRUE);
      }
      $element[$delta] = [
        '#type' => 'gesso_icon_link',
        '#title' => $link_title,
        '#url' => $url,
        '#icon_is_hidden' => $settings['icon_is_hidden'],
        '#icon_name' => $settings['icon_name'],
        '#icon_label' => $settings['icon_label'],
        '#icon_position' => $settings['icon_position'],
        '#icon_direction' => $settings['icon_direction'],
      ];

//      if (!empty($item->_attributes)) {
//        $element[$delta]['#attributes'] += $item->_attributes;
//        unset($item->_attributes);
//      }
    }
    return $element;
  }

}
