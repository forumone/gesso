/**
 * Function: fadeOut. Fade target element out of view
 * @param  target the element fading in
 * @param  duration the duration of the animation
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
 * Function: fadeIn. Fade target element into view
 * @param  target the element fading out
 * @param  duration the duration of the animation
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
 * Function: fadeToggle. Toggle element between fadeIn
 * and faddeOut
 * @param  target the element to toggle
 * @param  duration the duration of the animation
 */
export const fadeToggle = (target, duration = 500) => {
  if (window.getComputedStyle(target).display === 'none') {
    return fadeIn(target, duration);
  } else {
    return fadeOut(target, duration);
  }
};
