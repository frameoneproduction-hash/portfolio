/*
 * Tarvio — logika konfiguratora: stan, układ konstrukcji, cena, formularz.
 * Zależności: ceny.js (cennik), scena.js (model 3D), pdf.js (podsumowanie PDF).
 */
(function () {
  'use strict';

  var C = window.TARVIO_CENY;
  var DEG = Math.PI / 180;
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  /* ---------- formatowanie ---------- */
  var nf0 = new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 0 });
  function zl(v) { return nf0.format(Math.round(v)) + ' zł'; }
  function m1(v) { return v.toLocaleString('pl-PL', { minimumFractionDigits: 1, maximumFractionDigits: 1 }); }
  function m2(v) { return v.toLocaleString('pl-PL', { minimumFractionDigits: 0, maximumFractionDigits: 2 }); }
  function plural(n, one, few, many) {
    if (n === 1) return one;
    var d = n % 10, dd = n % 100;
    return (d >= 2 && d <= 4 && (dd < 12 || dd > 14)) ? few : many;
  }
  function round1(v) { return Math.round(v * 10) / 10; }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }

  /* ---------- stan ---------- */
  var DIM = { w: C.wymiary.szerokosc, d: C.wymiary.wysieg, h: C.wymiary.wysokosc };
  var S = {
    w: DIM.w.domyslna, d: DIM.d.domyslna, h: DIM.h.domyslna,
    dach: 'szklo', ral: '7016', kat: 45,
    rolety: { lewa: false, prawa: false, przod: false }, rozwiniecie: 70,
    led: true, barwa: 'ciepla', montaz: true, noc: false
  };
  function ralObj(kod) { return C.ral.filter(function (r) { return r.kod === kod; })[0] || C.ral[0]; }

  /* odczyt konfiguracji z adresu (#w=5&d=3.5&…) — do udostępniania linku */
  function readHash() {
    var h = location.hash.replace(/^#/, '');
    if (!h) return;
    var p = {};
    h.split('&').forEach(function (kv) { var a = kv.split('='); if (a[0]) p[a[0]] = decodeURIComponent(a[1] || ''); });
    function num(k, lim) { var v = parseFloat(p[k]); if (!isNaN(v)) S[k] = round1(clamp(v, lim.min, lim.max)); }
    num('w', DIM.w); num('d', DIM.d); num('h', DIM.h);
    if (C.pokrycia[p.dach]) S.dach = p.dach;
    if (p.ral && C.ral.some(function (r) { return r.kod === p.ral; })) S.ral = p.ral;
    if (p.kat !== undefined && !isNaN(+p.kat)) S.kat = clamp(Math.round(+p.kat / 5) * 5, 0, 135);
    if (p.rol !== undefined) {
      S.rolety.lewa = p.rol.indexOf('l') >= 0; S.rolety.prawa = p.rol.indexOf('p') >= 0; S.rolety.przod = p.rol.indexOf('f') >= 0;
    }
    if (p.roz !== undefined && !isNaN(+p.roz)) S.rozwiniecie = clamp(Math.round(+p.roz / 5) * 5, 0, 100);
    if (p.led !== undefined) S.led = p.led === '1';
    if (p.barwa === 'neutralna' || p.barwa === 'ciepla') S.barwa = p.barwa;
    if (p.mont !== undefined) S.montaz = p.mont === '1';
    if (p.noc !== undefined) S.noc = p.noc === '1';
  }
  function hashString() {
    var rol = (S.rolety.lewa ? 'l' : '') + (S.rolety.prawa ? 'p' : '') + (S.rolety.przod ? 'f' : '');
    return '#w=' + S.w.toFixed(1) + '&d=' + S.d.toFixed(1) + '&h=' + S.h.toFixed(1) + '&dach=' + S.dach +
      '&ral=' + S.ral + '&kat=' + S.kat + '&rol=' + (rol || '-') + '&roz=' + S.rozwiniecie +
      '&led=' + (S.led ? 1 : 0) + '&barwa=' + S.barwa + '&mont=' + (S.montaz ? 1 : 0) + (S.noc ? '&noc=1' : '');
  }

  /* ---------- układ konstrukcji (wspólny dla sceny i ceny) ---------- */
  function uklad(s) {
    var K = C.konstrukcja;
    var flat = s.dach === 'lamele';
    var P = flat ? 0.15 : 0.11;
    var nS = Math.max(2, Math.ceil(s.w / K.maxRozstawSlupow - 1e-6) + 1);
    var slupyX = [];
    for (var i = 0; i < nS; i++) slupyX.push(-s.w / 2 + P / 2 + i * (s.w - P) / (nS - 1));
    var wznios = flat ? 0 : s.d * Math.tan(K.spadekStopnie * DEG);
    var krokwieX = [];
    if (!flat) {
      var nK = Math.ceil(s.w / C.pokrycia[s.dach].maxRozstawKrokwi - 1e-6) + 1;
      for (var k = 0; k < nK; k++) krokwieX.push(-s.w / 2 + 0.03 + k * (s.w - 0.06) / (nK - 1));
    }
    var ledMb = flat ? 2 * (s.w - 0.4) + nS * (s.d - 0.5) : Math.max(0, krokwieX.length - 2) * (Math.hypot(s.d, wznios) - 0.25);
    return {
      slupy: nS, slupyX: slupyX, krokwie: krokwieX.length, krokwieX: krokwieX,
      pola: nS - 1, wznios: wznios, ledMb: Math.ceil(ledMb * 10) / 10
    };
  }

  /* ---------- cena ---------- */
  function oblicz(s, u) {
    var poz = [];
    var pk = C.pokrycia[s.dach];
    var area = Math.round(s.w * s.d * 100) / 100;
    var bazowa = Math.round(area * pk.cenaM2);
    poz.push({ nazwa: 'Zadaszenie — ' + pk.krotko.toLowerCase(), opis: m2(area) + ' m² × ' + zl(pk.cenaM2), kwota: bazowa });
    var konstr = bazowa;

    var extra = Math.max(0, u.slupy - C.konstrukcja.slupyWCenie);
    if (extra) {
      var ks = extra * C.dodatkowySlup;
      poz.push({ nazwa: 'Dodatkowy słup', opis: extra + ' × ' + zl(C.dodatkowySlup), kwota: ks });
      konstr += ks;
    }
    var dw = C.doplataWysokosc;
    if (s.h > dw.powyzej + 1e-6) {
      var kroki = Math.ceil((s.h - dw.powyzej) / 0.1 - 1e-6);
      var kw = kroki * u.slupy * dw.za10cmNaSlup;
      poz.push({ nazwa: 'Dopłata za wysokość', opis: (kroki * 10) + ' cm × ' + u.slupy + ' ' + plural(u.slupy, 'słup', 'słupy', 'słupów') + ' × ' + zl(dw.za10cmNaSlup) + '/10 cm', kwota: kw });
      konstr += kw;
    }
    if (pk.napedLamel) {
      poz.push({ nazwa: 'Napęd lamel', opis: 'silnik z pilotem', kwota: pk.napedLamel });
      konstr += pk.napedLamel;
    }
    var r = ralObj(s.ral);
    if (!r.standard) {
      poz.push({ nazwa: 'Kolor niestandardowy RAL ' + r.kod, opis: '+' + C.doplataRalProcent + '% wartości konstrukcji', kwota: Math.round(konstr * C.doplataRalProcent / 100) });
    }
    var mbRol = (s.rolety.lewa ? s.d : 0) + (s.rolety.prawa ? s.d : 0) + (s.rolety.przod ? s.w : 0);
    if (mbRol > 0) {
      poz.push({ nazwa: 'Rolety ZIP (' + stronyRolet(s) + ')', opis: m1(mbRol) + ' mb × ' + zl(C.rolety.cenaMb), kwota: Math.round(mbRol * C.rolety.cenaMb) });
    }
    if (s.led) {
      poz.push({ nazwa: 'Oświetlenie LED', opis: m1(u.ledMb) + ' mb × ' + zl(C.led.cenaMb) + ' + zasilacz ' + zl(C.led.zasilacz), kwota: Math.round(u.ledMb * C.led.cenaMb + C.led.zasilacz) });
    }
    if (s.montaz) {
      var mk = Math.max(C.montaz.minimum, Math.round(area * C.montaz.cenaM2));
      poz.push({ nazwa: 'Montaż i transport', opis: area * C.montaz.cenaM2 < C.montaz.minimum ? 'kwota minimalna' : m2(area) + ' m² × ' + zl(C.montaz.cenaM2), kwota: mk });
    }
    var netto = poz.reduce(function (a, p) { return a + p.kwota; }, 0);
    var vat = Math.round(netto * C.vat);
    return { pozycje: poz, netto: netto, vat: vat, brutto: netto + vat, area: area };
  }
  function stronyRolet(s) {
    var a = [];
    if (s.rolety.lewa) a.push('lewa'); if (s.rolety.prawa) a.push('prawa'); if (s.rolety.przod) a.push('przód');
    return a.join(', ');
  }

  /* ---------- budowa kontrolek ---------- */
  var ICONS = {
    poliweglan: '<svg viewBox="0 0 96 40" aria-hidden="true"><path d="M8 14 88 6v8L8 22Z" fill="#e9eeee" stroke="#8b9699" stroke-width="1.5"/><path d="M20 12.8v8M32 11.6v8M44 10.4v8M56 9.2v8M68 8v8M80 6.8v8" stroke="#b7c2c4" stroke-width="1.2"/><path d="M14 22v16M82 15v23" stroke="#5a6168" stroke-width="3" stroke-linecap="round"/></svg>',
    szklo: '<svg viewBox="0 0 96 40" aria-hidden="true"><path d="M8 14 88 6v8L8 22Z" fill="#d6ecec" fill-opacity=".7" stroke="#6f9a9a" stroke-width="1.5"/><path d="M30 18.5 40 9.5M44 17 51 9" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M14 22v16M82 15v23" stroke="#5a6168" stroke-width="3" stroke-linecap="round"/></svg>',
    lamele: '<svg viewBox="0 0 96 40" aria-hidden="true"><path d="M8 9h80M8 17h80" stroke="#5a6168" stroke-width="2"/><path d="M14 16l6-6M24 16l6-6M34 16l6-6M44 16l6-6M54 16l6-6M64 16l6-6M74 16l6-6" stroke="#5a6168" stroke-width="2.4" stroke-linecap="round"/><path d="M14 18v20M82 18v20" stroke="#5a6168" stroke-width="3" stroke-linecap="round"/></svg>'
  };

  function buildControls() {
    var box = $('#dach-opcje');
    box.innerHTML = Object.keys(C.pokrycia).map(function (k) {
      var p = C.pokrycia[k];
      return '<label class="card"><input class="vh" type="radio" name="dach" value="' + k + '" aria-describedby="dach-desc-' + k + '">' +
        '<span class="card-in">' + ICONS[k] + '<b>' + p.krotko + '</b><small>' + zl(p.cenaM2) + '/m²</small></span>' +
        '<span class="sr-only" id="dach-desc-' + k + '">' + p.nazwa + '. ' + p.opis + '</span></label>';
    }).join('');
    var info = document.createElement('p');
    info.className = 'info'; info.id = 'dach-info';
    box.after(info);

    $('#ral-opcje').innerHTML = C.ral.map(function (r) {
      return '<label class="sw"><input class="vh" type="radio" name="ral" value="' + r.kod + '">' +
        '<span class="sw-in"><span class="sw-dot' + (r.metalik ? ' metal' : '') + '" style="--c:' + r.hex + '"></span>' +
        '<b><span class="sr-only">RAL </span>' + r.kod + '</b><small>' + (r.standard ? 'standard' : '+' + C.doplataRalProcent + '%') + '</small>' +
        '<span class="sr-only">' + r.nazwa + (r.standard ? '' : ', dopłata ' + C.doplataRalProcent + '%') + '</span></span></label>';
    }).join('');

    ['w', 'd', 'h'].forEach(function (k) {
      var lim = DIM[k];
      [$('#' + k + '-range'), $('#' + k + '-num')].forEach(function (el) {
        el.min = lim.min; el.max = lim.max; el.step = lim.krok;
      });
      $('#' + k + '-lim').innerHTML = '<span>' + m1(lim.min) + ' m</span><span>' + m1(lim.max) + ' m</span>';
    });

    var pk = C.pokrycia;
    $('#stawki').innerHTML = [
      'Poliwęglan: <b>' + zl(pk.poliweglan.cenaM2) + '/m²</b> · szkło: <b>' + zl(pk.szklo.cenaM2) + '/m²</b> · lamele: <b>' + zl(pk.lamele.cenaM2) + '/m²</b> <span>(konstrukcja z pokryciem i rynną, ' + C.konstrukcja.slupyWCenie + ' słupy w cenie)</span>',
      'Napęd lamel: <b>' + zl(pk.lamele.napedLamel) + '</b>',
      'Słup pośredni (co najmniej jeden przy szerokości powyżej ' + m1(C.konstrukcja.maxRozstawSlupow) + ' m): <b>' + zl(C.dodatkowySlup) + '</b>',
      'Wysokość powyżej ' + m1(C.doplataWysokosc.powyzej) + ' m: <b>' + zl(C.doplataWysokosc.za10cmNaSlup) + '</b> <span>za każde rozpoczęte 10 cm na słup</span>',
      'Kolor spoza standardu (RAL 7016, 9016, 9005): <b>+' + C.doplataRalProcent + '%</b> <span>wartości konstrukcji</span>',
      'Rolety ZIP z napędem: <b>' + zl(C.rolety.cenaMb) + '/mb</b> <span>szerokości boku</span>',
      'LED: <b>' + zl(C.led.cenaMb) + '/mb</b> + zasilacz ze ściemniaczem <b>' + zl(C.led.zasilacz) + '</b>',
      'Montaż i transport: <b>' + zl(C.montaz.cenaM2) + '/m²</b> <span>(min. ' + zl(C.montaz.minimum) + ')</span>',
      'Ceny netto, VAT ' + Math.round(C.vat * 100) + '%. <span>' + C.wersja + '.</span>'
    ].map(function (t) { return '<li>' + t + '</li>'; }).join('');
    $('#t-vat-l').textContent = 'VAT ' + Math.round(C.vat * 100) + '%';
  }

  function setRangeFill(el) {
    var p = (el.value - el.min) / (el.max - el.min) * 100;
    el.style.setProperty('--p', p + '%');
  }

  function syncControls() {
    ['w', 'd', 'h'].forEach(function (k) {
      var r = $('#' + k + '-range'), n = $('#' + k + '-num');
      r.value = S[k]; setRangeFill(r);
      if (document.activeElement !== n) n.value = S[k].toFixed(1);
      r.setAttribute('aria-valuetext', m1(S[k]) + ' m');
    });
    $$('input[name="dach"]').forEach(function (i) { i.checked = i.value === S.dach; });
    $$('input[name="ral"]').forEach(function (i) { i.checked = i.value === S.ral; });
    var kat = $('#kat'); kat.value = S.kat; setRangeFill(kat);
    kat.setAttribute('aria-valuetext', S.kat + ' stopni');
    $('#kat-out').textContent = S.kat + '°';
    $('#r-lewa').checked = S.rolety.lewa; $('#r-prawa').checked = S.rolety.prawa; $('#r-przod').checked = S.rolety.przod;
    var roz = $('#roz'); roz.value = S.rozwiniecie; setRangeFill(roz);
    roz.setAttribute('aria-valuetext', S.rozwiniecie + ' procent');
    $('#roz-out').textContent = S.rozwiniecie + '%';
    $('#led').checked = S.led; $('#barwa').value = S.barwa; $('#montaz').checked = S.montaz;
    var nb = $('#btn-noc');
    nb.setAttribute('aria-pressed', String(S.noc));
    $('#btn-noc-txt').textContent = S.noc ? 'Dzień' : 'Noc';
    nb.setAttribute('aria-label', S.noc ? 'Przełącz na widok dzienny' : 'Przełącz na widok nocny');
  }

  /* ---------- odświeżenie wszystkiego ---------- */
  var scena = null, lastNetto = null, srTimer = null, hashTimer = null;
  var U, P;

  function render() {
    U = uklad(S);
    P = oblicz(S, U);
    var pk = C.pokrycia[S.dach];
    var r = ralObj(S.ral);

    $('#kat-wrap').hidden = S.dach !== 'lamele';
    var anyRol = S.rolety.lewa || S.rolety.prawa || S.rolety.przod;
    $('#roz-wrap').hidden = !anyRol;
    $('#led-wrap').hidden = !S.led;
    $('#btn-led-noc').textContent = S.noc ? 'Wróć do dnia' : 'Zobacz nocą';

    var konstr = U.slupy + ' ' + plural(U.slupy, 'słup', 'słupy', 'słupów') + ' · ' +
      (S.dach === 'lamele'
        ? U.pola + ' ' + plural(U.pola, 'pole', 'pola', 'pól') + ' lamel · dach płaski'
        : U.krokwie + ' ' + plural(U.krokwie, 'krokiew', 'krokwie', 'krokwi') + ' · spadek ' + C.konstrukcja.spadekStopnie + '°');
    $('#uklad-info').innerHTML = 'Powierzchnia: <b>' + m2(P.area) + ' m²</b> · ' + konstr;
    $('#dach-info').innerHTML = '<b>' + pk.nazwa + '</b> — ' + pk.opis.charAt(0).toLowerCase() + pk.opis.slice(1);
    $('#ral-info').innerHTML = '<b>RAL ' + r.kod + ' ' + r.nazwa + '</b> · ' + (r.standard ? 'kolor standardowy, bez dopłaty' : 'dopłata ' + C.doplataRalProcent + '% wartości konstrukcji') + (r.metalik ? ' · efekt metaliczny' : '');

    var side = function (mb) { return m1(mb) + ' m<br>' + zl(mb * C.rolety.cenaMb); };
    document.querySelector('[data-cena="lewa"]').innerHTML = side(S.d);
    document.querySelector('[data-cena="prawa"]').innerHTML = side(S.d);
    document.querySelector('[data-cena="przod"]').innerHTML = side(S.w);
    $('#led-opis').textContent = '— ' + m1(U.ledMb) + ' mb · ' + zl(U.ledMb * C.led.cenaMb + C.led.zasilacz);
    var mk = Math.max(C.montaz.minimum, Math.round(P.area * C.montaz.cenaM2));
    $('#montaz-opis').textContent = '— ' + zl(mk);

    $('#rozbicie').innerHTML = P.pozycje.map(function (p) {
      return '<tr><th scope="row">' + p.nazwa + '<small>' + p.opis + '</small></th><td>' + zl(p.kwota) + '</td></tr>';
    }).join('');
    $('#t-netto').textContent = zl(P.netto);
    $('#t-vat').textContent = zl(P.vat);
    $('#t-brutto').textContent = zl(P.brutto);
    $('#cena-netto').textContent = zl(P.netto);
    $('#cena-brutto').textContent = zl(P.brutto);
    if (lastNetto !== null && lastNetto !== P.netto) {
      var el = $('.pb-netto'); el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump');
    }
    lastNetto = P.netto;

    $('#chip').textContent = m1(S.w) + ' × ' + m1(S.d) + ' m · ' + pk.krotko + ' · RAL ' + r.kod;
    $('#scena').setAttribute('aria-label', 'Wizualizacja 3D: zadaszenie ' + m1(S.w) + ' na ' + m1(S.d) + ' m, wysokość ' + m1(S.h) + ' m, pokrycie ' + pk.krotko.toLowerCase() + ', kolor RAL ' + r.kod + ' ' + r.nazwa + (anyRol ? ', rolety ZIP: ' + stronyRolet(S) : '') + (S.led ? ', oświetlenie LED' : '') + (S.noc ? ', widok nocny' : ''));

    clearTimeout(srTimer);
    srTimer = setTimeout(function () {
      $('#sr-status').textContent = 'Cena orientacyjna: ' + zl(P.netto) + ' netto, ' + zl(P.brutto) + ' brutto.';
    }, 900);
    clearTimeout(hashTimer);
    hashTimer = setTimeout(function () {
      try { history.replaceState(null, '', hashString()); } catch (e) { /* np. podgląd z pliku */ }
    }, 400);

    if (scena) {
      S.ralObj = r;
      scena.update(S, U);
    }
  }

  /* ---------- zdarzenia ---------- */
  function bind() {
    ['w', 'd', 'h'].forEach(function (k) {
      var r = $('#' + k + '-range'), n = $('#' + k + '-num');
      r.addEventListener('input', function () { S[k] = round1(+r.value); syncControls(); render(); });
      function fromNum(commit) {
        var v = parseFloat(String(n.value).replace(',', '.'));
        if (isNaN(v)) { if (commit) n.value = S[k].toFixed(1); return; }
        if (!commit && (v < DIM[k].min || v > DIM[k].max)) return; // poczekaj na koniec wpisywania
        S[k] = round1(clamp(v, DIM[k].min, DIM[k].max));
        if (commit) n.value = S[k].toFixed(1);
        syncControls(); render();
      }
      n.addEventListener('input', function () { fromNum(false); });
      n.addEventListener('change', function () { fromNum(true); });
      n.addEventListener('blur', function () { fromNum(true); });
    });
    $$('input[name="dach"]').forEach(function (i) {
      i.addEventListener('change', function () { S.dach = i.value; syncControls(); render(); });
    });
    $$('input[name="ral"]').forEach(function (i) {
      i.addEventListener('change', function () { S.ral = i.value; syncControls(); render(); });
    });
    $('#kat').addEventListener('input', function (e) { S.kat = +e.target.value; syncControls(); render(); });
    [['#r-lewa', 'lewa'], ['#r-prawa', 'prawa'], ['#r-przod', 'przod']].forEach(function (a) {
      $(a[0]).addEventListener('change', function (e) {
        S.rolety[a[1]] = e.target.checked;
        if (e.target.checked && S.rozwiniecie < 10) S.rozwiniecie = 70;
        syncControls(); render();
      });
    });
    $('#roz').addEventListener('input', function (e) { S.rozwiniecie = +e.target.value; syncControls(); render(); });
    $('#led').addEventListener('change', function (e) { S.led = e.target.checked; syncControls(); render(); });
    $('#barwa').addEventListener('change', function (e) { S.barwa = e.target.value; render(); });
    $('#montaz').addEventListener('change', function (e) { S.montaz = e.target.checked; render(); });
    function toggleNight() {
      S.noc = !S.noc; syncControls(); render();
      // nocą pokaż konstrukcję z niższej perspektywy, żeby było widać listwy LED
      if (S.noc && scena) {
        scena.setPreset('nocny');
        $$('[data-widok]').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      }
    }
    $('#btn-noc').addEventListener('click', toggleNight);
    $('#btn-led-noc').addEventListener('click', toggleNight);
    $('#cfg').addEventListener('submit', function (e) { e.preventDefault(); });

    $$('[data-widok]').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-widok]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        if (scena) scena.setPreset(b.dataset.widok);
      });
    });
    // ręczny obrót kamery — żaden preset nie jest już aktywny
    $('#scena').addEventListener('pointerdown', function () {
      $$('[data-widok]').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
    });

    $('#btn-link').addEventListener('click', function () {
      var url = location.href.split('#')[0] + hashString();
      var done = function () { toast('Skopiowano link do konfiguracji'); };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(done, function () { fallbackCopy(url); done(); });
      } else { fallbackCopy(url); done(); }
    });

    bindDialog();
  }

  function fallbackCopy(t) {
    var ta = document.createElement('textarea');
    ta.value = t; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) { /* brak schowka */ }
    ta.remove();
  }

  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }

  /* ---------- okno „Wyślij do wyceny” ---------- */
  var lastPdf = null;
  function paramRows() {
    var r = ralObj(S.ral), pk = C.pokrycia[S.dach];
    var rows = [
      ['Szer. × wysięg × wys.', m1(S.w) + ' × ' + m1(S.d) + ' × ' + m1(S.h) + '\u00a0m'],
      ['Powierzchnia dachu', m2(P.area) + '\u00a0m²'],
      ['Pokrycie', pk.nazwa],
      ['Konstrukcja', U.slupy + ' ' + plural(U.slupy, 'słup', 'słupy', 'słupów') + ', ' + (S.dach === 'lamele'
        ? U.pola + ' ' + plural(U.pola, 'pole', 'pola', 'pól') + ' lamel, napęd elektryczny'
        : U.krokwie + ' ' + plural(U.krokwie, 'krokiew', 'krokwie', 'krokwi') + ', spadek ' + C.konstrukcja.spadekStopnie + '°')],
      ['Kolor konstrukcji', 'RAL ' + r.kod + ' ' + r.nazwa + (r.standard ? '' : ' (+' + C.doplataRalProcent + '%)')],
      ['Rolety ZIP', (S.rolety.lewa || S.rolety.prawa || S.rolety.przod) ? stronyRolet(S) : 'brak'],
      ['Oświetlenie LED', S.led ? m1(U.ledMb) + '\u00a0mb, barwa ' + (S.barwa === 'ciepla' ? 'ciepła 3000\u00a0K' : 'neutralna 4000\u00a0K') : 'brak'],
      ['Montaż i transport', S.montaz ? 'tak' : 'nie (odbiór własny)']
    ];
    return rows;
  }

  function bindDialog() {
    var dlg = $('#dlg'), form = $('#form-wycena');
    var fields = {
      imie: { el: $('#f-imie'), err: $('#e-imie'), ok: function (v) { return v.trim().length >= 2; } },
      email: { el: $('#f-email'), err: $('#e-email'), ok: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); } },
      tel: { el: $('#f-tel'), err: $('#e-tel'), ok: function (v) { return v.trim() === '' || /^\+?[0-9 ()-]{7,20}$/.test(v.trim()); } },
      miasto: { el: $('#f-miasto'), err: $('#e-miasto'), ok: function (v) { return v.trim().length >= 2; } },
      rodo: { el: $('#f-rodo'), err: $('#e-rodo'), ok: function () { return $('#f-rodo').checked; } }
    };
    function check(f, show) {
      var valid = f.ok(f.el.value);
      if (show || f.el.getAttribute('aria-invalid') === 'true') {
        f.el.setAttribute('aria-invalid', String(!valid));
        f.err.hidden = valid;
      }
      return valid;
    }
    Object.keys(fields).forEach(function (k) {
      var f = fields[k];
      f.el.addEventListener(f.el.type === 'checkbox' ? 'change' : 'input', function () { check(f, false); });
      if (f.el.type !== 'checkbox') f.el.addEventListener('blur', function () { if (f.el.value) check(f, true); });
    });

    function openDlg() {
      $('#dlg-form-wrap').hidden = false; $('#dlg-ok').hidden = true;
      var r = ralObj(S.ral);
      $('#dlg-sum').innerHTML = '<span>' + C.pokrycia[S.dach].krotko + ' · ' + m1(S.w) + ' × ' + m1(S.d) + ' m · RAL ' + r.kod + '</span><span><b>' + zl(P.netto) + '</b> netto · ' + zl(P.brutto) + ' brutto</span>';
      if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
      setTimeout(function () { $('#f-imie').focus(); }, 30);
    }
    function closeDlg() { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); $('#btn-wycena').focus(); }
    $('#btn-wycena').addEventListener('click', openDlg);
    $('#dlg-x').addEventListener('click', closeDlg);
    $('#dlg-cancel').addEventListener('click', closeDlg);
    $('#ok-close').addEventListener('click', closeDlg);
    dlg.addEventListener('click', function (e) { if (e.target === dlg) closeDlg(); });
    $('#ok-again').addEventListener('click', function () { if (lastPdf) lastPdf.save(); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      Object.keys(fields).forEach(function (k) {
        if (!check(fields[k], true) && !firstBad) firstBad = fields[k].el;
      });
      if (firstBad) { firstBad.focus(); return; }
      if (!window.jspdf || !window.TarvioPDF) {
        toast('Nie udało się wczytać modułu PDF. Sprawdź połączenie i spróbuj ponownie.');
        return;
      }
      var btn = $('#dlg-submit');
      btn.disabled = true; btn.textContent = 'Przygotowuję PDF…';
      var now = new Date();
      var pad = function (n) { return String(n).padStart(2, '0'); };
      var nr = 'TRV-' + String(now.getFullYear()).slice(2) + pad(now.getMonth() + 1) + pad(now.getDate()) + '-' + String(Math.floor(1000 + Math.random() * 9000));
      var snap = null;
      try { if (scena) snap = scena.snapshot(1600, 900); } catch (err) { snap = null; }
      window.TarvioPDF.generate({
        nr: nr,
        data: pad(now.getDate()) + '.' + pad(now.getMonth() + 1) + '.' + now.getFullYear(),
        snapshot: snap,
        parametry: paramRows(),
        pozycje: P.pozycje.map(function (p) { return [p.nazwa, p.opis, zl(p.kwota)]; }),
        netto: zl(P.netto), vat: zl(P.vat), vatLabel: 'VAT ' + Math.round(C.vat * 100) + '%', brutto: zl(P.brutto),
        klient: [
          ['Imię i nazwisko', fields.imie.el.value.trim()],
          ['E-mail', fields.email.el.value.trim()],
          ['Telefon', fields.tel.el.value.trim() || '—'],
          ['Miejscowość montażu', fields.miasto.el.value.trim()],
          ['Uwagi', $('#f-uwagi').value.trim() || '—']
        ],
        link: location.href.split('#')[0].indexOf('http') === 0 ? location.href.split('#')[0] + hashString() : ''
      }).then(function (res) {
        lastPdf = res;
        res.save();
        $('#ok-txt').innerHTML = 'Plik <b>' + res.filename + '</b> z wizualizacją, parametrami i ceną orientacyjną został zapisany na Twoim urządzeniu.';
        $('#dlg-form-wrap').hidden = true; $('#dlg-ok').hidden = false;
        $('#dlg-ok').focus();
      }).catch(function (err) {
        console.error(err);
        toast('Nie udało się utworzyć pliku PDF.');
      }).then(function () {
        btn.disabled = false; btn.textContent = 'Wyślij do wyceny';
      });
    });
  }

  /* ---------- start ---------- */
  readHash();
  buildControls();
  syncControls();
  bind();
  render();

  function webglOk() {
    try {
      var c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
    } catch (e) { return false; }
  }

  (async function load3D() {
    var loader = $('#loader');
    try {
      if (!webglOk()) throw new Error('Brak WebGL');
      var THREE = await import('three');
      var oc = await import('three/addons/controls/OrbitControls.js');
      var re = await import('three/addons/environments/RoomEnvironment.js');
      scena = window.TarvioScena.create(THREE, { OrbitControls: oc.OrbitControls, RoomEnvironment: re.RoomEnvironment }, $('#scena'));
      render();
      if (S.noc) $$('[data-widok]').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      requestAnimationFrame(function () { loader.classList.add('done'); });
      setTimeout(function () { loader.hidden = true; }, 700);
    } catch (err) {
      console.error(err);
      loader.hidden = true;
      $('#v-error').hidden = false;
    }
  })();

  // dla testów i integracji (np. WordPress): odczyt bieżącej konfiguracji
  window.TarvioKonfigurator = {
    stan: function () { return JSON.parse(JSON.stringify(S)); },
    cena: function () { return P; }
  };
})();
