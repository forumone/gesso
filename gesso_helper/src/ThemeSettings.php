<?php

namespace Drupal\gesso_helper;

/**
 * Provides cross-version theme settings access.
 */
class ThemeSettings {

  /**
   * Retrieves a theme setting.
   *
   * @param string $setting_name
   *   The setting name.
   * @param string|null $theme
   *   The theme machine name, or NULL for the active theme.
   *
   * @return mixed
   *   The setting value, or NULL if not set.
   */
  public function getSetting(string $setting_name, ?string $theme = NULL) {
    if (version_compare(\Drupal::VERSION, '11.3', '>=') && \Drupal::hasService('Drupal\Core\Extension\ThemeSettingsProvider')) {
      return \Drupal::service('Drupal\Core\Extension\ThemeSettingsProvider')->getSetting($setting_name, $theme);
    }

    return theme_get_setting($setting_name, $theme);
  }

}
