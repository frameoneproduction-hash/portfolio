/* Porównywarka OC/AC/NNW — demo. Cennik uproszczony i przykładowy; we wdrożeniu składki przychodzą z API Insly.
   Dane z formularzy nie są nigdzie wysyłane (CSP: connect-src 'none'). */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var zl = function (n) { return Math.round(n).toLocaleString('pl-PL') + ' zł'; };
  var YEAR = 2026;

  // Fikcyjne towarzystwa (nazwy sprawdzone 16.11.2026 — brak takich ubezpieczycieli).
  var TU = [
    { id: 'velmora', name: 'Velmora', color: '#1863dc', oc: 0.94, ac: 1.05, nnw: 1.0, as: 1.0, score: 2,
      perks: { naprawa: 'Naprawa w warsztacie lub kosztorys', udzial: true, zastepcze: false, szyby: true, ochronaZnizek: false, hol: 'holowanie do 150 km' } },
    { id: 'brizant', name: 'Brizant', color: '#212121', oc: 1.0, ac: 0.9, nnw: 0.9, as: 0.9, score: 1,
      perks: { naprawa: 'Naprawa tylko na kosztorys', udzial: false, zastepcze: false, szyby: false, ochronaZnizek: false, hol: 'holowanie do 100 km' } },
    { id: 'kavelo', name: 'Kavelo', color: '#c2410c', oc: 1.07, ac: 1.0, nnw: 1.05, as: 1.1, score: 3,
      perks: { naprawa: 'Naprawa w ASO', udzial: true, zastepcze: '7 dni', szyby: true, ochronaZnizek: false, hol: 'holowanie do 300 km' } },
    { id: 'norbis', name: 'Norbis', color: '#0f766e', oc: 0.99, ac: 1.12, nnw: 1.1, as: 1.15, score: 4,
      perks: { naprawa: 'Naprawa w ASO', udzial: true, zastepcze: '14 dni', szyby: true, ochronaZnizek: true, hol: 'holowanie bez limitu km w PL' } }
  ];
  var MARKI = ['Toyota', 'Škoda', 'Volkswagen', 'Opel', 'Ford', 'Kia', 'Hyundai', 'Renault', 'Dacia', 'BMW', 'Audi', 'Mercedes-Benz', 'Peugeot', 'Fiat', 'Inna'];

  // Selecty
  $('#marka').innerHTML = MARKI.map(function (m) { return '<option>' + m + '</option>'; }).join('');
  var r = '';
  for (var y = YEAR; y >= 1995; y--) r += '<option' + (y === 2017 ? ' selected' : '') + '>' + y + '</option>';
  $('#rok').innerHTML = r;
  var l = '';
  for (var i = 0; i <= 10; i++) l += '<option value="' + i + '"' + (i === 5 ? ' selected' : '') + '>' + (i === 10 ? '10 lat i więcej' : i + (i === 1 ? ' rok' : (i > 1 && i < 5 ? ' lata' : ' lat'))) + '</option>';
  $('#lata').innerHTML = l;

  function val(name) { var el = $('input[name="' + name + '"]:checked'); return el ? el.value : null; }

  // Podpowiedź wartości auta z rocznika
  var valueTouched = false;
  function suggestValue() {
    if (valueTouched) return;
    var age = YEAR - +$('#rok').value, typ = val('typ');
    var base = typ === 'dostawczy' ? 140000 : typ === 'motocykl' ? 45000 : 120000;
    var v = base * Math.pow(0.86, age);
    v = Math.max(typ === 'motocykl' ? 3000 : 6000, Math.round(v / 1000) * 1000);
    $('#wartosc').value = v.toLocaleString('pl-PL');
  }
  $('#wartosc').addEventListener('input', function () { valueTouched = true; });
  $('#rok').addEventListener('change', suggestValue);
  $$('input[name="typ"]').forEach(function (e) { e.addEventListener('change', suggestValue); });
  suggestValue();

  // Kod pocztowy → region
  function region() {
    var k = $('#kod').value.replace(/\D/g, '');
    var p = +k.slice(0, 2);
    if (k.length < 2) return { f: 1, txt: '' };
    if (p === 20) return { f: 1.15, txt: 'Lublin — stawki miejskie.' };
    if (p >= 21 && p <= 24) return { f: 0.95, txt: 'Województwo lubelskie poza Lublinem.' };
    if (p <= 5) return { f: 1.35, txt: 'Warszawa i okolice.' };
    return { f: 1.05, txt: '' };
  }
  $('#kod').addEventListener('input', function (e) {
    var d = e.target.value.replace(/\D/g, '').slice(0, 5);
    e.target.value = d.length > 2 ? d.slice(0, 2) + '-' + d.slice(2) : d;
    $('#kod-hint').textContent = region().txt;
  });
  $('#kod-hint').textContent = region().txt;

  // Firma / osoba
  $$('input[name="klient"]').forEach(function (e) {
    e.addEventListener('change', function () {
      var firma = val('klient') === 'firma';
      $('#f-wiek').hidden = firma;
      $('#firm-note').hidden = !firma;
    });
  });

  // Numer rejestracyjny w hero
  $('#plate').addEventListener('input', function (e) {
    var v = e.target.value.toUpperCase().replace(/[^A-Z0-9 ]/g, '');
    e.target.value = v;
  });
  $('#plate-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var c = $('#kalkulator');
    c.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    setTimeout(function () { $('#marka').focus({ preventScroll: true }); }, 450);
  });

  // Kroki
  var cur = 1;
  function go(n, noFocus) {
    cur = n;
    $$('.step').forEach(function (s) { s.hidden = +s.dataset.step !== n; });
    $$('[data-step-ind]').forEach(function (li) {
      var k = +li.dataset.stepInd;
      li.classList.toggle('on', k === n);
      li.classList.toggle('done', k < n);
      if (k === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
    });
    var first = $('.step[data-step="' + n + '"] input, .step[data-step="' + n + '"] select');
    if (first && !noFocus) first.focus({ preventScroll: true });
    acNote();
  }
  $$('[data-next]').forEach(function (b) { b.addEventListener('click', function () { go(+b.dataset.next); }); });

  function carAge() { return YEAR - +$('#rok').value; }
  function acNote() {
    var z = val('zakres'), n = $('#ac-note');
    if (z !== 'oc' && carAge() > 15) { n.hidden = false; n.textContent = 'AC zwykle obejmuje auta do 15 lat — dla tego rocznika pokażemy OC (i NNW), a AC policzy doradca indywidualnie.'; }
    else if (z !== 'oc' && val('wlasnosc') === 'leasing') { n.hidden = false; n.textContent = 'Auto w leasingu: AC jest zwykle wymagane przez leasingodawcę — uwzględniamy je w każdym wariancie.'; }
    else n.hidden = true;
    $('#f-nnw').hidden = z !== 'ocacnnw';
  }
  $$('input[name="zakres"], input[name="wlasnosc"]').forEach(function (e) { e.addEventListener('change', acNote); });
  $('#rok').addEventListener('change', acNote);

  // Cennik przykładowy
  function quote() {
    var typ = val('typ'), zakres = val('zakres');
    var firma = val('klient') === 'firma';
    var age = carAge();
    var wart = +String($('#wartosc').value).replace(/\D/g, '') || 0;
    var wiek = +$('#wiek').value, lata = +$('#lata').value;
    var ocBase = typ === 'dostawczy' ? 1450 : typ === 'motocykl' ? 420 : 1050;
    var fWiek = firma ? 1.05 : ({ 18: 1.9, 26: 1.3, 31: 1, 51: 0.95, 66: 1.15 })[wiek];
    var znizka = Math.min(lata * 0.06, 0.6);
    var reg = region().f, km = +$('#przebieg').value;
    var withAC = zakres !== 'oc' && age <= 15;
    if (val('wlasnosc') === 'leasing' && age <= 15) withAC = true;
    var acRate = 0.031 * (age <= 3 ? 1 : age <= 8 ? 1.15 : 1.3) * (typ === 'motocykl' ? 1.6 : 1);
    var assist = $('#assist').value;
    var nnwSum = +$('#nnw').value;
    var raty = +$('#raty').value;
    var rabat = $('#rabat').checked ? 50 : 0;

    return TU.map(function (t) {
      var oc = ocBase * fWiek * (1 - znizka) * reg * km * t.oc;
      oc = Math.max(oc, typ === 'motocykl' ? 160 : 420);
      var ac = 0;
      if (withAC) { ac = wart * acRate * fWiek * (1 - znizka * 0.5) * t.ac; ac = Math.max(ac, 550); }
      var nnw = zakres === 'ocacnnw' ? ({ 10: 39, 20: 59, 50: 119 })[nnwSum] * t.nnw : 0;
      var as = assist === 'pl' ? 49 * t.as : assist === 'eu' ? 99 * t.as : 0;
      var sum = oc + ac + nnw + as;
      var mark = raty === 2 ? 1.03 : raty === 4 ? 1.06 : 1;
      var total = Math.max(sum * mark - rabat, 0);
      return { t: t, oc: oc, ac: ac, nnw: nnw, as: as, total: total, before: sum * mark, raty: raty, withAC: withAC };
    });
  }

  function li(ok, txt) { return '<li class="' + (ok ? 'y' : 'n') + '">' + txt + '</li>'; }
  var last = [];
  function render() {
    var q = quote();
    var sort = val('sort');
    var minTotal = Math.min.apply(null, q.map(function (x) { return x.total; }));
    var maxScore = Math.max.apply(null, q.map(function (x) { return x.t.score; }));
    q.sort(sort === 'zakres' ? function (a, b) { return b.t.score - a.t.score || a.total - b.total; } : function (a, b) { return a.total - b.total; });
    last = q;
    var z = val('zakres');
    $('#offers').innerHTML = q.map(function (x, idx) {
      var p = x.t.perks, best = x.total === minTotal;
      var badges = (best ? '<span class="badge">Najtańsza</span>' : '') + (x.t.score === maxScore ? '<span class="badge b2">Najszerszy zakres</span>' : '');
      var items = li(true, 'OC' + (x.withAC ? ' + AC' : '') + (z === 'ocacnnw' ? ' + NNW ' + $('#nnw').selectedOptions[0].text : ''));
      if (x.withAC) {
        items += li(true, p.naprawa);
        items += li(p.udzial, p.udzial ? 'Bez udziału własnego' : 'Udział własny 500 zł');
        items += li(!!p.zastepcze, p.zastepcze ? 'Auto zastępcze ' + p.zastepcze : 'Bez auta zastępczego');
        items += li(p.ochronaZnizek, p.ochronaZnizek ? 'Ochrona zniżek po 1 szkodzie' : 'Bez ochrony zniżek');
      }
      if ($('#assist').value !== '0') items += li(true, 'Assistance: ' + p.hol + ($('#assist').value === 'eu' ? ', także w Europie' : ''));
      var split = 'OC ' + zl(x.oc) + (x.ac ? ' · AC ' + zl(x.ac) : '') + (x.nnw ? ' · NNW ' + zl(x.nnw) : '') + (x.as ? ' · assistance ' + zl(x.as) : '');
      var rata = x.raty > 1 ? '<small>' + x.raty + ' raty po ' + zl(x.total / x.raty) + '</small>' : '<small>płatność jednorazowa</small>';
      return '<li class="offer' + (idx === 0 ? ' best' : '') + '">' +
        '<div class="o-name"><span class="o-mark" style="background:' + x.t.color + '" aria-hidden="true">' + x.t.name[0] + '</span><b>' + x.t.name + '</b>' + badges + '</div>' +
        '<div class="o-price"><b>' + zl(x.total) + '</b>' + (x.before !== x.total ? '<small><span class="old">' + zl(x.before) + '</span> z rabatem 50 zł</small>' : '') + rata + '</div>' +
        '<ul class="o-list">' + items + '</ul>' +
        '<p class="o-split">Składka: ' + split + '</p>' +
        '<div class="o-act"><button type="button" class="btn" data-pick="' + x.t.id + '">Wybieram ' + x.t.name + '</button></div>' +
        '</li>';
    }).join('');
    $$('[data-pick]').forEach(function (b) { b.addEventListener('click', function () { openLead(b.dataset.pick); }); });
    var marka = $('#marka').value, model = $('#model').value.trim(), plate = $('#plate').value.trim();
    $('#res-auto').textContent = (marka === 'Inna' ? 'Twojego auta' : marka + (model ? ' ' + model : '')) + ' (' + $('#rok').value + ')';
    $('#res-sub').textContent = (plate ? plate + ' · ' : '') + ({ oc: 'OC', ocac: 'OC + AC', ocacnnw: 'OC + AC + NNW' })[z] + ' · ' + $('#lata').selectedOptions[0].text + ' bez szkody' + ($('#kodpol').value ? ' · kod ' + $('#kodpol').value.toUpperCase() : '');
  }
  $('#calc-form').addEventListener('submit', function (e) {
    e.preventDefault();
    render();
    var w = $('#wyniki');
    w.hidden = false;
    w.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    w.focus({ preventScroll: true });
  });
  $$('input[name="sort"]').forEach(function (e) { e.addEventListener('change', render); });

  // Okno kontaktu
  var dlg = $('#lead'), chosen = null;
  function openLead(id) {
    chosen = last.filter(function (x) { return x.t.id === id; })[0] || null;
    $('#lead-sum').textContent = chosen
      ? 'Wybrany wariant: ' + chosen.t.name + ' — ' + zl(chosen.total) + ' (' + ({ oc: 'OC', ocac: 'OC + AC', ocacnnw: 'OC + AC + NNW' })[val('zakres')] + '). Doradca potwierdzi cenę i wyśle polisę.'
      : (id === 'flota' ? 'Flota firmowa — policzymy ją z rabatem flotowym.' : 'Doradca oddzwoni i przygotuje porównanie za Ciebie.');
    $('#lead-form-wrap').hidden = false; $('#lead-ok').hidden = true;
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    $('#l-imie').focus();
  }
  $$('[data-lead]').forEach(function (b) { b.addEventListener('click', function () { openLead(b.dataset.lead); }); });
  function closeLead() { if (dlg.open) dlg.close(); }
  $('#lead-x').addEventListener('click', closeLead);
  $('#lead-close').addEventListener('click', closeLead);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) closeLead(); });

  $('#l-tel').addEventListener('input', function (e) {
    var d = e.target.value.replace(/\D/g, '').replace(/^48(?=\d{9})/, '').slice(0, 9);
    e.target.value = d.replace(/(\d{3})(?=\d)/g, '$1 ').trim();
  });
  $('#lead-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var tel = $('#l-tel').value.replace(/\D/g, ''), okTel = tel.length === 9, okZ = $('#l-zgoda').checked;
    $('#l-tel-err').hidden = okTel; $('#l-tel').setAttribute('aria-invalid', String(!okTel));
    $('#l-zgoda-err').hidden = okZ;
    if (!$('#l-imie').value.trim()) { $('#l-imie').focus(); return; }
    if (!okTel) { $('#l-tel').focus(); return; }
    if (!okZ) { $('#l-zgoda').focus(); return; }
    var tryb = val('l-tryb');
    var payload = {
      source: 'porownywarka-autoocac',
      referral_code: $('#kodpol').value.toUpperCase() || null,
      customer: { first_name: $('#l-imie').value.trim(), phone: '+48 ' + tel.slice(0, 3) + ' *** ***', type: val('klient') },
      vehicle: { plate: $('#plate').value.trim() || null, make: $('#marka').value, model: $('#model').value.trim() || null, year: +$('#rok').value, value_pln: +String($('#wartosc').value).replace(/\D/g, '') },
      cover: ({ oc: 'OC', ocac: 'OC+AC', ocacnnw: 'OC+AC+NNW' })[val('zakres')],
      chosen_offer: chosen ? { insurer: chosen.t.name, premium_pln: Math.round(chosen.total), installments: chosen.raty } : null,
      next_step: tryb === 'online' ? 'send_payment_link_sms' : 'advisor_callback'
    };
    $('#lead-ok-txt').textContent = tryb === 'online'
      ? 'We wdrożeniu klient dostaje SMS z linkiem do płatności, a polisa przychodzi e-mailem.'
      : 'We wdrożeniu doradca dostaje powiadomienie i oddzwania z gotową polisą.';
    $('#lead-json').textContent = JSON.stringify(payload, null, 2);
    $('#lead-form-wrap').hidden = true; $('#lead-ok').hidden = false;
    $('#lead-ok-t').focus();
  });

  go(1, true);
})();
