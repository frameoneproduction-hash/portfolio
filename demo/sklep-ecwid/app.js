/* Szuwar & Glina — statyczna makieta sklepu (demo). Bez cookies, bez analityki, bez zapytań sieciowych. */
(function () {
  'use strict';

  /* ---------- Dane ---------- */
  var CATS = {
    tekstylia: { pl: 'Tekstylia lniane', en: 'Linen textiles', plDesc: 'Ręczniki, obrusy, serwetki i poszewki', enDesc: 'Towels, tablecloths, napkins and pillowcases', art: 'towel', color: '#a9b59a' },
    ceramika: { pl: 'Ceramika', en: 'Ceramics', plDesc: 'Kubki, talerze, misy i wazony z kamionki', enDesc: 'Stoneware mugs, plates, bowls and vases', art: 'vase', color: '#d8c3a0' },
    swiece: { pl: 'Świece', en: 'Candles', plDesc: 'Świece sojowe i z wosku pszczelego', enDesc: 'Soy and beeswax candles', art: 'jar', color: '#b9824a' }
  };

  var CARE_STONEWARE = {
    en: ['Dishwasher safe.', 'Microwave safe.', 'Avoid sudden temperature changes.'],
    pl: ['Można myć w zmywarce.', 'Można używać w kuchence mikrofalowej.', 'Unikać gwałtownych zmian temperatury.']
  };
  var CARE_LINEN = {
    en: ['Machine wash at 104 °F (40 °C).', 'Remove promptly; dry flat or tumble dry low.', 'For a crisp look, iron while slightly damp.'],
    pl: ['Prać w pralce w 40 °C.', 'Od razu wyjąć z pralki; suszyć na płasko lub w suszarce bębnowej w niskiej temperaturze.', 'Dla gładkiego wyglądu prasować lekko wilgotne.']
  };
  var CARE_CANDLE = {
    en: ['Trim the wick to ¼ in before each use.', 'Burn for 2–3 hours at a time.', 'Never leave a burning candle unattended.'],
    pl: ['Przed każdym zapaleniem przyciąć knot do 5 mm.', 'Palić jednorazowo przez 2–3 godziny.', 'Nie pozostawiać palącej się świecy bez nadzoru.']
  };

  var C = {
    natural: { en: 'Natural', pl: 'Naturalny', hex: '#d9ccb4' },
    sage: { en: 'Sage', pl: 'Szałwiowy', hex: '#a9b59a' },
    terracotta: { en: 'Terracotta', pl: 'Terakotowy', hex: '#c27a5a' },
    charcoal: { en: 'Charcoal', pl: 'Grafitowy', hex: '#5d5b57' },
    white: { en: 'White', pl: 'Biały', hex: '#f3f0ea' },
    oatmeal: { en: 'Oatmeal', pl: 'Beż owsiany', hex: '#d6c7ad' },
    speckled: { en: 'Speckled White', pl: 'Biały nakrapiany', hex: '#ece6da' },
    olive: { en: 'Olive', pl: 'Oliwkowy', hex: '#7d7f55' },
    sand: { en: 'Sand', pl: 'Piaskowy', hex: '#d8c3a0' }
  };
  function col(k) { return { en: C[k].en, pl: C[k].pl, hex: C[k].hex }; }

  var PRODUCTS = [
    {
      id: 'recznik-lniany', cat: 'tekstylia', art: 'towel', sku: 'SG-LN-101', bg: '#e9e2d6',
      badge: { pl: 'Bestseller', en: 'Bestseller', kind: '' },
      options: [
        { key: 'size', en: 'Size', pl: 'Rozmiar', values: [
          { en: '28 × 55 in', pl: '70 × 140 cm', price: 129 },
          { en: '39 × 59 in', pl: '100 × 150 cm', price: 169 }] },
        { key: 'color', en: 'Color', pl: 'Kolor', swatch: true, values: [col('natural'), col('sage'), col('terracotta')] }
      ],
      en: {
        name: 'Stonewashed Linen Bath Towel',
        short: 'A lightweight, quick-drying bath towel made from 100% European flax. Gets softer with every wash.',
        desc: ['Linen towels are thinner than terry cloth, yet they absorb plenty of water and dry in a fraction of the time. Ours are stonewashed for a soft, lived-in feel from the very first use.',
          'Perfect for small bathrooms, the gym, travel and the beach. Each towel has a hanging loop and finished edges that won’t fray.'],
        spec: [['Material', '100% linen (European flax)'], ['Fabric weight', '200 g/m² (5.9 oz/yd²)'], ['Sizes', '28 × 55 in / 39 × 59 in'], ['Made in', 'Lithuania']],
        care: ['Machine wash warm (104 °F / 40 °C) with similar colors.', 'Tumble dry low or line dry.', 'Do not use fabric softener — it reduces absorbency.', 'Iron on medium heat while still damp, if desired.']
      },
      pl: {
        name: 'Ręcznik kąpielowy lniany, zmiękczany',
        short: 'Lekki, szybkoschnący ręcznik kąpielowy ze 100% lnu europejskiego. Z każdym praniem staje się coraz bardziej miękki.',
        desc: ['Ręczniki lniane są cieńsze od frotte, a mimo to świetnie chłoną wodę i schną kilka razy szybciej. Nasze są prane z kamieniami (stonewashed), dzięki czemu od pierwszego użycia są przyjemnie miękkie.',
          'Sprawdzą się w małej łazience, na siłowni, w podróży i na plaży. Każdy ręcznik ma wieszak i wykończone brzegi, które się nie strzępią.'],
        spec: [['Materiał', '100% len (len europejski)'], ['Gramatura', '200 g/m²'], ['Wymiary', '70 × 140 cm / 100 × 150 cm'], ['Kraj produkcji', 'Litwa']],
        care: ['Prać w pralce w 40 °C z rzeczami w podobnych kolorach.', 'Suszyć w suszarce bębnowej w niskiej temperaturze lub na sznurku.', 'Nie używać płynu do płukania — zmniejsza chłonność.', 'W razie potrzeby prasować w średniej temperaturze, gdy tkanina jest jeszcze wilgotna.']
      },
      notes: ['„Stonewashed” → „prane z kamieniami (stonewashed)” — angielski termin zostaje w nawiasie, bo klienci go wyszukują.',
        'Cale i °F usunięte; wymiary w centymetrach, zgodnie z polskim standardem ręczników (70 × 140 cm, 100 × 150 cm).',
        'Instrukcje pielęgnacji w formie bezokolicznikowej („Prać…”, „Suszyć…”), jak na metkach w Polsce.']
    },
    {
      id: 'obrus-lniany', cat: 'tekstylia', art: 'tablecloth', sku: 'SG-LN-204', bg: '#e6dfd2',
      badge: { pl: 'Promocja', en: 'Sale', kind: 'sale' },
      options: [
        { key: 'size', en: 'Size', pl: 'Rozmiar', values: [
          { en: '55 × 55 in', pl: '140 × 140 cm', price: 179, old: 219 },
          { en: '55 × 87 in', pl: '140 × 220 cm', price: 229, old: 279 },
          { en: '55 × 110 in', pl: '140 × 280 cm', price: 279, old: 339 }] },
        { key: 'color', en: 'Color', pl: 'Kolor', swatch: true, values: [col('oatmeal'), col('charcoal'), col('white')] }
      ],
      en: {
        name: 'Washed Linen Tablecloth',
        short: 'A soft, naturally creased tablecloth for everyday meals and long weekend dinners.',
        desc: ['Pre-washed for a soft hand and minimal shrinkage. No ironing needed — the relaxed creases are part of its charm.',
          'Finished with a wide hem and mitered corners. Choose the size that leaves about 8–12 in of drop on each side of your table.'],
        spec: [['Material', '100% linen'], ['Fabric weight', '185 g/m² (5.5 oz/yd²)'], ['Sizes', '55 × 55 in / 55 × 87 in / 55 × 110 in'], ['Shrinkage', 'under 3%']],
        care: CARE_LINEN.en
      },
      pl: {
        name: 'Obrus lniany, prany',
        short: 'Miękki obrus o naturalnie pogniecionej fakturze — na codzienne posiłki i długie weekendowe kolacje.',
        desc: ['Wstępnie prany, dzięki czemu jest miękki w dotyku i praktycznie się nie kurczy. Nie wymaga prasowania — swobodne zagniecenia to część jego uroku.',
          'Wykończony szerokim obrębem, z narożnikami szytymi na skos. Wybierz rozmiar tak, by obrus zwisał ok. 20–30 cm z każdej strony stołu.'],
        spec: [['Materiał', '100% len'], ['Gramatura', '185 g/m²'], ['Wymiary', '140 × 140 cm / 140 × 220 cm / 140 × 280 cm'], ['Kurczliwość', 'poniżej 3%']],
        care: CARE_LINEN.pl
      },
      notes: ['Cena promocyjna z informacją o najniższej cenie z 30 dni przed obniżką (wymóg dyrektywy Omnibus) — w oryginale EN tego nie było.',
        '„Mitered corners” → „narożniki szyte na skos” — określenie używane przez polskie szwalnie.',
        '„Oatmeal” → „beż owsiany”, a nie dosłownie „owsianka”.']
    },
    {
      id: 'serwetki-lniane', cat: 'tekstylia', art: 'napkins', sku: 'SG-LN-310', bg: '#ebe4d8',
      options: [
        { key: 'color', en: 'Color', pl: 'Kolor', swatch: true, values: [col('natural'), col('sage'), col('terracotta'), col('charcoal')] }
      ],
      base: 99,
      en: {
        name: 'Linen Napkins, Set of 4',
        short: 'Generously sized napkins that get softer with every wash. Sold as a set of four.',
        desc: ['Cut from the same washed linen as our tablecloths, so you can mix and match colors freely.',
          'At 18 × 18 in, they are large enough to cover a lap — and pretty enough to wrap a loaf of bread or a gift.'],
        spec: [['Material', '100% linen'], ['Size', '18 × 18 in'], ['Pieces', '4']],
        care: CARE_LINEN.en
      },
      pl: {
        name: 'Serwetki lniane, komplet 4 szt.',
        short: 'Duże serwetki, które z każdym praniem stają się coraz bardziej miękkie. Sprzedawane w komplecie po 4 szt.',
        desc: ['Uszyte z tego samego pranego lnu co nasze obrusy, więc kolory możesz dowolnie łączyć.',
          'Mają 45 × 45 cm, więc swobodnie przykryją kolana, a przy okazji świetnie nadają się do owinięcia bochenka chleba albo prezentu.'],
        spec: [['Materiał', '100% len'], ['Wymiary', '45 × 45 cm'], ['Liczba sztuk', '4 szt.']],
        care: CARE_LINEN.pl
      },
      notes: ['„Set of 4” → „komplet 4 szt.” w nazwie — tak klienci porównują oferty w wyszukiwarce.',
        '18 in ≈ 45,7 cm; podajemy rzeczywisty wymiar z karty technicznej (45 × 45 cm), a nie przeliczenie z ułamkiem.']
    },
    {
      id: 'poszewka-lniana', cat: 'tekstylia', art: 'pillow', sku: 'SG-LN-415', bg: '#e8e3da',
      options: [
        { key: 'size', en: 'Size', pl: 'Rozmiar', values: [
          { en: '50 × 60 cm (approx. 20 × 24 in)', pl: '50 × 60 cm', price: 79 },
          { en: '70 × 80 cm (approx. 28 × 31 in)', pl: '70 × 80 cm', price: 99 }] },
        { key: 'closure', en: 'Closure', pl: 'Zapięcie', values: [
          { en: 'Envelope', pl: 'Zakładka' },
          { en: 'Hidden zipper (+10 PLN)', pl: 'Kryty zamek (+10 zł)', add: 10 }] },
        { key: 'color', en: 'Color', pl: 'Kolor', swatch: true, values: [col('white'), col('natural'), col('sage')] }
      ],
      en: {
        name: 'Linen Pillowcase',
        short: 'Breathable, temperature-regulating linen for cooler summer nights and cozier winters.',
        desc: ['Linen wicks away moisture and lets air circulate, so it feels cool in July and comfortably warm in January.',
          'Available in European sizes, with either an envelope closure or a concealed zipper.'],
        spec: [['Material', '100% linen, 160 g/m²'], ['Sizes', '20 × 24 in / 28 × 31 in'], ['Closure', 'envelope or hidden zipper']],
        care: ['Machine wash at 104 °F (40 °C), inside out.', 'Close the zipper before washing.', 'Tumble dry low.']
      },
      pl: {
        name: 'Poszewka lniana na poduszkę',
        short: 'Przewiewny len, który reguluje temperaturę — latem chłodzi, a zimą daje przyjemne ciepło.',
        desc: ['Len odprowadza wilgoć i przepuszcza powietrze, dlatego w lipcu jest chłodny, a w styczniu przyjemnie ciepły.',
          'Dostępna w rozmiarach europejskich, zapinana na zakładkę lub na kryty zamek błyskawiczny.'],
        spec: [['Materiał', '100% len, 160 g/m²'], ['Wymiary', '50 × 60 cm / 70 × 80 cm'], ['Zapięcie', 'zakładka lub kryty zamek błyskawiczny']],
        care: ['Prać w pralce w 40 °C, na lewej stronie.', 'Przed praniem zapiąć zamek.', 'Suszyć w suszarce bębnowej w niskiej temperaturze.']
      },
      notes: ['Rozmiary 50 × 60 i 70 × 80 cm to standard poduszek w Polsce — w nazwie wariantu zostają same centymetry.',
        '„Envelope closure” → „zapięcie na zakładkę” (nie „koperta”), bo tak opisują to polskie sklepy z pościelą.']
    },
    {
      id: 'kubek-kamionkowy', cat: 'ceramika', art: 'mug', sku: 'SG-CR-120', bg: '#e3ded5',
      options: [
        { key: 'color', en: 'Color', pl: 'Kolor', swatch: true, values: [col('speckled'), col('olive')] },
        { key: 'set', en: 'Set', pl: 'Zestaw', values: [
          { en: 'Single mug', pl: '1 szt.', price: 59 },
          { en: 'Set of 2', pl: 'Komplet 2 szt.', price: 109 }] }
      ],
      en: {
        name: 'Speckled Stoneware Mug, 12 oz',
        short: 'A hand-glazed everyday mug with a comfortable handle and a reactive glaze that makes each piece one of a kind.',
        desc: ['Thrown in a small family-run workshop and fired at high temperature, which makes the stoneware dense and durable.',
          'The reactive glaze pools and breaks differently on every mug, so expect slight variations in color and speckling.'],
        spec: [['Capacity', '12 fl oz'], ['Dimensions', 'height 3.7 in, diameter 3.4 in'], ['Material', 'stoneware']],
        care: CARE_STONEWARE.en
      },
      pl: {
        name: 'Kubek z kamionki, nakrapiany, 350 ml',
        short: 'Ręcznie szkliwiony kubek na co dzień z wygodnym uchem. Szkliwo reaktywne sprawia, że każdy egzemplarz jest niepowtarzalny.',
        desc: ['Powstaje w małej rodzinnej pracowni i jest wypalany w wysokiej temperaturze, dzięki czemu kamionka jest zwarta i wytrzymała.',
          'Szkliwo reaktywne układa się na każdym kubku inaczej, dlatego kolor i nakrapianie mogą się nieznacznie różnić.'],
        spec: [['Pojemność', '350 ml'], ['Wymiary', 'wys. 9,5 cm, Ø 8,5 cm'], ['Materiał', 'kamionka']],
        care: CARE_STONEWARE.pl
      },
      notes: ['12 fl oz ≈ 355 ml; w nazwie zaokrąglamy do 350 ml, jak na polskich kartach produktów.',
        '„Glaze” → „szkliwo”, a nie „glazura”, która w Polsce kojarzy się z płytkami.',
        'Liczby z przecinkiem dziesiętnym: 9,5 cm, a nie 9.5 cm.']
    },
    {
      id: 'wazon-ceramiczny', cat: 'ceramika', art: 'vase', sku: 'SG-CR-230', bg: '#e7e1d6',
      badge: { pl: 'Nowość', en: 'New', kind: 'new' },
      options: [
        { key: 'size', en: 'Size', pl: 'Rozmiar', values: [
          { en: 'Small (6 in)', pl: 'Mały (wys. 15 cm)', price: 119 },
          { en: 'Medium (9 in)', pl: 'Średni (wys. 23 cm)', price: 159 },
          { en: 'Large (12 in)', pl: 'Duży (wys. 30 cm)', price: 209 }] },
        { key: 'finish', en: 'Finish', pl: 'Wykończenie', swatch: true, values: [
          { en: 'Matte Sand', pl: 'Piaskowy mat', hex: '#d8c3a0' },
          { en: 'Glossy Ash', pl: 'Popielaty połysk', hex: '#9d9b95' }] }
      ],
      en: {
        name: 'Handmade Ceramic Vase',
        short: 'Wheel-thrown in a small studio, each vase has subtle variations in shape and glaze. Watertight, so it’s ready for fresh flowers.',
        desc: ['The narrow neck holds a single branch or a small bunch upright, while the rounded body keeps the vase stable.',
          'Sizes are approximate, as every piece is shaped by hand.'],
        spec: [['Heights', 'approx. 6 in / 9 in / 12 in'], ['Material', 'glazed stoneware'], ['Watertight', 'yes']],
        care: ['Hand wash only.', 'Wipe dry after use.']
      },
      pl: {
        name: 'Wazon ceramiczny, ręcznie robiony',
        short: 'Toczony na kole w małej pracowni — każdy wazon ma nieco inny kształt i odcień szkliwa. Jest szczelny, więc nadaje się do świeżych kwiatów.',
        desc: ['Wąska szyjka utrzymuje w pionie pojedynczą gałązkę lub mały bukiet, a zaokrąglony brzusiec zapewnia stabilność.',
          'Wymiary są orientacyjne, ponieważ każdy wazon jest formowany ręcznie.'],
        spec: [['Wysokość', 'ok. 15 cm / 23 cm / 30 cm'], ['Materiał', 'kamionka szkliwiona'], ['Szczelny', 'tak']],
        care: ['Myć ręcznie.', 'Po umyciu wytrzeć do sucha.']
      },
      notes: ['Warianty „Small/Medium/Large” uzupełnione o wysokość w cm — klient od razu widzi różnicę.',
        '„Matte Sand” → „piaskowy mat”, „Glossy Ash” → „popielaty połysk” — tak nazywa się wykończenia w polskich sklepach z ceramiką.']
    },
    {
      id: 'talerz-obiadowy', cat: 'ceramika', art: 'plate', sku: 'SG-CR-310', bg: '#e4dfd6',
      options: [
        { key: 'color', en: 'Color', pl: 'Kolor', swatch: true, values: [col('speckled'), col('olive')] },
        { key: 'set', en: 'Set', pl: 'Zestaw', values: [
          { en: 'Single plate', pl: '1 szt.', price: 69 },
          { en: 'Set of 4', pl: 'Komplet 4 szt.', price: 249 }] }
      ],
      en: {
        name: 'Stoneware Dinner Plate, 10.5 in',
        short: 'A sturdy, chip-resistant everyday plate with a gently raised rim.',
        desc: ['Heavy enough to feel substantial, light enough to stack. The raised rim keeps sauces where they belong.',
          'Pairs with our speckled mugs and serving bowls.'],
        spec: [['Diameter', '10.5 in'], ['Material', 'stoneware']],
        care: CARE_STONEWARE.en
      },
      pl: {
        name: 'Talerz obiadowy z kamionki, Ø 27 cm',
        short: 'Solidny talerz na co dzień, odporny na obicia, z delikatnie podniesionym brzegiem.',
        desc: ['Wystarczająco ciężki, by sprawiać solidne wrażenie, a przy tym na tyle lekki, że wygodnie ustawisz go w stosie. Dzięki podniesionemu brzegowi sos zostaje na talerzu.',
          'Pasuje do naszych nakrapianych kubków i mis do serwowania.'],
        spec: [['Średnica', '27 cm'], ['Materiał', 'kamionka']],
        care: CARE_STONEWARE.pl
      },
      notes: ['10,5 in = 26,7 cm → w nazwie „Ø 27 cm”; symbol średnicy zamiast słowa.',
        '„Set of 4” → „komplet 4 szt.” — spójnie z serwetkami i kubkami.']
    },
    {
      id: 'misa-do-serwowania', cat: 'ceramika', art: 'bowl', sku: 'SG-CR-415', bg: '#e8e2d7',
      options: [
        { key: 'size', en: 'Size', pl: 'Rozmiar', values: [
          { en: 'Medium (9.5 in)', pl: 'Średni (Ø 24 cm)', price: 129 },
          { en: 'Large (12 in)', pl: 'Duży (Ø 30 cm)', price: 159 }] },
        { key: 'color', en: 'Color', pl: 'Kolor', swatch: true, values: [col('speckled'), col('olive'), col('sand')] }
      ],
      en: {
        name: 'Stoneware Serving Bowl',
        short: 'A wide, shallow bowl for salads, pasta and family-style dinners.',
        desc: ['Generous enough for a salad for six, shallow enough to show off what’s inside.',
          'Oven safe up to 430 °F, so you can bake and serve in the same dish.'],
        spec: [['Diameter', '9.5 in / 12 in'], ['Depth', 'approx. 2.8 in'], ['Oven safe', 'up to 430 °F']],
        care: CARE_STONEWARE.en
      },
      pl: {
        name: 'Misa do serwowania z kamionki',
        short: 'Szeroka, płytka misa na sałatki, makarony i wspólne obiady przy dużym stole.',
        desc: ['Pomieści sałatkę dla sześciu osób, a dzięki niewielkiej głębokości ładnie eksponuje to, co w środku.',
          'Można ją wstawić do piekarnika (do 220 °C), więc zapiekasz i podajesz w tym samym naczyniu.'],
        spec: [['Średnica', '24 cm / 30 cm'], ['Głębokość', 'ok. 7 cm'], ['Do piekarnika', 'do 220 °C']],
        care: CARE_STONEWARE.pl
      },
      notes: ['„Family-style dinners” → „wspólne obiady przy dużym stole” — dosłowne „obiady w stylu rodzinnym” brzmi nienaturalnie.',
        '430 °F przeliczone i zaokrąglone w dół do 220 °C (bezpieczniej dla klienta).']
    },
    {
      id: 'swieca-sojowa', cat: 'swiece', art: 'jar', sku: 'SG-SW-101', bg: '#ebe3d6',
      badge: { pl: 'Bestseller', en: 'Bestseller', kind: '' },
      color: '#b9824a',
      options: [
        { key: 'size', en: 'Size', pl: 'Rozmiar', values: [
          { en: '8 oz (up to 45 h burn time)', pl: '227 g (ok. 45 h palenia)', price: 79 },
          { en: '14 oz (up to 70 h burn time)', pl: '397 g (ok. 70 h palenia)', price: 119 }] },
        { key: 'lid', en: 'Lid', pl: 'Pokrywka', values: [
          { en: 'No lid', pl: 'Bez pokrywki' },
          { en: 'Oak lid (+20 PLN)', pl: 'Dębowa pokrywka (+20 zł)', add: 20 }] }
      ],
      en: {
        name: 'Fig & Cedar Soy Candle',
        short: 'Warm notes of ripe fig, cedarwood and a hint of black pepper. Hand-poured in small batches.',
        desc: ['Made with 100% soy wax and a cotton wick in a reusable amber glass jar.',
          'Scent notes — top: fig leaf, black pepper; heart: ripe fig; base: cedarwood, musk.'],
        spec: [['Wax', '100% soy wax'], ['Burn time', 'up to 45 h / 70 h'], ['Net weight', '8 oz / 14 oz']],
        care: CARE_CANDLE.en
      },
      pl: {
        name: 'Świeca sojowa w szkle — figa i cedr',
        short: 'Ciepłe nuty dojrzałej figi, drzewa cedrowego i szczypty czarnego pieprzu. Ręcznie odlewana w małych partiach.',
        desc: ['Wykonana ze 100% wosku sojowego, z bawełnianym knotem, w bursztynowym słoiku wielokrotnego użytku.',
          'Nuty zapachowe — głowy: liść figowca, czarny pieprz; serca: dojrzała figa; bazy: drzewo cedrowe, piżmo.'],
        spec: [['Wosk', '100% wosk sojowy'], ['Czas palenia', 'ok. 45 h / 70 h'], ['Waga netto', '227 g / 397 g']],
        care: CARE_CANDLE.pl
      },
      notes: ['„8 oz” to tu uncje wagowe → 227 g (a nie ml, jak przy kubkach).',
        '„Up to 45 hours” → „ok. 45 h palenia” — bez słowa „do”, które bywa odbierane jak gwarancja.',
        'Ostrzeżenia w formie znanej z polskich etykiet („Nie pozostawiać…”); pełną treść z etykiety dostarcza producent.']
    },
    {
      id: 'swiece-stolowe', cat: 'swiece', art: 'tapers', sku: 'SG-SW-210', bg: '#e9e1d3',
      options: [
        { key: 'height', en: 'Height', pl: 'Wysokość', values: [
          { en: '10 in', pl: '25 cm', price: 49 },
          { en: '12 in', pl: '30 cm', price: 59 }] },
        { key: 'color', en: 'Color', pl: 'Kolor', swatch: true, values: [
          { en: 'Natural', pl: 'Naturalny (miodowy)', hex: '#d9a84e' },
          { en: 'Ivory', pl: 'Ecru', hex: '#efe6cf' }] }
      ],
      en: {
        name: 'Beeswax Taper Candles, Pair',
        short: 'Slow-burning, dripless tapers made from pure beeswax, with a faint honey scent.',
        desc: ['Rolled from 100% beeswax, which burns brighter and longer than paraffin.',
          'The standard 7/8 in base fits most candle holders.'],
        spec: [['Height', '10 in / 12 in'], ['Base diameter', '7/8 in'], ['Burn time', 'approx. 8–10 h each']],
        care: CARE_CANDLE.en
      },
      pl: {
        name: 'Świece stołowe z wosku pszczelego, 2 szt.',
        short: 'Wolno spalające się, niekapiące świece stołowe z czystego wosku pszczelego, o delikatnym miodowym zapachu.',
        desc: ['Wykonane w 100% z wosku pszczelego, który pali się jaśniej i dłużej niż parafina.',
          'Standardowa podstawa o średnicy 2,2 cm pasuje do większości świeczników.'],
        spec: [['Wysokość', '25 cm / 30 cm'], ['Średnica podstawy', '2,2 cm'], ['Czas palenia', 'ok. 8–10 h każda']],
        care: CARE_CANDLE.pl
      },
      notes: ['„Tapers” → „świece stołowe” — tę frazę Polacy wpisują w wyszukiwarkę.',
        '„Ivory” → „ecru”; „Natural” → „naturalny (miodowy)”, bo sam „naturalny” nic nie mówi o kolorze.']
    }
  ];
  var BY_ID = {};
  PRODUCTS.forEach(function (p) { BY_ID[p.id] = p; });

  var SHIPPING = [
    { id: 'paczkomat', name: 'Paczkomat InPost', note: '1–2 dni robocze · odbiór 24/7', price: 13.99, free: true },
    { id: 'kurier', name: 'Kurier InPost', note: '1–2 dni robocze · dostawa pod drzwi', price: 16.99, free: true },
    { id: 'poczta', name: 'Poczta Polska', note: '2–4 dni robocze · paczka pocztowa', price: 14.5, free: false }
  ];
  var FREE_FROM = 200;

  /* ---------- Stan (tylko w pamięci, bez cookies i localStorage) ---------- */
  var params = new URLSearchParams(location.search);
  var state = {
    lang: params.get('lang') === 'en' ? 'en' : 'pl',
    cart: [
      { id: 'obrus-lniany', sel: { size: 1, color: 0 }, qty: 1 },
      { id: 'swieca-sojowa', sel: { size: 0, lid: 1 }, qty: 2 }
    ],
    ship: 'paczkomat',
    pay: 'blik',
    sel: {},
    view: {},
    qty: {},
    shop: { cat: 'all', max: 350, sort: 'rec' }
  };

  /* ---------- Narzędzia ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function zl(n) {
    var parts = n.toFixed(2).split('.');
    var int = parts[0];
    if (int.length > 4) int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return int + ',' + parts[1] + ' zł';
  }
  function plural(n, one, few, many) {
    if (n === 1) return one;
    var d = n % 10, h = n % 100;
    if (d >= 2 && d <= 4 && !(h >= 12 && h <= 14)) return few;
    return many;
  }
  function t(p) { return p[state.lang]; }
  function selOf(p) {
    if (!state.sel[p.id]) {
      var s = {};
      p.options.forEach(function (o) { s[o.key] = 0; });
      state.sel[p.id] = s;
    }
    return state.sel[p.id];
  }
  function priceOf(p, sel) {
    var price = p.base || 0, old = null;
    p.options.forEach(function (o) {
      var v = o.values[sel[o.key] || 0];
      if (v.price != null) price = v.price;
      if (v.old != null) old = v.old;
    });
    p.options.forEach(function (o) {
      var v = o.values[sel[o.key] || 0];
      if (v.add) { price += v.add; if (old) old += v.add; }
    });
    return { price: price, old: old };
  }
  function minPrice(p) {
    var best = null;
    var priced = p.options.filter(function (o) { return o.values.some(function (v) { return v.price != null; }); })[0];
    if (!priced) return { price: p.base, old: null, from: false };
    priced.values.forEach(function (v) { if (best === null || v.price < best.price) best = { price: v.price, old: v.old || null }; });
    best.from = priced.values.length > 1;
    return best;
  }
  function colorOf(p, sel) {
    var sw = p.options.filter(function (o) { return o.swatch; })[0];
    if (sw) return sw.values[(sel || {})[sw.key] || 0].hex;
    return p.color || '#c9b79a';
  }
  function variantText(p, sel, lang) {
    lang = lang || state.lang;
    return p.options.map(function (o) { return o[lang] + ': ' + o.values[sel[o.key] || 0][lang]; }).join(' · ');
  }

  /* ---------- Grafiki SVG ---------- */
  function shade(hex, amt) {
    var n = parseInt(hex.slice(1), 16);
    var r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    var tgt = amt < 0 ? 0 : 255, k = Math.abs(amt);
    r = Math.round((tgt - r) * k + r); g = Math.round((tgt - g) * k + g); b = Math.round((tgt - b) * k + b);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  function rng(seed) { return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }
  function speckles(cx, cy, rx, ry, n, color, seed) {
    var r = rng(seed), out = '';
    for (var i = 0; i < n; i++) {
      var a = r() * Math.PI * 2, d = Math.sqrt(r());
      out += '<circle cx="' + (cx + Math.cos(a) * rx * d).toFixed(1) + '" cy="' + (cy + Math.sin(a) * ry * d).toFixed(1) + '" r="' + (0.8 + r() * 1.6).toFixed(1) + '" fill="' + color + '" opacity=".55"/>';
    }
    return out;
  }
  function shapes(kind, c) {
    var d1 = shade(c, -0.12), d2 = shade(c, -0.25), l1 = shade(c, 0.14);
    switch (kind) {
      case 'towel':
        return '<rect x="78" y="252" width="244" height="58" rx="12" fill="' + d1 + '"/>' +
          '<path d="M90 282h220" stroke="' + d2 + '" stroke-width="2" opacity=".5"/>' +
          '<rect x="90" y="198" width="220" height="58" rx="12" fill="' + c + '"/>' +
          '<path d="M102 228h196" stroke="' + d1 + '" stroke-width="2" opacity=".6"/>' +
          '<rect x="104" y="146" width="192" height="56" rx="12" fill="' + l1 + '"/>' +
          '<path d="M116 160h168M116 166h168" stroke="' + d1 + '" stroke-width="1.5" opacity=".45"/>' +
          '<path d="M104 176h192" stroke="' + d1 + '" stroke-width="2" opacity=".5"/>';
      case 'tablecloth':
        return '<rect x="74" y="292" width="12" height="66" fill="#8b6c4f"/><rect x="314" y="292" width="12" height="66" fill="#8b6c4f"/>' +
          '<polygon points="70,170 330,170 372,212 28,212" fill="' + l1 + '"/>' +
          '<path d="M28 212H372L366 298Q200 314 34 298Z" fill="' + c + '"/>' +
          [80, 136, 192, 248, 304, 352].map(function (x) { return '<path d="M' + x + ' 214q6 40 -2 86" stroke="' + d1 + '" stroke-width="2" fill="none" opacity=".55"/>'; }).join('') +
          '<ellipse cx="200" cy="182" rx="44" ry="10" fill="#f4efe6"/><ellipse cx="200" cy="180" rx="30" ry="6" fill="#e2d9ca"/>';
      case 'napkins':
        return '<g transform="rotate(-9 200 230)"><rect x="112" y="142" width="176" height="176" rx="6" fill="' + d1 + '"/></g>' +
          '<g transform="rotate(5 200 230)"><rect x="112" y="142" width="176" height="176" rx="6" fill="' + c + '"/></g>' +
          '<rect x="124" y="156" width="152" height="152" rx="6" fill="' + l1 + '"/>' +
          '<path d="M200 156v152M124 232h152" stroke="' + d1 + '" stroke-width="1.6" opacity=".5"/>' +
          '<rect x="134" y="166" width="132" height="132" rx="3" fill="none" stroke="' + d1 + '" stroke-width="1.2" stroke-dasharray="4 4" opacity=".7"/>';
      case 'pillow':
        return '<path d="M86 132Q200 112 314 132Q336 225 314 318Q200 338 86 318Q64 225 86 132Z" fill="' + c + '"/>' +
          '<path d="M104 150Q200 134 296 150Q314 225 296 300Q200 316 104 300Q86 225 104 150Z" fill="none" stroke="' + d1 + '" stroke-width="2" stroke-dasharray="5 5" opacity=".7"/>' +
          '<path d="M120 170Q160 160 200 166" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".25" fill="none"/>' +
          '<path d="M150 250q50 18 100 0" stroke="' + d1 + '" stroke-width="2" fill="none" opacity=".4"/>';
      case 'mug':
        return '<path d="M262 196c58 0 58 92 0 92" stroke="' + d1 + '" stroke-width="18" fill="none" stroke-linecap="round"/>' +
          '<rect x="128" y="160" width="140" height="168" rx="20" fill="' + c + '"/>' +
          '<rect x="128" y="290" width="140" height="38" rx="16" fill="' + d1 + '" opacity=".35"/>' +
          '<ellipse cx="198" cy="162" rx="70" ry="13" fill="' + d1 + '"/><ellipse cx="198" cy="163" rx="60" ry="9" fill="' + shade(c, -0.45) + '"/>' +
          speckles(198, 240, 62, 72, 40, shade(c, -0.55), 7) +
          '<path d="M146 186v110" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".22"/>';
      case 'vase':
        return '<path d="M200 102c18 -30 30 -50 46 -66" stroke="#66734f" stroke-width="3" fill="none"/>' +
          '<path d="M232 54c16 -10 30 -8 40 -2c-12 10 -26 12 -40 2Z" fill="#7d8a62"/><path d="M216 76c-16 -12 -32 -12 -42 -6c12 10 28 12 42 6Z" fill="#8d9a70"/>' +
          '<path d="M200 98c-24 0 -30 12 -28 25c2 15 14 25 10 45c-6 30 -54 52 -54 102c0 50 38 72 72 72s72 -22 72 -72c0 -50 -48 -72 -54 -102c-4 -20 8 -30 10 -45c2 -13 -4 -25 -28 -25Z" fill="' + c + '"/>' +
          '<ellipse cx="200" cy="102" rx="26" ry="6" fill="' + d2 + '"/>' +
          '<path d="M150 250c0 -24 14 -40 28 -54" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".22" fill="none"/>';
      case 'plate':
        return '<circle cx="208" cy="222" r="132" fill="rgba(0,0,0,.08)"/>' +
          '<circle cx="200" cy="212" r="132" fill="' + c + '"/>' +
          '<circle cx="200" cy="212" r="96" fill="' + l1 + '"/>' +
          '<circle cx="200" cy="212" r="96" fill="none" stroke="' + d1 + '" stroke-width="2" opacity=".6"/>' +
          speckles(200, 212, 126, 126, 70, shade(c, -0.55), 11);
      case 'bowl':
        return '<path d="M58 188C62 282 128 314 200 314S338 282 342 188Z" fill="' + c + '"/>' +
          '<path d="M166 312h68l-6 14h-56Z" fill="' + d1 + '"/>' +
          '<ellipse cx="200" cy="188" rx="142" ry="34" fill="' + l1 + '"/>' +
          '<ellipse cx="200" cy="190" rx="128" ry="26" fill="' + shade(c, -0.18) + '"/>' +
          '<circle cx="170" cy="184" r="16" fill="#d9b44a"/><circle cx="204" cy="178" r="15" fill="#e2c35c"/><circle cx="234" cy="188" r="14" fill="#cfa63f"/>' +
          '<path d="M186 172c10 -10 22 -12 30 -10" stroke="#5f7a45" stroke-width="5" stroke-linecap="round" fill="none"/>' +
          speckles(200, 260, 120, 40, 34, shade(c, -0.55), 5);
      case 'jar':
        return '<rect x="134" y="168" width="132" height="164" rx="16" fill="' + c + '" opacity=".88"/>' +
          '<rect x="144" y="196" width="112" height="126" rx="9" fill="#efe5d2" opacity=".9"/>' +
          '<rect x="152" y="244" width="96" height="54" rx="4" fill="#faf6ee"/>' +
          '<path d="M166 262h68M174 276h52" stroke="#8a7d68" stroke-width="3" stroke-linecap="round"/>' +
          '<path d="M200 196v-14" stroke="#3a332a" stroke-width="3"/>' +
          '<path d="M200 150c10 12 12 22 0 32c-12 -10 -10 -20 0 -32Z" fill="#f0b44c"/><path d="M200 162c5 6 5 12 0 18c-5 -6 -5 -12 0 -18Z" fill="#fff3cf"/>' +
          '<path d="M146 186v124" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".25"/>';
      case 'tapers':
        return '<ellipse cx="200" cy="334" rx="106" ry="16" fill="#9a7b55"/><ellipse cx="200" cy="330" rx="96" ry="11" fill="#b8956a"/>' +
          '<rect x="150" y="300" width="44" height="30" rx="6" fill="#a8865c"/><rect x="208" y="300" width="44" height="30" rx="6" fill="#a8865c"/>' +
          '<rect x="161" y="128" width="22" height="176" rx="4" fill="' + c + '"/><rect x="219" y="104" width="22" height="200" rx="4" fill="' + c + '"/>' +
          '<path d="M165 136v150M223 112v170" stroke="#fff" stroke-width="4" opacity=".25" stroke-linecap="round"/>' +
          '<path d="M172 128v-10M230 104v-10" stroke="#3a332a" stroke-width="2.5"/>' +
          '<path d="M172 86c8 10 9 18 0 30c-9 -12 -8 -20 0 -30Z" fill="#f0b44c"/><path d="M230 62c8 10 9 18 0 30c-9 -12 -8 -20 0 -30Z" fill="#f0b44c"/>';
    }
    return '';
  }
  function art(kind, color, bg, view, label) {
    var inner = shapes(kind, color);
    var back = bg;
    var extra = '';
    if (view === 1) inner = '<g transform="translate(200 210) scale(1.75) translate(-200 -225)">' + inner + '</g>';
    if (view === 2) {
      back = shade(bg, -0.1);
      extra = '<rect x="0" y="300" width="400" height="100" fill="' + shade(bg, -0.18) + '"/>';
      inner = '<g transform="translate(200 230) scale(.82) translate(-200 -230)">' + inner + '</g>';
    }
    return '<svg viewBox="0 0 400 400" role="img" aria-label="' + esc(label) + '" preserveAspectRatio="xMidYMid slice">' +
      '<rect width="400" height="400" fill="' + back + '"/>' + extra +
      '<ellipse cx="200" cy="350" rx="140" ry="12" fill="rgba(0,0,0,.07)"/>' + inner + '</svg>';
  }
  function productArt(p, sel, view) {
    return art(p.art, colorOf(p, sel || selOf(p)), p.bg, view || 0, t(p).name);
  }
  function coverArt() {
    function place(x, y, s, kind, c, bg) {
      return '<svg x="' + x + '" y="' + y + '" width="' + s + '" height="' + s + '" viewBox="0 0 400 400">' + shapes(kind, c) + '</svg>';
    }
    return '<svg viewBox="0 0 1200 520" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">' +
      '<defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9e1d4"/><stop offset="1" stop-color="#d2c4ad"/></linearGradient></defs>' +
      '<rect width="1200" height="520" fill="url(#cg)"/>' +
      '<rect x="0" y="420" width="1200" height="100" fill="#c7b69b"/>' +
      '<rect x="0" y="414" width="1200" height="8" fill="#b9a587"/>' +
      '<circle cx="1010" cy="150" r="120" fill="#efe8dc" opacity=".7"/>' +
      place(650, 120, 330, 'towel', '#a9b59a') +
      place(860, 40, 380, 'vase', '#d8c3a0') +
      place(980, 210, 230, 'jar', '#b9824a') +
      '</svg>';
  }

  /* ---------- Szablony wspólne ---------- */
  function crumbs(items) {
    return '<nav class="crumbs" aria-label="Okruszki"><ol>' + items.map(function (it, i) {
      return '<li>' + (it[1] && i < items.length - 1 ? '<a href="' + it[1] + '">' + esc(it[0]) + '</a>' : '<span aria-current="page">' + esc(it[0]) + '</span>') + '</li>';
    }).join('') + '</ol></nav>';
  }
  function card(p) {
    var m = minPrice(p), tx = t(p);
    var badge = p.badge ? '<span class="badge' + (p.badge.kind ? ' badge--' + p.badge.kind : '') + '">' + esc(p.badge[state.lang]) + '</span>' : '';
    var variants = p.options.reduce(function (n, o) { return n * o.values.length; }, 1);
    return '<a class="card" href="#/produkt/' + p.id + '">' +
      '<div class="card__img">' + productArt(p, null, 0) + '</div>' + badge +
      '<div class="card__body"><h3 class="card__name" lang="' + state.lang + '">' + esc(tx.name) + '</h3>' +
      '<p class="card__meta">' + esc(t(CATS[p.cat])) + ' · ' + variants + ' ' + plural(variants, 'wariant', 'warianty', 'wariantów') + '</p>' +
      '<p class="card__price">' + (m.from ? 'od ' : '') + zl(m.price) + (m.old ? '<s><span class="sr">Najniższa cena z 30 dni przed obniżką: </span>' + zl(m.old) + '</s>' : '') + '</p></div></a>';
  }
  function langTag() {
    return state.lang === 'en'
      ? '<span class="lang-tag lang-tag--en">Oryginał EN</span>'
      : '<span class="lang-tag lang-tag--pl">Tłumaczenie PL</span>';
  }

  /* ---------- Widoki ---------- */
  function viewHome() {
    var featured = ['obrus-lniany', 'kubek-kamionkowy', 'swieca-sojowa', 'wazon-ceramiczny'].map(function (id) { return card(BY_ID[id]); }).join('');
    var cats = Object.keys(CATS).map(function (k) {
      var c = CATS[k];
      return '<a class="cat-card" href="#/sklep?kategoria=' + k + '"><div class="cat-card__img">' +
        art(c.art, c.color, '#e8e1d5', 2, t(c)) + '</div><div class="cat-card__body"><h3 lang="' + state.lang + '">' + esc(t(c)) + '</h3><p lang="' + state.lang + '">' + esc(state.lang === 'en' ? c.enDesc : c.plDesc) + '</p></div></a>';
    }).join('');
    return '' +
      '<section class="cover" data-section="Okładka · Cover" aria-labelledby="h-cover">' +
      '<div class="cover__art">' + coverArt() + '</div>' +
      '<div class="wrap cover__in"><div class="cover__box">' +
      '<p class="eyebrow">Len · Glina · Wosk</p>' +
      '<h1 id="h-cover">Spokojny dom zaczyna się od prostych rzeczy</h1>' +
      '<p>Lniane tekstylia, ręcznie robiona ceramika i świece z naturalnego wosku. Zamówienia wysyłamy w 1–2 dni robocze.</p>' +
      '<div class="cover__cta"><a class="btn" href="#/sklep">Przejdź do sklepu</a><a class="btn btn--ghost" href="#/o-nas">Poznaj nas</a></div>' +
      '</div></div></section>' +

      '<section class="section" data-section="Kategorie · Categories" aria-labelledby="h-cats"><div class="wrap">' +
      '<div class="section__head"><div><p class="eyebrow">Kategorie</p><h2 id="h-cats">Czego szukasz?</h2></div><a href="#/sklep">Wszystkie produkty →</a></div>' +
      '<div class="grid grid--3 grid--stack">' + cats + '</div></div></section>' +

      '<section class="section section--tight" data-section="Polecane produkty · Featured products" aria-labelledby="h-feat"><div class="wrap">' +
      '<div class="section__head"><div><p class="eyebrow">Polecane</p><h2 id="h-feat">Ulubione w tym sezonie</h2></div><a href="#/sklep">Zobacz wszystkie →</a></div>' +
      '<div class="grid grid--4">' + featured + '</div></div></section>' +

      '<section class="section why" data-section="Dlaczego my · Text blocks" aria-labelledby="h-why"><div class="wrap">' +
      '<div class="section__head"><div><p class="eyebrow">Dlaczego my</p><h2 id="h-why">Kupujesz spokojnie</h2></div></div>' +
      '<div class="grid grid--3">' +
      whyItem('<path d="M12 21c-4-3-7-7-7-11a7 7 0 0 1 14 0c0 4-3 8-7 11Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v7M9 11l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.6"/>', 'Naturalne materiały', 'Len z Europy, kamionka i wosk sojowy lub pszczeli. Bez syntetycznych domieszek.') +
      whyItem('<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="17.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="17.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.6"/>', 'Wysyłka w 1–2 dni robocze', 'Paczkomat InPost, kurier lub Poczta Polska. Od 200 zł dostawa jest bezpłatna.') +
      whyItem('<path d="M4 12a8 8 0 1 0 3-6.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4 4v4h4" fill="none" stroke="currentColor" stroke-width="1.6"/>', '14 dni na zwrot', 'Możesz odstąpić od umowy bez podawania przyczyny. Zwrot pieniędzy w ciągu 14 dni.') +
      '</div></div></section>' +

      '<section class="section" aria-labelledby="h-check"><div class="wrap">' + textCheck() + '</div></section>' +

      '<section class="section section--tight reviews" data-section="Opinie klientów · Customer reviews" aria-labelledby="h-rev"><div class="wrap">' +
      '<div class="section__head"><div><p class="eyebrow">Opinie</p><h2 id="h-rev">Co mówią klienci</h2></div><span class="note-pill">Przykładowe opinie — miejsce na prawdziwe recenzje</span></div>' +
      '<div class="grid grid--3">' +
      review('Obrus jest jeszcze ładniejszy niż na zdjęciach. Paczka przyszła następnego dnia, starannie zapakowana.', 'Przykładowa opinia · Klientka z Krakowa') +
      review('Kubki mają piękne, nierówne szkliwo — każdy trochę inny. Dokładnie tego szukałem.', 'Przykładowa opinia · Klient z Gdańska') +
      review('Świeca pachnie subtelnie, nie dusi. Pali się równo i długo.', 'Przykładowa opinia · Klientka z Poznania') +
      '</div></div></section>' +

      '<section class="section section--tight" data-section="Newsletter · Subscribe" aria-labelledby="h-news"><div class="wrap"><div class="newsletter">' +
      '<div><h2 id="h-news">Zapisz się do newslettera</h2><p>Raz w miesiącu: nowości, porady dotyczące pielęgnacji lnu i wcześniejszy dostęp do promocji. Bez spamu.</p></div>' +
      '<form data-demo-form="news" novalidate><label class="sr" for="nl-email">Adres e-mail</label>' +
      '<div class="newsletter__row"><input id="nl-email" type="email" autocomplete="email" placeholder="Twój adres e-mail" required><button class="btn btn--light" type="submit">Zapisz się</button></div>' +
      '<label class="consent check-row"><input type="checkbox" required> <span>Zgadzam się na otrzymywanie newslettera. Mogę zrezygnować w każdej chwili.</span></label>' +
      '<p class="notice notice--demo" role="status" aria-live="polite"></p></form>' +
      '</div></div></section>';
  }
  function whyItem(icon, h, p) {
    return '<div class="why__item"><div class="why__icon"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">' + icon + '</svg></div><h3>' + h + '</h3><p>' + p + '</p></div>';
  }
  function review(q, who) {
    return '<figure class="review"><div class="stars" aria-label="Ocena 5 na 5">★★★★★</div><blockquote>„' + q + '”</blockquote><figcaption>' + who + '</figcaption></figure>';
  }
  function banner(before) {
    var l1 = before ? 'Wyprzedarz jesienna' : 'Wyprzedaż jesienna';
    var l2 = before ? 'do -30% na kolekcję "Len"' : 'do −30% na kolekcję „Len”';
    var l3 = before ? 'Darmowa dostawa od 200zl' : 'Darmowa dostawa od 200 zł';
    var marks = before
      ? '<rect x="36" y="96" width="174" height="5" fill="#c0392b" opacity=".75"/>' +
        '<rect x="66" y="140" width="34" height="4" fill="#c0392b" opacity=".75"/><rect x="230" y="140" width="64" height="4" fill="#c0392b" opacity=".75"/>' +
        '<rect x="214" y="183" width="58" height="4" fill="#c0392b" opacity=".75"/>'
      : '';
    return '<svg viewBox="0 0 560 220" role="img" aria-label="Baner: ' + esc(l1 + ', ' + l2 + ', ' + l3) + '">' +
      '<rect width="560" height="220" rx="12" fill="#e9e1d4"/>' +
      '<svg x="360" y="20" width="190" height="190" viewBox="0 0 400 400">' + shapes('tablecloth', '#d6c7ad') + '</svg>' +
      '<text x="36" y="88" font-family="Georgia, serif" font-size="34" fill="#22201c">' + esc(l1) + '</text>' +
      '<text x="36" y="134" font-family="system-ui, Segoe UI, sans-serif" font-size="20" fill="#4f5f3f" font-weight="600">' + esc(l2) + '</text>' +
      '<text x="36" y="178" font-family="system-ui, Segoe UI, sans-serif" font-size="17" fill="#3d3a34">' + esc(l3) + '</text>' +
      marks + '</svg>';
  }
  function textCheck() {
    return '<div class="check"><span class="check__tag">Element procesu wdrożenia</span>' +
      '<h2 id="h-check">Sprawdzanie tekstów na grafikach: przed / po</h2>' +
      '<p class="muted">Banery i zdjęcia produktów często mają tekst „wtopiony” w obraz — automatyczny tłumacz sklepu go nie zobaczy. Każdą grafikę sprawdzamy ręcznie i oddajemy listę poprawek.</p>' +
      '<div class="check__grid">' +
      '<figure class="check__fig">' + banner(true) + '<figcaption><span class="dot dot--bad" aria-hidden="true"></span>Przed: 4 błędy</figcaption></figure>' +
      '<figure class="check__fig">' + banner(false) + '<figcaption><span class="dot dot--ok" aria-hidden="true"></span>Po korekcie</figcaption></figure>' +
      '</div><ol class="check__list">' +
      '<li><span class="fix-old">Wyprzedarz</span> → <span class="fix-new">Wyprzedaż</span> — błąd ortograficzny</li>' +
      '<li><span class="fix-old">-30%</span> → <span class="fix-new">−30%</span> — znak minus zamiast łącznika</li>' +
      '<li><span class="fix-old">"Len"</span> → <span class="fix-new">„Len”</span> — polskie cudzysłowy</li>' +
      '<li><span class="fix-old">200zl</span> → <span class="fix-new">200 zł</span> — spacja i polska litera „ł”</li>' +
      '</ol></div>';
  }

  function viewShop(q) {
    var cat = q.get('kategoria');
    if (cat && CATS[cat]) state.shop.cat = cat;
    var counts = { all: PRODUCTS.length };
    PRODUCTS.forEach(function (p) { counts[p.cat] = (counts[p.cat] || 0) + 1; });
    var catOpts = [['all', 'Wszystkie', 'All']].concat(Object.keys(CATS).map(function (k) { return [k, CATS[k].pl, CATS[k].en]; }))
      .map(function (c) {
        return '<label class="opt-row"><input type="radio" name="f-cat" value="' + c[0] + '"' + (state.shop.cat === c[0] ? ' checked' : '') + '> <span lang="' + state.lang + '">' + esc(state.lang === 'en' ? c[2] : c[1]) + '</span><span class="count">' + counts[c[0]] + '</span></label>';
      }).join('');
    return '<div class="wrap page-head">' + crumbs([['Strona główna', '#/'], ['Sklep']]) + '<h1>Sklep</h1></div>' +
      '<section class="wrap" data-section="Katalog sklepu · Store page" aria-label="Produkty"><div class="shop">' +
      '<aside class="filters" aria-label="Filtry"><div class="filters__wrap">' +
      '<fieldset><legend>Kategoria</legend>' + catOpts + '</fieldset>' +
      '<fieldset><legend>Cena</legend><label class="sr" for="f-max">Cena maksymalna</label>' +
      '<input class="range" id="f-max" type="range" min="50" max="350" step="10" value="' + state.shop.max + '" aria-describedby="f-max-out">' +
      '<p class="range-out" id="f-max-out">do ' + zl(state.shop.max) + '</p></fieldset>' +
      '</div><button type="button" class="link-btn" id="f-reset">Wyczyść filtry</button></aside>' +
      '<div><div class="shop__bar"><p id="resCount" aria-live="polite"></p>' +
      '<label><span class="sr">Sortuj według</span><select class="select" id="f-sort">' +
      [['rec', 'Polecane'], ['asc', 'Cena: od najniższej'], ['desc', 'Cena: od najwyższej'], ['name', 'Nazwa: A–Z']].map(function (o) {
        return '<option value="' + o[0] + '"' + (state.shop.sort === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
      }).join('') + '</select></label></div>' +
      '<div class="grid grid--3" id="results"></div></div></div></section>';
  }
  function renderResults() {
    var box = document.getElementById('results');
    if (!box) return;
    var list = PRODUCTS.filter(function (p) {
      return (state.shop.cat === 'all' || p.cat === state.shop.cat) && minPrice(p).price <= state.shop.max;
    });
    var s = state.shop.sort;
    if (s === 'asc') list.sort(function (a, b) { return minPrice(a).price - minPrice(b).price; });
    if (s === 'desc') list.sort(function (a, b) { return minPrice(b).price - minPrice(a).price; });
    if (s === 'name') list.sort(function (a, b) { return t(a).name.localeCompare(t(b).name, state.lang); });
    box.innerHTML = list.length ? list.map(card).join('') :
      '<div class="empty" style="grid-column:1/-1"><p>Brak produktów spełniających kryteria.</p><button type="button" class="btn btn--ghost" id="f-reset2">Wyczyść filtry</button></div>';
    var n = list.length;
    document.getElementById('resCount').textContent = 'Znaleziono ' + n + ' ' + plural(n, 'produkt', 'produkty', 'produktów');
    document.getElementById('f-max-out').textContent = 'do ' + zl(state.shop.max);
  }

  function viewProduct(id) {
    var p = BY_ID[id];
    if (!p) return viewNotFound();
    var sel = selOf(p), tx = t(p), v = state.view[id] || 0, qty = state.qty[id] || 1;
    var opts = p.options.map(function (o) {
      var vals = o.values.map(function (val, i) {
        var checked = (sel[o.key] || 0) === i ? ' checked' : '';
        var name = 'opt-' + o.key;
        if (o.swatch) {
          return '<label class="swatch"><input type="radio" name="' + name + '" value="' + i + '" data-opt="' + o.key + '"' + checked + '><span><i style="background:' + val.hex + '" aria-hidden="true"></i>' + esc(val[state.lang]) + '</span></label>';
        }
        return '<label class="pill"><input type="radio" name="' + name + '" value="' + i + '" data-opt="' + o.key + '"' + checked + '><span>' + esc(val[state.lang]) + '</span></label>';
      }).join('');
      return '<fieldset class="opt"><legend>' + esc(o[state.lang]) + ': <span id="optv-' + o.key + '">' + esc(o.values[sel[o.key] || 0][state.lang]) + '</span></legend><div class="opt__vals">' + vals + '</div></fieldset>';
    }).join('');
    var related = PRODUCTS.filter(function (x) { return x.cat === p.cat && x.id !== p.id; }).slice(0, 3).map(card).join('');
    var specRows = tx.spec.map(function (r) { return '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>'; }).join('');

    return '<div class="wrap page-head">' + crumbs([['Strona główna', '#/'], ['Sklep', '#/sklep'], [t(CATS[p.cat]), '#/sklep?kategoria=' + p.cat], [tx.name]]) + '</div>' +
      '<section class="wrap" data-section="Karta produktu · Product page" aria-labelledby="h-prod"><div class="product">' +
      '<div class="gallery"><div class="gallery__main" id="gMain">' + productArt(p, sel, v) + '</div>' +
      '<div class="gallery__thumbs" id="gThumbs">' + thumbs(p, sel, v) + '</div>' +
      '<p class="gallery__note">Grafiki poglądowe (SVG). W sklepie: zdjęcia produktów klienta.</p></div>' +
      '<div class="pinfo">' + langTag() +
      '<h1 id="h-prod" lang="' + state.lang + '">' + esc(tx.name) + '</h1>' +
      '<div id="pPrice">' + priceBlock(p, sel) + '</div>' +
      '<p class="pinfo__short" lang="' + state.lang + '">' + esc(tx.short) + '</p>' +
      '<form id="buyForm" novalidate><div lang="' + state.lang + '">' + opts + '</div>' +
      '<p class="stock"><span class="dot dot--ok" aria-hidden="true"></span>Dostępny · wysyłka w 1–2 dni robocze</p>' +
      '<div class="buy"><div class="qty" role="group" aria-label="Ilość"><button type="button" data-q="-1" aria-label="Zmniejsz ilość">−</button>' +
      '<input id="qtyInput" type="number" min="1" max="99" value="' + qty + '" inputmode="numeric" aria-label="Ilość"><button type="button" data-q="1" aria-label="Zwiększ ilość">+</button></div>' +
      '<button class="btn" type="submit">Dodaj do koszyka</button></div></form>' +
      '<p class="sku">SKU: ' + p.sku + ' · Kategoria: ' + esc(t(CATS[p.cat])) + '</p>' +
      '</div></div>' +

      '<div class="tabs" id="tabs"><div class="tabs__list" role="tablist" aria-label="Informacje o produkcie">' +
      tabBtn('opis', 'Opis', true) + tabBtn('wymiary', 'Wymiary i pielęgnacja', false) + tabBtn('dostawa', 'Dostawa i zwroty', false) + '</div>' +
      '<div class="tabs__panel" role="tabpanel" id="tp-opis" aria-labelledby="tb-opis" tabindex="0" lang="' + state.lang + '">' + tx.desc.map(function (d) { return '<p>' + esc(d) + '</p>'; }).join('') + '</div>' +
      '<div class="tabs__panel" role="tabpanel" id="tp-wymiary" aria-labelledby="tb-wymiary" tabindex="0" hidden lang="' + state.lang + '"><table class="spec"><tbody>' + specRows + '</tbody></table>' +
      '<h3>' + (state.lang === 'en' ? 'Care' : 'Pielęgnacja') + '</h3><ul>' + tx.care.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="tabs__panel" role="tabpanel" id="tp-dostawa" aria-labelledby="tb-dostawa" tabindex="0" hidden>' +
      (state.lang === 'en' ? '<p class="muted small">Ta zakładka jest tekstem sklepu (dostawa w Polsce), więc powstaje od razu po polsku.</p>' : '') +
      '<p>Wysyłamy w ciągu 1–2 dni roboczych. Do wyboru: Paczkomat InPost (13,99 zł), Kurier InPost (16,99 zł) lub Poczta Polska (14,50 zł). Przy zamówieniach od 200 zł dostawa przez InPost jest bezpłatna.</p>' +
      '<p>Masz 14 dni na odstąpienie od umowy bez podawania przyczyny. Szczegóły znajdziesz na stronie <a href="#/dostawa-i-zwroty">Dostawa i zwroty</a>.</p></div></div>' +

      '<div class="compare" aria-labelledby="h-cmp"><span class="check__tag">Element procesu wdrożenia</span>' +
      '<h2 id="h-cmp" style="font-size:1.4rem">Oryginał EN i tłumaczenie PL obok siebie</h2>' +
      '<p class="muted">Tak wygląda jeden wiersz z pliku importu CSV — nazwa, opis i warianty w obu językach.</p>' +
      '<div class="compare__grid">' + compareCol(p, 'en') + compareCol(p, 'pl') + '</div>' +
      '<h3>Decyzje tłumacza</h3><ul class="notes">' + p.notes.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul></div>' +
      '</section>' +

      (related ? '<section class="section section--tight" aria-labelledby="h-rel"><div class="wrap"><div class="section__head"><h2 id="h-rel">Może Ci się spodobać</h2></div><div class="grid grid--3">' + related + '</div></div></section>' : '');
  }
  function compareCol(p, lang) {
    var tx = p[lang];
    return '<div class="compare__col" lang="' + lang + '"><span class="lang-tag lang-tag--' + lang + '">' + (lang === 'en' ? 'Oryginał EN' : 'Tłumaczenie PL') + '</span><dl>' +
      '<dt>' + (lang === 'en' ? 'Name' : 'Nazwa') + '</dt><dd><strong>' + esc(tx.name) + '</strong></dd>' +
      '<dt>' + (lang === 'en' ? 'Short description' : 'Krótki opis') + '</dt><dd>' + esc(tx.short) + '</dd>' +
      p.options.map(function (o) {
        return '<dt>' + esc(o[lang]) + '</dt><dd>' + o.values.map(function (v) { return esc(v[lang]); }).join(' · ') + '</dd>';
      }).join('') + '</dl></div>';
  }
  function tabBtn(id, label, sel) {
    return '<button type="button" role="tab" class="tabs__tab" id="tb-' + id + '" aria-controls="tp-' + id + '" aria-selected="' + sel + '"' + (sel ? '' : ' tabindex="-1"') + '>' + label + '</button>';
  }
  function thumbs(p, sel, v) {
    return [0, 1, 2].map(function (i) {
      return '<button type="button" class="thumb" data-view="' + i + '" aria-pressed="' + (i === v) + '" aria-label="Zdjęcie ' + (i + 1) + ' z 3">' + productArt(p, sel, i) + '</button>';
    }).join('');
  }
  function priceBlock(p, sel) {
    var pr = priceOf(p, sel);
    var html = '<p class="price">' + (pr.old ? '<span class="price__sale">' + zl(pr.price) + '</span><s><span class="sr">Cena regularna: </span>' + zl(pr.old) + '</s>' : zl(pr.price)) + '</p>' +
      '<p class="vat">Cena brutto, zawiera 23% VAT. Koszt dostawy liczony w koszyku.</p>';
    if (pr.old) html += '<p class="omnibus">Najniższa cena z 30 dni przed obniżką: ' + zl(pr.old) + '</p>';
    return html;
  }

  function cartTotals() {
    var sub = state.cart.reduce(function (s, it) { return s + priceOf(BY_ID[it.id], it.sel).price * it.qty; }, 0);
    var sh = SHIPPING.filter(function (s) { return s.id === state.ship; })[0];
    var shipCost = state.cart.length === 0 ? 0 : (sh.free && sub >= FREE_FROM ? 0 : sh.price);
    var total = sub + shipCost;
    return { sub: sub, ship: shipCost, total: total, vat: total * 23 / 123, sh: sh };
  }
  function viewCart() {
    return '<div class="wrap page-head">' + crumbs([['Strona główna', '#/'], ['Koszyk']]) + '<h1>Koszyk i zamówienie</h1>' +
      '<p class="muted">Makieta procesu zamówienia — formularz niczego nie wysyła i nie uruchamia płatności.</p></div>' +
      '<section class="wrap" data-section="Koszyk i checkout · Cart & checkout" aria-label="Koszyk"><div class="cart"><div>' +
      '<div class="panel"><h2><span class="step">1</span>Twój koszyk</h2><div id="cartLines"></div></div>' +
      '<form class="panel" id="checkout" novalidate aria-labelledby="h-data"><h2 id="h-data"><span class="step">2</span>Dane do wysyłki</h2>' +
      '<div class="fields">' +
      field('c-name', 'Imię i nazwisko', 'text', 'name', true) +
      field('c-email', 'Adres e-mail', 'email', 'email', false) +
      field('c-phone', 'Telefon', 'tel', 'tel', false, 'Kurier i paczkomat wyślą SMS z kodem odbioru.') +
      field('c-street', 'Ulica i numer', 'text', 'street-address', true) +
      field('c-zip', 'Kod pocztowy', 'text', 'postal-code', false, 'Format: 00-000') +
      field('c-city', 'Miejscowość', 'text', 'address-level2', false) +
      '</div><label class="check-row"><input type="checkbox" id="c-invoice"> <span>Chcę otrzymać fakturę na firmę (podam NIP)</span></label>' +
      '<h2 style="margin-top:20px"><span class="step">3</span>Dostawa</h2><div role="radiogroup" aria-label="Sposób dostawy" id="shipList"></div>' +
      '<h2 style="margin-top:20px"><span class="step">4</span>Płatność</h2><div role="radiogroup" aria-label="Metoda płatności">' +
      payChoice('blik', '<span class="paym paym--blik">BLIK</span>', 'BLIK', 'Kod z aplikacji bankowej') +
      payChoice('p24', '<span class="paym paym--p24">P24</span>', 'Przelewy24', 'Szybki przelew z Twojego banku') +
      payChoice('card', '<span class="paym paym--card">VISA/MC</span>', 'Karta płatnicza', 'Visa, Mastercard') +
      '</div>' +
      '<label class="check-row"><input type="checkbox" required> <span>Akceptuję <a href="#/dostawa-i-zwroty">regulamin sklepu</a> i zapoznałem(-am) się z informacją o prawie odstąpienia od umowy.</span></label>' +
      '<button class="btn btn--block" type="submit">Zamawiam i płacę</button>' +
      '<p class="sum-note" style="margin-top:8px">Przycisk zgodny z wymogiem jednoznacznej informacji o obowiązku zapłaty.</p>' +
      '<p class="notice notice--demo" role="status" aria-live="polite"></p></form>' +
      '</div><aside class="panel summary" aria-labelledby="h-sum"><h2 id="h-sum">Podsumowanie</h2><div id="cartSum"></div></aside></div></section>';
  }
  function field(id, label, type, ac, full, hint) {
    return '<div class="field' + (full ? ' field--full' : '') + '"><label for="' + id + '">' + label + '</label><input id="' + id + '" type="' + type + '" autocomplete="' + ac + '"' + (hint ? ' aria-describedby="' + id + '-h"' : '') + '>' + (hint ? '<span class="hint" id="' + id + '-h">' + hint + '</span>' : '') + '</div>';
  }
  function payChoice(id, logo, name, note) {
    return '<label class="choice"><input type="radio" name="pay" value="' + id + '"' + (state.pay === id ? ' checked' : '') + '><span><strong>' + name + '</strong><small>' + note + '</small></span>' + logo + '</label>';
  }
  function renderCart() {
    var lines = document.getElementById('cartLines');
    if (!lines) return;
    var active = document.activeElement && document.activeElement.getAttribute('data-fid');
    if (!state.cart.length) {
      lines.innerHTML = '<div class="empty"><p>Twój koszyk jest pusty.</p><a class="btn" href="#/sklep">Przejdź do sklepu</a></div>';
    } else {
      lines.innerHTML = state.cart.map(function (it, i) {
        var p = BY_ID[it.id], pr = priceOf(p, it.sel);
        return '<div class="line"><div class="line__img">' + productArt(p, it.sel, 0) + '</div><div>' +
          '<p class="line__name" lang="' + state.lang + '"><a href="#/produkt/' + p.id + '">' + esc(t(p).name) + '</a></p>' +
          '<p class="line__var" lang="' + state.lang + '">' + esc(variantText(p, it.sel)) + ' · ' + zl(pr.price) + '/szt.</p>' +
          '<div class="line__ctrl"><div class="qty qty--sm" role="group" aria-label="Ilość: ' + esc(t(p).name) + '">' +
          '<button type="button" data-cq="-1" data-i="' + i + '" data-fid="m' + i + '" aria-label="Zmniejsz ilość">−</button>' +
          '<input type="number" value="' + it.qty + '" readonly aria-label="Ilość" tabindex="-1">' +
          '<button type="button" data-cq="1" data-i="' + i + '" data-fid="p' + i + '" aria-label="Zwiększ ilość">+</button></div>' +
          '<button type="button" class="link-btn" data-rm="' + i + '">Usuń</button></div></div>' +
          '<p class="line__sum">' + zl(pr.price * it.qty) + '</p></div>';
      }).join('');
    }
    var tt = cartTotals();
    document.getElementById('shipList').innerHTML = SHIPPING.map(function (s) {
      var cost = s.free && tt.sub >= FREE_FROM ? 'Gratis' : zl(s.price);
      return '<label class="choice"><input type="radio" name="ship" value="' + s.id + '"' + (state.ship === s.id ? ' checked' : '') + ' data-fid="s-' + s.id + '"><span><strong>' + s.name + '</strong><small>' + s.note + '</small></span><span class="choice__price">' + cost + '</span></label>' +
        (s.id === 'paczkomat' && state.ship === 'paczkomat' ? '<p class="inpost-pick">Wybór paczkomatu z mapy — w wersji produkcyjnej (widżet InPost).</p>' : '');
    }).join('');
    var items = state.cart.reduce(function (s, it) { return s + it.qty; }, 0);
    var missing = FREE_FROM - tt.sub;
    document.getElementById('cartSum').innerHTML =
      '<div class="sum-row"><span>Wartość produktów (' + items + ' szt.)</span><span>' + zl(tt.sub) + '</span></div>' +
      '<div class="sum-row"><span>Dostawa: ' + tt.sh.name + '</span><span>' + (tt.ship === 0 && items ? 'Gratis' : zl(tt.ship)) + '</span></div>' +
      '<div class="sum-row sum-row--total"><span>Do zapłaty</span><span>' + zl(tt.total) + '</span></div>' +
      '<p class="sum-note">w tym 23% VAT: ' + zl(tt.vat) + '</p>' +
      (items ? '<div class="free">' + (missing > 0 ? 'Do darmowej dostawy brakuje Ci <strong>' + zl(missing) + '</strong>.' : 'Masz darmową dostawę przez InPost.') +
        '<div class="free__bar" aria-hidden="true"><i style="width:' + Math.min(100, tt.sub / FREE_FROM * 100).toFixed(0) + '%"></i></div></div>' : '') +
      '<p class="sum-note" style="margin-top:12px">Płatności: BLIK, Przelewy24, karta. Dostawa: InPost, Poczta Polska.</p>';
    if (active) {
      var el = document.querySelector('[data-fid="' + active + '"]');
      if (el) el.focus();
    }
    updateCount();
  }
  function updateCount() {
    var n = state.cart.reduce(function (s, it) { return s + it.qty; }, 0);
    document.getElementById('cartCount').textContent = n;
  }

  function viewAbout() {
    function place(x, y, s, kind, c) { return '<svg x="' + x + '" y="' + y + '" width="' + s + '" height="' + s + '" viewBox="0 0 400 400">' + shapes(kind, c) + '</svg>'; }
    var img = '<svg viewBox="0 0 600 510" role="img" aria-label="Ilustracja: talerz, kubek i świece" preserveAspectRatio="xMidYMid slice"><rect width="600" height="510" fill="#e3dccf"/><rect y="380" width="600" height="130" fill="#cdbfa6"/>' +
      place(30, 150, 300, 'plate', '#ece6da') + place(250, 120, 280, 'mug', '#7d7f55') + place(380, 40, 240, 'tapers', '#d9a84e') + '</svg>';
    return '<div class="wrap page-head">' + crumbs([['Strona główna', '#/'], ['O nas']]) + '</div>' +
      '<section class="wrap" data-section="O nas · Text and image" aria-labelledby="h-about"><div class="about"><div>' +
      '<p class="eyebrow">O nas</p><h1 id="h-about">Mała pracownia, rzeczy na długie lata</h1>' +
      '<p>Szuwar &amp; Glina zaczęła się od jednego lnianego obrusu, którego nie mogliśmy znaleźć w sklepach — miękkiego, w stonowanym kolorze, bez syntetycznych domieszek. Dziś współpracujemy z kilkoma niewielkimi tkalniami i pracowniami ceramiki, a świece odlewamy sami, w małych partiach.</p>' +
      '<p>Wybieramy materiały, które z czasem stają się piękniejsze: len, który mięknie z każdym praniem, kamionkę, która nie boi się codziennego używania, i wosk, który pali się czysto i długo.</p>' +
      '<p class="muted small">Marka, historia i zdjęcia są fikcyjne — przygotowane na potrzeby demo.</p></div>' +
      '<div class="about__img">' + img + '</div></div></section>' +
      '<section class="section" aria-labelledby="h-val"><div class="wrap"><h2 id="h-val">W co wierzymy</h2><ul class="values grid grid--3">' +
      '<li><h3>Mniej, ale lepiej</h3><p class="muted">Krótka kolekcja, w której każda rzecz ma swoje zastosowanie.</p></li>' +
      '<li><h3>Uczciwe opisy</h3><p class="muted">Podajemy dokładne wymiary, skład i sposób pielęgnacji — bez marketingowych przesad.</p></li>' +
      '<li><h3>Bezpieczne zakupy</h3><p class="muted">Szybka wysyłka, 14 dni na zwrot i kontakt z prawdziwym człowiekiem.</p></li>' +
      '</ul></div></section>';
  }

  function viewShipping() {
    return '<div class="wrap page-head">' + crumbs([['Strona główna', '#/'], ['Dostawa i zwroty']]) + '<h1>Dostawa i zwroty</h1></div>' +
      '<section class="wrap" data-section="Strona informacyjna · Policy page" aria-label="Dostawa i zwroty"><div class="prose">' +
      '<p class="legal-note"><strong>Treść przykładowa</strong> — ostateczny regulamin przygotowuje prawnik. Pokazujemy formatowanie i styl: prosty język, konkretne terminy, tabele zamiast długich akapitów.</p>' +
      '<h2>Czas realizacji</h2><p>Zamówienia opłacone w dni robocze do godz. 12:00 wysyłamy tego samego dnia. Pozostałe wysyłamy w ciągu 1–2 dni roboczych. Gdy paczka wyjedzie z magazynu, dostaniesz e-mail z numerem przesyłki.</p>' +
      '<h2>Formy i koszty dostawy</h2><div class="table-wrap"><table class="table"><caption class="sr">Formy i koszty dostawy</caption><thead><tr><th scope="col">Forma dostawy</th><th scope="col">Koszt</th><th scope="col">Czas dostawy</th></tr></thead><tbody>' +
      '<tr><td>Paczkomat InPost</td><td>13,99 zł</td><td>1–2 dni robocze</td></tr>' +
      '<tr><td>Kurier InPost</td><td>16,99 zł</td><td>1–2 dni robocze</td></tr>' +
      '<tr><td>Poczta Polska</td><td>14,50 zł</td><td>2–4 dni robocze</td></tr>' +
      '</tbody></table></div><p>Przy zamówieniach od 200 zł dostawa przez InPost (paczkomat lub kurier) jest bezpłatna.</p>' +
      '<h2>Zwrot towaru — 14 dni na odstąpienie od umowy</h2>' +
      '<p>Jako konsument możesz odstąpić od umowy zawartej na odległość w ciągu <strong>14 dni</strong> bez podawania przyczyny. Termin liczy się od dnia, w którym otrzymasz towar.</p>' +
      '<ol><li>Przed upływem terminu wyślij nam oświadczenie o odstąpieniu od umowy — e-mailem lub przez formularz kontaktowy. Możesz skorzystać ze wzoru formularza dołączonego do regulaminu, ale nie musisz.</li>' +
      '<li>Odeślij towar najpóźniej w ciągu 14 dni od dnia, w którym poinformujesz nas o odstąpieniu.</li>' +
      '<li>Zwrócimy Ci wszystkie płatności, łącznie z kosztem najtańszej oferowanej formy dostawy, w ciągu 14 dni od otrzymania oświadczenia. Możemy wstrzymać się ze zwrotem do chwili otrzymania towaru lub dowodu jego odesłania.</li></ol>' +
      '<p>Bezpośredni koszt odesłania towaru ponosisz Ty. Prosimy o staranne zapakowanie ceramiki.</p>' +
      '<h2>Reklamacje</h2><p>Odpowiadamy za zgodność towaru z umową. Jeśli produkt jest uszkodzony lub wadliwy, napisz do nas i dołącz zdjęcia — na reklamację odpowiemy w ciągu 14 dni.</p>' +
      '<p>Drobne różnice w kształcie i odcieniu szkliwa wynikają z ręcznego wykonania ceramiki i nie są wadą.</p>' +
      '<h2>Zakupy na firmę</h2><p>Jeśli prowadzisz jednoosobową działalność gospodarczą i kupujesz na potrzeby niezwiązane z Twoim zawodem, przysługuje Ci prawo odstąpienia od umowy na zasadach takich jak konsumentowi.</p>' +
      '</div></section>';
  }

  function viewContact() {
    return '<div class="wrap page-head">' + crumbs([['Strona główna', '#/'], ['Kontakt']]) + '<h1>Kontakt</h1></div>' +
      '<section class="wrap" data-section="Kontakt · Contact info" aria-label="Kontakt"><div class="contact">' +
      '<div><p>Masz pytanie o produkt, zamówienie albo zwrot? Odpowiadamy w dni robocze, zwykle w ciągu kilku godzin.</p><dl>' +
      '<dt>E-mail</dt><dd>kontakt@szuwarglina.example <span class="muted small">(adres przykładowy)</span></dd>' +
      '<dt>Telefon</dt><dd>+48 000 000 000 <span class="muted small">(numer przykładowy)</span><br><span class="muted small">pon.–pt. 9:00–16:00</span></dd>' +
      '<dt>Dane firmy</dt><dd>Szuwar &amp; Glina (firma fikcyjna)<br>ul. Przykładowa 1, 00-000 Miasto<br>NIP: 000-000-00-00</dd></dl></div>' +
      '<form class="panel" data-demo-form="contact" novalidate aria-labelledby="h-form"><h2 id="h-form">Napisz do nas</h2><div class="fields">' +
      field('k-name', 'Imię', 'text', 'given-name', false) + field('k-email', 'Adres e-mail', 'email', 'email', false) +
      '<div class="field field--full"><label for="k-topic">Temat</label><select id="k-topic"><option>Pytanie o produkt</option><option>Status zamówienia</option><option>Zwrot lub reklamacja</option><option>Współpraca</option></select></div>' +
      '<div class="field field--full"><label for="k-order">Numer zamówienia (opcjonalnie)</label><input id="k-order" type="text"></div>' +
      '<div class="field field--full"><label for="k-msg">Wiadomość</label><textarea id="k-msg"></textarea></div></div>' +
      '<label class="check-row"><input type="checkbox"> <span>Wyrażam zgodę na przetwarzanie moich danych w celu udzielenia odpowiedzi.</span></label>' +
      '<button class="btn" type="submit">Wyślij wiadomość</button>' +
      '<p class="notice notice--demo" role="status" aria-live="polite"></p></form></div></section>';
  }
  function viewNotFound() {
    return '<div class="wrap page-head"><h1>Nie znaleziono strony</h1><p><a href="#/">Wróć na stronę główną</a></p></div>';
  }

  /* ---------- Router ---------- */
  var main = document.getElementById('main');
  var TITLES = { '': 'Strona główna', sklep: 'Sklep', koszyk: 'Koszyk', 'o-nas': 'O nas', 'dostawa-i-zwroty': 'Dostawa i zwroty', kontakt: 'Kontakt' };
  var lastRoute = null;

  function parse() {
    var h = location.hash.replace(/^#/, '') || '/';
    var sp = h.split('?');
    return { parts: sp[0].split('/').filter(Boolean), q: new URLSearchParams(sp[1] || '') };
  }
  function render(keepScroll) {
    var r = parse(), a = r.parts[0] || '', html, title;
    if (a === '') html = viewHome();
    else if (a === 'sklep') html = viewShop(r.q);
    else if (a === 'produkt') { html = viewProduct(r.parts[1]); title = BY_ID[r.parts[1]] ? t(BY_ID[r.parts[1]]).name : 'Produkt'; }
    else if (a === 'koszyk') html = viewCart();
    else if (a === 'o-nas') html = viewAbout();
    else if (a === 'dostawa-i-zwroty') html = viewShipping();
    else if (a === 'kontakt') html = viewContact();
    else html = viewNotFound();
    main.innerHTML = html;
    document.title = (title || TITLES[a] || 'Strona') + ' — Szuwar & Glina (demo)';
    document.querySelectorAll('[data-nav]').forEach(function (n) {
      if (n.getAttribute('data-nav') === a) n.setAttribute('aria-current', 'page'); else n.removeAttribute('aria-current');
    });
    if (a === 'sklep') renderResults();
    if (a === 'koszyk') renderCart();
    updateCount();
    closeMenu();
    var route = location.hash;
    if (!keepScroll && lastRoute !== null && route !== lastRoute) {
      window.scrollTo(0, 0);
      main.focus({ preventScroll: true });
    }
    lastRoute = route;
  }
  window.addEventListener('hashchange', function () { render(false); });

  /* ---------- Zdarzenia ---------- */
  function toast(html) {
    var el = document.getElementById('toast');
    el.innerHTML = html;
    el.classList.add('is-on');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove('is-on'); }, 3800);
  }
  function currentProduct() {
    var r = parse();
    return r.parts[0] === 'produkt' ? BY_ID[r.parts[1]] : null;
  }

  main.addEventListener('change', function (e) {
    var el = e.target;
    if (el.hasAttribute('data-opt')) {
      var p = currentProduct(); if (!p) return;
      var sel = selOf(p), key = el.getAttribute('data-opt');
      sel[key] = +el.value;
      var o = p.options.filter(function (x) { return x.key === key; })[0];
      document.getElementById('optv-' + key).textContent = o.values[sel[key]][state.lang];
      document.getElementById('pPrice').innerHTML = priceBlock(p, sel);
      var v = state.view[p.id] || 0;
      document.getElementById('gMain').innerHTML = productArt(p, sel, v);
      document.getElementById('gThumbs').innerHTML = thumbs(p, sel, v);
    } else if (el.name === 'f-cat') {
      state.shop.cat = el.value;
      history.replaceState(null, '', el.value === 'all' ? '#/sklep' : '#/sklep?kategoria=' + el.value);
      lastRoute = location.hash;
      renderResults();
    } else if (el.id === 'f-sort') {
      state.shop.sort = el.value; renderResults();
    } else if (el.name === 'ship') {
      state.ship = el.value; renderCart();
    } else if (el.name === 'pay') {
      state.pay = el.value;
    } else if (el.id === 'qtyInput') {
      var pp = currentProduct();
      var n = Math.max(1, Math.min(99, parseInt(el.value, 10) || 1));
      el.value = n; if (pp) state.qty[pp.id] = n;
    }
  });
  main.addEventListener('input', function (e) {
    if (e.target.id === 'f-max') { state.shop.max = +e.target.value; renderResults(); }
  });
  main.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    var p = currentProduct();
    if (b.hasAttribute('data-view') && p) {
      var v = +b.getAttribute('data-view');
      state.view[p.id] = v;
      document.getElementById('gMain').innerHTML = productArt(p, selOf(p), v);
      document.querySelectorAll('#gThumbs .thumb').forEach(function (tb) { tb.setAttribute('aria-pressed', String(+tb.getAttribute('data-view') === v)); });
    } else if (b.hasAttribute('data-q') && p) {
      var input = document.getElementById('qtyInput');
      var n = Math.max(1, Math.min(99, (parseInt(input.value, 10) || 1) + +b.getAttribute('data-q')));
      input.value = n; state.qty[p.id] = n;
    } else if (b.getAttribute('role') === 'tab') {
      selectTab(b);
    } else if (b.hasAttribute('data-cq')) {
      var it = state.cart[+b.getAttribute('data-i')];
      it.qty = Math.max(1, Math.min(99, it.qty + +b.getAttribute('data-cq')));
      renderCart();
    } else if (b.hasAttribute('data-rm')) {
      var removed = state.cart.splice(+b.getAttribute('data-rm'), 1)[0];
      renderCart();
      toast('Usunięto z koszyka: ' + esc(t(BY_ID[removed.id]).name));
    } else if (b.id === 'f-reset' || b.id === 'f-reset2') {
      state.shop = { cat: 'all', max: 350, sort: 'rec' };
      if (location.hash.indexOf('kategoria') > -1) location.hash = '#/sklep'; else render(true);
    }
  });
  main.addEventListener('keydown', function (e) {
    var b = e.target;
    if (b.getAttribute && b.getAttribute('role') === 'tab' && (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'Home' || e.key === 'End')) {
      var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
      var i = tabs.indexOf(b);
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
      tb.setAttribute('aria-selected', String(on));
      tb.tabIndex = on ? 0 : -1;
      document.getElementById(tb.getAttribute('aria-controls')).hidden = !on;
    });
  }
  main.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target;
    if (f.id === 'buyForm') {
      var p = currentProduct(); if (!p) return;
      var sel = JSON.parse(JSON.stringify(selOf(p)));
      var qty = state.qty[p.id] || 1;
      var key = JSON.stringify(sel);
      var ex = state.cart.filter(function (it) { return it.id === p.id && JSON.stringify(it.sel) === key; })[0];
      if (ex) ex.qty = Math.min(99, ex.qty + qty); else state.cart.push({ id: p.id, sel: sel, qty: qty });
      updateCount();
      toast('Dodano do koszyka: ' + esc(t(p).name) + ' (' + qty + ' szt.) <a href="#/koszyk">Przejdź do koszyka</a>');
      return;
    }
    var note = f.querySelector('.notice');
    if (!note) return;
    if (f.id === 'checkout') note.textContent = 'To jest makieta: zamówienie nie zostało złożone, a płatność nie została uruchomiona.';
    else if (f.getAttribute('data-demo-form') === 'news') note.textContent = 'Demo: adres nie został nigdzie zapisany ani wysłany.';
    else note.textContent = 'Demo: wiadomość nie została wysłana. W sklepie trafi na skrzynkę obsługi klienta.';
  });

  /* Język tekstów produktów */
  function setLang(l) {
    state.lang = l;
    document.querySelectorAll('.lang__btn').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === l)); });
    render(true);
    toast(l === 'en' ? 'Teksty produktów: angielski oryginał' : 'Teksty produktów: polskie tłumaczenie');
  }
  document.querySelectorAll('.lang__btn').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  document.querySelectorAll('.lang__btn').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === state.lang)); });

  /* Sekcje Instant Site */
  var secBtn = document.getElementById('sectionsBtn');
  function setSections(on) {
    document.body.classList.toggle('show-sections', on);
    secBtn.setAttribute('aria-pressed', String(on));
    secBtn.textContent = on ? 'Ukryj sekcje Instant Site' : 'Pokaż sekcje Instant Site';
  }
  secBtn.addEventListener('click', function () { setSections(!document.body.classList.contains('show-sections')); });

  /* Menu mobilne */
  var menuBtn = document.getElementById('menuBtn'), nav = document.getElementById('nav');
  function closeMenu() { nav.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', function () {
    var open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  /* Panel „Co obejmuje wdrożenie” */
  var scope = document.getElementById('scope'), scopeBody = document.getElementById('scopeBody'), scopeToggle = document.getElementById('scopeToggle');
  function setScope(open) {
    scope.classList.toggle('is-open', open);
    scopeBody.hidden = !open;
    scopeToggle.setAttribute('aria-expanded', String(open));
  }
  scopeToggle.addEventListener('click', function () { setScope(true); document.getElementById('scopeClose').focus(); });
  document.getElementById('scopeClose').addEventListener('click', function () { setScope(false); scopeToggle.focus(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (scope.classList.contains('is-open')) { setScope(false); scopeToggle.focus(); }
      closeMenu();
    }
  });

  if (params.get('panel') === 'open') setScope(true);
  if (params.get('sections') === '1') setSections(true);
  render(true);
})();
