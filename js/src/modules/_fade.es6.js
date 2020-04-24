/**
 * Fades target element out of view.
 *
 * @name fadeOut
 * @param {string} target - The element fading out.
 * @param {integer} duration - The duration of the animation, with default value 500.
 */
export const fadeOut = (target, duration = 500) => {
  target.style.transitionProperty = 'opacity';
  target.style.transitionDuration = `${duration}ms`;
  target.style.opacity = 0;
  window.setTimeout(() => {
    target.style.display = 'none';
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
  const body = document.getElementsByTagName('body')[0];
  body.classList.remove('no-overflow');
};

/**
 * Fades target element into view.
 *
 * @name fadeIn
 * @param {string} target - The element fading in.
 * @param {integer} duration - The duration of the animation, with default value 500.
 */
export const fadeIn = (target, duration = 500) => {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;
  if (display === 'none') {
    display = 'block';
  }
  target.style.display = display;
  target.style.transitionProperty = 'opacity';
  target.style.transitionDuration = `${duration}ms`;
  window.setTimeout(() => {
    target.style.opacity = 1;
  }, 100);
  window.setTimeout(() => {
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
  const body = document.getElementsByTagName('body')[0];
  body.classList.add('no-overflow');
};

/**
 * Toggle fades target element in and out of view.
 *
 * @name fadeToggle
 * @param {string} target - The element to toggle.
 * @param {integer} duration - The duration of the animation, with default value 500.
 */
export const fadeToggle = (target, duration = 500) => {
  if (window.getComputedStyle(target).display === 'none') {
    return fadeIn(target, duration);
  } else {
    return fadeOut(target, duration);
  }
};
