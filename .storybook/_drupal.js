// Simple Drupal.behaviors usage for Storybook
// via https://github.com/emulsify-ds/emulsify-drupal/

window.Drupal = { behaviors: {} };
window.drupalSettings = {};

(function (Drupal, drupalSettings) {
  Drupal.throwError = function (error) {
    setTimeout(function () {
      throw error;
    }, 0);
  };

  Drupal.attachBehaviors = function (context, settings) {
    context = context || document;
    settings = settings || drupalSettings;
    const behaviors = Drupal.behaviors;

    Object.keys(behaviors).forEach(function (i) {
      if (typeof behaviors[i].attach === 'function') {
        try {
          behaviors[i].attach(context, settings);
        } catch (e) {
          Drupal.throwError(e);
        }
      }
    });
  };

  Drupal.t = string => string;

  Drupal.theme = function (themeFunction, options) {
    return Drupal.theme[themeFunction](options);
  };
})(Drupal, window.drupalSettings);
