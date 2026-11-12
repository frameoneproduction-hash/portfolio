/*
 * Wspólny moduł demo: okno „Wyślij do wyceny” + podsumowanie PDF (A4).
 * Strona rysowana na <canvas> czcionką systemową (pełne polskie znaki), potem wstawiana do jsPDF jako obraz.
 * Dane z formularza NIE są nigdzie wysyłane — demo pobiera tylko plik PDF.
 *
 * DemoWycena.init({ brand, sub, color, title, fileName, lead, summary: () => ({ head:[[k,v]], rows:[[label, detail, value]], totals:[[label, value, bold]], notes:[...] }) })
 */
(function () {
  'use strict';
  var MM = 1654 / 210;
  var FONT = '"Segoe UI", system-ui, -apple-system, Roboto, "Helvetica Neue", Arial, sans-serif';
  var INK = '#1b1e21', MUTED = '#5a6168', LINE = '#e1ded8';
  var cfg = null, lastBlob = null;

  function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function buildDialog() {
    var d = el(
      '<dialog id="dlg" aria-labelledby="dlg-title"><div class="dlg-in">' +
      '<button type="button" class="dlg-x" id="dlg-x" aria-label="Zamknij okno"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
      '<div id="dlg-form-wrap"><h2 id="dlg-title">Wyślij do wyceny</h2><p class="dlg-lead" id="dlg-lead"></p><div class="dlg-sum" id="dlg-sum"></div>' +
      '<form id="form-wycena" novalidate><div class="f-grid">' +
      '<div class="f"><label for="f-imie">Imię i nazwisko <span class="req" aria-hidden="true">*</span></label><input id="f-imie" type="text" autocomplete="name" required maxlength="80" aria-describedby="e-imie"><p class="err" id="e-imie" hidden>Podaj imię i nazwisko.</p></div>' +
      '<div class="f"><label for="f-email">E-mail <span class="req" aria-hidden="true">*</span></label><input id="f-email" type="email" autocomplete="email" required maxlength="120" aria-describedby="e-email"><p class="err" id="e-email" hidden>Podaj poprawny adres e-mail.</p></div>' +
      '<div class="f"><label for="f-tel">Telefon <span class="muted">(opcjonalnie)</span></label><input id="f-tel" type="tel" autocomplete="tel" maxlength="20" aria-describedby="e-tel"><p class="err" id="e-tel" hidden>Numer może zawierać tylko cyfry, spacje i znak +.</p></div>' +
      '<div class="f"><label for="f-miasto">Miejscowość <span class="req" aria-hidden="true">*</span></label><input id="f-miasto" type="text" autocomplete="address-level2" required maxlength="60" aria-describedby="e-miasto"><p class="err" id="e-miasto" hidden>Podaj miejscowość.</p></div>' +
      '</div><div class="f consent"><label class="check"><input type="checkbox" id="f-rodo" required aria-describedby="e-rodo"><span>Wyrażam zgodę na przetwarzanie moich danych osobowych w celu przygotowania wyceny i kontaktu w tej sprawie.</span></label><p class="err" id="e-rodo" hidden>Zgoda jest potrzebna, aby przygotować wycenę.</p></div>' +
      '<p class="demo-note"><strong>Wersja demonstracyjna:</strong> dane nie są nigdzie wysyłane ani zapisywane — po kliknięciu pobierzesz plik PDF z podsumowaniem.</p>' +
      '<div class="dlg-actions"><button type="button" class="btn-ghost" id="dlg-cancel">Anuluj</button><button type="submit" class="btn-primary" id="dlg-submit">Pobierz podsumowanie PDF</button></div></form></div>' +
      '<div id="dlg-ok" class="ok-box" hidden tabindex="-1"><div class="ok-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div><h2>Podsumowanie gotowe</h2><p id="ok-txt"></p>' +
      '<p class="muted">W wersji produkcyjnej ten sam PDF trafia e-mailem do firmy, a klient dostaje potwierdzenie z kopią. W tym demo nic nie zostało wysłane.</p>' +
      '<div class="dlg-actions"><button type="button" class="btn-ghost" id="ok-again">Pobierz PDF ponownie</button><button type="button" class="btn-primary" id="ok-close">Zamknij</button></div></div>' +
      '</div></dialog>');
    document.body.appendChild(d);
    return d;
  }

  function fmtNr() {
    var n = new Date();
    return n.getFullYear().toString().slice(2) + String(n.getMonth() + 1).padStart(2, '0') + String(n.getDate()).padStart(2, '0') + '-' + String(n.getHours()).padStart(2, '0') + String(n.getMinutes()).padStart(2, '0');
  }

  function draw(sum, client) {
    var cv = document.createElement('canvas');
    cv.width = Math.round(210 * MM); cv.height = Math.round(297 * MM);
    var g = cv.getContext('2d');
    g.setTransform(MM, 0, 0, MM, 0, 0);
    g.fillStyle = '#fff'; g.fillRect(0, 0, 210, 297);
    function font(s, w) { g.font = (w || 400) + ' ' + s + 'px ' + FONT; }
    function text(s, x, y, size, w, color, align) { font(size, w); g.fillStyle = color || INK; g.textAlign = align || 'left'; g.fillText(s, x, y); }
    function wrap(s, maxW, size, w) { font(size, w); var words = String(s).split(/ +/), lines = [], line = ''; words.forEach(function (wd) { var t = line ? line + ' ' + wd : wd; if (g.measureText(t).width > maxW && line) { lines.push(line); line = wd; } else line = t; }); if (line) lines.push(line); return lines; }
    function rule(x1, y, x2, c, w) { g.strokeStyle = c || LINE; g.lineWidth = w || 0.25; g.beginPath(); g.moveTo(x1, y); g.lineTo(x2, y); g.stroke(); }
    function rrect(x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
    var L = 16, R = 194, y;
    g.fillStyle = cfg.color; rrect(L, 13, 10, 10, 2.2); g.fill();
    text(cfg.brand.charAt(0), L + 5, 20.4, 6, 750, '#fff', 'center');
    text(cfg.brand, L + 13, 20.2, 7.2, 700);
    text(cfg.sub, L + 13, 24.6, 3, 400, MUTED);
    text(cfg.title, R, 18.5, 5.2, 650, INK, 'right');
    text('Nr ' + sum.nr + '  ·  ' + new Date().toLocaleDateString('pl-PL'), R, 24, 3.1, 400, MUTED, 'right');
    rule(L, 30, R, LINE, 0.3);
    g.fillStyle = '#fff2cc'; rrect(L, 34, R - L, 9, 1.6); g.fill();
    text('Wersja demonstracyjna: marka, cennik i dane przykładowe. Wynik orientacyjny, nie jest ofertą handlową.', L + 4, 39.8, 3.1, 600, '#5c4400');
    y = 52;
    if (client) {
      text('Klient', L, y, 3.1, 650, MUTED); text(client, L + 30, y, 3.4, 500); y += 7;
    }
    (sum.head || []).forEach(function (h) { text(h[0], L, y, 3.1, 650, MUTED); text(h[1], L + 30, y, 3.4, 500); y += 6.2; });
    y += 3; rule(L, y, R, LINE, 0.3); y += 7;
    text('Pozycja', L, y, 3, 700, MUTED); text('Kwota netto', R, y, 3, 700, MUTED, 'right'); y += 3; rule(L, y, R, INK, 0.3); y += 6;
    (sum.rows || []).forEach(function (r) {
      if (y > 240) return;
      text(r[0], L, y, 3.5, 600);
      text(r[2], R, y, 3.5, 650, INK, 'right');
      if (r[1]) { wrap(r[1], 130, 2.9).forEach(function (ln) { y += 4.2; text(ln, L, y, 2.9, 400, MUTED); }); }
      y += 3; rule(L, y, R, LINE, 0.2); y += 6;
    });
    y += 1;
    (sum.totals || []).forEach(function (t) {
      if (t[2]) { rule(L + 90, y - 4.2, R, INK, 0.35); }
      text(t[0], L + 90, y, t[2] ? 4.4 : 3.5, t[2] ? 750 : 600);
      text(t[1], R, y, t[2] ? 4.4 : 3.5, t[2] ? 750 : 650, INK, 'right');
      y += t[2] ? 8 : 6;
    });
    y += 4;
    (sum.notes || []).forEach(function (n) { wrap(n, R - L, 2.9).forEach(function (ln) { if (y < 282) { text(ln, L, y, 2.9, 400, MUTED); y += 4.2; } }); y += 1.5; });
    rule(L, 285, R, LINE, 0.3);
    text(cfg.brand + ' — marka fikcyjna · demo narzędzia: Maria | WWW · Aplikacje · AI', L, 290, 2.7, 400, MUTED);
    return cv;
  }

  function makePdf(client) {
    var sum = cfg.summary(); sum.nr = fmtNr();
    var cv = draw(sum, client);
    var name = cfg.fileName + '-' + sum.nr + '.pdf';
    if (window.jspdf && window.jspdf.jsPDF) {
      var doc = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4' });
      doc.addImage(cv.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, 210, 297);
      lastBlob = { blob: doc.output('blob'), name: name };
    } else {
      var data = cv.toDataURL('image/png'), bin = atob(data.split(',')[1]), arr = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      lastBlob = { blob: new Blob([arr], { type: 'image/png' }), name: name.replace('.pdf', '.png') };
    }
    download();
    return sum;
  }
  function download() {
    if (!lastBlob) return;
    var a = document.createElement('a'); a.href = URL.createObjectURL(lastBlob.blob); a.download = lastBlob.name;
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }

  function init(c) {
    cfg = c;
    var dlg = buildDialog();
    var $ = function (id) { return document.getElementById(id); };
    $('dlg-lead').textContent = c.lead;
    function open() {
      var s = c.summary();
      $('dlg-sum').innerHTML = (s.head || []).slice(0, 2).map(function (h) { return '<span>' + esc(h[0]) + ': <b>' + esc(h[1]) + '</b></span>'; }).join('') +
        (s.totals && s.totals.length ? '<span>' + esc(s.totals[s.totals.length - 1][0]) + ': <b>' + esc(s.totals[s.totals.length - 1][1]) + '</b></span>' : '');
      $('dlg-form-wrap').hidden = false; $('dlg-ok').hidden = true;
      dlg.showModal(); setTimeout(function () { $('f-imie').focus(); }, 30);
    }
    function close() { dlg.close(); }
    (c.openButtons || []).forEach(function (b) { b.addEventListener('click', open); });
    $('dlg-x').addEventListener('click', close); $('dlg-cancel').addEventListener('click', close); $('ok-close').addEventListener('click', close);
    $('ok-again').addEventListener('click', download);
    $('form-wycena').addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, first = null;
      function chk(id, bad) { var f = $('f-' + id), er = $('e-' + id); er.hidden = !bad; f.setAttribute('aria-invalid', bad ? 'true' : 'false'); if (bad) { ok = false; first = first || f; } }
      chk('imie', $('f-imie').value.trim().length < 2);
      chk('email', !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test($('f-email').value.trim()));
      chk('tel', $('f-tel').value.trim() !== '' && !/^[0-9 +]{6,20}$/.test($('f-tel').value.trim()));
      chk('miasto', $('f-miasto').value.trim().length < 2);
      chk('rodo', !$('f-rodo').checked);
      if (!ok) { first.focus(); return; }
      $('dlg-submit').disabled = true;
      setTimeout(function () {
        var client = $('f-imie').value.trim() + ' · ' + $('f-miasto').value.trim();
        makePdf(client);
        $('dlg-submit').disabled = false;
        $('ok-txt').textContent = 'Plik PDF z podsumowaniem został pobrany na Twoje urządzenie.';
        $('dlg-form-wrap').hidden = true; $('dlg-ok').hidden = false; $('dlg-ok').focus();
      }, 60);
    });
  }

  function preview(client) { var sum = cfg.summary(); sum.nr = fmtNr(); return draw(sum, client || 'Jan Przykładowy · Łódź').toDataURL('image/png'); }
  window.DemoWycena = { init: init, makePdf: makePdf, preview: preview };
  window.DemoFmt = {
    zl: function (v) { return Math.round(v).toLocaleString('pl-PL').replace(/ /g, ' ') + ' zł'; },
    num: function (v, d) { return Number(v).toLocaleString('pl-PL', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }).replace(/ /g, ' '); },
    toast: function (msg) { var t = document.getElementById('toast'); if (!t) return; t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 2400); },
    rangeFill: function (r) { var p = (r.value - r.min) / (r.max - r.min) * 100; r.style.setProperty('--p', p + '%'); }
  };
})();
