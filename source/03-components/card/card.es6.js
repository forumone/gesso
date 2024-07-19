import Drupal from 'drupal';

Drupal.behaviors.cardAnimate = {
  attach() {
    const callbackTimer = setInterval(() => {
      let call = false;
      try {
        /* eslint-disable no-undef */
        call = gsap.to('.c-card', { rotation: 27, x: 100, duration: 1 });
        /* eslint-enable no-undef */
      } catch (e) {
        /* empty */
      }

      if (call) {
        clearInterval(callbackTimer);
      }
    }, 100);

    setTimeout(() => {
      clearInterval(callbackTimer);
    }, 1000);
  },
};
