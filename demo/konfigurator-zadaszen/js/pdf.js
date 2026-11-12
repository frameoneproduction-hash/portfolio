/*
 * Tarvio — podsumowanie PDF.
 * Strona A4 jest rysowana na <canvas> czcionką systemową (pełne polskie znaki: ą ć ę ł ń ó ś ź ż),
 * a następnie wstawiana do dokumentu jsPDF jako obraz. Nie wymaga osadzania pliku czcionki.
 */
(function () {
  'use strict';

  var MM = 1654 / 210;             // 200 dpi
  var FONT = '"Segoe UI", system-ui, -apple-system, Roboto, "Helvetica Neue", Arial, sans-serif';
  var INK = '#1b1e21', MUTED = '#5a6168', LINE = '#e1ded8', ACC = '#1f4f4a';

  function loadImg(src) {
    return new Promise(function (res, rej) {
      if (!src) return res(null);
      var i = new Image();
      i.onload = function () { res(i); };
      i.onerror = rej;
      i.src = src;
    });
  }

  function generate(d) {
    return loadImg(d.snapshot).then(function (img) {
      var cv = document.createElement('canvas');
      cv.width = Math.round(210 * MM); cv.height = Math.round(297 * MM);
      var g = cv.getContext('2d');
      g.setTransform(MM, 0, 0, MM, 0, 0);
      g.fillStyle = '#fff'; g.fillRect(0, 0, 210, 297);
      g.textBaseline = 'alphabetic';

      function font(size, weight) { g.font = (weight || 400) + ' ' + size + 'px ' + FONT; }
      function text(s, x, y, size, weight, color, align) {
        font(size, weight); g.fillStyle = color || INK; g.textAlign = align || 'left'; g.fillText(s, x, y);
      }
      function wrap(s, maxW, size, weight) {
        font(size, weight);
        var words = String(s).split(/ +/), lines = [], line = '';
        words.forEach(function (w) {
          var t = line ? line + ' ' + w : w;
          if (g.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t;
        });
        if (line) lines.push(line);
        return lines;
      }
      function rule(x1, y, x2, color, w) {
        g.strokeStyle = color || LINE; g.lineWidth = w || 0.25;
        g.beginPath(); g.moveTo(x1, y); g.lineTo(x2, y); g.stroke();
      }
      function rrect(x, y, w, h, r) {
        g.beginPath();
        g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
        g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
      }

      var L = 16, R = 194;

      /* nagłówek */
      g.fillStyle = ACC; rrect(L, 13, 10, 10, 2.2); g.fill();
      g.strokeStyle = '#fff'; g.lineWidth = 0.9; g.lineCap = 'round';
      g.beginPath(); g.moveTo(L + 1.9, 16.4); g.lineTo(L + 8.1, 15.2); g.moveTo(L + 2.8, 16.2); g.lineTo(L + 2.8, 21); g.moveTo(L + 7.2, 15.4); g.lineTo(L + 7.2, 21); g.stroke();
      text('Tarvio', L + 13, 20.2, 7.2, 700, INK);
      text('zadaszenia aluminiowe', L + 13, 24.6, 3, 400, MUTED);
      text('Podsumowanie konfiguracji', R, 18.5, 5.2, 650, INK, 'right');
      text('Nr ' + d.nr + '  ·  ' + d.data, R, 24, 3.1, 400, MUTED, 'right');
      rule(L, 30, R, LINE, 0.3);

      /* pasek demo */
      g.fillStyle = '#fff2cc'; rrect(L, 34, R - L, 9, 2); g.fill();
      text('DOKUMENT DEMONSTRACYJNY — marka, dane i ceny są przykładowe; dokument nie stanowi oferty handlowej.', L + 4, 39.9, 2.9, 600, '#5c4400');

      /* wizualizacja (kadr 2:1 wycięty z ujęcia 16:9) */
      var iy = 48, ih = (R - L) / 2;
      g.save(); rrect(L, iy, R - L, ih, 3); g.clip();
      if (img) {
        var sw = img.width, sh = Math.min(img.height, img.width / 2);
        g.drawImage(img, 0, (img.height - sh) * 0.6, sw, sh, L, iy, R - L, ih);
      } else {
        g.fillStyle = '#eef0f0'; g.fillRect(L, iy, R - L, ih);
        text('Podgląd 3D niedostępny w tej przeglądarce', 105, iy + ih / 2, 4, 500, MUTED, 'center');
      }
      g.restore();

      var LH = 3.9, PAD = 2.6, MAXY = 279;
      function section(title, x, yy) { text(title.toUpperCase(), x, yy, 2.9, 700, ACC); return yy + 3.2; }
      function rows(list, x, w, yy) {
        list.forEach(function (row) {
          if (row[0] === 'Uwagi' && row[1] !== '—') {
            // dłuższy tekst: etykieta nad treścią, wyrównanie do lewej, przycięcie do miejsca na stronie
            text(row[0], x, yy + 4.3, 3, 400, MUTED);
            var ls = wrap(row[1], w, 3.05, 400);
            var max = Math.max(1, Math.floor((MAXY - (yy + 8.4)) / 3.8) + 1);
            if (ls.length > max) { ls = ls.slice(0, max); ls[max - 1] = ls[max - 1].replace(/\s*\S*$/, '') + ' …'; }
            ls.forEach(function (ln, i) { text(ln, x, yy + 8.4 + i * 3.8, 3.05, 400, INK); });
            yy += 8.4 + (ls.length - 1) * 3.8 + PAD;
            return;
          }
          var labelLines = wrap(row[0], w * 0.4, 3, 400);
          var valLines = wrap(row[1], w * 0.58, 3.15, 600);
          var n = Math.max(labelLines.length, valLines.length);
          labelLines.forEach(function (ln, i) { text(ln, x, yy + 4.3 + i * LH, 3, 400, MUTED); });
          valLines.forEach(function (ln, i) { text(ln, x + w, yy + 4.3 + i * LH, 3.15, 600, INK, 'right'); });
          yy += 4.3 + (n - 1) * LH + PAD;
          rule(x, yy, x + w, LINE, 0.2);
        });
        return yy;
      }

      /* lewa kolumna: parametry + dane klienta */
      var cL = L, cW = 92;
      var y = iy + ih + 10;
      y = section('Parametry konfiguracji', cL, y);
      y = rows(d.parametry, cL, cW, y);
      y += 7;
      y = section('Dane do kontaktu', cL, y);
      rows(d.klient, cL, cW, y);

      /* prawa kolumna: cena */
      var pX = 116, pW = R - pX;
      var py = iy + ih + 10;
      py = section('Cena orientacyjna', pX, py);
      d.pozycje.forEach(function (p) {
        var nl = wrap(p[0], pW * 0.66, 3.05, 500);
        nl.forEach(function (ln, i) { text(ln, pX, py + 4.3 + i * 3.8, 3.05, 500, INK); });
        text(p[2], R, py + 4.3, 3.05, 600, INK, 'right');
        var oy = py + 4.3 + (nl.length - 1) * 3.8 + 3.5;
        text(p[1], pX, oy, 2.55, 400, MUTED);
        py = oy + 2.2;
        rule(pX, py, R, LINE, 0.2);
      });
      py += 5.6;
      text('Razem netto', pX, py, 3.2, 600, INK); text(d.netto, R, py, 3.2, 600, INK, 'right');
      py += 5;
      text(d.vatLabel, pX, py, 3, 400, MUTED); text(d.vat, R, py, 3, 400, MUTED, 'right');
      py += 3.4;
      g.fillStyle = ACC; rrect(pX, py, pW, 12, 2.2); g.fill();
      text('Razem brutto', pX + 4, py + 7.7, 3.4, 600, '#fff');
      text(d.brutto, R - 4, py + 8, 5.2, 700, '#fff', 'right');
      py += 17;
      wrap('Cena orientacyjna wyliczona na podstawie przykładowego cennika. Ostateczna oferta zostanie przygotowana po bezpłatnym pomiarze na miejscu montażu. Kolory na ekranie i wydruku są poglądowe.', pW, 2.6, 400)
        .forEach(function (ln, i) { text(ln, pX, py + i * 3.6, 2.6, 400, MUTED); });

      /* stopka */
      rule(L, 284, R, LINE, 0.3);
      text('Tarvio · konfigurator zadaszeń — demo koncepcyjne. Wygenerowano ' + d.data + '.', L, 289.5, 2.6, 400, MUTED);
      text('Strona 1/1', R, 289.5, 2.6, 400, MUTED, 'right');

      var jsPDF = window.jspdf.jsPDF;
      var doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
      doc.setProperties({ title: 'Tarvio - podsumowanie konfiguracji ' + d.nr, subject: 'Konfiguracja zadaszenia tarasu (demo)', author: 'Tarvio (demo)', creator: 'Konfigurator Tarvio' });
      doc.addImage(cv.toDataURL('image/jpeg', 0.9), 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
      if (d.link) doc.link(L, 48, R - L, (R - L) / 2, { url: d.link });
      var filename = 'Tarvio-konfiguracja-' + d.nr + '.pdf';
      return {
        filename: filename,
        doc: doc,
        save: function () { doc.save(filename); }
      };
    });
  }

  window.TarvioPDF = { generate: generate };
})();
