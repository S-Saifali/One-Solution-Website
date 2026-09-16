/* One Solution — site scripts */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '923218111108';

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Service detail explorer (tabs) ---------- */
  var tablist = document.querySelector('.explorer__tabs');

  if (tablist) {
    var tabs = [].slice.call(tablist.querySelectorAll('.etab'));

    function selectTab(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) {
        tab.focus();
        // keep the active chip in view on the mobile strip
        if (tab.scrollIntoView) {
          tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { selectTab(tab, false); });
    });

    tablist.addEventListener('keydown', function (e) {
      var i = tabs.indexOf(document.activeElement);
      if (i === -1) return;

      var next = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs[tabs.length - 1];

      if (next) {
        e.preventDefault();
        selectTab(next, true);
      }
    });
  }

  /* ---------- Booking form -> WhatsApp ---------- */
  var form = document.getElementById('bookForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var phoneInput = document.getElementById('f-phone');
      var phoneErr = document.getElementById('phoneErr');
      var phone = phoneInput.value.trim();

      if (phone.replace(/\D/g, '').length < 10) {
        phoneErr.hidden = false;
        phoneInput.focus();
        return;
      }
      phoneErr.hidden = true;

      var service = document.getElementById('f-service').value;
      var city = document.getElementById('f-city').value;
      var area = document.getElementById('f-area').value.trim();
      var problem = document.getElementById('f-problem').value.trim();
      var slotEl = form.querySelector('input[name="slot"]:checked');
      var slot = slotEl ? slotEl.value : 'Any time';

      var lines = [
        'Hi One Solution, I would like to book a technician.',
        '',
        'Service: ' + service,
        'City: ' + city + (area ? ' (' + area + ')' : ''),
        'Preferred time: ' + slot,
        'Phone: ' + phone
      ];

      if (problem) {
        lines.push('Problem: ' + problem);
      }

      var url = 'https://wa.me/' + WHATSAPP_NUMBER +
                '?text=' + encodeURIComponent(lines.join('\n'));

      window.open(url, '_blank', 'noopener');
    });
  }

  /* ---------- Footer year ---------- */
  var yr = document.getElementById('yr');
  if (yr) {
    yr.textContent = new Date().getFullYear();
  }
})();
