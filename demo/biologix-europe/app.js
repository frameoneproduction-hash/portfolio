/* BIOLOGIX EUROPE – szkic strony głównej na sekcjach Instant Site. Bez cookies, bez analityki, bez zapytań sieciowych (poza zdjęciami). */
(function () {
  'use strict';

  /* ---------- Dane ---------- */
  var CDN = 'https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/';
  var CATS = {
    lab: { pl: 'Artykuły laboratoryjne', en: 'General Laboratory Products', plDesc: 'Pipetowanie, probówki, filtracja, mikrobiologia', enDesc: 'Liquid handling, tubes, filtration, microbiology', img: 'https://d2gt4h1eeousrn.cloudfront.net/140367758/logo-gallery-pTu3mr/6OXcjIf-1200x1200.webp', scene: true },
    cryo: { pl: 'Kriogenika – CryoKING®', en: 'Cryogenic storage', plDesc: 'Krioprobówki, pudełka kriogeniczne, regały do zamrażarek', enDesc: 'Cryogenic vials, cryogenic boxes, freezer racks', img: 'https://d2gt4h1eeousrn.cloudfront.net/140367758/logo-gallery-pTu3mr/MfIFGhj-1200x1200.webp', scene: true },
    droso: { pl: 'Hodowla Drosophila – DrosoKING®', en: 'Drosophila', plDesc: 'Fiolki i butelki do hodowli muszek owocowych', enDesc: 'Vials and bottles for fruit fly culture', img: CDN + '875747886/6379274146.png', backdrop: 'https://d2gt4h1eeousrn.cloudfront.net/140367758/logo-gallery-pTu3mr/6OXcjIf-1200x1200.webp' },
    cell: { pl: 'Hodowla komórkowa', en: 'Cell culture', plDesc: 'Butelki i płytki hodowlane, pipety serologiczne, sitka komórkowe', enDesc: 'Culture flasks and plates, serological pipettes, cell strainers', img: 'https://dfvc2y3mjtc8v.cloudfront.net/140367758/logo-gallery-pTu3mr/GqSF3oP-1200x1200.webp', scene: true },
    instr: { pl: 'Aparatura laboratoryjna', en: 'Instruments', plDesc: 'Wirówki, mieszadła, pipety automatyczne', enDesc: 'Centrifuges, stirrers, micropipettes', img: 'https://d2gt4h1eeousrn.cloudfront.net/140367758/logo-gallery-pTu3mr/EozPNJc-1200x1200.webp', scene: true }
  };

  /* 8 produktów z eksportu katalogu Ecwid (18.11): nazwy, ceny, SKU, zdjęcia, opisy i opcje – prawdziwe.
     Nazwy EN produktów polskich i nazwa PL produktu angielskiego – nasze tłumaczenie (glosariusz zamówienia). */
  var PRODUCTS = [
    {
      "id": "pudelka-kriogeniczne-pp-2-cale",
      "cat": "cryo",
      "sku": "90-9100/P90-9100",
      "base": 24.59,
      "photos": [
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875758057/6422559013.jpg",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875758057/6422549446.jpg",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875758057/6422554598.jpg",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875758057/6422549452.jpg",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875758057/6422559019.jpg",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875758057/6422554610.jpg"
      ],
      "options": [
        {
          "key": "o1",
          "en": "Qty",
          "pl": "Ilość",
          "values": [
            {
              "en": "5 Pcs",
              "pl": "5 szt.",
              "price": 24.59,
              "sku": "P90-9100",
              "img": "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875758057/6422549494.jpg",
              "def": false
            },
            {
              "en": "20 Pcs",
              "pl": "20 szt.",
              "price": 54.39,
              "sku": "90-9100",
              "img": "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875758057/6422554616.jpg",
              "def": false
            }
          ]
        }
      ],
      "en": {
        "name": "CryoKING® PP Cryogenic Boxes, 2in 100-Well, Hinged Lid, 5/Pack, 20/Case"
      },
      "pl": {
        "name": "CryoKING® Pudełka kriogeniczne z PP, 2 cale, 100 miejsc, pokrywa na zawiasach, 5 szt./opakowanie, 20 szt./karton"
      },
      "desc": {
        "html": "<p>CryoKING® 2-inch cryogenic storage boxes are designed for organized storage of 1.5 mL and 2.0 mL microtubes and cryogenic vials in mechanical freezers.</p><p><strong>Features</strong><br></p><ul><li>Made of polypropylene, chemically resistant to alcohols and mild organic solvents</li><li>Can be repeatedly frozen and thawed</li><li> 10x10 (100-well)</li><li> Compatible with 1.5ml or 2.0ml microtubes and cryogenic vials</li><li>Boxes feature numbered grids for sample identification</li><li> Drain holes and air vents minimize condensation</li><li> Five assorted colors available</li><li>Suitable for storage in mechanical freezers</li><li> Temperature range: stable from -86℃ to 121℃</li></ul><div class=\"table-wrap\"><table class=\"spec-table\"><thead><tr><th>Parameter</th><th>Details</th></tr></thead><tbody><tr><td>Catalog Number</td><td>90-9100</td></tr><tr><td>Box Height</td><td>2 in.</td></tr><tr><td>Capacity</td><td>100 wells</td></tr><tr><td>Grid Configuration</td><td>10 × 10</td></tr><tr><td>Compatible Tubes</td><td>1.5 mL and 2.0 mL</td></tr><tr><td>Material</td><td>Polypropylene</td></tr><tr><td>Color</td><td>Assorted colors</td></tr><tr><td>Dimensions</td><td>141 × 154 × 55 mm</td></tr><tr><td>Packaging</td><td>5 boxes/pack, 4 packs/case</td></tr><tr><td>Case Quantity</td><td>20 boxes</td></tr></tbody></table></div>",
        "lang": "en"
      },
      "descPl": "<p>Pudełka kriogeniczne CryoKING® o wysokości 2 cali służą do uporządkowanego przechowywania mikroprobówek i krioprobówek 1,5 ml i 2,0 ml w zamrażarkach mechanicznych.</p><p><strong>Cechy</strong><br></p><ul><li>Wykonane z polipropylenu, odporne chemicznie na alkohole i łagodne rozpuszczalniki organiczne</li><li>Można je wielokrotnie zamrażać i rozmrażać</li><li>10 × 10 (100 miejsc)</li><li>Pasują do mikroprobówek i krioprobówek 1,5 ml lub 2,0 ml</li><li>Numerowana siatka ułatwia identyfikację próbek</li><li>Otwory odpływowe i wentylacyjne ograniczają kondensację</li><li>Dostępne w pięciu kolorach</li><li>Do przechowywania w zamrażarkach mechanicznych</li><li>Zakres temperatur: stabilne od −86 °C do 121 °C</li></ul><div class=\"table-wrap\"><table class=\"spec-table\"><thead><tr><th>Parametr</th><th>Szczegóły</th></tr></thead><tbody><tr><td>Nr katalogowy</td><td>90-9100</td></tr><tr><td>Wysokość pudełka</td><td>2 cale</td></tr><tr><td>Pojemność</td><td>100 miejsc</td></tr><tr><td>Układ siatki</td><td>10 × 10</td></tr><tr><td>Pasujące probówki</td><td>1,5 ml i 2,0 ml</td></tr><tr><td>Materiał</td><td>Polipropylen</td></tr><tr><td>Kolor</td><td>Różne kolory</td></tr><tr><td>Wymiary</td><td>141 × 154 × 55 mm</td></tr><tr><td>Opakowanie</td><td>5 pudełek/opakowanie, 4 opakowania/karton</td></tr><tr><td>Liczba w kartonie</td><td>20 pudełek</td></tr></tbody></table></div>",
      "badge": {
        "pl": "Bestseller",
        "en": "Best Seller",
        "kind": ""
      }
    },
    {
      "id": "pudelka-kriogeniczne-kartonowe-2-cale",
      "cat": "cryo",
      "sku": "90-3200B",
      "base": 375.05,
      "photos": [
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/874566462/6367626922.png",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/874566462/6367627646.png",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/874566462/6367627445.png",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/874566462/6367627463.png",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/874566462/6367627676.png",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/874566462/6367627487.png"
      ],
      "options": [],
      "en": {
        "name": "Cardboard Cryogenic Boxes with Riveted Lid, 2 in, 100-Well, Blue, 133 × 133 × 53 mm, to −86 °C, 5/Pack, 4 Packs/Case"
      },
      "pl": {
        "name": "Pudełka kriogeniczne kartonowe z pokrywą na nitach, 2 cale, 100 miejsc, niebieskie, 133 × 133 × 53 mm, do −86°C, 5 szt./opakowanie, 4 opakowania/karton"
      },
      "desc": {
        "html": "<h4><strong><em>Zastosowanie:</em></strong></h4><ul><li>Przeznaczone do przechowywania i organizacji probówek o pojemności od 1,0 ml do 2,0 ml.</li><li>Odpowiednie do przechowywania próbek w zamrażarkach pionowych i skrzyniowych.</li></ul><h4><strong><em>Cechy produktu:</em></strong></h4><ul><li>Wodoodporna powłoka: Wykonane z kartonu pokrytego warstwą ochronną, która zwiększa odporność na wilgoć.</li><li>Pokrywa na zawiasach: Pokrywa połączona z pudełkiem za pomocą nitów zapobiega jej oddzieleniu i ułatwia przechowywanie.</li><li>Różne rodzaje przegródek: Dostępne trzy warianty przegródek: kartonowa kratka prosta, prosta kratka z PP oraz przegródki typu słupkowego z PP.</li><li>Oznaczenia alfanumeryczne: Oznaczenia na pokrywie, spodzie i czterech bokach ułatwiają szybką identyfikację i lokalizację próbek.</li><li>Metalowe nity: Solidne metalowe zawiasy zapewniają trwałość konstrukcji i ograniczają ryzyko pękania lub poluzowania pokrywy przy częstym otwieraniu i zamykaniu.</li><li>Temperatura pracy: Do −86°C.</li></ul><h4><strong><em>Specyfikacja techniczna:</em></strong></h4><div><div class=\"table-wrap\"><table class=\"spec-table\"><tbody><tr><th><p>Nr katalogowy</p></th><th><p>Wysokość</p></th><th><p>Liczba miejsc</p></th><th><p>Kolor</p></th><th><p>Rodzaj przegródek</p></th><th><p>Sterylność</p></th><th><p>Opakowanie</p></th></tr><tr><td><p>90-3200B</p></td><td><p>2 cale</p></td><td><p>100 miejsc</p></td><td><p>Niebieski</p></td><td><p>Kartonowa kratka prosta</p></td><td><p>Niesterylne</p></td><td><p>5 szt./opakowanie, 4 opakowania/karton</p></td></tr></tbody></table></div></div>",
        "lang": "pl"
      },
      "descPl": null
    },
    {
      "id": "fiolki-do-hodowli-muszek-owocowych",
      "cat": "droso",
      "sku": "51-0800",
      "base": 820.85,
      "photos": [
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875747886/6379274146.png",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875747886/6379189191.jpg",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875747886/6379186215.jpg"
      ],
      "options": [],
      "en": {
        "name": "Biologix® Fruit Fly Vials, Wide, Bulk Pack, 500/Case"
      },
      "pl": {
        "name": "Biologix® Fiolki do hodowli muszek owocowych, szerokie, opakowanie zbiorcze, 500 szt./karton"
      },
      "desc": {
        "html": "<ul><li>Wykonane z wysokiej jakości polistyrenu (PS).</li><li>Wysoka przezroczystość, przypominająca szkło, umożliwia łatwą obserwację próbek.</li><li>Jednorazowe fiolki stanowią praktyczną i ekonomiczną alternatywę dla fiolek szklanych.</li></ul><h4><strong><em>Specyfikacja techniczna:</em></strong></h4><div><div class=\"table-wrap\"><table class=\"spec-table\"><tbody><tr><th><p>Nr katalogowy</p></th><th><p>Opis</p></th><th><p>Wymiary (mm)</p></th><th><p>Sterylne</p></th><th><p>Rodzaj opakowania</p></th><th><p>Ilość</p></th></tr><tr><td><p>51-0800</p></td><td><p>Szeroka</p></td><td><p>28,5 × 95</p></td><td><p>Nie</p></td><td><p>Opakowanie zbiorcze</p></td><td><p>25 szt./opakowanie, 20 opakowań/karton</p></td></tr></tbody></table></div></div>",
        "lang": "pl"
      },
      "descPl": null
    },
    {
      "id": "sitka-komorkowe-50-ml",
      "cat": "cell",
      "sku": "15-1040/15-1070/15-1100",
      "base": 613.56,
      "photos": [
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875758107/6379132164.jpg",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875758107/6379132170.jpg",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875758107/6379132200.png",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875758107/6379189073.png",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875758107/6379186139.png",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875758107/6379132206.png"
      ],
      "options": [
        {
          "key": "o1",
          "en": "Pore size",
          "pl": "Wielkość porów",
          "values": [
            {
              "en": "40 µm",
              "pl": "40 µm",
              "price": 613.56,
              "sku": "15-1040",
              "img": "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875758107/6379186127.jpg",
              "def": false
            },
            {
              "en": "70 µm",
              "pl": "70 µm",
              "price": 613.56,
              "sku": "15-1070",
              "img": "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875758107/6379186135.jpg",
              "def": false
            },
            {
              "en": "100 µm",
              "pl": "100 µm",
              "price": 613.56,
              "sku": "15-1100",
              "img": "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875758107/6379186137.jpg",
              "def": false
            }
          ]
        }
      ],
      "en": {
        "name": "Biologix® Cell Strainers for 50 mL Centrifuge Tubes, Sterile, 40/70/100 µm, Individually Wrapped, 100/Case"
      },
      "pl": {
        "name": "Biologix® Sitka komórkowe do probówek wirówkowych 50 ml, sterylne, 40/70/100 µm, pakowane pojedynczo, 100 szt./karton"
      },
      "desc": {
        "html": "<h4><strong><em>Cechy produktu:</em></strong></h4><ul><li>Wytrzymałe materiały: Wykonane z trwałego polipropylenu (PP) oraz mocnej siatki nylonowej, zapewniającej odpowiednią strukturę filtracyjną.</li><li>Oznaczenia kolorystyczne: Różne kolory odpowiadają poszczególnym wielkościom porów, ułatwiając szybkie rozpoznawanie i wybór odpowiedniego filtra.</li><li>Kompatybilność: Zaprojektowane do stosowania z probówkami wirówkowymi Biologix o pojemności 50 ml.</li><li>Sterylizacja: Sterylizowane promieniowaniem gamma i niepirogenne.</li><li>Indywidualne opakowanie: Każde sitko jest pakowane oddzielnie, co ułatwia przechowywanie i użytkowanie.</li></ul><h4><strong><em>Specyfikacja techniczna:</em></strong></h4><div class=\"table-wrap\"><table class=\"spec-table\"><tbody><tr><th><p>Nr katalogowy</p></th><th><p>Wielkość porów</p></th><th><p>Kolor</p></th><th><p>Sterylne</p></th><th><p>Rodzaj opakowania</p></th><th><p>Ilość</p></th></tr><tr><td><p>15-1040</p></td><td><p>40 µm</p></td><td><p>Fioletowy</p></td><td><p>Tak</p></td><td><p>Pakowane pojedynczo</p></td><td><p>100 szt./karton</p></td></tr><tr><td><p>15-1070</p></td><td><p>70 µm</p></td><td><p>Pomarańczowy</p></td><td><p>Tak</p></td><td><p>Pakowane pojedynczo</p></td><td><p>100 szt./karton</p></td></tr><tr><td><p>15-1100</p></td><td><p>100 µm</p></td><td><p>Zielony</p></td><td><p>Tak</p></td><td><p>Pakowane pojedynczo</p></td><td><p>100 szt./karton</p></td></tr></tbody></table></div>",
        "lang": "pl"
      },
      "descPl": null
    },
    {
      "id": "filtry-strzykawkowe-13-mm-pes",
      "cat": "cell",
      "sku": "08-PES1322R",
      "base": 1098.2,
      "photos": [
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875482512/6377291690.jpg",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875482512/6377300719.jpg",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875482512/6377297994.jpg",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875482512/6377291696.jpg",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/875482512/6377291702.jpg"
      ],
      "options": [],
      "en": {
        "name": "Biologix® Syringe Filters, 13 mm, 0.22 μm, PES Membrane, Female Luer Lock Inlet, Male Luer Slip Outlet, 800/Case"
      },
      "pl": {
        "name": "Biologix® Filtry strzykawkowe, 13 mm, 0,22 μm, membrana PES, żeńskie wejście Luer Lock i męskie wyjście Luer Slip, 800 szt./karton"
      },
      "desc": {
        "html": "<ul><li><strong>Właściwości membrany PES:</strong> Hydrofilowa membrana PES klasy laboratoryjnej o średnicy 13 mm i wielkości porów 0,22 μm zapewnia wysoki przepływ i niską adsorpcję białek. Idealna do filtracji buforów, roztworów białkowych i pożywek hodowlanych.</li><li><strong>Praktyczna konstrukcja złączy:</strong> Filtry wyposażone są w żeńskie wejście Luer Lock oraz męskie wyjście Luer Slip, zapewniające pewne połączenie ze strzykawką i niezawodną pracę podczas filtracji. Produkt został zaprojektowany zgodnie z wymaganiami systemu zarządzania jakością ISO 9001.</li><li><strong>Wysoka czystość i niskie wiązanie białek: </strong>Niepirogenna konstrukcja o niskiej zawartości substancji ekstrahowalnych, bez dodatku środków powierzchniowo czynnych. Współczynnik wiązania białek poniżej 1,5% pomaga ograniczyć straty próbek i zwiększyć efektywność filtracji.</li><li><strong>Wydajna filtracja: </strong>Wysokiej jakości membrana zapewnia skuteczne zatrzymywanie mikroorganizmów oraz wysoką przepustowość, umożliwiając sprawną filtrację roztworów laboratoryjnych.</li><li><strong>Szerokie zastosowanie: </strong>Hydrofilowe filtry przeznaczone do filtracji roztworów białkowych, buforów, pożywek hodowlanych, dodatków i odczynników w laboratoriach nauk przyrodniczych.</li></ul><h4><strong><em>Specyfikacja techniczna:</em></strong></h4><div class=\"table-wrap\"><table class=\"spec-table\"><tbody><tr><th><p>Parametr</p></th><th><p>Specyfikacja</p></th></tr><tr><td><p>Marka</p></td><td><p>Biologix®</p></td></tr><tr><td><p>Typ produktu</p></td><td><p>Filtr strzykawkowy</p></td></tr><tr><td><p>Materiał membrany</p></td><td><p>PES (polieterosulfon)</p></td></tr><tr><td><p>Średnica</p></td><td><p>13 mm</p></td></tr><tr><td><p>Wielkość porów</p></td><td><p>0,22 μm</p></td></tr><tr><td><p>Wejście</p></td><td><p>Żeńskie Luer Lock</p></td></tr><tr><td><p>Wyjście</p></td><td><p>Męskie Luer Slip</p></td></tr><tr><td><p>Wiązanie białek</p></td><td><p>&lt;1,5%</p></td></tr><tr><td><p>Opakowanie</p></td><td><p>20 szt./opakowanie</p></td></tr><tr><td><p>Ilość w kartonie</p></td><td><p>800 szt.</p></td></tr></tbody></table></div>",
        "lang": "pl"
      },
      "descPl": null
    },
    {
      "id": "petle-inokulacyjne-1-10-ul",
      "cat": "lab",
      "sku": "65-0001",
      "base": 565.08,
      "photos": [
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/874566461/6367616828.png",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/874566461/6367616846.png",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/874566461/6367616852.png",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/874566461/6367616595.png",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/874566461/6367617060.png"
      ],
      "options": [
        {
          "key": "o1",
          "en": "Size",
          "pl": "Rozmiar",
          "values": [
            {
              "en": "1 µL",
              "pl": "1 µl",
              "price": 565.08,
              "sku": "65-0001",
              "img": "",
              "def": false
            },
            {
              "en": "10 µL",
              "pl": "10 µl",
              "price": 565.08,
              "sku": "65-0010",
              "img": "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/874566461/6388300004.jpg",
              "def": false
            }
          ]
        }
      ],
      "en": {
        "name": "Biologix® Inoculating Loops, 1/10 µL, Blue, Sterile, 25/Pack, 1000/Case"
      },
      "pl": {
        "name": "Biologix® Pętle inokulacyjne, 1/10 µL, niebieskie, sterylne, 25 szt./opakowanie, 1000 szt./karton"
      },
      "desc": {
        "html": "<ul><li>Wykonane z odpornego na uderzenia polistyrenu (PS) klasy laboratoryjnej</li><li>Gładka powierzchnia pętli: Specjalnie zaprojektowana, wyjątkowo gładka powierzchnia umożliwia równomierne rozprowadzanie próbki na powierzchni podłoża żelowego bez jej uszkadzania</li><li>Precyzyjna objętość: Dostępne w wariantach 1 µl i 10 µl, z dokładnie określoną objętością; drugi koniec każdej pętli może być używany jako igła inokulacyjna</li><li>Sterylizacja: Sterylizowane promieniowaniem gamma; niepirogenne</li><li>Praktyczne opakowanie: Pakowane w zamykaną torebkę strunową, z kartonikiem zawierającym opis produkcyjny</li></ul><h4><strong><em>Specyfikacja techniczna:</em></strong></h4><div><div class=\"table-wrap\"><table class=\"spec-table\"><tbody><tr><th><p>Nr katalogowy</p></th><th><p>Objętość</p></th><th><p>Opis</p></th><th><p>Kolor</p></th><th><p>Sterylne</p></th><th><p>Opakowanie</p></th></tr><tr><td><p>65-0001</p></td><td><p>1 µl</p></td><td><p>Pętle inokulacyjne</p></td><td><p>Niebieski</p></td><td><p>Tak</p></td><td><p>25 szt./opakowanie, 1000 szt./karton</p></td></tr><tr><td>65-0010</td><td>10 µl</td><td>Pętle inokulacyjne</td><td>pomarańczowy</td><td>Tak</td><td>25 szt./opakowanie, 1000 szt./karton</td></tr></tbody></table></div></div>",
        "lang": "pl"
      },
      "descPl": null
    },
    {
      "id": "szkielka-mikroskopowe-1x3",
      "cat": "lab",
      "sku": "7109/10P7109",
      "base": 239.99,
      "photos": [
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/876431355/6388293904.jpg",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/876431355/6388293940.jpg",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/876431355/6388293975.jpg"
      ],
      "options": [
        {
          "key": "o1",
          "en": "Size",
          "pl": "Rozmiar",
          "values": [
            {
              "en": "10 boxes (500 pcs)",
              "pl": "10 pudełek (500 szt.)",
              "price": 239.99,
              "sku": "10P7109",
              "img": "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/876431355/6388467762.jpg",
              "def": false
            },
            {
              "en": "50 boxes (2500 pcs)",
              "pl": "50 pudełek (2500 szt.)",
              "price": 1322.62,
              "sku": "7109",
              "img": "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/876431355/6388465510.jpg",
              "def": false
            }
          ]
        }
      ],
      "en": {
        "name": "Biologix® Microscope Slides, 1 × 3 in, Pre-Cleaned, Blue Frosted End, 50/Box"
      },
      "pl": {
        "name": "Biologix® Szkiełka mikroskopowe 1 × 3 cale, wstępnie oczyszczone, niebieskie pole matowe, 50 szt./pudełko"
      },
      "desc": {
        "html": "<ul><li>Wysokiej jakości szkło i bezpieczne krawędzie: szkło sodowo-wapniowe o wysokiej przepuszczalności światła, bez pęcherzyków i zarysowań. W pełni polerowane krawędzie ze ścięciem pod kątem 45° ograniczają ryzyko skaleczeń i pasują do zautomatyzowanych urządzeń laboratoryjnych.</li><li>Standardowe wymiary: 1 × 3 cale, grubość 1,0–1,2 mm. Kolorowe, matowe pole na jednym końcu nie odbija światła, umożliwia opisywanie ołówkiem lub markerem i ułatwia klasyfikację próbek.</li><li>Kolorowa powłoka: matowe pole jest odporne na ścieranie, blaknięcie i odwarstwianie. Odporność na typowe odczynniki laboratoryjne i roztwory barwiące pomaga zachować czytelność oznaczeń.</li><li>Szeroka kompatybilność: do mikroskopów, drukarek do szkiełek, automatów barwiących i urządzeń do nakładania szkiełek nakrywkowych. Do histologii, cytologii, badań i dydaktyki, zwłaszcza w laboratoriach o dużej przepustowości wymagających szybkiego sortowania wzrokowego.</li><li>Zawartość opakowania: 50 lub 2500 szkiełek mikroskopowych do codziennego użytku lub pracy laboratoryjnej.</li></ul>",
        "lang": "pl"
      },
      "descPl": null,
      "badge": {
        "pl": "Nowość",
        "en": "New",
        "kind": "new"
      }
    },
    {
      "id": "butelki-na-odczynniki-pp-125-ml",
      "cat": "lab",
      "sku": "04-0125U/P04-0125U-25",
      "base": 122.65,
      "photos": [
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/876431354/6388404828.jpg",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/144774751/products/876431354/6388404842.jpg"
      ],
      "options": [
        {
          "key": "o1",
          "en": "Packaging",
          "pl": "Opakowanie",
          "values": [
            {
              "en": "25 pcs/bag",
              "pl": "25 szt./worek",
              "price": 122.65,
              "sku": "P04-0125U-25",
              "img": "",
              "def": true
            },
            {
              "en": "250 pcs/case",
              "pl": "250 szt./karton",
              "price": 376.89,
              "sku": "04-0125U",
              "img": "",
              "def": false
            }
          ]
        }
      ],
      "en": {
        "name": "Biologix® PP Reagent Bottles, 125 mL, Clear, 25/Bag, 10 Bags/Case"
      },
      "pl": {
        "name": "Biologix® Butelki na odczynniki z PP, 125 ml, przezroczyste, 25 szt./worek, 10 worków/karton"
      },
      "desc": {
        "html": "<p>● Wykonane z wytrzymałego polipropylenu klasy medycznej lub polietylenu o wysokiej gęstości.</p><p>● Równomierna grubość ścianek i wysoka wytrzymałość. Odporność na uderzenia oraz większość kwasów, zasad i alkoholi.</p><p>● Butelki polipropylenowe nadają się do autoklawowania.</p><p>● Szeroka szyjka ułatwia napełnianie i zapewnia szczelne zamknięcie.</p><p>● Zakrętki bez wkładek uszczelniających chronią przed wyciekiem, eliminując ryzyko marszczenia się wkładki, nieszczelności lub zanieczyszczenia odczynników.</p><p>● Przezroczyste butelki oraz butelki w kolorze naturalnym ułatwiają obserwację zawartości.</p><p>● Wolne od DNaz i RNaz, niepirogenne.</p><p><strong>Uwaga:</strong></p><p>Zakrętki i butelki są pakowane osobno.</p><div class=\"table-wrap\"><table class=\"spec-table\"><tbody><tr><td><strong>Nr katalogowy</strong></td><td><strong>Kolor</strong></td><td><strong>Pojemność</strong></td><td><strong>Materiał</strong></td><td><strong>Sterylne</strong></td><td><strong>Opakowanie</strong></td></tr><tr><td>04-0125U</td><td>Przezroczysty</td><td>125 ml</td><td>PP</td><td>Nie</td><td>25 szt./worek, 10 worków/karton</td></tr><tr><td>P04-0125U-25</td><td>Przezroczysty</td><td>125 ml</td><td>PP</td><td>Nie</td><td>25 szt./worek</td></tr></tbody></table></div>",
        "lang": "pl"
      },
      "descPl": null
    }
  ];

  var BY_ID = {};
  PRODUCTS.forEach(function (p) { BY_ID[p.id] = p; });
  var FEATURED = PRODUCTS.map(function (p) { return p.id; });

  var HERO = [
    {
      id: '1579165466949-3180a3d056d5',
      src: 'https://dfvc2y3mjtc8v.cloudfront.net/140367758/cover-ZEzQsF/Er1KGMl-1200x1200.webp', /* zdjęcie Biologix (biologix.jp) pod niebieskim filtrem */
      eyebrow: 'BIOLOGIX® · CryoKING® · DrosoKING®',
      h: { pl: 'Materiały laboratoryjne <em>BIOLOGIX®</em> dla laboratoriów w Polsce', en: '<em>BIOLOGIX®</em> laboratory supplies for labs in Poland' },
      p: { pl: 'Produkty BIOLOGIX®, CryoKING® i DrosoKING® do badań, biobankowania i kontroli jakości – teraz dostępne w Polsce.', en: 'BIOLOGIX®, CryoKING® and DrosoKING® products for research, biobanking and quality control – now available in Poland.' },
      cta: { pl: 'Zobacz produkty', en: 'Browse products' }, href: '#/sklep',
      alt: { pl: 'Naukowiec pracujący z pipetą w laboratorium', en: 'Scientist working with a pipette in a laboratory' }
    }
  ];

  /* ---------- Stan (tylko w pamięci, bez cookies i localStorage) ---------- */
  var params = new URLSearchParams(location.search);
  var PRICE_MAX = Math.ceil(Math.max.apply(null, PRODUCTS.map(function (p) { return minPrice(p).price; })) / 100) * 100;
  var state = {
    lang: params.get('lang') === 'en' ? 'en' : 'pl',
    cart: [],
    pay: 'online',
    sel: {},
    view: {},
    qty: {},
    shop: { cat: 'all', max: PRICE_MAX, sort: 'rec', q: '' }
  };

  /* ---------- Narzędzia ---------- */
  function L(pl, en) { return state.lang === 'en' ? en : pl; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  /* Własne teksty strony: [nawiasy] = miejsca do potwierdzenia – wyróżnione na makiecie. */
  function fx(s) { return String(s).replace(/\[[^\]]+\]/g, function (m) { return '<mark class="ph">' + m + '</mark>'; }); }
  function zl(n) {
    var parts = n.toFixed(2).split('.');
    var int = parts[0];
    if (int.length > 4) int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return int + ',' + parts[1] + ' zł';
  }
  function plural(n, one, few, many) {
    if (n === 1) return one;
    var d = n % 10, h = n % 100;
    if (d >= 2 && d <= 4 && !(h >= 12 && h <= 14)) return few;
    return many;
  }
  function count(n, pl1, pl2, pl5, en1, enN) { return n + ' ' + (state.lang === 'en' ? (n === 1 ? en1 : enN) : plural(n, pl1, pl2, pl5)); }
  function t(p) { return p[state.lang]; }
  function selOf(p) {
    if (!state.sel[p.id]) {
      var s = {};
      p.options.forEach(function (o) {
        var d = 0;
        o.values.forEach(function (v, i) { if (v.def) d = i; });
        s[o.key] = d;
      });
      state.sel[p.id] = s;
    }
    return state.sel[p.id];
  }
  function valOf(p, sel) {
    var o = p.options[0];
    return o ? o.values[(sel || {})[o.key] || 0] : null;
  }
  function priceOf(p, sel) {
    var v = valOf(p, sel);
    return { price: v && v.price != null ? v.price : p.base };
  }
  function minPrice(p) {
    if (!p.options.length) return { price: p.base, from: false };
    var prices = p.options[0].values.map(function (v) { return v.price; });
    var min = Math.min.apply(null, prices);
    return { price: min, from: prices.some(function (x) { return x !== min; }) };
  }
  function skuOf(p, sel) {
    var v = valOf(p, sel);
    return v && v.sku ? v.sku : p.sku;
  }
  function variantText(p, sel) {
    return p.options.map(function (o) { return optName(o) + ': ' + o.values[sel[o.key] || 0][state.lang]; }).join(' · ');
  }
  function optName(o) {
    return /^(Ilość|Opakowanie|Rozmiar)$/.test(o.pl) && o.values.some(function (x) { return /szt|opak|karton|worek|pudeł/.test(x.pl); }) ? L('Wielkość opakowania', 'Pack size') : o[state.lang];
  }

  /* ---------- Zdjęcia ---------- */
  var U = 'https://images.unsplash.com/photo-';
  function usrc(id, w, h) { return U + id + '?auto=format&amp;fit=crop&amp;w=' + w + '&amp;h=' + h + '&amp;q=75'; }
  function photo(id, alt, w, h, o) {
    o = o || {};
    var ws = o.widths || [w];
    var set = ws.map(function (x) { return usrc(id, x, Math.round(x * h / w)) + ' ' + x + 'w'; }).join(', ');
    return '<img src="' + usrc(id, w, h) + '" srcset="' + set + '" sizes="' + (o.sizes || '100vw') + '" width="' + w + '" height="' + h + '" alt="' + esc(alt) + '"' +
      (o.eager ? ' loading="eager" fetchpriority="high"' : ' loading="lazy"') + ' decoding="async"' + (o.cls ? ' class="' + o.cls + '"' : '') + '>';
  }
  /* Zdjęcia produktów: oryginały z CDN sklepu Ecwid (hotlink). */
  function cdnImg(src, alt, size, eager) {
    return '<img src="' + esc(src) + '" width="' + size + '" height="' + size + '" alt="' + esc(alt) + '"' +
      (eager ? ' loading="eager" fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">';
  }
  var SIZES = { card: 600, main: 1000, thumb: 160, line: 168 };
  function mainSrc(p, sel, view) {
    var v = valOf(p, sel);
    if (!view && v && v.img) return v.img;
    return p.photos[view || 0];
  }
  function productArt(p, sel, view, size) {
    size = size || 'card';
    var alt = size === 'main' ? t(p).name + (view ? L(' – zdjęcie ', ' – photo ') + (view + 1) : '') : '';
    return cdnImg(mainSrc(p, sel, view), alt, SIZES[size], size === 'main');
  }
  function heroSlider() {
    var many = HERO.length > 1;
    var slides = HERO.map(function (h, i) {
      var heading = i === 0 ? 'h1' : 'h2';
      return '<div class="hero__slide" role="group"' + (many ? ' aria-roledescription="' + L('slajd', 'slide') + '" aria-label="' + (i + 1) + L(' z ', ' of ') + HERO.length + '"' : '') + (i === 0 ? '' : ' hidden') + '>' +
        (h.src ? '<img class="hero__img hero__img--brand" src="' + h.src + '" alt="' + esc(h.alt[state.lang]) + '" fetchpriority="high" decoding="async">'
          : photo(h.id, h.alt[state.lang], 1600, 800, { widths: [800, 1200, 1600, 2000], sizes: '(max-width: 759px) 260vw, 100vw', eager: i === 0, cls: 'hero__img' })) +
        '<div class="hero__shade" aria-hidden="true"></div>' +
        '<div class="wrap hero__content"><p class="hero__eyebrow">' + esc(h.eyebrow) + '</p><' + heading + ' class="hero__title">' + esc(h.h[state.lang]).replace(/&lt;(\/?)em&gt;/g, '<$1em>') + '</' + heading + '>' +
        '<p class="hero__text">' + L('Znajdź produkt po numerze katalogowym lub poproś o wycenę dla swojej instytucji.', 'Find a product by catalogue number or request a quote for your institution.') + '</p>' +
        '<form class="hero__search" id="heroSearch" role="search"><label class="sr" for="hs-q">' + L('Szukaj produktu', 'Search products') + '</label>' +
        '<input id="hs-q" type="search" autocomplete="off" placeholder="' + L('Nazwa produktu lub nr katalogowy, np. 90-9100', 'Product name or catalogue no., e.g. 90-9100') + '">' +
        '<button class="btn btn--light" type="submit">' + L('Szukaj', 'Search') + '</button></form>' +
        '<a class="hero__link" href="#/kontakt">' + L('Zapytaj o wycenę dla instytucji →', 'Request a quote for your institution →') + '</a></div></div>';
    }).join('');
    var controls = '';
    if (many) {
      var dots = HERO.map(function (h, i) {
        return '<button type="button" class="hero__dot" data-slide="' + i + '" aria-label="' + L('Slajd ', 'Slide ') + (i + 1) + '"' + (i === 0 ? ' aria-current="true"' : '') + '></button>';
      }).join('');
      controls = '<button type="button" class="hero__nav hero__nav--prev" data-slide="prev" aria-label="' + L('Poprzedni slajd', 'Previous slide') + '"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2"/></svg></button>' +
        '<button type="button" class="hero__nav hero__nav--next" data-slide="next" aria-label="' + L('Następny slajd', 'Next slide') + '"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2"/></svg></button>' +
        '<div class="hero__dots">' + dots + '</div>';
    }
    return '<section class="hero" data-section="Okładka · Cover"' + (many ? ' aria-roledescription="' + L('karuzela', 'carousel') + '"' : '') + ' aria-label="' + L('Wyróżnione', 'Featured') + '">' + slides + controls + '</section>';
  }
  var slideIdx = 0;
  function setSlide(i) {
    var slides = document.querySelectorAll('.hero__slide');
    if (!slides.length) return;
    slideIdx = (i + slides.length) % slides.length;
    slides.forEach(function (el, k) { el.hidden = k !== slideIdx; });
    document.querySelectorAll('.hero__dot').forEach(function (d, k) {
      if (k === slideIdx) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
    });
  }

  /* ---------- Szablony wspólne ---------- */
  function home() { return [L('Strona główna', 'Home'), '#/']; }
  function crumbs(items) {
    return '<nav class="crumbs" aria-label="' + L('Okruszki', 'Breadcrumbs') + '"><ol>' + items.map(function (it, i) {
      return '<li>' + (it[1] && i < items.length - 1 ? '<a href="' + it[1] + '">' + esc(it[0]) + '</a>' : '<span aria-current="page">' + esc(it[0]) + '</span>') + '</li>';
    }).join('') + '</ol></nav>';
  }
  function card(p) {
    var m = minPrice(p), tx = t(p);
    var badge = p.badge ? '<span class="badge' + (p.badge.kind ? ' badge--' + p.badge.kind : '') + '">' + esc(p.badge[state.lang]) + '</span>' : '';
    var variants = p.options.reduce(function (n, o) { return n * o.values.length; }, 1);
    var meta = variants > 1 ? count(variants, 'wariant', 'warianty', 'wariantów', 'variant', 'variants') : 'SKU ' + p.sku;
    return '<a class="card" href="#/produkt/' + p.id + '">' +
      '<div class="card__img">' + productArt(p, null, 0) + '</div>' + badge +
      '<div class="card__body"><p class="card__sku">' + L('Nr kat. ', 'Cat. no. ') + esc(String(p.sku).split('/')[0]) + '</p><h3 class="card__name" lang="' + state.lang + '">' + esc(tx.name) + '</h3>' +

      '<p class="card__price">' + (m.from ? L('od ', 'from ') : '') + zl(m.price) + '</p></div></a>';
  }
  function icon(paths) { return '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">' + paths + '</svg>'; }
  var ICONS = {
    cert: '<circle cx="12" cy="9.5" r="6" fill="currentColor" fill-opacity=".12"/><circle cx="12" cy="9.5" r="6"/><circle cx="12" cy="9.5" r="3.6"/><path d="m8.6 14.6-1.4 6.4 4.8-2.2 4.8 2.2-1.4-6.4"/>',
    clean: '<path d="M12 2.8c3.4 4.3 6.5 7.6 6.5 11.1a6.5 6.5 0 0 1-13 0c0-3.5 3.1-6.8 6.5-11.1Z" fill="currentColor" fill-opacity=".12"/><path d="M12 2.8c3.4 4.3 6.5 7.6 6.5 11.1a6.5 6.5 0 0 1-13 0c0-3.5 3.1-6.8 6.5-11.1Z"/><path d="M8.8 14.2a3.4 3.4 0 0 0 3.2 3.1"/>',
    lab: '<path d="M7.6 14.6h8.8l3 4.8a1.2 1.2 0 0 1-1 1.8H5.6a1.2 1.2 0 0 1-1-1.8z" fill="currentColor" fill-opacity=".12"/><path d="M9 2.8h6M10 2.8v6.6L4.6 19.4a1.2 1.2 0 0 0 1 1.8h12.8a1.2 1.2 0 0 0 1-1.8L14 9.4V2.8"/><path d="M7.6 14.6h8.8"/><circle cx="10.6" cy="17.6" r=".6" fill="currentColor"/><circle cx="13.6" cy="18.4" r=".6" fill="currentColor"/>',
    inst: '<path d="M4 10h16v11H4z" fill="currentColor" fill-opacity=".12"/><path d="M2.8 21.2h18.4M4 21.2V10l8-6.4 8 6.4v11.2"/><path d="M8 21.2v-6.4h8v6.4M12 14.8v6.4"/>',
    coa: '<path d="M6 2.8h8.4L18 6.4v14.8H6z" fill="currentColor" fill-opacity=".12"/><path d="M6 2.8h8.4L18 6.4v14.8H6z"/><path d="M14.2 2.8v3.8H18M9 11h6M9 14.4h6M9 17.8h3.6"/>',
    props: '<rect x="3.2" y="4.4" width="17.6" height="15.2" rx="2.4" fill="currentColor" fill-opacity=".12"/><rect x="3.2" y="4.4" width="17.6" height="15.2" rx="2.4"/><path d="m6.8 9.2 1.4 1.4 2.4-2.6M12.6 9.6h4.6M6.8 14.6l1.4 1.4 2.4-2.6M12.6 15h4.6"/>'
  };

  /* ---------- Widoki ---------- */
  function viewHome() {
    var featured = FEATURED.map(function (id) { return card(BY_ID[id]); }).join('');
    var cats = Object.keys(CATS).map(function (k) {
      var c = CATS[k];
      var media = c.scene ? '<span class="tile__img tile__img--scene"><img src="' + c.img + '" alt="" loading="lazy" decoding="async"></span>'
        : '<span class="tile__img tile__img--compose" style="--bd:url(' + c.backdrop + ')">' + cdnImg(c.img, '', 800) + '</span>';
      return '<a class="tile" href="#/sklep?kategoria=' + k + '">' + media +
        '<span class="tile__label"><span class="tile__name" lang="' + state.lang + '">' + esc(t(c)) + '</span><span class="tile__desc" lang="' + state.lang + '">' + esc(L(c.plDesc, c.enDesc)) + '</span></span></a>';
    }).join('');
    return '' +
      heroSlider() +
      '<div class="trust" data-section="Pasek zaufania · Text blocks"><div class="wrap trust__in">' +
      [L('ISO 9001 · ISO 13485 · CE', 'ISO 9001 · ISO 13485 · CE'), L('Wyszukiwanie po nr katalogowym', 'Search by catalogue number'), L('COA dla każdej partii', 'COA for every lot'), L('Zamówienia hurtowe i OEM', 'Bulk and OEM orders')]
        .map(function (x) { return '<span class="trust__item"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.2 12.3 2.5 2.5 5-5.2"/></svg>' + x + '</span>'; }).join('') +
      '</div></div>' +

      '<section class="section" data-section="Kategorie · Categories" aria-labelledby="h-cats"><div class="wrap">' +
      '<div class="section__head"><div><p class="eyebrow">' + L('Kategorie', 'Categories') + '</p><h2 id="h-cats">' + L('Kategorie produktów', 'Product categories') + '</h2></div><a href="#/sklep">' + L('Wszystkie produkty →', 'All products →') + '</a></div>' +
      '<div class="grid grid--5 tiles">' + cats + '</div></div></section>' +

      '<section class="section section--tight" data-section="Polecane produkty · Featured products" aria-labelledby="h-feat"><div class="wrap">' +
      '<div class="section__head"><div><p class="eyebrow">' + L('Polecane', 'Featured') + '</p><h2 id="h-feat">' + L('Wybrane produkty', 'Selected products') + '</h2></div><a href="#/sklep">' + L('Zobacz wszystkie →', 'See all →') + '</a></div>' +
      '<div class="grid grid--4">' + featured + '</div></div></section>' +

      '<section class="section why" data-section="Dlaczego Biologix · Text blocks" aria-labelledby="h-why"><div class="wrap">' +
      '<div class="section__head"><div><p class="eyebrow">Biologix</p><h2 id="h-why">' + L('Dlaczego Biologix', 'Why Biologix') + '</h2>' +
      '<p class="lead">' + L('Biologix zaopatruje laboratoria w codzienne materiały eksploatacyjne, produkty do przechowywania kriogenicznego i gotowe do użycia odczynniki. Nasze produkty powstają w pomieszczeniach czystych, w certyfikowanych systemach jakości, co zapewnia stałą jakość w każdej partii.',
        'Biologix supplies laboratories with everyday consumables, cryogenic storage and ready-to-use reagents. Our products are made in clean rooms under certified quality systems, for consistent quality from lot to lot.') + '</p></div></div>' +
      '<div class="grid grid--4">' +
      whyItem(ICONS.cert, L('Certyfikowana jakość', 'Certified quality'), L('Certyfikaty ISO 9001, ISO 13485 i CE.', 'ISO 9001, ISO 13485 and CE certifications.')) +
      whyItem(ICONS.clean, L('Czystość i bezpieczeństwo', 'Clean and safe'), L('Wiele produktów jest sterylnych, wolnych od DNaz i RNaz. Certyfikat analizy (COA) dla każdej partii.', 'Many products are sterile and DNase/RNase-free; a certificate of analysis is available for each lot.')) +
      whyItem(ICONS.lab, L('Dla każdego laboratorium', 'For every lab'), L('Od końcówek do pipet i probówek wirówkowych po krioprobówki i zbiorniki na ciekły azot.', 'From pipette tips and centrifuge tubes to cryovials and liquid nitrogen tanks.')) +
      whyItem(ICONS.inst, L('Zamówienia dla instytucji', 'Orders for institutions'), fx(L('[Faktury VAT / zamówienia dla uczelni i firm].', '[VAT invoices / purchase orders for universities and companies].'))) +
      '</div></div></section>' +

      '<section class="section section--tight" data-section="Zapytanie ofertowe · Call to action" aria-labelledby="h-rfq"><div class="wrap"><div class="rfq">' +
      '<div><h2 id="h-rfq">' + L('Zapytaj o ofertę dla instytucji', 'Request a quote for your institution') + '</h2>' +
      '<p>' + L('Uczelnie, szpitale, laboratoria, firmy i dystrybutorzy: prześlij listę produktów i ilości – przygotujemy wycenę, także dla zamówień hurtowych i OEM.', 'Universities, hospitals, labs, companies and distributors: send us the products and quantities – we will prepare a quote, including bulk and OEM orders.') + '</p></div>' +
      '<a class="btn btn--primary" href="#/kontakt">' + L('Zapytaj o ofertę', 'Request a quote') + '</a></div></div></section>' +

      '<section class="section section--tight" data-section="Newsletter · Subscribe" aria-labelledby="h-news"><div class="wrap"><div class="newsletter">' +
      '<div><h2 id="h-news">' + L('Nowości i promocje', 'News and offers') + '</h2><p>' + L('Zapisz się, aby otrzymywać informacje o nowych produktach i promocjach.', 'Subscribe to hear about new products and offers.') + '</p></div>' +
      '<form data-demo-form="news" novalidate><label class="sr" for="nl-email">' + L('Adres e-mail', 'Email address') + '</label>' +
      '<div class="newsletter__row"><input id="nl-email" type="email" autocomplete="email" placeholder="' + L('Twój adres e-mail', 'Your email address') + '" required><button class="btn btn--light" type="submit">' + L('Zapisz się', 'Subscribe') + '</button></div>' +
      '<label class="consent check-row"><input type="checkbox" required> <span>' + L('Zgadzam się na otrzymywanie newslettera. Mogę zrezygnować w każdej chwili.', 'I agree to receive the newsletter. I can unsubscribe at any time.') + '</span></label>' +
      '<p class="notice notice--demo" role="status" aria-live="polite"></p></form>' +
      '</div></div></section>';
  }
  function whyItem(ic, h, p) {
    return '<div class="why__item"><div class="why__icon">' + icon(ic) + '</div><h3>' + h + '</h3><p>' + p + '</p></div>';
  }
  function qItem(ic, h, p) {
    return '<div class="q-item"><div class="why__icon">' + icon(ic) + '</div><h3>' + h + '</h3><p>' + p + '</p></div>';
  }

  function viewShop(q) {
    var cat = q.get('kategoria');
    if (cat && CATS[cat]) state.shop.cat = cat;
    state.shop.q = (q.get('q') || '').trim();
    var counts = { all: PRODUCTS.length };
    Object.keys(CATS).forEach(function (k) { counts[k] = 0; });
    PRODUCTS.forEach(function (p) { counts[p.cat] += 1; });
    var catOpts = [['all', 'Wszystkie', 'All']].concat(Object.keys(CATS).map(function (k) { return [k, CATS[k].pl, CATS[k].en]; }))
      .map(function (c) {
        return '<label class="opt-row"><input type="radio" name="f-cat" value="' + c[0] + '"' + (state.shop.cat === c[0] ? ' checked' : '') + '> <span lang="' + state.lang + '">' + esc(L(c[1], c[2])) + '</span><span class="count">' + counts[c[0]] + '</span></label>';
      }).join('');
    return '<div class="wrap page-head">' + crumbs([home(), [L('Sklep', 'Shop')]]) + '<h1>' + L('Sklep', 'Shop') + '</h1>' +
      '<p class="muted">' + fx(L('W szkicu: 8 wybranych produktów z katalogu. [W sklepie: pełny katalog Ecwid]', 'In this draft: 8 selected products from the catalogue. [In the store: the full Ecwid catalogue]')) + '</p></div>' +
      '<section class="wrap" data-section="Katalog sklepu · Store page" aria-label="' + L('Produkty', 'Products') + '"><div class="shop">' +
      '<aside class="filters" aria-label="' + L('Filtry', 'Filters') + '"><details class="filters__det"' + (window.matchMedia('(min-width: 760px)').matches ? ' open' : '') + '><summary class="filters__sum">' + L('Filtry', 'Filters') + '</summary><div class="filters__wrap">' +
      '<fieldset><legend>' + L('Kategoria', 'Category') + '</legend>' + catOpts + '</fieldset>' +
      '<fieldset><legend>' + L('Cena', 'Price') + '</legend><label class="sr" for="f-max">' + L('Cena maksymalna', 'Maximum price') + '</label>' +
      '<input class="range" id="f-max" type="range" min="0" max="' + PRICE_MAX + '" step="50" value="' + state.shop.max + '" aria-describedby="f-max-out">' +
      '<p class="range-out" id="f-max-out">' + L('do ', 'up to ') + zl(state.shop.max) + '</p></fieldset>' +
      '</div><button type="button" class="link-btn" id="f-reset">' + L('Wyczyść filtry', 'Clear filters') + '</button></details></aside>' +
      '<div><form class="shop__search" id="shopSearch" role="search"><label class="sr" for="ss-q">' + L('Szukaj produktu', 'Search products') + '</label>' +
      '<input id="ss-q" type="search" autocomplete="off" value="' + esc(state.shop.q) + '" placeholder="' + L('Nazwa lub nr katalogowy', 'Name or catalogue no.') + '"><button class="btn btn--primary" type="submit">' + L('Szukaj', 'Search') + '</button></form>' +
      '<div class="shop__bar"><p id="resCount" aria-live="polite"></p>' +
      '<label><span class="sr">' + L('Sortuj według', 'Sort by') + '</span><select class="select" id="f-sort">' +
      [['rec', 'Polecane', 'Featured'], ['asc', 'Cena: od najniższej', 'Price: low to high'], ['desc', 'Cena: od najwyższej', 'Price: high to low'], ['name', 'Nazwa: A–Z', 'Name: A–Z']].map(function (o) {
        return '<option value="' + o[0] + '"' + (state.shop.sort === o[0] ? ' selected' : '') + '>' + L(o[1], o[2]) + '</option>';
      }).join('') + '</select></label></div>' +
      '<div class="grid grid--3" id="results"></div></div></div></section>';
  }
  function renderResults() {
    var box = document.getElementById('results');
    if (!box) return;
    var list = PRODUCTS.filter(function (p) {
      return (state.shop.cat === 'all' || p.cat === state.shop.cat) && minPrice(p).price <= state.shop.max && matchQ(p, state.shop.q);
    });
    var s = state.shop.sort;
    if (s === 'asc') list.sort(function (a, b) { return minPrice(a).price - minPrice(b).price; });
    if (s === 'desc') list.sort(function (a, b) { return minPrice(b).price - minPrice(a).price; });
    if (s === 'name') list.sort(function (a, b) { return t(a).name.localeCompare(t(b).name, state.lang); });
    var empty = state.shop.cat === 'instr'
      ? fx(L('W szkicu nie ma produktów z tej kategorii – w katalogu są obecnie wyłączone. [Które produkty włączyć – do decyzji Biologix]', 'This draft has no products from this category – they are currently disabled in the catalogue. [Which products to enable – Biologix to decide]'))
      : L('Brak produktów spełniających kryteria.', 'No products match these filters.');
    box.innerHTML = list.length ? list.map(card).join('') :
      '<div class="empty" style="grid-column:1/-1"><p>' + empty + '</p><button type="button" class="btn btn--ghost" id="f-reset2">' + L('Wyczyść filtry', 'Clear filters') + '</button></div>';
    var n = list.length;
    document.getElementById('resCount').textContent = L('Znaleziono ', 'Found ') + count(n, 'produkt', 'produkty', 'produktów', 'product', 'products');
    document.getElementById('f-max-out').textContent = L('do ', 'up to ') + zl(state.shop.max);
  }

  function matchQ(p, q) {
    if (!q) return true;
    var hay = (JSON.stringify(p.sku || '') + ' ' + JSON.stringify(p.pl || {}) + ' ' + JSON.stringify(p.en || {}) + ' ' + JSON.stringify(p.options || [])).toLowerCase();
    return q.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; });
  }
  function descBlock(p) {
    var html, lang, note = '';
    if (state.lang === 'pl') {
      if (p.desc.lang === 'pl') { html = p.desc.html; lang = 'pl'; }
      else if (p.descPl) { html = p.descPl; lang = 'pl'; }
      else { html = p.desc.html; lang = 'en'; note = '[PL – w tłumaczeniu]'; }
    } else {
      html = p.desc.html; lang = p.desc.lang;
      if (lang === 'pl') note = '[EN – the store description is in Polish]';
    }
    return { note: note, html: (note ? '<p class="desc-note">' + fx(note) + '</p>' : '') + '<div class="desc" lang="' + lang + '">' + html + '</div>' };
  }
  function viewProduct(id) {
    var p = BY_ID[id];
    if (!p) return viewNotFound();
    var sel = selOf(p), tx = t(p), v = state.view[id] || 0, qty = state.qty[id] || 1;
    var opts = p.options.map(function (o) {
      var vals = o.values.map(function (val, i) {
        var checked = (sel[o.key] || 0) === i ? ' checked' : '';
        return '<label class="pill"><input type="radio" name="opt-' + o.key + '" value="' + i + '" data-opt="' + o.key + '"' + checked + '><span>' + esc(val[state.lang]) + '</span></label>';
      }).join('');
      var oname = /^(Ilość|Opakowanie|Rozmiar)$/.test(o.pl) && o.values.some(function (x) { return /szt|opak|karton|worek|pudeł/.test(x.pl); }) ? L('Wielkość opakowania', 'Pack size') : o[state.lang];
      return '<fieldset class="opt"><legend>' + esc(oname) + ': <span id="optv-' + o.key + '">' + esc(o.values[sel[o.key] || 0][state.lang]) + '</span></legend><div class="opt__vals">' + vals + '</div></fieldset>';
    }).join('');
    var related = PRODUCTS.filter(function (x) { return x.cat === p.cat && x.id !== p.id; }).slice(0, 3).map(card).join('');
    var d = descBlock(p);

    return '<div class="wrap page-head">' + crumbs([home(), [L('Sklep', 'Shop'), '#/sklep'], [t(CATS[p.cat]), '#/sklep?kategoria=' + p.cat], [tx.name]]) + '</div>' +
      '<section class="wrap" data-section="Karta produktu · Product page" aria-labelledby="h-prod"><div class="product">' +
      '<div class="gallery"><div class="gallery__main" id="gMain">' + productArt(p, sel, v, 'main') + '</div>' +
      '<div class="gallery__thumbs" id="gThumbs">' + thumbs(p, sel, v) + '</div>' +
      '<p class="gallery__note">' + L('Zdjęcia z katalogu sklepu (Ecwid).', 'Photos from the store catalogue (Ecwid).') + '</p></div>' +
      '<div class="pinfo">' + (p.badge ? '<span class="badge badge--inline' + (p.badge.kind ? ' badge--' + p.badge.kind : '') + '">' + esc(p.badge[state.lang]) + '</span>' : '') +
      '<h1 id="h-prod" lang="' + state.lang + '">' + esc(tx.name) + '</h1>' +
      '<div id="pPrice">' + priceBlock(p, sel) + '</div>' +
      (d.note ? '<p class="desc-note desc-note--top">' + fx(d.note) + '</p>' : '') +
      '<form id="buyForm" novalidate><div lang="' + state.lang + '">' + opts + '</div>' +
      '<p class="stock">' + fx(L('[Dostępność i czas wysyłki – do potwierdzenia]', '[Availability and dispatch time – to be confirmed]')) + '</p>' +
      '<p class="buy__label">' + L('Liczba opakowań', 'Number of packs') + '</p><div class="buy"><div class="qty" role="group" aria-label="' + L('Liczba opakowań', 'Number of packs') + '"><button type="button" data-q="-1" aria-label="' + L('Zmniejsz ilość', 'Decrease quantity') + '">−</button>' +
      '<input id="qtyInput" type="number" min="1" max="99" value="' + qty + '" inputmode="numeric" aria-label="' + L('Ilość', 'Quantity') + '"><button type="button" data-q="1" aria-label="' + L('Zwiększ ilość', 'Increase quantity') + '">+</button></div>' +
      '<button class="btn" type="submit">' + L('Dodaj do koszyka', 'Add to cart') + '</button></div></form>' +
      '<a class="btn btn--ghost btn--quote" href="#/kontakt?wycena=' + p.id + '" id="quoteBtn">' + L('Zapytaj o wycenę hurtową', 'Request a bulk quote') + '</a>' +
      '<p class="sku">SKU: <span id="pSku">' + esc(skuOf(p, sel)) + '</span> · ' + L('Kategoria', 'Category') + ': ' + esc(t(CATS[p.cat])) + '</p>' +
      '</div></div>' +

      '<div class="tabs" id="tabs"><div class="tabs__list" role="tablist" aria-label="' + L('Informacje o produkcie', 'Product information') + '">' +
      tabBtn('opis', L('Opis', 'Description'), true) + tabBtn('coa', L('Certyfikat analizy (COA)', 'Certificate of analysis (COA)'), false) + tabBtn('dostawa', L('Dostawa i zwroty', 'Shipping & returns'), false) + '</div>' +
      '<div class="tabs__panel" role="tabpanel" id="tp-opis" aria-labelledby="tb-opis" tabindex="0">' + d.html + '</div>' +
      '<div class="tabs__panel" role="tabpanel" id="tp-coa" aria-labelledby="tb-coa" tabindex="0" hidden>' +
      '<p>' + L('Certyfikat analizy (COA) można pobrać na stronie Biologix – wystarczy numer katalogowy i numer partii (LOT) z etykiety.', 'Download the COA on the Biologix website using the catalogue number and the lot number from the label.') + '</p>' +
      '<p class="muted small">' + L('Numer katalogowy do wyszukania certyfikatu: ', 'Catalogue number for the certificate search: ') + '<strong id="coaSku">' + esc(skuOf(p, sel)) + '</strong></p>' +
      '<p><a class="btn btn--ghost" href="https://www.biologixgroup.com/Certificate.php" target="_blank" rel="noopener">' + L('Znajdź certyfikat dla partii', 'Find the certificate for your lot') + ' ↗</a></p></div>' +
      '<div class="tabs__panel" role="tabpanel" id="tp-dostawa" aria-labelledby="tb-dostawa" tabindex="0" hidden>' +
      '<p>' + fx(L('Zamówienia wysyłamy z [magazyn] w ciągu [1–2 dni roboczych]. Koszt dostawy: [koszt / bezpłatna od … zł]; dokładny koszt widać w koszyku przed płatnością.', 'Orders are shipped from [warehouse] within [1–2 business days]. Shipping cost: [cost / free from … PLN]; the exact cost is shown at checkout before you pay.')) + '</p>' +
      '<p>' + fx(L('[Liczba] dni na zwrot produktu: prosimy najpierw o kontakt z numerem zamówienia i powodem zwrotu. Szczegóły: ', '[Number] days to return a product: please contact us first with your order number and the reason. Details: ')) + '<a href="#/dostawa-i-zwroty">' + L('Dostawa i zwroty', 'Shipping & returns') + '</a>.</p></div></div>' +
      '</section>' +

      (related ? '<section class="section section--tight" aria-labelledby="h-rel"><div class="wrap"><div class="section__head"><h2 id="h-rel">' + L('Może Cię zainteresować', 'You may also like') + '</h2></div><div class="grid grid--3">' + related + '</div></div></section>' : '');
  }
  function tabBtn(id, label, sel) {
    return '<button type="button" role="tab" class="tabs__tab" id="tb-' + id + '" aria-controls="tp-' + id + '" aria-selected="' + sel + '"' + (sel ? '' : ' tabindex="-1"') + '>' + label + '</button>';
  }
  function thumbs(p, sel, v) {
    var n = p.photos.length;
    if (n < 2) return '';
    return p.photos.map(function (_, i) {
      return '<button type="button" class="thumb" data-view="' + i + '" aria-pressed="' + (i === v) + '" aria-label="' + L('Zdjęcie ', 'Photo ') + (i + 1) + L(' z ', ' of ') + n + '">' + cdnImg(p.photos[i], '', SIZES.thumb) + '</button>';
    }).join('');
  }
  function isPack(p, sel) {
    if (p.options.length !== 1) return false;
    var ov = p.options[0].values[(sel || {})[p.options[0].key] || 0];
    return !!(ov && /szt|opak|karton|worek|pudeł/.test(ov.pl));
  }
  function priceBlock(p, sel) {
    var unit = '';
    if (p.options.length === 1) { var ov = p.options[0].values[(sel || {})[p.options[0].key] || 0]; if (ov && /szt|opak|karton|worek|pudeł/.test(ov.pl)) unit = ' <span class="price__unit">/ ' + L('opakowanie', 'pack') + ' (' + esc(ov[state.lang]) + ')</span>'; }
    return '<p class="price">' + zl(priceOf(p, sel).price) + unit + '</p>' +
      '<p class="vat">' + fx(L('[Cena brutto / netto – do potwierdzenia]. Dokładny koszt dostawy widać w koszyku przed płatnością.', '[Gross / net price – to be confirmed]. The exact shipping cost is shown at checkout before you pay.')) + '</p>';
  }

  function cartTotals() {
    var sub = state.cart.reduce(function (s, it) { return s + priceOf(BY_ID[it.id], it.sel).price * it.qty; }, 0);
    return { sub: sub };
  }
  function viewCart() {
    return '<div class="wrap page-head">' + crumbs([home(), [L('Koszyk', 'Cart')]]) + '<h1>' + L('Koszyk i zamówienie', 'Cart and checkout') + '</h1>' +
      '<p class="muted">' + L('Makieta procesu zamówienia – formularz niczego nie wysyła i nie uruchamia płatności.', 'Checkout mock-up – the form sends nothing and starts no payment.') + '</p></div>' +
      '<section class="wrap" data-section="Koszyk i checkout · Cart & checkout" aria-label="' + L('Koszyk', 'Cart') + '"><div class="cart"><div>' +
      '<div class="panel"><h2><span class="step">1</span>' + L('Twój koszyk', 'Your cart') + '</h2><div id="cartLines"></div></div>' +
      '<form class="panel" id="checkout" novalidate aria-labelledby="h-data"><h2 id="h-data"><span class="step">2</span>' + L('Dane do wysyłki', 'Shipping details') + '</h2>' +
      '<div class="fields">' +
      field('c-name', L('Imię i nazwisko', 'Full name'), 'text', 'name', false) +
      field('c-org', L('Instytucja / firma (opcjonalnie)', 'Organization (optional)'), 'text', 'organization', false) +
      field('c-email', L('Adres e-mail', 'Email address'), 'email', 'email', false) +
      field('c-phone', L('Telefon', 'Phone'), 'tel', 'tel', false) +
      field('c-street', L('Ulica i numer', 'Street address'), 'text', 'street-address', true) +
      field('c-zip', L('Kod pocztowy', 'Postal code'), 'text', 'postal-code', false, L('Format: 00-000', 'Format: 00-000')) +
      field('c-city', L('Miejscowość', 'City'), 'text', 'address-level2', false) +
      '</div><label class="check-row"><input type="checkbox" id="c-invoice"> <span>' + L('Chcę otrzymać fakturę VAT (podam NIP)', 'I need a VAT invoice (I will provide the tax ID)') + '</span></label>' +
      '<div class="fields" id="nipField" hidden>' + field('c-nip', 'NIP', 'text', 'off', false) + field('c-company', L('Nazwa firmy / instytucji', 'Company / institution name'), 'text', 'organization', false) + '</div>' +
      '<h2 style="margin-top:20px"><span class="step">3</span>' + L('Dostawa', 'Shipping') + '</h2>' +
      '<div class="choice choice--static"><span><strong>' + fx(L('[Przewoźnik]', '[Carrier]')) + '</strong><small>' + fx(L('Zwykle [X–Y dni roboczych]', 'Usually [X–Y business days]')) + '</small></span><span class="choice__price">' + fx(L('[koszt]', '[cost]')) + '</span></div>' +
      '<h2 style="margin-top:20px"><span class="step">4</span>' + L('Płatność', 'Payment') + '</h2><div role="radiogroup" aria-label="' + L('Metoda płatności', 'Payment method') + '">' +
      payChoice('online', fx(L('[Płatność online]', '[Online payment]')), fx(L('[Operator płatności – do potwierdzenia]', '[Payment provider – to be confirmed]'))) +
      payChoice('invoice', L('Przelew na fakturę', 'Bank transfer on invoice'), fx(L('[Dla uczelni i firm – do potwierdzenia]', '[For universities and companies – to be confirmed]'))) +
      '</div>' +
      '<label class="check-row"><input type="checkbox" required> <span>' + L('Akceptuję <a href="#/dostawa-i-zwroty">regulamin sklepu</a>.', 'I accept the <a href="#/dostawa-i-zwroty">store terms</a>.') + '</span></label>' +
      '<p class="pay-total" id="payTotal"></p><button class="btn btn--block" type="submit">' + L('Zamawiam i płacę', 'Place order and pay') + '</button>' +
      '<p class="notice notice--demo" role="status" aria-live="polite"></p></form>' +
      '</div><aside class="panel summary" aria-labelledby="h-sum"><h2 id="h-sum">' + L('Podsumowanie', 'Summary') + '</h2><div id="cartSum"></div></aside></div></section>';
  }
  function field(id, label, type, ac, full, hint) {
    return '<div class="field' + (full ? ' field--full' : '') + '"><label for="' + id + '">' + label + '</label><input id="' + id + '" type="' + type + '" autocomplete="' + ac + '"' + (hint ? ' aria-describedby="' + id + '-h"' : '') + '>' + (hint ? '<span class="hint" id="' + id + '-h">' + hint + '</span>' : '') + '</div>';
  }
  function payChoice(id, name, note) {
    return '<label class="choice"><input type="radio" name="pay" value="' + id + '"' + (state.pay === id ? ' checked' : '') + '><span><strong>' + name + '</strong><small>' + note + '</small></span></label>';
  }
  function renderCart() {
    var lines = document.getElementById('cartLines');
    if (!lines) return;
    var active = document.activeElement && document.activeElement.getAttribute('data-fid');
    if (!state.cart.length) {
      lines.innerHTML = '<div class="empty"><p>' + L('Twój koszyk jest pusty.', 'Your cart is empty.') + '</p><a class="btn" href="#/sklep">' + L('Przejdź do sklepu', 'Go to the shop') + '</a></div>';
    } else {
      lines.innerHTML = state.cart.map(function (it, i) {
        var p = BY_ID[it.id], pr = priceOf(p, it.sel);
        var vt = variantText(p, it.sel);
        return '<div class="line"><div class="line__img">' + productArt(p, it.sel, 0, 'line') + '</div><div>' +
          '<p class="line__name" lang="' + state.lang + '"><a href="#/produkt/' + p.id + '">' + esc(t(p).name) + '</a></p>' +
          '<p class="line__var" lang="' + state.lang + '">' + (vt ? esc(vt) + ' · ' : '') + 'SKU ' + esc(skuOf(p, it.sel)) + ' · ' + zl(pr.price) + (isPack(p, it.sel) ? L(' za opakowanie', ' per pack') : L('/szt.', '/pc')) + '</p>' +
          '<div class="line__ctrl"><div class="qty qty--sm" role="group" aria-label="' + L('Ilość: ', 'Quantity: ') + esc(t(p).name) + '">' +
          '<button type="button" data-cq="-1" data-i="' + i + '" data-fid="m' + i + '" aria-label="' + L('Zmniejsz ilość', 'Decrease quantity') + '">−</button>' +
          '<input type="number" value="' + it.qty + '" readonly aria-label="' + L('Ilość', 'Quantity') + '" tabindex="-1">' +
          '<button type="button" data-cq="1" data-i="' + i + '" data-fid="p' + i + '" aria-label="' + L('Zwiększ ilość', 'Increase quantity') + '">+</button></div>' +
          '<button type="button" class="link-btn" data-rm="' + i + '">' + L('Usuń', 'Remove') + '</button></div></div>' +
          '<p class="line__sum">' + zl(pr.price * it.qty) + '</p></div>';
      }).join('');
    }
    var tt = cartTotals();
    var items = state.cart.reduce(function (s, it) { return s + it.qty; }, 0);
    var pt = document.getElementById('payTotal'); if (pt) pt.innerHTML = '<span>' + L('Do zapłaty', 'Total') + '</span><span>' + zl(tt.sub) + '</span>';
    var allPack = state.cart.length && state.cart.every(function (it) { return isPack(BY_ID[it.id], it.sel); });
    document.getElementById('cartSum').innerHTML =
      '<div class="sum-row"><span>' + L('Wartość produktów', 'Products') + ' (' + items + (allPack ? L(' opak.', ' packs') : L(' szt.', ' pcs')) + ')</span><span>' + zl(tt.sub) + '</span></div>' +
      '<div class="sum-row"><span>' + L('Dostawa', 'Shipping') + '</span><span>' + fx(L('[koszt]', '[cost]')) + '</span></div>' +
      '<div class="sum-row sum-row--total"><span>' + L('Do zapłaty', 'Total') + '</span><span>' + zl(tt.sub) + '</span></div>' +
      '<p class="sum-note">' + fx(L('Bez kosztu dostawy. [Ceny brutto / netto, stawka VAT – do potwierdzenia]', 'Excluding shipping. [Gross / net prices, VAT rate – to be confirmed]')) + '</p>';
    if (active) {
      var el = document.querySelector('[data-fid="' + active + '"]');
      if (el) el.focus();
    }
    updateCount();
  }
  function updateCount() {
    var n = state.cart.reduce(function (s, it) { return s + it.qty; }, 0);
    document.getElementById('cartCount').textContent = n; document.getElementById('cartCount').hidden = !n;
  }

  function viewAbout() {
    var mosaic = ['fiolki-do-hodowli-muszek-owocowych', 'pudelka-kriogeniczne-pp-2-cale', 'sitka-komorkowe-50-ml', 'szkielka-mikroskopowe-1x3'].map(function (id) {
      return '<span>' + cdnImg(BY_ID[id].photos[0], '', 400) + '</span>';
    }).join('');
    return '<div class="wrap page-head">' + crumbs([home(), [L('O nas', 'About')]]) + '</div>' +
      '<section class="wrap" data-section="O nas · Text and image" aria-labelledby="h-about"><div class="about"><div>' +
      '<p class="eyebrow">' + L('O nas', 'About') + '</p><h1 id="h-about">' + L('O Biologix', 'About Biologix') + '</h1>' +
      '<p>' + L('Biologix jest dostawcą materiałów laboratoryjnych, produktów do przechowywania kriogenicznego i odczynników, działającym pod markami BIOLOGIX®, CryoKING® i DrosoKING®. Nasza misja jest prosta: służyć zdrowiu ludzi, dając naukowcom niezawodne narzędzia do codziennej pracy.',
        'Biologix is a supplier of laboratory consumables, cryogenic storage products and reagents, working under the brands BIOLOGIX®, CryoKING® and DrosoKING®. Our mission is simple: to serve human health by giving researchers reliable tools for their daily work.') + '</p>' +
      '<p>' + fx(L('[Do potwierdzenia:] Produkcja odbywa się w pomieszczeniach czystych klasy 100 000, zgodnie z zasadami GMP i z systemami zarządzania jakością certyfikowanymi na zgodność z ISO 9001 i ISO 13485. Certyfikaty analizy są dostępne dla każdej partii.',
        '[To confirm:] Production takes place in class 100,000 clean rooms, following GMP and quality management systems certified to ISO 9001 and ISO 13485. Certificates of analysis are available for each lot.')) + '</p>' +
      '<p>' + fx(L('Biologix obsługuje tysiące laboratoriów w USA, Europie i Azji i współpracuje z setkami dystrybutorów na całym świecie. [Sklep prowadzi … i obsługuje klientów w Polsce.]',
        'Biologix serves thousands of laboratories in the US, Europe and Asia, working with hundreds of distributors worldwide. [This store is run by … and serves customers in Poland.]')) + '</p></div>' +
      '<div class="about__img about__mosaic">' + mosaic + '</div></div></section>' +
      '<section class="section" aria-labelledby="h-val"><div class="wrap"><h2 id="h-val">' + L('Nasze marki', 'Our brands') + '</h2><div class="grid grid--3 brand-tiles">' +
      brandTile('lab', 'BIOLOGIX®', L('Artykuły laboratoryjne i produkty do hodowli komórkowej.', 'General laboratory products and cell culture products.')) +
      brandTile('cryo', 'CryoKING®', L('Przechowywanie kriogeniczne i biobankowanie.', 'Cryogenic storage and biobanking.')) +
      brandTile('droso', 'DrosoKING®', L('Produkty do hodowli Drosophila.', 'Products for Drosophila culture.')) +
      '</div></div></section>';
  }

  function brandTile(k, name, desc) {
    var c = CATS[k];
    var media = c.scene ? '<span class="tile__img tile__img--scene"><img src="' + c.img + '" alt="" loading="lazy" decoding="async"></span>'
      : '<span class="tile__img tile__img--compose" style="--bd:url(' + c.backdrop + ')">' + cdnImg(c.img, '', 800) + '</span>';
    return '<a class="tile" href="#/sklep?kategoria=' + k + '">' + media + '<span class="tile__label"><span class="tile__name">' + name + '</span><span class="tile__desc" lang="' + state.lang + '">' + esc(desc) + '</span></span></a>';
  }
  function li(items) { return '<ul>' + items.map(function (x) { return '<li>' + fx(x) + '</li>'; }).join('') + '</ul>'; }
  function viewShipping() {
    var title = L('Dostawa i zwroty', 'Shipping & returns');
    return '<div class="wrap page-head">' + crumbs([home(), [title]]) + '<h1>' + title + '</h1></div>' +
      '<section class="wrap" data-section="Strona informacyjna · Policy page" aria-label="' + title + '"><div class="prose">' +
      '<p class="legal-note">' + fx(L('<strong>Szkic</strong> – warunki w [nawiasach] uzupełni Biologix Europe. Ostateczny regulamin zatwierdza sklep.', '<strong>Draft</strong> – terms in [brackets] will be provided by Biologix Europe. The store approves the final terms.')) + '</p>' +
      '<h2>' + L('Dostawa', 'Shipping') + '</h2>' +
      (state.lang === 'en' ? li([
        'Orders are shipped from [warehouse] within [1–2 business days].',
        'Delivery to Poland: [carrier], usually [X–Y business days].',
        'Shipping cost: [cost / free from … PLN]; the exact cost is shown at checkout before you pay.',
        '[Suggestion – please confirm: you’ll receive a tracking number by email as soon as your order ships.]',
        'Reagents: [any special conditions, e.g. temperature-controlled shipping].'
      ]) : li([
        'Zamówienia wysyłamy z [magazyn] w ciągu [1–2 dni roboczych].',
        'Dostawa do Polski: [przewoźnik], zwykle [X–Y dni roboczych].',
        'Koszt dostawy: [koszt / bezpłatna od … zł]; dokładny koszt widać w koszyku przed płatnością.',
        '[Propozycja – do potwierdzenia: numer do śledzenia przesyłki wyślemy e-mailem, gdy tylko zamówienie zostanie nadane.]',
        'Odczynniki: [ewentualne warunki, np. transport w kontrolowanej temperaturze].'
      ])) +
      '<h2>' + L('Zwroty', 'Returns') + '</h2>' +
      (state.lang === 'en' ? li([
        '[Number] days to return a product: please contact us first with your order number and the reason.',
        '[Suggestion – please confirm: products must be unopened and in their original packaging; sterile products can only be returned unopened.]',
        '[Restocking fee, if any.] Special and custom orders are reviewed individually.',
        '[Suggestion – please confirm: refunds are made to the original payment method within X days after we receive the return.]',
        '[Suggestion – please confirm: damaged or wrong item? Contact us within X days of delivery and we’ll replace it at our cost.]'
      ]) : li([
        '[Liczba] dni na zwrot produktu: prosimy najpierw o kontakt z numerem zamówienia i powodem zwrotu.',
        '[Propozycja – do potwierdzenia: produkty muszą być nieotwarte i w oryginalnym opakowaniu; produkty sterylne przyjmujemy wyłącznie nieotwarte.]',
        '[Ewentualna opłata manipulacyjna.] Zamówienia specjalne i realizowane na indywidualne zlecenie rozpatrujemy osobno.',
        '[Propozycja – do potwierdzenia: zwrot pieniędzy następuje na pierwotną metodę płatności w ciągu X dni od otrzymania zwrotu.]',
        '[Propozycja – do potwierdzenia: produkt uszkodzony lub niezgodny z zamówieniem? Prosimy o kontakt w ciągu X dni od dostawy – wymienimy go na nasz koszt.]'
      ])) +
      '</div></section>';
  }

  var FAQ = [
    ['Czy uczelnia lub firma może zamówić na fakturę?', '[Tak – faktura VAT / zamówienie: jak.]',
      'Can my university or company order with an invoice?', '[Yes – VAT invoice / purchase order: how.]'],
    ['Gdzie znajdę certyfikat analizy?', 'Certyfikat analizy (COA) można pobrać na stronie Biologix – wystarczy numer katalogowy i numer partii (LOT) z etykiety.',
      'Where can I find a certificate of analysis?', 'Download the COA on the Biologix website using the catalogue number and the lot number from the label.'],
    ['Czy produkty są sterylne i wolne od DNaz i RNaz?', 'Właściwości (sterylne, wolne od DNaz i RNaz, niepirogenne) są podane na stronie produktu.',
      'Are your products sterile and DNase/RNase-free?', 'These properties (sterile, DNase/RNase-free, pyrogen-free) are listed on the product page.'],
    ['Jak szybko dotrze zamówienie?', '[Czas wysyłki + czas dostawy do Polski.]',
      'How fast will my order arrive?', '[Dispatch time + delivery time to Poland.]'],
    ['Ile kosztuje dostawa?', '[Koszt / próg darmowej dostawy.] Dokładny koszt widać w koszyku.',
      'How much is shipping?', '[Cost / free shipping threshold.] The exact cost is shown at checkout.'],
    ['Czy mogę zwrócić produkt?', 'Tak, w ciągu [X] dni – szczegóły w zakładce <a href="#/dostawa-i-zwroty">„Dostawa i zwroty”</a>.',
      'Can I return a product?', 'Yes, within [X] days – see <a href="#/dostawa-i-zwroty">Shipping &amp; Returns</a>.'],
    ['Czy oferujecie ceny hurtowe lub OEM?', 'Tak – prosimy o listę produktów i ilości, przygotujemy wycenę.',
      'Do you offer bulk pricing or OEM?', 'Yes – send us the products and quantities, and we’ll prepare a quote.'],
    ['Jak przechowywać odczynniki?', '[Warunki przechowywania – gdzie podane: strona produktu / etykieta – do potwierdzenia]',
      'How should reagents be stored?', '[Storage conditions – where they are given: product page / label – to confirm]']
  ];
  function viewFaq() {
    var title = L('Najczęstsze pytania', 'Frequently asked questions');
    return '<div class="wrap page-head">' + crumbs([home(), ['FAQ']]) + '<h1>' + title + '</h1></div>' +
      '<section class="wrap" data-section="Najczęstsze pytania · FAQ" aria-label="' + title + '"><div class="prose faq">' +
      FAQ.map(function (f, i) {
        return '<details' + (i === 0 ? ' open' : '') + '><summary>' + esc(L(f[0], f[2])) + '</summary><p>' + fx(L(f[1], f[3])) + '</p></details>';
      }).join('') +
      '<p class="muted">' + L('Nie ma tu Twojego pytania? ', 'Can’t find your question? ') + '<a href="#/kontakt">' + L('Napisz do nas', 'Contact us') + '</a>.</p>' +
      '</div></section>';
  }

  function quoteText(id) {
    var p = BY_ID[id]; if (!p) return '';
    var sel = selOf(p), parts = [t(p).name, L('Nr kat.: ', 'Cat. no.: ') + skuOf(p, sel)];
    p.options.forEach(function (o) { var nm = /^(Ilość|Opakowanie|Rozmiar)$/.test(o.pl) && o.values.some(function (x) { return /szt|opak|karton|worek|pudeł/.test(x.pl); }) ? L('Wielkość opakowania', 'Pack size') : o[state.lang]; parts.push(nm + ': ' + o.values[sel[o.key] || 0][state.lang]); });
    return L('Proszę o wycenę hurtową:\n', 'Please send a bulk quote for:\n') + parts.join('\n') + L('\nLiczba opakowań: ', '\nNumber of packs: ') + (state.qty[id] || 1) + L('\nAdres dostawy / instytucja: ', '\nDelivery address / institution: ');
  }
  function viewContact(q) {
    var qid = q && q.get ? q.get('wycena') : null, qtext = qid ? quoteText(qid) : '';
    return '<div class="wrap page-head">' + crumbs([home(), [L('Kontakt', 'Contact')]]) + '<h1>' + L('Kontakt', 'Contact us') + '</h1></div>' +
      '<section class="wrap" data-section="Kontakt · Contact info" aria-label="' + L('Kontakt', 'Contact') + '"><div class="contact">' +
      '<div><p>' + L('Chętnie pomożemy w sprawie produktów, wycen większych ilości, certyfikatów analizy i zamówień dla instytucji.', 'We’re happy to help with product questions, quotes for larger quantities, certificates of analysis and orders for institutions.') + '</p><dl>' +
      '<dt>' + L('E-mail', 'Email') + '</dt><dd>' + fx(L('[e-mail]', '[email]')) + '</dd>' +
      '<dt>' + L('Telefon', 'Phone') + '</dt><dd>' + fx(L('[telefon], [godziny]', '[phone], [hours]')) + '</dd>' +
      '<dt>' + L('Adres', 'Address') + '</dt><dd>' + fx(L('[firma i adres]', '[company and address]')) + '</dd></dl></div>' +
      '<form class="panel" data-demo-form="contact" novalidate aria-labelledby="h-form"><h2 id="h-form">' + (qtext ? L('Zapytanie o wycenę hurtową', 'Bulk quote request') : L('Napisz do nas', 'Send us a message')) + '</h2><div class="fields">' +
      field('k-name', L('Imię i nazwisko', 'Name'), 'text', 'name', false) + field('k-email', L('E-mail', 'Email'), 'email', 'email', false) +
      field('k-org', L('Instytucja (opcjonalnie)', 'Organization (optional)'), 'text', 'organization', true) +
      '<div class="field field--full"><label for="k-msg">' + L('Wiadomość', 'Message') + '</label><textarea id="k-msg" rows="7">' + esc(qtext) + '</textarea></div></div>' +
      '<label class="check-row"><input type="checkbox"> <span>' + L('Wyrażam zgodę na przetwarzanie moich danych w celu udzielenia odpowiedzi.', 'I agree to the processing of my data to answer my message.') + '</span></label>' +
      '<button class="btn" type="submit">' + L('Wyślij', 'Send') + '</button>' +
      '<p class="notice notice--demo" role="status" aria-live="polite"></p></form></div></section>';
  }
  function viewNotFound() {
    return '<div class="wrap page-head"><h1>' + L('Nie znaleziono strony', 'Page not found') + '</h1><p><a href="#/">' + L('Wróć na stronę główną', 'Back to the home page') + '</a></p></div>';
  }

  /* ---------- Router ---------- */
  var main = document.getElementById('main');
  function titles() {
    return { '': L('Strona główna', 'Home'), sklep: L('Sklep', 'Shop'), koszyk: L('Koszyk', 'Cart'), 'o-nas': L('O nas', 'About'), 'dostawa-i-zwroty': L('Dostawa i zwroty', 'Shipping & returns'), faq: 'FAQ', kontakt: L('Kontakt', 'Contact') };
  }
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
    else if (a === 'produkt') { html = viewProduct(r.parts[1]); title = BY_ID[r.parts[1]] ? t(BY_ID[r.parts[1]]).name : L('Produkt', 'Product'); }
    else if (a === 'koszyk') html = viewCart();
    else if (a === 'o-nas') html = viewAbout();
    else if (a === 'dostawa-i-zwroty') html = viewShipping();
    else if (a === 'faq') html = viewFaq();
    else if (a === 'kontakt') html = viewContact(r.q);
    else html = viewNotFound();
    main.innerHTML = html;
    document.title = (title || titles()[a] || L('Strona', 'Page')) + ' – BIOLOGIX EUROPE (' + L('szkic', 'draft') + ')';
    document.querySelectorAll('[data-nav]').forEach(function (n) {
      if (n.getAttribute('data-nav') === a) n.setAttribute('aria-current', 'page'); else n.removeAttribute('aria-current');
    });
    slideIdx = 0;
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
  function refreshGallery(p) {
    var v = state.view[p.id] || 0;
    document.getElementById('gMain').innerHTML = productArt(p, selOf(p), v, 'main');
    document.querySelectorAll('#gThumbs .thumb').forEach(function (tb) { tb.setAttribute('aria-pressed', String(+tb.getAttribute('data-view') === v)); });
  }

  main.addEventListener('change', function (e) {
    var el = e.target;
    if (el.id === 'c-invoice') { var nf = document.getElementById('nipField'); if (nf) nf.hidden = !el.checked; return; }
    if (el.hasAttribute('data-opt')) {
      var p = currentProduct(); if (!p) return;
      var sel = selOf(p), key = el.getAttribute('data-opt');
      sel[key] = +el.value;
      var o = p.options.filter(function (x) { return x.key === key; })[0];
      document.getElementById('optv-' + key).textContent = o.values[sel[key]][state.lang];
      document.getElementById('pPrice').innerHTML = priceBlock(p, sel);
      document.getElementById('pSku').textContent = skuOf(p, sel);
      var cs = document.getElementById('coaSku'); if (cs) cs.textContent = skuOf(p, sel);
      if (o.values[sel[key]].img) { state.view[p.id] = 0; refreshGallery(p); }
    } else if (el.name === 'f-cat') {
      state.shop.cat = el.value;
      history.replaceState(null, '', el.value === 'all' ? '#/sklep' : '#/sklep?kategoria=' + el.value);
      lastRoute = location.hash;
      renderResults();
    } else if (el.id === 'f-sort') {
      state.shop.sort = el.value; renderResults();
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
    if (b.hasAttribute('data-slide')) {
      var ds = b.getAttribute('data-slide');
      setSlide(ds === 'prev' ? slideIdx - 1 : ds === 'next' ? slideIdx + 1 : +ds);
      return;
    }
    var p = currentProduct();
    if (b.hasAttribute('data-view') && p) {
      state.view[p.id] = +b.getAttribute('data-view');
      refreshGallery(p);
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
      toast(L('Usunięto z koszyka: ', 'Removed from cart: ') + esc(t(BY_ID[removed.id]).name));
    } else if (b.id === 'f-reset' || b.id === 'f-reset2') {
      state.shop = { cat: 'all', max: PRICE_MAX, sort: 'rec' };
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
    if (f.id === 'heroSearch' || f.id === 'shopSearch') {
      var v = (f.querySelector('input').value || '').trim();
      location.hash = '#/sklep' + (v ? '?q=' + encodeURIComponent(v) : '');
      if (f.id === 'shopSearch') { state.shop.q = v; render(true); }
      return;
    }
    if (f.id === 'buyForm') {
      var p = currentProduct(); if (!p) return;
      var sel = JSON.parse(JSON.stringify(selOf(p)));
      var qty = state.qty[p.id] || 1;
      var key = JSON.stringify(sel);
      var ex = state.cart.filter(function (it) { return it.id === p.id && JSON.stringify(it.sel) === key; })[0];
      if (ex) ex.qty = Math.min(99, ex.qty + qty); else state.cart.push({ id: p.id, sel: sel, qty: qty });
      updateCount();
      toast(L('Dodano do koszyka: ', 'Added to cart: ') + esc(t(p).name) + ' (' + qty + L(' szt.', ' pcs') + ') <a href="#/koszyk">' + L('Przejdź do koszyka', 'Go to cart') + '</a>');
      return;
    }
    var note = f.querySelector('.notice');
    if (!note) return;
    if (f.id === 'checkout') note.textContent = L('To jest makieta: zamówienie nie zostało złożone, a płatność nie została uruchomiona.', 'This is a mock-up: no order was placed and no payment was started.');
    else if (f.getAttribute('data-demo-form') === 'news') note.textContent = L('Szkic: adres nie został nigdzie zapisany ani wysłany.', 'Draft: the address was not saved or sent anywhere.');
    else note.textContent = L('Szkic: wiadomość nie została wysłana. W sklepie trafi na skrzynkę obsługi klienta.', 'Draft: the message was not sent. In the store it will go to the customer service inbox.');
  });

  /* Język strony (PL – język sklepu, EN – podgląd dla klienta) */
  var staticEls = Array.prototype.slice.call(document.querySelectorAll('[data-en]'));
  staticEls.forEach(function (el) { el.setAttribute('data-pl', el.innerHTML); });
  function applyStatic() {
    staticEls.forEach(function (el) { el.innerHTML = el.getAttribute(state.lang === 'en' ? 'data-en' : 'data-pl'); });
    document.documentElement.lang = state.lang;
    document.getElementById('nav').setAttribute('aria-label', L('Menu główne', 'Main menu'));
    document.querySelector('.logo').setAttribute('aria-label', 'BIOLOGIX EUROPE Sp. z o.o. – ' + L('strona główna', 'home page'));
    setSections(document.body.classList.contains('show-sections'));
  }
  function setLang(l) {
    state.lang = l;
    document.querySelectorAll('.lang__btn').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === l)); });
    applyStatic();
    render(true);
    toast(l === 'en' ? 'Page language: English' : 'Język strony: polski');
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
    secBtn.textContent = on ? L('Ukryj sekcje Instant Site', 'Hide Instant Site sections') : L('Pokaż sekcje Instant Site', 'Show Instant Site sections');
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

  document.addEventListener('error', function (e) {
    if (e.target && e.target.tagName === 'IMG') e.target.classList.add('is-broken');
  }, true);

  if (params.get('panel') === 'open') setScope(true);
  if (params.get('sections') === '1') document.body.classList.add('show-sections');
  applyStatic();
  render(true);
})();
