/* Liściownia – demo sklepu (marka fikcyjna). Bez serwera: koszyk w localStorage, zamówienie nie jest nigdzie wysyłane. */
(function () {
  'use strict';

  var IMG = 'https://images.unsplash.com/';
  function src(id, w, h) { return IMG + id + '?w=' + w + '&h=' + h + '&q=75&auto=format&fit=crop'; }
  function set(id, w, h) { return [1, 2].map(function (k) { return src(id, w * k, h * k) + ' ' + (w * k) + 'w'; }).join(', '); }

  var POTS = [
    { id: 'none', name: 'Bez osłonki', add: 0 },
    { id: 'terra', name: 'Osłonka z terakoty', add: 29 },
    { id: 'white', name: 'Osłonka ceramiczna, biała', add: 39 }
  ];

  // ceny brutto w zł; sale = obniżka w % (wtedy pokazujemy najniższą cenę z 30 dni przed obniżką)
  var P = [
    { id: 'monstera', name: 'Monstera dziurawa', latin: 'Monstera deliciosa', img: 'photo-1653404809389-f370ea4310dd',
      tags: ['easy', 'big'], pet: false, sale: 20, low30: { S: 89, M: 149, L: 249 }, badge: 'Promocja',
      sizes: [['S', 'wys. ok. 40 cm, doniczka 12 cm', 89], ['M', 'wys. ok. 70 cm, doniczka 17 cm', 149], ['L', 'wys. ok. 110 cm, doniczka 24 cm', 249]],
      lead: 'Duże, wycinane liście i szybki wzrost. Dobrze znosi zwykłe mieszkanie, byle nie stała w pełnym słońcu.',
      care: { light: 'jasne, rozproszone; bez ostrego słońca w południe', water: 'gdy wierzchnie 3 cm ziemi przeschną, zimą rzadziej', temp: '18–27 °C', tip: 'Starsze rośliny lubią podporę z kija kokosowego.' } },
    { id: 'fikus-sprezysty', name: 'Fikus sprężysty', latin: 'Ficus elastica', img: 'photo-1591656884447-8562e2373a66',
      tags: ['easy', 'big'], pet: false, badge: 'Bestseller',
      sizes: [['S', 'wys. ok. 45 cm, doniczka 14 cm', 69], ['M', 'wys. ok. 80 cm, doniczka 19 cm', 119]],
      lead: 'Grube, błyszczące liście, które łatwo przetrzeć z kurzu. Roślina na lata, rośnie powoli i równo.',
      care: { light: 'jasne, może być trochę porannego słońca', water: 'umiarkowanie, ziemia między podlewaniami lekko przesycha', temp: '16–26 °C', tip: 'Liście przecieraj wilgotną ściereczką raz w miesiącu.' } },
    { id: 'fikus-lirolistny', name: 'Fikus lirolistny', latin: 'Ficus lyrata', img: 'photo-1596547612397-1432a7a7d37d',
      tags: ['big'], pet: false,
      sizes: [['M', 'wys. ok. 60 cm, doniczka 17 cm', 129], ['L', 'wys. ok. 100 cm, doniczka 21 cm', 219]],
      lead: 'Duże liście w kształcie liry. Potrzebuje stałego miejsca: nie lubi przestawiania ani przeciągów.',
      care: { light: 'bardzo jasne, blisko okna', water: 'regularnie, gdy wierzchnia warstwa przeschnie', temp: '18–26 °C', tip: 'Obracaj doniczkę o ćwierć obrotu co kilka tygodni, żeby rosła prosto.' } },
    { id: 'epipremnum', name: 'Epipremnum złociste', latin: 'Epipremnum aureum', img: 'photo-1598880940080-ff9a29891b85',
      tags: ['easy', 'shade'], pet: false,
      sizes: [['S', 'pędy ok. 30 cm, doniczka 12 cm', 39], ['M', 'pędy ok. 60 cm, doniczka 15 cm', 69]],
      lead: 'Zwisające pędy na półkę albo do kosza. Jedna z najmniej wymagających roślin – wybacza zapomniane podlewanie.',
      care: { light: 'od półcienia do jasnego miejsca', water: 'gdy ziemia przeschnie do połowy doniczki', temp: '15–28 °C', tip: 'Pędy można przyciąć i ukorzenić w wodzie.' } },
    { id: 'kalatea', name: 'Kalatea okrągłolistna', latin: 'Goeppertia orbifolia (Calathea orbifolia)', img: 'photo-1714507767656-2fb307e1b03d',
      tags: ['shade', 'pet'], pet: true,
      sizes: [['S', 'wys. ok. 30 cm, doniczka 12 cm', 59], ['M', 'wys. ok. 50 cm, doniczka 17 cm', 99]],
      lead: 'Duże, okrągłe liście w srebrzyste pasy. Wieczorem lekko je unosi, rano opuszcza. Lubi wilgotne powietrze.',
      care: { light: 'półcień, bez bezpośredniego słońca', water: 'ziemia stale lekko wilgotna, woda odstana', temp: '18–25 °C', tip: 'Postaw ją w łazience z oknem albo obok nawilżacza.' } },
    { id: 'sansewieria', name: 'Sansewieria gwinejska', latin: 'Dracaena trifasciata', img: 'photo-1687552212914-03a30c82053c',
      tags: ['easy', 'shade'], pet: false, badge: 'Bestseller',
      sizes: [['S', 'wys. ok. 35 cm, doniczka 12 cm', 49], ['M', 'wys. ok. 60 cm, doniczka 17 cm', 89]],
      lead: 'Sztywne, wyprostowane liście. Wytrzymuje cień, suche powietrze i rzadkie podlewanie.',
      care: { light: 'każde, od cienia po jasne okno', water: 'rzadko – co 2–4 tygodnie, zimą jeszcze rzadziej', temp: '15–30 °C', tip: 'Najczęstszy błąd to za dużo wody, nie za mało.' } },
    { id: 'pilea', name: 'Pilea peperomiowata', latin: 'Pilea peperomioides', img: 'photo-1609061801093-1b7a8a574c69',
      tags: ['easy', 'pet'], pet: true,
      sizes: [['S', 'wys. ok. 20 cm, doniczka 12 cm', 35], ['M', 'wys. ok. 30 cm, doniczka 15 cm', 59]],
      lead: 'Okrągłe liście na cienkich ogonkach. Wypuszcza małe sadzonki, którymi łatwo się dzielić.',
      care: { light: 'jasne, rozproszone', water: 'gdy ziemia przeschnie na głębokość 2 cm', temp: '15–25 °C', tip: 'Sadzonki odetnij, gdy mają 3–4 własne liście.' } },
    { id: 'zamiokulkas', name: 'Zamiokulkas', latin: 'Zamioculcas zamiifolia', img: 'photo-1632207691143-643e2a9a9361',
      tags: ['easy', 'shade'], pet: false,
      sizes: [['S', 'wys. ok. 35 cm, doniczka 12 cm', 79], ['M', 'wys. ok. 60 cm, doniczka 17 cm', 129]],
      lead: 'Błyszczące liście, które dobrze wyglądają nawet w ciemniejszym kącie. Magazynuje wodę w kłączach.',
      care: { light: 'półcień do jasnego miejsca', water: 'co 2–3 tygodnie, gdy ziemia całkiem przeschnie', temp: '16–28 °C', tip: 'Dobra roślina do biura i na długie wyjazdy.' } },
    { id: 'haworsja', name: 'Haworsja paskowana', latin: 'Haworthiopsis attenuata', img: 'photo-1509423350716-97f9360b4e09',
      tags: ['easy', 'pet'], pet: true, soldOut: true,
      sizes: [['S', 'wys. ok. 12 cm, doniczka 9 cm', 29]],
      lead: 'Mały sukulent z białymi paskami. Mieści się na biurku i parapecie.',
      care: { light: 'jasne, może być słońce poranne', water: 'oszczędnie, gdy ziemia całkiem przeschnie', temp: '12–28 °C', tip: 'Zimą wystarczy podlać raz w miesiącu.' } }
  ];

  var FILTERS = [['all', 'Wszystkie'], ['easy', 'Łatwe w uprawie'], ['shade', 'Do półcienia'], ['big', 'Duże rośliny'], ['pet', 'Bezpieczne dla zwierząt']];
  var FREE = 199, SHIP = 19.99;
  var fmt = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' });
  function zl(n) { return fmt.format(n); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function byId(id) { for (var i = 0; i < P.length; i++) { if (P[i].id === id) { return P[i]; } } return null; }
  function sizeOf(p, s) { for (var i = 0; i < p.sizes.length; i++) { if (p.sizes[i][0] === s) { return p.sizes[i]; } } return p.sizes[0]; }
  function potOf(id) { for (var i = 0; i < POTS.length; i++) { if (POTS[i].id === id) { return POTS[i]; } } return POTS[0]; }
  function round2(n) { return Math.round(n * 100) / 100; }
  function unitPrice(p, s, pot) { var base = sizeOf(p, s)[2]; if (p.sale) { base = round2(base * (100 - p.sale) / 100); } return round2(base + potOf(pot).add); }
  function fromPrice(p) { return unitPrice(p, p.sizes[0][0], 'none'); }

  // ---------- koszyk (localStorage; brak dostępu nie psuje sklepu)
  var KEY = 'lisciownia-demo-koszyk';
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY) || '[]'); if (!Array.isArray(cart)) { cart = []; } } catch (e) { cart = []; }
  cart = cart.filter(function (l) { var p = byId(l.id); return p && !p.soldOut && l.qty > 0; });
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) { /* tryb prywatny */ } }
  function lineKey(l) { return l.id + '|' + l.size + '|' + l.pot; }
  function subtotal() { return round2(cart.reduce(function (a, l) { return a + unitPrice(byId(l.id), l.size, l.pot) * l.qty; }, 0)); }
  function count() { return cart.reduce(function (a, l) { return a + l.qty; }, 0); }
  function shipping(sub) { return sub === 0 || sub >= FREE ? 0 : SHIP; }
  function add(id, size, pot, qty) {
    var k = id + '|' + size + '|' + pot, found = null;
    cart.forEach(function (l) { if (lineKey(l) === k) { found = l; } });
    if (found) { found.qty = Math.min(20, found.qty + qty); } else { cart.push({ id: id, size: size, pot: pot, qty: qty }); }
    save(); renderCount();
  }

  var $main = document.getElementById('main');
  var $count = document.querySelector('.cart-count');
  var $cart = document.getElementById('cart');
  var $cartBody = $cart.querySelector('.cart-body');
  var $scrim = document.querySelector('.scrim');
  var $toast = document.querySelector('.toast');
  var lastFocus = null, toastT = null;

  function renderCount() { $count.textContent = count(); }
  function toast(t) { $toast.textContent = t; $toast.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { $toast.classList.remove('on'); }, 2600); }

  // cena rośliny (promocja i najniższa cena z 30 dni dotyczą rośliny); osłonka to osobna dopłata
  function priceHtml(p, s, pot) {
    var plant = unitPrice(p, s, 'none'), add = potOf(pot || 'none').add, html;
    if (!p.sale) { html = '<p class="price">' + zl(plant) + '</p>'; }
    else {
      html = '<p class="price"><span class="now-sale">' + zl(plant) + '</span><s aria-label="Cena przed obniżką">' + zl(sizeOf(p, s)[2]) + '</s></p>' +
        '<p class="omni">Najniższa cena z 30 dni przed obniżką: ' + zl(p.low30[s]) + '</p>';
    }
    if (add) { html += '<p class="omni">Z osłonką (+' + zl(add) + '): <b>' + zl(round2(plant + add)) + '</b></p>'; }
    return html;
  }

  // ---------- strona główna
  var state = { filter: 'all', sort: 'rec' };
  function home() {
    document.title = 'Liściownia – rośliny doniczkowe (demo sklepu)';
    $main.innerHTML =
      '<section class="hero">' +
        '<div class="hero-text"><p class="eyebrow">Rośliny doniczkowe · wysyłka w całej Polsce</p>' +
        '<h1>Zieleń, która zostaje na lata</h1>' +
        '<p>Wybieramy rośliny, które dobrze znoszą zwykłe mieszkanie, i podpowiadamy, gdzie je postawić. Do każdej możesz dobrać osłonkę.</p>' +
        '<p><a class="btn" href="#rosliny">Zobacz rośliny</a></p></div>' +
        '<div class="hero-img"><img src="' + src('photo-1637967885705-a60e3fea266d', 900, 1000) + '" srcset="' + set('photo-1637967885705-a60e3fea266d', 900, 1000) + '" sizes="(max-width: 900px) 100vw, 50vw" width="900" height="1000" alt="Monstera z wysoką podporą w białej doniczce na jasnym tle" fetchpriority="high"></div>' +
      '</section>' +
      '<section class="section" id="rosliny" aria-labelledby="h-rosliny"><h2 id="h-rosliny">Rośliny</h2>' +
        '<div class="tools"><fieldset class="chips"><legend>Filtr</legend>' +
          FILTERS.map(function (f) { return '<button type="button" class="chip" data-f="' + f[0] + '" aria-pressed="' + (state.filter === f[0]) + '">' + f[1] + '</button>'; }).join('') +
        '</fieldset><div class="sort"><label for="sort">Sortuj</label><select id="sort">' +
          '<option value="rec">Polecane</option><option value="asc">Cena: od najniższej</option><option value="desc">Cena: od najwyższej</option></select></div></div>' +
        '<p class="count" aria-live="polite"></p><div class="grid"></div></section>' +
      '<section class="stem" aria-label="Jak wysyłamy">' +
        '<div><h3>Pakujemy jak w szklarni</h3><p>Doniczka w osłonie, liście w papierze. Od listopada do marca dokładamy ocieplenie i ogrzewacz.</p></div>' +
        '<div><h3>Wysyłka pon.–śr.</h3><p>Nadajemy na początku tygodnia, żeby roślina nie leżała w sortowni przez weekend.</p></div>' +
        '<div><h3>Karta pielęgnacji</h3><p>Do każdej rośliny: światło, podlewanie, temperatura i jedna rada, która naprawdę pomaga.</p></div>' +
      '</section>';
    var sel = document.getElementById('sort');
    sel.value = state.sort;
    sel.addEventListener('change', function () { state.sort = sel.value; listing(); });
    $main.querySelectorAll('.chip').forEach(function (b) {
      b.addEventListener('click', function () { state.filter = b.getAttribute('data-f'); $main.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); listing(); });
    });
    listing();
  }
  function listing() {
    var list = P.filter(function (p) { return state.filter === 'all' || p.tags.indexOf(state.filter) >= 0; });
    if (state.sort !== 'rec') { list = list.slice().sort(function (a, b) { return state.sort === 'asc' ? fromPrice(a) - fromPrice(b) : fromPrice(b) - fromPrice(a); }); }
    $main.querySelector('.count').textContent = list.length + (list.length === 1 ? ' roślina' : (list.length < 5 ? ' rośliny' : ' roślin'));
    $main.querySelector('.grid').innerHTML = list.length ? list.map(card).join('') : '<p class="empty">Brak roślin w tym filtrze.</p>';
  }
  function card(p) {
    var badge = p.soldOut ? '<span class="badge out">Wyprzedane</span>' : (p.badge ? '<span class="badge' + (p.sale ? ' sale' : '') + '">' + (p.sale ? '−' + p.sale + '%' : p.badge) + '</span>' : '');
    var s = p.sizes[0][0];
    var price = p.sale ? priceHtml(p, s, 'none').replace('<p class="price">', '<p class="price">od ') : '<p class="price">' + (p.sizes.length > 1 ? 'od ' : '') + zl(fromPrice(p)) + '</p>';
    return '<a class="card" href="#/p/' + p.id + '">' + badge +
      '<div class="card-img"><img src="' + src(p.img, 600, 750) + '" srcset="' + set(p.img, 600, 750) + '" sizes="(max-width: 560px) 50vw, (max-width: 900px) 50vw, 33vw" width="600" height="750" alt="' + esc(p.name) + ' w doniczce" loading="lazy"></div>' +
      '<div class="card-b"><p class="card-name">' + esc(p.name) + '</p><p class="card-latin">' + esc(p.latin) + '</p>' + price + '</div></a>';
  }

  // ---------- karta produktu
  function product(id) {
    var p = byId(id);
    if (!p) { return notFound(); }
    document.title = p.name + ' – Liściownia (demo)';
    var sel = { size: p.sizes[Math.min(1, p.sizes.length - 1)][0], pot: 'none', qty: 1 };
    var sizesHtml = p.sizes.map(function (s) {
      var sid = 'size-' + s[0];
      return '<input type="radio" name="size" id="' + sid + '" value="' + s[0] + '"' + (s[0] === sel.size ? ' checked' : '') + '>' +
        '<label for="' + sid + '"><span><b>' + s[0] + '</b> · ' + esc(s[1]) + '</span><span>' + zl(unitPrice(p, s[0], 'none')) + '</span></label>';
    }).join('');
    var potsHtml = POTS.map(function (o) {
      var pid = 'pot-' + o.id;
      return '<input type="radio" name="pot" id="' + pid + '" value="' + o.id + '"' + (o.id === sel.pot ? ' checked' : '') + '>' +
        '<label for="' + pid + '"><span>' + o.name + '</span><span>' + (o.add ? '+ ' + zl(o.add) : 'w cenie') + '</span></label>';
    }).join('');
    var related = P.filter(function (x) { return x.id !== p.id && !x.soldOut && x.tags.some(function (t) { return p.tags.indexOf(t) >= 0; }); }).slice(0, 3);
    $main.innerHTML =
      '<section class="section"><p class="crumb"><a href="#/">Sklep</a> / ' + esc(p.name) + '</p>' +
      '<div class="pdp"><div class="pdp-img"><img src="' + src(p.img, 900, 1125) + '" srcset="' + set(p.img, 900, 1125) + '" sizes="(max-width: 900px) 100vw, 52vw" width="900" height="1125" alt="' + esc(p.name) + ' (' + esc(p.latin) + ') w doniczce"></div>' +
      '<div><h1>' + esc(p.name) + '</h1><p class="latin">' + esc(p.latin) + '</p><div class="pp"></div>' +
      '<p class="lead">' + esc(p.lead) + '</p>' +
      '<form class="buyform" novalidate>' +
        '<fieldset class="opt"><legend>Rozmiar</legend><div class="opt-list">' + sizesHtml + '</div></fieldset>' +
        '<fieldset class="opt"><legend>Osłonka</legend><div class="opt-list">' + potsHtml + '</div></fieldset>' +
        '<div class="buy"><div class="qty" role="group" aria-label="Ilość"><button type="button" data-q="-1" aria-label="Mniej">−</button><input id="qty" type="number" min="1" max="20" value="1" aria-label="Ilość sztuk" inputmode="numeric"><button type="button" data-q="1" aria-label="Więcej">+</button></div>' +
        '<button class="btn" type="submit"' + (p.soldOut ? ' disabled' : '') + '>' + (p.soldOut ? 'Wyprzedane' : 'Dodaj do koszyka') + '</button></div>' +
        (p.soldOut ? '<p class="note">Wróci w przyszłym tygodniu (dane przykładowe).</p>' : '<p class="note">Wysyłka w najbliższy poniedziałek, wtorek lub środę.</p>') +
      '</form>' +
      '<span class="pet' + (p.pet ? '' : ' no') + '">' + (p.pet ? 'Bezpieczna dla kotów i psów' : 'Trzymaj z dala od kotów i psów') + '</span>' +
      '<table class="care"><caption>Pielęgnacja</caption>' +
        '<tr><th scope="row">Światło</th><td>' + esc(p.care.light) + '</td></tr>' +
        '<tr><th scope="row">Podlewanie</th><td>' + esc(p.care.water) + '</td></tr>' +
        '<tr><th scope="row">Temperatura</th><td>' + esc(p.care.temp) + '</td></tr>' +
        '<tr><th scope="row">Rada</th><td>' + esc(p.care.tip) + '</td></tr></table>' +
      '</div></div></section>' +
      (related.length ? '<section class="section" aria-labelledby="h-rel"><h2 id="h-rel">Podobne rośliny</h2><div class="grid grid-rel">' + related.map(card).join('') + '</div></section>' : '');
    var $pp = $main.querySelector('.pp');
    var $qty = document.getElementById('qty');
    function upd() { $pp.innerHTML = priceHtml(p, sel.size, sel.pot); }
    upd();
    $main.querySelectorAll('input[name=size]').forEach(function (r) { r.addEventListener('change', function () { sel.size = r.value; upd(); }); });
    $main.querySelectorAll('input[name=pot]').forEach(function (r) { r.addEventListener('change', function () { sel.pot = r.value; upd(); }); });
    function setQty(n) { n = parseInt(n, 10); if (isNaN(n) || n < 1) { n = 1; } if (n > 20) { n = 20; } sel.qty = n; $qty.value = n; }
    $main.querySelectorAll('[data-q]').forEach(function (b) { b.addEventListener('click', function () { setQty(sel.qty + parseInt(b.getAttribute('data-q'), 10)); }); });
    $qty.addEventListener('change', function () { setQty($qty.value); });
    $main.querySelector('.buyform').addEventListener('submit', function (e) {
      e.preventDefault();
      if (p.soldOut) { return; }
      add(p.id, sel.size, sel.pot, sel.qty);
      toast('Dodano: ' + p.name + ', ' + sel.size + (sel.qty > 1 ? ' × ' + sel.qty : ''));
      openCart();
    });
  }

  // ---------- koszyk (panel)
  function renderCart() {
    if (!cart.length) {
      $cartBody.innerHTML = '<p>Koszyk jest pusty.</p><p><a class="btn ghost" href="#/" data-close>Wróć do roślin</a></p>';
    } else {
      var sub = subtotal(), sh = shipping(sub), left = round2(FREE - sub);
      $cartBody.innerHTML =
        '<div class="ship-bar">' + (left > 0 ? 'Do darmowej dostawy brakuje <b>' + zl(left) + '</b>' : '<b>Masz darmową dostawę</b>') +
          '<div class="track" aria-hidden="true"><div class="fill" data-pct="' + Math.min(100, Math.round(sub / FREE * 100)) + '"></div></div></div>' +
        cart.map(function (l, i) {
          var p = byId(l.id), s = sizeOf(p, l.size), u = unitPrice(p, l.size, l.pot);
          return '<div class="line"><img src="' + src(p.img, 144, 180) + '" width="72" height="90" alt="">' +
            '<div><h3>' + esc(p.name) + '</h3><p>Rozmiar ' + s[0] + ' · ' + esc(potOf(l.pot).name.toLowerCase()) + '</p><p>' + zl(u) + ' / szt.</p>' +
            '<div class="qty" role="group" aria-label="Ilość: ' + esc(p.name) + '"><button type="button" data-i="' + i + '" data-d="-1" aria-label="Mniej">−</button><span>' + l.qty + '</span><button type="button" data-i="' + i + '" data-d="1" aria-label="Więcej">+</button></div>' +
            '<br><button type="button" class="rm" data-rm="' + i + '">Usuń</button></div>' +
            '<p class="lp">' + zl(round2(u * l.qty)) + '</p></div>';
        }).join('') +
        '<div class="sum"><dl><dt>Produkty</dt><dd>' + zl(sub) + '</dd><dt>Dostawa kurierem</dt><dd>' + (sh ? zl(sh) : 'gratis') + '</dd>' +
        '<dt class="total">Razem</dt><dd class="total">' + zl(round2(sub + sh)) + '</dd></dl>' +
        '<a class="btn" href="#/zamowienie" data-close>Przejdź do zamówienia</a></div>';
    }
    // szerokość paska z JS (CSSOM), bo CSP style-src 'self' blokuje atrybut style w HTML
    $cartBody.querySelectorAll('.fill[data-pct]').forEach(function (el) { el.style.width = el.getAttribute('data-pct') + '%'; });
    $cartBody.querySelectorAll('[data-d]').forEach(function (b) {
      b.addEventListener('click', function () {
        var l = cart[+b.getAttribute('data-i')];
        l.qty = Math.min(20, l.qty + parseInt(b.getAttribute('data-d'), 10));
        if (l.qty < 1) { cart.splice(+b.getAttribute('data-i'), 1); }
        save(); renderCount(); renderCart();
        var again = $cartBody.querySelector('[data-i="' + b.getAttribute('data-i') + '"][data-d="' + b.getAttribute('data-d') + '"]');
        (again || $cart.querySelector('.x')).focus();
      });
    });
    $cartBody.querySelectorAll('[data-rm]').forEach(function (b) {
      b.addEventListener('click', function () { cart.splice(+b.getAttribute('data-rm'), 1); save(); renderCount(); renderCart(); $cart.querySelector('.x').focus(); });
    });
    $cartBody.querySelectorAll('[data-close]').forEach(function (a) { a.addEventListener('click', closeCart); });
  }
  function openCart() {
    lastFocus = document.activeElement;
    renderCart();
    $cart.hidden = false; $scrim.hidden = false;
    document.body.style.overflow = 'hidden';
    $cart.querySelector('.x').focus();
  }
  function closeCart() {
    if ($cart.hidden) { return; }
    $cart.hidden = true; $scrim.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus && document.contains(lastFocus)) { lastFocus.focus(); }
  }
  document.querySelector('.cart-btn').addEventListener('click', openCart);
  $cart.querySelector('.x').addEventListener('click', closeCart);
  $scrim.addEventListener('click', closeCart);
  document.addEventListener('keydown', function (e) {
    if ($cart.hidden) { return; }
    if (e.key === 'Escape') { closeCart(); return; }
    if (e.key === 'Tab') {
      var f = $cart.querySelectorAll('a[href], button:not([disabled]), input, select');
      if (!f.length) { return; }
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // ---------- zamówienie (demo: nic nie jest wysyłane)
  function checkout() {
    document.title = 'Zamówienie – Liściownia (demo)';
    if (!cart.length) {
      $main.innerHTML = '<section class="section done"><h1>Koszyk jest pusty</h1><p><a class="btn" href="#/">Wróć do roślin</a></p></section>';
      return;
    }
    var sub = subtotal(), sh = shipping(sub);
    var f = function (id, label, type, ac, full) {
      return '<div class="field' + (full ? ' full' : '') + '"><label for="' + id + '">' + label + '</label><input id="' + id + '" name="' + id + '" type="' + type + '" autocomplete="' + ac + '" required aria-describedby="' + id + '-e"><p class="err" id="' + id + '-e"></p></div>';
    };
    $main.innerHTML =
      '<section class="section"><div class="co"><form class="coform" novalidate><h1>Zamówienie</h1>' +
      '<p class="note">To demo: dane nie opuszczają przeglądarki i nie są zapisywane.</p>' +
      '<fieldset><legend>Dane do wysyłki</legend><div class="form-grid">' +
        f('imie', 'Imię i nazwisko', 'text', 'name', true) + f('email', 'E-mail', 'email', 'email', false) + f('tel', 'Telefon dla kuriera', 'tel', 'tel', false) +
        f('ulica', 'Ulica i numer', 'text', 'street-address', true) + f('kod', 'Kod pocztowy', 'text', 'postal-code', false) + f('miasto', 'Miasto', 'text', 'address-level2', false) +
      '</div></fieldset>' +
      '<fieldset class="opt"><legend>Płatność</legend><div class="opt-list">' +
        ['BLIK', 'Karta płatnicza', 'Przelew tradycyjny'].map(function (m, i) { return '<input type="radio" name="pay" id="pay' + i + '" value="' + m + '"' + (i === 0 ? ' checked' : '') + '><label for="pay' + i + '"><span>' + m + '</span><span>' + (i === 2 ? 'wysyłka po zaksięgowaniu' : '') + '</span></label>'; }).join('') +
      '</div></fieldset>' +
      '<label class="check"><input type="checkbox" id="reg" required aria-describedby="reg-e"><span>Akceptuję regulamin sklepu i zapoznałam/em się z informacją o prawie odstąpienia od umowy (w demo regulamin nie istnieje).</span></label><p class="err" id="reg-e"></p>' +
      '<button class="btn" type="submit">Zamawiam i płacę ' + zl(round2(sub + sh)) + '</button></form>' +
      '<aside class="co-sum" aria-labelledby="h-sum"><h2 id="h-sum">Podsumowanie</h2><ul>' +
        cart.map(function (l) { var p = byId(l.id); return '<li><span>' + esc(p.name) + ' ' + l.size + ', ' + esc(potOf(l.pot).name.toLowerCase()) + ' × ' + l.qty + '</span><span>' + zl(round2(unitPrice(p, l.size, l.pot) * l.qty)) + '</span></li>'; }).join('') +
        '<li><span>Dostawa kurierem</span><span>' + (sh ? zl(sh) : 'gratis') + '</span></li><li><b>Razem</b><b>' + zl(round2(sub + sh)) + '</b></li></ul>' +
        '<p class="note">Ceny zawierają VAT. Kurier dostarcza zwykle w 1–2 dni robocze od nadania.</p></aside></div></section>';
    var form = $main.querySelector('.coform');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, firstBad = null;
      function bad(id, msg) { var el = document.getElementById(id); el.setAttribute('aria-invalid', 'true'); document.getElementById(id + '-e').textContent = msg; ok = false; if (!firstBad) { firstBad = el; } }
      ['imie', 'email', 'tel', 'ulica', 'kod', 'miasto'].forEach(function (id) { var el = document.getElementById(id); el.removeAttribute('aria-invalid'); document.getElementById(id + '-e').textContent = ''; });
      document.getElementById('reg-e').textContent = '';
      var v = function (id) { return document.getElementById(id).value.trim(); };
      if (v('imie').length < 3) { bad('imie', 'Podaj imię i nazwisko.'); }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) { bad('email', 'Podaj poprawny adres e-mail.'); }
      if (v('tel').replace(/\D/g, '').length < 9) { bad('tel', 'Podaj numer telefonu (9 cyfr).'); }
      if (v('ulica').length < 3) { bad('ulica', 'Podaj ulicę i numer.'); }
      if (!/^\d{2}-\d{3}$/.test(v('kod'))) { bad('kod', 'Kod pocztowy w formacie 00-000.'); }
      if (v('miasto').length < 2) { bad('miasto', 'Podaj miasto.'); }
      if (!document.getElementById('reg').checked) { document.getElementById('reg-e').textContent = 'Zaznacz akceptację regulaminu.'; ok = false; if (!firstBad) { firstBad = document.getElementById('reg'); } }
      if (!ok) { firstBad.focus(); return; }
      var total = round2(subtotal() + shipping(subtotal())), n = count(), pay = form.querySelector('input[name=pay]:checked').value;
      cart = []; save(); renderCount();
      $main.innerHTML = '<section class="section done"><h1>Dziękujemy – tak wyglądałoby potwierdzenie</h1>' +
        '<div class="box"><p><b>To jest demo.</b> Zamówienie nie zostało wysłane, a dane z formularza nie opuściły przeglądarki. Koszyk został wyczyszczony.</p></div>' +
        '<p>W prawdziwym sklepie klient zobaczyłby tu numer zamówienia, a na e-mail dostałby potwierdzenie: ' + n + ' szt., razem ' + zl(total) + ', płatność: ' + esc(pay) + '.</p>' +
        '<p><a class="btn" href="#/">Wróć do sklepu</a></p></section>';
      $main.focus();
    });
  }

  function info() {
    document.title = 'Dostawa i zwroty – Liściownia (demo)';
    $main.innerHTML = '<section class="section info"><h1>Dostawa i zwroty</h1>' +
      '<p class="note">Treść przykładowa dla demo sklepu.</p>' +
      '<h2>Dostawa</h2><table><tr><th>Kurier, cała Polska</th><td>' + zl(SHIP) + '</td></tr><tr><th>Zamówienie od ' + zl(FREE) + '</th><td>gratis</td></tr></table>' +
      '<p>Rośliny nadajemy od poniedziałku do środy, żeby nie czekały w sortowni przez weekend. Od listopada do marca pakujemy je w ocieplenie z ogrzewaczem.</p>' +
      '<h2>Odstąpienie od umowy</h2><p>Konsument może odstąpić od umowy w ciągu 14 dni od otrzymania paczki, bez podawania przyczyny. Wystarczy wiadomość e-mail; roślinę odsyła się w ciągu kolejnych 14 dni. Zwracamy pieniądze za produkt i za najtańszą oferowaną dostawę.</p>' +
      '<h2>Uszkodzenie w transporcie</h2><p>Jeśli roślina dotarła uszkodzona, napisz do nas i dołącz zdjęcie paczki i rośliny – wyślemy nową albo zwrócimy pieniądze.</p>' +
      '<p><a class="btn ghost" href="#/">Wróć do sklepu</a></p></section>';
  }
  function notFound() {
    document.title = 'Nie znaleziono – Liściownia (demo)';
    $main.innerHTML = '<section class="section done"><h1>Nie ma takiej strony</h1><p><a class="btn" href="#/">Wróć do sklepu</a></p></section>';
  }

  function route() {
    var h = location.hash || '#/';
    closeCart();
    if (h === '#rosliny') { if (!document.getElementById('rosliny')) { home(); } document.getElementById('rosliny').scrollIntoView(); return; }
    if (h === '#/' || h === '#') { home(); }
    else if (h.indexOf('#/p/') === 0) { product(decodeURIComponent(h.slice(4))); }
    else if (h === '#/zamowienie') { checkout(); }
    else if (h === '#/dostawa') { info(); }
    else { notFound(); }
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  renderCount();
  route();
})();
