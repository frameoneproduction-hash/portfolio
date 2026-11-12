/* Heliovka — kalkulator fotowoltaiki i pompy ciepła (demo, cennik przykładowy) */
(function () {
  'use strict';
  var F = window.DemoFmt, $ = function (id) { return document.getElementById(id); };

  var CENNIK = {
    panelW: 450,                 // W na panel
    uzysk: 1000,                 // kWh z 1 kWp rocznie przy dachu na południe
    zlKwp: [[5, 4100], [8, 3800], [12, 3600], [Infinity, 3400]], // netto za kWp wg mocy
    dach: [
      { id: 'dachowka', nazwa: 'Dachówka', opis: '+6% (haki dachowe)', mn: 1.06, vat: 0.08 },
      { id: 'blacha', nazwa: 'Blacha', opis: 'cena bazowa', mn: 1, vat: 0.08 },
      { id: 'plaski', nazwa: 'Dach płaski', opis: '+8% (balast)', mn: 1.08, vat: 0.08 },
      { id: 'grunt', nazwa: 'Na gruncie', opis: '+12%, VAT 23%', mn: 1.12, vat: 0.23 }
    ],
    mag: [
      { id: '0', nazwa: 'Bez magazynu', opis: 'autokonsumpcja ok. 30%', cena: 0, auto: 0.30 },
      { id: '5', nazwa: 'Magazyn 5 kWh', opis: 'autokonsumpcja ok. 60%', cena: 13500, auto: 0.60 },
      { id: '10', nazwa: 'Magazyn 10 kWh', opis: 'autokonsumpcja ok. 70%', cena: 23000, auto: 0.70 }
    ],
    optPanel: 230,
    cenaPradu: 1.10,             // zł brutto za kWh z sieci
    cenaOddania: 0.30,           // zł za kWh oddaną do sieci (net-billing, uśrednione)
    hp: {
      std: [
        { id: 'nowy', nazwa: 'Nowy dom', opis: 'ok. 40 W/m²', w: 40 },
        { id: 'ocieplony', nazwa: 'Ocieplony', opis: 'ok. 60 W/m²', w: 60 },
        { id: 'stary', nazwa: 'Do docieplenia', opis: 'ok. 90 W/m²', w: 90 }
      ],
      inst: [
        { id: 'podl', nazwa: 'Ogrzewanie podłogowe', opis: 'cena bazowa', mn: 1 },
        { id: 'grz', nazwa: 'Grzejniki', opis: '+6% (wyższa temperatura zasilania)', mn: 1.06 }
      ],
      modele: [[6, 22000], [8, 25500], [10, 28900], [12, 32500], [16, 39900]],
      cwuOs: 0.25, cwuCena: 4200, vat: 0.08
    }
  };

  var st = { tryb: 'pv', zuz: 4500, pokr: 100, dach: 'dachowka', kier: 1, mag: '0', opt: false, pow: 140, std: 'ocieplony', inst: 'podl', os: 4, cwu: true };

  function cards(boxId, name, items, sel, fmt) {
    $(boxId).innerHTML = items.map(function (it) {
      return '<label class="card"><input type="radio" name="' + name + '" value="' + it.id + '"' + (it.id === sel ? ' checked' : '') + '><span class="card-in"><b>' + it.nazwa + '</b><small>' + (fmt ? fmt(it) : it.opis) + '</small></span></label>';
    }).join('');
    $(boxId).addEventListener('change', function (e) { st[name] = e.target.value; render(); });
  }
  function bindRange(rid, nid, key, out) {
    var r = $(rid), n = nid ? $(nid) : null;
    r.value = st[key]; if (n) n.value = st[key]; F.rangeFill(r);
    r.addEventListener('input', function () { st[key] = +r.value; if (n) n.value = r.value; F.rangeFill(r); render(); });
    if (n) n.addEventListener('change', function () { var v = Math.min(+r.max, Math.max(+r.min, +n.value || +r.min)); st[key] = v; r.value = v; n.value = v; F.rangeFill(r); render(); });
  }
  function find(list, id) { return list.filter(function (x) { return x.id === id; })[0]; }

  function calcPV() {
    var dach = find(CENNIK.dach, st.dach), mag = find(CENNIK.mag, st.mag);
    var kier = dach.id === 'grunt' ? 1 : st.kier;
    var kwpPotrz = st.zuz * st.pokr / 100 / (CENNIK.uzysk * kier);
    var n = Math.max(6, Math.ceil(kwpPotrz * 1000 / CENNIK.panelW));
    var kwp = n * CENNIK.panelW / 1000;
    var stawka = CENNIK.zlKwp.filter(function (s) { return kwp <= s[0]; })[0][1];
    var inst = kwp * stawka * dach.mn;
    var opt = st.opt ? n * CENNIK.optPanel : 0;
    var netto = inst + mag.cena + opt;
    var prod = kwp * CENNIK.uzysk * kier;
    var auto = Math.min(prod * mag.auto, st.zuz);
    var osz = auto * CENNIK.cenaPradu + (prod - auto) * CENNIK.cenaOddania;
    var vat = netto * dach.vat;
    return {
      n: n, kwp: kwp, prod: prod, osz: osz, netto: netto, vat: vat, vatRate: dach.vat, brutto: netto + vat, zwrot: (netto + vat) / osz, grunt: dach.id === 'grunt',
      rows: [
        ['Instalacja ' + F.num(kwp, 2) + ' kWp', n + ' paneli po ' + CENNIK.panelW + ' W · ' + dach.nazwa.toLowerCase() + ' · falownik, montaż, zgłoszenie do sieci', inst],
        mag.cena ? [mag.nazwa, 'z montażem i konfiguracją', mag.cena] : null,
        opt ? ['Optymalizatory mocy', n + ' szt. × ' + F.zl(CENNIK.optPanel), opt] : null
      ].filter(Boolean)
    };
  }
  function calcHP() {
    var std = find(CENNIK.hp.std, st.std), inst = find(CENNIK.hp.inst, st.inst);
    var zap = st.pow * std.w / 1000 + st.os * CENNIK.hp.cwuOs;
    var max = CENNIK.hp.modele[CENNIK.hp.modele.length - 1];
    var szt = zap > max[0] ? Math.ceil(zap / max[0]) : 1;
    var model = szt > 1 ? max : CENNIK.hp.modele.filter(function (m) { return m[0] >= zap; })[0];
    var pompa = model[1] * inst.mn * szt;
    var cwu = st.cwu ? CENNIK.hp.cwuCena : 0;
    var netto = pompa + cwu, vat = netto * CENNIK.hp.vat;
    return {
      zap: zap, model: model[0], szt: szt, netto: netto, vat: vat, vatRate: CENNIK.hp.vat, brutto: netto + vat, za_mala: szt > 1,
      rows: [
        [(szt > 1 ? szt + ' × ' : '') + 'Pompa ciepła ' + model[0] + ' kW' + (szt > 1 ? ' (kaskada)' : ''), 'powietrze–woda z montażem i uruchomieniem · ' + inst.nazwa.toLowerCase(), pompa],
        cwu ? ['Zasobnik ciepłej wody 250 l', 'dla ' + st.os + ' os.', cwu] : null
      ].filter(Boolean)
    };
  }

  function svgPV(r) {
    var g = '<rect width="640" height="340" fill="#eaf3f7"/><circle cx="560" cy="62" r="26" fill="#f7c948"/><rect y="282" width="640" height="58" fill="#cfe3c3"/>';
    if (r.grunt) {
      g += '<rect x="40" y="170" width="200" height="112" fill="#f4efe6" stroke="#cbbfae"/><path d="M28 172 140 104 252 172Z" fill="#8a5a44"/><rect x="118" y="222" width="42" height="60" fill="#6b4a3a"/>';
      var cols = Math.min(10, r.n), rows = Math.ceil(r.n / cols), pw = 30, ph = 18;
      for (var i = 0; i < r.n && i < 40; i++) {
        var c = i % cols, rr = Math.floor(i / cols), x = 300 + c * (pw + 4), y = 250 - rr * (ph + 6);
        g += '<rect x="' + x + '" y="' + y + '" width="' + pw + '" height="' + ph + '" rx="2" fill="#1f3554" stroke="#93a9c4" stroke-width="1"/><line x1="' + (x + pw / 2) + '" y1="' + (y + ph) + '" x2="' + (x + pw / 2) + '" y2="282" stroke="#7a7a7a" stroke-width="2"/>';
      }
      return g;
    }
    g += '<rect x="120" y="170" width="400" height="112" fill="#f4efe6" stroke="#cbbfae"/><rect x="290" y="216" width="56" height="66" fill="#6b4a3a"/><rect x="160" y="200" width="70" height="46" fill="#cfe3ef" stroke="#9fb5c3"/><rect x="410" y="200" width="70" height="46" fill="#cfe3ef" stroke="#9fb5c3"/>';
    var roof = st.dach === 'plaski' ? '<rect x="110" y="150" width="420" height="22" fill="#7d7f84"/>' : '<path d="M96 172 170 84 470 84 544 172Z" fill="' + (st.dach === 'blacha' ? '#5d6670' : '#8a5a44') + '"/>';
    g += roof;
    var maxCols = 12, colsP = Math.min(maxCols, Math.ceil(Math.sqrt(r.n * 2.4))), rowsP = Math.ceil(r.n / colsP);
    var areaW = 330, areaH = st.dach === 'plaski' ? 46 : 74, pw2 = Math.min(26, (areaW - (colsP - 1) * 3) / colsP), ph2 = Math.min(18, (areaH - (rowsP - 1) * 3) / rowsP);
    var x0 = 320 - (colsP * pw2 + (colsP - 1) * 3) / 2, y0 = st.dach === 'plaski' ? 98 : 92;
    for (var k = 0; k < r.n; k++) {
      var cc = k % colsP, rw = Math.floor(k / colsP);
      var px = x0 + cc * (pw2 + 3), py = y0 + rw * (ph2 + 3);
      if (st.dach !== 'plaski') px += (rw * ((areaH - ph2) / Math.max(1, rowsP)) * 0) ;
      g += '<rect x="' + px.toFixed(1) + '" y="' + py.toFixed(1) + '" width="' + pw2.toFixed(1) + '" height="' + ph2.toFixed(1) + '" rx="1.5" fill="#1f3554" stroke="#93a9c4" stroke-width="0.8"/>';
    }
    if (st.mag !== '0') g += '<rect x="534" y="226" width="34" height="56" rx="4" fill="#fff" stroke="#a5470c" stroke-width="2"/><path d="M546 240h10M551 235v10M546 262h10" stroke="#a5470c" stroke-width="2.4" stroke-linecap="round"/>';
    return g;
  }
  function svgHP(r) {
    var g = '<rect width="640" height="340" fill="#eaf3f7"/><rect y="282" width="640" height="58" fill="#cfe3c3"/>';
    g += '<rect x="120" y="150" width="360" height="132" fill="#f4efe6" stroke="#cbbfae"/><path d="M100 152 300 64 500 152Z" fill="#8a5a44"/><rect x="270" y="212" width="56" height="70" fill="#6b4a3a"/><rect x="160" y="190" width="70" height="46" fill="#cfe3ef" stroke="#9fb5c3"/><rect x="370" y="190" width="70" height="46" fill="#cfe3ef" stroke="#9fb5c3"/>';
    var w = 70 + r.model * 3;
    g += '<rect x="500" y="' + (282 - 64) + '" width="' + w + '" height="62" rx="6" fill="#fff" stroke="#9aa3ab" stroke-width="2"/><circle cx="' + (500 + w * 0.38) + '" cy="250" r="22" fill="#eef2f4" stroke="#9aa3ab" stroke-width="2"/><path d="M' + (500 + w * 0.38) + ' 230v40M' + (500 + w * 0.38 - 20) + ' 250h40" stroke="#b6bec5" stroke-width="2"/><text x="' + (500 + w * 0.8) + '" y="256" font-size="15" font-weight="700" fill="#a5470c" text-anchor="middle" font-family="system-ui">' + r.model + ' kW</text>';
    g += '<path d="M480 260 C 490 260 492 258 500 258" stroke="#a5470c" stroke-width="3" fill="none"/>';
    for (var i = 0; i < 3; i++) g += '<path d="M' + (200 + i * 70) + ' 140 q 10 -14 0 -28 q -10 -14 0 -28" stroke="#e08a4f" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>';
    if (st.cwu) g += '<rect x="440" y="196" width="26" height="60" rx="10" fill="#fff" stroke="#a5470c" stroke-width="2"/>';
    return g;
  }

  function render() {
    document.body.className = 'mode-' + st.tryb;
    var r = st.tryb === 'pv' ? calcPV() : calcHP();
    $('rozbicie').innerHTML = r.rows.map(function (x) { return '<tr><th scope="row">' + x[0] + '<small>' + x[1] + '</small></th><td>' + F.zl(x[2]) + '</td></tr>'; }).join('');
    $('t-netto').textContent = F.zl(r.netto); $('t-vat-l').textContent = 'VAT ' + Math.round(r.vatRate * 100) + '%'; $('t-vat').textContent = F.zl(r.vat); $('t-brutto').textContent = F.zl(r.brutto);
    $('cena-netto').textContent = F.zl(r.netto); $('cena-brutto').textContent = F.zl(r.brutto);
    if (st.tryb === 'pv') {
      $('zuz-info').innerHTML = 'To ok. <b>' + F.zl(st.zuz * CENNIK.cenaPradu / 12) + '</b> miesięcznie za prąd (przy ' + F.num(CENNIK.cenaPradu, 2) + ' zł/kWh).';
      $('pokr-out').textContent = st.pokr + '%';
      $('k-moc').textContent = F.num(r.kwp, 2) + ' kWp'; $('k-panele').textContent = r.n + ' paneli po ' + CENNIK.panelW + ' W';
      $('k-prod').textContent = F.num(Math.round(r.prod / 10) * 10) + ' kWh';
      $('k-zwrot').textContent = F.num(r.zwrot, 1) + ' lat'; $('k-osz').textContent = 'oszczędność ok. ' + F.zl(r.osz) + ' rocznie';
      $('scena').innerHTML = '<title id="scena-opis">Schemat domu z ' + r.n + ' panelami fotowoltaicznymi</title>' + svgPV(r);
      $('scena-cap').textContent = r.n + ' paneli · ' + F.num(r.kwp, 2) + ' kWp' + (st.mag !== '0' ? ' · magazyn ' + st.mag + ' kWh' : '') + ' · rozmieszczenie poglądowe';
      $('nota').textContent = 'Cena i zwrot orientacyjne, na podstawie przykładowego cennika i średnich warunków. VAT 8% dotyczy montażu na budynku mieszkalnym do 300 m²; instalacja na gruncie — 23%. Stawkę VAT dla magazynu energii potwierdzamy przy ofercie. Ostateczna oferta po bezpłatnych oględzinach.';
      $('zalozenia').innerHTML = [
        'Uzysk: ' + F.num(CENNIK.uzysk) + ' kWh z 1 kWp rocznie przy dachu na południe, mniej dla innych kierunków.',
        'Cena za kWp maleje z mocą: od ' + F.zl(CENNIK.zlKwp[0][1]) + ' do ' + F.zl(CENNIK.zlKwp[3][1]) + ' netto.',
        'Oszczędność: energia zużyta na miejscu po ' + F.num(CENNIK.cenaPradu, 2) + ' zł/kWh, oddana do sieci po ok. ' + F.num(CENNIK.cenaOddania, 2) + ' zł/kWh.',
        'Dotacje i ulga termomodernizacyjna nie są wliczone; sprawdzamy je przy ofercie.'
      ].map(function (s) { return '<li>' + s + '</li>'; }).join('');
      $('opt-opis').textContent = '— ' + F.zl(CENNIK.optPanel) + ' na panel, przy zacienieniu';
    } else {
      $('os-out').textContent = st.os;
      $('k-zap').textContent = F.num(r.zap, 1) + ' kW'; $('k-model').textContent = (r.szt > 1 ? r.szt + ' × ' : '') + r.model + ' kW';
      $('k-cwu').textContent = st.cwu ? '250 l' : 'brak'; $('k-cwu-s').textContent = st.cwu ? 'dla ' + st.os + ' os.' : 'ciepła woda z innego źródła';
      $('scena').innerHTML = '<title id="scena-opis">Schemat domu z pompą ciepła ' + r.model + ' kW</title>' + svgHP(r);
      $('scena-cap').textContent = 'Pompa ' + r.model + ' kW dla ' + st.pow + ' m²' + (r.za_mala ? ' · ' + r.szt + ' pompy w kaskadzie (zapotrzebowanie powyżej największego modelu)' : '') + ' · schemat poglądowy';
      $('nota').textContent = 'Cena orientacyjna, na podstawie przykładowego cennika. Dokładną moc pompy ustalamy po audycie budynku. Dotacje nie są wliczone; sprawdzamy je przy ofercie.';
      $('zalozenia').innerHTML = [
        'Zapotrzebowanie na ciepło: powierzchnia × wskaźnik dla standardu ocieplenia (40–90 W/m²).',
        'Ciepła woda: ok. ' + F.num(CENNIK.hp.cwuOs, 2) + ' kW na osobę.',
        'Dobieramy najmniejszy model z mocą nie niższą niż zapotrzebowanie: 6, 8, 10, 12 lub 16 kW.',
        'VAT 8% przy montażu w budynku mieszkalnym do 300 m²; dla większych domów część kwoty ma stawkę 23% — liczymy ją w ofercie, dlatego kalkulator obejmuje domy do 300 m².'
      ].map(function (s) { return '<li>' + s + '</li>'; }).join('');
      $('cwu-opis').textContent = '— ' + F.zl(CENNIK.hp.cwuCena) + ' netto';
    }
  }

  function summary() {
    var r = st.tryb === 'pv' ? calcPV() : calcHP();
    var head = st.tryb === 'pv'
      ? [['Instalacja', 'Fotowoltaika ' + F.num(r.kwp, 2) + ' kWp'], ['Zużycie', F.num(st.zuz) + ' kWh rocznie'], ['Produkcja', 'ok. ' + F.num(Math.round(r.prod / 10) * 10) + ' kWh rocznie'], ['Zwrot', 'ok. ' + F.num(r.zwrot, 1) + ' lat']]
      : [['Instalacja', (r.szt > 1 ? r.szt + ' × ' : '') + 'pompa ciepła ' + r.model + ' kW'], ['Budynek', st.pow + ' m², ' + find(CENNIK.hp.std, st.std).nazwa.toLowerCase()], ['Zapotrzebowanie', F.num(r.zap, 1) + ' kW']];
    return { head: head, rows: r.rows.map(function (x) { return [x[0], x[1], F.zl(x[2])]; }),
      totals: [['Razem netto', F.zl(r.netto)], ['VAT ' + Math.round(r.vatRate * 100) + '%', F.zl(r.vat)], ['Razem brutto', F.zl(r.brutto), true]],
      notes: [$('nota').textContent] };
  }

  cards('dach', 'dach', CENNIK.dach, st.dach);
  cards('mag', 'mag', CENNIK.mag, st.mag);
  cards('std', 'std', CENNIK.hp.std, st.std);
  cards('inst', 'inst', CENNIK.hp.inst, st.inst);
  bindRange('zuz', 'zuz-n', 'zuz'); bindRange('pokr', null, 'pokr'); bindRange('pow', 'pow-n', 'pow'); bindRange('os', null, 'os');
  $('kier').addEventListener('change', function () { st.kier = +this.value; render(); });
  $('opt').addEventListener('change', function () { st.opt = this.checked; render(); });
  $('cwu').addEventListener('change', function () { st.cwu = this.checked; render(); });
  ['pv', 'hp'].forEach(function (t) {
    $('tab-' + t).addEventListener('click', function () {
      st.tryb = t; $('tab-pv').setAttribute('aria-selected', t === 'pv'); $('tab-hp').setAttribute('aria-selected', t === 'hp'); render();
    });
  });
  document.querySelector('.tabs').addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    var next = st.tryb === 'pv' ? 'hp' : 'pv'; $('tab-' + next).click(); $('tab-' + next).focus();
  });
  render();
  DemoWycena.init({ brand: 'Heliovka', sub: 'fotowoltaika i pompy ciepła', color: '#a5470c', title: 'Wycena orientacyjna', fileName: 'heliovka-wycena',
    lead: 'Przygotujemy dokładną ofertę po bezpłatnych oględzinach. Do zapytania dołączamy podsumowanie PDF.', summary: summary, openButtons: [$('btn-wycena')] });
})();
