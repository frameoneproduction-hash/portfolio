/* Prella — koncepcja sklepu (makieta). Bez cookies, bez analityki, bez zapytań sieciowych poza zdjęciami. */
(function () {
  'use strict';

  /* ---------- Dane ---------- */
  var CATS = [
    { id: 'pod-umywalke', name: 'Szafki pod umywalkę', desc: 'Wiszące i stojące, od 40 do 100 cm', photo: '1600488999585-e4364713b90a' },
    { id: 'wiszace', name: 'Szafki wiszące', desc: 'Lekka forma, łatwe sprzątanie podłogi', photo: '1712214741533-3dd5b8013ca7' },
    { id: 'stojace', name: 'Szafki stojące', desc: 'Dużo miejsca na ręczniki i kosmetyki', photo: '1774578342098-66adff9c1fe1' },
    { id: 'zestawy', name: 'Zestawy z umywalką', desc: 'Szafka i umywalka dobrane do siebie', photo: '1682888818696-906287d759f5' },
    { id: 'slupki', name: 'Słupki łazienkowe', desc: 'Wysokie szafki do kompletu', photo: '1595515106883-5d5da3043540' }
  ];
  var CAT = {};
  CATS.forEach(function (c) { CAT[c.id] = c; });

  var COLORS = [
    { id: 'bialy', name: 'Biały mat', hex: '#f1f0ec', add: 0, stock: true },
    { id: 'dab', name: 'Dąb naturalny', hex: '#c39a6b', add: 100, stock: false, wood: true },
    { id: 'grafit', name: 'Grafit', hex: '#4a4d50', add: 0, stock: true },
    { id: 'zielen', name: 'Zieleń butelkowa', hex: '#2e4d3f', add: 150, stock: false }
  ];
  var FRONTS = [
    { id: 'gladki', name: 'Gładki', add: 0, made: false },
    { id: 'lamele', name: 'Lamele (ryflowany)', add: 150, made: true },
    { id: 'frezowany', name: 'Frezowany', add: 120, made: true }
  ];
  var SINK_NONE = { id: 'bez', name: 'Bez umywalki', add: 0 };

  function widths(list) { return list.map(function (w) { return { id: String(w[0]), name: w[0] + ' cm', cm: w[0], price: w[1], old: w[2] || null }; }); }

  var PRODUCTS = [
    {
      id: 'lino', name: 'Szafka pod umywalkę Lino, wisząca', cats: ['pod-umywalke', 'wiszace'], mount: 'wall', drawers: 2,
      sku: 'PR-LINO', badge: 'Bestseller', short: 'Wisząca szafka z dwiema szufladami i frontem do wyboru. Najchętniej wybierana w wersji z lamelami.',
      widths: widths([[50, 899], [60, 999], [80, 1299], [100, 1599]]), defaults: { width: '60', color: 'dab', front: 'lamele', sink: 'bez' },
      sinkAdd: 349, height: 52, depth: 46, photos: ['1712214741533-3dd5b8013ca7', '1603825491103-bd638b1873b0', '1733426107854-ee00a25d72a7'],
      desc: ['Lino to wisząca szafka pod umywalkę nablatową lub wpuszczaną. Dwie pełne szuflady mieszczą kosmetyki, ręczniki i zapas środków czystości, a wycięcie na syfon jest już przygotowane.', 'Szafkę montuje się do ściany na dwóch zawieszkach z regulacją — pod spodem zostaje wolna podłoga, którą łatwo umyć.']
    },
    {
      id: 'nord', name: 'Szafka pod umywalkę Nord, wisząca z szufladą', cats: ['pod-umywalke', 'wiszace'], mount: 'wall', drawers: 1,
      sku: 'PR-NORD', short: 'Minimalistyczna szafka z jedną głęboką szufladą i frezowanym uchwytem.',
      widths: widths([[60, 849], [80, 1149], [100, 1449]]), defaults: { width: '60', color: 'bialy', front: 'gladki', sink: 'bez' },
      sinkAdd: 349, height: 45, depth: 46, photos: ['1629079447777-1e605162dc8d', '1631048499052-e6d9f305d2c0', '1661107259637-4e1c55462428'],
      desc: ['Jedna głęboka szuflada z organizerem w kształcie litery U omija syfon i daje maksimum miejsca.', 'Front bez uchwytów — szufladę otwiera się dzięki frezowi w górnej krawędzi.']
    },
    {
      id: 'verde', name: 'Zestaw Verde: szafka stojąca z umywalką', cats: ['zestawy', 'stojace'], mount: 'floor', doors: 2, sinkIncluded: true,
      sku: 'PR-VERDE', badge: 'Promocja', sale: true, short: 'Stojąca szafka z frezowanymi frontami i ceramiczną umywalką w komplecie.',
      widths: widths([[60, 1899, 2199], [80, 2299, 2599], [100, 2699, 2999]]), defaults: { width: '80', color: 'zielen', front: 'frezowany', sink: 'w-zestawie' },
      height: 85, depth: 50, photos: ['1682888818696-906287d759f5', '1682888818704-6dc91e9d7532', '1564540579594-0930edb6de43'],
      desc: ['Klasyczna forma w nowoczesnym wydaniu: frezowane fronty, blat z umywalką ceramiczną i regulowane nóżki.', 'Zestaw dostarczamy z umywalką i syfonem. Wystarczy podłączyć baterię.']
    },
    {
      id: 'classica', name: 'Szafka stojąca Classica pod umywalkę', cats: ['pod-umywalke', 'stojace'], mount: 'floor', doors: 2,
      sku: 'PR-CLAS', short: 'Stojąca szafka z dwojgiem drzwi i półką w środku. Pasuje do umywalek nablatowych.',
      widths: widths([[60, 1199], [80, 1499], [100, 1799]]), defaults: { width: '80', color: 'bialy', front: 'frezowany', sink: 'bez' },
      sinkAdd: 349, height: 82, depth: 46, photos: ['1774578342098-66adff9c1fe1', '1564540579594-0930edb6de43', '1645891897764-d7398b7f302b'],
      desc: ['Dwoje drzwi z cichym domykiem i regulowana półka w środku. Nóżki z regulacją wysokości ułatwiają wypoziomowanie szafki.', 'Blat jest przygotowany pod umywalkę nablatową — otwór na syfon wycinamy na zamówienie.']
    },
    {
      id: 'oak', name: 'Szafka wisząca Oak z dwiema szufladami', cats: ['wiszace', 'pod-umywalke'], mount: 'wall', drawers: 2,
      sku: 'PR-OAK', badge: 'Nowość', short: 'Ciepłe wnętrze w kolorze dębu. Dwie szuflady z pełnym wysuwem.',
      widths: widths([[50, 1049], [60, 1149], [80, 1449]]), defaults: { width: '60', color: 'dab', front: 'gladki', sink: 'bez' },
      sinkAdd: 349, height: 52, depth: 46, photos: ['1771681278446-6f8eb0c7323f', '1600488999585-e4364713b90a', '1769356815043-ca0e8c571830'],
      desc: ['Oak łączy fakturę dębu z prostą bryłą. Szuflady mają pełny wysuw, więc widać całą zawartość.', 'Do szafki pasują lustra w drewnianej ramie i baterie w kolorze złota lub czerni.']
    },
    {
      id: 'alto', name: 'Słupek łazienkowy Alto, wiszący', cats: ['slupki'], mount: 'tall', doors: 1, noSink: true,
      sku: 'PR-ALTO', short: 'Wysoka szafka na ręczniki i kosmetyki. Do kompletu z szafkami Lino, Nord i Oak.',
      widths: widths([[30, 699], [40, 799]]), defaults: { width: '30', color: 'bialy', front: 'gladki', sink: 'bez' },
      height: 160, depth: 30, photos: ['1595515106883-5d5da3043540', '1584622650111-993a426fbf0a', '1629079447777-1e605162dc8d'],
      desc: ['Cztery półki ze szkła hartowanego i drzwi z cichym domykiem. Zawiasy można zamontować z lewej lub prawej strony.', 'Słupek wisi na ścianie, dzięki czemu łazienka wydaje się większa.']
    },
    {
      id: 'duo', name: 'Zestaw Duo z dwiema umywalkami', cats: ['zestawy', 'stojace'], mount: 'floor', doors: 4, sinkIncluded: true, double: true,
      sku: 'PR-DUO', short: 'Szeroka szafka stojąca z dwiema umywalkami — dla rodziny i dużych łazienek.',
      widths: widths([[120, 3299], [140, 3699]]), defaults: { width: '120', color: 'dab', front: 'gladki', sink: 'w-zestawie' },
      height: 85, depth: 50, photos: ['1781344334947-60c704bafd51', '1604769319166-010643ace337', '1696987007764-7f8b85dd3033'],
      desc: ['Dwie umywalki, czworo drzwi i dużo miejsca w środku. Rano dwie osoby mogą korzystać z łazienki jednocześnie.', 'Zestaw zawiera dwie umywalki ceramiczne i dwa syfony.']
    },
    {
      id: 'mini', name: 'Szafka pod umywalkę Mini, wisząca', cats: ['pod-umywalke', 'wiszace'], mount: 'wall', drawers: 0, doors: 1,
      sku: 'PR-MINI', short: 'Kompaktowa szafka do małej łazienki i toalety dla gości.',
      widths: widths([[40, 599], [50, 699]]), defaults: { width: '40', color: 'bialy', front: 'gladki', sink: 'bez' },
      sinkAdd: 299, height: 45, depth: 38, photos: ['1576698483491-8c43f0862543', '1620626011761-996317b8d101', '1635286771551-9d7241ce7811'],
      desc: ['Płytka konstrukcja (38 cm) zmieści się nawet w wąskiej toalecie. W środku półka i miejsce na syfon.', 'Drzwi otwierają się na lewo lub prawo — wybór przy montażu.']
    }
  ];
  var BY_ID = {};
  PRODUCTS.forEach(function (p) { BY_ID[p.id] = p; });

  var HERO = [
    { id: '1781344334947-60c704bafd51', eyebrow: 'Szafki łazienkowe Prella', h: 'Łazienka, w której wszystko ma swoje miejsce', p: 'Szafki pod umywalkę w czterech kolorach i trzech rodzajach frontu. Wybierz szerokość i od razu zobacz cenę.', cta: 'Zobacz szafki', href: '#/sklep', alt: 'Jasna łazienka z drewnianą szafką pod dwie umywalki' },
    { id: '1682888818696-906287d759f5', eyebrow: 'Nowy kolor', h: 'Zieleń butelkowa z frezowanym frontem', p: 'Zestaw Verde z umywalką — teraz w niższej cenie.', cta: 'Zobacz zestaw Verde', href: '#/produkt/verde', alt: 'Łazienka z zieloną szafką stojącą i marmurowym blatem' },
    { id: '1712214741533-3dd5b8013ca7', eyebrow: 'Szafki wiszące', h: 'Lamele, które ocieplają wnętrze', p: 'Wisząca szafka Lino w szerokościach od 50 do 100 cm.', cta: 'Zobacz szafkę Lino', href: '#/produkt/lino', alt: 'Wisząca szafka z ryflowanym frontem i umywalką nablatową' }
  ];

  var SHIPPING = [
    { id: 'inpost', name: 'Kurier InPost', note: '1–2 dni robocze od wysyłki', price: 24.99, small: true },
    { id: 'dpd', name: 'Kurier DPD', note: '1–2 dni robocze od wysyłki', price: 29.99, small: true },
    { id: 'paleta', name: 'Przesyłka paletowa', note: 'Dostawa do drzwi, awizacja SMS', price: 149, small: false }
  ];
  var FREE_FROM = 999;

  /* ---------- Stan (w pamięci) ---------- */
  var params = new URLSearchParams(location.search);
  var state = {
    cart: [{ id: 'lino', sel: { width: '60', color: 'dab', front: 'lamele', sink: 'bez' }, qty: 1 }],
    ship: 'inpost', pay: 'blik', sel: {}, view: {}, qty: {},
    shop: { cat: 'all', widths: [], colors: [], max: 4000, sort: 'rec' }
  };

  /* ---------- Narzędzia ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function zl(n) {
    var parts = n.toFixed(2).split('.');
    var int = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return int + ',' + parts[1] + ' zł';
  }
  function plural(n, one, few, many) {
    if (n === 1) return one;
    var d = n % 10, h = n % 100;
    if (d >= 2 && d <= 4 && !(h >= 12 && h <= 14)) return few;
    return many;
  }
  function find(list, id) { return list.filter(function (x) { return x.id === id; })[0]; }
  function sinkOptions(p) {
    if (p.noSink) return null;
    if (p.sinkIncluded) return [{ id: 'w-zestawie', name: p.double ? 'Dwie umywalki ceramiczne (w zestawie)' : 'Umywalka ceramiczna (w zestawie)', add: 0 }];
    return [SINK_NONE, { id: 'nablatowa', name: 'Ceramiczna nablatowa (+' + zl(p.sinkAdd).replace(',00', '') + ')', short: 'Ceramiczna nablatowa', add: p.sinkAdd }];
  }
  function selOf(p) {
    if (!state.sel[p.id]) state.sel[p.id] = JSON.parse(JSON.stringify(p.defaults));
    return state.sel[p.id];
  }
  function priceOf(p, sel) {
    var w = find(p.widths, sel.width);
    var extra = find(COLORS, sel.color).add + find(FRONTS, sel.front).add;
    var sinks = sinkOptions(p);
    if (sinks) extra += (find(sinks, sel.sink) || sinks[0]).add;
    return { price: w.price + extra, old: w.old ? w.old + extra : null };
  }
  function minPrice(p) {
    var w = p.widths[0];
    return { price: w.price, old: w.old, from: true };
  }
  function lead(p, sel) {
    var made = find(FRONTS, sel.front).made, stock = find(COLORS, sel.color).stock;
    if (stock && !made) return { avail: 'Dostępna od ręki', time: 'Wysyłka w 2–3 dni robocze', ok: true };
    if (!made) return { avail: 'Na zamówienie', time: 'Wysyłka w 7–10 dni roboczych', ok: false };
    return { avail: 'Wykonywana na zamówienie', time: 'Wysyłka w 10–14 dni roboczych', ok: false };
  }
  function needsPallet(p, sel) { return +sel.width >= 80 || p.mount === 'tall'; }
  function variantText(p, sel) {
    var parts = ['Szerokość: ' + sel.width + ' cm', 'Kolor: ' + find(COLORS, sel.color).name, 'Front: ' + find(FRONTS, sel.front).name];
    var sinks = sinkOptions(p);
    if (sinks) { var s = find(sinks, sel.sink) || sinks[0]; parts.push('Umywalka: ' + (s.short || s.name)); }
    return parts.join(' · ');
  }

  /* ---------- Zdjęcia ---------- */
  var U = 'https://images.unsplash.com/photo-';
  function usrc(id, w, h) { return U + id + '?w=' + w + '&amp;h=' + h + '&amp;q=80&amp;auto=format&amp;fit=crop'; }
  function photo(id, alt, w, h, o) {
    o = o || {};
    var ws = o.widths || [w];
    var set = ws.map(function (x) { return usrc(id, x, Math.round(x * h / w)) + ' ' + x + 'w'; }).join(', ');
    return '<img src="' + usrc(id, w, h) + '" srcset="' + set + '" sizes="' + (o.sizes || '100vw') + '" width="' + w + '" height="' + h + '" alt="' + esc(alt) + '"' +
      (o.eager ? ' loading="eager" fetchpriority="high"' : ' loading="lazy"') + ' decoding="async"' + (o.cls ? ' class="' + o.cls + '"' : '') + '>';
  }
  var SIZES = {
    card: [600, 600, [400, 600, 800], '(max-width: 759px) 50vw, (max-width: 1000px) 33vw, 25vw'],
    main: [1000, 1000, [600, 1000, 1400], '(max-width: 899px) 100vw, 55vw'],
    thumb: [160, 160, [160, 320], '80px'],
    line: [168, 168, [168, 336], '84px']
  };
  function pimg(p, i, size, alt) {
    var s = SIZES[size];
    return photo(p.photos[i], alt || '', s[0], s[1], { widths: s[2], sizes: s[3], eager: size === 'main' });
  }

  /* ---------- Rysunek szafki (SVG, zmienia się na żywo) ---------- */
  function shade(hex, amt) {
    var n = parseInt(hex.slice(1), 16);
    var r = n >> 16, g = (n >> 8) & 255, b = n & 255, tg = amt < 0 ? 0 : 255, k = Math.abs(amt);
    r = Math.round((tg - r) * k + r); g = Math.round((tg - g) * k + g); b = Math.round((tg - b) * k + b);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  function panel(x, y, w, h, color, front, opts) {
    var dark = shade(color, color === '#f1f0ec' ? -0.18 : -0.28);
    var light = shade(color, 0.12);
    var out = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + color + '" stroke="' + dark + '" stroke-width="1.2"/>';
    if (opts.wood && front !== 'lamele') {
      for (var gy = y + 6; gy < y + h - 3; gy += 7) {
        out += '<path d="M' + (x + 2) + ' ' + gy + 'q' + (w / 4) + ' ' + ((gy % 3) - 1) * 1.5 + ' ' + (w / 2) + ' 0t' + (w / 2 - 4) + ' 0" stroke="' + shade(color, -0.2) + '" stroke-width=".7" fill="none" opacity=".55"/>';
      }
    }
    if (front === 'lamele') {
      for (var lx = x + 5; lx < x + w - 2; lx += 6) {
        out += '<line x1="' + lx + '" y1="' + (y + 2) + '" x2="' + lx + '" y2="' + (y + h - 2) + '" stroke="' + dark + '" stroke-width="1.3" opacity=".75"/>';
        out += '<line x1="' + (lx + 1.6) + '" y1="' + (y + 2) + '" x2="' + (lx + 1.6) + '" y2="' + (y + h - 2) + '" stroke="' + light + '" stroke-width=".8" opacity=".6"/>';
      }
    } else if (front === 'frezowany') {
      var m = Math.max(6, Math.min(w, h) * 0.14);
      out += '<rect x="' + (x + m) + '" y="' + (y + m) + '" width="' + (w - 2 * m) + '" height="' + (h - 2 * m) + '" fill="none" stroke="' + dark + '" stroke-width="1.6"/>';
      out += '<rect x="' + (x + m + 2.5) + '" y="' + (y + m + 2.5) + '" width="' + (w - 2 * m - 5) + '" height="' + (h - 2 * m - 5) + '" fill="none" stroke="' + light + '" stroke-width="1" opacity=".7"/>';
    }
    if (opts.handle === 'top') {
      out += '<rect x="' + (x + w / 2 - Math.min(24, w / 4)) + '" y="' + (y + 4) + '" width="' + Math.min(48, w / 2) + '" height="3" rx="1.5" fill="#2a2a2a" opacity=".85"/>';
    } else if (opts.handle === 'side') {
      var hx = opts.side === 'left' ? x + 6 : x + w - 9;
      out += '<rect x="' + hx + '" y="' + (y + h / 2 - 12) + '" width="3" height="24" rx="1.5" fill="#2a2a2a" opacity=".85"/>';
    }
    return out;
  }
  function cabinetSVG(p, sel) {
    var color = find(COLORS, sel.color), front = sel.front, cm = +sel.width;
    var W = 400, floorY = 330;
    var maxCm = p.double ? 150 : 110;
    var w = p.mount === 'tall' ? 80 + (cm - 30) * 2.4 : Math.round(130 + (cm / maxCm) * 240);
    var x = (W - w) / 2, y, h, out = '';
    var wood = !!color.wood;
    out += '<rect width="400" height="400" fill="#f4f2ee"/><rect y="' + floorY + '" width="400" height="70" fill="#e3ded6"/>';
    if (p.mount === 'wall') { h = Math.round(p.height * 2); y = 160; }
    else if (p.mount === 'floor') { h = 150; y = floorY - 14 - h; }
    else { h = 250; y = 40; }
    var top = y;
    // umywalka i bateria
    var sinks = sinkOptions(p), sink = sinks ? (find(sinks, sel.sink) || sinks[0]) : null;
    var hasSink = sink && sink.id !== 'bez';
    if (p.mount !== 'tall') {
      out += '<rect x="' + (x - 3) + '" y="' + (top - 7) + '" width="' + (w + 6) + '" height="7" fill="' + (p.sinkIncluded ? '#ece9e3' : shade(color.hex, -0.08)) + '" stroke="' + shade(color.hex, -0.3) + '" stroke-width="1"/>';
      var centers = p.double ? [x + w * 0.27, x + w * 0.73] : [x + w / 2];
      centers.forEach(function (cx) {
        if (hasSink) {
          out += '<path d="M' + (cx - 34) + ' ' + (top - 7) + 'h68v-8q0 -14 -14 -14h-40q-14 0 -14 14z" fill="#ffffff" stroke="#c9c6c0" stroke-width="1.2"/>';
          out += '<path d="M' + (cx + 3) + ' ' + (top - 50) + 'v-12h-14" stroke="#2a2a2a" stroke-width="4" fill="none" stroke-linecap="round"/>';
          out += '<path d="M' + (cx - 11) + ' ' + (top - 62) + 'v8" stroke="#2a2a2a" stroke-width="4" stroke-linecap="round"/>';
        }
      });
    }
    // korpus
    out += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + shade(color.hex, -0.12) + '"/>';
    var g = 3, ix = x + g, iy = y + g, iw = w - 2 * g, ih = h - 2 * g;
    if (p.mount === 'tall') {
      out += panel(ix, iy, iw, ih, color.hex, front, { wood: wood, handle: 'side', side: 'left' });
    } else if (p.drawers === 2) {
      var h1 = Math.round(ih * 0.42);
      out += panel(ix, iy, iw, h1, color.hex, front, { wood: wood, handle: 'top' });
      out += panel(ix, iy + h1 + g, iw, ih - h1 - g, color.hex, front, { wood: wood, handle: 'top' });
    } else if (p.drawers === 1) {
      out += panel(ix, iy, iw, ih, color.hex, front, { wood: wood, handle: front === 'gladki' ? null : 'top' });
      if (front === 'gladki') out += '<rect x="' + ix + '" y="' + iy + '" width="' + iw + '" height="5" fill="' + shade(color.hex, -0.35) + '" opacity=".6"/>';
    } else {
      var n = p.doors || 1, dw = (iw - (n - 1) * g) / n;
      for (var i = 0; i < n; i++) {
        var side = (i % 2 === 0) ? 'right' : 'left';
        if (n === 1) side = 'right';
        out += panel(ix + i * (dw + g), iy, dw, ih, color.hex, front, { wood: wood, handle: 'side', side: side });
      }
    }
    if (p.mount === 'floor') {
      out += '<rect x="' + (x + 10) + '" y="' + (y + h) + '" width="8" height="14" fill="#2a2a2a"/><rect x="' + (x + w - 18) + '" y="' + (y + h) + '" width="8" height="14" fill="#2a2a2a"/>';
    } else {
      out += '<ellipse cx="' + (x + w / 2) + '" cy="' + (floorY + 6) + '" rx="' + (w / 2.2) + '" ry="5" fill="rgba(0,0,0,.06)"/>';
    }
    // wymiar
    var dy = p.mount === 'tall' ? y + h + 22 : (p.mount === 'wall' ? y + h + 28 : floorY + 30);
    out += '<g stroke="#6b665d" stroke-width="1"><line x1="' + x + '" y1="' + dy + '" x2="' + (x + w) + '" y2="' + dy + '"/><line x1="' + x + '" y1="' + (dy - 5) + '" x2="' + x + '" y2="' + (dy + 5) + '"/><line x1="' + (x + w) + '" y1="' + (dy - 5) + '" x2="' + (x + w) + '" y2="' + (dy + 5) + '"/></g>';
    out += '<rect x="' + (x + w / 2 - 26) + '" y="' + (dy - 10) + '" width="52" height="20" rx="4" fill="#f4f2ee"/><text x="' + (x + w / 2) + '" y="' + (dy + 4.5) + '" text-anchor="middle" font-family="system-ui, Segoe UI, sans-serif" font-size="13" font-weight="600" fill="#3a372f">' + cm + ' cm</text>';
    var label = p.name + ': szerokość ' + cm + ' cm, kolor ' + color.name.toLowerCase() + ', front ' + find(FRONTS, front).name.toLowerCase() + (hasSink ? ', z umywalką' : '');
    return '<svg viewBox="0 0 400 400" role="img" aria-label="Wizualizacja — ' + esc(label) + '" preserveAspectRatio="xMidYMid meet">' + out + '</svg>';
  }

  /* ---------- Szablony wspólne ---------- */
  function crumbs(items) {
    return '<nav class="crumbs" aria-label="Okruszki"><ol>' + items.map(function (it, i) {
      return '<li>' + (it[1] && i < items.length - 1 ? '<a href="' + it[1] + '">' + esc(it[0]) + '</a>' : '<span aria-current="page">' + esc(it[0]) + '</span>') + '</li>';
    }).join('') + '</ol></nav>';
  }
  function card(p) {
    var m = minPrice(p);
    var badge = p.badge ? '<span class="badge' + (p.sale ? ' badge--sale' : p.badge === 'Nowość' ? ' badge--new' : '') + '">' + p.badge + '</span>' : '';
    var sw = COLORS.map(function (c) { return '<i style="background:' + c.hex + '" title="' + c.name + '"></i>'; }).join('');
    return '<a class="card" href="#/produkt/' + p.id + '"><div class="card__img">' + pimg(p, 0, 'card') + '</div>' + badge +
      '<div class="card__body"><h3 class="card__name">' + esc(p.name) + '</h3>' +
      '<p class="card__meta">' + p.widths.map(function (w) { return w.cm; }).join(' / ') + ' cm</p>' +
      '<p class="card__sw" aria-label="4 kolory">' + sw + '</p>' +
      '<p class="card__price">od ' + zl(m.price) + (m.old ? '<s><span class="sr">Cena przed obniżką: </span>' + zl(m.old) + '</s>' : '') + '</p></div></a>';
  }

  var slideIdx = 0;
  function heroSlider() {
    var slides = HERO.map(function (h, i) {
      var tag = i === 0 ? 'h1' : 'h2';
      return '<div class="hero__slide" role="group" aria-roledescription="slajd" aria-label="' + (i + 1) + ' z ' + HERO.length + '"' + (i ? ' hidden' : '') + '>' +
        photo(h.id, h.alt, 1600, 800, { widths: [800, 1200, 1600, 2000], sizes: '(max-width: 759px) 260vw, 100vw', eager: i === 0, cls: 'hero__img' }) +
        '<div class="hero__shade" aria-hidden="true"></div><div class="wrap hero__content"><p class="hero__eyebrow">' + h.eyebrow + '</p><' + tag + ' class="hero__title">' + h.h + '</' + tag + '>' +
        '<p class="hero__text">' + h.p + '</p><a class="btn btn--light" href="' + h.href + '">' + h.cta + '</a></div></div>';
    }).join('');
    var dots = HERO.map(function (h, i) { return '<button type="button" class="hero__dot" data-slide="' + i + '" aria-label="Slajd ' + (i + 1) + '"' + (i ? '' : ' aria-current="true"') + '></button>'; }).join('');
    return '<section class="hero" aria-roledescription="karuzela" aria-label="Wyróżnione">' + slides +
      '<button type="button" class="hero__nav hero__nav--prev" data-slide="prev" aria-label="Poprzedni slajd"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2"/></svg></button>' +
      '<button type="button" class="hero__nav hero__nav--next" data-slide="next" aria-label="Następny slajd"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2"/></svg></button>' +
      '<div class="hero__dots">' + dots + '</div></section>';
  }
  function setSlide(i) {
    var slides = document.querySelectorAll('.hero__slide');
    if (!slides.length) return;
    slideIdx = (i + slides.length) % slides.length;
    slides.forEach(function (el, k) { el.hidden = k !== slideIdx; });
    document.querySelectorAll('.hero__dot').forEach(function (d, k) { if (k === slideIdx) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
  }

  /* ---------- Widoki ---------- */
  function viewHome() {
    var cats = CATS.map(function (c) {
      return '<a class="tile" href="#/sklep?kategoria=' + c.id + '">' + photo(c.photo, '', 600, 750, { widths: [400, 600, 900], sizes: '(max-width: 759px) 50vw, 20vw' }) +
        '<span class="tile__label"><span class="tile__name">' + c.name + '</span><span class="tile__desc">' + c.desc + '</span></span></a>';
    }).join('');
    var best = ['lino', 'verde', 'oak', 'nord'].map(function (id) { return card(BY_ID[id]); }).join('');
    var faq = [
      ['Czy szafka pasuje do mojej umywalki?', 'W opisie każdej szafki podajemy wymiary blatu i miejsce na syfon. Jeśli masz już umywalkę, napisz do nas jej wymiary — sprawdzimy, czy pasuje.'],
      ['Ile trwa realizacja zamówienia?', 'Szafki w kolorze białym i grafitowym z gładkim frontem wysyłamy w 2–3 dni robocze. Fronty lamelowe i frezowane wykonujemy na zamówienie — do 14 dni roboczych. Termin widzisz przy każdym wariancie.'],
      ['Jak dostarczacie duże szafki?', 'Szafki do 60 cm wysyłamy kurierem InPost lub DPD. Szersze szafki, zestawy i słupki jadą przesyłką paletową z dostawą do drzwi.'],
      ['Czy mogę zwrócić szafkę?', 'Tak. Masz 14 dni na odstąpienie od umowy bez podawania przyczyny. Wyjątkiem są produkty wykonane według Twojej specyfikacji, np. w niestandardowym wymiarze.'],
      ['Czy szafki są odporne na wilgoć?', 'Korpusy i fronty wykonujemy z płyty o podwyższonej odporności na wilgoć, a krawędzie oklejamy na całym obwodzie.']
    ].map(function (q) { return '<details class="faq__item"><summary>' + q[0] + '</summary><p>' + q[1] + '</p></details>'; }).join('');
    return heroSlider() +
      '<section class="section" aria-labelledby="h-cats"><div class="wrap"><div class="section__head"><div><p class="eyebrow">Kategorie</p><h2 id="h-cats">Znajdź szafkę do swojej łazienki</h2></div><a href="#/sklep">Wszystkie produkty →</a></div>' +
      '<div class="tiles5">' + cats + '</div></div></section>' +
      '<section class="section section--tight" aria-labelledby="h-best"><div class="wrap"><div class="section__head"><div><p class="eyebrow">Bestsellery</p><h2 id="h-best">Najczęściej wybierane</h2></div><a href="#/sklep">Zobacz wszystkie →</a></div>' +
      '<div class="grid grid--4">' + best + '</div></div></section>' +
      '<section class="section why" aria-labelledby="h-why"><div class="wrap"><div class="section__head"><div><p class="eyebrow">Dlaczego Prella</p><h2 id="h-why">Szafki, które wytrzymają lata w łazience</h2></div></div><div class="grid grid--3">' +
      whyItem('<path d="M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11Z" fill="none" stroke="currentColor" stroke-width="1.6"/>', 'Płyta wilgocioodporna', 'Korpus i fronty z płyty o podwyższonej odporności na wilgoć, krawędzie oklejone na całym obwodzie.') +
      whyItem('<rect x="4" y="5" width="16" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4 12h16M10 8.5h4M10 15.5h4" stroke="currentColor" stroke-width="1.6"/>', 'Cichy domyk', 'Szuflady i drzwi domykają się płynnie i bez trzaskania. Prowadnice z pełnym wysuwem.') +
      whyItem('<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8.5 12l2.5 2.5 4.5-5" fill="none" stroke="currentColor" stroke-width="1.6"/>', '3 lata gwarancji', 'Na korpusy, fronty i okucia. Szybka obsługa reklamacji bez odsyłania całej szafki.') +
      '</div></div></section>' +
      '<section class="section section--tight" aria-labelledby="h-del"><div class="wrap"><div class="delivery">' +
      '<div><p class="eyebrow">Dostawa</p><h2 id="h-del">Bezpiecznie do Twoich drzwi</h2><p class="muted">Każdą szafkę pakujemy w karton z narożnikami i folię ochronną. Przy odbiorze sprawdź paczkę w obecności kuriera.</p></div>' +
      '<ul class="delivery__list">' +
      '<li><strong>Kurier InPost lub DPD</strong><span>Szafki do 60 cm · od 24,99 zł · darmowa dostawa od 999 zł</span></li>' +
      '<li><strong>Przesyłka paletowa</strong><span>Szafki od 80 cm, zestawy i słupki · 149 zł · dostawa do drzwi z awizacją SMS</span></li>' +
      '<li><strong>Termin przy każdym wariancie</strong><span>Od 2–3 dni roboczych dla modeli dostępnych od ręki</span></li>' +
      '</ul></div></div></section>' +
      '<section class="section section--tight" aria-labelledby="h-faq"><div class="wrap faq"><div><p class="eyebrow">FAQ</p><h2 id="h-faq">Najczęstsze pytania</h2><p class="muted">Nie ma tu odpowiedzi? <a href="#/kontakt">Napisz do nas</a>.</p></div><div>' + faq + '</div></div></section>' +
      '<section class="section section--tight" aria-labelledby="h-news"><div class="wrap"><div class="newsletter">' +
      '<div><h2 id="h-news">Inspiracje do łazienki</h2><p>Raz w miesiącu: nowe kolory, aranżacje i promocje. Bez spamu.</p></div>' +
      '<form data-demo-form="news" novalidate><label class="sr" for="nl-email">Adres e-mail</label>' +
      '<div class="newsletter__row"><input id="nl-email" type="email" autocomplete="email" placeholder="Twój adres e-mail"><button class="btn btn--light" type="submit">Zapisz się</button></div>' +
      '<label class="consent check-row"><input type="checkbox"> <span>Zgadzam się na otrzymywanie newslettera. Mogę zrezygnować w każdej chwili.</span></label>' +
      '<p class="notice notice--demo" role="status" aria-live="polite"></p></form></div></div></section>';
  }
  function whyItem(icon, h, p) {
    return '<div class="why__item"><div class="why__icon"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">' + icon + '</svg></div><h3>' + h + '</h3><p>' + p + '</p></div>';
  }

  var ALL_WIDTHS = [30, 40, 50, 60, 80, 100, 120, 140];
  function viewShop(q) {
    var cat = q.get('kategoria');
    state.shop.cat = cat && CAT[cat] ? cat : (q.has('kategoria') ? 'all' : state.shop.cat);
    var title = state.shop.cat === 'all' ? 'Wszystkie szafki' : CAT[state.shop.cat].name;
    var catOpts = [{ id: 'all', name: 'Wszystkie' }].concat(CATS).map(function (c) {
      var n = c.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(function (p) { return p.cats.indexOf(c.id) > -1; }).length;
      return '<label class="opt-row"><input type="radio" name="f-cat" value="' + c.id + '"' + (state.shop.cat === c.id ? ' checked' : '') + '> <span>' + c.name + '</span><span class="count">' + n + '</span></label>';
    }).join('');
    var wOpts = ALL_WIDTHS.map(function (w) {
      return '<label class="chip"><input type="checkbox" name="f-w" value="' + w + '"' + (state.shop.widths.indexOf(w) > -1 ? ' checked' : '') + '><span>' + w + ' cm</span></label>';
    }).join('');
    var cOpts = COLORS.map(function (c) {
      return '<label class="opt-row"><input type="checkbox" name="f-c" value="' + c.id + '"' + (state.shop.colors.indexOf(c.id) > -1 ? ' checked' : '') + '> <i class="dotc" style="background:' + c.hex + '" aria-hidden="true"></i><span>' + c.name + '</span></label>';
    }).join('');
    return '<div class="wrap page-head">' + crumbs([['Strona główna', '#/'], ['Sklep', state.shop.cat === 'all' ? null : '#/sklep'], state.shop.cat === 'all' ? null : [title]].filter(Boolean)) + '<h1>' + title + '</h1></div>' +
      '<section class="wrap" aria-label="Produkty"><div class="shop">' +
      '<aside class="filters" aria-label="Filtry"><div class="filters__wrap">' +
      '<fieldset><legend>Kategoria</legend>' + catOpts + '</fieldset>' +
      '<fieldset><legend>Szerokość</legend><div class="chips2">' + wOpts + '</div></fieldset>' +
      '<fieldset><legend>Kolor</legend>' + cOpts + '</fieldset>' +
      '<fieldset><legend>Cena</legend><label class="sr" for="f-max">Cena maksymalna</label><input class="range" id="f-max" type="range" min="600" max="4000" step="100" value="' + state.shop.max + '"><p class="range-out" id="f-max-out"></p></fieldset>' +
      '</div><button type="button" class="link-btn" id="f-reset">Wyczyść filtry</button></aside>' +
      '<div><div class="shop__bar"><p id="resCount" aria-live="polite"></p><label><span class="sr">Sortuj według</span><select class="select" id="f-sort">' +
      [['rec', 'Polecane'], ['asc', 'Cena: od najniższej'], ['desc', 'Cena: od najwyższej'], ['name', 'Nazwa: A–Z']].map(function (o) { return '<option value="' + o[0] + '"' + (state.shop.sort === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') +
      '</select></label></div><div class="grid grid--3" id="results"></div></div></div></section>';
  }
  function renderResults() {
    var box = document.getElementById('results');
    if (!box) return;
    var f = state.shop;
    var list = PRODUCTS.filter(function (p) {
      if (f.cat !== 'all' && p.cats.indexOf(f.cat) < 0) return false;
      if (f.widths.length && !p.widths.some(function (w) { return f.widths.indexOf(w.cm) > -1; })) return false;
      if (minPrice(p).price > f.max) return false;
      return true;
    });
    if (f.sort === 'asc') list.sort(function (a, b) { return minPrice(a).price - minPrice(b).price; });
    if (f.sort === 'desc') list.sort(function (a, b) { return minPrice(b).price - minPrice(a).price; });
    if (f.sort === 'name') list.sort(function (a, b) { return a.name.localeCompare(b.name, 'pl'); });
    box.innerHTML = list.length ? list.map(card).join('') : '<div class="empty" style="grid-column:1/-1"><p>Brak produktów spełniających kryteria.</p><button type="button" class="btn btn--ghost" id="f-reset2">Wyczyść filtry</button></div>';
    var n = list.length;
    var colorNote = f.colors.length ? ' w wybranych kolorach' : '';
    document.getElementById('resCount').textContent = 'Znaleziono ' + n + ' ' + plural(n, 'produkt', 'produkty', 'produktów') + colorNote;
    document.getElementById('f-max-out').textContent = 'do ' + zl(f.max);
  }

  function viewProduct(id) {
    var p = BY_ID[id];
    if (!p) return viewNotFound();
    var sel = selOf(p), v = state.view[id] || 0, qty = state.qty[id] || 1;
    var related = PRODUCTS.filter(function (x) { return x.id !== p.id && x.cats.some(function (c) { return p.cats.indexOf(c) > -1; }); }).slice(0, 4).map(card).join('');
    return '<div class="wrap page-head">' + crumbs([['Strona główna', '#/'], ['Sklep', '#/sklep'], [CAT[p.cats[0]].name, '#/sklep?kategoria=' + p.cats[0]], [p.name]]) + '</div>' +
      '<section class="wrap" aria-labelledby="h-prod"><div class="product">' +
      '<div class="gallery"><div class="gallery__main" id="gMain">' + galleryMain(p, sel, v) + '</div>' +
      '<div class="gallery__thumbs" id="gThumbs">' + thumbs(p, sel, v) + '</div>' +
      '<p class="gallery__note">Wizualizacja zmienia się razem z wybranym wariantem.</p></div>' +
      '<div class="pinfo">' + (p.badge ? '<span class="badge badge--inline' + (p.sale ? ' badge--sale' : '') + '">' + p.badge + '</span>' : '') +
      '<h1 id="h-prod">' + esc(p.name) + '</h1>' +
      '<div id="pPrice" aria-live="polite">' + priceBlock(p, sel) + '</div>' +
      '<p class="pinfo__short">' + esc(p.short) + '</p>' +
      '<form id="buyForm" novalidate>' + optionsHtml(p, sel) +
      '<div id="pLead">' + leadBlock(p, sel) + '</div>' +
      '<div class="buy"><div class="qty" role="group" aria-label="Ilość"><button type="button" data-q="-1" aria-label="Zmniejsz ilość">−</button>' +
      '<input id="qtyInput" type="number" min="1" max="20" value="' + qty + '" inputmode="numeric" aria-label="Ilość"><button type="button" data-q="1" aria-label="Zwiększ ilość">+</button></div>' +
      '<button class="btn" type="submit">Dodaj do koszyka</button></div></form>' +
      '<p class="sku" id="pSku">SKU: ' + skuOf(p, sel) + '</p></div></div>' +
      '<div class="tabs" id="tabs"><div class="tabs__list" role="tablist" aria-label="Informacje o produkcie">' +
      tabBtn('opis', 'Opis', true) + tabBtn('wymiary', 'Wymiary', false) + tabBtn('dostawa', 'Dostawa i zwroty', false) + '</div>' +
      '<div class="tabs__panel" role="tabpanel" id="tp-opis" aria-labelledby="tb-opis" tabindex="0">' + p.desc.map(function (d) { return '<p>' + esc(d) + '</p>'; }).join('') + '</div>' +
      '<div class="tabs__panel" role="tabpanel" id="tp-wymiary" aria-labelledby="tb-wymiary" tabindex="0" hidden><div id="pDims">' + dimsTable(p, sel) + '</div></div>' +
      '<div class="tabs__panel" role="tabpanel" id="tp-dostawa" aria-labelledby="tb-dostawa" tabindex="0" hidden><div id="pShip">' + shipText(p, sel) + '</div></div></div>' +
      '</section>' +
      (related ? '<section class="section section--tight" aria-labelledby="h-rel"><div class="wrap"><div class="section__head"><h2 id="h-rel">Pasuje do tego</h2></div><div class="grid grid--4">' + related + '</div></div></section>' : '');
  }
  function skuOf(p, sel) { return p.sku + '-' + sel.width + '-' + sel.color.toUpperCase().slice(0, 3) + '-' + sel.front.toUpperCase().slice(0, 3); }
  function galleryMain(p, sel, v) {
    return v === 0 ? '<div class="viz">' + cabinetSVG(p, sel) + '</div>' : pimg(p, v - 1, 'main', p.name + ' — zdjęcie aranżacji ' + v);
  }
  function thumbs(p, sel, v) {
    var t = '<button type="button" class="thumb thumb--viz" data-view="0" aria-pressed="' + (v === 0) + '" aria-label="Wizualizacja wariantu">' + cabinetSVG(p, sel) + '</button>';
    for (var i = 0; i < p.photos.length; i++) {
      t += '<button type="button" class="thumb" data-view="' + (i + 1) + '" aria-pressed="' + (v === i + 1) + '" aria-label="Zdjęcie ' + (i + 1) + '">' + pimg(p, i, 'thumb') + '</button>';
    }
    return t;
  }
  function optionsHtml(p, sel) {
    var out = '';
    out += '<fieldset class="opt"><legend>Szerokość: <span id="optv-width">' + sel.width + ' cm</span></legend><div class="opt__vals">' +
      p.widths.map(function (w) { return '<label class="pill"><input type="radio" name="opt-width" data-opt="width" value="' + w.id + '"' + (sel.width === w.id ? ' checked' : '') + '><span>' + w.name + '</span></label>'; }).join('') + '</div></fieldset>';
    out += '<fieldset class="opt"><legend>Kolor: <span id="optv-color">' + find(COLORS, sel.color).name + '</span></legend><div class="opt__vals">' +
      COLORS.map(function (c) { return '<label class="swatch"><input type="radio" name="opt-color" data-opt="color" value="' + c.id + '"' + (sel.color === c.id ? ' checked' : '') + '><span><i style="background:' + c.hex + '" aria-hidden="true"></i>' + c.name + (c.add ? ' <small>+' + c.add + ' zł</small>' : '') + '</span></label>'; }).join('') + '</div></fieldset>';
    out += '<fieldset class="opt"><legend>Rodzaj frontu: <span id="optv-front">' + find(FRONTS, sel.front).name + '</span></legend><div class="opt__vals">' +
      FRONTS.map(function (f) { return '<label class="pill pill--front"><input type="radio" name="opt-front" data-opt="front" value="' + f.id + '"' + (sel.front === f.id ? ' checked' : '') + '><span>' + frontIcon(f.id) + f.name + (f.add ? ' <small>+' + f.add + ' zł</small>' : '') + '</span></label>'; }).join('') + '</div></fieldset>';
    var sinks = sinkOptions(p);
    if (sinks) {
      var cur = find(sinks, sel.sink) || sinks[0];
      out += '<fieldset class="opt"><legend>Umywalka: <span id="optv-sink">' + (cur.short || cur.name) + '</span></legend><div class="opt__vals">' +
        sinks.map(function (s) { return '<label class="pill"><input type="radio" name="opt-sink" data-opt="sink" value="' + s.id + '"' + (cur.id === s.id ? ' checked' : '') + '><span>' + s.name + '</span></label>'; }).join('') + '</div></fieldset>';
    }
    return out;
  }
  function frontIcon(id) {
    var inner = id === 'lamele' ? '<path d="M6 4v16M9 4v16M12 4v16M15 4v16M18 4v16" stroke="currentColor" stroke-width="1.2"/>' :
      id === 'frezowany' ? '<rect x="7" y="7" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.2"/>' : '';
    return '<svg class="ficon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.4"/>' + inner + '</svg>';
  }
  function priceBlock(p, sel) {
    var pr = priceOf(p, sel);
    var html = '<p class="price">' + (pr.old ? '<span class="price__sale">' + zl(pr.price) + '</span><s><span class="sr">Cena regularna: </span>' + zl(pr.old) + '</s>' : zl(pr.price)) + '</p>' +
      '<p class="vat">Cena brutto za wybrany wariant, zawiera 23% VAT.</p>';
    if (pr.old) html += '<p class="omnibus">Najniższa cena z 30 dni przed obniżką: ' + zl(pr.old) + '</p>';
    return html;
  }
  function leadBlock(p, sel) {
    var l = lead(p, sel);
    return '<div class="lead"><p class="stock' + (l.ok ? '' : ' stock--order') + '"><span class="dot ' + (l.ok ? 'dot--ok' : 'dot--wait') + '" aria-hidden="true"></span>' + l.avail + ' · ' + l.time + '</p>' +
      '<p class="lead__ship">' + (needsPallet(p, sel) ? 'Dostawa: przesyłka paletowa do drzwi (149 zł)' : 'Dostawa: Kurier InPost lub DPD (od 24,99 zł)') + '</p></div>';
  }
  function dimsTable(p, sel) {
    var sinks = sinkOptions(p), s = sinks ? (find(sinks, sel.sink) || sinks[0]) : null;
    var kg = Math.round(+sel.width * (p.mount === 'tall' ? 0.7 : p.mount === 'floor' ? 0.45 : 0.32) + (s && s.id !== 'bez' ? (p.double ? 16 : 8) : 0));
    var rows = [
      ['Szerokość', sel.width + ' cm'],
      ['Wysokość', p.height + ' cm' + (p.mount === 'floor' ? ' (z nóżkami)' : '')],
      ['Głębokość', p.depth + ' cm'],
      ['Montaż', p.mount === 'floor' ? 'stojąca, regulowane nóżki' : 'wisząca, zawieszki z regulacją'],
      ['Kolor', find(COLORS, sel.color).name],
      ['Front', find(FRONTS, sel.front).name],
      ['Materiał', 'płyta MDF o podwyższonej odporności na wilgoć'],
      ['Okucia', 'zawiasy i prowadnice z cichym domykiem']
    ];
    if (s) rows.push(['Umywalka', s.short || s.name]);
    rows.push(['Waga (ok.)', kg + ' kg']);
    return '<table class="spec"><caption class="sr">Wymiary i parametry wybranego wariantu</caption><tbody>' + rows.map(function (r) { return '<tr><th scope="row">' + r[0] + '</th><td>' + r[1] + '</td></tr>'; }).join('') + '</tbody></table>' +
      '<p class="muted small">Wymiary dotyczą wybranego wariantu. Rysunek techniczny z rozstawem otworów i miejscem na syfon — w pliku PDF przy produkcie.</p>';
  }
  function shipText(p, sel) {
    var l = lead(p, sel);
    return '<p><strong>' + l.time + '.</strong> ' + (needsPallet(p, sel)
      ? 'Ten wariant wysyłamy przesyłką paletową (149 zł) z dostawą do drzwi. Przewoźnik umówi się z Tobą SMS-em.'
      : 'Ten wariant wysyłamy kurierem InPost (24,99 zł) lub DPD (29,99 zł). Od 999 zł dostawa kurierem jest bezpłatna.') + '</p>' +
      '<p>Masz 14 dni na odstąpienie od umowy bez podawania przyczyny. Szczegóły na stronie <a href="#/dostawa-i-zwroty">Dostawa i zwroty</a>.</p>';
  }
  function tabBtn(id, label, on) {
    return '<button type="button" role="tab" class="tabs__tab" id="tb-' + id + '" aria-controls="tp-' + id + '" aria-selected="' + on + '"' + (on ? '' : ' tabindex="-1"') + '>' + label + '</button>';
  }

  function cartInfo() {
    var sub = 0, pallet = false;
    state.cart.forEach(function (it) { var p = BY_ID[it.id]; sub += priceOf(p, it.sel).price * it.qty; if (needsPallet(p, it.sel)) pallet = true; });
    if (pallet && state.ship !== 'paleta') state.ship = 'paleta';
    var sh = find(SHIPPING, state.ship);
    var cost = !state.cart.length ? 0 : (sh.small && sub >= FREE_FROM ? 0 : sh.price);
    return { sub: sub, pallet: pallet, sh: sh, ship: cost, total: sub + cost };
  }
  function viewCart() {
    return '<div class="wrap page-head">' + crumbs([['Strona główna', '#/'], ['Koszyk']]) + '<h1>Koszyk i zamówienie</h1></div>' +
      '<section class="wrap" aria-label="Koszyk"><div class="cart"><div>' +
      '<div class="panel"><h2><span class="step">1</span>Twój koszyk</h2><div id="cartLines"></div></div>' +
      '<form class="panel" id="checkout" novalidate aria-labelledby="h-data"><h2 id="h-data"><span class="step">2</span>Dane do wysyłki</h2><div class="fields">' +
      field('c-name', 'Imię i nazwisko', 'text', 'name', true) + field('c-email', 'Adres e-mail', 'email', 'email') + field('c-phone', 'Telefon', 'tel', 'tel', false, 'Kurier lub przewoźnik zadzwoni przed dostawą.') +
      field('c-street', 'Ulica i numer', 'text', 'street-address', true) + field('c-zip', 'Kod pocztowy', 'text', 'postal-code', false, 'Format: 00-000') + field('c-city', 'Miejscowość', 'text', 'address-level2') +
      '</div><label class="check-row"><input type="checkbox"> <span>Chcę otrzymać fakturę na firmę (podam NIP)</span></label>' +
      '<h2 style="margin-top:20px"><span class="step">3</span>Dostawa</h2><div role="radiogroup" aria-label="Sposób dostawy" id="shipList"></div>' +
      '<h2 style="margin-top:20px"><span class="step">4</span>Płatność</h2><div role="radiogroup" aria-label="Metoda płatności">' +
      payChoice('blik', 'BLIK', 'Kod z aplikacji bankowej', '<span class="paym paym--blik">BLIK</span>') +
      payChoice('p24', 'Przelewy24', 'Szybki przelew z Twojego banku', '<span class="paym paym--p24">P24</span>') +
      payChoice('card', 'Karta płatnicza', 'Visa, Mastercard', '<span class="paym paym--card">VISA/MC</span>') + '</div>' +
      '<label class="check-row"><input type="checkbox"> <span>Akceptuję <a href="#/regulamin">regulamin sklepu</a> i zapoznałem(-am) się z informacją o prawie odstąpienia od umowy.</span></label>' +
      '<button class="btn btn--block" type="submit">Zamawiam i płacę</button><p class="notice notice--demo" role="status" aria-live="polite"></p></form>' +
      '</div><aside class="panel summary" aria-labelledby="h-sum"><h2 id="h-sum">Podsumowanie</h2><div id="cartSum"></div></aside></div></section>';
  }
  function field(id, label, type, ac, full, hint) {
    return '<div class="field' + (full ? ' field--full' : '') + '"><label for="' + id + '">' + label + '</label><input id="' + id + '" type="' + type + '" autocomplete="' + ac + '"' + (hint ? ' aria-describedby="' + id + '-h"' : '') + '>' + (hint ? '<span class="hint" id="' + id + '-h">' + hint + '</span>' : '') + '</div>';
  }
  function payChoice(id, name, note, logo) {
    return '<label class="choice"><input type="radio" name="pay" value="' + id + '"' + (state.pay === id ? ' checked' : '') + '><span><strong>' + name + '</strong><small>' + note + '</small></span>' + logo + '</label>';
  }
  function renderCart() {
    var lines = document.getElementById('cartLines');
    if (!lines) return;
    var active = document.activeElement && document.activeElement.getAttribute('data-fid');
    lines.innerHTML = !state.cart.length ? '<div class="empty"><p>Twój koszyk jest pusty.</p><a class="btn" href="#/sklep">Przejdź do sklepu</a></div>' :
      state.cart.map(function (it, i) {
        var p = BY_ID[it.id], pr = priceOf(p, it.sel);
        return '<div class="line"><div class="line__img line__img--viz">' + cabinetSVG(p, it.sel) + '</div><div>' +
          '<p class="line__name"><a href="#/produkt/' + p.id + '">' + esc(p.name) + '</a></p>' +
          '<p class="line__var">' + esc(variantText(p, it.sel)) + '</p>' +
          (pr.old ? '<p class="line__var">Cena: ' + zl(pr.price) + '/szt. · najniższa cena z 30 dni przed obniżką: ' + zl(pr.old) + '</p>' : '<p class="line__var">' + zl(pr.price) + '/szt.</p>') +
          '<div class="line__ctrl"><div class="qty qty--sm" role="group" aria-label="Ilość: ' + esc(p.name) + '">' +
          '<button type="button" data-cq="-1" data-i="' + i + '" data-fid="m' + i + '" aria-label="Zmniejsz ilość">−</button><input type="number" value="' + it.qty + '" readonly aria-label="Ilość" tabindex="-1">' +
          '<button type="button" data-cq="1" data-i="' + i + '" data-fid="p' + i + '" aria-label="Zwiększ ilość">+</button></div>' +
          '<button type="button" class="link-btn" data-rm="' + i + '">Usuń</button></div></div><p class="line__sum">' + zl(pr.price * it.qty) + '</p></div>';
      }).join('');
    var c = cartInfo();
    document.getElementById('shipList').innerHTML = SHIPPING.map(function (s) {
      var disabled = c.pallet && s.small;
      var cost = s.small && c.sub >= FREE_FROM ? 'Gratis' : zl(s.price);
      return '<label class="choice' + (disabled ? ' choice--off' : '') + '"><input type="radio" name="ship" value="' + s.id + '"' + (state.ship === s.id ? ' checked' : '') + (disabled ? ' disabled' : '') + '><span><strong>' + s.name + '</strong><small>' +
        (disabled ? 'Niedostępny dla szafek od 80 cm i słupków' : s.note) + '</small></span><span class="choice__price">' + cost + '</span></label>';
    }).join('');
    var items = state.cart.reduce(function (s, it) { return s + it.qty; }, 0);
    document.getElementById('cartSum').innerHTML =
      '<div class="sum-row"><span>Wartość produktów (' + items + ' szt.)</span><span>' + zl(c.sub) + '</span></div>' +
      '<div class="sum-row"><span>Dostawa: ' + c.sh.name + '</span><span>' + (items && c.ship === 0 ? 'Gratis' : zl(c.ship)) + '</span></div>' +
      '<div class="sum-row sum-row--total"><span>Do zapłaty</span><span>' + zl(c.total) + '</span></div>' +
      '<p class="sum-note">w tym 23% VAT: ' + zl(c.total * 23 / 123) + '</p>' +
      (c.pallet ? '<p class="free">W koszyku jest duży gabaryt — zamówienie pojedzie przesyłką paletową.</p>' : '') +
      '<p class="sum-note" style="margin-top:12px">Płatności: BLIK, Przelewy24, karta.</p>';
    if (active) { var el = document.querySelector('[data-fid="' + active + '"]'); if (el) el.focus(); }
    updateCount();
  }
  function updateCount() {
    document.getElementById('cartCount').textContent = state.cart.reduce(function (s, it) { return s + it.qty; }, 0);
  }

  function viewAbout() {
    return '<div class="wrap page-head">' + crumbs([['Strona główna', '#/'], ['O marce']]) + '</div>' +
      '<section class="wrap" aria-labelledby="h-about"><div class="about"><div><p class="eyebrow">O marce</p><h1 id="h-about">Prella — porządek w łazience zaczyna się od szafki</h1>' +
      '<p>Projektujemy szafki łazienkowe, które łatwo dopasować do wnętrza: kilka szerokości, cztery kolory i trzy rodzaje frontu. Każdy wariant ma od razu podaną cenę i termin wysyłki.</p>' +
      '<p>Stawiamy na materiały, które dobrze znoszą wilgoć, i okucia, które pracują cicho przez lata. Szafki pakujemy tak, żeby dotarły do Ciebie bez rys.</p>' +
      '<p><a class="btn" href="#/sklep">Zobacz szafki</a></p></div>' +
      '<div class="about__img">' + photo('1763485956235-0f9a1217f58c', 'Łazienka z drewnianą szafką i kamiennym blatem', 900, 765, { widths: [600, 900, 1300], sizes: '(max-width: 899px) 100vw, 50vw' }) + '</div></div></section>';
  }
  function viewShipping() {
    return '<div class="wrap page-head">' + crumbs([['Strona główna', '#/'], ['Dostawa i zwroty']]) + '<h1>Dostawa i zwroty</h1></div>' +
      '<section class="wrap" aria-label="Dostawa i zwroty"><div class="prose">' +
      '<h2>Czas realizacji</h2><p>Termin wysyłki podajemy przy każdym wariancie produktu. Szafki dostępne od ręki wysyłamy w 2–3 dni robocze, szafki w kolorach dąb naturalny i zieleń butelkowa — w 7–10 dni roboczych, a fronty lamelowe i frezowane wykonujemy na zamówienie w ciągu 10–14 dni roboczych.</p>' +
      '<h2>Formy i koszty dostawy</h2><div class="table-wrap"><table class="table"><caption class="sr">Formy i koszty dostawy</caption><thead><tr><th scope="col">Forma dostawy</th><th scope="col">Dla jakich produktów</th><th scope="col">Koszt</th></tr></thead><tbody>' +
      '<tr><td>Kurier InPost</td><td>szafki do 60 cm</td><td>24,99 zł</td></tr><tr><td>Kurier DPD</td><td>szafki do 60 cm</td><td>29,99 zł</td></tr><tr><td>Przesyłka paletowa</td><td>szafki od 80 cm, zestawy, słupki</td><td>149,00 zł</td></tr>' +
      '</tbody></table></div><p>Od 999 zł dostawa kurierem jest bezpłatna. Przy odbiorze sprawdź stan paczki w obecności kuriera; w razie uszkodzenia spiszcie protokół szkody.</p>' +
      '<h2>Zwrot towaru — 14 dni</h2><p>Jako konsument możesz odstąpić od umowy zawartej na odległość w ciągu <strong>14 dni</strong> bez podawania przyczyny. Termin liczy się od dnia, w którym otrzymasz towar.</p>' +
      '<ol><li>Wyślij nam oświadczenie o odstąpieniu od umowy — e-mailem lub przez formularz kontaktowy.</li><li>Odeślij szafkę w ciągu 14 dni od złożenia oświadczenia, najlepiej w oryginalnym opakowaniu.</li><li>Zwrócimy Ci pieniądze, łącznie z kosztem najtańszej oferowanej dostawy, w ciągu 14 dni od otrzymania oświadczenia.</li></ol>' +
      '<p>Bezpośredni koszt odesłania towaru ponosisz Ty. Prawo odstąpienia nie dotyczy produktów wykonanych według Twojej specyfikacji, np. w wymiarze na zamówienie.</p>' +
      '<h2>Reklamacje</h2><p>Odpowiadamy za zgodność towaru z umową. Opisz problem i dołącz zdjęcia — odpowiemy w ciągu 14 dni.</p></div></section>';
  }
  function viewTerms() {
    var secs = ['Postanowienia ogólne', 'Składanie zamówień', 'Ceny i płatności', 'Dostawa', 'Prawo odstąpienia od umowy', 'Reklamacje', 'Dane osobowe', 'Postanowienia końcowe'];
    return '<div class="wrap page-head">' + crumbs([['Strona główna', '#/'], ['Regulamin']]) + '<h1>Regulamin sklepu</h1></div>' +
      '<section class="wrap" aria-label="Regulamin"><div class="prose"><p class="muted">Układ strony regulaminu — treść przygotowuje i zatwierdza Prella.</p><ol class="terms">' +
      secs.map(function (s, i) { return '<li><h2>§ ' + (i + 1) + '. ' + s + '</h2><p class="muted">Treść paragrafu.</p></li>'; }).join('') + '</ol></div></section>';
  }
  function viewContact() {
    return '<div class="wrap page-head">' + crumbs([['Strona główna', '#/'], ['Kontakt']]) + '<h1>Kontakt</h1></div>' +
      '<section class="wrap" aria-label="Kontakt"><div class="contact"><div><p>Pomożemy dobrać szafkę do umywalki i wymiarów łazienki. Odpowiadamy w dni robocze.</p><dl>' +
      '<dt>E-mail</dt><dd>sklep@prella.example</dd><dt>Telefon</dt><dd>+48 000 000 000<br><span class="muted small">pon.–pt. 9:00–17:00</span></dd>' +
      '<dt>Dane firmy</dt><dd>Prella<br>ul. Przykładowa 1, 00-000 Miasto<br>NIP: 000-000-00-00</dd></dl></div>' +
      '<form class="panel" data-demo-form="contact" novalidate aria-labelledby="h-form"><h2 id="h-form">Napisz do nas</h2><div class="fields">' +
      field('k-name', 'Imię', 'text', 'given-name') + field('k-email', 'Adres e-mail', 'email', 'email') +
      '<div class="field field--full"><label for="k-topic">Temat</label><select id="k-topic"><option>Dobór szafki</option><option>Status zamówienia</option><option>Zwrot lub reklamacja</option><option>Współpraca</option></select></div>' +
      '<div class="field field--full"><label for="k-msg">Wiadomość</label><textarea id="k-msg"></textarea></div></div>' +
      '<label class="check-row"><input type="checkbox"> <span>Wyrażam zgodę na przetwarzanie moich danych w celu udzielenia odpowiedzi.</span></label>' +
      '<button class="btn" type="submit">Wyślij wiadomość</button><p class="notice notice--demo" role="status" aria-live="polite"></p></form></div></section>';
  }
  function viewNotFound() { return '<div class="wrap page-head"><h1>Nie znaleziono strony</h1><p><a href="#/">Wróć na stronę główną</a></p></div>'; }

  /* ---------- Router ---------- */
  var main = document.getElementById('main');
  var TITLES = { '': 'Szafki łazienkowe pod umywalkę', sklep: 'Sklep', koszyk: 'Koszyk', 'o-marce': 'O marce', 'dostawa-i-zwroty': 'Dostawa i zwroty', regulamin: 'Regulamin', kontakt: 'Kontakt' };
  var lastRoute = null;
  function parse() {
    var h = location.hash.replace(/^#/, '') || '/', sp = h.split('?');
    return { parts: sp[0].split('/').filter(Boolean), q: new URLSearchParams(sp[1] || '') };
  }
  function render(keepScroll) {
    var r = parse(), a = r.parts[0] || '', html, title;
    if (a === '') html = viewHome();
    else if (a === 'sklep') { html = viewShop(r.q); title = state.shop.cat === 'all' ? 'Sklep' : CAT[state.shop.cat].name; }
    else if (a === 'produkt') { html = viewProduct(r.parts[1]); title = BY_ID[r.parts[1]] ? BY_ID[r.parts[1]].name : 'Produkt'; }
    else if (a === 'koszyk') html = viewCart();
    else if (a === 'o-marce') html = viewAbout();
    else if (a === 'dostawa-i-zwroty') html = viewShipping();
    else if (a === 'regulamin') html = viewTerms();
    else if (a === 'kontakt') html = viewContact();
    else html = viewNotFound();
    main.innerHTML = html;
    slideIdx = 0;
    document.title = (title || TITLES[a] || 'Strona') + ' — Prella';
    var navKey = a === 'sklep' && state.shop.cat === 'zestawy' ? 'zestawy' : a;
    document.querySelectorAll('[data-nav]').forEach(function (n) { if (n.getAttribute('data-nav') === navKey) n.setAttribute('aria-current', 'page'); else n.removeAttribute('aria-current'); });
    if (a === 'sklep') renderResults();
    if (a === 'koszyk') renderCart();
    updateCount(); closeMenu();
    if (!keepScroll && lastRoute !== null && location.hash !== lastRoute) { window.scrollTo(0, 0); main.focus({ preventScroll: true }); }
    lastRoute = location.hash;
  }
  window.addEventListener('hashchange', function () { render(false); });

  /* ---------- Zdarzenia ---------- */
  function toast(html) {
    var el = document.getElementById('toast');
    el.innerHTML = html; el.classList.add('is-on');
    clearTimeout(toast._t); toast._t = setTimeout(function () { el.classList.remove('is-on'); }, 3800);
  }
  function currentProduct() { var r = parse(); return r.parts[0] === 'produkt' ? BY_ID[r.parts[1]] : null; }
  function refreshProduct(p) {
    var sel = selOf(p), v = state.view[p.id] || 0;
    var sinks = sinkOptions(p);
    document.getElementById('optv-width').textContent = sel.width + ' cm';
    document.getElementById('optv-color').textContent = find(COLORS, sel.color).name;
    document.getElementById('optv-front').textContent = find(FRONTS, sel.front).name;
    if (sinks) { var s = find(sinks, sel.sink) || sinks[0]; document.getElementById('optv-sink').textContent = s.short || s.name; }
    document.getElementById('pPrice').innerHTML = priceBlock(p, sel);
    document.getElementById('pLead').innerHTML = leadBlock(p, sel);
    document.getElementById('pDims').innerHTML = dimsTable(p, sel);
    document.getElementById('pShip').innerHTML = shipText(p, sel);
    document.getElementById('pSku').textContent = 'SKU: ' + skuOf(p, sel);
    if (v === 0) document.getElementById('gMain').innerHTML = galleryMain(p, sel, 0);
    var tv = document.querySelector('.thumb--viz');
    if (tv) tv.innerHTML = cabinetSVG(p, sel);
  }

  main.addEventListener('change', function (e) {
    var el = e.target, p;
    if (el.hasAttribute('data-opt') && (p = currentProduct())) {
      selOf(p)[el.getAttribute('data-opt')] = el.value;
      refreshProduct(p);
    } else if (el.name === 'f-cat') {
      state.shop.cat = el.value;
      history.replaceState(null, '', el.value === 'all' ? '#/sklep' : '#/sklep?kategoria=' + el.value);
      lastRoute = location.hash; render(true);
    } else if (el.name === 'f-w') {
      var w = +el.value, arr = state.shop.widths;
      if (el.checked) arr.push(w); else arr.splice(arr.indexOf(w), 1);
      renderResults();
    } else if (el.name === 'f-c') {
      var c = el.value, ca = state.shop.colors;
      if (el.checked) ca.push(c); else ca.splice(ca.indexOf(c), 1);
      renderResults();
    } else if (el.id === 'f-sort') { state.shop.sort = el.value; renderResults(); }
    else if (el.name === 'ship') { state.ship = el.value; renderCart(); }
    else if (el.name === 'pay') { state.pay = el.value; }
    else if (el.id === 'qtyInput' && (p = currentProduct())) {
      var n = Math.max(1, Math.min(20, parseInt(el.value, 10) || 1)); el.value = n; state.qty[p.id] = n;
    }
  });
  main.addEventListener('input', function (e) {
    if (e.target.id === 'f-max') { state.shop.max = +e.target.value; renderResults(); }
  });
  main.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.hasAttribute('data-slide')) {
      var ds = b.getAttribute('data-slide');
      setSlide(ds === 'prev' ? slideIdx - 1 : ds === 'next' ? slideIdx + 1 : +ds); return;
    }
    var p = currentProduct();
    if (b.hasAttribute('data-view') && p) {
      var v = +b.getAttribute('data-view');
      state.view[p.id] = v;
      document.getElementById('gMain').innerHTML = galleryMain(p, selOf(p), v);
      document.querySelectorAll('#gThumbs .thumb').forEach(function (t) { t.setAttribute('aria-pressed', String(+t.getAttribute('data-view') === v)); });
    } else if (b.hasAttribute('data-q') && p) {
      var input = document.getElementById('qtyInput');
      var n = Math.max(1, Math.min(20, (parseInt(input.value, 10) || 1) + +b.getAttribute('data-q')));
      input.value = n; state.qty[p.id] = n;
    } else if (b.getAttribute('role') === 'tab') { selectTab(b); }
    else if (b.hasAttribute('data-cq')) {
      var it = state.cart[+b.getAttribute('data-i')];
      it.qty = Math.max(1, Math.min(20, it.qty + +b.getAttribute('data-cq'))); renderCart();
    } else if (b.hasAttribute('data-rm')) {
      var removed = state.cart.splice(+b.getAttribute('data-rm'), 1)[0];
      if (!state.cart.some(function (x) { return needsPallet(BY_ID[x.id], x.sel); }) && state.ship === 'paleta') state.ship = 'inpost';
      renderCart(); toast('Usunięto z koszyka: ' + esc(BY_ID[removed.id].name));
    } else if (b.id === 'f-reset' || b.id === 'f-reset2') {
      state.shop = { cat: 'all', widths: [], colors: [], max: 4000, sort: 'rec' };
      if (location.hash !== '#/sklep') location.hash = '#/sklep'; else render(true);
    }
  });
  main.addEventListener('keydown', function (e) {
    var b = e.target;
    if (b.getAttribute && b.getAttribute('role') === 'tab' && ['ArrowRight', 'ArrowLeft', 'Home', 'End'].indexOf(e.key) > -1) {
      var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]')), i = tabs.indexOf(b);
      if (e.key === 'ArrowRight') i = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') i = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') i = 0;
      if (e.key === 'End') i = tabs.length - 1;
      e.preventDefault(); selectTab(tabs[i]); tabs[i].focus();
    }
  });
  function selectTab(tab) {
    document.querySelectorAll('[role="tab"]').forEach(function (tb) {
      var on = tb === tab;
      tb.setAttribute('aria-selected', String(on)); tb.tabIndex = on ? 0 : -1;
      document.getElementById(tb.getAttribute('aria-controls')).hidden = !on;
    });
  }
  main.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target;
    if (f.id === 'buyForm') {
      var p = currentProduct(); if (!p) return;
      var sel = JSON.parse(JSON.stringify(selOf(p))), qty = state.qty[p.id] || 1, key = JSON.stringify(sel);
      var ex = state.cart.filter(function (it) { return it.id === p.id && JSON.stringify(it.sel) === key; })[0];
      if (ex) ex.qty = Math.min(20, ex.qty + qty); else state.cart.push({ id: p.id, sel: sel, qty: qty });
      updateCount();
      toast('Dodano do koszyka: ' + esc(p.name) + ', ' + sel.width + ' cm (' + qty + ' szt.) <a href="#/koszyk">Przejdź do koszyka</a>');
      return;
    }
    var note = f.querySelector('.notice');
    if (!note) return;
    if (f.id === 'checkout') note.textContent = 'To makieta: zamówienie nie zostało złożone, a płatność nie została uruchomiona.';
    else if (f.getAttribute('data-demo-form') === 'news') note.textContent = 'Makieta: adres nie został nigdzie zapisany.';
    else note.textContent = 'Makieta: wiadomość nie została wysłana.';
  });

  /* Menu mobilne */
  var menuBtn = document.getElementById('menuBtn'), nav = document.getElementById('nav');
  function closeMenu() { nav.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', function () {
    var open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open); menuBtn.setAttribute('aria-expanded', String(open));
  });

  /* Panel „Co dostaje Prella” */
  var scope = document.getElementById('scope'), scopeBody = document.getElementById('scopeBody'), scopeToggle = document.getElementById('scopeToggle');
  function setScope(open) { scope.classList.toggle('is-open', open); scopeBody.hidden = !open; scopeToggle.setAttribute('aria-expanded', String(open)); }
  scopeToggle.addEventListener('click', function () { setScope(true); document.getElementById('scopeClose').focus(); });
  document.getElementById('scopeClose').addEventListener('click', function () { setScope(false); scopeToggle.focus(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (scope.classList.contains('is-open')) { setScope(false); scopeToggle.focus(); } closeMenu(); }
  });
  document.addEventListener('error', function (e) { if (e.target && e.target.tagName === 'IMG') e.target.classList.add('is-broken'); }, true);

  if (params.get('panel') === 'open') setScope(true);
  render(true);
})();
