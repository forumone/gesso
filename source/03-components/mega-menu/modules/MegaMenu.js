/**
 * Megamenu using the W3C Disclosure Menu pattern.
 * @see https://w3c.github.io/aria-practices/examples/disclosure/js/disclosureMenu.js
 */
class MegaMenu {
  constructor(domNode, { useArrowKeys = true } = {}) {
    this.menu = domNode;
    this.menuSections = [];
    this.openIndex = null;
    this.useArrowKeys = useArrowKeys;
    this.topLevelItems = [
      ...this.menu.querySelectorAll('button[aria-expanded][aria-controls]'),
    ];
    if (this.useArrowKeys) {
      this.topLevelItems = [
        ...this.topLevelItems,
        ...this.menu.querySelectorAll('.js-top-link'),
      ];
    }
    this.handleClickAnywhere = this.handleClickAnywhere.bind(this);
    this.handleKeydownAnywhere = this.handleKeydownAnywhere.bind(this);
  }

  toggleSection(section, hide) {
    if (hide) {
      section.hidden = true;
    } else {
      section.hidden = !section.hidden;
    }
  }

  toggleExpand(index, expanded) {
    if (this.openIndex !== index) {
      this.toggleExpand(this.openIndex, false);
    }
    if (this.topLevelItems[index]) {
      if (this.openIndex === null) {
        this.openMenu();
      }
      this.openIndex = expanded ? index : null;
      this.topLevelItems[index].setAttribute('aria-expanded', 'expanded');
      this.toggleSection(this.menuSections[index], !expanded);
      if (this.openIndex === null) {
        this.closeMenu();
      }
    }
  }

  controlFocusByKey(event, menuLinks, currentIndex) {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex > -1) {
          const prevIndex = Math.max(0, currentIndex - 1);
          menuLinks[prevIndex].focus();
        }
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex > -1) {
          const nextIndex = Math.min(menuLinks.length - 1, currentIndex + 1);
          menuLinks[nextIndex].focus();
        }
        break;
      case 'Home':
        event.preventDefault();
        menuLinks[0].focus();
        break;
      case 'End':
        event.preventDefault();
        menuLinks[menuLinks.length - 1].focus();
        break;
      default:
        // Do nothing.
        break;
    }
  }

  handleSectionKeydown(event) {
    if (this.openIndex === null || !this.useArrowKeys) return;

    const menuLinks = [
      ...this.menuSections[this.openIndex].querySelectorAll('a, button'),
    ];
    const currentIndex = menuLinks.indexOf(document.activeElement);
    this.controlFocusByKey(event, menuLinks, currentIndex);
  }

  handleButtonClick(event) {
    const { currentTarget } = event;
    const buttonIndex = this.topLevelItems.indexOf(currentTarget);
    this.toggleExpand(
      buttonIndex,
      currentTarget.getAttribute('aria-expanded') !== 'true'
    );
  }

  handleButtonKeydown(event) {
    if (!this.useArrowKeys) return;
    const targetButtonIndex = this.topLevelItems.indexOf(
      document.activeElement
    );
    if (this.openIndex === targetButtonIndex && event.key === 'ArrowDown') {
      event.preventDefault();
      this.menuSections[this.openIndex].querySelector('a, button').focus();
    } else {
      this.controlFocusByKey(event, this.topLevelItems, targetButtonIndex);
    }
  }

  handleLinkKeydown(event) {
    if (!this.useArrowKeys) return;
    const targetLinkIndex = this.topLevelItems.indexOf(document.activeElement);
    this.controlFocusByKey(event, this.topLevelItems, targetLinkIndex);
  }

  handleCloseClick(event) {
    event.preventDefault();
    this.toggleExpand(this.openIndex, false);
  }

  prepSection(button) {
    const section = button.parentNode.querySelector('.menu__section');
    if (!section) return;
    const closeButton = section.querySelector('.menu__section-close');
    this.menuSections.push(section);
    button.setAttribute('aria-expanded', 'false');
    this.toggleSection(section, true);
    section.addEventListener('keydown', this.handleSectionKeydown.bind(this));
    button.addEventListener('click', this.handleButtonClick.bind(this));
    button.addEventListener('keydown', this.handleButtonKeydown.bind(this));
    closeButton.addEventListener('click', this.handleCloseClick.bind(this));
  }

  prepLink(link) {
    this.menuSections.push(null);
    link.addEventListener('keydown', this.handleLinkKeydown.bind(this));
  }

  handleClickAnywhere(event) {
    if (!event.target.closest('.mega-menu')) {
      this.toggleExpand(this.openIndex, false);
      this.closeMenu();
    }
  }

  handleKeydownAnywhere(event) {
    if (event.key === 'Escape' && this.openIndex !== null) {
      this.menuSections[this.openIndex].focus();
      this.toggleExpand(this.openIndex, false);
      this.closeMenu();
    }
  }

  closeMenu() {
    window.removeEventListener('click', this.handleClickAnywhere);
    window.removeEventListener('keydown', this.handleKeydownAnywhere);
  }

  openMenu() {
    window.addEventListener('click', this.handleClickAnywhere);
    window.addEventListener('keydown', this.handleKeydownAnywhere);
  }

  init() {
    this.topLevelItems.forEach(item => {
      if (item.tagName === 'BUTTON') {
        this.prepSection(item);
      } else {
        this.prepLink(item);
      }
    });
  }
}

export default MegaMenu;
