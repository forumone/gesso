<?php

namespace Drupal\gesso_helper;

/**
 * Provides cross-version theme settings access.
 *
 * Uses ThemeSettingsProvider on Drupal 11.3+, with a theme_get_setting()
 * fallback for Drupal 10.3 through 11.2.
 *
 * The constructor argument is intentionally untyped: ThemeSettingsProvider
 * does not exist before Drupal 11.3, so a class typehint would fatal on load.
 */
class ThemeSettings {

  /**
     * The theme settings provider, when available.
     *
     * @var object|null
     */
  protected $themeSettingsProvider;

  /**
   * Constructs a ThemeSettings helper.
   *
   * @param object|null $theme_settings_provider
   *   ThemeSettingsProvider on Drupal 11.3+, otherwise NULL.
   */
  public function __construct($theme_settings_provider = NULL) {
    $this->themeSettingsProvider = $theme_settings_provider;
  }

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
  public function getSetting(string $setting_name, ?string $theme = NULL): mixed {
    if ($this->themeSettingsProvider !== NULL) {
      return $this->themeSettingsProvider->getSetting($setting_name, $theme);
    }

    // Drupal 10.3–11.2 fallback. Removed in Drupal 13;
    // provider path is preferred.
    // @phpstan-ignore function.deprecated
    return theme_get_setting($setting_name, $theme);
  }

}
