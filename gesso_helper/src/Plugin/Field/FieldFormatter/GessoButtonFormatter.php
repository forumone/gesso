<?php

namespace Drupal\gesso_helper\Plugin\Field\FieldFormatter;

use Drupal\Component\Utility\Html;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\link\Plugin\Field\FieldFormatter\LinkFormatter;

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
    // TODO: Convert to dependency injection
    $renderer = \Drupal::service('renderer');
    $defaultThemeConfig = \Drupal::config('system.theme');
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
    $themeConfig = \Drupal::config($themeName . '.settings');
    $renderer->addCacheableDependency($elements, $themeConfig);
    $renderer->addCacheableDependency($elements, $defaultThemeConfig);

    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary[] = $this->t("Size: @size\n Style: @style", ['@size' => $this->getSetting('button_size'), '@style' => $this->getSetting('button_style')]);
    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $element = parent::viewElements($items, $langcode);
    $settings = $this->getSettings();
    // TODO: Convert to dependency injection
    $renderer = \Drupal::service('renderer');
    $themeName = \Drupal::service('theme.manager')->getActiveTheme()->getName();
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
    $themeConfig = \Drupal::config($themeName . '.settings');
    $renderer->addCacheableDependency($element, $themeConfig);

    return $element;
  }

  private function getSizes($theme) {
    $sizes = [];
    $theme_sizes = theme_get_setting('button_sizes', $theme) ?? "button|Standard\nbutton.button--small|Small\nbutton.button--large|Large";
    $theme_sizes = explode("\n", $theme_sizes);
    foreach ($theme_sizes as $theme_size) {
      $pieces = explode('|', $theme_size);
      if (count($pieces) == 2) {
        $sizes[trim($pieces[0])] = trim($pieces[1]);
      }
    }
    return $sizes;
  }

  private function getStyles($theme) {
    $styles = [];
    $theme_styles = theme_get_setting('button_styles', $theme) ?? "button|Primary\nbutton.button--secondary|Secondary\nbutton.button--danger|Danger";
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
