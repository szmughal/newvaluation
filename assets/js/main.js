/* ==========================================================================
   BEST VALUATION — interactions
   Vanilla JS, no dependencies. Everything degrades gracefully without it.
   ========================================================================== */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Scroll work is throttled through requestAnimationFrame, which does not run
     while the tab is backgrounded. A scroll fired in that state would leave the
     "frame pending" flag stuck true and kill the handler for good — so anything
     rAF-gated registers a re-sync here, run when the page becomes visible. */
  var resync = [];
  function runResync() {
    if (document.visibilityState && document.visibilityState !== 'visible') return;
    resync.forEach(function (fn) { fn(); });
  }
  document.addEventListener('visibilitychange', runResync);
  window.addEventListener('pageshow', runResync);

  /* ---------- current year ---------------------------------------------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- sticky header, reading progress, hero parallax -------------- */
  var header = $('#header');
  var toTop = $('.totop');
  var progress = $('[data-progress]');
  var heroVisual = $('.hero__visual');
  var wideMQ = window.matchMedia('(min-width: 1081px)');

  function onScroll() {
    var doc = document.documentElement;
    var y = window.scrollY || doc.scrollTop;
    if (header) header.classList.toggle('is-stuck', y > 8);
    if (toTop) toTop.classList.toggle('is-on', y > 600);

    if (progress) {
      var max = doc.scrollHeight - window.innerHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0).toFixed(4) + ')';
    }

    /* The certificate drifts slightly slower than the page. Capped at 46px so
       it never detaches from the hero, and skipped once the layout stacks. */
    if (heroVisual && !reduced && wideMQ.matches) {
      heroVisual.style.setProperty('--py', Math.min(y * 0.08, 46).toFixed(1) + 'px');
    }
  }

  /* One write per frame — scroll fires far more often than the screen paints. */
  var scrollTick = false;
  window.addEventListener('scroll', function () {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(function () { onScroll(); scrollTick = false; });
  }, { passive: true });
  onScroll();
  resync.push(function () { scrollTick = false; onScroll(); });

  if (wideMQ.addEventListener) {
    wideMQ.addEventListener('change', function (e) {
      if (!e.matches && heroVisual) heroVisual.style.removeProperty('--py');
    });
  }

  /* ---------- mobile drawer ---------------------------------------------- */
  var burger = $('.burger');
  var drawer = $('#mobile-nav');
  var scrim = null;

  function openDrawer() {
    if (!drawer) return;
    drawer.removeAttribute('hidden');
    scrim = document.createElement('div');
    scrim.className = 'scrim';
    document.body.appendChild(scrim);
    requestAnimationFrame(function () {
      scrim.classList.add('is-on');
      drawer.classList.add('is-open');
    });
    scrim.addEventListener('click', closeDrawer);

    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('body-lock');

    var first = drawer.querySelector('a, button');
    if (first) first.focus();
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('body-lock');
    if (scrim) {
      scrim.classList.remove('is-on');
      var s = scrim;
      setTimeout(function () { if (s && s.parentNode) s.parentNode.removeChild(s); }, 320);
      scrim = null;
    }
    setTimeout(function () {
      if (!drawer.classList.contains('is-open')) drawer.setAttribute('hidden', '');
    }, 380);
  }

  if (burger && drawer) {
    burger.addEventListener('click', function () {
      if (drawer.classList.contains('is-open')) closeDrawer(); else openDrawer();
    });
    var closeBtn = $('.drawer__close', drawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    $$('.drawer__link, .drawer__sub a', drawer).forEach(function (a) {
      a.addEventListener('click', closeDrawer);
    });
    $$('.drawer__toggle', drawer).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var group = btn.closest('.drawer__group');
        var open = group.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  /* Escape closes drawer and any open mega menu */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (drawer && drawer.classList.contains('is-open')) { closeDrawer(); burger.focus(); }
    if (document.activeElement && document.activeElement.closest('.nav__item--has-menu')) {
      document.activeElement.blur();
    }
  });

  /* Mega menu: expose state to assistive tech on hover/focus */
  $$('.nav__item--has-menu').forEach(function (item) {
    var trigger = $('.nav__link', item);
    var set = function (v) { if (trigger) trigger.setAttribute('aria-expanded', v); };
    item.addEventListener('mouseenter', function () { set('true'); });
    item.addEventListener('mouseleave', function () { set('false'); });
    item.addEventListener('focusin', function () { set('true'); });
    item.addEventListener('focusout', function (e) {
      if (!item.contains(e.relatedTarget)) set('false');
    });
  });

  /* ---------- reveal on scroll ------------------------------------------- */
  var revealables = $$('[data-reveal]');
  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); ro.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    revealables.forEach(function (el) { ro.observe(el); });

    /* Failsafe: if the observer is throttled (background tab, slow device,
       fast scroll), never leave content stranded at opacity 0. */
    var sweep = function () {
      var h = window.innerHeight;
      revealables.forEach(function (el) {
        if (el.classList.contains('is-in')) return;
        if (el.getBoundingClientRect().top < h * 0.96) {
          el.classList.add('is-in');
          ro.unobserve(el);
        }
      });
    };
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { sweep(); ticking = false; });
    }, { passive: true });
    window.addEventListener('load', sweep);
    setTimeout(sweep, 1200);
    resync.push(function () { ticking = false; sweep(); });
  }

  /* ---------- certificate gleam (once, on first sight) -------------------- */
  var cert = $('.cert');
  if (cert && !reduced) {
    if ('IntersectionObserver' in window) {
      var gleam = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add('is-lit');
          gleam.unobserve(en.target);
        });
      }, { threshold: 0.35 });
      gleam.observe(cert);
      resync.push(function () {
        if (cert.classList.contains('is-lit')) return;
        var b = cert.getBoundingClientRect();
        if (b.top < window.innerHeight * 0.8 && b.bottom > 0) cert.classList.add('is-lit');
      });
    } else {
      cert.classList.add('is-lit');
    }
  }

  /* ---------- animated counters ------------------------------------------ */
  var counters = $$('[data-count]');
  function runCount(el) {
    if (el.getAttribute('data-counted')) return;
    el.setAttribute('data-counted', '1');
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (reduced) { el.textContent = target.toLocaleString('en-US'); return; }
    var dur = 1600, t0 = null;
    function frame(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if (counters.length) {
    if (!('IntersectionObserver' in window)) {
      counters.forEach(runCount);
    } else {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { runCount(en.target); co.unobserve(en.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { co.observe(el); });
      /* Never leave the figures reading 0 if the observer was suspended. */
      resync.push(function () {
        counters.forEach(function (el) {
          var b = el.getBoundingClientRect();
          if (b.top < window.innerHeight && b.bottom > 0) { runCount(el); co.unobserve(el); }
        });
      });
    }
  }

  /* ---------- testimonial carousel (automatic slider) --------------------- */
  $$('[data-carousel]').forEach(function (car) {
    var track = $('[data-track]', car);
    var prev = $('[data-prev]', car);
    var next = $('[data-next]', car);
    if (!track) return;

    function step() {
      var card = track.querySelector('.tcard');
      if (!card) return 320;
      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 20;
      return card.getBoundingClientRect().width + gap;
    }

    function sync() {
      var max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
    }

    function slideNext() {
      var max = track.scrollWidth - track.clientWidth - 4;
      if (track.scrollLeft >= max) {
        track.scrollTo({ left: 0, behavior: reduced ? 'auto' : 'smooth' });
      } else {
        track.scrollBy({ left: step(), behavior: reduced ? 'auto' : 'smooth' });
      }
    }

    function slidePrev() {
      if (track.scrollLeft <= 4) {
        var max = track.scrollWidth - track.clientWidth;
        track.scrollTo({ left: max, behavior: reduced ? 'auto' : 'smooth' });
      } else {
        track.scrollBy({ left: -step(), behavior: reduced ? 'auto' : 'smooth' });
      }
    }

    if (prev) {
      prev.addEventListener('click', function () {
        slidePrev();
        resetAutoPlay();
      });
    }

    if (next) {
      next.addEventListener('click', function () {
        slideNext();
        resetAutoPlay();
      });
    }

    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); slideNext(); resetAutoPlay(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); slidePrev(); resetAutoPlay(); }
    });
    sync();

    /* Auto-play slider */
    var autoPlayTimer = null;
    var autoPlayInterval = 3800; // 3.8 seconds per slide

    function startAutoPlay() {
      if (reduced) return;
      stopAutoPlay();
      autoPlayTimer = setInterval(function () {
        slideNext();
      }, autoPlayInterval);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    // Pause on hover, touch, or keyboard focus
    car.addEventListener('mouseenter', stopAutoPlay);
    car.addEventListener('mouseleave', startAutoPlay);
    car.addEventListener('touchstart', stopAutoPlay, { passive: true });
    car.addEventListener('touchend', startAutoPlay, { passive: true });
    car.addEventListener('focusin', stopAutoPlay);
    car.addEventListener('focusout', startAutoPlay);

    // Start auto-play initially
    startAutoPlay();
  });

  /* ---------- contact form ----------------------------------------------- */
  var form = $('#quote-form');
  if (form) {
    /* Pre-select the service when arriving from a service page CTA */
    var wanted = new URLSearchParams(window.location.search).get('service');
    var select = $('#f-service', form);
    if (wanted && select) {
      var match = Array.prototype.find.call(select.options, function (o) { return o.value === wanted; });
      if (match) select.value = wanted;
    }

    var status = $('.cform__status', form);

    var rules = {
      'f-name':    function (v) { return v.trim().length >= 2 || 'Please enter your name.'; },
      'f-phone':   function (v) { return /^[+\d][\d\s\-()]{8,}$/.test(v.trim()) || 'Please enter a valid phone number.'; },
      'f-email':   function (v) { return v.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Please enter a valid email address.'; },
      'f-service': function (v) { return v !== '' || 'Please choose the valuation you need.'; },
      'f-message': function (v) { return v.trim().length >= 10 || 'Please describe the asset in a little more detail.'; }
    };

    function setError(field, msg) {
      var wrap = field.closest('.field');
      var out = form.querySelector('[data-error-for="' + field.id + '"]');
      if (msg) {
        wrap.classList.add('has-error');
        field.setAttribute('aria-invalid', 'true');
        if (out) out.textContent = msg;
      } else {
        wrap.classList.remove('has-error');
        field.removeAttribute('aria-invalid');
        if (out) out.textContent = '';
      }
    }

    function validateField(field) {
      var rule = rules[field.id];
      if (field.id === 'f-consent') {
        var ok = field.checked;
        setError(field, ok ? null : 'Please tick this box so we can reply to you.');
        return ok;
      }
      if (!rule) return true;
      var res = rule(field.value);
      setError(field, res === true ? null : res);
      return res === true;
    }

    $$('input, select, textarea', form).forEach(function (f) {
      f.addEventListener('blur', function () { if (f.value || f.required) validateField(f); });
      f.addEventListener('input', function () {
        if (f.closest('.field').classList.contains('has-error')) validateField(f);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = $$('input, select, textarea', form).filter(function (f) { return rules[f.id] || f.id === 'f-consent'; });
      var firstBad = null;
      fields.forEach(function (f) { if (!validateField(f) && !firstBad) firstBad = f; });

      if (firstBad) {
        firstBad.focus();
        status.className = 'cform__status is-error';
        status.textContent = 'Please correct the highlighted fields and try again.';
        return;
      }

      var data = {
        name:    $('#f-name').value.trim(),
        phone:   $('#f-phone').value.trim(),
        email:   $('#f-email').value.trim(),
        city:    $('#f-city').value.trim(),
        service: $('#f-service').options[$('#f-service').selectedIndex].text,
        purpose: $('#f-purpose').value,
        message: $('#f-message').value.trim()
      };

      var lines = [
        'Valuation enquiry — Best Valuation',
        '',
        'Name: ' + data.name,
        'Phone: ' + data.phone,
        data.email ? 'Email: ' + data.email : '',
        data.city ? 'City: ' + data.city : '',
        'Service: ' + data.service,
        data.purpose ? 'Purpose: ' + data.purpose : '',
        '',
        'Details:',
        data.message
      ].filter(Boolean).join('\n');

      /* --------------------------------------------------------------------
         No backend on a static site, so the enquiry is handed to the
         visitor's own email or WhatsApp with everything pre-filled.

         TO WIRE UP A REAL FORM BACKEND (Formspree, Basin, your own API):
         add data-endpoint="https://…" to the <form> in contact.html and the
         branch below will POST the JSON instead.
      ---------------------------------------------------------------------*/
      var endpoint = form.getAttribute('data-endpoint');
      if (endpoint) {
        status.className = 'cform__status';
        status.textContent = 'Sending…';
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data)
        }).then(function (r) {
          if (!r.ok) throw new Error('bad response');
          form.reset();
          status.className = 'cform__status';
          status.textContent = 'Thank you — your enquiry has been sent. We will reply shortly with the fee and turnaround.';
        }).catch(function () {
          status.className = 'cform__status is-error';
          status.textContent = 'Something went wrong sending the form. Please call us on 0300-6878765 instead.';
        });
        return;
      }

      var subject = 'Valuation enquiry — ' + data.service;
      var mailto = 'mailto:the.experts.ho@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines);
      var wa = 'https://wa.me/923006878765?text=' + encodeURIComponent(lines);

      status.className = 'cform__status';
      status.innerHTML =
        '<strong>Almost there, ' + data.name.split(' ')[0].replace(/[<>&]/g, '') + '.</strong> ' +
        'Choose how to send your enquiry — everything you typed is already attached.' +
        '<span style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:.9rem">' +
        '<a class="btn btn--primary btn--sm" href="' + mailto + '">Send by email</a>' +
        '<a class="btn btn--outline btn--sm" href="' + wa + '" target="_blank" rel="noopener">Send on WhatsApp</a>' +
        '</span>';
      status.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    });
  }

  /* ---------- page loader (Pakistan Flag) --------------------------------- */
  var loader = $('#page-loader');
  if (loader) {
    var hideLoader = function () {
      loader.classList.add('is-loaded');
    };

    var showLoader = function () {
      loader.classList.remove('is-loaded');
    };

    // Smoothly reveal the page once loaded
    if (document.readyState === 'complete') {
      setTimeout(hideLoader, 180);
    } else {
      window.addEventListener('load', function () {
        setTimeout(hideLoader, 220);
      });
      // Safety failsafe: dismiss after 700ms max
      setTimeout(hideLoader, 700);
    }

    // Handle bfcache (browser back/forward button restores page)
    window.addEventListener('pageshow', function () {
      hideLoader();
    });

    // Intercept internal navigation clicks to trigger smooth flag loader transition
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (!link) return;
      var href = link.getAttribute('href');
      if (!href) return;

      // Ignore hash jumps, tel, mailto, javascript, external target, or modifier clicks
      if (
        href.charAt(0) === '#' ||
        href.indexOf('tel:') === 0 ||
        href.indexOf('mailto:') === 0 ||
        href.indexOf('javascript:') === 0 ||
        link.target === '_blank' ||
        link.getAttribute('rel') === 'noopener' ||
        e.ctrlKey || e.metaKey || e.shiftKey || e.altKey ||
        e.defaultPrevented
      ) {
        return;
      }

      var url;
      try {
        url = new URL(link.href, window.location.href);
      } catch (err) {
        return;
      }

      // Check if internal same-origin link
      if (url.origin === window.location.origin) {
        // If clicking link to the current page with same hash, don't trigger
        if (url.pathname === window.location.pathname && url.search === window.location.search && (!url.hash || url.hash === window.location.hash)) {
          return;
        }

        // Show Pakistan Flag transition screen
        showLoader();
      }
    });
  }
})();
