(function(nav) {
  "use strict";

  function fn(query) { return (fn.support ? matchMedia(query) : { matches: null }).matches; }

  fn.sm = '(max-width: 767.98px)';
  fn.md = '(min-width: 768px) and (max-width: 991.98px)';
  fn.lg = '(min-width: 992px)';
  fn.support = 'matchMedia' in window;
  nav.isPhone = function isPhone() { return fn(fn.sm); };
  nav.isMobile = function isMobile() { return (navigator.isPhone() || navigator.isTablet()); };
  nav.isTablet = function isTablet() { return fn(fn.md); };
  nav.isDesktop = function isDesktop() { return fn(fn.lg); };
})(Navigator.prototype);