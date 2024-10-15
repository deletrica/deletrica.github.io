(function(global) {
  "use strict";


  global.addEventListener('load', function() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' });
    }
  });
})(this);