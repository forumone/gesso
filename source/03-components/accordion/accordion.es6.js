import Drupal from 'drupal';
import { slideDown, slideUp } from '../../06-utility/_slide.es6';

Drupal.behaviors.accordion = {
  attach(context) {
    const ACCORDION_CLASS = 'js-accordion';
    const ACCORDION_TOGGLE_CLASS = 'js-accordion-toggle';
    const ACCORDION_SPEED = 250;

    const accordions = context.querySelectorAll(
      `.${ACCORDION_CLASS}`
    );

    const openAccordion = (accordion, button) => {
      if (button.getAttribute('aria-expanded') === 'false') {
        button.setAttribute('aria-expanded', 'true');
        const accordionSection = document.getElementById(
          button.getAttribute('aria-controls')
        );
        accordionSection.setAttribute('aria-expanded', 'true');
        slideDown(accordionSection, ACCORDION_SPEED);
      }
    };

    const closeAccordion = (accordion, button) => {
      if (button.getAttribute('aria-expanded') === 'true') {
        button.setAttribute('aria-expanded', 'false');
        const accordionSection = document.getElementById(
          button.getAttribute('aria-controls')
        );
        accordionSection.setAttribute('aria-expanded', 'false');
        slideUp(
          document.getElementById(button.getAttribute('aria-controls')),
          ACCORDION_SPEED
        );
      }
    };

    // Accessible Accordion Functionality
    // Based off example work from W3 best aria practices
    // https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html
    accordions.forEach(accordion => {
      // Allow for multiple accordion sections to be expanded at the same time
      const allowMultiple = accordion.hasAttribute('data-allow-multiple');
      // Allow for each toggle to both open and close individually
      const allowToggle = allowMultiple
        ? true
        : accordion.hasAttribute('data-allow-toggle');

      // Create the array of toggle elements for the accordion group
      const triggers = Array.prototype.slice.call(
        accordion.querySelectorAll(`.${ACCORDION_TOGGLE_CLASS}`)
      );

      accordion.addEventListener('click', event => {
        // Set target differently depending on click vs. keydown
        // because the <span> inside <button> screws things up
        if (
          event.target.classList.contains(ACCORDION_TOGGLE_CLASS) ||
          event.target.parentElement.classList.contains(
            ACCORDION_TOGGLE_CLASS
          )
        ) {
          let target;
          // Set target based on click or keydown
          if (event.target.classList.contains(ACCORDION_TOGGLE_CLASS)) {
            target = event.target;
          } else {
            target = event.target.parentElement;
          }
          // Check if the current toggle is expanded.
          const isExpanded = target.getAttribute('aria-expanded') === 'true';
          const active = accordion.querySelector('[aria-expanded="true"]');

          // without allowMultiple, close the open accordion
          if (!allowMultiple && active && active !== target) {
            closeAccordion(
              document.getElementById(active.getAttribute('aria-controls')),
              active,
              allowToggle,
              true
            );
          }

          if (!isExpanded) {
            openAccordion(
              document.getElementById(target.getAttribute('aria-controls')),
              target,
              allowToggle,
              !allowMultiple
            );
          } else if (allowToggle && isExpanded) {
            closeAccordion(
              document.getElementById(target.getAttribute('aria-controls')),
              target,
              allowToggle,
              !allowMultiple
            );
          }

          event.preventDefault();
        }
      });

      // Bind keyboard behaviors on the main accordion container
      accordion.addEventListener('keydown', event => {
        const currentTarget = event.target;
        const key = event.which.toString();

        // 33 = Page Up, 34 = Page Down
        const ctrlModifier = event.ctrlKey && key.match(/33|34/);

        // Is this coming from an accordion header?
        if (currentTarget.classList.contains(ACCORDION_TOGGLE_CLASS)) {
          // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
          // 38 = Up, 40 = Down
          if (key.match(/38|40/) || ctrlModifier) {
            const index = triggers.indexOf(currentTarget);
            const direction = key.match(/34|40/) ? 1 : -1;
            const triggerLength = triggers.length;
            const newIndex = (index + triggerLength + direction) % triggerLength;
            triggers[newIndex].focus();
            event.preventDefault();
          } else if (key.match(/35|36/)) {
            // 35 = End, 36 = Home keyboard operations
            switch (key) {
              // Go to first accordion
              case '36':
                triggers[0].focus();
                break;
              // Go to last accordion
              case '35':
                triggers[triggers.length - 1].focus();
                break;
              default:
                triggers[0].focus();
                break;
            }
            event.preventDefault();
          }
        }
      });

      // These are used to style the accordion when one of the buttons has focus
      accordion
        .querySelectorAll(`.${ACCORDION_TOGGLE_CLASS}`)
        .forEach(trigger => {
          trigger.addEventListener('focus', () => {
            accordion.classList.add('focus');
          });

          trigger.addEventListener('blur', () => {
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
    });
  },
};
