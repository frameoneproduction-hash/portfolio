(function () {
  'use strict';
  var frame = document.getElementById('mail');
  var wrap = document.getElementById('frameWrap');
  var groups = { hero: ['hero-image', 'hero-text'], it: ['image-text-left', 'image-text-right'], prod: ['products-3', 'products-2'] };
  var extras = ['coupon', 'quote', 'view-online'];
  var dark = false;

  var DARK_CSS =
    '.bg-page{background:#14120f !important}.bg-card{background:#1d1a16 !important}' +
    '.bg-soft{background:#26221d !important}.tx{color:#f1ebe2 !important}.tx-muted{color:#b9afa2 !important}';

  function doc() { try { return frame.contentDocument; } catch (e) { return null; } }

  function setModule(d, name, on) {
    var rows = d.querySelectorAll('[data-m="' + name + '"]');
    for (var i = 0; i < rows.length; i++) rows[i].style.display = on ? '' : 'none';
  }

  function apply() {
    var d = doc();
    if (!d || !d.body) return;
    Object.keys(groups).forEach(function (g) {
      var picked = document.querySelector('input[name="' + g + '"]:checked');
      var val = picked ? picked.value : '';
      groups[g].forEach(function (m) { setModule(d, m, m === val); });
    });
    extras.forEach(function (m) {
      var box = document.querySelector('input[name="extra"][value="' + m + '"]');
      setModule(d, m, box && box.checked);
    });
    var st = d.getElementById('demo-dark');
    if (dark && !st) {
      st = d.createElement('style'); st.id = 'demo-dark'; st.textContent = DARK_CSS; d.head.appendChild(st);
    } else if (!dark && st) { st.remove(); }
    resize();
  }

  function resize() {
    var d = doc();
    if (!d || !d.documentElement) return;
    frame.style.height = '200px';
    frame.style.height = (d.documentElement.scrollHeight + 4) + 'px';
  }

  document.querySelectorAll('.panel input').forEach(function (el) { el.addEventListener('change', apply); });

  function segment(attr, cb) {
    var btns = document.querySelectorAll('[data-' + attr + ']');
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.classList.remove('is-on'); x.setAttribute('aria-pressed', 'false'); });
        b.classList.add('is-on'); b.setAttribute('aria-pressed', 'true');
        cb(b.getAttribute('data-' + attr));
      });
    });
  }
  segment('w', function (v) {
    wrap.classList.toggle('is-mobile', v === 'mobile');
    setTimeout(resize, 300);
  });
  segment('c', function (v) { dark = v === 'dark'; apply(); });

  frame.addEventListener('load', function () {
    apply();
    var d = doc();
    if (d) d.querySelectorAll('img').forEach(function (im) { im.addEventListener('load', resize); });
  });
  window.addEventListener('resize', function () { clearTimeout(resize.t); resize.t = setTimeout(resize, 150); });
  if (doc() && doc().readyState === 'complete') apply();
})();
