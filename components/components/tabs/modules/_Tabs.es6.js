/**
 * Tabs based on the W3C Tabs Automatic pattern.
 * @see https://github.com/w3c/aria-practices/blob/main/content/patterns/tabs/examples/js/tabs-automatic.js
 */

class Tabs {
  /**
   * @constructor
   * @param {Element} domNode - The tabs DOM element
   * @param {boolean} useArrowKeys - Whether to enable navigating by arrow keys
   * @return {void}
   */
  constructor(domNode, { useArrowKeys = true } = {}) {
    this.tabs = domNode;
    this.tabPanels = this.tabs.querySelectorAll('[role="tabpanel"]');
    this.tabTriggers = Array.from(this.tabs.querySelectorAll('[role="tab"]'));
    this.useArrowKeys = useArrowKeys;
    [this.firstTab] = this.tabTriggers;
    this.lastTab = this.tabTriggers[this.tabTriggers.length - 1];

    this.tabTriggers.forEach(tab => {
      tab.tabIndex = -1;
      tab.addEventListener('keydown', this.handleKeydown.bind(this));
      tab.addEventListener('click', this.handleClick.bind(this));
    });
  }

  /**
   * Sets the selected tab.
   * @param {Element} tab - Tab button element to set as selected.
   * @param {boolean} setFocus - Whether to set focus to enabled tab.
   * @return {void}
   */
  setSelectedTab(tab, setFocus = true) {
    this.tabTriggers.forEach((tabTrigger, index) => {
      if (tabTrigger === tab) {
        tabTrigger.setAttribute('aria-selected', 'true');
        tabTrigger.removeAttribute('tabindex');
        this.tabPanels[index].setAttribute('aria-hidden', 'false');
        if (setFocus) {
          tabTrigger.focus();
        }
      } else {
        tabTrigger.setAttribute('aria-selected', 'false');
        tabTrigger.tabIndex = -1;
        this.tabPanels[index].setAttribute('aria-hidden', 'true');
      }
    });
  }

  /**
   * Sets active tab to next in the order.
   * @param {Element} currentTab - Currently active tab button element.
   * @return {void}
   */
  setSelectedToPreviousTab(currentTab) {
    if (currentTab === this.firstTab) {
      this.setSelectedTab(this.lastTab);
    } else {
      const index = this.tabTriggers.indexOf(currentTab);
      this.setSelectedTab(this.tabTriggers[index - 1]);
    }
  }

  /**
   * Sets active tab to previous in the order.
   * @param {Element} currentTab - Currently active tab button element.
   * @return {void}
   */
  setSelectedToNextTab(currentTab) {
    if (currentTab === this.lastTab) {
      this.setSelectedTab(this.firstTab);
    } else {
      const index = this.tabTriggers.indexOf(currentTab);
      this.setSelectedTab(this.tabTriggers[index + 1]);
    }
  }

  /**
   * Navigate tabs via arrow keys or pageUp/pageDown.
   * @param {KeyboardEvent} event - The keydown event
   * @return {void}
   */
  handleKeydown(event) {
    const { target } = event;
    let flag = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.setSelectedToPreviousTab(target);
        flag = true;
        break;

      case 'ArrowUp':
        this.setSelectedToPreviousTab(target);
        flag = true;
        break;

      case 'ArrowRight':
        this.setSelectedToNextTab(target);
        flag = true;
        break;

      case 'ArrowDown':
        this.setSelectedToNextTab(target);
        flag = true;
        break;

      case 'Home':
        this.setSelectedTab(this.firstTab);
        flag = true;
        break;

      case 'End':
        this.setSelectedTab(this.lastTab);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  /**
   * Activate tab on click.
   * @param {MouseEvent} event - Activate tab on click.
   * @return {void}
   */
  handleClick(event) {
    this.setSelectedTab(event.target);
  }

  /**
   * Initialize the tabs.
   * @return {void}
   */
  init() {
    this.setSelectedTab(this.firstTab, false);
  }
}

export default Tabs;
