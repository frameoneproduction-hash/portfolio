// Demo: GA4 e-commerce events + Consent Mode v2 via dataLayer. No GTM, no Google tags, no network requests.
(function () {
  'use strict';
  var CURRENCY = 'PLN';
  var SIZES = { S: { price: 69, label: 'approx. 45 cm' }, M: { price: 119, label: 'approx. 80 cm' } };
  var SHIP = { 'Courier': 14.99, 'Parcel locker': 11.99 };
  var REQUIRED = {
    view_item: ['currency', 'value', 'items'],
    add_to_cart: ['currency', 'value', 'items'],
    view_cart: ['currency', 'value', 'items'],
    begin_checkout: ['currency', 'value', 'items'],
    add_shipping_info: ['currency', 'value', 'items'],
    add_payment_info: ['currency', 'value', 'items'],
    purchase: ['transaction_id', 'currency', 'value', 'items']
  };
  // optional in GA4, but we always send them
  var RECOMMENDED = { add_shipping_info: ['shipping_tier'], add_payment_info: ['payment_type'], purchase: ['shipping'] };

  var $ = function (id) { return document.getElementById(id); };
  var logEl = $('log');
  var count = 0;
  var cart = [];
  var sentPurchases = {};
  var lastOrder = null;
  var orderNo = 1000;

  // the page's own dataLayer; GTM would read exactly this array
  window.dataLayer = [];
  function gtag() { window.dataLayer.push(arguments); }

  function round2(n) { return Math.round(n * 100) / 100; }
  function cartValue() { return round2(cart.reduce(function (s, i) { return s + i.price * i.quantity; }, 0)); }
  function items() { return cart.map(function (i) { return Object.assign({}, i); }); }

  function add(kind, title, data, checks) {
    count++;
    $('count').textContent = count;
    var li = document.createElement('li');
    if (kind) li.className = kind;
    var ev = document.createElement('div');
    ev.className = 'ev';
    ev.textContent = title;
    var t = document.createElement('small');
    t.textContent = new Date().toLocaleTimeString('en-GB');
    ev.appendChild(t);
    li.appendChild(ev);
    if (data) {
      var pre = document.createElement('pre');
      pre.textContent = JSON.stringify(data, null, 2);
      li.appendChild(pre);
    }
    if (checks) {
      var c = document.createElement('div');
      c.className = 'chk';
      checks.forEach(function (k) {
        var s = document.createElement('span');
        s.textContent = (k.ok ? '✓ ' : '✗ ') + k.name;
        if (!k.ok) s.className = 'miss';
        c.appendChild(s);
      });
      li.appendChild(c);
    }
    logEl.prepend(li);
    logEl.scrollTop = 0;
  }

  function consentChips(state) {
    document.querySelectorAll('.states span').forEach(function (s) {
      var v = state[s.dataset.key];
      s.className = v === 'granted' ? 'on' : (v === 'denied' ? '' : 'unset');
    });
  }

  function consent(cmd, state) {
    gtag('consent', cmd, state);
    add('cons', 'consent · ' + cmd, state);
    consentChips(state);
    last('consent ' + cmd);
  }

  function ecommerce(event, params) {
    window.dataLayer.push({ ecommerce: null });
    var payload = { event: event, ecommerce: params };
    window.dataLayer.push(payload);
    var has = function (k) { var v = params[k]; return v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && !v.length); };
    var checks = REQUIRED[event].map(function (k) { return { name: k, ok: has(k) }; })
      .concat((RECOMMENDED[event] || []).map(function (k) { return { name: k + ' (recommended)', ok: has(k) }; }));
    add('', event, payload, checks);
    last(event + ' · ' + checks.map(function (c) { return (c.ok ? '✓ ' : '✗ ') + c.name; }).join('  '));
  }

  function hint(t) { $('hint').textContent = t; }
  function last(t) { $('last').textContent = 'Last event: ' + t; }
  function enable(ids, on) { ids.forEach(function (id) { $(id).disabled = !on; }); }

  function start() {
    window.dataLayer.length = 0;
    logEl.textContent = '';
    count = 0;
    cart = [];
    lastOrder = null;
    $('consent').classList.remove('done');
    document.querySelectorAll('#consent button').forEach(function (b) { b.disabled = false; });
    enable(['cart', 'checkout', 'ship', 'shipping', 'pay', 'payment', 'order', 'reload'], false);
    $('add').disabled = false;
    // 1) consent default BEFORE any tag; region-agnostic for the demo
    consent('default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 });
    // 2) GTM start event (GTM itself is not loaded in this demo)
    window.dataLayer.push({ event: 'gtm.js', 'gtm.start': Date.now() });
    add('', 'gtm.js', { note: 'GTM would start here – after the consent default' });
    // 3) product page view
    var s = $('size').value;
    ecommerce('view_item', { currency: CURRENCY, value: SIZES[s].price, items: [item(s, 1)] });
    hint('Start with a consent choice or “Add to cart”.');
  }

  function item(size, qty) {
    return { item_id: 'FIC-ELA-' + size, item_name: 'Rubber plant', item_variant: size, price: SIZES[size].price, quantity: qty };
  }

  document.querySelectorAll('#consent button').forEach(function (b) {
    b.addEventListener('click', function () {
      var c = b.dataset.consent;
      var g = function (on) { return on ? 'granted' : 'denied'; };
      consent('update', {
        analytics_storage: g(c !== 'none'),
        ad_storage: g(c === 'all'),
        ad_user_data: g(c === 'all'),
        ad_personalization: g(c === 'all')
      });
      $('consent').classList.add('done');
      hint(c === 'none' ? 'Rejected: in basic mode Google tags stay off; in advanced mode they send cookieless pings.' : 'Consent updated. Now add the plant to the cart.');
    });
  });

  $('add').addEventListener('click', function () {
    var s = $('size').value;
    var q = Math.max(1, Math.min(9, parseInt($('qty').value, 10) || 1));
    $('qty').value = q;
    var line = item(s, q);
    var found = cart.find(function (i) { return i.item_id === line.item_id; });
    if (found) found.quantity += q; else cart.push(line);
    ecommerce('add_to_cart', { currency: CURRENCY, value: round2(line.price * q), items: [line] });
    enable(['cart', 'checkout'], true);
    hint('Value is price × quantity of what was just added; currency is always sent with value.');
  });

  $('cart').addEventListener('click', function () {
    ecommerce('view_cart', { currency: CURRENCY, value: cartValue(), items: items() });
  });

  $('checkout').addEventListener('click', function () {
    ecommerce('begin_checkout', { currency: CURRENCY, value: cartValue(), items: items() });
    enable(['ship', 'shipping'], true);
    hint('Choose a shipping method.');
  });

  $('shipping').addEventListener('click', function () {
    ecommerce('add_shipping_info', { currency: CURRENCY, value: cartValue(), shipping_tier: $('ship').value, items: items() });
    enable(['pay', 'payment'], true);
    hint('Choose a payment method.');
  });

  $('payment').addEventListener('click', function () {
    ecommerce('add_payment_info', { currency: CURRENCY, value: cartValue(), payment_type: $('pay').value, items: items() });
    enable(['order'], true);
    hint('Place the order.');
  });

  function sendPurchase(order) {
    if (sentPurchases[order.transaction_id]) {
      add('block', 'purchase blocked', { transaction_id: order.transaction_id, reason: 'already sent for this order – the page was reloaded' });
      last('purchase blocked · ' + order.transaction_id + ' already sent');
      hint('Without this guard the same order could be counted twice – GA4’s own transaction_id deduplication doesn’t catch every case.');
      return;
    }
    sentPurchases[order.transaction_id] = true;
    ecommerce('purchase', order);
  }

  $('order').addEventListener('click', function () {
    orderNo++;
    lastOrder = {
      transaction_id: 'DEMO-' + orderNo,
      currency: CURRENCY,
      value: cartValue(),
      shipping: SHIP[$('ship').value],
      items: items()
    };
    sendPurchase(lastOrder);
    enable(['add', 'cart', 'checkout', 'ship', 'shipping', 'pay', 'payment', 'order'], false);
    enable(['reload'], true);
    hint('Order placed. Now try “Reload thank-you page”.');
  });

  $('reload').addEventListener('click', function () { if (lastOrder) sendPurchase(lastOrder); });
  $('reset').addEventListener('click', start);
  $('size').addEventListener('change', function () {
    var s = $('size').value;
    ecommerce('view_item', { currency: CURRENCY, value: SIZES[s].price, items: [item(s, 1)] });
  });

  start();
})();
