/*
 * Archiwum AI — dane demonstracyjne. Wszystkie firmy, osoby, adresy i dokumenty są FIKCYJNE.
 * Domeny e-mail w przykładach to *.example (zarezerwowane, nieistniejące).
 * Strona dokumentu: { n, h?: [[etykieta, wartość]], p?: [[id, tekst]], table?: { head, rows: [[id, [komórki]]] } }
 */
window.ARCH = (function () {
  'use strict';

  var SRC = {
    poczta: { name: 'Poczta', hint: 'IMAP / Exchange' },
    dysk: { name: 'Dysk sieciowy', hint: 'Udziały SMB' },
    skany: { name: 'Skany OCR', hint: 'pol · deu · eng · rus' },
    kalendarz: { name: 'Kalendarz', hint: 'Exchange / CalDAV' }
  };

  var SPRAWY = {
    kessbrand: 'Kessbrand — dostawy i ceny 2027',
    tervanik: 'Tervanik — reklamacja ZK-200 (IX GC 812/26)',
    loftmere: 'Loftmere — zapytanie ofertowe 2027'
  };

  var USERS = {
    prawny: { name: 'Anna Wiśniewska', role: 'Zarząd i dział prawny', short: 'A. Wiśniewska', vocative: 'Anno', depts: ['zakupy', 'prawny', 'zarzad', 'sprzedaz'] },
    zakupy: { name: 'Tomasz Lesiak', role: 'Dział zakupów', short: 'T. Lesiak', vocative: 'Tomaszu', depts: ['zakupy'] }
  };

  var DOCS = [
    {
      id: 'D01', file: 'Umowa_ramowa_dostaw_Kessbrand_2025.pdf', type: 'PDF', lang: 'PL', src: 'dysk', path: '\\\\FS01\\Zakupy\\Umowy\\', pages: 6,
      date: '15.01.2025', dept: ['zakupy', 'prawny'], sprawa: 'kessbrand',
      ent: [['Strony', 'Morvelin Sp. z o.o.; Kessbrand Antriebstechnik GmbH'], ['Nr umowy', 'ZK/2025/004'], ['Data', '15.01.2025'], ['Kluczowe zapisy', 'dostawa 6 tyg.; zmiana cen — 60 dni wyprzedzenia; płatność 30 dni od doręczenia faktury']],
      body: [
        { n: 1, p: [
          ['a', 'UMOWA RAMOWA DOSTAW nr ZK/2025/004 zawarta w dniu 15 stycznia 2025 r. w Poznaniu pomiędzy Morvelin Sp. z o.o. z siedzibą w Poznaniu („Zamawiający”) a Kessbrand Antriebstechnik GmbH z siedzibą w Chemnitz („Dostawca”).'],
          ['b', '§ 1. Przedmiotem umowy są dostawy motoreduktorów serii KB oraz części zamiennych na podstawie zamówień częściowych składanych przez Zamawiającego.']
        ] },
        { n: 3, p: [
          ['a', '§ 5 ust. 1. Dostawca realizuje zamówienie w terminie 6 tygodni od jego potwierdzenia.'],
          ['b', '§ 5 ust. 2. O każdym zagrożeniu terminu dostawy Dostawca informuje Zamawiającego niezwłocznie, nie później niż w ciągu 3 dni roboczych od powzięcia wiadomości.'],
          ['c', '§ 5 ust. 3. Za każdy dzień opóźnienia Zamawiający może naliczyć karę umowną w wysokości 0,2% wartości netto opóźnionej dostawy, łącznie nie więcej niż 10% tej wartości.']
        ] },
        { n: 4, p: [
          ['a', '§ 7 ust. 1. Ceny określa cennik stanowiący załącznik nr 1 do umowy.'],
          ['b', '§ 7 ust. 2. Dostawca może zmienić ceny nie częściej niż raz w roku kalendarzowym, zawiadamiając Zamawiającego na piśmie co najmniej 60 dni przed dniem wejścia zmiany w życie.'],
          ['c', '§ 7 ust. 3. Zmiana cen o więcej niż 5% uprawnia Zamawiającego do wypowiedzenia umowy z zachowaniem 30-dniowego okresu wypowiedzenia.'],
          ['d', '§ 8. Termin płatności wynosi 30 dni od daty doręczenia faktury Zamawiającemu.']
        ] },
        { n: 6, p: [
          ['a', '§ 14. Umowa zostaje zawarta na czas nieokreślony. Prawem właściwym jest prawo polskie. Spory rozstrzyga sąd właściwy dla siedziby Zamawiającego.']
        ] }
      ]
    },
    {
      id: 'D02', file: 'Kessbrand_Preisanpassung_2027.pdf', type: 'PDF', lang: 'DE', src: 'poczta', path: 'Poczta › zakupy@ › załącznik', pages: 2,
      date: '03.11.2026', dept: ['zakupy', 'prawny'], sprawa: 'kessbrand',
      dup: 'Ten sam plik zapisano też na dysku (\\\\FS01\\Zakupy\\Kessbrand\\). Duplikat scalono — w bazie jest jeden dokument.',
      ent: [['Nadawca', 'Kessbrand Antriebstechnik GmbH, Erik Vogt'], ['Dotyczy', 'umowa ZK/2025/004'], ['Kwota / zmiana', '+8,5% (średnio), od 01.01.2027'], ['Termin', 'odpowiedź do 27.11.2026']],
      body: [
        { n: 1, p: [
          ['a', 'Kessbrand Antriebstechnik GmbH · Vertrieb Osteuropa · Chemnitz, 03.11.2026'],
          ['b', 'Betreff: Preisanpassung zum 01.01.2027 — Rahmenvertrag ZK/2025/004'],
          ['c', 'Sehr geehrte Damen und Herren, aufgrund der anhaltend gestiegenen Kosten für Stahl, Kupfer und Energie sehen wir uns gezwungen, die Preise für Getriebemotoren der Baureihe KB zum 01.01.2027 um durchschnittlich 8,5 % anzupassen. Ersatzteile sind von der Anpassung nicht betroffen.'],
          ['d', 'Wir bitten Sie, uns Ihre Rückmeldung bis zum 27.11.2026 zukommen zu lassen. Gerne erläutern wir Ihnen die Kalkulation in einem persönlichen Gespräch.']
        ] },
        { n: 2, p: [
          ['a', 'Bestellungen, die bis zum 31.12.2026 von uns bestätigt werden, liefern wir zu den bisherigen Preisen. Die neue Preisliste mit Gültigkeit ab 01.01.2027 senden wir Ihnen gesondert zu.'],
          ['b', 'Mit freundlichen Grüßen — Erik Vogt, Key Account Manager']
        ] }
      ]
    },
    {
      id: 'D03', file: 'AW_Liefertermin_Auftrag_4471.eml', type: 'EML', lang: 'DE', src: 'poczta', path: 'Poczta › zakupy@ › Odebrane', pages: 1,
      date: '10.11.2026', dept: ['zakupy'], sprawa: 'kessbrand',
      ent: [['Nadawca', 'e.vogt@kessbrand.example'], ['Zamówienie', '4471 — 120 szt. KB-40'], ['Nowy termin', 'KW 50 (07–11.12.2026)'], ['Przyczyna', 'brak łożysk u poddostawcy']],
      body: [
        { n: 1, h: [['Od', 'Erik Vogt <e.vogt@kessbrand.example>'], ['Do', 'zakupy@morvelin.example'], ['Data', '10.11.2026, 14:22'], ['Temat', 'AW: Liefertermin Auftrag 4471']], p: [
          ['a', 'Hallo Herr Lesiak, leider müssen wir den Liefertermin für Ihren Auftrag 4471 (120 Stück KB-40) verschieben. Grund ist ein Engpass bei Wälzlagern unseres Unterlieferanten.'],
          ['b', 'Neuer voraussichtlicher Liefertermin: KW 50 (07.–11.12.2026). Eine Teillieferung von 40 Stück ist bereits in KW 48 möglich.'],
          ['c', 'Wir bitten um Ihr Verständnis. Viele Grüße, Erik Vogt']
        ] }
      ]
    },
    {
      id: 'D04', file: 'Rechnung_RE-2026-10388.pdf', type: 'PDF', lang: 'DE', src: 'skany', path: 'Skaner sekretariatu › \\\\FS01\\Skany\\2026-10\\', pages: 1, ocr: 'deu',
      date: '20.10.2026', dept: ['zakupy'], sprawa: 'kessbrand',
      ent: [['Wystawca', 'Kessbrand Antriebstechnik GmbH'], ['Nr faktury', 'RE-2026-10388'], ['Kwota', '48 260,00 EUR netto'], ['Termin płatności', '19.11.2026 (wg faktury)'], ['Wpływ', '22.10.2026 (pieczęć)']],
      body: [
        { n: 1, p: [
          ['a', 'RECHNUNG Nr. RE-2026-10388 · Rechnungsdatum: 20.10.2026 · Auftrag 4398'],
          ['b', 'Kunde: Morvelin Sp. z o.o., ul. Przykładowa 18, 61-001 Poznań'],
          ['c', 'Pos. 1  Getriebemotor KB-40 · 80 Stk × 412,00 EUR = 32 960,00 EUR'],
          ['d', 'Pos. 2  Getriebemotor KB-63 · 25 Stk × 588,00 EUR = 14 700,00 EUR'],
          ['e', 'Pos. 3  Versandkosten = 600,00 EUR'],
          ['f', 'Gesamtbetrag netto: 48 260,00 EUR · Steuerfreie innergemeinschaftliche Lieferung (Reverse Charge)'],
          ['g', 'Zahlungsziel: 30 Tage netto — fällig am 19.11.2026'],
          ['h', '[pieczęć] WPŁYNĘŁO 22.10.2026 · Morvelin Sp. z o.o. · sekretariat']
        ] }
      ]
    },
    {
      id: 'D05', file: 'Preisliste_Kessbrand_2026.xlsx', type: 'XLSX', lang: 'DE', src: 'dysk', path: '\\\\FS01\\Zakupy\\Kessbrand\\', pages: 1, unit: 'ark.',
      date: '02.01.2026', dept: ['zakupy'], sprawa: 'kessbrand',
      ent: [['Dostawca', 'Kessbrand Antriebstechnik GmbH'], ['Ważność', 'rok 2026'], ['Pozycje', '5'], ['Waluta', 'EUR netto']],
      body: [
        { n: 1, sheet: 'Preise 2026', table: { head: ['Artikel', 'Bezeichnung', 'Preis 2026 (EUR)'], rows: [
          ['r1', ['KB-25', 'Getriebemotor 0,25 kW', '286,00']],
          ['r2', ['KB-40', 'Getriebemotor 0,37 kW', '412,00']],
          ['r3', ['KB-63', 'Getriebemotor 0,75 kW', '588,00']],
          ['r4', ['KB-90', 'Getriebemotor 1,5 kW', '845,00']],
          ['r5', ['ET-12', 'Dichtungssatz KB', '18,50']]
        ] } }
      ]
    },
    {
      id: 'D06', file: 'RE_Reklamacja_ZK-200_Tervanik.eml', type: 'EML', lang: 'PL', src: 'poczta', path: 'Poczta › reklamacje@ › wątek (3 wiadomości)', pages: 3,
      date: '25.08–02.10.2026', dept: ['prawny'], sprawa: 'tervanik',
      ent: [['Strony', 'Tervanik Sp. z o.o.; Morvelin Sp. z o.o.'], ['Produkt', 'zawory kulowe ZK-200, partia 2026/07 (340 szt.)'], ['Kwota', '186 400 zł (roszczenie Tervanik)'], ['Wiadomości', '3 — połączone w jeden wątek']],
      body: [
        { n: 1, h: [['Od', 'Marek Kowal <m.kowal@tervanik.example>'], ['Do', 'reklamacje@morvelin.example'], ['Data', '25.08.2026, 10:14'], ['Temat', 'Reklamacja zaworów ZK-200 — partia 2026/07']], p: [
          ['a', 'Dzień dobry, w imieniu Tervanik Sp. z o.o. zgłaszam reklamację partii zaworów kulowych ZK-200 (partia 2026/07, 340 szt., WZ 2026/0711).'],
          ['b', 'U 27 klientów końcowych stwierdzono wycieki na uszczelnieniu trzpienia. Żądamy wymiany całej partii oraz pokrycia kosztów serwisu.']
        ] },
        { n: 2, h: [['Od', 'Joanna Bielska <j.bielska@morvelin.example>'], ['Do', 'm.kowal@tervanik.example'], ['Data', '29.08.2026, 08:40'], ['Temat', 'RE: Reklamacja zaworów ZK-200 — partia 2026/07']], p: [
          ['a', 'Dzień dobry, potwierdzamy przyjęcie reklamacji.'],
          ['b', 'Prosimy o przesłanie 12 sztuk zaworów do badań w niezależnym laboratorium. Do czasu otrzymania wyników nie uznajemy żądania wymiany całej partii.']
        ] },
        { n: 3, h: [['Od', 'Marek Kowal <m.kowal@tervanik.example>'], ['Do', 'j.bielska@morvelin.example'], ['Data', '02.10.2026, 16:05'], ['Temat', 'RE: RE: Reklamacja zaworów ZK-200 — partia 2026/07']], p: [
          ['a', 'Nie zgadzamy się z wnioskami z raportu z badań. Montaż u naszych klientów wykonywali przeszkoleni instalatorzy.'],
          ['b', 'Jeżeli do 15 października nie otrzymamy propozycji ugody, skierujemy sprawę na drogę sądową. Nasze koszty szacujemy na 186 400 zł.']
        ] }
      ]
    },
    {
      id: 'D07', file: 'Odpowiedz_na_reklamacje_Tervanik_2026-09-30.docx', type: 'DOCX', lang: 'PL', src: 'dysk', path: '\\\\FS01\\Jakosc\\Reklamacje\\2026\\', pages: 2,
      date: '30.09.2026', dept: ['prawny'], sprawa: 'tervanik',
      ent: [['Autor', 'Dział jakości Morvelin'], ['Decyzja', 'uznanie częściowe'], ['Propozycja', 'wymiana 85 szt. (25% partii)'], ['Ważna do', '15.10.2026']],
      body: [
        { n: 1, p: [
          ['a', 'Dotyczy: reklamacji partii 2026/07 zaworów ZK-200 zgłoszonej 25.08.2026.'],
          ['b', 'Po analizie raportu z badań nr TR-26-1184 uznajemy reklamację w części dotyczącej 3 z 12 badanych próbek (wada materiałowa uszczelki). W pozostałych 9 przypadkach przyczyną wycieku był montaż z przekroczeniem momentu dokręcania.']
        ] },
        { n: 2, p: [
          ['a', 'Proponujemy wymianę 85 szt. zaworów z partii 2026/07 (25% partii) wraz z nowymi uszczelkami oraz pokrycie kosztów transportu. Propozycja jest ważna do 15.10.2026.'],
          ['b', 'Z poważaniem — Joanna Bielska, kierownik działu jakości']
        ] }
      ]
    },
    {
      id: 'D08', file: 'Notatka_spotkanie_Tervanik_2026-10-21.docx', type: 'DOCX', lang: 'PL', src: 'dysk', path: '\\\\FS01\\Zarzad\\Notatki\\', pages: 1,
      date: '21.10.2026', dept: ['prawny'], sprawa: 'tervanik',
      ent: [['Uczestnicy', 'J. Bielska, A. Wiśniewska (Morvelin); M. Kowal (Tervanik)'], ['Kwota', '186 400 zł'], ['Następny krok', 'decyzja zarządu do 04.11.2026']],
      body: [
        { n: 1, p: [
          ['a', 'Notatka ze spotkania z Tervanik Sp. z o.o., 21.10.2026, siedziba Morvelin. Uczestnicy: J. Bielska (jakość), A. Wiśniewska (zarząd), M. Kowal (Tervanik).'],
          ['b', 'Tervanik podtrzymuje żądanie zapłaty 186 400 zł i zapowiada pozew.'],
          ['c', 'Morvelin może rozważyć wymianę 120 szt. i rabat 5% na kolejne zamówienie — wymaga to zgody zarządu.'],
          ['d', 'Ustalenie: kolejny kontakt po decyzji zarządu, nie później niż 04.11.2026.']
        ] }
      ]
    },
    {
      id: 'D09', file: 'Test_report_TR-26-1184_ZK-200.pdf', type: 'PDF', lang: 'EN', src: 'poczta', path: 'Poczta › jakosc@ › załącznik', pages: 4,
      date: '22.09.2026', dept: ['prawny'], sprawa: 'tervanik',
      ent: [['Wystawca', 'akredytowane laboratorium badawcze (nazwa pominięta w demo)'], ['Nr raportu', 'TR-26-1184'], ['Próbki', '12 szt., partia 2026/07'], ['Wynik', '9 × montaż, 3 × wada uszczelki']],
      body: [
        { n: 1, p: [
          ['a', 'Test report No. TR-26-1184 · Ball valves ZK-200, batch 2026/07 · 12 samples received on 8 September 2026.']
        ] },
        { n: 2, p: [
          ['a', 'Pressure test at 1.5 × PN (24 bar): leakage at the stem seal was observed in 12 of 12 samples as received.']
        ] },
        { n: 3, p: [
          ['a', 'Root cause: 9 samples show deformation of the stem packing consistent with an installation torque exceeding the manufacturer’s specification (measured 38–45 Nm vs. specified max. 25 Nm). 3 samples show porosity of the PTFE seal (material defect), unrelated to installation.']
        ] },
        { n: 4, p: [
          ['a', 'Conclusion: the leakage in 9 of 12 samples is attributable to improper installation; in 3 of 12 samples to a material defect of the seal.']
        ] }
      ]
    },
    {
      id: 'D10', file: 'SO_Poznan_IX_GC_812-26_zarzadzenie.pdf', type: 'PDF', lang: 'PL', src: 'skany', path: 'Skaner sekretariatu › \\\\FS01\\Skany\\2026-11\\', pages: 2, ocr: 'pol',
      date: '29.10.2026', dept: ['prawny'], sprawa: 'tervanik',
      dup: 'Ten sam skan przyszedł też e-mailem z sekretariatu (Poczta › prawny@). Duplikat scalono — w bazie jest jeden dokument.',
      ent: [['Sąd', 'Sąd Okręgowy w Poznaniu, IX Wydział Gospodarczy'], ['Sygnatura', 'IX GC 812/26'], ['Strony', 'powód: Tervanik Sp. z o.o.; pozwany: Morvelin Sp. z o.o.'], ['Wartość przedmiotu sporu', '186 400 zł'], ['Termin', 'odpowiedź na pozew — 2 tygodnie od doręczenia (06.11.2026) → 20.11.2026']],
      body: [
        { n: 1, p: [
          ['a', 'Sąd Okręgowy w Poznaniu, IX Wydział Gospodarczy · Sygn. akt IX GC 812/26 · Poznań, dnia 29 października 2026 r.'],
          ['b', 'Powód: Tervanik Sp. z o.o. · Pozwany: Morvelin Sp. z o.o. · Wartość przedmiotu sporu: 186 400 zł.'],
          ['c', 'ZARZĄDZENIE: doręczyć pozwanemu odpis pozwu wraz z załącznikami i zobowiązać go do złożenia odpowiedzi na pozew w terminie dwóch tygodni od dnia doręczenia.'],
          ['d', 'Pouczenie: w sprawie gospodarczej pozwany powinien powołać wszystkie twierdzenia i dowody w odpowiedzi na pozew; twierdzenia i dowody powołane później mogą zostać pominięte.']
        ] },
        { n: 2, p: [
          ['a', 'Potwierdzenie odbioru: przesyłkę doręczono dnia 06.11.2026 r. · pieczęć i podpis: sekretariat Morvelin Sp. z o.o.']
        ] }
      ]
    },
    {
      id: 'D11', file: 'Loftmere_RFQ_ZK-200_2027.eml', type: 'EML', lang: 'EN', src: 'poczta', path: 'Poczta › sprzedaz@ › Odebrane', pages: 1,
      date: '12.11.2026', dept: ['sprzedaz'], sprawa: 'loftmere',
      ent: [['Nadawca', 'Loftmere Engineering Ltd, Helen Marsh'], ['Przedmiot', '1200 szt. ZK-200 (DN 25, PN 16), 4 dostawy w 2027'], ['Warunki', 'EUR, FCA Poznań, deklaracja PED'], ['Termin', 'oferta do 18.11.2026']],
      body: [
        { n: 1, h: [['Od', 'Helen Marsh <procurement@loftmere.example>'], ['Do', 'sprzedaz@morvelin.example'], ['Data', '12.11.2026, 09:05'], ['Temat', 'RFQ — ball valves ZK-200, 1,200 pcs, deliveries 2027']], p: [
          ['a', 'Dear Sir or Madam, we would like to request a quotation for 1,200 ball valves ZK-200 (DN 25, PN 16), to be delivered in four quarterly lots in 2027.'],
          ['b', 'Please include the unit price (EUR, FCA Poznań), the lead time and a declaration of conformity with the Pressure Equipment Directive (PED).'],
          ['c', 'We would appreciate receiving your offer by 18 November 2026. Kind regards, Helen Marsh, Procurement Lead, Loftmere Engineering Ltd']
        ] }
      ]
    },
    {
      id: 'D12', file: 'Kalendarz_A_Wisniewska.ics', type: 'ICS', lang: 'PL', src: 'kalendarz', path: 'Kalendarz Exchange › A. Wiśniewska', pages: 1,
      date: '16–20.11.2026', dept: ['zarzad'], sprawa: null,
      ent: [['Właściciel', 'Anna Wiśniewska'], ['Zakres', '16–20.11.2026'], ['Wydarzenia', '5']],
      body: [
        { n: 1, p: [
          ['a', 'pon. 16.11.2026, 09:00–10:00 · Odprawa tygodniowa zarządu · sala 2'],
          ['b', 'wt. 17.11.2026, 08:00–16:00 · Audyt klienta w zakładzie (cały dzień)'],
          ['c', 'śr. 18.11.2026, 10:00–11:30 · Przegląd budżetu 2027'],
          ['d', 'czw. 19.11.2026, 14:00–15:00 · Rozmowa z Kessbrand (E. Vogt) — ceny 2027 · Teams'],
          ['e', 'pt. 20.11.2026, 10:00–11:00 · Komitet jakości']
        ] }
      ]
    },
    {
      id: 'D13', file: 'Protokol_zarzadu_2026-11-02.docx', type: 'DOCX', lang: 'PL', src: 'dysk', path: '\\\\FS01\\Zarzad\\Protokoly\\', pages: 2,
      date: '02.11.2026', dept: ['zarzad'], sprawa: null,
      ent: [['Organ', 'Zarząd Morvelin Sp. z o.o.'], ['Sprawy', 'Tervanik; dostawy Kessbrand'], ['Decyzje', 'bez nowej propozycji dla Tervanik; podwyżka cen akceptowalna maks. 4%'], ['Termin', 'zapytanie do alternatywnego dostawcy do 30.11.2026']],
      body: [
        { n: 1, p: [
          ['a', 'Protokół z posiedzenia zarządu Morvelin Sp. z o.o. z dnia 2 listopada 2026 r. Obecni: wszyscy członkowie zarządu.'],
          ['b', 'Ad 2. Spór z Tervanik: zarząd nie wyraża zgody na wymianę 120 szt. i rabat 5%; podtrzymuje propozycję z 30.09.2026. W razie pozwu prowadzenie sprawy zostanie zlecone kancelarii zewnętrznej.']
        ] },
        { n: 2, p: [
          ['a', 'Ad 3. Dostawy Kessbrand: w razie podwyżki cen na 2027 r. akceptowalny poziom wynosi maksymalnie 4%. Informacja wewnętrzna — nie przekazywać dostawcy.'],
          ['b', 'Dział zakupów przygotuje do 30.11.2026 zapytanie ofertowe do alternatywnego dostawcy motoreduktorów.']
        ] }
      ]
    },
    {
      id: 'D14', file: 'Kalendarz_Dzial_zakupow.ics', type: 'ICS', lang: 'PL', src: 'kalendarz', path: 'Kalendarz Exchange › Dział zakupów', pages: 1,
      date: '16–20.11.2026', dept: ['zakupy'], sprawa: 'kessbrand',
      ent: [['Właściciel', 'Dział zakupów'], ['Zakres', '16–20.11.2026'], ['Wydarzenia', '3']],
      body: [
        { n: 1, p: [
          ['a', 'śr. 18.11.2026, 10:00–11:00 · Inwentaryzacja magazynu napędów'],
          ['b', 'czw. 19.11.2026, 14:00–15:00 · Rozmowa z Kessbrand (E. Vogt) — ceny 2027 · Teams'],
          ['c', 'pt. 20.11.2026, 12:00–13:00 · Przegląd zamówień otwartych']
        ] }
      ]
    },
    {
      id: 'D15', file: 'NDA_Loftmere_Morvelin_2026.pdf', type: 'PDF', lang: 'EN', src: 'dysk', path: '\\\\FS01\\Sprzedaz\\Umowy\\', pages: 3,
      date: '14.09.2026', dept: ['sprzedaz', 'prawny'], sprawa: 'loftmere',
      ent: [['Strony', 'Morvelin Sp. z o.o.; Loftmere Engineering Ltd'], ['Rodzaj', 'wzajemna umowa o zachowaniu poufności'], ['Okres poufności', '3 lata po rozwiązaniu'], ['Prawo właściwe', 'Anglii i Walii']],
      body: [
        { n: 1, p: [
          ['a', 'Mutual Non-Disclosure Agreement dated 14 September 2026 between Morvelin Sp. z o.o., Poznań, Poland, and Loftmere Engineering Ltd, United Kingdom.']
        ] },
        { n: 2, p: [
          ['a', 'Clause 4 — Term. The confidentiality obligations under this Agreement shall survive for three (3) years after its termination.']
        ] },
        { n: 3, p: [
          ['a', 'Clause 9 — Governing law. This Agreement shall be governed by the laws of England and Wales.']
        ] }
      ]
    }
  ];

  /* Terminy wyodrębnione z dokumentów (w demo przygotowane wcześniej). */
  var TERMS = [
    { d: 'śr. 18.11', y: '2026', what: 'Oferta dla Loftmere (1200 szt. ZK-200)', cite: 'D11:1:c', week: true },
    { d: 'czw. 19.11', y: '2026', what: 'Płatność faktury RE-2026-10388 — 48 260,00 EUR', cite: 'D04:1:g', week: true },
    { d: 'czw. 19.11', y: '14:00', what: 'Rozmowa z Kessbrand — ceny 2027', cite: 'D14:1:b', week: true },
    { d: 'pt. 20.11', y: '2026', what: 'Odpowiedź na pozew, sygn. IX GC 812/26', cite: 'D10:1:c', week: true, urgent: true },
    { d: '27.11', y: '2026', what: 'Stanowisko wobec podwyżki cen Kessbrand', cite: 'D02:1:d' },
    { d: '30.11', y: '2026', what: 'Zapytanie do alternatywnego dostawcy', cite: 'D13:2:b' },
    { d: '07–11.12', y: '2026', what: 'Nowy termin dostawy zamówienia 4471', cite: 'D03:1:b' },
    { d: '01.01', y: '2027', what: 'Nowe ceny Kessbrand (+8,5%)', cite: 'D02:1:c' }
  ];

  return { SRC: SRC, SPRAWY: SPRAWY, USERS: USERS, DOCS: DOCS, TERMS: TERMS };
})();
