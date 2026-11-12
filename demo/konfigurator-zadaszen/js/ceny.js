/*
 * Tarvio — PRZYKŁADOWY cennik konfiguratora (demo koncepcyjne).
 *
 * Wszystkie kwoty są NETTO w PLN i mają charakter poglądowy.
 * W wersji produkcyjnej te wartości podaje firma — wystarczy je zmienić tutaj
 * (lub wygenerować ten plik z panelu WordPress), a konfigurator przeliczy się sam.
 */
window.TARVIO_CENY = {
  wersja: 'Cennik przykładowy · listopad 2026',
  vat: 0.23,

  /* Zakresy wymiarów [m] */
  wymiary: {
    szerokosc: { min: 3.0, max: 7.0, krok: 0.1, domyslna: 5.0 },
    wysieg:    { min: 2.0, max: 5.0, krok: 0.1, domyslna: 3.5 },
    wysokosc:  { min: 2.2, max: 3.0, krok: 0.1, domyslna: 2.5 }
  },

  /* Reguły konstrukcyjne (uproszczone) */
  konstrukcja: {
    maxRozstawSlupow: 3.5,   // m — przy większej szerokości dochodzi słup pośredni
    slupyWCenie: 2,          // cena za m² obejmuje 2 słupy narożne
    spadekStopnie: 8         // spadek dachu dla poliwęglanu i szkła
  },

  /* Pokrycie dachu — cena za m² rzutu (konstrukcja + pokrycie + rynna) */
  pokrycia: {
    poliweglan: {
      nazwa: 'Poliwęglan komorowy 16 mm',
      krotko: 'Poliwęglan',
      opis: 'Lekki, rozprasza światło, chroni przed UV.',
      cenaM2: 690,
      maxRozstawKrokwi: 1.0
    },
    szklo: {
      nazwa: 'Szkło laminowane VSG 8,76 mm',
      krotko: 'Szkło',
      opis: 'Pełna przejrzystość i klasyczny wygląd.',
      cenaM2: 1090,
      maxRozstawKrokwi: 0.9
    },
    lamele: {
      nazwa: 'Lamele obrotowe (pergola bioklimatyczna)',
      krotko: 'Lamele',
      opis: 'Płaski dach, regulacja światła i wentylacji.',
      cenaM2: 1890,
      napedLamel: 2400       // silnik + pilot, kwota stała
    }
  },

  dodatkowySlup: 690,                                   // za każdy słup ponad 2
  doplataWysokosc: { powyzej: 2.5, za10cmNaSlup: 120 }, // za każde rozpoczęte 10 cm

  /* Kolory konstrukcji. Kolory standardowe bez dopłaty. */
  doplataRalProcent: 8,   // % wartości konstrukcji dla kolorów niestandardowych
  ral: [
    { kod: '7016', nazwa: 'Szary antracytowy', hex: '#383E42', standard: true },
    { kod: '9016', nazwa: 'Biały drogowy',      hex: '#F1F0EA', standard: true },
    { kod: '9005', nazwa: 'Czarny głęboki',     hex: '#121314', standard: true },
    { kod: '9007', nazwa: 'Szare aluminium',    hex: '#8C8A85', metalik: true },
    { kod: '9006', nazwa: 'Białe aluminium',    hex: '#A5A6A4', metalik: true },
    { kod: '7035', nazwa: 'Jasnoszary',         hex: '#CBD0CC' },
    { kod: '7039', nazwa: 'Szary kwarcowy',     hex: '#6C6960' },
    { kod: '8019', nazwa: 'Szarobrązowy',       hex: '#403A3A' }
  ],

  /* Dodatki */
  rolety: { nazwa: 'Rolety ZIP z napędem elektrycznym', cenaMb: 1290 }, // za mb szerokości boku
  led:    { nazwa: 'Oświetlenie LED ze ściemniaczem', cenaMb: 95, zasilacz: 390 },
  montaz: { nazwa: 'Montaż i transport', cenaM2: 110, minimum: 1800 }
};
