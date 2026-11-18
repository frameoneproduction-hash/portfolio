/* Animacja produktu: jedna oś czasu 20 s, każda klatka liczona z czasu t (pauza i przewijanie działają dokładnie). */
(function () {
  'use strict';

  var DUR = 20;
  var BEAT = 7 / 12;               // ok. 103 BPM: atuty co 4 takty
  var $ = function (id) { return document.getElementById(id); };
  var stage = $('stage');

  /* ---------- easing ---------- */
  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function prog(t, a, b) { return clamp((t - a) / (b - a)); }
  function lerp(a, b, p) { return a + (b - a) * p; }
  var E = {
    outCubic: function (p) { return 1 - Math.pow(1 - p, 3); },
    inCubic: function (p) { return p * p * p; },
    inOutCubic: function (p) { return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; },
    outExpo: function (p) { return p >= 1 ? 1 : 1 - Math.pow(2, -10 * p); },
    outBack: function (p) { var c = 1.4, c3 = c + 1; return 1 + c3 * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); },
    inOutSine: function (p) { return -(Math.cos(Math.PI * p) - 1) / 2; }
  };
  function beatPulse(t, from) {
    if (t < from) return 0;
    return Math.exp(-((t - from) % BEAT) * 9);
  }

  /* linia tekstu wysuwana z maski */
  function line(el, t, tin, tout, ease, dur) {
    var y;
    if (t < tin) y = 115;
    else if (tout != null && t >= tout) y = -115 * E.inCubic(prog(t, tout, tout + 0.32));
    else y = 115 * (1 - (ease || E.outExpo)(prog(t, tin, tin + (dur || 0.6))));
    el.style.transform = 'translate3d(0,calc(' + y.toFixed(2) + '% + ' + (y / 115 * 4).toFixed(2) + 'cqw),0)';
  }
  function vis(el, on) { var v = on ? 'visible' : 'hidden'; if (el.style.visibility !== v) el.style.visibility = v; }

  /* ---------- elementy ---------- */
  var hook = $('hook'), phone = $('phone'), screen = $('screen'), dim = $('dim'), vbarFill = $('vbarFill');
  var shapes = Array.prototype.slice.call(document.querySelectorAll('#toon .sh'));
  var world = $('world'), fg = $('fg'), plane = $('plane'), pend = $('pend'), ropes = $('ropes');
  var swingPh = document.querySelector('.swing-ph');
  var shadow = $('shadow');
  var layers = Array.prototype.slice.call(document.querySelectorAll('#world .pl, #fg .pl')).map(function (el) {
    return { el: el, d: parseFloat(el.getAttribute('data-d')) || 1 };
  });
  var hk1 = $('hk1'), hk2 = $('hk2'), strike = $('strike'), gd1 = $('gd1'), gd2 = $('gd2');
  var fade = $('fade');

  var callouts = [
    { el: $('c1'), t0: 10.0, t1: 10 + 4 * BEAT, kb: { w: 1.0, cy: 0.36, fx: 0.42, fy: 0.56, s0: 1.5, s1: 1.8, r0: -3, r1: 1, dx: 3 } },
    { el: $('c2'), t0: 10 + 4 * BEAT, t1: 10 + 8 * BEAT, kb: { w: 1.0, cy: 0.38, fx: 0.79, fy: 0.42, s0: 1.75, s1: 1.95, r0: 1, r1: -1, dx: -2 } },
    { el: $('c3'), t0: 10 + 8 * BEAT, t1: 17.0, kb: { w: 1.0, cy: 0.37, fx: 0.62, fy: 0.62, s0: 1.25, s1: 1.5, r0: -1.5, r1: 1.5, dx: 2 } }
  ];
  callouts.forEach(function (c) {
    c.sheet = c.el.querySelector('.sheet');
    c.kbEl = c.el.querySelector('.kb');
    c.lines = Array.prototype.slice.call(c.el.querySelectorAll('.ctext .w'));
  });
  var num100 = $('num100'), gauge = $('gauge'), measure = $('measure'), drops = $('drops');
  var end = { el: $('end'), t0: 17.0, sheet: $('end').querySelector('.sheet') };
  var endSwing = $('endSwing'), stamp = $('stamp'), cta = $('cta'), ctaArrow = $('ctaArrow'), domain = $('domain');
  var eLines = [$('e1'), $('e2'), $('e3'), $('e4')];

  /* krople wody (atut 3) */
  var DROPS = [[0.34, 0.25, 4.0], [0.5, 0.22, 3.2], [0.62, 0.27, 4.4], [0.7, 0.35, 3.0], [0.46, 0.36, 3.8], [0.32, 0.33, 2.8], [0.56, 0.42, 3.4]];
  var dropEls = DROPS.map(function (d) {
    var i = document.createElement('i');
    i.style.width = (d[2] * 1.3) + 'cqw'; i.style.height = (d[2] * 1.45) + 'cqw';
    i.style.left = (d[0] * 100) + '%'; i.style.top = (d[1] * 100) + '%';
    drops.appendChild(i);
    return i;
  });

  /* pyłki w słońcu */
  var pollen = $('pollen');
  var seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  var motes = [];
  for (var m = 0; m < 12; m++) {
    var el = document.createElement('i');
    var s = 0.8 + rnd() * 2.2;
    el.style.width = el.style.height = s + 'cqw';
    el.style.left = (rnd() * 100) + '%';
    el.style.top = (14 + rnd() * 52) + '%';
    pollen.appendChild(el);
    motes.push({ el: el, ph: rnd() * 6.28, sp: 0.4 + rnd() * 0.6 });
  }

  /* trawa na pierwszym planie */
  (function () {
    var d = 'M-30 172 L-30 150';
    for (var x = -30; x < 122; x += 1.3) {
      var h = 3 + rnd() * 10, lean = (rnd() - 0.5) * 2.4;
      d += ' L' + (x + 0.65 + lean).toFixed(2) + ' ' + (150 - h).toFixed(2) + ' L' + (x + 1.3).toFixed(2) + ' 150';
    }
    d += ' L122 150 L122 172Z';
    $('blades').setAttribute('d', d);
  })();

  /* ---------- zastępczy rysunek, gdy zdjęcie się nie wczyta ---------- */
  var FALLBACK = '<svg class="fallback" viewBox="0 0 450 337" aria-hidden="true">' +
    '<g stroke="#222" stroke-width="4" stroke-linecap="round"><line x1="83" y1="0" x2="58" y2="192"/><line x1="215" y1="0" x2="240" y2="86"/><line x1="333" y1="0" x2="275" y2="243"/><line x1="413" y1="0" x2="422" y2="121"/></g>' +
    '<g transform="rotate(-19 240 168)"><ellipse cx="240" cy="168" rx="218" ry="70" fill="#1f6fd6"/><ellipse cx="240" cy="168" rx="178" ry="46" fill="#1b1b1b"/></g></svg>';
  var noteShown = false;
  function markFailed(ph) {
    if (ph.classList.contains('failed')) return;
    ph.classList.add('failed');
    ph.insertAdjacentHTML('beforeend', FALLBACK);
    if (!noteShown) { noteShown = true; $('imgNote').hidden = false; }
  }
  Array.prototype.forEach.call(document.querySelectorAll('.ph'), function (ph) {
    var img = ph.querySelector('img');
    if (!img) return;
    img.addEventListener('error', function () { markFailed(ph); });
    if (img.complete && !img.naturalWidth) markFailed(ph);
    img.addEventListener('load', function () { dirty = true; });
  });

  /* ---------- układ (px liczone z rozmiaru sceny) ---------- */
  var W = 0, H = 0, u = 1, L = {};
  // liny na zdjęciu: punkt wyjścia z górnej krawędzi (ułamek szerokości) i punkt zbiegu par lin
  // (ułamki szerokości/wysokości zdjęcia, zmierzone na zdjęciu 1)
  var ROPE_TOP = [0.19, 0.479, 0.712, 0.917];
  var JOIN = [[0.301, -0.881], [0.869, -1.089]];
  function layout() {
    W = stage.clientWidth; H = stage.clientHeight; u = W / 90;
    // telefon
    L.pw = 0.56 * W; L.ph = L.pw * 2.05; L.pcx = 0.5 * W; L.pcy = 0.6 * H;
    L.b = 0.024 * W; L.pr = 0.085 * W;
    phone.style.left = (L.pcx - L.pw / 2) + 'px'; phone.style.top = (L.pcy - L.ph / 2) + 'px';
    phone.style.width = L.pw + 'px'; phone.style.height = L.ph + 'px'; phone.style.borderRadius = L.pr + 'px';
    screen.style.left = screen.style.top = L.b + 'px';
    screen.style.width = (L.pw - 2 * L.b) + 'px'; screen.style.height = (L.ph - 2 * L.b) + 'px';
    screen.style.borderRadius = (L.pr - L.b) + 'px';
    // huśtawka
    L.sw = 0.72 * W; L.sh = L.sw * 337 / 450; L.il = 0.15 * W; L.it = 0.42 * H;
    L.icx = L.il + L.sw * 0.5; L.icy = L.it + L.sh * 0.5;
    L.py = 10.7 * u;
    var j1 = [L.il + JOIN[0][0] * L.sw, L.it + JOIN[0][1] * L.sh];
    var j2 = [L.il + JOIN[1][0] * L.sw, L.it + JOIN[1][1] * L.sh];
    L.px = (j1[0] + j2[0]) / 2;
    swingPh.style.left = L.il + 'px'; swingPh.style.top = L.it + 'px'; swingPh.style.width = L.sw + 'px';
    pend.style.transformOrigin = L.px + 'px ' + L.py + 'px';
    plane.style.transformOrigin = (W / 2) + 'px ' + (H / 2) + 'px';
    L.ropeLen = (L.it + L.sh * 0.55 - L.py) / u;   // w jednostkach sceny (do cienia)
    L.shX = (L.il + L.sw * 0.5) / u;
    // liny: przedłużenie lin ze zdjęcia do kółek, dalej pas do gałęzi
    var top = L.it + 0.5, rw = (0.75 * u).toFixed(2), html = '';
    ROPE_TOP.forEach(function (f, i) {
      var jn = i < 2 ? j1 : j2;
      html += '<line x1="' + (L.il + f * L.sw).toFixed(1) + '" y1="' + top.toFixed(1) + '" x2="' + jn[0].toFixed(1) + '" y2="' + jn[1].toFixed(1) + '" stroke-width="' + rw + '"/>';
    });
    [j1, j2].forEach(function (jn) {
      html += '<line x1="' + jn[0].toFixed(1) + '" y1="' + jn[1].toFixed(1) + '" x2="' + jn[0].toFixed(1) + '" y2="' + (L.py - 1.2 * u).toFixed(1) + '" stroke-width="' + (0.9 * u).toFixed(2) + '"/>';
      html += '<circle cx="' + jn[0].toFixed(1) + '" cy="' + jn[1].toFixed(1) + '" r="' + (0.9 * u).toFixed(2) + '" fill="none" stroke="#6b665d" stroke-width="' + (0.45 * u).toFixed(2) + '"/>';
      html += '<rect x="' + (jn[0] - 0.9 * u).toFixed(1) + '" y="' + (L.py - 2.6 * u).toFixed(1) + '" width="' + (1.8 * u).toFixed(1) + '" height="' + (3 * u).toFixed(1) + '" rx="' + (0.4 * u).toFixed(1) + '"/>';
    });
    ropes.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    ropes.innerHTML = html;
    // Ken Burns: punkt ostrości na środku kadru
    callouts.forEach(function (c) {
      var k = c.kb, w = k.w * W, h = w * 337 / 450;
      c.kbEl.style.width = w + 'px';
      c.kbEl.style.left = (0.5 * W - k.fx * w) + 'px';
      c.kbEl.style.top = (k.cy * H - k.fy * h) + 'px';
      c.kbEl.style.transformOrigin = (k.fx * 100) + '% ' + (k.fy * 100) + '%';
    });
    var ew = 0.94 * W;
    endSwing.style.width = ew + 'px'; endSwing.style.left = (0.5 * W - ew / 2) + 'px'; endSwing.style.top = (0.115 * H) + 'px';
    dirty = true;
  }

  /* ---------- render(t) ---------- */
  function cam(t) {
    var p = E.inOutSine(prog(t, 2, 10));
    return { x: lerp(2.4, -2.4, p) * u, y: lerp(0.5, -2.6, p) * u, z: lerp(1, 1.12, p) };
  }

  var lastCount = -1;
  function render(t) {
    /* --- 1. hak 0–2 s --- */
    var hookOn = t < 2.05;
    vis(hook, hookOn);
    var phoneS = 1;
    if (hookOn) {
      var te = t < 0.85 ? t : 0.85 + (t - 0.85) * 0.2;         // bajka zwalnia, gdy ekran gaśnie
      var pop = E.outBack(prog(t, 0, 0.35));
      phoneS = lerp(0.93, 1, pop) + 3.4 * E.inCubic(prog(t, 1.42, 1.98));
      phone.style.transform = 'scale(' + phoneS.toFixed(4) + ')';
      phone.style.opacity = 1 - prog(t, 1.88, 2.02);
      shapes.forEach(function (sh, i) {
        var k = i + 1, a = te * (5 + k * 0.9) + k;
        var x = Math.sin(a) * (6 + k), y = Math.abs(Math.sin(a * 1.3)) * -(10 + k * 2), r = Math.sin(a * 0.7) * 25;
        sh.style.transform = 'translate(' + x.toFixed(2) + '%,' + y.toFixed(2) + '%) rotate(' + (i === 6 ? 45 + r : r).toFixed(1) + 'deg) scale(' + (1 + 0.08 * Math.sin(a * 2)).toFixed(3) + ')';
      });
      vbarFill.style.width = (38 + te * 9) + '%';
      dim.style.opacity = E.inOutCubic(prog(t, 0.85, 1.22)).toFixed(3);
    }

    /* --- napis haka --- */
    line(hk1, t, 0.9, 2.3, E.outBack, 0.5);
    line(hk2, t, 1.08, 2.38, E.outBack, 0.5);
    strike.style.transform = 'scaleX(' + E.outExpo(prog(t, 1.28, 1.62)).toFixed(3) + ')';

    /* --- 2. ogród 2–10 s --- */
    var gardenOn = t >= 1.32 && t < 10.45;
    vis(world, gardenOn); vis(fg, gardenOn); vis(plane, t >= 1.36 && t < 10.45);
    if (gardenOn) {
      var c = cam(t);
      var wz = 1 + 0.16 * (1 - E.outCubic(prog(t, 1.32, 2.3)));   // „przelot” przez ekran
      for (var i = 0; i < layers.length; i++) {
        var d = layers[i].d;
        layers[i].el.style.transform = 'translate3d(' + (c.x * d).toFixed(2) + 'px,' + (c.y * d).toFixed(2) + 'px,0) scale(' + ((1 + (c.z - 1) * d) * wz).toFixed(4) + ')';
      }
      // okno ekranu telefonu rośnie do pełnej sceny
      var clip = 'none';
      if (t < 2.0) {
        var hw = (L.pw / 2 - L.b) * phoneS, hh = (L.ph / 2 - L.b) * phoneS;
        var top = Math.max(0, L.pcy - hh), bot = Math.max(0, H - (L.pcy + hh));
        var lft = Math.max(0, L.pcx - hw), rgt = Math.max(0, W - (L.pcx + hw));
        if (top + bot + lft + rgt > 0.5) clip = 'inset(' + top.toFixed(1) + 'px ' + rgt.toFixed(1) + 'px ' + bot.toFixed(1) + 'px ' + lft.toFixed(1) + 'px round ' + ((L.pr - L.b) * phoneS).toFixed(1) + 'px)';
      }
      world.style.clipPath = fg.style.clipPath = clip;
      world.style.webkitClipPath = fg.style.webkitClipPath = clip;
      var on = E.outCubic(prog(t, 1.32, 1.56));
      world.style.opacity = fg.style.opacity = on.toFixed(3);

      // wahadło
      var ang = 0;
      if (t >= 1.38) {
        var A = 6 * Math.min(1, 0.3 + (t - 1.38) / 1.1);
        ang = A * Math.sin(2 * Math.PI * (t - 1.38) / 2.7);
      }
      pend.style.transform = 'rotate(' + ang.toFixed(3) + 'deg)';
      // wylot z telefonu: od środka ekranu do pozycji w ogrodzie
      var hp = E.inOutCubic(prog(t, 1.38, 2.0));
      var hs = lerp(0.3, 1, hp) * (1 + 0.07 * Math.sin(Math.PI * prog(t, 1.85, 2.5)));
      var hx = lerp(L.pcx - L.icx, 0, hp), hy = lerp(L.pcy - L.icy, 0, hp);
      var ox = L.icx - W / 2, oy = L.icy - H / 2;
      plane.style.transform = 'translate3d(' + c.x.toFixed(2) + 'px,' + c.y.toFixed(2) + 'px,0) scale(' + c.z.toFixed(4) + ') translate(' + hx.toFixed(2) + 'px,' + hy.toFixed(2) + 'px) translate(' + ox.toFixed(2) + 'px,' + oy.toFixed(2) + 'px) scale(' + hs.toFixed(4) + ') translate(' + (-ox).toFixed(2) + 'px,' + (-oy).toFixed(2) + 'px)';
      plane.style.opacity = E.outCubic(prog(t, 1.36, 1.56)).toFixed(3);
      ropes.style.opacity = prog(t, 1.8, 2.02).toFixed(3);
      // cień na trawie przesuwa się z huśtawką
      var sx = Math.sin(ang * Math.PI / 180) * L.ropeLen * 0.9;
      shadow.setAttribute('cx', (L.shX + sx).toFixed(2));
      shadow.setAttribute('rx', (22 * (1 - 0.08 * Math.abs(Math.sin(ang * Math.PI / 90)))).toFixed(2));
      shadow.setAttribute('opacity', (0.3 * prog(t, 1.8, 2.2)).toFixed(3));
      // pyłki
      for (var mi = 0; mi < motes.length; mi++) {
        var mo = motes[mi], ph = t * mo.sp + mo.ph;
        mo.el.style.transform = 'translate(' + (Math.sin(ph) * 6).toFixed(2) + 'cqw,' + (Math.cos(ph * 0.8) * 4 - t * 0.6).toFixed(2) + 'cqw)';
        mo.el.style.opacity = (0.55 + 0.45 * Math.sin(ph * 1.7)).toFixed(2);
      }
    }
    line(gd1, t, 2.75, 9.55, E.outExpo, 0.7);
    line(gd2, t, 2.85, 9.62, E.outExpo, 0.8);

    /* --- 3. atuty 10–17 s --- */
    callouts.forEach(function (cl, idx) {
      var on = t >= cl.t0 - 0.14 && t < cl.t1 + 0.5;
      vis(cl.el, on);
      if (!on) return;
      wipe(cl, t, cl.t0);
      var k = cl.kb, kp = prog(t, cl.t0 - 0.14, cl.t1 + 0.5), ke = E.inOutSine(kp);
      cl.kbEl.style.transform = 'translate3d(' + (k.dx * ke).toFixed(2) + 'cqw,0,0) rotate(' + lerp(k.r0, k.r1, ke).toFixed(2) + 'deg) scale(' + lerp(k.s0, k.s1, E.outCubic(kp)).toFixed(4) + ')';
      var pulse = beatPulse(t, cl.t0);
      if (idx === 0) {
        line(cl.lines[0], t, cl.t0 + 0.06, null, E.outExpo, 0.5);
        line(cl.lines[1], t, cl.t0 + 0.12, null, E.outBack, 0.55);
        line(cl.lines[2], t, cl.t0 + 0.5, null, E.outExpo, 0.6);
        var n = Math.round(100 * E.outExpo(prog(t, cl.t0 + 0.14, cl.t0 + 1.0)));
        if (n !== lastCount) { num100.textContent = String(n); lastCount = n; }
        num100.style.transform = 'scale(' + (1 + 0.035 * pulse).toFixed(4) + ')';
        num100.style.transformOrigin = '0 80%';
        gauge.style.width = (100 * E.outCubic(prog(t, cl.t0 + 0.2, cl.t0 + 1.1))).toFixed(2) + '%';
      } else if (idx === 1) {
        line(cl.lines[0], t, cl.t0 + 0.06, null, E.outExpo, 0.5);
        line(cl.lines[1], t, cl.t0 + 0.14, null, E.outBack, 0.55);
        cl.lines[1].style.transform += ' scale(' + (1 + 0.03 * pulse).toFixed(4) + ')';
        measure.style.transform = 'scaleX(' + E.inOutCubic(prog(t, cl.t0 + 0.32, cl.t0 + 1.0)).toFixed(4) + ')';
      } else {
        line(cl.lines[0], t, cl.t0 + 0.08, null, E.outBack, 0.55);
        line(cl.lines[1], t, cl.t0 + 0.2, null, E.outBack, 0.55);
        cl.lines[1].style.transform += ' scale(' + (1 + 0.03 * pulse).toFixed(4) + ')';
        dropEls.forEach(function (de, di) {
          var st = cl.t0 + 0.15 + di * 0.2, fp = prog(t, st, st + 0.42);
          var y = lerp(-28, 0, E.inCubic(fp)) + 3 * prog(t, st + 0.42, cl.t1 + 0.5);
          var land = prog(t, st + 0.42, st + 0.7);
          var sq = fp >= 1 ? 1 - 0.22 * Math.sin(Math.PI * land) : 1;
          de.style.transform = 'translate3d(0,' + y.toFixed(2) + 'cqw,0) scale(' + (2 - sq).toFixed(3) + ',' + sq.toFixed(3) + ')';
          de.style.opacity = prog(t, st, st + 0.15).toFixed(3);
        });
      }
    });

    /* --- 4. plansza końcowa 17–20 s --- */
    var endOn = t >= end.t0 - 0.14;
    vis(end.el, endOn);
    if (endOn) {
      wipe(end, t, end.t0);
      var ep = E.outCubic(prog(t, end.t0, end.t0 + 0.9));
      var swingA = 3.2 * Math.sin(2 * Math.PI * (t - end.t0) / 2.6);
      endSwing.style.transform = 'translate3d(0,' + (lerp(6, 0, ep) + Math.sin((t - end.t0) * 2) * 0.6).toFixed(2) + 'cqw,0) rotate(' + swingA.toFixed(3) + 'deg) scale(' + lerp(1.18, 1, ep).toFixed(4) + ')';
      var stS = E.outBack(prog(t, end.t0 + 0.35, end.t0 + 0.85));
      stamp.style.transform = 'rotate(' + ((t - end.t0) * 40).toFixed(2) + 'deg) scale(' + stS.toFixed(4) + ')';
      line(eLines[0], t, end.t0 + 0.2, null, E.outExpo, 0.6);
      line(eLines[1], t, end.t0 + 0.28, null, E.outBack, 0.6);
      line(eLines[2], t, end.t0 + 0.36, null, E.outBack, 0.6);
      line(eLines[3], t, end.t0 + 0.7, null, E.outExpo, 0.7);
      var cp = E.outBack(prog(t, end.t0 + 0.85, end.t0 + 1.35));
      var press = 1 - 0.06 * Math.sin(Math.PI * prog(t, 18.75, 19.0));
      cta.style.transform = 'translate3d(0,' + lerp(14, 0, cp).toFixed(2) + 'cqw,0) scale(' + press.toFixed(4) + ')';
      cta.style.opacity = prog(t, end.t0 + 0.85, end.t0 + 1.05).toFixed(3);
      ctaArrow.style.transform = 'translateX(' + (1.2 * beatPulse(t, end.t0)).toFixed(3) + 'cqw)';
      domain.style.opacity = prog(t, end.t0 + 1.1, end.t0 + 1.5).toFixed(3);
    }

    /* --- pętla: miękkie wyciszenie na końcu i na starcie --- */
    var f = Math.max(E.inOutCubic(prog(t, 19.5, 20)), 1 - prog(t, 0, 0.18));
    fade.style.opacity = f.toFixed(3);
  }

  /* kurtyna w kolorze akcentu, potem treść – „na bit” */
  function wipe(o, t, t0) {
    var e = E.outExpo(prog(t, t0 - 0.14, t0 + 0.32));
    var c = e >= 1 ? 'none' : 'inset(' + ((1 - e) * 100).toFixed(2) + '% 0 0 0)';
    o.el.style.clipPath = o.el.style.webkitClipPath = c;
    var s = E.inOutCubic(prog(t, t0 + 0.02, t0 + 0.36));
    o.sheet.style.transform = 'translate3d(0,' + (-s * 100).toFixed(2) + '%,0)';
  }

  /* ---------- odtwarzanie ---------- */
  var t = 0, playing = true, last = null, dirty = true;
  var playBtn = $('play'), fill = $('fill'), timeEl = $('time'), progress = $('progress');
  function fmt(s) { s = Math.floor(s); return '0:' + (s < 10 ? '0' : '') + s; }
  var lastSec = -1;
  function ui() {
    fill.style.width = (t / DUR * 100).toFixed(3) + '%';
    var sec = Math.floor(t);
    if (sec !== lastSec) { lastSec = sec; timeEl.textContent = fmt(t) + ' / 0:20'; progress.setAttribute('aria-valuenow', String(sec)); }
  }
  function frame(now) {
    if (last == null) last = now;
    var dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    if (playing) { t += dt; if (t >= DUR) t -= DUR; dirty = true; }
    if (dirty) { render(t); ui(); dirty = false; }
    requestAnimationFrame(frame);
  }
  function setPlaying(p) {
    playing = p;
    playBtn.textContent = p ? 'Pauza' : 'Odtwórz';
    playBtn.setAttribute('aria-pressed', String(!p));
  }
  function seek(s) { t = Math.max(0, Math.min(DUR - 0.001, s)); render(t); ui(); dirty = false; }
  playBtn.addEventListener('click', function () { setPlaying(!playing); });
  $('replay').addEventListener('click', function () { seek(0); setPlaying(true); });
  function seekFromEvent(e) {
    var r = progress.getBoundingClientRect();
    seek((e.clientX - r.left) / r.width * DUR);
  }
  var dragging = false;
  progress.addEventListener('pointerdown', function (e) { dragging = true; progress.setPointerCapture(e.pointerId); seekFromEvent(e); });
  progress.addEventListener('pointermove', function (e) { if (dragging) seekFromEvent(e); });
  progress.addEventListener('pointerup', function () { dragging = false; });
  progress.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { seek(t + 0.5); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { seek(t - 0.5); e.preventDefault(); }
  });
  stage.addEventListener('click', function () { setPlaying(!playing); });
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' && e.target === document.body) { setPlaying(!playing); e.preventDefault(); }
  });

  if (window.ResizeObserver) new ResizeObserver(layout).observe(stage);
  else window.addEventListener('resize', layout);
  layout();
  requestAnimationFrame(frame);

  // do podglądu klatek: demo.seek(5); demo.pause()
  window.demo = { seek: function (s) { seek(s); }, pause: function () { setPlaying(false); }, play: function () { setPlaying(true); } };
})();
