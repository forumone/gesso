// Custom scripts file
import backToTop from './modules/_back-to-top.es6';
import domready from 'domready';
(function () {
  'use strict';

  // Generic function that runs on window resize.
  // An empty function is allowed here because it's meant as a placeholder,
  // but you should remove this functionality if you aren't using it!
  // eslint-disable-next-line no-empty-function
  function resizeStuff() {}

  // Runs function once on window resize.
  let timeOut = false;
  window.addEventListener('resize', () => {
    if (timeOut !== false) {
      clearTimeout(timeOut);
    }

    // 200 is time in miliseconds.
    timeOut = setTimeout(resizeStuff, 200);
  });

  // Any scripts you want to initialize once the DOM is ready go here.
  domready(() => {
    backToTop();
  });
})();
