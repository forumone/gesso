import Drupal from 'drupal';

Drupal.behaviors.cardAnimate = {
  attach(context) {
    setTimeout(() => {
      gsap.to('.c-card', { rotation: 27, x: 100, duration: 1 });
    }, 1000);
  },
};
