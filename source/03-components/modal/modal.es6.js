import Drupal from 'drupal';
import once from 'once';
import KEYCODE from '../../00-config/_KEYCODE.es6';

Drupal.behaviors.accordion = {
  attach(context) {
    const MODAL_CLASS = 'js-modal';
    const MODAL_INNER_CLASS = 'js-modal-inner';
    const MODAL_OPEN_BUTTON_CLASS = 'js-modal-open';
    const MODAL_CLOSE_BUTTON_CLASS = 'js-modal-close';

    const modals = once('modal', `.${MODAL_CLASS}`, context);
    const modalOpenButtons = once(
      'show-modal-button',
      `.${MODAL_OPEN_BUTTON_CLASS}`,
      context
    );
    const modalCloseButtons = once(
      'close-modal-button',
      `.${MODAL_CLOSE_BUTTON_CLASS}`,
      context
    );

    // Function to show modal
    const openModal = modal => {
      modal.showModal();
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      modal.addEventListener('click', handleOverlayClick);
      // Turn off scrolling on the body
      document.body.style.overflow = 'hidden';
    };

    // Function to close modal
    const closeModal = modal => {
      modal.close();
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      modal.removeEventListener('click', handleOverlayClick);
      // Turn on scrolling on the body
      document.body.style.overflow = '';
    };

    // Close modal on overlay click
    const handleOverlayClick = event => {
      if (event.target.closest(`.${MODAL_INNER_CLASS}`)) return;
      closeModal(event.currentTarget);
    };

    // Function to handle key downs while modal is open
    const handleKeyDown = element => {
      const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      );
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement =
        focusableElements[focusableElements.length - 1];

      element.addEventListener('keydown', e => {
        if (e.key === 'Tab' || e.keyCode === KEYCODE.TAB) {
          // If shift key pressed for shift + tab combination
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              // Add focus for the last focusable element
              lastFocusableElement.focus();
              e.preventDefault();
            }
          }
          // If focused has reached to last focusable element then focus first focusable element after pressing tab
          else if (document.activeElement === lastFocusableElement) {
            // Add focus for the first focusable element
            firstFocusableElement.focus();
            e.preventDefault();
          }
        } else if (e.key === 'Escape' || e.keyCode === KEYCODE.ESCAPE) {
          // Close modal on escape key press
          e.preventDefault();
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          closeModal(element);
        }
      });
    };

    // Initialize modals
    modals.forEach(modal => {
      // Open modal if set to default open
      if (modal.hasAttribute('data-default-open')) {
        openModal(modal);
      }
      // Trap focus inside modal
      handleKeyDown(modal);
    });

    // Open modal on button click
    modalOpenButtons.forEach(button => {
      const modal = document.getElementById(
        button.getAttribute('aria-controls')
      );
      button.addEventListener('click', () => {
        if (modal) openModal(modal);
      });
    });

    // Close modal on button click
    modalCloseButtons.forEach(button => {
      const modal = document.getElementById(
        button.getAttribute('aria-controls')
      );
      button.addEventListener('click', () => {
        if (modal) closeModal(modal);
      });
    });
  },
};
