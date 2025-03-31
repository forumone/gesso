/**
 * Use Notes: To ensure a seamless slide animation, the target element
 * should have both margin and padding set to 0. You can customize
 * whitespace inside the target by adding padding to any of the child
 * elements.
 */

import { TRANSITIONS } from '../00-config/_GESSO.es6';

/**
 * Collapses target element by sliding out of view.
 *
 * @name slideCollapse
 * @param {HTMLElement} target - The element collapsing.
 * @param {integer} duration - The duration of the animation, defaults to gesso token standard.
 * @param {string} easing - The easing of the animation, defaults to gesso token ease-in-out.
 * @param {boolean} hideContent - Whether to hide collapsed content from screen readers, defaults to true.
 */
export const slideCollapse = (
  target,
  duration = TRANSITIONS.duration.standard,
  easing = TRANSITIONS.ease['ease-in-out'],
  hideContent = true
) => {
  // Change duration if user prefers reduced motion.
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );
  const slideDuration = prefersReducedMotion.matches ? '1ms' : duration;

  target.style.height = `${target.offsetHeight}px`;

  window.requestAnimationFrame(() => {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = slideDuration;
    target.style.transitionTimingFunction = easing;
    target.style.boxSizing = 'border-box';
    target.style.overflow = 'hidden';
    target.style.paddingTop = '0';
    target.style.paddingBottom = '0';
    target.style.marginTop = '0';
    target.style.marginBottom = '0';
    target.style.marginHeight = 'auto';

    window.requestAnimationFrame(() => {
      function hideTarget() {
        if (hideContent) {
          target.style.display = 'none';
          target.style.removeProperty('overflow');
        } else {
          target.style.maxHeight = 0;
        }

        target.style.removeProperty('box-sizing');
        target.style.removeProperty('height');
        target.style.removeProperty('margin-block-end');
        target.style.removeProperty('margin-block-start');
        target.style.removeProperty('padding-block-end');
        target.style.removeProperty('padding-block-start');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.style.removeProperty('transition-timing-function');

        target.removeEventListener('transitionend', hideTarget);
        const event = new CustomEvent('finishslider', { detail: target });
        target.dispatchEvent(event);
      }
      target.addEventListener('transitionend', hideTarget);
      target.style.height = '0';
    });
  });
};

/**
 * Expands target element by sliding into view.
 *
 * @name slideExpand
 * @param {HTMLElement} target - The element expanding.
 * @param {integer} duration - The duration of the animation, defaults to gesso token standard.
 * @param {string} easing - The easing of the animation, defaults to gesso token ease-in-out.
 * @param {boolean} hideContent - Whether to hide collapsed content from screen readers, defaults to true.
 */
export const slideExpand = (
  target,
  duration = TRANSITIONS.duration.standard,
  easing = TRANSITIONS.ease['ease-in-out'],
  hideContent = true
) => {
  // Change duration if user prefers reduced motion.
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );
  const slideDuration = prefersReducedMotion.matches ? '1ms' : duration;
  let height;

  if (hideContent) {
    target.style.removeProperty('display');
  } else {
    target.style.removeProperty('max-height');
    target.style.removeProperty('overflow');
  }

  window.requestAnimationFrame(() => {
    if (hideContent) {
      let { display } = window.getComputedStyle(target);
      if (display === 'none') {
        display = 'block';
      }
      target.style.display = display;
    } else {
      target.style.removeProperty('max-height');
      target.style.removeProperty('overflow');
    }

    height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = '0';
    target.style.paddingTop = '0';
    target.style.paddingBottom = '0';
    target.style.marginTop = '0';
    target.style.marginBottom = '0';
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = slideDuration;
    target.style.transitionTimingFunction = easing;

    window.requestAnimationFrame(() => {
      function showTarget() {
        target.style.removeProperty('box-sizing');
        target.style.removeProperty('height');
        target.style.removeProperty('margin-block-end');
        target.style.removeProperty('margin-block-start');
        target.style.removeProperty('overflow');
        target.style.removeProperty('padding-block-end');
        target.style.removeProperty('padding-block-start');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.style.removeProperty('transition-timing-function');
        target.removeEventListener('transitionend', showTarget);
        const event = new CustomEvent('finishslider', { detail: target });
        target.dispatchEvent(event);
      }
      target.style.height = `${height}px`;
      target.addEventListener('transitionend', showTarget);
    });
  });
};

/**
 * Toggle slides target element in and out of view.
 *
 * @name slideToggle
 * @param {HTMLElement} target - The element to toggle.
 * @param {integer} duration - The duration of the animation, defaults to gesso token standard.
 * @param {string} easing - The easing of the animation, defaults to gesso token ease-in-out.
 * @param {boolean} hideContent - Whether to hide collapsed content from screen readers, defaults to true.
 */
export const slideToggle = (
  target,
  duration = TRANSITIONS.duration.standard,
  easing = TRANSITIONS.ease['ease-in-out'],
  hideContent = true
) => {
  if (!target.dataset.isSliding) {
    target.addEventListener(
      'finishslider',
      () => {
        delete target.dataset.isSliding;
      },
      {
        once: true,
      }
    );

    if (
      (hideContent && window.getComputedStyle(target).display === 'none') ||
      (!hideContent && window.getComputedStyle(target).maxHeight === '0px')
    ) {
      target.dataset.isSliding = 'true';
      slideExpand(target, duration, easing, hideContent);
    } else {
      target.dataset.isSliding = 'true';
      slideCollapse(target, duration, easing, hideContent);
    }
  }
};
