import OverlayMenu from '../../overlay-menu/modules/_OverlayMenu.es6';

class SideMenu extends OverlayMenu {
  /**
   * @inheritdoc
   */
  constructor(domNode, { menuButton = null, closeButton = null } = {}) {
    super(domNode, { menuButton, closeButton });
    this.menuItems = [];
  }

  prepButton(button) {
    this.menuItems.push(button);
  }

  prepLink(link) {
    this.menuItems.push(link);
    if (link.classList.contains('has-subnav')) {
      const submenu = link.parentElement.querySelector('.menu__subnav');
      if (!submenu) return;
      const submenuBack = document.createElement('button');
      submenuBack.classList.add('side-menu__back');
      submenuBack.innerText = 'Back';
      submenuBack.addEventListener('click', () => {
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
      });
      submenu.insertAdjacentElement('afterbegin', submenuBack);
      const submenuToggle = document.createElement('button');
      submenuToggle.classList.add('side-menu__toggle');
      submenuToggle.innerHTML =
        '<span class="side-menu__toggle-icon">Toggle Submenu</span>';
      submenuToggle.addEventListener('click', () => {
        submenu.classList.add('is-open');
        const currentSection = link.closest('.is-open');
        if (currentSection) {
          const focusableItems = currentSection.querySelectorAll(
            'button:not(.hamburger-button--close), [href], input, select, textarea'
          );
          focusableItems.forEach(item => {
            item.setAttribute('tabindex', '-1');
          });
        }
        this.enableTab(submenu);
        window.removeEventListener('keydown', this.handleKeydown);
        window.addEventListener('keydown', this.handleKeydown);
        submenuBack.focus();
      });
      this.menuItems.push(submenuToggle);
      link.insertAdjacentElement('afterend', submenuToggle);
    }
  }

  init() {
    super.init();
    const menuItems = document.querySelectorAll('.menu__link');
    menuItems.forEach(item => {
      if (item.tagName === 'BUTTON') {
        this.prepButton(item);
      } else if (item.tagName === 'A') {
        this.prepLink(item);
      } else {
        throw new Error(
          "Side Menu has child elements that are not A or Button elements. If you need to create a non-linked menu item within your menu, use 'route:<button>' instead of '<nolink>' in the link field."
        );
      }
    });
  }

  enableTab(startingPoint) {
    super.enableTab(startingPoint);
    const subNavs = startingPoint.querySelectorAll('.menu__subnav');
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
}

export default SideMenu;
