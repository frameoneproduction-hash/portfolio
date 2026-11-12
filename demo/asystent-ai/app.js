/* Szprychlo — demo asystenta AI. Odpowiedzi z reguł zbudowanych na cenniku i regulaminie (bez modelu AI, bez serwera). */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };

  var CENNIK = [
    { n: 'Przegląd podstawowy', o: 'regulacja przerzutek i hamulców, smarowanie łańcucha, kontrola śrub, pompowanie kół', c: '149 zł', k: ['przeglad podstawowy', 'przeglad', 'serwis roweru', 'regulacja', 'przerzutk'] },
    { n: 'Przegląd rozszerzony', o: 'przegląd podstawowy + mycie napędu, centrowanie kół, regulacja sterów i piast', c: '249 zł', k: ['przeglad rozszerzony', 'rozszerzony', 'pelny przeglad', 'duzy przeglad', 'mycie napedu'] },
    { n: 'Przegląd roweru elektrycznego', o: 'przegląd rozszerzony + diagnostyka silnika i baterii, aktualizacja oprogramowania', c: '299 zł', k: ['e-bike', 'ebike', 'elektryk', 'elektryczn', 'bateri', 'akumulator', 'silnik'] },
    { n: 'Wymiana dętki', o: 'robocizna; dętka od 25 zł', c: '35 zł', k: ['detk', 'kapc', 'przebit', 'guma'] },
    { n: 'Wymiana opony', o: 'za koło; opona według wyboru', c: '40 zł', k: ['opon'] },
    { n: 'Centrowanie koła', o: 'jedno koło', c: '50 zł', k: ['centrowan', 'bicie kola', 'scentrowa', 'osemk', 'krzywe kolo'] },
    { n: 'Wymiana łańcucha', o: 'robocizna; łańcuch od 79 zł', c: '30 zł', k: ['lancuch'] },
    { n: 'Odpowietrzenie hamulców hydraulicznych', o: 'za jeden hamulec', c: '80 zł', k: ['odpowietrz', 'hydraul', 'hamulec miekki', 'miekki hamulec'] },
    { n: 'Wymiana klocków hamulcowych', o: 'za hamulec; klocki od 49 zł', c: '30 zł', k: ['klock', 'piszcz'] },
    { n: 'Serwis amortyzatora', o: 'mały serwis: dolne golenie, uszczelki, olej', c: '199 zł', k: ['amortyzator', 'widelec', 'damper', 'zawieszen'] },
    { n: 'Konwersja na bezdętki', o: 'dwa koła; mleko uszczelniające w cenie', c: '120 zł', k: ['bezdetk', 'tubeless', 'mleko'] },
    { n: 'Przechowanie roweru zimą', o: 'za miesiąc', c: '39 zł', k: ['przechowa', 'zim', 'garaz'] }
  ];
  var REG = [
    { t: 'Godziny otwarcia: poniedziałek–piątek 10:00–18:00, sobota 10:00–14:00, w niedziele i święta zamknięte.', k: ['godzin', 'otwar', 'czynne', 'kiedy jestescie', 'sobot', 'niedziel'] },
    { t: 'Czas realizacji: przegląd podstawowy zwykle 2 dni robocze; od kwietnia do czerwca do 5 dni roboczych.', k: ['ile trwa', 'czas', 'kiedy odbior', 'kiedy bedzie gotow', 'jak dlugo', 'termin'] },
    { t: 'Rezerwacja terminu: przez formularz na stronie lub na miejscu; zgłoszenie bez rezerwacji przyjmujemy, jeśli jest miejsce.', k: ['rezerw', 'zapis', 'umowic', 'wizyt'] },
    { t: 'Diagnoza przy oddaniu roweru jest bezpłatna. Dodatkowe koszty powyżej 50 zł wykonujemy dopiero po zgodzie klienta.', k: ['diagnoz', 'wycen', 'za darmo', 'bezplat', 'dodatkow'] },
    { t: 'Gwarancja: 30 dni na wykonaną usługę; na części według gwarancji producenta.', k: ['gwaranc', 'reklamac'] },
    { t: 'Płatność: gotówka, karta lub BLIK przy odbiorze roweru.', k: ['platn', 'zaplac', 'karta', 'blik', 'gotowk', 'faktur'] },
    { t: 'Odbiór i dowóz roweru na terenie Łodzi: 49 zł w jedną stronę.', k: ['odbior z domu', 'dowoz', 'transport', 'odbierzecie', 'przyjedziecie', 'dojazd'] }
  ];

  function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l').replace(/[^a-z0-9 \-]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  CENNIK.forEach(function (x) { x.k = x.k.map(norm); });
  REG.forEach(function (x) { x.k = x.k.map(norm); });

  function score(q, keys) {
    var s = 0; keys.forEach(function (k) { if (q.indexOf(k) !== -1) s += k.length; }); return s;
  }
  function best(list, q) {
    var top = null, ts = 0;
    list.forEach(function (x, i) { var s = score(q, x.k); if (s > ts) { ts = s; top = i; } });
    return { i: top, s: ts };
  }

  function answer(raw) {
    var q = norm(raw);
    if (!q) return null;
    if (/^(czesc|hej|dzien dobry|witam|siema|dobry wieczor)\b/.test(q) && q.split(' ').length <= 3)
      return { t: 'Dzień dobry! Zapytaj o cenę usługi, czas naprawy, godziny otwarcia albo odbiór roweru z domu.' };
    if (/(dzieki|dziekuje)/.test(q)) return { t: 'Proszę bardzo! Gdyby coś jeszcze było niejasne, pisz śmiało.' };
    if (/(czlowiek|konsultant|mechanik|telefon|zadzwon|rozmawiac z)/.test(q))
      return { t: 'Jasne, przekażę Twoją wiadomość mechanikowi. Zostaw imię i e-mail, a odpisze w godzinach pracy serwisu.', handoff: true };
    // pytania złożone: odpowiadamy na każdą część osobno
    var parts = raw.split(/\s+(?:i|oraz|a także|a)\s+|[,;?]+/i).map(function (p) { return p.trim(); })
      .filter(function (p) {
        var STOP = ['ile', 'to', 'kosztuje', 'koszt', 'cena', 'jaka', 'jest', 'za', 'czy', 'mi', 'prosze', 'dzieki', 'dziekuje', 'pozdrawiam', 'dzien', 'dobry', 'czesc', 'hej', 'witam', 'mozna', 'mozecie', 'powiedziec', 'u', 'was', 'pan', 'pani', 'bedzie'];
        return norm(p).split(' ').some(function (w) { return w.length > 1 && STOP.indexOf(w) === -1; });
      });
    if (parts.length <= 1) {
      var one = part(raw);
      if (!one.miss) return one;
      if (/(ile|koszt|cena|cenn|za ile|placi|zl\b|marka|model|shimano|sram|czesc|rama|lakier|spawan)/.test(q))
        return { t: 'Tego nie ma w naszym cenniku ani regulaminie, więc nie podam ceny na oko. Mogę przekazać pytanie mechanikowi: zostaw imię i e-mail, a odpisze z wyceną.', handoff: true };
      return { t: 'Nie znalazłem tego w cenniku ani w regulaminie. Mogę przekazać pytanie mechanikowi — zostaw imię i e-mail.', handoff: true };
    }
    var ok = [], miss = [], src = [];
    parts.forEach(function (p) {
      var a = part(p);
      if (a.miss) miss.push(p); else { ok.push(a.t); (a.src || []).forEach(function (s) { if (!src.some(function (x) { return x[0] === s[0] && x[1] === s[1]; })) src.push(s); }); }
    });
    if (!ok.length) return { t: 'Nie znalazłem tego w cenniku ani w regulaminie. Mogę przekazać pytanie mechanikowi — zostaw imię i e-mail.', handoff: true };
    var t = ok.join('\n\n');
    if (miss.length) t += '\n\nNie mam informacji o: ' + miss.map(function (m) { return '„' + m + '”'; }).join(', ') + ' — przekażę to pytanie mechanikowi.';
    return { t: t, src: src, handoff: miss.length > 0 };
  }

  function part(raw) {
    var q = norm(raw);
    var c = best(CENNIK, q), r = best(REG, q);
    var priceAsk = /(ile|koszt|cena|cenn|za ile|placi|zl\b)/.test(q);
    if (/przeglad/.test(q)) {
      if (/(e-bike|ebike|e bike|elektry)/.test(q)) c = { i: 2, s: 99 };
      else if (/(rozszerz|pelny|duzy)/.test(q)) c = { i: 1, s: 99 };
    }
    if (c.s && (c.s >= r.s || priceAsk)) {
      var x = CENNIK[c.i];
      if (c.i === 0 && /przeglad/.test(q) && !/podstaw/.test(q))
        return { t: 'Mamy trzy przeglądy:\n• podstawowy — 149 zł\n• rozszerzony (z myciem napędu i centrowaniem kół) — 249 zł\n• roweru elektrycznego — 299 zł', src: [['c', 0], ['c', 1], ['c', 2]] };
      var yes = /^czy\b/.test(q) || (c.i === 2 && /(serwisujecie|naprawiacie|robicie)/.test(q));
      return { t: (yes ? 'Tak. ' : '') + x.n + ': ' + x.c + ' (' + x.o + ').', src: [['c', c.i]] };
    }
    if (r.s) return { t: REG[r.i].t, src: [['r', r.i]] };
    return { miss: true };
  }

  var log = $('log');
  function scrollEnd() { log.scrollTop = log.scrollHeight; }
  function addMsg(who, text) {
    var d = document.createElement('div'); d.className = 'msg ' + who; d.textContent = text; log.appendChild(d); scrollEnd(); return d;
  }
  function highlight(src) {
    document.querySelectorAll('.hit').forEach(function (e) { e.classList.remove('hit'); });
    src.forEach(function (s) { var e = document.getElementById(s[0] + '-' + s[1]); if (e) e.classList.add('hit'); });
  }
  function srcLabel(s) { return s[0] === 'c' ? 'Cennik, poz. ' + (s[1] + 1) : 'Regulamin, pkt ' + (s[1] + 1); }
  function botReply(a) {
    var t = document.createElement('div'); t.className = 'typing'; t.setAttribute('aria-hidden', 'true'); t.innerHTML = '<i></i><i></i><i></i>';
    log.appendChild(t); scrollEnd();
    setTimeout(function () {
      t.remove();
      var d = addMsg('bot', a.t);
      if (a.src) {
        var s = document.createElement('span'); s.className = 'src';
        s.append('Źródło: ');
        a.src.forEach(function (x, i) {
          var b = document.createElement('button'); b.type = 'button'; b.textContent = srcLabel(x);
          b.addEventListener('click', function () { highlight([x]); var e = document.getElementById(x[0] + '-' + x[1]); if (e) e.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
          s.append(b); if (i < a.src.length - 1) s.append(', ');
        });
        d.appendChild(s); highlight(a.src);
      }
      if (a.handoff) {
        d.classList.add('handoff');
        var f = document.createElement('form'); f.className = 'hf'; f.noValidate = true;
        var id = 'h' + Date.now();
        f.innerHTML = '<label class="sr-only" for="' + id + 'n">Imię</label><input id="' + id + 'n" placeholder="Imię" autocomplete="given-name" maxlength="60">' +
          '<label class="sr-only" for="' + id + 'e">E-mail</label><input id="' + id + 'e" type="email" placeholder="E-mail" autocomplete="email" maxlength="120">' +
          '<button type="submit">Przekaż mechanikowi</button>';
        f.addEventListener('submit', function (ev) {
          ev.preventDefault();
          var e = f.querySelector('input[type=email]').value.trim();
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)) { window.DemoFmt.toast('Podaj poprawny adres e-mail.'); return; }
          f.replaceWith(Object.assign(document.createElement('span'), { className: 'src', textContent: 'Gotowe. W wersji produkcyjnej pytanie trafiłoby do serwisu; w tym demo nic nie zostało wysłane.' }));
        });
        d.appendChild(f);
      }
    }, 650);
  }
  function ask(text) {
    var tx = text.trim(); if (!tx) return;
    addMsg('me', tx);
    botReply(answer(tx));
  }

  $('cennik').innerHTML = CENNIK.map(function (x, i) { return '<tr id="c-' + i + '"><td>' + (i + 1) + '.</td><td>' + x.n + '<small>' + x.o + '</small></td><td>' + x.c + '</td></tr>'; }).join('');
  $('regulamin').innerHTML = REG.map(function (x, i) { return '<li id="r-' + i + '"><b>' + (i + 1) + '.</b> ' + x.t + '</li>'; }).join('');
  ['Ile kosztuje przegląd?', 'Wymiana dętki', 'Godziny otwarcia', 'Ile trwa naprawa?', 'Odbiór roweru z domu', 'Naprawa ramy karbonowej'].forEach(function (q) {
    var b = document.createElement('button'); b.type = 'button'; b.textContent = q; b.addEventListener('click', function () { ask(q); $('pytanie').focus(); }); $('chips').appendChild(b);
  });
  $('form').addEventListener('submit', function (e) { e.preventDefault(); var i = $('pytanie'); ask(i.value); i.value = ''; });
  addMsg('bot', 'Cześć! To demo asystenta AI serwisu rowerowego Szprychlo: nie jestem człowiekiem, a w tej wersji odpowiadam według reguł zbudowanych na cenniku i regulaminie. Jeśli czegoś tam nie ma, przekażę pytanie mechanikowi.\nW czym pomóc?');
})();
