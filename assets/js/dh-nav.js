// DeepHeads: mobile (hamburger) navigation
(function () {
  'use strict';

  var header = document.querySelector('.dh-nav');
  if (!header) return;

  var burger = header.querySelector('.dh-burger');
  var panel = document.getElementById('dh-mobile-menu');
  if (!burger || !panel) return;

  var scrim = document.querySelector('.dh-scrim');

  function isOpen() {
    return header.classList.contains('is-open');
  }

  function setOpen(open) {
    header.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('dh-menu-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Меню');
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  burger.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!isOpen());
  });

  // Close after following a link inside the panel
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  // Close on scrim tap or outside click
  if (scrim) scrim.addEventListener('click', function () { setOpen(false); });
  document.addEventListener('click', function (e) {
    if (!isOpen()) return;
    if (!header.contains(e.target) && (!scrim || !scrim.contains(e.target))) setOpen(false);
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      if (isOpen()) {
        setOpen(false);
        burger.focus();
      }
    }
  });

  // Close when switching to the desktop layout
  var mq = window.matchMedia('(min-width: 901px)');
  var onChange = function (e) { if (e.matches) setOpen(false); };
  if (mq.addEventListener) mq.addEventListener('change', onChange);
  else if (mq.addListener) mq.addListener(onChange);
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) setOpen(false);
  });

  setOpen(false);
})();
