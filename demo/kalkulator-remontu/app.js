/* Murelio — kalkulator remontu (demo, cennik przykładowy) */
(function () {
  'use strict';
  var F = window.DemoFmt, $ = function (id) { return document.getElementById(id); };

  // stawki: robocizna i materiał (standard) w zł za m²; ryczałty w zł
  var C = {
    malowanie: { n: 'Malowanie ścian i sufitu', rob: 18, mat: 7 },
    gladzie: { n: 'Gładzie gipsowe', rob: 30, mat: 8 },
    podloga: { n: 'Panele lub deska winylowa', rob: 40, mat: 70 },
    plytkiPodl: { n: 'Płytki na podłodze', rob: 120, mat: 90 },
    plytkiScian: { n: 'Płytki na ścianach', rob: 130, mat: 90 },
    demontaz: { n: 'Demontaż starych okładzin', rob: 25, mat: 0 },
    bialy: { n: 'Biały montaż i podejścia wod.-kan.', rob: 3200, mat: 0, ryczalt: true },
    gruz: 900, sprzatanie: 6, stawkaH: 60, ekipa: 2,
    std: [
      { id: 'eko', nazwa: 'Ekonomiczny', opis: 'materiały ×0,7', mn: 0.7 },
      { id: 'std', nazwa: 'Standard', opis: 'cena bazowa', mn: 1 },
      { id: 'prem', nazwa: 'Premium', opis: 'materiały ×1,8', mn: 1.8 }
    ],
    typy: { pokoj: 'Pokój', kuchnia: 'Kuchnia', lazienka: 'Łazienka', przedpokoj: 'Przedpokój' },
    prace: {
      pokoj: ['malowanie', 'gladzie', 'podloga', 'demontaz'],
      przedpokoj: ['malowanie', 'gladzie', 'podloga', 'demontaz'],
      kuchnia: ['malowanie', 'gladzie', 'plytkiPodl', 'plytkiScian', 'demontaz'],
      lazienka: ['malowanie', 'plytkiPodl', 'plytkiScian', 'bialy', 'demontaz']
    }
  };
  var COLORS = { pokoj: '#dfe3f7', przedpokoj: '#ece7dc', kuchnia: '#f3e5d6', lazienka: '#d8eef0' };
  var uid = 0;
  var st = {
    wys: 2.6, std: 'std', gruz: true, sprz: true, bezmat: false,
    rooms: [
      { id: ++uid, nazwa: 'Salon', typ: 'pokoj', d: 4.6, s: 3.8, p: { malowanie: true, gladzie: true, podloga: true } },
      { id: ++uid, nazwa: 'Kuchnia', typ: 'kuchnia', d: 3.0, s: 2.6, p: { malowanie: true, plytkiScian: true } },
      { id: ++uid, nazwa: 'Łazienka', typ: 'lazienka', d: 2.2, s: 1.8, p: { malowanie: true, plytkiPodl: true, plytkiScian: true, bialy: true, demontaz: true } }
    ]
  };

  function areas(r) {
    var podl = r.d * r.s, obw = 2 * (r.d + r.s);
    var scianyTil = r.typ === 'lazienka' ? obw * 2.2 * 0.9 : r.typ === 'kuchnia' ? 3 : 0;
    var scianyMal = obw * st.wys * 0.85;
    if (r.p.plytkiScian && r.typ === 'lazienka') scianyMal = 0;
    return { podl: podl, mal: scianyMal + podl, til: r.p.plytkiScian ? scianyTil : 0 };
  }
  function calcRoom(r) {
    var a = areas(r), mn = C.std.filter(function (x) { return x.id === st.std; })[0].mn, items = [], rob = 0, mat = 0;
    function add(key, m2) {
      var c = C[key], ro = c.ryczalt ? c.rob : c.rob * m2, ma = st.bezmat ? 0 : (c.ryczalt ? 0 : c.mat * m2 * mn);
      rob += ro; mat += ma;
      items.push({ n: c.n + (c.ryczalt ? '' : ' · ' + F.num(m2, 1) + ' m²'), v: ro + ma });
    }
    if (r.p.demontaz) add('demontaz', a.podl + a.til);
    if (r.p.gladzie) add('gladzie', a.mal);
    if (r.p.malowanie) add('malowanie', a.mal);
    if (r.p.podloga) add('podloga', a.podl);
    if (r.p.plytkiPodl) add('plytkiPodl', a.podl);
    if (r.p.plytkiScian && a.til) add('plytkiScian', a.til);
    if (r.p.bialy) add('bialy', 1);
    return { a: a, items: items, rob: rob, mat: mat, sum: rob + mat };
  }
  function calc() {
    var rooms = st.rooms.map(function (r) { return { r: r, c: calcRoom(r) }; });
    var rob = 0, mat = 0, podl = 0, mal = 0;
    rooms.forEach(function (x) { rob += x.c.rob; mat += x.c.mat; podl += x.c.a.podl; if (x.r.p.malowanie) mal += x.c.a.mal; });
    var dod = (st.gruz ? C.gruz : 0) + (st.sprz ? podl * C.sprzatanie : 0);
    var netto = rob + mat + dod;
    var dni = Math.max(1, Math.ceil(rob / C.stawkaH / (8 * C.ekipa)));
    return { rooms: rooms, rob: rob, mat: mat, dod: dod, netto: netto, vat: netto * 0.08, brutto: netto * 1.08, podl: podl, mal: mal, dni: dni };
  }

  function roomHtml(r) {
    var opts = Object.keys(C.typy).map(function (k) { return '<option value="' + k + '"' + (k === r.typ ? ' selected' : '') + '>' + C.typy[k] + '</option>'; }).join('');
    var checks = C.prace[r.typ].map(function (k) {
      return '<label class="check"><input type="checkbox" data-p="' + k + '"' + (r.p[k] ? ' checked' : '') + '><span>' + C[k].n + '</span></label>';
    }).join('');
    return '<div class="room" data-id="' + r.id + '">' +
      '<div class="room-head"><label class="sr-only" for="n' + r.id + '">Nazwa pomieszczenia</label><input class="inp" id="n' + r.id + '" data-f="nazwa" value="' + r.nazwa.replace(/"/g, '&quot;') + '" maxlength="24">' +
      '<label class="sr-only" for="t' + r.id + '">Rodzaj pomieszczenia</label><select id="t' + r.id + '" data-f="typ">' + opts + '</select>' +
      '<button type="button" class="del" data-del aria-label="Usuń pomieszczenie ' + r.nazwa.replace(/"/g, '&quot;') + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>' +
      '<div class="room-dims"><div><label for="d' + r.id + '">Długość (m)</label><input class="inp" id="d' + r.id + '" data-f="d" type="number" inputmode="decimal" min="1" max="15" step="0.1" value="' + r.d + '"></div>' +
      '<div><label for="s' + r.id + '">Szerokość (m)</label><input class="inp" id="s' + r.id + '" data-f="s" type="number" inputmode="decimal" min="1" max="15" step="0.1" value="' + r.s + '"></div></div>' +
      '<p class="room-area" data-area></p><div class="checks">' + checks + '</div></div>';
  }
  function drawRooms() {
    $('rooms').innerHTML = st.rooms.map(roomHtml).join('');
    $('add-room').disabled = st.rooms.length >= 6;
  }
  function roomById(id) { return st.rooms.filter(function (r) { return r.id === id; })[0]; }

  $('rooms').addEventListener('input', function (e) {
    var box = e.target.closest('.room'); if (!box) return;
    var r = roomById(+box.dataset.id), f = e.target.dataset.f;
    if (f === 'nazwa') r.nazwa = e.target.value || 'Pomieszczenie';
    if (f === 'd' || f === 's') { var v = parseFloat(String(e.target.value).replace(',', '.')); if (v >= 1 && v <= 15) r[f] = v; }
    render();
  });
  $('rooms').addEventListener('change', function (e) {
    var box = e.target.closest('.room'); if (!box) return;
    var r = roomById(+box.dataset.id);
    if (e.target.dataset.f === 'typ') { r.typ = e.target.value; var keep = {}; C.prace[r.typ].forEach(function (k) { if (r.p[k]) keep[k] = true; }); r.p = keep; drawRooms(); }
    if (e.target.dataset.p) r.p[e.target.dataset.p] = e.target.checked;
    render();
  });
  $('rooms').addEventListener('click', function (e) {
    var b = e.target.closest('[data-del]'); if (!b) return;
    if (st.rooms.length === 1) { F.toast('Kosztorys potrzebuje co najmniej jednego pomieszczenia.'); return; }
    var id = +b.closest('.room').dataset.id; st.rooms = st.rooms.filter(function (r) { return r.id !== id; });
    drawRooms(); render(); $('add-room').focus();
  });
  $('add-room').addEventListener('click', function () {
    if (st.rooms.length >= 6) return;
    st.rooms.push({ id: ++uid, nazwa: 'Pokój ' + (st.rooms.length + 1), typ: 'pokoj', d: 3.5, s: 3.0, p: { malowanie: true } });
    drawRooms(); render();
    var last = $('rooms').lastElementChild; last.querySelector('input').focus(); last.querySelector('input').select();
  });

  function svgPlan(c) {
    var W = 600, H = 250, gap = 10, total = c.rooms.reduce(function (s, x) { return s + x.r.d; }, 0) + gap / 40 * (c.rooms.length - 1);
    var maxS = Math.max.apply(null, c.rooms.map(function (x) { return x.r.s; }));
    var k = Math.min(W / (total || 1), H / maxS) * 0.98, x = 20 + (W - total * k) / 2, out = '<rect width="640" height="300" fill="#fbfbfd"/>';
    out += '<defs><pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#eef0f6"/></pattern></defs><rect width="640" height="300" fill="url(#g)"/>';
    c.rooms.forEach(function (it) {
      var w = it.r.d * k, h = it.r.s * k, y = 150 - h / 2;
      out += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + h.toFixed(1) + '" fill="' + COLORS[it.r.typ] + '" stroke="#3f4a8a" stroke-width="3"/>';
      var fs = Math.max(10, Math.min(15, w / 7));
      out += '<text x="' + (x + w / 2).toFixed(1) + '" y="' + (150 - 4).toFixed(1) + '" font-size="' + fs.toFixed(0) + '" font-weight="700" text-anchor="middle" fill="#1b1e21" font-family="system-ui">' + esc(it.r.nazwa) + '</text>';
      out += '<text x="' + (x + w / 2).toFixed(1) + '" y="' + (150 + fs).toFixed(1) + '" font-size="' + (fs - 2).toFixed(0) + '" text-anchor="middle" fill="#5a6168" font-family="system-ui">' + F.num(it.c.a.podl, 1) + ' m²</text>';
      x += w + gap;
    });
    return out;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function render() {
    var c = calc();
    Array.prototype.forEach.call(document.querySelectorAll('.room'), function (box) {
      var it = c.rooms.filter(function (x) { return x.r.id === +box.dataset.id; })[0];
      box.querySelector('[data-area]').textContent = 'Podłoga ' + F.num(it.c.a.podl, 1) + ' m² · koszt ' + F.zl(it.c.sum) + ' netto';
    });
    $('rozbicie').innerHTML = c.rooms.map(function (x) {
      return '<tr><th scope="row">' + esc(x.r.nazwa) + ' <span class="muted">· ' + F.num(x.r.d, 1) + ' × ' + F.num(x.r.s, 1) + ' m</span><small>' + (x.c.items.map(function (i) { return esc(i.n); }).join('; ') || 'nie zaznaczono prac') + '</small></th><td>' + F.zl(x.c.sum) + '</td></tr>';
    }).join('') + (c.dod ? '<tr><th scope="row">Dodatkowo<small>' + [st.gruz ? 'wywóz gruzu' : '', st.sprz ? 'sprzątanie ' + F.num(c.podl, 1) + ' m²' : ''].filter(Boolean).join('; ') + '</small></th><td>' + F.zl(c.dod) + '</td></tr>' : '');
    $('t-netto').textContent = F.zl(c.netto); $('t-vat').textContent = F.zl(c.vat); $('t-brutto').textContent = F.zl(c.brutto);
    $('cena-netto').textContent = F.zl(c.netto); $('cena-brutto').textContent = F.zl(c.brutto);
    $('k-podl').textContent = F.num(c.podl, 1) + ' m²'; $('k-pom').textContent = c.rooms.length + ' ' + (c.rooms.length === 1 ? 'pomieszczenie' : c.rooms.length < 5 ? 'pomieszczenia' : 'pomieszczeń');
    $('k-sciany').textContent = F.num(c.mal, 0) + ' m²'; $('k-czas').textContent = 'ok. ' + c.dni + ' ' + (c.dni === 1 ? 'dzień' : 'dni');
    var tot = c.netto || 1;
    $('bar-rob').style.width = (c.rob / tot * 100) + '%'; $('bar-mat').style.width = (c.mat / tot * 100) + '%'; $('bar-dod').style.width = (c.dod / tot * 100) + '%';
    $('legenda').innerHTML = '<span><i style="background:var(--acc)"></i>Robocizna ' + F.zl(c.rob) + '</span><span><i style="background:#a9b0dd"></i>Materiały ' + F.zl(c.mat) + '</span><span><i style="background:#d9dcef"></i>Dodatkowo ' + F.zl(c.dod) + '</span>';
    $('rzut').innerHTML = '<title id="rzut-t">Schematyczny rzut: ' + c.rooms.map(function (x) { return x.r.nazwa; }).join(', ') + '</title>' + svgPlan(c);
    $('rzut-cap').textContent = 'Rzut poglądowy w skali · łącznie ' + F.num(c.podl, 1) + ' m² podłóg';
    $('wys-out').textContent = F.num(st.wys, 1) + ' m';
    $('gruz-o').textContent = '— ' + F.zl(C.gruz); $('sprz-o').textContent = '— ' + F.zl(C.sprzatanie) + ' za m² podłogi';
  }

  function summary() {
    var c = calc(), stdN = C.std.filter(function (x) { return x.id === st.std; })[0].nazwa;
    return {
      head: [['Zakres', c.rooms.length + ' pom., ' + F.num(c.podl, 1) + ' m² podłóg'], ['Standard', stdN + (st.bezmat ? ' (materiały klienta)' : '')], ['Czas prac', 'ok. ' + c.dni + ' dni roboczych']],
      rows: c.rooms.map(function (x) { return [x.r.nazwa + ' · ' + F.num(x.r.d, 1) + ' × ' + F.num(x.r.s, 1) + ' m', x.c.items.map(function (i) { return i.n + ' ' + F.zl(i.v); }).join('; ') || 'bez prac', F.zl(x.c.sum)]; })
        .concat(c.dod ? [['Dodatkowo', [st.gruz ? 'wywóz gruzu ' + F.zl(C.gruz) : '', st.sprz ? 'sprzątanie ' + F.zl(c.podl * C.sprzatanie) : ''].filter(Boolean).join('; '), F.zl(c.dod)]] : []),
      totals: [['Robocizna', F.zl(c.rob)], ['Materiały', F.zl(c.mat)], ['Razem netto', F.zl(c.netto)], ['VAT 8%', F.zl(c.vat)], ['Razem brutto', F.zl(c.brutto), true]],
      notes: ['Kosztorys orientacyjny na podstawie przykładowego cennika. VAT 8% dotyczy remontu lokalu mieszkalnego do 150 m² lub domu do 300 m²; przy większej powierzchni część kwoty ma stawkę 23%. Dokładną wycenę przygotujemy po bezpłatnym pomiarze.']
    };
  }

  $('std').innerHTML = C.std.map(function (s) { return '<label class="card"><input type="radio" name="std" value="' + s.id + '"' + (s.id === st.std ? ' checked' : '') + '><span class="card-in"><b>' + s.nazwa + '</b><small>' + s.opis + '</small></span></label>'; }).join('');
  $('std').addEventListener('change', function (e) { st.std = e.target.value; render(); });
  var wys = $('wys'); F.rangeFill(wys); wys.addEventListener('input', function () { st.wys = +wys.value; F.rangeFill(wys); render(); });
  ['gruz', 'sprz', 'bezmat'].forEach(function (k) { $(k).addEventListener('change', function () { st[k] = this.checked; render(); }); });
  $('zalozenia').innerHTML = [
    'Ściany: obwód × wysokość, minus ok. 15% na okna i drzwi; sufit liczony razem ze ścianami.',
    'Robocizna i materiały w zł za m², np. malowanie ' + C.malowanie.rob + ' + ' + C.malowanie.mat + ' zł, płytki na podłodze ' + C.plytkiPodl.rob + ' + ' + C.plytkiPodl.mat + ' zł (standard).',
    'Łazienka: płytki ścienne do wysokości 2,2 m; kuchnia: pas płytek ok. 3 m².',
    'Czas prac: robocizna ÷ ' + C.stawkaH + ' zł/h ÷ 8 h ÷ ekipa ' + C.ekipa + '-osobowa.'
  ].map(function (s) { return '<li>' + s + '</li>'; }).join('');
  drawRooms(); render();
  DemoWycena.init({ brand: 'Murelio', sub: 'remonty i wykończenia wnętrz', color: '#3f4a8a', title: 'Kosztorys orientacyjny', fileName: 'murelio-kosztorys',
    lead: 'Pobierz kosztorys PDF. W wersji produkcyjnej trafia on też do firmy, która oddzwania z terminem pomiaru.', summary: summary, openButtons: [$('btn-wycena')] });
})();
