// Custom scripts file

(function ($) {

  'use strict';

  // Generic function that runs on window resize.
  function resizeStuff() {
    
  }

  // Runs function once on window resize.
  var TO = false;
  $(window).resize(function () {
    if (TO !== false) {
      clearTimeout(TO);
    }

    // 200 is time in miliseconds.
    TO = setTimeout(resizeStuff, 200);
  }).resize();

})(jQuery);
