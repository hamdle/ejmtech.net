/* ==========================================================================
   EJM Tech — Main JavaScript
   Navigation toggle, scroll effects, fade-in animations, smooth scroll
   ========================================================================== */

(function () {
  'use strict';

  // ---- Mobile navigation toggle (Vanilla Framework pattern) ----
  var toggles = document.querySelectorAll('.p-navigation__toggle--open, .p-navigation__toggle--close');
  var navigation = document.querySelector('.p-navigation');

  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      navigation.classList.toggle('has-menu-open');

      // Toggle aria state
      var isOpen = navigation.classList.contains('has-menu-open');
      document.querySelector('.p-navigation__toggle--open').setAttribute('aria-expanded', isOpen);
    });
  });

  // Close menu on desktop resize
  window.addEventListener('resize', function () {
    if (window.innerWidth > 875) {
      navigation.classList.remove('has-menu-open');
    }
  });

  // ---- Nav shadow on scroll ----
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      navigation.classList.add('has-shadow');
    } else {
      navigation.classList.remove('has-shadow');
    }
  });

  // ---- Fade-in on scroll (IntersectionObserver) ----
  var fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.15 });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all elements immediately
    fadeElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();
      var target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Close mobile nav if open
        if (navigation && navigation.classList.contains('has-menu-open') && window.innerWidth <= 875) {
          navigation.classList.remove('has-menu-open');
        }
      }
    });
  });

})();
