import Drupal from 'drupal';
import once from 'once';

Drupal.behaviors.gessoModal = {
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

    // Close modal on overlay click
    const handleOverlayClick = event => {
      if (event.target.closest(`.${MODAL_INNER_CLASS}`)) return;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      closeModal(event.currentTarget);
    };

    // Function to show modal
    const openModal = modal => {
      modal.showModal();
      modal.addEventListener('click', handleOverlayClick);
      // Turn off scrolling on the body
      document.body.classList.add('has-open-modal');

      const event = new CustomEvent('openmodal');
      modal.dispatchEvent(event);
    };

    // Function to close modal
    const closeModal = modal => {
      modal.close();
      modal.removeEventListener('click', handleOverlayClick);
      // Turn on scrolling on the body
      document.body.classList.remove('has-open-modal');

      const event = new CustomEvent('closemodal');
      modal.dispatchEvent(event);
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
        if (e.key === 'Tab') {
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
        } else if (e.key === 'Escape') {
          // Close modal on escape key press
          e.preventDefault();
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
