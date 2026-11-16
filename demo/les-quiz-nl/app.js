(function () {
  var tabs = [document.getElementById('tab-les'), document.getElementById('tab-quiz')];
  var views = [document.getElementById('view-les'), document.getElementById('view-quiz')];

  function show(i, focusTab) {
    tabs.forEach(function (t, j) {
      var on = i === j;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      views[j].hidden = !on;
    });
    if (focusTab) tabs[i].focus();
    window.scrollTo(0, 0);
  }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { show(i); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        show(i === 0 ? 1 : 0, true);
      }
    });
  });

  document.getElementById('completeBtn').addEventListener('click', function () {
    show(1);
    document.querySelector('#view-quiz h1').setAttribute('tabindex', '-1');
    document.querySelector('#view-quiz h1').focus();
  });

  var menuBtn = document.getElementById('menuBtn');
  var outline = document.getElementById('outline');
  menuBtn.addEventListener('click', function () {
    var open = outline.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  var explain = {
    q1: 'Met “hoe” laat je de ouder zelf vertellen wat er gebeurde. De andere twee vragen kun je met ja of nee beantwoorden.',
    q2: 'Door even te wachten geef je de ouder ruimte om na te denken. Vaak volgt dan het belangrijkste antwoord.'
  };

  Array.prototype.forEach.call(document.querySelectorAll('form.question'), function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fb = form.querySelector('.feedback');
      var chosen = form.querySelector('input:checked');
      Array.prototype.forEach.call(form.querySelectorAll('.opt'), function (o) {
        o.classList.remove('is-correct', 'is-wrong');
      });
      fb.className = 'feedback';
      if (!chosen) {
        fb.classList.add('none');
        fb.innerHTML = '<strong>Kies eerst een antwoord.</strong>';
        return;
      }
      var correct = form.querySelector('input[data-correct]');
      correct.closest('.opt').classList.add('is-correct');
      if (chosen === correct) {
        fb.classList.add('ok');
        fb.innerHTML = '<strong>✓ Goed!</strong><span>' + explain[form.id] + '</span>';
      } else {
        chosen.closest('.opt').classList.add('is-wrong');
        fb.classList.add('bad');
        fb.innerHTML = '<strong>✗ Niet helemaal.</strong><span>' + explain[form.id] + '</span>';
      }
    });
  });
})();
