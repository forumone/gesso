// Custom scripts file

(function () {

  'use strict';

  // Generic function that runs on window resize.
  function resizeStuff() {
    
  }

  // Runs function once on window resize.
  let timeOut = false;
  window.addEventListener('resize', () => {
    if (timeOut !== false) {
      clearTimeout(timeOut);
    }

    // 200 is time in miliseconds.
    timeOut = setTimeout(resizeStuff, 200);
  });
})();
