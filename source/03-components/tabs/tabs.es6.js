import Drupal from 'drupal';
import once from 'once';

Drupal.behaviors.gessoTabs = {
  attach(context) {
    const tabs = once('gesso-tabs', '.c-tabs', context);

    // Function to activate tab
    const activateTab = (button, tabsParent) => {
      const activePanel = tabsParent?.querySelector('.c-tabs-panel[aria-hidden="false"]');
      const activeButton = tabsParent?.querySelector('.c-tabs-button[aria-expanded="true"]');
      const newPanel = document.getElementById(button.getAttribute('aria-controls'));
      const magicLine = tabsParent?.querySelector('.c-tabs__magic-line');
      // Activate new button/panel
      activePanel?.setAttribute('aria-hidden', 'true');
      newPanel?.setAttribute('aria-hidden', 'false');
      activeButton?.setAttribute('aria-expanded', 'false');
      button?.setAttribute('aria-expanded', 'true');
      // Move magic line
      magicLine.style.width = `${button.offsetWidth}px`;
      magicLine.style.left = `${button.offsetLeft}px`;
    };

    // Add event listener to tabs buttons
    tabs.forEach((tabsItem, index) => {
      const buttons = tabsItem.querySelectorAll('.c-tabs-button');
      // Activate tab on click
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          activateTab(button, tabsItem);
        });
      });
      // Activate the first tab on page load
      if (index === 0) {
        activateTab(buttons[0], tabsItem);
      }
    });
  }
};