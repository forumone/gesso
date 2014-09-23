<?php
/**
 * @file
 * Theme settings for the gesso theme.
 */

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function gesso_form_system_theme_settings_alter(&$form, &$form_state, $form_id = NULL) {
  // General "alters" use a form id. Settings should not be set here. The only
  // thing useful about this is if you need to alter the form for the running
  // theme and *not* the theme setting.
  // @see http://drupal.org/node/943212
  if (isset($form_id)) {
    return;
  }

  // Grab the current theme name.
  $theme = isset($form_state['build_info']['args'][0]) ? $form_state['build_info']['args'][0] : '';

  // Display recommended modules for this theme.
  $recommended_modules = gesso_recommended_modules();

  if (!empty($recommended_modules)) {
    $hide = theme_get_setting('hide_recommended_modules');

    $form['recommended_modules'] = array(
      '#type' => 'fieldset',
      '#title' => t('Recommended modules'),
      '#collapsible' => TRUE,
      '#collapsed' => $hide,
      '#description' => t('This theme was built in conjunction with several other modules to help streamline development. Some of these modules are not downloaded or enabled on your site. Modules marked as required should be download and enabled in order to get the most out of this theme.'),
      '#weight' => -1000,
      '#attributes' => array('class' => array('recommended-modules')),
      '#prefix' => '<div class="messages warning">',
      '#suffix' => '</div>',
    );

    $form['recommended_modules']['hide_recommended_modules'] = array(
      '#type' => 'checkbox',
      '#title' => t('Hide this warning by default.'),
      '#ajax' => array(
        'callback' => 'gesso_ajax_settings_save',
      ),
      '#default_value' => $hide,
    );

    foreach ($recommended_modules as $id => $module) {
      $form['recommended_modules'][$id] = array(
        '#type' => 'item',
        '#title' => l($module['name'], 'http://drupal.org/project/' . $id, array('attributes' => array('target' => '_blank'))),
        '#description' => $module['description'],
        '#required' => $module['required'],
      );
    }
  }

  $form['options_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Theme Specific Settings'),
    '#collapsible' => FALSE,
    '#collapsed' => FALSE,
  );
  $form['options_settings']['only_use_smacss'] = array(
    '#type' => 'checkbox',
    '#title' => t("Output only SMACSS classes."),
    '#description'   => t("Remove core classes that don't follow the Drupal 8 SMACSS naming convention. Unchecking this will add a TON of classes everywhere, but it might fix problems caused by modules depending on those classes."),
    '#default_value' => theme_get_setting('only_use_smacss'),
  );
  $form['options_settings']['show_first_last'] = array(
    '#type' => 'checkbox',
    '#title' => t("Add first/last classes to menu items."),
    '#default_value' => theme_get_setting('show_first_last'),
  );
  $form['options_settings']['show_collapsed_expanded'] = array(
    '#type' => 'checkbox',
    '#title' => t("Add collapsed/expanded classes to menu items."),
    '#default_value' => theme_get_setting('show_collapsed_expanded'),
  );
}

/**
 * Saves theme settings using ajax.
 *
 * @param array $form
 *   Nested array of form elements that comprise the form.
 * @param array $form_state
 *   A keyed array containing the current state of the form. The arguments
 *   that drupal_get_form() was originally called with are available in the
 *   array $form_state['build_info']['args'].
 */
function gesso_ajax_settings_save($form, $form_state) {
  $theme = isset($form_state['build_info']['args'][0]) ? $form_state['build_info']['args'][0] : '';
  $theme_settings = variable_get('theme_' . $theme . '_settings', array());
  $trigger = $form_state['triggering_element']['#name'];

  $theme_settings[$trigger] = $form_state['input'][$trigger];

  if (empty($theme_settings[$trigger])) {
    $theme_settings[$trigger] = 0;
  }
  variable_set('theme_' . $theme . '_settings', $theme_settings);
}

/**
 * Returns an array of recommended modules.
 */
function gesso_recommended_modules() {
  $modules = array();

  if (!module_exists('clean_markup')) {
    $modules['clean_markup'] = array(
      'name' => t('Clean Markup'),
      'description' => t('Allows you to control the markup of blocks, panel regions, and panel panes via the UI.'),
      'required' => FALSE,
    );
  }

  if (!module_exists('html5_tools')) {
    $modules['html5_tools'] = array(
      'name' => t('HTML5 Tools'),
      'description' => t('Provides HTML5 elements for use in fields and forms, updates Drupal core markup to match HTML5 standards, and streamlines CSS and JavaScript tags.'),
      'required' => TRUE,
    );
  }

  if (!module_exists('magic')) {
    $modules['magic'] = array(
      'name' => t('Magic'),
      'description' => t('Provides advanced CSS/JavaScript handling and includes theme development enhancements.'),
      'required' => TRUE,
    );
  }

  if (!module_exists('blockify')) {
    $modules['blockify'] = array(
      'name' => t('Blockify'),
      'description' => t('Exposes a number of core Drupal elements, traditionally found in page.tpl.php, as blocks. This theme does not include these items in page.tpl.php to allow greater flexibility in where to place them.'),
      'required' => FALSE,
    );
  }

  if (!module_exists('modernizr')) {
    $modules['modernizr'] = array(
      'name' => t('Modernizr'),
      'description' => t(
        'Provides deep integration with the !modernizr JS library, allowing modules and themes to register tests and load additional assets as needed.',
        array(
          '!modernizr' => l(
            t('Modernizr'),
            "http://modernizr.com/",
            array('attributes' => array('target' => '_blank'))
          ),
        )
      ),
      'required' => FALSE,
    );
  }

  return $modules;
}
