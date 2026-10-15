import Drupal from 'drupal';
import once from 'once';

/**
 * @file
 * Dropbutton feature.
 */

(function initDropbutton() {
  /**
   * Delegated callback for opening and closing dropbutton secondary actions.
   *
   * @function Drupal.DropButton~dropbuttonClickHandler
   *
   * @param {MouseEvent} e
   *   The event triggered.
   */
  function dropbuttonClickHandler(e: MouseEvent) {
    const { target } = e;
    if (target && target instanceof Element) {
      e.preventDefault();
      target.closest('.js-dropbutton')?.classList?.toggle('is-open');
    }
  }

  /**
   * A DropButton presents an HTML list as a button with a primary action.
   *
   * All secondary actions beyond the first in the list are presented in a
   * dropdown list accessible through a toggle arrow associated with the button.
   */
  class DropButton {
    dropbutton: HTMLElement;

    list: HTMLElement[];

    actions: HTMLElement[];

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
    constructor(dropbutton: HTMLElement, settings: { title?: string } = {}) {
      // Merge defaults with settings.
      const options = {
        ...{
          title: Drupal.t('List additional actions'),
        },
        ...settings,
      };

      /**
       * @type {HTMLElement}
       */
      this.dropbutton = dropbutton;

      /**
       * @type {HTMLElement[]}
       */
      this.list = Array.from(
        dropbutton.querySelectorAll('.js-dropbutton-list')
      );

      /**
       * Find actions and mark them.
       *
       * @type {HTMLElement[]}
       */
      this.actions = this.list
        .map(listItem => Array.from(listItem.querySelectorAll('li')))
        .flat();

      // Add the special dropdown only if there are hidden actions.
      if (this.actions.length > 1) {
        // Identify the first element of the collection.
        const primary = this.actions[0];
        primary.classList.add('is-action');
        // Identify the secondary actions.
        const secondary = this.actions.slice(1);
        secondary.forEach(a => a.classList.add('is-secondary-action'));
        // Add toggle link.
        const dropbuttonToggle = Drupal.theme('dropbuttonToggle', options);
        if (dropbuttonToggle instanceof HTMLElement) {
          primary.insertAdjacentElement('afterend', dropbuttonToggle);
        } else {
          primary.insertAdjacentHTML('afterend', dropbuttonToggle);
        }
        // Bind mouse events.
        this.dropbutton.classList.add('has-multiple');
        this.dropbutton.addEventListener(
          'mouseleave',
          this.hoverOut.bind(this)
        );
        this.dropbutton.addEventListener('mouseenter', this.hoverIn.bind(this));
        this.dropbutton.addEventListener('focusout', this.focusOut.bind(this));
        this.dropbutton.addEventListener('focusin', this.focusIn.bind(this));
        this.dropbutton
          .querySelectorAll('.c-dropbutton__toggle')
          .forEach(toggle => {
            if (toggle instanceof HTMLElement) {
              toggle.addEventListener('click', dropbuttonClickHandler);
            }
          });
      } else {
        this.dropbutton.classList.add('is-single');
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
      this.dropbutton.classList.toggle('is-open', show);
    }

    hoverIn = () => {
      // Clear any previous timer we were using.
      if (this.timerID) {
        window.clearTimeout(this.timerID);
      }
    };

    hoverOut = () => {
      // Wait half a second before closing.
      this.timerID = window.setTimeout(this.close.bind(this), 500);
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
  Drupal.theme.dropbuttonToggle = (options: { title: string }) => {
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
      const options = { ...{ dropbutton: {} }, ...settings };
      const dropbuttons = once('dropbutton', '.js-dropbutton', context).filter(
        (elem): elem is HTMLElement => elem instanceof HTMLElement
      );
      if (dropbuttons.length) {
        // Initialize all buttons.
        const il = dropbuttons.length;
        for (let i = 0; i < il; i += 1) {
          DropButton.dropbuttons.push(
            new DropButton(dropbuttons[i], options.dropbutton)
          );
        }
      }
    },
  };
})();
