declare namespace Drupal {
  interface GessoSettings {
    gesso: {
      backToTopThreshold?: number;
      backToTopSmoothScroll?: boolean;
    };
  }

  type Settings = object & GessoSettings;

  interface Behavior {
    /**
     * @see drupal.js documentation
     * @param {HTMLElement | HTMLDocument} context
     * @param {object} settings
     */
    attach?: (context: HTMLElement | HTMLDocument, settings: Settings) => void;

    /**
     * @see drupal.js documentation
     * @param {HTMLElement | HTMLDocument} context
     * @param {object} settings
     * @param {string} trigger
     */
    detach?: (
      context: HTMLElement | HTMLDocument,
      settings: Settings,
      trigger: string
    ) => void;
  }

  const behaviors: Record<string, Behavior>;

  /**
   * Helper to rethrow errors asynchronously.
   *
   * This way Errors bubbles up outside of the original callstack, making it
   * easier to debug errors in the browser.
   *
   * @param {Error|string} error
   *   The error to be thrown.
   */
  function throwError(error: Error | string): void;

  /**
   * Encodes special characters in a plain-text string for display as HTML.
   *
   * @param {string} str
   *   The string to be encoded.
   *
   * @return {string}
   *   The encoded string.
   *
   * @ingroup sanitization
   */
  function checkPlain(str: string): string;

  /**
   * Replaces placeholders with sanitized values in a string.
   *
   * @param {string} str
   *   A string with placeholders.
   * @param {object} args
   *   An object of replacements pairs to make. Incidences of any key in this
   *   array are replaced with the corresponding value. Based on the first
   *   character of the key, the value is escaped and/or themed:
   *    - `'!variable'`: inserted as is.
   *    - `'@variable'`: escape plain text to HTML ({@link Drupal.checkPlain}).
   *    - `'%variable'`: escape text and theme as a placeholder for user-
   *      submitted content ({@link Drupal.checkPlain} +
   *      `{@link Drupal.theme}('placeholder')`).
   *
   * @return {string}
   *   The formatted string.
   *
   * @see Drupal.t
   */
  function formatString(str: string, args: object): string;

  /**
   * Replaces substring.
   *
   * The longest keys will be tried first. Once a substring has been replaced,
   * its new value will not be searched again.
   *
   * @param {string} str
   *   A string with placeholders.
   * @param {object} args
   *   Key-value pairs.
   * @param {Array|null} keys
   *   Array of keys from `args`. Internal use only.
   *
   * @return {string}
   *   The replaced string.
   */
  function stringReplace(str: string, args: object, keys?: any): string;

  /**
   * Translates strings to the page language, or a given language.
   *
   * See the documentation of the server-side t() function for further details.
   *
   * @param {string} str
   *   A string containing the English text to translate.
   * @param {Object.<string, string>} [args]
   *   An object of replacements pairs to make after translation. Incidences
   *   of any key in this array are replaced with the corresponding value.
   *   See {@link Drupal.formatString}.
   * @param {object} [options]
   *   Additional options for translation.
   * @param {string} [options.context='']
   *   The context the source string belongs to.
   *
   * @return {string}
   *   The formatted string.
   *   The translated string.
   */
  function t(str: string, args?: any, options?: string): string;

  const url: {
    /**
     * Returns the URL to a Drupal page.
     *
     * @param {string} path
     *   Drupal path to transform to URL.
     *
     * @return {string}
     *   The full URL.
     */
    (path: string): string;

    /**
     * Returns the passed in URL as an absolute URL.
     *
     * @param {string} url
     *   The URL string to be normalized to an absolute URL.
     *
     * @return {string}
     *   The normalized, absolute URL.
     *
     * @see https://github.com/angular/angular.js/blob/v1.4.4/src/ng/urlUtils.js
     * @see https://grack.com/blog/2009/11/17/absolutizing-url-in-javascript
     * @see https://github.com/jquery/jquery-ui/blob/1.11.4/ui/tabs.js#L53
     */
    toAbsolute(url: string): string;

    /**
     * Returns true if the URL is within Drupal's base path.
     *
     * @param {string} url
     *   The URL string to be tested.
     *
     * @return {bool}
     *   `true` if local.
     *
     * @see https://github.com/jquery/jquery-ui/blob/1.11.4/ui/tabs.js#L58
     */
    isLocal(url: string): boolean;
  };

  /**
   * Formats a string containing a count of items.
   *
   * This function ensures that the string is pluralized correctly. Since
   * {@link Drupal.t} is called by this function, make sure not to pass
   * already-localized strings to it.
   *
   * See the documentation of the server-side
   * \Drupal\Core\StringTranslation\TranslationInterface::formatPlural()
   * function for more details.
   *
   * @param {number} count
   *   The item count to display.
   * @param {string} singular
   *   The string for the singular case. Please make sure it is clear this is
   *   singular, to ease translation (e.g. use "1 new comment" instead of "1
   *   new"). Do not use @count in the singular string.
   * @param {string} plural
   *   The string for the plural case. Please make sure it is clear this is
   *   plural, to ease translation. Use @count in place of the item count, as in
   *   "@count new comments".
   * @param {object} [args]
   *   An object of replacements pairs to make after translation. Incidences
   *   of any key in this array are replaced with the corresponding value.
   *   See {@link Drupal.formatString}.
   *   Note that you do not need to include @count in this array.
   *   This replacement is done automatically for the plural case.
   * @param {object} [options]
   *   The options to pass to the {@link Drupal.t} function.
   *
   * @return {string}
   *   A translated string.
   */
  function formatPlural(
    count: number,
    singular: string,
    plural: string,
    args?: object,
    options?: object
  ): string;

  /**
   * Encodes a Drupal path for use in a URL.
   *
   * For aesthetic reasons slashes are not escaped.
   *
   * @param {string} item
   *   Unencoded path.
   *
   * @return {string}
   *   The encoded path.
   */
  function encodePath(item: string): string;

  const theme: {
    /**
     * Generates the themed representation of a Drupal object.
     *
     * All requests for themed output must go through this function. It examines
     * the request and routes it to the appropriate theme function. If the current
     * theme does not provide an override function, the generic theme function is
     * called.
     *
     * @example
     * <caption>To retrieve the HTML for text that should be emphasized and
     * displayed as a placeholder inside a sentence.</caption>
     * Drupal.theme('placeholder', text);
     *
     * @namespace
     *
     * @param {function} func
     *   The name of the theme function to call.
     * @param {...args}
     *   Additional arguments to pass along to the theme function.
     *
     * @return {string|object|HTMLElement|jQuery}
     *   Any data the theme function returns. This could be a plain HTML string,
     *   but also a complex object.
     */
    (func: string): string | object | HTMLElement;

    /**
     * Formats text for emphasized display in a placeholder inside a sentence.
     *
     * @param {string} str
     *   The text to format (plain-text).
     *
     * @return {string}
     *   The formatted text (html).
     */
    placeholder(str: string): string;
  };
}
