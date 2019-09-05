// Custom scripts file

import MenuBar from "./modules/_MenuBar.es6";

(function () {

  'use strict';

  // Generic function that runs on window resize.
  function resizeStuff() {
    const foo = new MenuBar();
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
