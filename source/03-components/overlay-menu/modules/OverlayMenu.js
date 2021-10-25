class OverlayMenu {
  constructor(domNode, { menuButton = null } = {}) {
    this.menu = domNode;
    this.menuButton = menuButton;
  }

  createMenuButton(elemID) {
    const menuButton = document.createElement('button');
    menuButton.classList.add('hamburger-button', 'hamburger-button--menu');
    menuButton.setAttribute('aria-controls', elemID);
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.innerHTML = '<span class="hamburger-button__icon">Menu</span>';
    return this.menu.insertAdjacentElement('beforebegin', menuButton);
  }

  toggleMenu() {
    if (this.menuButton.getAttribute('aria-expanded') !== 'true') {
      this.menuButton.classList.remove('hamburger-button--menu');
      this.menuButton.classList.add('hamburger-button--close');
      this.menuButton.setAttribute('aria-expanded', 'true');
      this.menu.classList.add('is-open');
    } else {
      this.menuButton.classList.remove('hamburger-button--close');
      this.menuButton.classList.add('hamburger-button--menu');
      this.menuButton.setAttribute('aria-expanded', 'false');
      this.menu.classList.remove('is-open');
    }
  }

  handleButtonClick(event) {
    event.preventDefault();
    this.toggleMenu();
  }

  init() {
    if (!this.menuButton) {
      this.menuButton = this.createMenuButton(this.menu.id);
    }
    this.menuButton.addEventListener(
      'click',
      this.handleButtonClick.bind(this)
    );
  }
}

export default OverlayMenu;
