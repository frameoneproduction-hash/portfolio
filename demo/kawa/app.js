/* Bruvelo — koncepcja sklepu jednego produktu (PL/DE, PLN/EUR). Makieta: bez cookies, bez analityki. */
(function () {
  'use strict';

  /* ---------- Teksty PL / DE ---------- */
  var T = {
    pl: {
      skip: 'Przejdź do treści',
      banner: 'Koncepcja sklepu dla nowej marki kawy funkcjonalnej — nazwa, zdjęcia i ceny przykładowe.',
      langLabel: 'Język', curLabel: 'Waluta',
      nav: { home: 'Kawa', ship: 'Dostawa i zwroty', terms: 'Regulamin subskrypcji', contact: 'Kontakt' },
      cartAria: 'Koszyk, liczba opakowań:',
      menu: 'Menu',
      productName: 'Kawa funkcjonalna z soplówką jeżowatą, mielona, 180 g',
      eyebrow: 'Bruvelo · kawa funkcjonalna',
      h1: 'Kawa na dobry początek dnia',
      lead: 'Arabica z ekstraktem z soplówki jeżowatej (lion’s mane). Jedno opakowanie 180 g — kupisz raz albo w subskrypcji z rabatem 10%.',
      once: 'Jednorazowo', sub: 'Subskrypcja', subBadge: '−10%',
      interval: 'Dostawa co', weeks2: '2 tygodnie', weeks4: '4 tygodnie',
      subPerks: ['10% taniej przy każdej dostawie', 'Darmowa dostawa', 'Anulujesz w każdej chwili, bez opłat'],
      qty: 'Liczba opakowań', perKg: 'za 1 kg',
      vat: 'Cena brutto z VAT. Koszt dostawy liczony w koszyku.',
      save: 'Oszczędzasz {x} na każdej dostawie',
      add: 'Dodaj do koszyka', addSub: 'Zamów subskrypcję',
      shipNote: 'Wysyłka w 1–2 dni robocze',
      gallery: ['Opakowanie kawy 180 g', 'Ziarno w otwartej torebce', 'Filiżanka kawy na drewnianym stole', 'Parzenie kawy metodą przelewową'],
      thumb: 'Zdjęcie {n}',
      benefitsEyebrow: 'Dlaczego Bruvelo', benefitsH: 'Prosta kawa, dobrze zrobiona',
      benefits: [
        ['Łagodna, pełna w smaku', 'Arabica z Brazylii i Kolumbii, palona średnio: nuty czekolady i orzechów, bez goryczy.'],
        ['Z soplówką jeżowatą', 'Ekstrakt z grzyba lion’s mane dodaje kawie delikatnej, ziemistej głębi.'],
        ['Świeżo palona', 'Palimy w małych partiach i pakujemy w torebki z zaworem aromatycznym.'],
        ['Prosty poranny rytuał', 'Parzysz jak zwykłą kawę mieloną — w dripie, french pressie lub kawiarce.']
      ],
      ingEyebrow: 'Skład', ingH: 'Co jest w opakowaniu',
      ing: 'Kawa arabica palona, mielona (95%), ekstrakt z owocników soplówki jeżowatej (<i>Hericium erinaceus</i>) (5%).',
      ingFacts: [['Pochodzenie ziarna', 'Brazylia, Kolumbia'], ['Stopień palenia', 'średni'], ['Mielenie', 'średnie, uniwersalne'], ['Masa netto', '180 g'], ['Wystarcza na', 'ok. 12–15 filiżanek']],
      ingNote: 'Skład, proporcje i dane z etykiety uzupełni marka.',
      brewEyebrow: 'Parzenie', brewH: 'Jak parzyć',
      brew: [
        ['Drip / przelew', '15 g kawy, 250 ml wody o temperaturze 92–94 °C, czas parzenia 2,5–3 minuty.'],
        ['French press', '30 g kawy, 500 ml wody, 4 minuty. Potem powoli dociśnij tłok.'],
        ['Kawiarka', 'Napełnij sitko bez ubijania, wodę wlej do wysokości zaworu. Zdejmij z ognia, gdy kawa zacznie bulgotać.']
      ],
      ritualH: 'Twój poranny rytuał — co 2 lub 4 tygodnie pod Twoimi drzwiami',
      ritualP: 'Ustaw subskrypcję raz i zapomnij o kończącej się kawie. Termin dostawy zmienisz jednym kliknięciem.',
      ritualCta: 'Wybierz subskrypcję',
      revEyebrow: 'Opinie', revH: 'Co mówią klienci', revNote: 'Przykładowe opinie — w sklepie pojawią się opinie klientów',
      reviews: [
        ['Smak łagodny, bez goryczy. Subskrypcja co 4 tygodnie idealnie mi pasuje.', 'Przykładowa opinia · Anna, Wrocław'],
        ['Piję z french pressu, aromat bardzo przyjemny.', 'Przykładowa opinia · Tomasz, Gdynia'],
        ['Paczka przyszła szybko, torebka z zaworem — kawa długo pachnie.', 'Przykładowa opinia · Kasia, Lublin']
      ],
      faqEyebrow: 'FAQ', faqH: 'Najczęstsze pytania',
      faq: [
        ['Jak działa subskrypcja?', 'Wybierasz liczbę opakowań i częstotliwość dostaw: co 2 albo co 4 tygodnie. Płacisz o 10% mniej, a dostawa w subskrypcji jest bezpłatna. Przed każdą wysyłką dostaniesz e-mail z przypomnieniem.'],
        ['Czy mogę anulować lub wstrzymać subskrypcję?', 'Tak, w każdej chwili i bez opłat — w panelu klienta albo pisząc do nas. Możesz też przesunąć termin najbliższej dostawy.'],
        ['Na ile filiżanek wystarcza opakowanie?', '180 g to około 12–15 filiżanek, zależnie od metody parzenia.'],
        ['Jak smakuje kawa z soplówką?', 'Jak łagodna kawa z nutą czekolady. Grzyb dodaje delikatnej, ziemistej głębi i nie dominuje smaku.'],
        ['Czy wysyłacie do Niemiec?', 'Tak. Sklep działa po polsku i po niemiecku, a ceny podajemy w złotych i euro. Do Niemiec wysyłamy przez DHL.']
      ],
      footerTag: 'Kawa funkcjonalna z soplówką jeżowatą. Jeden produkt, zrobiony porządnie.',
      footerShop: 'Sklep', footerInfo: 'Informacje', footerPay: 'Płatności i dostawa',
      footerNote: 'Nazwa marki, zdjęcia, skład i ceny są przykładowe. Zdjęcia: <a href="https://unsplash.com" rel="noopener noreferrer">Unsplash</a>. Strona bez plików cookie i bez analityki.',
      scopeBtn: 'Co dostaje marka', scopeClose: 'Zwiń',
      scope: [
        ['Sklep na WooCommerce (lub Shopify) z subskrypcjami', 'zakup jednorazowy i dostawy co 2 lub 4 tygodnie'],
        ['Dwa języki i dwie waluty', 'polski i niemiecki, PLN i EUR'],
        ['Teksty sklepu PL + DE', 'opis produktu, FAQ, strony informacyjne'],
        ['Płatności', 'BLIK, Przelewy24, karta, PayPal, Klarna; w subskrypcji płatność cykliczna kartą (w euro także PayPal)'],
        ['Łatwa obsługa bez programisty', 'krótkie szkolenie i instrukcja']
      ],
      cartH: 'Koszyk i zamówienie', crumbsHome: 'Strona główna',
      emptyCart: 'Twój koszyk jest pusty.', backShop: 'Wróć do sklepu',
      yourOrder: 'Twoje zamówienie', remove: 'Usuń',
      lineOnce: 'Zakup jednorazowy', lineSub: 'Subskrypcja: {q} × 180 g co {w} tyg.',
      subBox: 'Subskrypcja: {q} × 180 g co {w} tygodnie · {p} za dostawę · dostawa gratis · anulujesz w każdej chwili. Pierwsza dostawa po złożeniu zamówienia, kolejna za {w} tygodnie.',
      dataH: 'Dane do wysyłki',
      f: { name: 'Imię i nazwisko', email: 'Adres e-mail', phone: 'Telefon', street: 'Ulica i numer', zip: 'Kod pocztowy', city: 'Miejscowość', country: 'Kraj', zipHint: 'Format: 00-000' },
      countryPL: 'Polska', countryDE: 'Niemcy',
      shipH: 'Dostawa', payH: 'Płatność',
      ship: { inpost: ['Paczkomat InPost', '1–2 dni robocze'], dpd: ['Kurier DPD', '1–2 dni robocze'], dhl: ['DHL Paket (Niemcy)', '2–4 dni robocze'] },
      pay: { blik: ['BLIK', 'Kod z aplikacji bankowej'], p24: ['Przelewy24', 'Szybki przelew z Twojego banku'], card: ['Karta płatnicza', 'Visa, Mastercard'], paypal: ['PayPal', 'Konto PayPal'], klarna: ['Klarna', 'Zapłać później lub od razu'], ccard: ['Karta kredytowa', 'Visa, Mastercard, Amex'] },
      noSubPay: 'Niedostępne w subskrypcji',
      subPayNote: 'Subskrypcja: płatność odnawia się automatycznie kartą. BLIK i Przelewy24 — przy zakupie jednorazowym.',
      subPayNoteEUR: 'Subskrypcja: płatność odnawia się automatycznie (karta lub PayPal).',
      accept: 'Akceptuję <a href="#/dostawa">regulamin sklepu</a> i <a href="#/regulamin-subskrypcji">regulamin subskrypcji</a>.',
      order: 'Zamawiam i płacę',
      orderMock: 'To makieta: zamówienie nie zostało złożone, a płatność nie została uruchomiona.',
      sumH: 'Podsumowanie', sub_total: 'Wartość produktów', shipping: 'Dostawa', total: 'Do zapłaty', free: 'Gratis',
      vatIncl: 'Ceny zawierają VAT.', freeFrom: 'Darmowa dostawa od {x}, w subskrypcji zawsze.',
      market: 'Rynek: {c} · wysyłka do: {k}',
      added: 'Dodano do koszyka', goCart: 'Przejdź do koszyka', removed: 'Usunięto z koszyka',
      shipPageH: 'Dostawa i zwroty',
      shipTable: ['Forma dostawy', 'Kraj', 'Czas', 'Koszt'],
      shipRows: [['Paczkomat InPost', 'Polska', '1–2 dni robocze', '12,99 zł'], ['Kurier DPD', 'Polska', '1–2 dni robocze', '15,99 zł'], ['DHL Paket', 'Niemcy', '2–4 dni robocze', '4,90 €']],
      shipText: ['Zamówienia złożone w dni robocze do godz. 12:00 wysyłamy tego samego dnia.', 'Darmowa dostawa od 150 zł (Polska) lub od 39 € (Niemcy). Dostawy w subskrypcji są zawsze bezpłatne.'],
      returnsH: 'Zwroty — 14 dni',
      returns: ['Jako konsument możesz odstąpić od umowy w ciągu 14 dni od otrzymania paczki, bez podawania przyczyny. Wystarczy wiadomość e-mail lub formularz kontaktowy.', 'Nieotwarte opakowania odeślij w ciągu 14 dni od złożenia oświadczenia. Zwrócimy pieniądze w ciągu 14 dni, łącznie z kosztem najtańszej dostawy.', 'Ze względów higienicznych nie przyjmujemy zwrotu otwartych opakowań, chyba że produkt jest wadliwy.'],
      termsH: 'Regulamin subskrypcji',
      termsNote: 'Treść regulaminu przygotowuje i dostarcza marka. Tu widać układ strony.',
      terms: ['Definicje', 'Zawarcie umowy subskrypcji', 'Częstotliwość i terminy dostaw', 'Ceny, rabat i płatności cykliczne', 'Zmiana, wstrzymanie i anulowanie subskrypcji', 'Prawo odstąpienia od umowy', 'Reklamacje', 'Postanowienia końcowe'],
      termsPara: 'Treść paragrafu.',
      contactH: 'Kontakt',
      contactP: 'Masz pytanie o kawę, zamówienie albo subskrypcję? Odpowiadamy w dni robocze.',
      contactMail: 'E-mail', contactCompany: 'Dane firmy', company: 'Bruvelo (marka przykładowa)<br>ul. Przykładowa 1, 00-000 Miasto',
      formH: 'Napisz do nas', fName: 'Imię', fMsg: 'Wiadomość', fConsent: 'Wyrażam zgodę na przetwarzanie moich danych w celu udzielenia odpowiedzi.', fSend: 'Wyślij wiadomość',
      formMock: 'Makieta: wiadomość nie została wysłana.',
      notFound: 'Nie znaleziono strony', backHome: 'Wróć na stronę główną',
      title: 'Kawa funkcjonalna z soplówką jeżowatą',
      gallerySr: 'Galeria zdjęć produktu', qtyMinus: 'Zmniejsz liczbę', qtyPlus: 'Zwiększ liczbę', qtyAria: 'Liczba opakowań', step: 'Krok'
    },
    de: {
      skip: 'Zum Inhalt springen',
      banner: 'Shop-Konzept für eine neue funktionale Kaffeemarke — Name, Fotos und Preise beispielhaft.',
      langLabel: 'Sprache', curLabel: 'Währung',
      nav: { home: 'Kaffee', ship: 'Versand & Rückgabe', terms: 'Abo-Bedingungen', contact: 'Kontakt' },
      cartAria: 'Warenkorb, Anzahl Packungen:',
      menu: 'Menü',
      productName: 'Funktionaler Kaffee mit Igelstachelbart, gemahlen, 180 g',
      eyebrow: 'Bruvelo · funktionaler Kaffee',
      h1: 'Kaffee für einen guten Start in den Tag',
      lead: 'Arabica mit Extrakt aus Igelstachelbart (Lion’s Mane). Eine Packung à 180 g – einmalig oder im Abo mit 10 % Rabatt.',
      once: 'Einmalkauf', sub: 'Abo', subBadge: '−10 %',
      interval: 'Lieferung alle', weeks2: '2 Wochen', weeks4: '4 Wochen',
      subPerks: ['10 % günstiger bei jeder Lieferung', 'Kostenloser Versand', 'Jederzeit kündbar, ohne Gebühren'],
      qty: 'Anzahl Packungen', perKg: 'pro 1 kg',
      vat: 'inkl. MwSt., zzgl. Versandkosten.',
      save: 'Du sparst {x} pro Lieferung',
      add: 'In den Warenkorb', addSub: 'Abo abschließen',
      shipNote: 'Versand in 1–2 Werktagen',
      gallery: ['Kaffeepackung 180 g', 'Kaffeebohnen im geöffneten Beutel', 'Tasse Kaffee auf einem Holztisch', 'Kaffee im Handfilter aufbrühen'],
      thumb: 'Foto {n}',
      benefitsEyebrow: 'Warum Bruvelo', benefitsH: 'Einfacher Kaffee, gut gemacht',
      benefits: [
        ['Mild und vollmundig', 'Arabica aus Brasilien und Kolumbien, mittlere Röstung: Noten von Schokolade und Nüssen, ohne Bitterkeit.'],
        ['Mit Igelstachelbart', 'Der Extrakt aus Lion’s Mane verleiht dem Kaffee eine dezente, erdige Tiefe.'],
        ['Frisch geröstet', 'Wir rösten in kleinen Chargen und verpacken in Beutel mit Aromaventil.'],
        ['Ein einfaches Morgenritual', 'Zubereitung wie bei normalem gemahlenem Kaffee – im Handfilter, in der French Press oder im Espressokocher.']
      ],
      ingEyebrow: 'Zutaten', ingH: 'Was in der Packung steckt',
      ing: 'Arabica-Kaffee, geröstet, gemahlen (95 %), Extrakt aus Fruchtkörpern des Igelstachelbarts (<i>Hericium erinaceus</i>) (5 %).',
      ingFacts: [['Herkunft', 'Brasilien, Kolumbien'], ['Röstgrad', 'mittel'], ['Mahlgrad', 'mittel, universell'], ['Nettogewicht', '180 g'], ['Reicht für', 'ca. 12–15 Tassen']],
      ingNote: 'Zutaten, Anteile und Etikettangaben liefert die Marke.',
      brewEyebrow: 'Zubereitung', brewH: 'So bereitest du ihn zu',
      brew: [
        ['Handfilter', '15 g Kaffee, 250 ml Wasser mit 92–94 °C, Brühzeit 2,5–3 Minuten.'],
        ['French Press', '30 g Kaffee, 500 ml Wasser, 4 Minuten ziehen lassen. Dann den Stempel langsam herunterdrücken.'],
        ['Espressokocher', 'Sieb locker befüllen, nicht andrücken, Wasser bis zum Ventil einfüllen. Vom Herd nehmen, sobald der Kaffee zu blubbern beginnt.']
      ],
      ritualH: 'Dein Morgenritual – alle 2 oder 4 Wochen an deiner Tür',
      ritualP: 'Abo einmal einrichten und nie wieder ohne Kaffee dastehen. Den Liefertermin änderst du mit einem Klick.',
      ritualCta: 'Abo auswählen',
      revEyebrow: 'Bewertungen', revH: 'Das sagen unsere Kunden', revNote: 'Beispielbewertungen – im Shop erscheinen echte Kundenbewertungen',
      reviews: [
        ['Mild, ohne Bitterkeit. Das Abo alle 4 Wochen passt perfekt.', 'Beispielbewertung · Anna, Leipzig'],
        ['Ich trinke ihn aus der French Press – sehr angenehmes Aroma.', 'Beispielbewertung · Thomas, Köln'],
        ['Schnell geliefert, Beutel mit Aromaventil – der Kaffee duftet lange.', 'Beispielbewertung · Katrin, Hamburg']
      ],
      faqEyebrow: 'FAQ', faqH: 'Häufige Fragen',
      faq: [
        ['Wie funktioniert das Abo?', 'Du wählst die Anzahl der Packungen und den Rhythmus: alle 2 oder alle 4 Wochen. Du zahlst 10 % weniger, und der Versand im Abo ist kostenlos. Vor jedem Versand bekommst du eine Erinnerung per E-Mail.'],
        ['Kann ich das Abo kündigen oder pausieren?', 'Ja, jederzeit und ohne Gebühren – in deinem Kundenkonto oder per Nachricht an uns. Du kannst auch die nächste Lieferung verschieben.'],
        ['Für wie viele Tassen reicht eine Packung?', '180 g reichen für etwa 12–15 Tassen, je nach Zubereitung.'],
        ['Wie schmeckt Kaffee mit Igelstachelbart?', 'Wie ein milder Kaffee mit Schokoladennote. Der Pilz sorgt für eine dezente, erdige Tiefe und überdeckt den Geschmack nicht.'],
        ['Liefert ihr auch nach Polen?', 'Ja. Der Shop ist auf Deutsch und Polnisch verfügbar, die Preise siehst du in Euro und Złoty. Innerhalb Polens versenden wir mit InPost und DPD.']
      ],
      footerTag: 'Funktionaler Kaffee mit Igelstachelbart. Ein Produkt, sorgfältig gemacht.',
      footerShop: 'Shop', footerInfo: 'Informationen', footerPay: 'Zahlung und Versand',
      footerNote: 'Markenname, Fotos, Zutaten und Preise sind Beispiele. Fotos: <a href="https://unsplash.com" rel="noopener noreferrer">Unsplash</a>. Diese Seite verwendet keine Cookies und kein Tracking.',
      scopeBtn: 'Was die Marke bekommt', scopeClose: 'Schließen',
      scope: [
        ['Shop auf WooCommerce (oder Shopify) mit Abo-Funktion', 'Einmalkauf und Lieferung alle 2 oder 4 Wochen'],
        ['Zwei Sprachen und zwei Währungen', 'Polnisch und Deutsch, PLN und EUR'],
        ['Shop-Texte auf Polnisch und Deutsch', 'Produktbeschreibung, FAQ, Infoseiten'],
        ['Zahlungen', 'BLIK, Przelewy24, Karte, PayPal, Klarna; im Abo wiederkehrend per Karte oder PayPal'],
        ['Einfache Bedienung ohne Programmierer', 'kurze Schulung und Anleitung']
      ],
      cartH: 'Warenkorb und Bestellung', crumbsHome: 'Startseite',
      emptyCart: 'Dein Warenkorb ist leer.', backShop: 'Zurück zum Shop',
      yourOrder: 'Deine Bestellung', remove: 'Entfernen',
      lineOnce: 'Einmalkauf', lineSub: 'Abo: {q} × 180 g alle {w} Wochen',
      subBox: 'Abo: {q} × 180 g alle {w} Wochen · {p} pro Lieferung · versandkostenfrei · jederzeit kündbar. Die erste Lieferung kommt nach der Bestellung, die nächste in {w} Wochen.',
      dataH: 'Lieferadresse',
      f: { name: 'Vor- und Nachname', email: 'E-Mail-Adresse', phone: 'Telefon', street: 'Straße und Hausnummer', zip: 'PLZ', city: 'Ort', country: 'Land', zipHint: 'Format: 12345' },
      countryPL: 'Polen', countryDE: 'Deutschland',
      shipH: 'Versand', payH: 'Zahlung',
      ship: { inpost: ['InPost Paketstation (Polen)', '1–2 Werktage'], dpd: ['DPD Kurier (Polen)', '1–2 Werktage'], dhl: ['DHL Paket', '2–4 Werktage'] },
      pay: { blik: ['BLIK', 'Code aus der Banking-App'], p24: ['Przelewy24', 'Online-Überweisung'], card: ['Kreditkarte', 'Visa, Mastercard'], paypal: ['PayPal', 'Mit deinem PayPal-Konto'], klarna: ['Klarna', 'Später bezahlen oder sofort'], ccard: ['Kreditkarte', 'Visa, Mastercard, Amex'] },
      noSubPay: 'Im Abo nicht verfügbar',
      subPayNote: 'Abo: Die Zahlung erfolgt automatisch per Karte. BLIK und Przelewy24 nur bei Einzelkauf.',
      subPayNoteEUR: 'Abo: Die Zahlung erfolgt automatisch per Kreditkarte oder PayPal.',
      accept: 'Ich akzeptiere die <a href="#/dostawa">AGB</a> und die <a href="#/regulamin-subskrypcji">Abo-Bedingungen</a>.',
      order: 'Zahlungspflichtig bestellen',
      orderMock: 'Dies ist ein Entwurf: Es wurde keine Bestellung aufgegeben und keine Zahlung ausgelöst.',
      sumH: 'Zusammenfassung', sub_total: 'Zwischensumme', shipping: 'Versand', total: 'Gesamtsumme', free: 'Kostenlos',
      vatIncl: 'Alle Preise inkl. MwSt.', freeFrom: 'Kostenloser Versand ab {x}, im Abo immer.',
      market: 'Markt: {c} · Lieferung nach: {k}',
      added: 'In den Warenkorb gelegt', goCart: 'Zum Warenkorb', removed: 'Aus dem Warenkorb entfernt',
      shipPageH: 'Versand & Rückgabe',
      shipTable: ['Versandart', 'Land', 'Lieferzeit', 'Kosten'],
      shipRows: [['DHL Paket', 'Deutschland', '2–4 Werktage', '4,90 €'], ['InPost Paketstation', 'Polen', '1–2 Werktage', '12,99 zł'], ['DPD Kurier', 'Polen', '1–2 Werktage', '15,99 zł']],
      shipText: ['Bestellungen, die an Werktagen bis 12:00 Uhr eingehen, versenden wir noch am selben Tag.', 'Kostenloser Versand ab 39 € (Deutschland) bzw. ab 150 zł (Polen). Abo-Lieferungen sind immer versandkostenfrei.'],
      returnsH: 'Widerruf – 14 Tage',
      returns: ['Als Verbraucher kannst du den Vertrag innerhalb von 14 Tagen nach Erhalt der Ware ohne Angabe von Gründen widerrufen. Eine E-Mail oder das Kontaktformular genügt.', 'Ungeöffnete Packungen sendest du innerhalb von 14 Tagen nach dem Widerruf zurück. Wir erstatten den Kaufpreis innerhalb von 14 Tagen, einschließlich der Kosten für die günstigste Versandart.', 'Aus hygienischen Gründen sind geöffnete Packungen von der Rückgabe ausgeschlossen, sofern das Produkt nicht mangelhaft ist.'],
      termsH: 'Abo-Bedingungen',
      termsNote: 'Den Text der Bedingungen stellt die Marke bereit. Hier siehst du den Aufbau der Seite.',
      terms: ['Begriffsbestimmungen', 'Vertragsschluss', 'Lieferrhythmus und Liefertermine', 'Preise, Rabatt und wiederkehrende Zahlungen', 'Änderung, Pausierung und Kündigung', 'Widerrufsrecht', 'Gewährleistung', 'Schlussbestimmungen'],
      termsPara: 'Text des Paragrafen.',
      contactH: 'Kontakt',
      contactP: 'Du hast Fragen zum Kaffee, zu deiner Bestellung oder zum Abo? Wir antworten an Werktagen.',
      contactMail: 'E-Mail', contactCompany: 'Impressum', company: 'Bruvelo (Beispielmarke)<br>ul. Przykładowa 1, 00-000 Miasto, Polen',
      formH: 'Schreib uns', fName: 'Name', fMsg: 'Nachricht', fConsent: 'Ich bin damit einverstanden, dass meine Daten zur Beantwortung meiner Anfrage verarbeitet werden.', fSend: 'Nachricht senden',
      formMock: 'Entwurf: Die Nachricht wurde nicht gesendet.',
      notFound: 'Seite nicht gefunden', backHome: 'Zur Startseite',
      title: 'Funktionaler Kaffee mit Igelstachelbart',
      gallerySr: 'Produktfotos', qtyMinus: 'Anzahl verringern', qtyPlus: 'Anzahl erhöhen', qtyAria: 'Anzahl Packungen', step: 'Schritt'
    }
  };

  /* ---------- Ceny ---------- */
  var PRICE = { PLN: 69, EUR: 16.9 };
  var DISCOUNT = 0.10;
  var SHIP = {
    PLN: [{ id: 'inpost', price: 12.99 }, { id: 'dpd', price: 15.99 }],
    EUR: [{ id: 'dhl', price: 4.9 }]
  };
  var FREE_FROM = { PLN: 150, EUR: 39 };
  var PAY = { PLN: ['blik', 'p24', 'card'], EUR: ['paypal', 'klarna', 'ccard'] };
  var NO_SUB_PAY = { p24: true, blik: true, klarna: true };
  var PHOTOS = ['1695245503558-5cdb37f49092', '1562051036-e0eea191d42f', '1771736385651-c071580a9d78', '1759259639356-7c6e74eed1ec'];

  /* ---------- Stan ---------- */
  var params = new URLSearchParams(location.search);
  var state = {
    lang: params.get('lang') === 'de' ? 'de' : 'pl',
    cur: null,
    mode: params.get('mode') === 'sub' ? 'sub' : 'once',
    interval: 4, qty: 1, view: 0,
    cart: [{ mode: 'sub', interval: 4, qty: 2 }],
    ship: null, pay: null
  };
  state.cur = params.get('cur') === 'EUR' || params.get('cur') === 'PLN' ? params.get('cur') : (state.lang === 'de' ? 'EUR' : 'PLN');

  function L() { return T[state.lang]; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function money(n, cur) {
    cur = cur || state.cur;
    var parts = (Math.round(n * 100) / 100).toFixed(2).split('.');
    var int = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return int + ',' + parts[1] + ' ' + (cur === 'EUR' ? '€' : 'zł');
  }
  function fmt(s, o) { return s.replace(/\{(\w+)\}/g, function (m, k) { return o[k] != null ? o[k] : m; }); }
  function unit(mode) { var p = PRICE[state.cur]; return mode === 'sub' ? Math.round(p * (1 - DISCOUNT) * 100) / 100 : p; }
  function syncUrl() {
    var q = new URLSearchParams();
    q.set('lang', state.lang); q.set('cur', state.cur);
    history.replaceState(null, '', '?' + q.toString() + location.hash);
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

  /* ---------- Szkielet: pasek, nagłówek, stopka, panel ---------- */
  function seg(name, label, opts, cur) {
    return '<div class="seg" role="group" aria-label="' + label + '">' + opts.map(function (o) {
      return '<button type="button" data-' + name + '="' + o + '" aria-pressed="' + (o === cur) + '" data-fid="' + name + '-' + o + '">' + o.toUpperCase() + '</button>';
    }).join('') + '</div>';
  }
  function renderChrome() {
    var t = L();
    document.documentElement.lang = state.lang;
    document.getElementById('skipLink').textContent = t.skip;
    document.getElementById('banner').innerHTML = '<div class="demo-bar" role="note"><div class="wrap"><p class="demo-bar__line">' + t.banner + '</p></div></div>';
    var count = state.cart.reduce(function (s, i) { return s + i.qty; }, 0);
    document.getElementById('header').innerHTML = '<div class="wrap header__in">' +
      '<a class="logo" href="#/" aria-label="Bruvelo"><span class="wordmark">Bruvelo</span></a>' +
      '<button type="button" class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="nav"><span class="menu-btn__bars" aria-hidden="true"></span><span class="sr">' + t.menu + '</span></button>' +
      '<nav class="nav" id="nav" aria-label="Menu"><a href="#/" data-nav="">' + t.nav.home + '</a><a href="#/dostawa" data-nav="dostawa">' + t.nav.ship + '</a><a href="#/regulamin-subskrypcji" data-nav="regulamin-subskrypcji">' + t.nav.terms + '</a><a href="#/kontakt" data-nav="kontakt">' + t.nav.contact + '</a></nav>' +
      '<div class="switches">' + seg('lang', t.langLabel, ['pl', 'de'], state.lang) + seg('cur', t.curLabel, ['PLN', 'EUR'], state.cur) + '</div>' +
      '<a class="cart-link" href="#/koszyk" data-nav="koszyk"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 7h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 9V6a3 3 0 0 1 6 0v3" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span class="sr">' + t.cartAria + '</span><span class="cart-link__count" id="cartCount">' + count + '</span></a></div>';
    document.getElementById('footer').innerHTML = '<div class="wrap footer__grid"><div><p class="footer__brand">Bruvelo</p><p class="muted">' + t.footerTag + '</p></div>' +
      '<div><h2 class="footer__h">' + t.footerShop + '</h2><ul><li><a href="#/">' + t.nav.home + '</a></li><li><a href="#/koszyk">' + t.cartH.split(' ')[0] + '</a></li></ul></div>' +
      '<div><h2 class="footer__h">' + t.footerInfo + '</h2><ul><li><a href="#/dostawa">' + t.nav.ship + '</a></li><li><a href="#/regulamin-subskrypcji">' + t.nav.terms + '</a></li><li><a href="#/kontakt">' + t.nav.contact + '</a></li></ul></div>' +
      '<div><h2 class="footer__h">' + t.footerPay + '</h2><p class="pills"><span>BLIK</span><span>Przelewy24</span><span>PayPal</span><span>Klarna</span><span>Visa / MC</span></p><p class="pills"><span>InPost</span><span>DPD</span><span>DHL</span></p></div></div>' +
      '<div class="wrap footer__bottom"><p>' + t.footerNote + '</p></div>';
    var open = document.getElementById('scope').classList.contains('is-open');
    document.getElementById('scope').setAttribute('aria-label', t.scopeBtn);
    document.getElementById('scope').innerHTML = '<button type="button" class="scope__toggle" id="scopeToggle" aria-expanded="' + open + '" aria-controls="scopeBody"><span class="scope__dot" aria-hidden="true"></span>' + t.scopeBtn + '</button>' +
      '<div class="scope__body" id="scopeBody"' + (open ? '' : ' hidden') + '><h2 class="scope__h">' + t.scopeBtn + '</h2><ul class="scope__list">' +
      t.scope.map(function (s) { return '<li><strong>' + s[0] + '</strong> — ' + s[1] + '</li>'; }).join('') + '</ul><button type="button" class="scope__close" id="scopeClose">' + t.scopeClose + '</button></div>';
  }

  /* ---------- Strona produktu (główna) ---------- */
  function buyBox() {
    var t = L(), u = unit(state.mode), total = u * state.qty;
    var perKg = u / 0.18;
    var html = '<div class="buy-mode" role="radiogroup" aria-label="' + t.once + ' / ' + t.sub + '">' +
      modeBtn('once', t.once, money(PRICE[state.cur])) + modeBtn('sub', t.sub + ' <span class="pct">' + t.subBadge + '</span>', money(unit('sub'))) + '</div>';
    if (state.mode === 'sub') {
      html += '<fieldset class="opt"><legend>' + t.interval + '</legend><div class="opt__vals">' +
        [2, 4].map(function (w) { return '<label class="pill"><input type="radio" name="interval" value="' + w + '"' + (state.interval === w ? ' checked' : '') + '><span>' + (w === 2 ? t.weeks2 : t.weeks4) + '</span></label>'; }).join('') +
        '</div></fieldset><ul class="perks">' + t.subPerks.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul>';
    }
    html += '<div class="qty-row"><span class="qty-label" id="qtyLabel">' + t.qty + '</span><div class="qty" role="group" aria-labelledby="qtyLabel">' +
      '<button type="button" data-q="-1" aria-label="' + t.qtyMinus + '"' + (state.qty <= 1 ? ' disabled' : '') + '>−</button><output id="qtyOut" aria-live="polite">' + state.qty + '</output>' +
      '<button type="button" data-q="1" aria-label="' + t.qtyPlus + '"' + (state.qty >= 3 ? ' disabled' : '') + '>+</button></div></div>';
    html += '<div class="price-box"><p class="price">' + money(total) + (state.mode === 'sub' ? ' <s>' + money(PRICE[state.cur] * state.qty) + '</s>' : '') + '</p>' +
      '<p class="vat">' + t.vat + ' · ' + money(perKg) + ' ' + t.perKg + '</p>' +
      (state.mode === 'sub' ? '<p class="save">' + fmt(t.save, { x: money((PRICE[state.cur] - u) * state.qty) }) + '</p>' : '') + '</div>' +
      '<button type="button" class="btn btn--block" id="addBtn">' + (state.mode === 'sub' ? t.addSub : t.add) + '</button>' +
      '<p class="stock"><span class="dot dot--ok" aria-hidden="true"></span>' + t.shipNote + '</p>';
    return html;
  }
  function modeBtn(mode, label, price) {
    return '<label class="mode"><input type="radio" name="mode" value="' + mode + '"' + (state.mode === mode ? ' checked' : '') + '><span><strong>' + label + '</strong><em>' + price + ' / 180 g</em></span></label>';
  }
  function gallery() {
    var t = L();
    return '<div class="gallery__main" id="gMain">' + photo(PHOTOS[state.view], t.gallery[state.view], 1000, 1000, { widths: [600, 1000, 1400], sizes: '(max-width: 899px) 100vw, 55vw', eager: true }) + '</div>' +
      '<div class="gallery__thumbs" role="group" aria-label="' + t.gallerySr + '">' + PHOTOS.map(function (id, i) {
        return '<button type="button" class="thumb" data-view="' + i + '" aria-pressed="' + (state.view === i) + '" aria-label="' + fmt(t.thumb, { n: i + 1 }) + '">' + photo(id, '', 160, 160, { widths: [160, 320], sizes: '80px' }) + '</button>';
      }).join('') + '</div>';
  }
  function viewHome() {
    var t = L();
    var icons = [
      '<path d="M5 10h11v4a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5v-4Z M16 11h1.5a2.5 2.5 0 0 1 0 5H16" fill="none" stroke="currentColor" stroke-width="1.6"/>',
      '<path d="M6 12a6 4 0 0 1 12 0Z M10 12v6a2 2 0 0 0 4 0v-6" fill="none" stroke="currentColor" stroke-width="1.6"/>',
      '<path d="M12 3c3 3 5 6 5 9a5 5 0 0 1-10 0c0-3 2-6 5-9Z" fill="none" stroke="currentColor" stroke-width="1.6"/>',
      '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="1.6"/>'
    ];
    return '<section class="wrap pdp" aria-labelledby="h1"><div class="product">' +
      '<div class="gallery">' + gallery() + '</div>' +
      '<div class="pinfo"><p class="eyebrow">' + t.eyebrow + '</p><h1 id="h1">' + t.h1 + '</h1>' +
      '<p class="pname">' + t.productName + '</p><p class="pinfo__short">' + t.lead + '</p>' +
      '<div class="buybox" id="buybox">' + buyBox() + '</div></div></div></section>' +

      '<section class="section why" aria-labelledby="h-ben"><div class="wrap"><div class="section__head"><div><p class="eyebrow">' + t.benefitsEyebrow + '</p><h2 id="h-ben">' + t.benefitsH + '</h2></div></div><div class="grid grid--4 benefits">' +
      t.benefits.map(function (b, i) { return '<div class="why__item"><div class="why__icon"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">' + icons[i] + '</svg></div><h3>' + b[0] + '</h3><p>' + b[1] + '</p></div>'; }).join('') + '</div></div></section>' +

      '<section class="section" aria-labelledby="h-ing"><div class="wrap split"><div class="split__img">' + photo('1773894480003-955c58ddf4af', '', 800, 640, { widths: [500, 800, 1200], sizes: '(max-width: 899px) 100vw, 50vw' }) + '</div>' +
      '<div><p class="eyebrow">' + t.ingEyebrow + '</p><h2 id="h-ing">' + t.ingH + '</h2><p class="ing">' + t.ing + '</p><table class="spec"><tbody>' +
      t.ingFacts.map(function (r) { return '<tr><th scope="row">' + r[0] + '</th><td>' + r[1] + '</td></tr>'; }).join('') + '</tbody></table><p class="muted small">' + t.ingNote + '</p></div></div></section>' +

      '<section class="section section--tight" aria-labelledby="h-brew"><div class="wrap"><div class="section__head"><div><p class="eyebrow">' + t.brewEyebrow + '</p><h2 id="h-brew">' + t.brewH + '</h2></div></div><div class="grid grid--3 brew">' +
      t.brew.map(function (b, i) { return '<div class="brew__item"><span class="brew__n">' + (i + 1) + '</span><h3>' + b[0] + '</h3><p>' + b[1] + '</p></div>'; }).join('') + '</div></div></section>' +

      '<section class="ritual" aria-labelledby="h-rit">' + photo('1781460877110-6988cbaf0eb0', '', 1600, 700, { widths: [800, 1200, 1600, 2000], sizes: '(max-width: 759px) 230vw, 100vw', cls: 'ritual__img' }) +
      '<div class="ritual__shade" aria-hidden="true"></div><div class="wrap ritual__in"><h2 id="h-rit">' + t.ritualH + '</h2><p>' + t.ritualP + '</p><button type="button" class="btn btn--light" id="ritualCta">' + t.ritualCta + '</button></div></section>' +

      '<section class="section section--tight reviews" aria-labelledby="h-rev"><div class="wrap"><div class="section__head"><div><p class="eyebrow">' + t.revEyebrow + '</p><h2 id="h-rev">' + t.revH + '</h2></div><span class="note-pill">' + t.revNote + '</span></div><div class="grid grid--3">' +
      t.reviews.map(function (r) { return '<figure class="review"><div class="stars" aria-hidden="true">★★★★★</div><blockquote>„' + r[0] + '”</blockquote><figcaption>' + r[1] + '</figcaption></figure>'; }).join('') + '</div></div></section>' +

      '<section class="section section--tight" aria-labelledby="h-faq"><div class="wrap faq"><div><p class="eyebrow">' + t.faqEyebrow + '</p><h2 id="h-faq">' + t.faqH + '</h2></div><div>' +
      t.faq.map(function (q) { return '<details class="faq__item"><summary>' + q[0] + '</summary><p>' + q[1] + '</p></details>'; }).join('') + '</div></div></section>';
  }

  /* ---------- Koszyk ---------- */
  function lineTotal(it) { return unit(it.mode) * it.qty; }
  function cartCalc() {
    var opts = SHIP[state.cur];
    if (!state.ship || !opts.some(function (o) { return o.id === state.ship; })) state.ship = opts[0].id;
    var pays = PAY[state.cur];
    var hasSub = state.cart.some(function (i) { return i.mode === 'sub'; });
    if (!state.pay || pays.indexOf(state.pay) < 0 || (hasSub && NO_SUB_PAY[state.pay])) state.pay = pays.filter(function (id) { return !(hasSub && NO_SUB_PAY[id]); })[0] || pays[0];
    var sub = state.cart.reduce(function (s, it) { return s + lineTotal(it); }, 0);
    var sh = opts.filter(function (o) { return o.id === state.ship; })[0];
    var free = hasSub || sub >= FREE_FROM[state.cur];
    var ship = state.cart.length ? (free ? 0 : sh.price) : 0;
    return { sub: sub, ship: ship, total: sub + ship, hasSub: hasSub, opts: opts, pays: pays };
  }
  function viewCart() {
    var t = L();
    return '<div class="wrap page-head"><nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="#/">' + t.crumbsHome + '</a></li><li><span aria-current="page">' + t.cartH + '</span></li></ol></nav><h1>' + t.cartH + '</h1></div>' +
      '<section class="wrap"><div class="cart"><div><div class="panel"><h2><span class="step">1</span>' + t.yourOrder + '</h2><div id="cartLines"></div></div>' +
      '<form class="panel" id="checkout" novalidate aria-labelledby="h-data"><h2 id="h-data"><span class="step">2</span>' + t.dataH + '</h2><div class="fields">' +
      field('c-name', t.f.name, 'text', 'name', true) + field('c-email', t.f.email, 'email', 'email') + field('c-phone', t.f.phone, 'tel', 'tel') +
      field('c-street', t.f.street, 'text', 'street-address', true) + field('c-zip', t.f.zip, 'text', 'postal-code', false, t.f.zipHint) + field('c-city', t.f.city, 'text', 'address-level2') +
      '<div class="field field--full"><label for="c-country">' + t.f.country + '</label><input id="c-country" type="text" value="' + (state.cur === 'EUR' ? t.countryDE : t.countryPL) + '" readonly></div>' +
      '</div><h2 style="margin-top:20px"><span class="step">3</span>' + t.shipH + '</h2><div role="radiogroup" aria-label="' + t.shipH + '" id="shipList"></div>' +
      '<h2 style="margin-top:20px"><span class="step">4</span>' + t.payH + '</h2><div role="radiogroup" aria-label="' + t.payH + '" id="payList"></div>' +
      '<label class="check-row"><input type="checkbox"> <span>' + t.accept + '</span></label>' +
      '<button class="btn btn--block" type="submit">' + t.order + '</button><p class="notice notice--demo" role="status" aria-live="polite"></p></form></div>' +
      '<aside class="panel summary" aria-labelledby="h-sum"><h2 id="h-sum">' + t.sumH + '</h2><div id="cartSum"></div></aside></div></section>';
  }
  function field(id, label, type, ac, full, hint) {
    return '<div class="field' + (full ? ' field--full' : '') + '"><label for="' + id + '">' + label + '</label><input id="' + id + '" type="' + type + '" autocomplete="' + ac + '"' + (hint ? ' aria-describedby="' + id + '-h"' : '') + '>' + (hint ? '<span class="hint" id="' + id + '-h">' + hint + '</span>' : '') + '</div>';
  }
  function bagSvg() {
    return '<svg viewBox="0 0 80 80" aria-hidden="true"><rect width="80" height="80" fill="#efe6d8"/><path d="M26 18h28l3 8v38H23V26Z" fill="#c9a77c"/><path d="M26 18h28v6H26Z" fill="#b38f63"/><rect x="31" y="36" width="18" height="16" rx="2" fill="#f6efe4"/><text x="40" y="47" text-anchor="middle" font-family="Georgia, serif" font-size="7" fill="#3b2a20">B</text></svg>';
  }
  function renderCart() {
    var box = document.getElementById('cartLines');
    if (!box) return;
    var t = L(), c = cartCalc();
    var active = document.activeElement && document.activeElement.getAttribute('data-fid');
    box.innerHTML = !state.cart.length ? '<div class="empty"><p>' + t.emptyCart + '</p><a class="btn" href="#/">' + t.backShop + '</a></div>' :
      state.cart.map(function (it, i) {
        var label = it.mode === 'sub' ? fmt(t.lineSub, { q: it.qty, w: it.interval }) : t.lineOnce;
        return '<div class="line"><div class="line__img">' + bagSvg() + '</div><div><p class="line__name">' + t.productName + '</p><p class="line__var">' + label + ' · ' + money(unit(it.mode)) + ' / 180 g</p>' +
          '<div class="line__ctrl"><div class="qty qty--sm" role="group" aria-label="' + t.qtyAria + '"><button type="button" data-cq="-1" data-i="' + i + '" data-fid="m' + i + '" aria-label="' + t.qtyMinus + '">−</button>' +
          '<output>' + it.qty + '</output><button type="button" data-cq="1" data-i="' + i + '" data-fid="p' + i + '" aria-label="' + t.qtyPlus + '">+</button></div>' +
          '<button type="button" class="link-btn" data-rm="' + i + '">' + t.remove + '</button></div>' +
          (it.mode === 'sub' ? '<p class="subbox">' + fmt(t.subBox, { q: it.qty, w: it.interval, p: money(lineTotal(it)) }) + '</p>' : '') +
          '</div><p class="line__sum">' + money(lineTotal(it)) + '</p></div>';
      }).join('');
    document.getElementById('shipList').innerHTML = c.opts.map(function (o) {
      var n = t.ship[o.id];
      return '<label class="choice"><input type="radio" name="ship" value="' + o.id + '"' + (state.ship === o.id ? ' checked' : '') + '><span><strong>' + n[0] + '</strong><small>' + n[1] + '</small></span><span class="choice__price">' + (c.ship === 0 && state.cart.length ? t.free : money(o.price)) + '</span></label>';
    }).join('');
    document.getElementById('payList').innerHTML = c.pays.map(function (id) {
      var n = t.pay[id], off = c.hasSub && NO_SUB_PAY[id];
      return '<label class="choice' + (off ? ' choice--off' : '') + '"><input type="radio" name="pay" value="' + id + '"' + (state.pay === id ? ' checked' : '') + (off ? ' disabled' : '') + '><span><strong>' + n[0] + '</strong><small>' + (off ? t.noSubPay : n[1]) + '</small></span><span class="paym paym--' + id + '">' + payLogo(id) + '</span></label>';
    }).join('') + (c.hasSub ? '<p class="sum-note">' + (state.cur === 'EUR' ? t.subPayNoteEUR : t.subPayNote) + '</p>' : '');
    var items = state.cart.reduce(function (s, i) { return s + i.qty; }, 0);
    document.getElementById('cartSum').innerHTML =
      '<p class="sum-note">' + fmt(t.market, { c: state.cur, k: state.cur === 'EUR' ? t.countryDE : t.countryPL }) + '</p>' +
      '<div class="sum-row"><span>' + t.sub_total + ' (' + items + ' × 180 g)</span><span>' + money(c.sub) + '</span></div>' +
      '<div class="sum-row"><span>' + t.shipping + '</span><span>' + (items && c.ship === 0 ? t.free : money(c.ship)) + '</span></div>' +
      '<div class="sum-row sum-row--total"><span>' + t.total + '</span><span>' + money(c.total) + '</span></div>' +
      '<p class="sum-note">' + t.vatIncl + ' ' + fmt(t.freeFrom, { x: money(FREE_FROM[state.cur]).replace(',00', '') }) + '</p>';
    if (active) { var el = document.querySelector('[data-fid="' + active + '"]'); if (el) el.focus(); }
    updateCount();
  }
  function payLogo(id) { return { blik: 'BLIK', p24: 'P24', card: 'VISA/MC', paypal: 'PayPal', klarna: 'Klarna', ccard: 'VISA/MC' }[id]; }
  function updateCount() { var el = document.getElementById('cartCount'); if (el) el.textContent = state.cart.reduce(function (s, i) { return s + i.qty; }, 0); }

  /* ---------- Strony informacyjne ---------- */
  function head(title) {
    var t = L();
    return '<div class="wrap page-head"><nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="#/">' + t.crumbsHome + '</a></li><li><span aria-current="page">' + title + '</span></li></ol></nav><h1>' + title + '</h1></div>';
  }
  function viewShipping() {
    var t = L();
    return head(t.shipPageH) + '<section class="wrap"><div class="prose"><div class="table-wrap"><table class="table"><caption class="sr">' + t.shipPageH + '</caption><thead><tr>' +
      t.shipTable.map(function (h) { return '<th scope="col">' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      t.shipRows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>' +
      t.shipText.map(function (p) { return '<p>' + p + '</p>'; }).join('') + '<h2>' + t.returnsH + '</h2>' + t.returns.map(function (p) { return '<p>' + p + '</p>'; }).join('') + '</div></section>';
  }
  function viewTerms() {
    var t = L();
    return head(t.termsH) + '<section class="wrap"><div class="prose"><p class="muted">' + t.termsNote + '</p><ol class="terms">' +
      t.terms.map(function (s, i) { return '<li><h2>§ ' + (i + 1) + '. ' + s + '</h2><p class="muted">' + t.termsPara + '</p></li>'; }).join('') + '</ol></div></section>';
  }
  function viewContact() {
    var t = L();
    return head(t.contactH) + '<section class="wrap"><div class="contact"><div><p>' + t.contactP + '</p><dl><dt>' + t.contactMail + '</dt><dd>kontakt@bruvelo.example</dd><dt>' + t.contactCompany + '</dt><dd>' + t.company + '</dd></dl></div>' +
      '<form class="panel" data-demo-form="contact" novalidate aria-labelledby="h-form"><h2 id="h-form">' + t.formH + '</h2><div class="fields">' +
      field('k-name', t.fName, 'text', 'given-name') + field('k-email', t.f.email, 'email', 'email') +
      '<div class="field field--full"><label for="k-msg">' + t.fMsg + '</label><textarea id="k-msg"></textarea></div></div>' +
      '<label class="check-row"><input type="checkbox"> <span>' + t.fConsent + '</span></label><button class="btn" type="submit">' + t.fSend + '</button><p class="notice notice--demo" role="status" aria-live="polite"></p></form></div></section>';
  }

  /* ---------- Router ---------- */
  var main = document.getElementById('main');
  var lastRoute = null;
  function route() { return (location.hash.replace(/^#\/?/, '').split('?')[0] || '').split('/')[0]; }
  function render(keepScroll) {
    var a = route(), t = L(), html, title;
    renderChrome();
    if (a === '') { html = viewHome(); title = t.title; }
    else if (a === 'koszyk') { html = viewCart(); title = t.cartH; }
    else if (a === 'dostawa') { html = viewShipping(); title = t.shipPageH; }
    else if (a === 'regulamin-subskrypcji') { html = viewTerms(); title = t.termsH; }
    else if (a === 'kontakt') { html = viewContact(); title = t.contactH; }
    else { html = '<div class="wrap page-head"><h1>' + t.notFound + '</h1><p><a href="#/">' + t.backHome + '</a></p></div>'; title = t.notFound; }
    main.innerHTML = html;
    document.title = title + ' — Bruvelo';
    document.querySelectorAll('[data-nav]').forEach(function (n) { if (n.getAttribute('data-nav') === a) n.setAttribute('aria-current', 'page'); else n.removeAttribute('aria-current'); });
    if (a === 'koszyk') renderCart();
    bindChrome();
    if (!keepScroll && lastRoute !== null && location.hash !== lastRoute) { window.scrollTo(0, 0); main.focus({ preventScroll: true }); }
    lastRoute = location.hash;
  }
  window.addEventListener('hashchange', function () { render(false); });

  function toast(html) {
    var el = document.getElementById('toast');
    el.innerHTML = html; el.classList.add('is-on');
    clearTimeout(toast._t); toast._t = setTimeout(function () { el.classList.remove('is-on'); }, 3800);
  }
  function refreshBuy() { var b = document.getElementById('buybox'); if (b) b.innerHTML = buyBox(); }

  /* Przełączniki w nagłówku i panel */
  function bindChrome() {
    var menuBtn = document.getElementById('menuBtn'), nav = document.getElementById('nav');
    menuBtn.addEventListener('click', function () {
      var open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open); menuBtn.setAttribute('aria-expanded', String(open));
    });
    document.getElementById('scopeToggle').addEventListener('click', function () { setScope(true); document.getElementById('scopeClose').focus(); });
    document.getElementById('scopeClose').addEventListener('click', function () { setScope(false); document.getElementById('scopeToggle').focus(); });
  }
  function setScope(open) {
    var s = document.getElementById('scope');
    s.classList.toggle('is-open', open);
    document.getElementById('scopeBody').hidden = !open;
    document.getElementById('scopeToggle').setAttribute('aria-expanded', String(open));
  }
  document.getElementById('header').addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    var fid = b.getAttribute('data-fid');
    if (b.hasAttribute('data-lang')) {
      var l = b.getAttribute('data-lang');
      if (l === state.lang) return;
      state.lang = l; state.cur = l === 'de' ? 'EUR' : 'PLN';
    } else if (b.hasAttribute('data-cur')) {
      var c = b.getAttribute('data-cur');
      if (c === state.cur) return;
      state.cur = c;
    } else return;
    syncUrl(); render(true);
    var again = document.querySelector('[data-fid="' + fid + '"]'); if (again) again.focus();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var s = document.getElementById('scope');
      if (s.classList.contains('is-open')) { setScope(false); document.getElementById('scopeToggle').focus(); }
    }
  });

  main.addEventListener('change', function (e) {
    var el = e.target;
    if (el.name === 'mode') { state.mode = el.value; refreshBuy(); var m = document.querySelector('input[name="mode"][value="' + el.value + '"]'); if (m) m.focus(); }
    else if (el.name === 'interval') { state.interval = +el.value; refreshBuy(); var iv = document.querySelector('input[name="interval"][value="' + el.value + '"]'); if (iv) iv.focus(); }
    else if (el.name === 'ship') { state.ship = el.value; renderCart(); }
    else if (el.name === 'pay') { state.pay = el.value; }
  });
  main.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    var t = L();
    if (b.hasAttribute('data-view')) {
      state.view = +b.getAttribute('data-view');
      document.getElementById('gMain').innerHTML = photo(PHOTOS[state.view], t.gallery[state.view], 1000, 1000, { widths: [600, 1000, 1400], sizes: '(max-width: 899px) 100vw, 55vw', eager: true });
      document.querySelectorAll('.thumb').forEach(function (x) { x.setAttribute('aria-pressed', String(+x.getAttribute('data-view') === state.view)); });
    } else if (b.hasAttribute('data-q')) {
      state.qty = Math.max(1, Math.min(3, state.qty + +b.getAttribute('data-q')));
      var dir = b.getAttribute('data-q');
      refreshBuy();
      var nb = document.querySelector('[data-q="' + dir + '"]');
      if (nb && !nb.disabled) nb.focus(); else { var ob = document.querySelector('[data-q="' + (dir === '1' ? '-1' : '1') + '"]'); if (ob) ob.focus(); }
    } else if (b.id === 'addBtn') {
      var ex = state.cart.filter(function (i) { return i.mode === state.mode && (state.mode === 'once' || i.interval === state.interval); })[0];
      if (ex) ex.qty = Math.min(9, ex.qty + state.qty); else state.cart.push({ mode: state.mode, interval: state.interval, qty: state.qty });
      updateCount();
      toast(t.added + ': ' + state.qty + ' × 180 g <a href="#/koszyk">' + t.goCart + '</a>');
    } else if (b.id === 'ritualCta') {
      state.mode = 'sub'; refreshBuy();
      document.getElementById('buybox').scrollIntoView({ behavior: 'smooth', block: 'center' });
      var sm = document.querySelector('input[name="mode"][value="sub"]'); if (sm) sm.focus({ preventScroll: true });
    } else if (b.hasAttribute('data-cq')) {
      var it = state.cart[+b.getAttribute('data-i')];
      it.qty = Math.max(1, Math.min(9, it.qty + +b.getAttribute('data-cq'))); renderCart();
    } else if (b.hasAttribute('data-rm')) {
      state.cart.splice(+b.getAttribute('data-rm'), 1); renderCart(); toast(t.removed);
    }
  });
  main.addEventListener('submit', function (e) {
    e.preventDefault();
    var note = e.target.querySelector('.notice'), t = L();
    if (!note) return;
    note.textContent = e.target.id === 'checkout' ? t.orderMock : t.formMock;
  });
  document.addEventListener('error', function (e) { if (e.target && e.target.tagName === 'IMG') e.target.classList.add('is-broken'); }, true);

  syncUrl();
  render(true);
  if (params.get('panel') === 'open') setScope(true);
})();
