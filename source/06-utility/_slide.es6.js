/**
 * Use Notes: To ensure a seamless slide animation, the target element
 * should have both margin and padding set to 0. You can customize
 * whitespace inside the target by adding padding to any of the child
 * elements.
 */

/**
 * Slides target element up and out view.
 *
 * @name slideUp
 * @param {HTMLElement} target - The element sliding up.
 * @param {integer} duration - The duration of the animation, with default value 500.
 */
export const slideUp = (target, duration = 500) => {
  target.style.height = `${target.offsetHeight}px`;
  window.requestAnimationFrame(() => {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = `${duration}ms`;
    target.style.boxSizing = 'border-box';
    target.style.overflow = 'hidden';
    target.style.paddingTop = '0';
    target.style.paddingBottom = '0';
    target.style.marginTop = '0';
    target.style.marginBottom = '0';

    window.requestAnimationFrame(() => {
      function hideTarget() {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
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
 * Slides target element down and into view.
 *
 * @name slideDown
 * @param {HTMLElement} target - The element sliding down.
 * @param {integer} duration - The duration of the animation, with default value 500.
 */
export const slideDown = (target, duration = 500) => {
  let height;
  target.style.removeProperty('display');
  window.requestAnimationFrame(() => {
    let {display} = window.getComputedStyle(target);
    if (display === 'none') {
      display = 'block';
    }
    target.style.display = display;
    height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = '0';
    target.style.paddingTop = '0';
    target.style.paddingBottom = '0';
    target.style.marginTop = '0';
    target.style.marginBottom = '0';
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = `${duration}ms`;

    window.requestAnimationFrame(() => {
      function showTarget() {
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
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
 * @param {integer} duration - The duration of the animation, with default value 500.
 */
export const slideToggle = (target, duration = 500) => {
  if (!target.dataset.isSliding) {
    target.addEventListener('finishslider', () => {
      delete target.dataset.isSliding;
      target.removeEventListener('finishslider');
    });
    if (window.getComputedStyle(target).display === 'none') {
      target.dataset.isSliding = 'true';
      slideDown(target, duration);
    } else {
      target.dataset.isSliding = 'true';
      slideUp(target, duration);
    }
  }
};
