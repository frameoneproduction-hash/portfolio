(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };

  // Zakładki
  document.querySelectorAll('[data-tab]').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('[data-tab]').forEach(function (x) { x.setAttribute('aria-selected', String(x === b)); });
      $('#promotor').hidden = b.dataset.tab !== 'promotor';
      $('#admin').hidden = b.dataset.tab !== 'admin';
    });
  });

  // Historia miesięcy (słupki)
  var months = [['cze', 12], ['lip', 18], ['sie', 15], ['wrz', 24], ['paź', 31], ['lis', 38]];
  var max = 40, g = $('#bars'), w = 46, gap = 24, x0 = 22, svg = '';
  months.forEach(function (m, i) {
    var h = Math.round(m[1] / max * 130), x = x0 + i * (w + gap), last = i === months.length - 1;
    svg += '<rect x="' + x + '" y="' + (160 - h) + '" width="' + w + '" height="' + h + '" rx="10" fill="' + (last ? '#c8ff3d' : '#3a3a46') + '"/>' +
      '<text x="' + (x + w / 2) + '" y="' + (152 - h) + '" text-anchor="middle" font-size="13" font-weight="700" fill="' + (last ? '#c8ff3d' : '#f4f4f6') + '">' + m[1] + '</text>' +
      '<text x="' + (x + w / 2) + '" y="178" text-anchor="middle" font-size="12" fill="#a3a3b2">' + m[0] + '</text>';
  });
  g.innerHTML = svg;

  // Ranking
  var board = [[1, 'Oliwia M.', 71], [2, 'Kuba R.', 64], [3, 'Natalia W.', 59], [4, 'Maja S.', 47], [5, 'Szymon L.', 44], [7, 'Ty — Zuza K.', 38, true]];
  $('#board').innerHTML = board.map(function (r) {
    return (r[3] ? '<li class="gap" aria-hidden="true">…</li>' : '') + '<li class="' + (r[3] ? 'me' : (r[0] <= 3 ? 'top' : '')) + '"><span class="pos">#' + r[0] + '</span><span class="n">' + r[1] + '</span><span class="x">' + r[2] + ' zam.</span></li>';
  }).join('');

  // Kopiuj kod
  $('#copy').addEventListener('click', function () {
    var b = this;
    var done = function (ok) { b.textContent = ok ? 'Skopiowano ✓' : 'Zaznacz i skopiuj'; setTimeout(function () { b.textContent = 'Kopiuj'; }, 1500); };
    try { navigator.clipboard.writeText($('#mycode').textContent).then(function () { done(true); }, function () { done(false); }); } catch (e) { done(false); }
  });

  // Zaplecze: przykładowy import raportu
  var promoters = { ZUZA15: 'Zuza K.', OLI10: 'Oliwia M.', KUBA10: 'Kuba R.', NATI: 'Natalia W.' };
  var report = [['#10421', 'ZUZA15', 189], ['#10422', 'OLI10', 249], ['#10423', 'zuza 15', 149], ['#10424', 'KUBA10', 99], ['#10425', 'NATKA', 219], ['#10426', 'ZUZA15', 179]];
  function norm(c) { return c.toUpperCase().replace(/\s+/g, ''); }
  function render() {
    var ok = 0, bad = 0;
    $('#tbl tbody').innerHTML = report.map(function (r, i) {
      var who = r[3] || promoters[norm(r[1])];
      if (who) ok++; else bad++;
      var cell = who ? '<span class="ok">' + who + '</span>' + (r[3] ? ' <span class="muted">(poprawione)</span>' : '') :
        '<span class="bad">nie dopasowano</span> <select data-i="' + i + '" aria-label="Przypisz zamówienie ' + r[0] + '"><option value="">przypisz…</option>' +
        Object.keys(promoters).map(function (k) { return '<option>' + promoters[k] + '</option>'; }).join('') + '</select>';
      return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + ' zł</td><td>' + cell + '</td></tr>';
    }).join('');
    $('#sum').textContent = 'Dopasowano ' + ok + ' z ' + report.length + (bad ? ' · ' + bad + ' do poprawki' : ' · wszystko przypisane');
    document.querySelectorAll('#tbl select').forEach(function (s) {
      s.addEventListener('change', function () { if (s.value) { report[+s.dataset.i][3] = s.value; render(); } });
    });
  }
  $('#imp').addEventListener('click', function () { $('#tbl').hidden = false; $('#exp').hidden = false; render(); });
  $('#csv').addEventListener('click', function () {
    var rows = [['zamowienie', 'kod', 'kwota', 'promotor']].concat(report.map(function (r) { return [r[0], r[1], r[2], r[3] || promoters[norm(r[1])] || '']; }));
    var blob = new Blob(['﻿' + rows.map(function (r) { return r.join(';'); }).join('\n')], { type: 'text/csv;charset=utf-8' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'raport-promotorzy-listopad.csv'; a.click();
  });
})();
