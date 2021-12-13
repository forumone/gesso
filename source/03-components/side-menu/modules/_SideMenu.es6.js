import OverlayMenu from '../../overlay-menu/modules/_OverlayMenu.es6';

class SideMenu extends OverlayMenu {
  /**
   * @override
   * @param {HTMLElement} domNode - The top-level menu node
   * @param {HTMLElement|null} menuButton - The open menu button
   * @param {HTMLElement|null} closeButton - The close button toggle
   * @param {boolean} useArrowKeys - Whether to enable navigation by arrow keys
   */
  constructor(
    domNode,
    { menuButton = null, closeButton = null, useArrowKeys = true } = {}
  ) {
    super(domNode, { menuButton, closeButton });
    this.options = {
      useArrowKeys,
    };
    this.menuItems = [];
  }

  /**
   * Create a button to go back to the previous menu section.
   * @param {HTMLElement} submenu - The current menu section.
   *   This should be the section the back button will be added to.
   * @return {HTMLButtonElement}
   */
  createBackButton(submenu) {
    const submenuBack = document.createElement('button');
    submenuBack.classList.add('c-side-menu__back');
    submenuBack.innerText = 'Back';
    submenuBack.addEventListener('click', () => {
      this.closeSubmenu(submenu);
    });
    return submenuBack;
  }

  /**
   * Create an element to display the current menu section.
   * @param {string} title - The menu section title.
   * @return {HTMLDivElement}
   */
  createSubmenuTitle(title) {
    const submenuTitle = document.createElement('div');
    submenuTitle.classList.add('c-side-menu__section-title');
    submenuTitle.innerText = title;
    return submenuTitle;
  }

  /**
   * Create a button to reveal a submenu.
   * @param {HTMLElement} submenu - The submenu to reveal.
   * @return {HTMLButtonElement}
   */
  createSubmenuToggle(submenu) {
    const submenuToggle = document.createElement('button');
    submenuToggle.classList.add('c-side-menu__toggle');
    submenuToggle.innerHTML =
      '<span class="c-side-menu__toggle-icon">Toggle Submenu</span>';
    submenuToggle.addEventListener('click', () => {
      this.openSubmenu(submenu);
    });
    return submenuToggle;
  }

  /**
   * Close a menu section.
   * @param {HTMLElement} submenu - The menu section to close.
   */
  closeSubmenu(submenu) {
    submenu.classList.remove('is-open');
    const currentSection = submenu.closest('.is-open');
    if (currentSection) {
      this.enableTab(currentSection);
      currentSection
        .querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        .focus();
    }
  }

  openSubmenu(submenu) {
    const currentSection = submenu.closest('.is-open');
    if (currentSection) {
      const focusableItems = currentSection.querySelectorAll(
        'button:not(.c-hamburger-button--close), [href], input, select, textarea'
      );
      focusableItems.forEach(item => {
        item.setAttribute('tabindex', '-1');
      });
    }
    submenu.classList.add('is-open');
    this.enableTab(submenu);
    window.removeEventListener('keydown', this.handleKeydown);
    window.addEventListener('keydown', this.handleKeydown);
    submenu
      .querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      .focus();
  }

  /**
   * Prepare a submenu by adding back button, title, and event handlers.
   * @param {HTMLElement} topLevelItem - The button or link that controls the
   *   subsection.
   * @return {HTMLElement | null}
   */
  prepSubmenu(topLevelItem) {
    const submenu = topLevelItem.parentElement.querySelector('.c-menu__subnav');
    if (!submenu) return null;
    const submenuBack = this.createBackButton(submenu);
    submenu.insertAdjacentElement('afterbegin', submenuBack);
    const submenuTitle = this.createSubmenuTitle(topLevelItem.innerText);
    submenuBack.insertAdjacentElement('afterend', submenuTitle);
    return submenu;
  }

  /**
   * Prepare a button menu item.
   * @param {HTMLButtonElement} button - The button menu item.
   * @return {void}
   */
  prepButton(button) {
    this.menuItems.push(button);
    const submenu = this.prepSubmenu(button);
    button.addEventListener('click', () => {
      this.openSubmenu(submenu);
    });
  }

  /**
   * Prepare a link menu item.
   * @param {HTMLAnchorElement} link - The link menu item.
   * @return {void}
   */
  prepLink(link) {
    this.menuItems.push(link);
    if (link.classList.contains('has-subnav')) {
      const submenu = this.prepSubmenu(link);
      const submenuToggle = this.createSubmenuToggle(submenu);
      this.menuItems.push(submenuToggle);
      link.insertAdjacentElement('afterend', submenuToggle);
    }
  }

  /**
   * Initialize the side menu.
   * @return {void}
   */
  init() {
    super.init();
    const menuItems = document.querySelectorAll('.c-menu__link');
    menuItems.forEach(item => {
      if (item.tagName === 'BUTTON') {
        this.prepButton(item);
      } else if (item.tagName === 'A') {
        this.prepLink(item);
      } else {
        throw new Error(
          "Side Menu has child elements that are not A or Button elements. If you need to create a non-linked menu item within your menu, use '<button>' instead of '<nolink>' in the link field."
        );
      }
    });
  }

  /**
   * @inheritdoc
   */
  enableTab(startingPoint) {
    super.enableTab(startingPoint);
    const subNavs = startingPoint.querySelectorAll('.c-menu__subnav');
    subNavs.forEach(subNav => {
      if (!subNav.classList.contains('is-open')) {
        const subnavItems = subNav.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]'
        );
        subnavItems.forEach(item => {
          item.setAttribute('tabindex', '-1');
        });
      }
    });
  }

  /**
   * @inheritdoc
   */
  handleKeydown(event) {
    const { key } = event;
    if (key === 'Tab' || key === 'Escape') {
      super.handleKeydown(event);
    } else {
      if (!this.options.useArrowKeys) return;
      const focusable = [
        ...this.overlay.querySelectorAll(
          'button, [href], input, select, textarea'
        ),
      ].filter(item => item.tabIndex !== -1);
      const numberFocusElements = focusable.length;
      const firstFocusableElement = focusable[0];
      const lastFocusableElement = focusable[numberFocusElements - 1];
      switch (key) {
        case 'ArrowUp':
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
          } else {
            const currentIndex = focusable.indexOf(document.activeElement);
            if (currentIndex !== -1) {
              focusable[currentIndex - 1].focus();
            }
          }
          break;
        case 'ArrowDown':
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
          } else {
            const currentIndex = focusable.indexOf(document.activeElement);
            if (currentIndex !== -1) {
              focusable[currentIndex + 1].focus();
            }
          }
          break;
        case 'ArrowRight':
          if (document.activeElement.closest('.c-menu__item')) {
            const activeMenuItem =
              document.activeElement.closest('.c-menu__item');
            if (activeMenuItem.classList.contains('has-subnav')) {
              const submenu = activeMenuItem.querySelector('.c-menu__subnav');
              this.openSubmenu(submenu);
            }
          }
          break;
        case 'ArrowLeft':
          if (document.activeElement.closest('.c-menu__item')) {
            const activeMenuItem =
              document.activeElement.closest('.c-menu__item');
            if (activeMenuItem.classList.contains('has-subnav')) {
              const submenu = activeMenuItem.querySelector('.c-menu__subnav');
              this.closeSubmenu(submenu);
            }
          }
          break;
        case 'Home':
        case 'PageUp':
          firstFocusableElement.focus();
          break;
        case 'End':
        case 'PageDown':
          lastFocusableElement.focus();
          break;
        default:
          break;
      }
    }
  }
}

export default SideMenu;
