import domready from 'domready';
import { slideDown, slideToggle, slideUp } from './modules/_slide.es6';

domready(() => {
  const slideUpButtons = document.querySelectorAll(
    '.pattern-lab-sliding__slide-up'
  );
  if (slideUpButtons.length) {
    slideUpButtons.forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault();
        slideUp(button.nextElementSibling);
      });
    });
  }
  const slideDownButtons = document.querySelectorAll(
    '.pattern-lab-sliding__slide-down'
  );
  if (slideDownButtons.length) {
    slideDownButtons.forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault();
        slideDown(button.nextElementSibling);
      });
    });
  }
  const slideToggleButtons = document.querySelectorAll(
    '.pattern-lab-sliding__slide-toggle'
  );
  if (slideToggleButtons.length) {
    slideToggleButtons.forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault();
        slideToggle(button.nextElementSibling);
      });
    });
  }
});
