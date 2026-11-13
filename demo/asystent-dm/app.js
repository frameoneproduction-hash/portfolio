/* Demo: AI DM assistant — scripted conversations, live guest list, CSV export. No network requests. */
(function () {
  'use strict';

  var LINK = 'link.example/mikolajki';

  /* Steps: g = guest, b = bot, sys = system note, row = guest-list update */
  var SCENARIOS = [
    {
      desc: 'A guest reacts to a story and asks about the next party. The assistant replies in Russian, discloses that it is AI, invites and confirms +1.',
      steps: [
        { g: 'а когда следующая? 🔥', lang: 'RU', story: 'Reacted 🔥 to your story' },
        { b: 'Привет! Я ИИ-ассистент [Brand] 🙂 Следующая вечеринка — Mikołajki, в пятницу, 11 декабря, с 22:00. Место: Варшава, точный адрес — в деталях. Дресс-код: что-нибудь красное или новогоднее.' },
        { b: 'Хочешь, внесу тебя в список гостей? Напиши, пожалуйста, своё имя и придёшь ли с кем-то (+1).', row: { id: 'katya', name: '@katya.waw', lang: 'RU', src: 'Story reply', status: 'invited' } },
        { g: 'Да! Катя, буду с подругой', lang: 'RU' },
        { b: 'Готово, Катя: ты в списке, +1 ✨ Билеты и детали: ' + LINK + '. Если захочешь, напиши накануне — пришлю адрес и детали. До встречи 11-го!', row: { id: 'katya', name: 'Катя', lang: 'RU', src: 'Story reply', status: 'confirmed +1' } }
      ]
    },
    {
      desc: 'A Polish-speaking guest asks about the price. The assistant answers from the price list and sends an RSVP confirmation.',
      steps: [
        { g: 'Hej, ile kosztuje wejście na 11.12?', lang: 'PL' },
        { b: 'Cześć! Tu asystent AI [Brand]. Ceny wejścia na Mikołajki (piątek, 11 grudnia, od 22:00): przedsprzedaż — 60 zł do 5 grudnia, potem 80 zł, na miejscu — 100 zł.' },
        { b: 'Dopisać Cię do listy gości? Podaj imię i daj znać, czy przyjdziesz z kimś.', row: { id: 'michal', name: '@michal_k', lang: 'PL', src: 'DM', status: 'invited' } },
        { g: 'Michał, sam', lang: 'PL' },
        { b: 'Gotowe, Michał — jesteś na liście ✅ Bilety: ' + LINK + '. Dokładny adres w Warszawie znajdziesz w szczegółach wydarzenia. Do zobaczenia 11 grudnia!', row: { id: 'michal', name: 'Michał', lang: 'PL', src: 'DM', status: 'confirmed' } }
      ]
    },
    {
      desc: 'A guest who registered last time but didn’t come gets one friendly follow-up in Russian. No reply — no further messages.',
      steps: [
        { sys: 'Follow-up: Dima confirmed the November party but didn’t come. He reacted to a story today, so Instagram’s 24-hour messaging window is open.' },
        { b: 'Привет, Дима! Это ИИ-ассистент [Brand]. Жаль, что в прошлый раз не получилось прийти. 11 декабря делаем Mikołajki — будет весело. Если интересно, просто ответь, и я пришлю детали.', row: { id: 'dima', name: 'Дима', lang: 'RU', src: 'Follow-up', status: 'invited' } },
        { sys: 'No reply in 48 hours → the assistant stops. One message only, no chasing.', stop: true, row: { id: 'dima', name: 'Дима', lang: 'RU', src: 'Follow-up', status: 'no reply' } }
      ]
    },
    {
      desc: 'A question outside the FAQ plus a complaint. The assistant apologises and hands the conversation to the team instead of guessing.',
      steps: [
        { g: 'А можно прийти с собакой? И в прошлый раз на входе была огромная очередь, это было неприятно.', lang: 'RU' },
        { b: 'Привет! Я ИИ-ассистент [Brand]. Спасибо за сообщение и извини за очередь — для нас это важно.' },
        { b: 'Вопрос про собаку и твой отзыв передаю команде: тебе ответят здесь лично в ближайшее время.', handoff: true, row: { id: 'olga', name: '@olga.dance', lang: 'RU', src: 'DM', status: 'needs human' } },
        { sys: 'The team gets a notification with the full conversation. The assistant stays silent in this chat until a person replies.' }
      ]
    }
  ];

  var ROWS = [
    { id: 'anya', name: 'Аня', lang: 'RU', src: 'Story reply', status: 'confirmed' },
    { id: 'pawel', name: 'Paweł', lang: 'PL', src: 'DM', status: 'confirmed +1' }
  ];

  var STATUS_CLASS = { 'invited': 's-inv', 'confirmed': 's-ok', 'confirmed +1': 's-ok', 'needs human': 's-human', 'no reply': 's-mute' };

  var chat = document.getElementById('chat');
  var rowsEl = document.getElementById('rows');
  var nextBtn = document.getElementById('nextBtn');
  var autoBtn = document.getElementById('autoBtn');
  var progress = document.getElementById('progress');
  var scDesc = document.getElementById('scDesc');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));

  var sc = 0, step = 0, busy = false, auto = false, timer = null, token = 0;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  function renderRows(flashId) {
    rowsEl.innerHTML = ROWS.map(function (r, i) {
      return '<tr' + (r.id === flashId ? ' class="flash"' : '') + '><td class="rownum">' + (i + 1) + '</td><td>' + esc(r.name) + '</td><td><span class="tag">' + r.lang + '</span></td><td>' + esc(r.src) + '</td>' +
        '<td><span class="status ' + (STATUS_CLASS[r.status] || '') + '">' + esc(r.status) + '</span></td></tr>';
    }).join('');
  }
  function upsert(row) {
    var ex = ROWS.filter(function (r) { return r.id === row.id; })[0];
    if (ex) { ex.name = row.name; ex.lang = row.lang; ex.src = row.src; ex.status = row.status; }
    else ROWS.push({ id: row.id, name: row.name, lang: row.lang, src: row.src, status: row.status });
    renderRows(row.id);
  }

  function addBubble(s) {
    var el = document.createElement('div');
    if (s.sys) {
      el.className = 'sys' + (s.stop ? ' sys--stop' : '');
      el.textContent = s.sys;
    } else if (s.g) {
      el.className = 'msg msg--guest';
      el.innerHTML = (s.story ? '<span class="story">' + esc(s.story) + '</span>' : '') + '<span class="bubble" lang="' + s.lang.toLowerCase() + '">' + esc(s.g) + '</span>' +
        '<span class="detect">Language detected: ' + s.lang + '</span>';
    } else {
      var l = SCENARIOS[sc].steps.filter(function (x) { return x.lang; })[0];
      var lang = l ? l.lang.toLowerCase() : 'ru';
      el.className = 'msg msg--bot';
      el.innerHTML = '<span class="bubble" lang="' + lang + '">' + esc(s.b) + '</span>' + (s.handoff ? '<span class="handoff">Handed off to the team · needs human</span>' : '');
    }
    chat.appendChild(el);
    chat.scrollTop = chat.scrollHeight;
  }
  function typing(on) {
    var t = document.getElementById('typing');
    if (on && !t) {
      t = document.createElement('div');
      t.id = 'typing'; t.className = 'msg msg--bot';
      t.innerHTML = '<span class="bubble typing" aria-label="Assistant is typing"><i></i><i></i><i></i></span>';
      chat.appendChild(t); chat.scrollTop = chat.scrollHeight;
    } else if (!on && t) t.remove();
  }
  function updateUi() {
    var total = SCENARIOS[sc].steps.length;
    progress.textContent = step >= total ? 'Conversation finished' : 'Step ' + step + ' of ' + total;
    nextBtn.disabled = busy || step >= total;
  }

  function next() {
    var steps = SCENARIOS[sc].steps;
    if (busy || step >= steps.length) return;
    var s = steps[step], my = token;
    busy = true; updateUi();
    var delay = reduced ? 0 : (s.b ? Math.min(1600, 500 + s.b.length * 8) : 350);
    if (s.b) typing(true);
    setTimeout(function () {
      if (my !== token) return;
      typing(false);
      addBubble(s);
      if (s.row) upsert(s.row);
      step++; busy = false; updateUi();
      if (auto) schedule();
    }, delay);
  }
  function schedule() {
    clearTimeout(timer);
    if (step >= SCENARIOS[sc].steps.length) { setAuto(false); return; }
    timer = setTimeout(next, reduced ? 300 : 900);
  }
  function setAuto(on) {
    auto = on;
    autoBtn.setAttribute('aria-pressed', String(on));
    autoBtn.textContent = on ? 'Pause' : 'Auto-play';
    if (on) { if (step >= SCENARIOS[sc].steps.length) restart(); schedule(); } else clearTimeout(timer);
  }
  function restart() {
    token++; clearTimeout(timer);
    busy = false; step = 0; chat.innerHTML = '';
    scDesc.textContent = SCENARIOS[sc].desc;
    updateUi();
  }
  function select(i, focus) {
    sc = i;
    tabs.forEach(function (t, k) {
      t.setAttribute('aria-selected', String(k === i)); t.tabIndex = k === i ? 0 : -1;
    });
    document.getElementById('stage').setAttribute('aria-labelledby', 'tab-' + i);
    if (focus) tabs[i].focus();
    var wasAuto = auto;
    restart();
    if (wasAuto) schedule();
  }

  tabs.forEach(function (t, k) {
    t.addEventListener('click', function () { select(k); });
    t.addEventListener('keydown', function (e) {
      var i = k;
      if (e.key === 'ArrowRight') i = (k + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') i = (k - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') i = 0;
      else if (e.key === 'End') i = tabs.length - 1;
      else return;
      e.preventDefault(); select(i, true);
    });
  });
  nextBtn.addEventListener('click', next);
  autoBtn.addEventListener('click', function () { setAuto(!auto); });
  document.getElementById('restartBtn').addEventListener('click', function () { setAuto(false); restart(); });

  /* CSV (UTF-8 z BOM, średniki — Excel otwiera poprawnie cyrylicę i polskie znaki) */
  document.getElementById('csvBtn').addEventListener('click', function () {
    function cell(v) { v = String(v); return /[;"\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
    var lines = [['Name', 'Language', 'Source', 'Status', 'Event'].join(';')].concat(ROWS.map(function (r) {
      return [r.name, r.lang, r.src, r.status, 'Mikołajki 11.12'].map(cell).join(';');
    }));
    var blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'guest-list-mikolajki.csv';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  });

  /* Parametry do zrzutów: ?sc=2&steps=5 */
  var p = new URLSearchParams(location.search);
  renderRows();
  select(Math.max(0, Math.min(3, (+p.get('sc') || 1) - 1)));
  var pre = +p.get('steps') || 0;
  if (pre) {
    var keep = reduced; reduced = true;
    for (var i = 0; i < pre; i++) { busy = false; var s = SCENARIOS[sc].steps[step]; if (!s) break; addBubble(s); if (s.row) upsert(s.row); step++; }
    reduced = keep; renderRows(); updateUi();
  }
})();
