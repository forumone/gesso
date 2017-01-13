/**
 * @file
 * Task to start BrowserSync server.
 *
 * This implementation is meant to work inside the F1 web-starter virtual
 * machine. If you’re running this locally on your machine, change the proxy
 * target to the url you’re using.
 */
'use strict';

module.exports = function (gulp, browserSync) {
  return function () {
    return browserSync.init({
      open: false, // Don’t automatically open browser inside the vm.
      proxy: {
        // reqHeaders: "10.11.12.14", // Needed?
        target: "localhost:8080", // Use non-varnished server in the vm.
        ws: true // Enable websockets.
      }
    });
  };
};
