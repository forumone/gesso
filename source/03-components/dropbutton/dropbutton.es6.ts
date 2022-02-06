import jQuery from 'jquery';
import Drupal from 'drupal';
import once from 'once';

/**
 * @file
 * Dropbutton feature.
 */

(function initDropbutton($) {
  /**
   * Delegated callback for opening and closing dropbutton secondary actions.
   *
   * @function Drupal.DropButton~dropbuttonClickHandler
   *
   * @param {jQuery.Event} e
   *   The event triggered.
   */
  function dropbuttonClickHandler(e: JQuery.Event) {
    e.preventDefault();
    $(e.target).closest('.js-dropbutton').toggleClass('is-open');
  }

  /**
   * A DropButton presents an HTML list as a button with a primary action.
   *
   * All secondary actions beyond the first in the list are presented in a
   * dropdown list accessible through a toggle arrow associated with the button.
   */
  class DropButton {
    $dropbutton: JQuery;

    $list: JQuery;

    $actions: JQuery;

    timerID = 0;

    /**
     * Store all processed DropButtons.
     */
    static dropbuttons = [] as DropButton[];

    /**
     * @param {HTMLElement} dropbutton
     *   A DOM element.
     * @param {object} settings
     *   A list of options including:
     * @param {string} settings.title
     *   The text inside the toggle link element. This text is hidden
     *   from visual UAs.
     */
    constructor(dropbutton: HTMLElement, settings = {}) {

      // Merge defaults with settings.
      const options = $.extend(
        {title: Drupal.t('List additional actions')},
        settings
      );
      const $dropbutton = $(dropbutton);

      /**
       * @type {jQuery}
       */
      this.$dropbutton = $dropbutton;

      /**
       * @type {jQuery}
       */
      this.$list = $dropbutton.find('.js-dropbutton-list');

      /**
       * Find actions and mark them.
       *
       * @type {jQuery}
       */
      this.$actions = this.$list.find('li');

      // Add the special dropdown only if there are hidden actions.
      if (this.$actions.length > 1) {
        // Identify the first element of the collection.
        const $primary = this.$actions.slice(0, 1);
        $primary.addClass('is-action');
        // Identify the secondary actions.
        const $secondary = this.$actions.slice(1);
        $secondary.addClass('is-secondary-action');
        // Add toggle link.
        $primary.after(Drupal.theme('dropbuttonToggle', options));
        // Bind mouse events.
        this.$dropbutton.addClass('has-multiple').on({
          /**
           * Adds a timeout to close the dropdown on mouseleave.
           */
          'mouseleave.dropbutton': $.proxy(this.hoverOut, this),

          /**
           * Clears timeout when mouseout of the dropdown.
           */
          'mouseenter.dropbutton': $.proxy(this.hoverIn, this),

          /**
           * Similar to mouseleave/mouseenter, but for keyboard navigation.
           */
          'focusout.dropbutton': $.proxy(this.focusOut, this),

          'focusin.dropbutton': $.proxy(this.focusIn, this),
        });
      } else {
        this.$dropbutton.addClass('is-single');
      }
    }

    /**
     * Toggle the dropbutton open and closed.
     *
     * @param {boolean} show
     *   Force the dropbutton to open by passing true or to close by
     *   passing false.
     */
    toggle(show?: boolean) {
      const isBool = typeof show === 'boolean';
      const openButton = isBool
        ? show
        : !this.$dropbutton.hasClass('is-open');
      this.$dropbutton.toggleClass('is-open', openButton);
    }

    hoverIn = () => {
      // Clear any previous timer we were using.
      if (this.timerID) {
        window.clearTimeout(this.timerID);
      }
    };

    hoverOut = () => {
      // Wait half a second before closing.
      this.timerID = window.setTimeout($.proxy(this, 'close'), 500);
    };

    open = () => this.toggle(true);

    close = () => this.toggle(false);

    focusOut = () => this.hoverOut();

    focusIn = () => this.hoverIn();
  }

  /**
   * A toggle is an interactive element often bound to a click handler.
   *
   * @param {object} options
   *   Options object.
   * @param {string} options.title
   *   The HTML anchor title attribute and text for the inner span element.
   *
   * @return {string}
   *   A string representing a DOM fragment.
   */
  Drupal.theme.dropbuttonToggle = (options: { title: string } ) => {
    return `<li class="c-dropbutton__toggle"><button class="c-dropbutton__toggle-button" type="button"><span class="u-visually-hidden">${options.title}</span></button></li>`;
  };

  // Expose constructor in the public space.
  Drupal.DropButton = DropButton;

  /**
   * Process elements with the .dropbutton class on page load.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches dropButton behaviors.
   */
  Drupal.behaviors.dropButton = {
    attach(context, settings) {
      const options = $.extend({ dropbutton: {} }, settings);
      const dropbuttons = once('dropbutton', '.js-dropbutton', context);
      if (dropbuttons.length) {
        // Adds the delegated handler that will toggle dropdowns on click.
        once('dropbuttonClick', 'body', context).forEach((bodyElem: HTMLElement) => {
          const $body = $(bodyElem);
          if ($body.length) {
            $body.on('click', '.c-dropbutton__toggle', dropbuttonClickHandler);
          }
          // Initialize all buttons.
          const il = dropbuttons.length;
          for (let i = 0; i < il; i += 1) {
            DropButton.dropbuttons.push(
              new DropButton(dropbuttons[i], options.dropbutton)
            );
          }
        });
      }
    },
  };
})(jQuery);
