import Drupal from 'drupal';
import once from 'once';
import { TRANSITIONS } from '../../../source/00-config/_GESSO.es6.js';
import { slideToggle } from '../../../source/02-utility/_slide.es6.js';

Drupal.behaviors.accordion = {
  attach(context) {
    const ACCORDION_CLASS = 'js-accordion';
    const ACCORDION_TOGGLE_CLASS = 'js-accordion-toggle';
    const ACCORDION_SPEED = TRANSITIONS.duration.standard;
    const accordions = once('accordion', `.${ACCORDION_CLASS}`, context);

    const openAccordion = toggle => {
      const accordionItem = document.getElementById(
        toggle.getAttribute('aria-controls')
      );
      if (
        !accordionItem.dataset.isSliding &&
        toggle.getAttribute('aria-expanded') === 'false'
      ) {
        toggle.setAttribute('aria-expanded', 'true');
        slideToggle(accordionItem, ACCORDION_SPEED);
      }
    };

    const closeAccordion = toggle => {
      const accordionItem = document.getElementById(
        toggle.getAttribute('aria-controls')
      );
      if (
        !accordionItem.dataset.isSliding &&
        toggle.getAttribute('aria-expanded') === 'true'
      ) {
        toggle.setAttribute('aria-expanded', 'false');
        slideToggle(accordionItem, ACCORDION_SPEED);
      }
    };

    accordions.forEach(accordion => {
      // Allow for multiple accordion sections to be expanded at the same time
      const allowMultiple = accordion.hasAttribute('data-allow-multiple');
      // Allow for each toggle to both open and close individually
      const allowToggle = allowMultiple
        ? true
        : accordion.hasAttribute('data-allow-toggle');

      // Create the array of toggle elements for the accordion group
      const toggles = Array.prototype.slice.call(
        accordion.querySelectorAll(`.${ACCORDION_TOGGLE_CLASS}`)
      );

      accordion.addEventListener('click', event => {
        // Set target differently depending on click vs. keydown
        // because the <span> inside <button> screws things up
        if (
          event.target.classList.contains(ACCORDION_TOGGLE_CLASS) ||
          event.target.parentElement.classList.contains(ACCORDION_TOGGLE_CLASS)
        ) {
          const target = event.target.classList.contains(ACCORDION_TOGGLE_CLASS)
            ? event.target
            : event.target.parentElement;

          // Check if the current toggle is expanded.
          const isExpanded = target.getAttribute('aria-expanded') === 'true';
          const active = accordion.querySelector('[aria-expanded="true"]');

          // Without allowMultiple, close the open accordion
          if (!allowMultiple && active && active !== target) {
            closeAccordion(active);
          }

          if (!isExpanded) {
            openAccordion(target);
          } else if (allowToggle && isExpanded) {
            closeAccordion(target);
          }
          event.preventDefault(); // Only prevent default for accordion toggle clicks
        }
      });

      // Bind keyboard behaviors on the main accordion container
      accordion.addEventListener('keydown', event => {
        const currentTarget = event.target;

        if (currentTarget.classList.contains(ACCORDION_TOGGLE_CLASS)) {
          if (
            event.key === 'ArrowUp' ||
            event.key === 'ArrowDown' ||
            event.key === 'PageDown' ||
            event.key === 'PageUp'
          ) {
            // ArrowUp/ArrowDown and PageUp/PageDown navigate through the accordion items
            const index = toggles.indexOf(currentTarget);
            let direction;
            if (event.key === 'ArrowDown' || event.key === 'PageDown') {
              direction = 1;
            } else {
              direction = -1;
            }
            const triggerLength = toggles.length;
            const newIndex =
              (index + triggerLength + direction) % triggerLength;
            toggles[newIndex].focus();
            event.preventDefault();
          } else if (event.key === 'Home') {
            // Home navigates to the first accordion item
            toggles[0].focus();
          } else if (event.key === 'End') {
            // End navigates to the last accordion item
            toggles[toggles.length - 1].focus();
          }
        }
      });

      // Add class to accordion when toggle has focus
      toggles.forEach(toggle => {
        toggle.addEventListener('focus', () => {
          accordion.classList.add('focus');
        });

        toggle.addEventListener('blur', () => {
          accordion.classList.remove('focus');
        });
      });

      // Minor setup: will set disabled state, via aria-disabled, to an
      // expanded/ active accordion which is not allowed to be toggled close
      if (!allowToggle) {
        // Get the first expanded/ active accordion
        const expanded = accordion.querySelector('[aria-expanded="true"]');

        // If an expanded/ active accordion is found, disable
        if (expanded) {
          expanded.setAttribute('aria-disabled', 'true');
        }
      }

      // Initiate accordions on page load
      const accordionItems = accordion.querySelectorAll('.js-accordion-item');
      accordionItems.forEach(item => {
        const toggle = item.querySelector(`.${ACCORDION_TOGGLE_CLASS}`);
        // Close all accordion items that are not 'default-open'
        if (!item.hasAttribute('data-accordion-open')) {
          closeAccordion(toggle);
        }
        // Update toggle tabindex
        toggle.removeAttribute('tabindex');
        // Add attribute 'processed'
        item.setAttribute('accordion-processed', '');
      });
    });
  },
};
