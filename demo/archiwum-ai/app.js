/*
 * Archiwum AI — demo interfejsu. Odpowiedzi są przygotowane wcześniej i dobierane po słowach kluczowych.
 * Brak modelu AI, serwera, cookies i zapytań sieciowych. Dane: dane.js (fikcyjne).
 */
(function () {
  'use strict';
  var A = window.ARCH;
  var $ = function (id) { return document.getElementById(id); };
  var LANG = { PL: 'polski', DE: 'niemiecki', EN: 'angielski' };
  var LANG_GEN = { PL: 'polskim', DE: 'niemieckim', EN: 'angielskim' };
  var DOC = {}; A.DOCS.forEach(function (d) { DOC[d.id] = d; });

  var state = { role: 'prawny', src: 'all', min: 2 * 60 + 0, log: [] };
  var CLOCK0 = 8 * 60; // 08:00 w dniu demo

  /* ---------- pomocnicze ---------- */
  function user() { return A.USERS[state.role]; }
  function can(id) {
    var d = DOC[id]; if (!d) return false;
    var u = user();
    return d.dept.some(function (x) { return u.depts.indexOf(x) !== -1; });
  }
  function visibleDocs() { return A.DOCS.filter(function (d) { return can(d.id); }); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l').replace(/[^a-z0-9 \-]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function hhmm(m) { var h = Math.floor(m / 60) % 24, mm = m % 60; return (h < 10 ? '0' : '') + h + ':' + (mm < 10 ? '0' : '') + mm; }
  function unit(d) { return d.unit || 'str.'; }
  function citeLabel(id, page) { var d = DOC[id]; return '[' + d.file + ', ' + unit(d) + ' ' + page + ']'; }
  function parseCite(s) { var p = s.split(':'); return { id: p[0], page: +p[1], para: p[2] }; }

  /* tekst z **pogrubieniami** i {{D01:4:b}} → węzły DOM; cytaty do niedostępnych dokumentów są pomijane */
  function rich(target, str, used) {
    var seen = {};
    String(str).split(/(\{\{D\d\d:\d+:\w+\}\}|\*\*[^*]+\*\*)/).forEach(function (part) {
      if (!part) return;
      var m = part.match(/^\{\{(D\d\d:\d+:\w+)\}\}$/);
      if (m) {
        var c = parseCite(m[1]);
        if (!can(c.id) || seen[c.id + ':' + c.page]) {
          var lt = target.lastChild; if (lt && lt.nodeType === 3) lt.nodeValue = lt.nodeValue.replace(/\s+$/, '');
          return;
        }
        seen[c.id + ':' + c.page] = 1;
        if (used && used.indexOf(c.id) === -1) used.push(c.id);
        target.appendChild(document.createTextNode(' '));
        target.appendChild(citeBtn(c));
        return;
      }
      if (/^\*\*[^*]+\*\*$/.test(part)) { target.appendChild(el('strong', null, part.slice(2, -2))); return; }
      target.appendChild(document.createTextNode(part));
    });
    return target;
  }
  function citeBtn(c) {
    var b = el('button', 'cite', citeLabel(c.id, c.page));
    b.type = 'button';
    b.setAttribute('aria-label', 'Otwórz źródło: ' + DOC[c.id].file + ', ' + (unit(DOC[c.id]) === 'ark.' ? 'arkusz ' : 'strona ') + c.page);
    b.addEventListener('click', function () { openDoc(c.id, c.page, c.para); });
    return b;
  }

  /* ---------- dziennik dostępu ---------- */
  function tick() { state.min += 1; return hhmm(CLOCK0 + state.min); }
  function logAdd(who, action, target, kind) {
    state.log.unshift({ t: tick(), who: who, action: action, target: target || '', kind: kind || '' });
    if (state.log.length > 40) state.log.pop();
    renderLog();
  }
  function renderLog() {
    var ol = $('dziennik'); ol.textContent = '';
    state.log.forEach(function (e) {
      var li = el('li', e.kind ? 'lg-' + e.kind : null);
      li.appendChild(el('time', null, e.t));
      var b = el('div');
      b.appendChild(el('b', null, e.who));
      b.appendChild(document.createTextNode(' · ' + e.action));
      if (e.target) b.appendChild(el('span', 'lg-t', e.target));
      li.appendChild(b); ol.appendChild(li);
    });
  }

  /* ---------- panel: uprawnienia ---------- */
  function renderRole() {
    var u = user(), n = visibleDocs().length;
    $('rola-info').textContent = u.name + ' widzi ' + n + ' z ' + A.DOCS.length + ' dokumentów.' +
      (state.role === 'zakupy' ? ' Sprawa Tervanik, zapytanie Loftmere i protokoły zarządu są dla niego niewidoczne — asystent też ich nie użyje.' : ' Pełny dostęp: zarząd, dział prawny, zakupy i sprzedaż.');
    $('who-name').textContent = u.name;
    $('who-role').textContent = u.role;
  }

  /* ---------- panel: źródła i dokumenty ---------- */
  function renderSources() {
    var docs = visibleDocs(), wrap = $('zrodla'); wrap.textContent = '';
    var items = [['all', 'Wszystkie źródła', '', docs.length]];
    Object.keys(A.SRC).forEach(function (k) { items.push([k, A.SRC[k].name, A.SRC[k].hint, docs.filter(function (d) { return d.src === k; }).length]); });
    items.forEach(function (it) {
      var b = el('button', 'src-btn src-' + it[0]); b.type = 'button';
      b.setAttribute('aria-pressed', String(state.src === it[0]));
      var ic = el('span', 'src-ic'); ic.setAttribute('aria-hidden', 'true'); ic.innerHTML = ICONS[it[0]];
      var tx = el('span', 'src-tx'); tx.appendChild(el('span', 'src-n', it[1])); if (it[2]) tx.appendChild(el('small', null, it[2]));
      b.appendChild(ic); b.appendChild(tx); b.appendChild(el('span', 'src-c', String(it[3])));
      b.addEventListener('click', function () { state.src = it[0]; renderSources(); renderDocs(); });
      wrap.appendChild(b);
    });
    var langs = {}; docs.forEach(function (d) { langs[d.lang] = 1; });
    var dups = docs.filter(function (d) { return d.dup; }).length;
    $('indeks').textContent = docs.length + ' dokumentów w indeksie · ' + Object.keys(langs).length + ' ' + (Object.keys(langs).length === 1 ? 'język' : 'języki') + ' · ' + dups + ' ' + (dups === 1 ? 'duplikat scalony' : 'duplikaty scalone');
  }
  function renderDocs() {
    var ul = $('dokumenty'); ul.textContent = '';
    var list = visibleDocs().filter(function (d) { return state.src === 'all' || d.src === state.src; });
    $('dok-t').textContent = 'Dokumenty (' + list.length + ')';
    list.forEach(function (d) {
      var li = el('li'), b = el('button', 'doc-btn'); b.type = 'button';
      var ic = el('span', 'ft ft-' + d.type.toLowerCase(), d.type); ic.setAttribute('aria-hidden', 'true');
      var tx = el('span', 'doc-tx');
      tx.appendChild(el('span', 'doc-f', d.file));
      var meta = el('span', 'doc-m');
      meta.appendChild(el('span', 'lang', d.lang));
      meta.appendChild(document.createTextNode(d.type + ' · ' + d.pages + ' ' + (d.unit || 'str.') + ' · ' + d.date));
      if (d.ocr) meta.appendChild(el('span', 'ocr', 'OCR'));
      tx.appendChild(meta);
      b.setAttribute('aria-label', d.file + ', ' + d.type + ', język ' + LANG[d.lang] + ', ' + d.pages + ' ' + (d.unit === 'ark.' ? 'arkusz' : 'str.') + (d.ocr ? ', skan rozpoznany przez OCR' : ''));
      b.appendChild(ic); b.appendChild(tx);
      b.addEventListener('click', function () { openDoc(d.id); });
      li.appendChild(b); ul.appendChild(li);
    });
  }

  /* ---------- panel: terminy i poranne podsumowanie ---------- */
  function visTerms() { return A.TERMS.filter(function (t) { return can(parseCite(t.cite).id); }); }
  function renderTerms() {
    var ul = $('terminy'); ul.textContent = '';
    var ts = visTerms();
    [['Ten tydzień · 16–20.11', ts.filter(function (t) { return t.week; })], ['Później', ts.filter(function (t) { return !t.week; })]].forEach(function (g) {
      if (!g[1].length) return;
      ul.appendChild(el('li', 'tg', g[0]));
      g[1].forEach(function (t) {
        var li = el('li', 'term' + (t.urgent ? ' urgent' : '') + (t.week ? ' wk' : ''));
        var dt = el('span', 'term-d'); dt.appendChild(el('b', null, t.d)); dt.appendChild(el('small', null, t.y));
        var bd = el('div', 'term-b'); bd.appendChild(el('span', 'term-w', t.what));
        if (t.urgent) bd.appendChild(el('span', 'pill-u', 'pilne'));
        bd.appendChild(citeBtn(parseCite(t.cite)));
        li.appendChild(dt); li.appendChild(bd); ul.appendChild(li);
      });
    });
  }
  function morningBlocks() {
    var wk = visTerms().filter(function (t) { return t.week; });
    var urgent = wk.filter(function (t) { return t.urgent; })[0];
    var items = [];
    var first = '**' + wk.length + ' ' + (wk.length === 1 ? 'termin' : 'terminy') + ' w tym tygodniu**';
    if (urgent) first += ', najpilniejszy: odpowiedź na pozew w sprawie Tervanik — pt. 20.11 {{' + urgent.cite + '}}';
    else if (wk.length) first += ': ' + wk.map(function (t) { return t.what.charAt(0).toLowerCase() + t.what.slice(1) + ' (' + t.d + ') {{' + t.cite + '}}'; }).join('; ');
    items.push(first);
    if (can('D02')) items.push('Kessbrand zapowiada podwyżkę cen motoreduktorów średnio o 8,5% od 2027 r. (pismo po niemiecku) {{D02:1:c}}');
    if (can('D11')) items.push('Loftmere prosi o ofertę na 1200 zaworów ZK-200 do śr. 18.11 (e-mail po angielsku) {{D11:1:c}}');
    if (can('D03')) items.push('Dostawa zamówienia 4471 opóźniona do 7–11.12; 40 szt. możliwe wcześniej {{D03:1:b}}');
    return items;
  }
  function renderMorning() {
    var u = user();
    $('poranne-kto').textContent = 'Dla: ' + u.name + ' · pon. 16.11.2026, 07:35';
    var ul = $('poranne'); ul.textContent = '';
    morningBlocks().forEach(function (s) { ul.appendChild(rich(el('li'), s)); });
  }

  /* ---------- podgląd dokumentu ---------- */
  var viewer = $('podglad');
  function openDoc(id, page, para) {
    if (!can(id)) { toast('Brak uprawnień do tego dokumentu.'); return; }
    var d = DOC[id], body = $('pg-body'); body.textContent = '';
    $('pg-title').textContent = d.file;
    var meta = $('pg-meta'); meta.textContent = '';
    meta.appendChild(el('span', 'ft ft-' + d.type.toLowerCase(), d.type));
    meta.appendChild(el('span', 'chip-m', 'język: ' + LANG[d.lang]));
    meta.appendChild(el('span', 'chip-m', d.pages + ' ' + unit(d)));
    if (d.ocr) meta.appendChild(el('span', 'ocr', 'OCR · ' + d.ocr));
    $('pg-path').textContent = 'Lokalizacja: ' + d.path;

    if (d.lang !== 'PL') body.appendChild(el('p', 'pg-note', 'Dokument w języku ' + LANG_GEN[d.lang] + '. Asystent znajduje go także po pytaniu zadanym po polsku (wyszukiwanie wielojęzyczne) i odpowiada po polsku, cytując oryginał.'));
    if (d.dup) body.appendChild(el('p', 'pg-note dup', d.dup));

    var ent = el('section', 'pg-ent'); ent.setAttribute('aria-label', 'Dane wyodrębnione z dokumentu');
    ent.appendChild(el('h3', null, 'Wyodrębnione do bazy wiedzy'));
    var dl = el('dl');
    d.ent.forEach(function (e) { dl.appendChild(el('dt', null, e[0])); dl.appendChild(el('dd', null, e[1])); });
    if (d.sprawa) { dl.appendChild(el('dt', null, 'Sprawa')); dl.appendChild(el('dd', null, A.SPRAWY[d.sprawa])); }
    ent.appendChild(dl);
    var rel = A.DOCS.filter(function (x) { return x.sprawa && x.sprawa === d.sprawa && x.id !== d.id && can(x.id); });
    if (rel.length) {
      var rp = el('div', 'pg-rel'); rp.appendChild(el('span', null, 'Powiązane w tej sprawie: '));
      rel.forEach(function (x) { var b = el('button', 'rel-btn', x.file); b.type = 'button'; b.addEventListener('click', function () { openDoc(x.id); }); rp.appendChild(b); });
      ent.appendChild(rp);
    }
    body.appendChild(ent);

    var paper = el('div', 'paper' + (d.ocr ? ' scan' : '') + ' pt-' + d.type.toLowerCase());
    if (d.ocr) { var ob = el('span', 'scan-badge', 'Skan · tekst rozpoznany przez OCR (' + d.ocr + ')'); paper.appendChild(ob); }
    d.body.forEach(function (pg) {
      var sec = el('section', 'pg-page');
      sec.appendChild(el('h4', 'pg-n', (pg.sheet ? 'Arkusz ' + pg.n + ': ' + pg.sheet : 'Strona ' + pg.n + ' z ' + d.pages)));
      if (pg.h) {
        var hd = el('dl', 'mail-h');
        pg.h.forEach(function (h) { hd.appendChild(el('dt', null, h[0])); hd.appendChild(el('dd', null, h[1])); });
        sec.appendChild(hd);
      }
      (pg.p || []).forEach(function (p) {
        var e = el('p', 'para', p[1]); e.id = d.id + '-' + pg.n + '-' + p[0]; e.tabIndex = -1;
        if (d.type === 'ICS') e.className += ' ev';
        if (/^\[pieczęć\]/.test(p[1])) { e.className += ' stamp'; e.textContent = p[1].replace('[pieczęć] ', ''); }
        sec.appendChild(e);
      });
      if (pg.table) {
        var sc = el('div', 'tbl-wrap'), tb = el('table', 'xls');
        var cap = el('caption', 'sr-only', 'Arkusz ' + pg.sheet); tb.appendChild(cap);
        var th = el('thead'), tr = el('tr'); tr.appendChild(el('th', 'rn', ''));
        pg.table.head.forEach(function (h) { var c = el('th', null, h); c.scope = 'col'; tr.appendChild(c); }); th.appendChild(tr); tb.appendChild(th);
        var tbd = el('tbody');
        pg.table.rows.forEach(function (r, i) {
          var row = el('tr', 'para'); row.id = d.id + '-' + pg.n + '-' + r[0]; row.tabIndex = -1;
          row.appendChild(el('td', 'rn', String(i + 2)));
          r[1].forEach(function (c) { row.appendChild(el('td', null, c)); });
          tbd.appendChild(row);
        });
        tb.appendChild(tbd); sc.appendChild(tb); sec.appendChild(sc);
      }
      paper.appendChild(sec);
    });
    if (d.body.length < d.pages && d.type !== 'EML') paper.appendChild(el('p', 'pg-omit', 'Pozostałe strony pominięto w demo.'));
    body.appendChild(paper);

    if (!viewer.open) viewer.showModal();
    logAdd(user().short, 'Otwarcie dokumentu', d.file);
    var target = page && para ? document.getElementById(id + '-' + page + '-' + para) : null;
    $('pg-body').scrollTop = 0;
    if (target) {
      target.classList.add('hl');
      target.setAttribute('aria-describedby', 'hl-desc');
      setTimeout(function () { var pb = $('pg-body'); pb.scrollTop += target.getBoundingClientRect().top - pb.getBoundingClientRect().top - pb.clientHeight / 3; target.focus({ preventScroll: true }); }, 60);
    } else {
      $('pg-x').focus();
    }
  }
  function reduced() { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  $('pg-x').addEventListener('click', function () { viewer.close(); });
  viewer.addEventListener('click', function (e) { if (e.target === viewer) viewer.close(); });

  /* ---------- okno potwierdzenia (wysyłka / kalendarz) ---------- */
  var confirmDlg = $('potwierdz');
  function askConfirm(opts) {
    $('pt-title').textContent = opts.title;
    $('pt-lead').textContent = opts.lead;
    var dl = $('pt-sum'); dl.textContent = '';
    opts.rows.forEach(function (r) { dl.appendChild(el('dt', null, r[0])); dl.appendChild(el('dd', null, r[1])); });
    $('pt-form').hidden = false; $('pt-done').hidden = true;
    $('pt-ok').textContent = opts.ok;
    $('pt-ok').onclick = function () {
      $('pt-form').hidden = true; $('pt-done').hidden = false;
      $('pt-done-t').textContent = opts.doneTitle;
      $('pt-done-p').textContent = opts.done;
      logAdd(user().short, opts.logAction, opts.logTarget, 'ok');
      $('pt-close').focus();
    };
    confirmDlg.showModal();
  }
  ['pt-x', 'pt-cancel', 'pt-close'].forEach(function (id) { $(id).addEventListener('click', function () { confirmDlg.close(); }); });

  /* ---------- odpowiedzi (przygotowane wcześniej) ---------- */
  function draftKessbrand() {
    var u = user();
    return {
      lang: 'DE', to: 'Erik Vogt <e.vogt@kessbrand.example>', subject: 'AW: Preisanpassung zum 01.01.2027 — Rahmenvertrag ZK/2025/004',
      body: 'Sehr geehrter Herr Vogt,\n\nvielen Dank für Ihr Schreiben vom 03.11.2026. Eine Erhöhung der Preise für Getriebemotoren der Baureihe KB um durchschnittlich 8,5 % können wir in dieser Form nicht akzeptieren.\n\nWir weisen darauf hin, dass Preisänderungen gemäß § 7 Abs. 2 des Rahmenvertrags mindestens 60 Tage vor ihrem Inkrafttreten schriftlich anzukündigen sind.\n\nGerne besprechen wir Ihre Kalkulation in unserem Telefonat am 19.11.2026 um 14:00 Uhr. Bitte senden Sie uns vorab die neue Preisliste mit den Einzelpreisen.\n\nMit freundlichen Grüßen\n' + u.name + '\nMorvelin Sp. z o.o.',
      tr: 'Szanowny Panie,\n\ndziękujemy za pismo z 03.11.2026. Nie możemy zaakceptować w tej formie podwyżki cen motoreduktorów serii KB średnio o 8,5%.\n\nZwracamy uwagę, że zgodnie z § 7 ust. 2 umowy ramowej o zmianie cen należy zawiadomić na piśmie co najmniej 60 dni przed jej wejściem w życie.\n\nChętnie omówimy Państwa kalkulację podczas rozmowy 19.11.2026 o 14:00. Prosimy o wcześniejsze przesłanie nowego cennika z cenami jednostkowymi.\n\nZ poważaniem\n' + u.name + '\nMorvelin Sp. z o.o.'
    };
  }
  function draftLoftmere() {
    return {
      lang: 'EN', to: 'Helen Marsh <procurement@loftmere.example>', subject: 'RE: RFQ — ball valves ZK-200, 1,200 pcs, deliveries 2027',
      body: 'Dear Ms Marsh,\n\nThank you for your request for quotation of 12 November 2026. We confirm receipt and are preparing an offer for 1,200 ball valves ZK-200 (DN 25, PN 16), delivered in four quarterly lots in 2027, FCA Poznań.\n\nOur offer, including unit prices, lead times and the PED declaration of conformity, will reach you by 18 November 2026.\n\nKind regards\n' + user().name + '\nMorvelin Sp. z o.o.',
      tr: 'Szanowna Pani,\n\ndziękujemy za zapytanie ofertowe z 12 listopada 2026 r. Potwierdzamy jego otrzymanie i przygotowujemy ofertę na 1200 zaworów kulowych ZK-200 (DN 25, PN 16) w czterech kwartalnych dostawach w 2027 r., FCA Poznań.\n\nOferta z cenami jednostkowymi, terminami dostaw i deklaracją zgodności PED dotrze do Pani do 18 listopada 2026 r.\n\nZ poważaniem\n' + user().name + '\nMorvelin Sp. z o.o.'
    };
  }

  var CASES = {
    kessbrand: function () {
      if (!can('D02')) return null;
      return [
        ['p', '**Sprawa: Kessbrand — dostawy i ceny 2027.** Dokumenty po polsku i niemiecku, ułożone chronologicznie:'],
        ['ul', [
          '15.01.2025 — umowa ramowa ZK/2025/004: dostawa w 6 tygodni, zmiana cen z co najmniej 60-dniowym wyprzedzeniem, kara 0,2% dziennie za opóźnienie {{D01:3:a}} {{D01:4:b}}',
          '20.10.2026 — faktura RE-2026-10388 na 48 260,00 EUR, płatna do 19.11.2026 (skan, OCR) {{D04:1:g}}',
          can('D13') ? '02.11.2026 — zarząd: akceptowalna podwyżka maks. 4% (wewnętrzne), zapytanie do alternatywnego dostawcy do 30.11 {{D13:2:a}}' : '',
          '03.11.2026 — Kessbrand zapowiada podwyżkę średnio o 8,5% od 1.01.2027 i prosi o odpowiedź do 27.11 {{D02:1:c}}',
          can('D03') ? '10.11.2026 — opóźnienie zamówienia 4471 do 7–11.12.2026 z powodu braku łożysk {{D03:1:b}}' : '',
          can('D14') ? '19.11.2026, 14:00 — zaplanowana rozmowa z E. Vogtem o cenach 2027 {{D14:1:b}}' : ''
        ]],
        ['next', ['Przygotuj szkic odpowiedzi do Kessbrand', 'Co Kessbrand pisze o cenach na 2027?']]
      ];
    },
    tervanik: function () {
      if (!can('D06')) return null;
      return [
        ['p', '**Sprawa: Tervanik — reklamacja zaworów ZK-200, obecnie pozew IX GC 812/26.** 6 dokumentów (polski i angielski), ułożonych chronologicznie:'],
        ['ul', [
          '25.08.2026 — Tervanik reklamuje partię 2026/07 (340 szt.): wycieki u 27 klientów, żąda wymiany całej partii i kosztów serwisu {{D06:1:b}}',
          '29.08.2026 — dział jakości prosi o 12 próbek do badań i do czasu wyników nie uznaje żądania {{D06:2:b}}',
          '22.09.2026 — raport laboratorium (po angielsku): 9 z 12 próbek — montaż ze zbyt dużym momentem dokręcania, 3 z 12 — wada uszczelki PTFE {{D09:3:a}}',
          '30.09.2026 — Morvelin uznaje reklamację częściowo, proponuje wymianę 85 szt. (25% partii) do 15.10 {{D07:2:a}}',
          '02.10.2026 — Tervanik odrzuca wnioski z raportu, zapowiada pozew, szacuje koszty na 186 400 zł {{D06:3:b}}',
          '21.10.2026 — spotkanie: rozważana wymiana 120 szt. i rabat 5%, pod warunkiem zgody zarządu {{D08:1:c}}',
          '02.11.2026 — zarząd nie zgadza się na nową propozycję; sprawę poprowadzi kancelaria zewnętrzna {{D13:1:b}}',
          '06.11.2026 — doręczenie pozwu; termin na odpowiedź: 2 tygodnie, czyli **pt. 20.11.2026** {{D10:1:c}} {{D10:2:a}}'
        ]],
        ['note', 'Skan pozwu był zarówno w poczcie, jak i na dysku — w bazie scalono go w jeden dokument. Ocena prawna sprawy należy do pełnomocnika; asystent tylko porządkuje fakty ze źródeł.'],
        ['next', ['Co wykazało laboratorium?', 'Zaproponuj termin spotkania']]
      ];
    },
    loftmere: function () {
      if (!can('D11')) return null;
      return [
        ['p', '**Sprawa: Loftmere — zapytanie ofertowe 2027.** 2 dokumenty po angielsku:'],
        ['ul', [
          '14.09.2026 — wzajemna umowa o poufności (NDA); poufność obowiązuje 3 lata po jej rozwiązaniu, prawo Anglii i Walii {{D15:2:a}} {{D15:3:a}}',
          '12.11.2026 — Loftmere prosi o ofertę na 1200 zaworów ZK-200 (DN 25, PN 16) w 4 kwartalnych dostawach w 2027 r., cena w EUR FCA Poznań, z deklaracją PED {{D11:1:a}} {{D11:1:b}}',
          'Termin na ofertę: **śr. 18.11.2026** {{D11:1:c}}'
        ]],
        ['note', 'W bazie nie ma cennika sprzedażowego ZK-200 na 2027 r., więc nie podaję ceny — trzeba ją uzupełnić ręcznie.'],
        ['next', ['Przygotuj szkic odpowiedzi do Loftmere']]
      ];
    }
  };
  function caseFrom(q) {
    if (/(tervanik|reklamac|pozew|pozw|zk-200|zawor|sad|ix gc)/.test(q)) return 'tervanik';
    if (/(loftmere|rfq|bryty|angiel|nda)/.test(q)) return 'loftmere';
    if (/(kessbrand|niemiec|dostawc|cen|4471|faktur)/.test(q)) return 'kessbrand';
    return null;
  }
  function caseChips() {
    var c = [];
    if (can('D02')) c.push('Streść korespondencję w sprawie Kessbrand');
    if (can('D06')) c.push('Streść korespondencję w sprawie Tervanik');
    if (can('D11')) c.push('Streść korespondencję w sprawie Loftmere');
    return c;
  }

  var INTENTS = [
    { id: 'usun', keys: ['usun', 'skasuj', 'wymaz', 'wyslij', 'wyslac', 'rodo', 'zapomn'], run: function () {
      return [
        ['p', 'Nie wysyłam, nie usuwam i nie zmieniam niczego samodzielnie. Każdą taką operację zatwierdza człowiek, a system zapisuje ją w dzienniku dostępu.'],
        ['p', 'Usunięcie danych osoby na jej wniosek (RODO) we wdrożeniu przebiega osobną procedurą: wyszukanie wszystkich wystąpień, podgląd listy, zatwierdzenie przez uprawnioną osobę, usunięcie z indeksu i bazy, a z kopii zapasowych — zgodnie z ich cyklem rotacji.']
      ];
    } },
    { id: 'szkic', keys: ['szkic', 'napisz', 'przygotuj odpowiedz', 'odpisz', 'draft', 'odpowiedz do', 'odpowiedz dla', 'mail do', 'e-mail do', 'wiadomosc do'], run: function (q) {
      if (/(tervanik|pozew|pozw|sad)/.test(q)) {
        if (!can('D06')) return null;
        return [
          ['p', 'Pism procesowych nie przygotowuję automatycznie — odpowiedź na pozew składa pełnomocnik {{D13:1:b}}. Mogę uporządkować fakty ze źródeł dla pełnomocnika albo zaproponować termin spotkania przed 20.11 {{D10:1:c}}.'],
          ['next', ['Streść korespondencję w sprawie Tervanik', 'Zaproponuj termin spotkania']]
        ];
      }
      if (/(loftmere|rfq|ofert|angiel|bryty)/.test(q)) {
        if (!can('D11')) return null;
        return [
          ['p', 'Przygotowałem szkic po angielsku (język zapytania) z tłumaczeniem roboczym. To potwierdzenie przyjęcia zapytania z obietnicą oferty do 18.11 {{D11:1:c}}. Niczego nie wysyłam bez Twojego potwierdzenia.'],
          ['draft', draftLoftmere()],
          ['note', 'Celowo bez cen: w bazie nie ma cennika sprzedażowego ZK-200 na 2027 r. Rozmowy są objęte NDA z 14.09.2026 {{D15:1:a}}.']
        ];
      }
      if (!can('D02')) return null;
      return [
        ['p', 'Przygotowałem szkic po niemiecku (język korespondencji z Kessbrand) z tłumaczeniem roboczym. Odnosi się do pisma z 3.11.2026 {{D02:1:c}} i do rozmowy zaplanowanej na 19.11 {{D14:1:b}}. Niczego nie wysyłam bez Twojego potwierdzenia.'],
        ['draft', draftKessbrand()],
        ['note', 'Przed wysłaniem sprawdź z działem prawnym zdanie o § 7 ust. 2 umowy {{D01:4:b}}.' + (can('D13') ? ' Szkic celowo nie zawiera wewnętrznego limitu 4% z protokołu zarządu {{D13:2:a}}.' : '')]
      ];
    } },
    { id: 'stresc', keys: ['stresc', 'streszcz', 'podsumuj sprawe', 'cala korespondencj', 'korespondencj', 'historia sprawy', 'co wiemy o', 'o co chodzi'], run: function (q) {
      var c = caseFrom(q);
      if (!c) return [['p', 'Której sprawy dotyczy streszczenie? Mam dostęp do:'], ['next', caseChips()]];
      return CASES[c]();
    } },
    { id: 'podwyzka', keys: ['podwyzk', 'drozej', 'ceny na 2027', 'cen na 2027', 'cenach na 2027', 'preis', 'cennik', 'cen 2027', 'ceny 2027', '8 5', 'nowe ceny', 'zmiana cen', 'zmiane cen', 'dostawca z niemiec', 'niemiecki dostawca', 'kessbrand pisze', 'kessbrand o cen'], run: function () {
      if (!can('D02')) return null;
      return [
        ['p', 'W piśmie z 3.11.2026 (po niemiecku) Kessbrand zapowiada podwyżkę cen motoreduktorów serii KB **średnio o 8,5% od 1.01.2027**, uzasadniając ją kosztami stali, miedzi i energii. Części zamienne nie drożeją. {{D02:1:c}}'],
        ['quote', 'DE', '„…die Preise für Getriebemotoren der Baureihe KB zum 01.01.2027 um durchschnittlich 8,5 % anzupassen.”', 'D02:1:c'],
        ['ul', [
          'Odpowiedzi oczekują **do 27.11.2026**. {{D02:1:d}}',
          'Zamówienia potwierdzone do 31.12.2026 mają być dostarczone po dotychczasowych cenach. {{D02:2:a}}',
          can('D05') ? 'Szacunek według obecnego cennika (przy średniej podwyżce 8,5%): KB-40 412,00 → ok. 447,02 EUR, KB-63 588,00 → ok. 637,98 EUR. Nowego cennika nie ma jeszcze w bazie. {{D05:1:r2}} {{D05:1:r3}}' : '',
          'Umowa wymaga zawiadomienia o zmianie cen **co najmniej 60 dni** wcześniej. Od 3.11.2026 do 1.01.2027 jest 59 dni — warto, by dział prawny ocenił, czy termin zachowano. {{D01:4:b}}',
          'Podwyżka powyżej 5% daje prawo wypowiedzenia umowy z 30-dniowym okresem. {{D01:4:c}}',
          can('D13') ? 'Zarząd uznał za akceptowalną podwyżkę maks. 4% (informacja wewnętrzna). {{D13:2:a}}' : ''
        ]],
        ['next', ['Przygotuj szkic odpowiedzi do Kessbrand', 'Jakie terminy mamy w tym tygodniu?']]
      ];
    } },
    { id: 'terminy', keys: ['termin', 'w tym tygodniu', 'deadline', 'do kiedy', 'na kiedy', 'co mamy', 'zalegl', 'pilne', 'najblizsz'], run: function (q) {
      if (/(pozew|pozw|sad|ix gc)/.test(q) && can('D10')) return INTENTS_BY.pozew.run(q);
      var ts = visTerms(), wk = ts.filter(function (t) { return t.week; }), later = ts.filter(function (t) { return !t.week; });
      var out = [['p', 'W tym tygodniu (16–20.11.2026) w dokumentach, do których masz dostęp, są **' + wk.length + ' ' + (wk.length === 1 ? 'termin' : 'terminy') + '**:']];
      out.push(['ul', wk.map(function (t) { return '**' + t.d + (t.y.indexOf(':') > -1 ? ', ' + t.y : '') + '** — ' + t.what + (t.urgent ? ' (najpilniejsze)' : '') + ' {{' + t.cite + '}}'; })]);
      if (later.length) out.push(['p', 'Później: ' + later.map(function (t) { return t.what.charAt(0).toLowerCase() + t.what.slice(1) + ' — ' + t.d + '.' + t.y + ' {{' + t.cite + '}}'; }).join('; ') + '.']);
      if (can('D10')) out.push(['note', 'Termin odpowiedzi na pozew policzyłem od daty doręczenia 6.11.2026 {{D10:2:a}} — potwierdź go z pełnomocnikiem.']);
      out.push(['note', 'Faktura RE-2026-10388 podaje termin 19.11, a umowa liczy 30 dni od doręczenia faktury (wpływ 22.10 → 21.11). Bezpieczniej zapłacić do 19.11. {{D04:1:h}} {{D01:4:d}}']);
      out.push(['next', ['Zaproponuj termin spotkania']]);
      return out;
    } },
    { id: 'pozew', keys: ['pozew', 'pozw', 'sad okregowy', 'ix gc', 'odpowiedz na pozew', 'sygnatur'], run: function () {
      if (!can('D10')) return null;
      return [
        ['p', 'Sąd Okręgowy w Poznaniu (IX Wydział Gospodarczy, sygn. IX GC 812/26) zobowiązał Morvelin do złożenia odpowiedzi na pozew Tervanik w terminie dwóch tygodni od doręczenia {{D10:1:c}}. Doręczenie nastąpiło 6.11.2026 {{D10:2:a}}, więc termin upływa **w piątek 20.11.2026**.'],
        ['p', 'Wartość przedmiotu sporu: 186 400 zł {{D10:1:b}}. Sąd poucza, że twierdzenia i dowody powołane później mogą zostać pominięte {{D10:1:d}}.'],
        ['note', 'Dokument to skan rozpoznany przez OCR. Termin wyliczył asystent — przed planowaniem potwierdź go z pełnomocnikiem.'],
        ['next', ['Streść korespondencję w sprawie Tervanik', 'Zaproponuj termin spotkania']]
      ];
    } },
    { id: 'lab', keys: ['laborator', 'badan', 'raport', 'test', 'przyczyn', 'wyciek', 'probk'], run: function () {
      if (!can('D09')) return null;
      return [
        ['p', 'Raport TR-26-1184 z 22.09.2026 (po angielsku): przy próbie ciśnieniowej 24 bar przeciekały wszystkie 12 próbek z partii 2026/07 {{D09:2:a}}.'],
        ['ul', [
          '**9 z 12** — odkształcenie uszczelnienia trzpienia wskazujące na zbyt duży moment dokręcania przy montażu (zmierzono 38–45 Nm, dopuszczalne maks. 25 Nm) {{D09:3:a}}',
          '**3 z 12** — porowatość uszczelki PTFE, czyli wada materiałowa niezwiązana z montażem {{D09:3:a}}'
        ]],
        ['quote', 'EN', '„…the leakage in 9 of 12 samples is attributable to improper installation; in 3 of 12 samples to a material defect of the seal.”', 'D09:4:a'],
        ['p', 'Na tej podstawie dział jakości uznał reklamację w części {{D07:1:b}}, a Tervanik zakwestionował wnioski z raportu {{D06:3:a}}.']
      ];
    } },
    { id: 'dostawa', keys: ['4471', 'dostaw', 'opozni', 'spozni', 'lozysk', 'liefer', 'kiedy dostaniemy', 'kiedy przyjdzie', 'zamowien'], run: function () {
      if (!can('D03')) return null;
      return [
        ['p', 'Według e-maila Kessbrand z 10.11.2026 (po niemiecku) zamówienie 4471 (120 szt. KB-40) jest opóźnione z powodu braku łożysk tocznych u ich poddostawcy {{D03:1:a}}.'],
        ['ul', [
          'Nowy przewidywany termin: **tydzień 50, czyli 7–11.12.2026** {{D03:1:b}}',
          'Część — 40 szt. — mogą dostarczyć już w tygodniu 48 (23–27.11) {{D03:1:b}}'
        ]],
        ['quote', 'DE', '„Neuer voraussichtlicher Liefertermin: KW 50 (07.–11.12.2026).”', 'D03:1:b'],
        ['p', 'Umowa przewiduje karę 0,2% wartości netto opóźnionej dostawy za każdy dzień, łącznie maks. 10% {{D01:3:c}}. Do jej wyliczenia potrzebna jest data potwierdzenia zamówienia — tego dokumentu nie ma w bazie, więc kwoty nie podaję.']
      ];
    } },
    { id: 'faktura', keys: ['faktur', 'rechnung', 'zaplat', 'platnos', '10388', 'przelew', 'ile placimy'], run: function () {
      if (!can('D04')) return null;
      return [
        ['p', 'Faktura RE-2026-10388 od Kessbrand (skan; tekst rozpoznany przez OCR z niemieckiego): **48 260,00 EUR netto**, dostawa wewnątrzwspólnotowa z odwrotnym obciążeniem {{D04:1:f}}.'],
        ['ul', [
          'Pozycje: 80 × KB-40 po 412,00 EUR, 25 × KB-63 po 588,00 EUR, transport 600,00 EUR {{D04:1:c}} {{D04:1:d}} {{D04:1:e}}',
          'Termin płatności według faktury: **19.11.2026** {{D04:1:g}}',
          'Umowa liczy 30 dni od doręczenia faktury {{D01:4:d}}; pieczęć wpływu: 22.10.2026 {{D04:1:h}}, czyli 21.11. Bezpieczniej przyjąć 19.11.'
        ]],
        ['note', 'Płatności nie zlecam — przelew przygotowuje i zatwierdza księgowość.']
      ];
    } },
    { id: 'spotkanie', keys: ['spotkan', 'zaproponuj termin', 'kalendarz', 'umow spotk', 'wolny termin', 'zaplanuj', 'kiedy mam czas'], run: function () {
      if (can('D10') && can('D12')) {
        return [
          ['p', 'Proponuję spotkanie z pełnomocnikiem przed terminem odpowiedzi na pozew (pt. 20.11.2026) {{D10:1:c}}. W Twoim kalendarzu wtorek 17.11 zajmuje audyt klienta {{D12:1:b}}, a w środę rano jest przegląd budżetu {{D12:1:c}}. Wolne okna:'],
          ['cal', { title: 'Przygotowanie odpowiedzi na pozew IX GC 812/26', slots: ['śr. 18.11.2026, 12:00–13:30', 'śr. 18.11.2026, 14:00–15:30', 'czw. 19.11.2026, 09:00–10:30'], who: 'A. Wiśniewska, J. Bielska (dział jakości), pełnomocnik zewnętrzny' }],
          ['note', 'Zaproszeń dla osób spoza firmy nie wysyłam automatycznie.']
        ];
      }
      if (!can('D14')) return null;
      return [
        ['p', 'Proponuję krótkie przygotowanie do rozmowy z Kessbrand (czw. 19.11, 14:00) {{D14:1:b}}. W kalendarzu działu w środę rano jest inwentaryzacja {{D14:1:a}}. Wolne okna:'],
        ['cal', { title: 'Przygotowanie do rozmowy z Kessbrand — ceny 2027', slots: ['śr. 18.11.2026, 12:00–13:00', 'czw. 19.11.2026, 10:00–11:00'], who: 'Dział zakupów' }]
      ];
    } },
    { id: 'loftmere', keys: ['loftmere', 'rfq', 'zapytanie ofertowe', 'brytyj', 'anglik', 'z anglii', 'nda'], run: function () { return CASES.loftmere(); } },
    { id: 'tervanik', keys: ['tervanik', 'reklamac', 'zk-200', 'zawor'], run: function () { return CASES.tervanik(); } },
    { id: 'kessbrand', keys: ['kessbrand', 'niemiec', 'motoreduktor'], run: function () { return CASES.kessbrand(); } },
    { id: 'umowa', keys: ['kar', 'umow', 'wypowiedz', 'paragraf'], run: function () {
      if (!can('D01')) return null;
      return [
        ['p', 'Najważniejsze zapisy umowy ramowej ZK/2025/004 z Kessbrand:'],
        ['ul', [
          'dostawa w 6 tygodni od potwierdzenia zamówienia {{D01:3:a}}',
          'kara umowna 0,2% wartości netto opóźnionej dostawy za dzień, maks. 10% {{D01:3:c}}',
          'zmiana cen raz w roku, z pisemnym zawiadomieniem co najmniej 60 dni wcześniej {{D01:4:b}}',
          'podwyżka ponad 5% — prawo wypowiedzenia z 30-dniowym okresem {{D01:4:c}}',
          'płatność 30 dni od doręczenia faktury; prawo polskie {{D01:4:d}} {{D01:6:a}}'
        ]]
      ];
    } },
    { id: 'poranne', keys: ['poranne', 'podsumowanie dnia', 'podsumuj dzien', 'co nowego', 'co dzis', 'na dzis', 'dzisiaj'], run: function () {
      return [['p', 'Poranne podsumowanie na poniedziałek 16.11.2026:'], ['ul', morningBlocks()], ['next', ['Jakie terminy mamy w tym tygodniu?']]];
    } }
  ];
  var INTENTS_BY = {}; INTENTS.forEach(function (i) { i.nkeys = i.keys.map(norm); INTENTS_BY[i.id] = i; });

  function answer(raw) {
    var q = norm(raw);
    if (!q) return null;
    if (/^(czesc|hej|dzien dobry|witam|dobry wieczor|hello|hallo)\b/.test(q) && q.split(' ').length <= 3)
      return { blocks: [['p', 'Dzień dobry! Zapytaj o terminy, sprawy, dokumenty lub poproś o szkic odpowiedzi — każdą informację podam ze źródłem.']] };
    if (/(dzieki|dziekuje)/.test(q)) return { blocks: [['p', 'Proszę bardzo.']] };
    var best = null, bs = 0;
    var forced = /(szkic|napisz|odpisz|draft)/.test(q) ? 'szkic' : /(stresc|streszcz)/.test(q) ? 'stresc' : null;
    if (forced) best = INTENTS_BY[forced];
    else INTENTS.forEach(function (it, idx) {
      var s = 0; it.nkeys.forEach(function (k) { if (q.indexOf(k) !== -1) s += k.length + 2; });
      if (s > 0) s += (INTENTS.length - idx) * 0.01; // przy remisie wygrywa wcześniejsza intencja
      if (s > bs) { bs = s; best = it; }
    });
    if (!best) return { blocks: fallback(), miss: true };
    var b = best.run(q);
    if (!b) return { blocks: denied(), denied: true };
    return { blocks: b };
  }
  function fallback() {
    var topics = ['ceny Kessbrand na 2027', 'terminy w tym tygodniu', 'zamówienie 4471', 'fakturę RE-2026-10388', 'szkic odpowiedzi do Kessbrand', 'propozycję spotkania'];
    if (can('D06')) topics.splice(2, 0, 'sprawę Tervanik i raport z badań', 'zapytanie Loftmere');
    return [
      ['p', 'Nie znalazłem odpowiedzi w dokumentach, do których masz dostęp, więc nie będę zgadywać.'],
      ['note', 'W tym demo odpowiedzi są przygotowane wcześniej dla tematów: ' + topics.join(', ') + '. We wdrożeniu lokalny model odpowiada na dowolne pytania, ale zawsze na podstawie dokumentów i ze wskazaniem źródła.']
    ];
  }
  function denied() {
    return [
      ['p', 'Wśród dokumentów, do których masz dostęp, nie ma informacji na ten temat. Nie mogę odpowiedzieć na podstawie dokumentów innych działów.'],
      ['note', 'Jeśli potrzebujesz tych informacji, poproś przełożonego lub administratora o nadanie uprawnień. Zapytanie zostało zapisane w dzienniku dostępu.']
    ];
  }

  /* ---------- czat ---------- */
  var log = $('log');
  function scrollEnd() { log.scrollTop = log.scrollHeight; }
  function addMe(text) { var d = el('div', 'msg me', text); log.appendChild(d); scrollEnd(); }
  function addSys(text) { var d = el('div', 'msg sys', text); log.appendChild(d); scrollEnd(); }
  function renderBlocks(container, blocks, used) {
    blocks.forEach(function (b) {
      if (b[0] === 'p') container.appendChild(rich(el('p'), b[1], used));
      else if (b[0] === 'note') container.appendChild(rich(el('p', 'm-note'), b[1], used));
      else if (b[0] === 'ul') {
        var ul = el('ul');
        b[1].filter(Boolean).forEach(function (s) { ul.appendChild(rich(el('li'), s, used)); });
        container.appendChild(ul);
      } else if (b[0] === 'quote') {
        var c = parseCite(b[3]); if (!can(c.id)) return;
        var bq = el('blockquote', 'orig'); bq.lang = b[1].toLowerCase();
        var lab = el('span', 'orig-l', 'Oryginał (' + b[1] + ')'); lab.lang = 'pl';
        bq.appendChild(lab); bq.appendChild(el('span', null, b[2]));
        container.appendChild(bq);
      } else if (b[0] === 'draft') container.appendChild(draftCard(b[1]));
      else if (b[0] === 'cal') container.appendChild(calCard(b[1]));
      else if (b[0] === 'next') {
        var list = b[1].filter(Boolean); if (!list.length) return;
        var w = el('div', 'm-next'); w.setAttribute('role', 'group'); w.setAttribute('aria-label', 'Kolejne pytania');
        list.forEach(function (q) { var bt = el('button', null, q); bt.type = 'button'; bt.addEventListener('click', function () { ask(q); }); w.appendChild(bt); });
        container.appendChild(w);
      }
    });
  }
  var uid = 0;
  function draftCard(dr) {
    uid += 1;
    var card = el('div', 'draft');
    var h = el('div', 'draft-h'); h.appendChild(el('strong', null, 'Szkic wiadomości')); h.appendChild(el('span', 'lang', dr.lang)); h.appendChild(el('span', 'draft-st', 'nie wysłano'));
    card.appendChild(h);
    var dl = el('dl', 'draft-meta'); dl.appendChild(el('dt', null, 'Do')); dl.appendChild(el('dd', null, dr.to)); dl.appendChild(el('dt', null, 'Temat')); dl.appendChild(el('dd', null, dr.subject));
    card.appendChild(dl);
    var lid = 'dr' + uid;
    var lab = el('label', 'draft-l', 'Treść (możesz edytować)'); lab.htmlFor = lid;
    var ta = el('textarea'); ta.id = lid; ta.value = dr.body; ta.rows = 9; ta.lang = dr.lang.toLowerCase(); ta.spellcheck = false;
    card.appendChild(lab); card.appendChild(ta);
    var det = el('details', 'draft-tr'); det.appendChild(el('summary', null, 'Tłumaczenie robocze (PL)')); det.appendChild(el('p', null, dr.tr));
    card.appendChild(det);
    var act = el('div', 'draft-a');
    var send = el('button', 'btn-primary btn-sm', 'Wyślij…'); send.type = 'button';
    var copy = el('button', 'btn-ghost btn-sm', 'Kopiuj tekst'); copy.type = 'button';
    send.addEventListener('click', function () {
      askConfirm({
        title: 'Potwierdź wysłanie wiadomości', ok: 'Tak, wyślij',
        lead: 'Asystent nigdy nie wysyła wiadomości sam. Sprawdź adresata i treść — wysyłka nastąpi dopiero po Twoim potwierdzeniu.',
        rows: [['Do', dr.to], ['Temat', dr.subject], ['Nadawca', user().name + ' (konto Exchange)']],
        doneTitle: 'Demo: nic nie zostało wysłane',
        done: 'W tej wersji demonstracyjnej przycisk niczego nie wysyła. We wdrożeniu wiadomość trafiłaby do skrzynki nadawczej na serwerze pocztowym firmy dopiero po tym potwierdzeniu, a operacja zostałaby zapisana w dzienniku dostępu (kto, kiedy, do kogo).',
        logAction: 'Wysyłka zatwierdzona (demo — nie wysłano)', logTarget: dr.subject
      });
    });
    copy.addEventListener('click', function () {
      var done = function () { toast('Skopiowano tekst szkicu do schowka.'); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(ta.value).then(done, function () { ta.select(); toast('Zaznaczono tekst — skopiuj skrótem Ctrl+C.'); });
      else { ta.select(); toast('Zaznaczono tekst — skopiuj skrótem Ctrl+C.'); }
    });
    act.appendChild(send); act.appendChild(copy);
    card.appendChild(act);
    return card;
  }
  function calCard(c) {
    uid += 1;
    var card = el('div', 'draft cal');
    var h = el('div', 'draft-h'); h.appendChild(el('strong', null, 'Propozycja wydarzenia')); h.appendChild(el('span', 'draft-st', 'nie zapisano'));
    card.appendChild(h);
    card.appendChild(el('p', 'cal-t', c.title));
    var fs = el('fieldset', 'cal-slots'); fs.appendChild(el('legend', null, 'Wybierz termin'));
    c.slots.forEach(function (s, i) {
      var lb = el('label', 'check'); var r = el('input'); r.type = 'radio'; r.name = 'slot' + uid; r.value = s; if (i === 0) r.checked = true;
      lb.appendChild(r); lb.appendChild(el('span', null, s)); fs.appendChild(lb);
    });
    card.appendChild(fs);
    card.appendChild(el('p', 'cal-w', 'Uczestnicy: ' + c.who));
    var act = el('div', 'draft-a');
    var add = el('button', 'btn-primary btn-sm', 'Dodaj do kalendarza…'); add.type = 'button';
    add.addEventListener('click', function () {
      var sel = fs.querySelector('input:checked');
      askConfirm({
        title: 'Potwierdź dodanie wydarzenia', ok: 'Tak, dodaj',
        lead: 'Asystent tylko proponuje termin. Wydarzenie pojawi się w kalendarzu dopiero po Twoim potwierdzeniu.',
        rows: [['Wydarzenie', c.title], ['Termin', sel ? sel.value : c.slots[0]], ['Uczestnicy', c.who]],
        doneTitle: 'Demo: nic nie zostało zapisane',
        done: 'W tej wersji demonstracyjnej kalendarz nie jest podłączony. We wdrożeniu wydarzenie zapisałoby się w kalendarzu Exchange/CalDAV na serwerze firmy, a zaproszenia dla uczestników wymagałyby osobnej decyzji.',
        logAction: 'Dodanie wydarzenia zatwierdzone (demo — nie zapisano)', logTarget: c.title
      });
    });
    act.appendChild(add); card.appendChild(act);
    return card;
  }
  var busy = false;
  function ask(text) {
    var tx = String(text).trim(); if (!tx || busy) return;
    busy = true;
    addMe(tx);
    var a = answer(tx);
    var t = el('div', 'typing'); t.setAttribute('aria-hidden', 'true'); t.innerHTML = '<i></i><i></i><i></i>';
    log.appendChild(t); scrollEnd();
    setTimeout(function () {
      t.remove();
      var d = el('div', 'msg bot');
      var who = el('span', 'msg-who'); who.appendChild(el('span', 'ai-mini', 'AI')); who.appendChild(document.createTextNode(' Asystent'));
      d.appendChild(who);
      var used = [];
      renderBlocks(d, a.blocks, used);
      log.appendChild(d);
      // długą odpowiedź pokazujemy od początku (od pytania), krótką — przewijamy na koniec
      if (d.offsetHeight > log.clientHeight - 60) { var me = d.previousElementSibling; log.scrollTop = Math.max(0, (me && me.classList.contains('me') ? me.offsetTop : d.offsetTop) - 10); }
      else scrollEnd();
      busy = false;
      var short = tx.length > 60 ? tx.slice(0, 57) + '…' : tx;
      if (a.denied) logAdd(user().short, 'Zapytanie — brak dostępnych źródeł', '„' + short + '”', 'deny');
      else logAdd(user().short, 'Zapytanie do asystenta · źródła: ' + used.length, '„' + short + '”');
    }, reduced() ? 150 : 650);
  }

  var CHIPS = ['Co Kessbrand pisze o cenach na 2027?', 'Jakie terminy mamy w tym tygodniu?', 'Streść korespondencję w sprawie Tervanik', 'Przygotuj szkic odpowiedzi do Kessbrand', 'Kiedy dostawa zamówienia 4471?', 'Zaproponuj termin spotkania'];
  function renderChips() {
    var w = $('chips'); w.textContent = '';
    w.addEventListener('wheel', function (e) { if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && w.scrollWidth > w.clientWidth) { w.scrollLeft += e.deltaY; e.preventDefault(); } }, { passive: false });
    CHIPS.forEach(function (q) {
      var b = el('button', null, q); b.type = 'button';
      b.addEventListener('click', function () { ask(q); });
      w.appendChild(b);
    });
  }
  function greet() {
    var u = user();
    addSys('Zalogowano: ' + u.name + ' (' + u.role.toLowerCase() + '). Asystent korzysta wyłącznie z dokumentów, do których ta osoba ma dostęp: ' + visibleDocs().length + ' z ' + A.DOCS.length + '.');
    var d = el('div', 'msg bot');
    var who = el('span', 'msg-who'); who.appendChild(el('span', 'ai-mini', 'AI')); who.appendChild(document.createTextNode(' Asystent'));
    d.appendChild(who);
    d.appendChild(el('p', null, 'Dzień dobry, ' + u.vocative + '. Jestem asystentem AI, nie człowiekiem. Odpowiadam na podstawie dokumentów firmy i przy każdej informacji podaję źródło — kliknij je, by zobaczyć cytowany fragment. Niczego nie wysyłam ani nie usuwam bez Twojego potwierdzenia.'));
    log.appendChild(d); scrollEnd();
  }

  /* ---------- przełącznik użytkownika ---------- */
  document.querySelectorAll('input[name="rola"]').forEach(function (r) {
    r.addEventListener('change', function () {
      if (!r.checked) return;
      state.role = r.value; state.src = 'all';
      if (viewer.open) viewer.close();
      log.textContent = ''; // nowa sesja: poprzednia rozmowa nie jest widoczna dla innego użytkownika
      logAdd('Administrator', 'Zmiana zalogowanego użytkownika (demo)', user().name);
      renderAll();
      greet();
    });
  });

  /* ---------- toast ---------- */
  var toastT;
  function toast(msg) { var t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); }, 2600); }

  var ICONS = {
    all: '<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',
    poczta: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 7 8.5-7"/></svg>',
    dysk: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><path d="M7 7.5h.01M7 16.5h.01"/></svg>',
    skany: '<svg viewBox="0 0 24 24"><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/></svg>',
    kalendarz: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>'
  };

  function renderAll() { renderRole(); renderSources(); renderDocs(); renderTerms(); renderMorning(); }

  $('form').addEventListener('submit', function (e) { e.preventDefault(); var i = $('pytanie'); ask(i.value); i.value = ''; });
  state.log = [
    { t: '07:35', who: 'System', action: 'Poranne podsumowania przygotowane', target: '2 użytkowników' },
    { t: '07:30', who: 'System', action: 'Indeksowanie przyrostowe: 4 nowe dokumenty, 2 duplikaty scalone', target: 'Poczta, Dysk sieciowy, Kalendarz' },
    { t: '02:00', who: 'System', action: 'Kopia zapasowa zaszyfrowana i zweryfikowana', target: 'dysk kopii w serwerowni' }
  ];
  state.min = 0;
  renderAll(); renderChips(); renderLog(); greet();
})();
