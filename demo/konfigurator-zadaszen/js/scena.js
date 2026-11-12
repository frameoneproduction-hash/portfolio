/*
 * Tarvio — scena 3D konfiguratora (Three.js r160).
 * Moduł nie zna cen ani formularzy: dostaje stan konfiguracji + układ konstrukcji
 * z app.js i buduje z nich model.
 */
(function () {
  'use strict';

  var FY = 0.1;          // wysokość podłogi tarasu nad gruntem [m]
  var DEG = Math.PI / 180;

  function rng(seed) {
    return function () {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  }

  function create(THREE, addons, canvas) {
    var OrbitControls = addons.OrbitControls;
    var RoomEnvironment = addons.RoomEnvironment;

    var small = Math.min(window.innerWidth, window.innerHeight) < 700;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- renderer ---------- */
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 2 : 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    var scene = new THREE.Scene();
    var pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
    pmrem.dispose();

    var camera = new THREE.PerspectiveCamera(38, 1, 0.1, 120);

    /* ---------- tekstury proceduralne (bez plików zewnętrznych) ---------- */
    function canvasTex(w, h, draw, srgb) {
      var c = document.createElement('canvas');
      c.width = w; c.height = h;
      draw(c.getContext('2d'), w, h);
      var t = new THREE.CanvasTexture(c);
      if (srgb !== false) t.colorSpace = THREE.SRGBColorSpace;
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      return t;
    }

    function skyTex(top, mid, bottom) {
      return canvasTex(4, 256, function (g, w, h) {
        var gr = g.createLinearGradient(0, 0, 0, h);
        gr.addColorStop(0, top); gr.addColorStop(0.62, mid); gr.addColorStop(1, bottom);
        g.fillStyle = gr; g.fillRect(0, 0, w, h);
      });
    }
    var skyDay = skyTex('#a9c3d3', '#dfe7ea', '#ece9e3');
    var skyNight = skyTex('#060a16', '#141c2c', '#1d2431');

    var woodTex = canvasTex(1024, 1024, function (g, w, h) {
      var r = rng(7);
      var planks = 10, pw = w / planks;
      for (var i = 0; i < planks; i++) {
        var x0 = i * pw;
        var cut = r() * h;
        for (var s = 0; s < 2; s++) {
          var y0 = s === 0 ? 0 : cut, y1 = s === 0 ? cut : h;
          var l = 36 + r() * 9, sat = 20 + r() * 9;
          g.fillStyle = 'hsl(' + (26 + r() * 6) + ',' + sat + '%,' + l + '%)';
          g.fillRect(x0, y0, pw, y1 - y0);
          for (var k = 0; k < 14; k++) {
            g.strokeStyle = 'rgba(40,24,12,' + (0.05 + r() * 0.1) + ')';
            g.lineWidth = 1 + r() * 2;
            var gx = x0 + 4 + r() * (pw - 8);
            g.beginPath(); g.moveTo(gx, y0);
            g.bezierCurveTo(gx + (r() - 0.5) * 8, y0 + (y1 - y0) * 0.33, gx + (r() - 0.5) * 8, y0 + (y1 - y0) * 0.66, gx + (r() - 0.5) * 6, y1);
            g.stroke();
          }
        }
        g.fillStyle = 'rgba(25,15,8,0.85)';
        g.fillRect(x0, 0, 4, h);
        g.fillRect(x0, cut - 1, pw, 3);
      }
    });

    var plasterTex = canvasTex(256, 256, function (g, w, h) {
      var r = rng(3);
      g.fillStyle = '#e6e0d6'; g.fillRect(0, 0, w, h);
      for (var i = 0; i < 2600; i++) {
        g.fillStyle = 'rgba(' + (r() > 0.5 ? '255,255,255' : '120,110,100') + ',' + (0.04 + r() * 0.05) + ')';
        g.fillRect(r() * w, r() * h, 1 + r() * 2, 1 + r() * 2);
      }
    });

    var polyTex = canvasTex(256, 64, function (g, w, h) {
      g.fillStyle = 'rgba(246,248,247,0.62)'; g.fillRect(0, 0, w, h);
      for (var x = 0; x < w; x += 32) {
        g.fillStyle = 'rgba(255,255,255,0.95)'; g.fillRect(x, 0, 3, h);
        g.fillStyle = 'rgba(190,200,200,0.75)'; g.fillRect(x + 3, 0, 1, h);
      }
    });

    /* ---------- materiały ---------- */
    var M = {
      frame: new THREE.MeshStandardMaterial({ color: 0x383e42, metalness: 0.35, roughness: 0.48, envMapIntensity: 0.7 }),
      poly: new THREE.MeshStandardMaterial({ color: 0xffffff, map: polyTex, transparent: true, roughness: 0.3, metalness: 0, side: THREE.DoubleSide, depthWrite: false, envMapIntensity: 0.8 }),
      glass: new THREE.MeshStandardMaterial({ color: 0xcfe3e1, transparent: true, opacity: 0.2, roughness: 0.03, metalness: 0.1, side: THREE.DoubleSide, depthWrite: false, envMapIntensity: 1.6 }),
      fabric: new THREE.MeshStandardMaterial({ color: 0x34373a, transparent: true, opacity: 0.84, roughness: 0.95, side: THREE.DoubleSide, depthWrite: false }),
      led: new THREE.MeshStandardMaterial({ color: 0xe9e6df, emissive: 0xffd2a0, emissiveIntensity: 0, roughness: 0.4 }),
      wall: new THREE.MeshStandardMaterial({ color: 0xffffff, map: plasterTex, roughness: 0.95, envMapIntensity: 0.4 }),
      plinth: new THREE.MeshStandardMaterial({ color: 0x9c968d, roughness: 0.9, envMapIntensity: 0.4 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x2b2e31, metalness: 0.4, roughness: 0.45, envMapIntensity: 0.6 }),
      winGlass: new THREE.MeshStandardMaterial({ color: 0x23313a, metalness: 0.2, roughness: 0.05, envMapIntensity: 1.4, emissive: 0xffb36b, emissiveIntensity: 0 }),
      deck: new THREE.MeshStandardMaterial({ color: 0xffffff, map: woodTex, roughness: 0.82, envMapIntensity: 0.4 }),
      deckEdge: new THREE.MeshStandardMaterial({ color: 0x5c4330, roughness: 0.85 }),
      ground: new THREE.MeshStandardMaterial({ color: 0xa9ad97, roughness: 1, envMapIntensity: 0.3 }),
      sofa: new THREE.MeshStandardMaterial({ color: 0xd9d3c8, roughness: 0.95, envMapIntensity: 0.4 }),
      sofaBase: new THREE.MeshStandardMaterial({ color: 0x5d5650, roughness: 0.8 }),
      tableTop: new THREE.MeshStandardMaterial({ color: 0x3b332c, roughness: 0.6 }),
      planter: new THREE.MeshStandardMaterial({ color: 0x47443f, roughness: 0.85 }),
      leaf: new THREE.MeshStandardMaterial({ color: 0x5e6f4d, roughness: 0.9, flatShading: true }),
      leaf2: new THREE.MeshStandardMaterial({ color: 0x75825c, roughness: 0.9, flatShading: true })
    };

    /* ---------- światła ---------- */
    var hemi = new THREE.HemisphereLight(0xe3edf5, 0x8d8273, 0.28);
    scene.add(hemi);

    var sun = new THREE.DirectionalLight(0xfff1df, 3.4);
    sun.castShadow = true;
    sun.shadow.mapSize.set(small ? 1024 : 2048, small ? 1024 : 2048);
    var sc = sun.shadow.camera;
    sc.left = -8; sc.right = 8; sc.top = 8; sc.bottom = -8; sc.near = 1; sc.far = 40;
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.025;
    scene.add(sun); scene.add(sun.target);

    var ledLights = [];
    for (var li = 0; li < 3; li++) {
      var pl = new THREE.PointLight(0xffc98a, 0, 5.5, 2);
      scene.add(pl); ledLights.push(pl);
    }

    /* ---------- elementy statyczne: grunt, ściana domu ---------- */
    var ground = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), M.ground);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    function box(w, h, d, mat, x, y, z, parent, opts) {
      var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x, y, z);
      var o = opts || {};
      m.castShadow = o.cast !== false;
      m.receiveShadow = o.receive !== false;
      (parent || scene).add(m);
      return m;
    }

    (function buildHouse() {
      var house = new THREE.Group();
      var WW = 30, WH = 4.9;
      var wallGeo = new THREE.BoxGeometry(WW, WH, 0.4);
      var uv = wallGeo.attributes.uv;
      for (var i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * WW / 2.2, uv.getY(i) * WH / 2.2);
      var wall = new THREE.Mesh(wallGeo, M.wall);
      wall.position.set(0, WH / 2, -0.2);
      wall.receiveShadow = true; wall.castShadow = true;
      house.add(wall);
      box(WW, 0.4, 0.03, M.plinth, 0, 0.2, 0.015, house);
      box(WW + 0.2, 0.14, 0.55, M.dark, 0, WH + 0.07, -0.15, house);
      // przeszklenie przesuwne
      function opening(x0, x1, y0, y1, mullions) {
        var w = x1 - x0, h = y1 - y0, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, f = 0.07;
        box(w, h, 0.02, M.winGlass, cx, cy, 0.0, house, { cast: false });
        box(w + f, f, 0.09, M.dark, cx, y1 + f / 2, 0.02, house);
        box(w + f, f, 0.09, M.dark, cx, y0 + f / 2, 0.02, house);
        box(f, h, 0.09, M.dark, x0, cy, 0.02, house);
        box(f, h, 0.09, M.dark, x1, cy, 0.02, house);
        for (var k = 1; k < mullions; k++) box(0.05, h, 0.07, M.dark, x0 + w * k / mullions, cy, 0.02, house);
      }
      opening(-1.9, 1.1, FY, FY + 2.35, 3);
      opening(2.3, 3.7, 1.0, 2.45, 1);
      opening(-5.4, -4.0, 1.0, 2.45, 1);
      scene.add(house);
    })();

    /* ---------- część dynamiczna ---------- */
    var dyn = new THREE.Group();
    scene.add(dyn);
    var lamellaMesh = null, lamellaData = [];
    var blinds = [];
    var curKey = '';
    var cur = { angle: 45, drop: 0.7 };
    var tgt = { angle: 45, drop: 0.7 };
    var dims = { w: 5, d: 3.5, h: 2.5 };
    var night = false, ledOn = false;
    var dirty = true;

    function clearDyn() {
      dyn.traverse(function (o) { if (o.geometry) o.geometry.dispose(); });
      dyn.clear();
      lamellaMesh = null; lamellaData = []; blinds = [];
    }

    // belka między dwoma punktami (x stałe), przekrój w × h, górna krawędź na linii p0–p1
    function slopedBeam(x, w, h, z0, yTop0, z1, yTop1, mat, parent, opts) {
      var len = Math.hypot(z1 - z0, yTop0 - yTop1);
      var ang = Math.atan2(yTop0 - yTop1, z1 - z0);
      var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, len), mat);
      var nx = Math.sin(ang), ny = Math.cos(ang); // normalna (w płaszczyźnie yz) skierowana w górę
      m.position.set(x, (yTop0 + yTop1) / 2 - ny * h / 2, (z0 + z1) / 2 - nx * h / 2);
      m.rotation.x = ang;
      var o = opts || {};
      m.castShadow = o.cast !== false; m.receiveShadow = o.receive !== false;
      parent.add(m);
      return m;
    }

    function scaleUV(geo, su, sv) {
      var uv = geo.attributes.uv;
      for (var i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * su, uv.getY(i) * sv);
      uv.needsUpdate = true;
    }

    function build(s, u) {
      clearDyn();
      var W = s.w, D = s.d, H = s.h;
      dims = { w: W, d: D, h: H };
      var flat = s.dach === 'lamele';
      var P = flat ? 0.15 : 0.11;           // przekrój słupa
      var FB = flat ? 0.24 : 0.2;           // wysokość belki frontowej / ramy
      var yTopFront = FY + H + FB;
      var rise = u.wznios;
      var postZ = D - P / 2 - 0.01;

      /* taras */
      var dw = W + 1.4, dd = D + 1.0;
      var deckGeo = new THREE.BoxGeometry(dw, FY, dd);
      scaleUV(deckGeo, dw / 1.4, dd / 1.4);
      var deck = new THREE.Mesh(deckGeo, [M.deckEdge, M.deckEdge, M.deck, M.deckEdge, M.deckEdge, M.deckEdge]);
      deck.position.set(0, FY / 2, dd / 2);
      deck.receiveShadow = true;
      dyn.add(deck);

      /* słupy */
      u.slupyX.forEach(function (x) {
        box(P, H, P, M.frame, x, FY + H / 2, postZ, dyn);
        box(P + 0.08, 0.012, P + 0.08, M.frame, x, FY + 0.006, postZ, dyn);
      });

      var ledLen = 0;
      if (!flat) {
        /* belka frontowa z rynną */
        box(W, FB, 0.16, M.frame, 0, FY + H + FB / 2, D - 0.08, dyn);
        box(W - 0.04, 0.012, 0.1, M.dark, 0, yTopFront + 0.001, D - 0.085, dyn, { cast: false });
        box(W + 0.02, 0.03, 0.03, M.frame, 0, yTopFront + 0.012, D - 0.008, dyn);
        /* profil przyścienny */
        box(W, 0.13, 0.1, M.frame, 0, yTopFront + rise - 0.045, 0.05, dyn);
        /* rura spustowa */
        var dp = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, H, 16), M.frame);
        dp.position.set(u.slupyX[0] + P / 2 + 0.05, FY + H / 2, postZ - 0.02);
        dp.castShadow = true; dyn.add(dp);

        /* krokwie + pokrycie */
        var z0 = 0.02, z1 = D - 0.16;
        var yAt = function (z) { return yTopFront + rise * (1 - z / D); };
        var ys0 = yAt(z0), ys1 = yAt(z1);
        var xs = u.krokwieX;
        var mat = s.dach === 'szklo' ? M.glass : M.poly;
        var th = s.dach === 'szklo' ? 0.01 : 0.016;
        for (var i = 0; i < xs.length; i++) {
          slopedBeam(xs[i], 0.06, 0.11, z0, ys0, z1, ys1, M.frame, dyn);
          slopedBeam(xs[i], 0.055, 0.018, z0, ys0 + 0.018, z1, ys1 + 0.018, M.frame, dyn); // listwa dociskowa
          if (s.led && i > 0 && i < xs.length - 1) {
            slopedBeam(xs[i], 0.03, 0.006, z0 + 0.15, ys0 - 0.11 - 0.15 * rise / D, z1 - 0.1, ys1 - 0.11 + 0.1 * rise / D, M.led, dyn, { cast: false, receive: false });
          }
          if (i < xs.length - 1) {
            var gap = xs[i + 1] - xs[i] - 0.06;
            var pm = slopedBeam((xs[i] + xs[i + 1]) / 2, gap + 0.01, th, z0, ys0 - 0.004, z1 + 0.1, yAt(z1 + 0.1) - 0.004, mat, dyn, { cast: false, receive: false });
            if (mat === M.poly) scaleUV(pm.geometry, gap / 0.32, 1);
            pm.renderOrder = 2;
          }
        }
      } else {
        /* rama pergoli */
        var fyc = FY + H + FB / 2;
        box(W, FB, 0.15, M.frame, 0, fyc, D - 0.075, dyn);
        box(W, FB, 0.13, M.frame, 0, fyc, 0.065, dyn);
        box(0.15, FB, D - 0.28, M.frame, -W / 2 + 0.075, fyc, D / 2, dyn);
        box(0.15, FB, D - 0.28, M.frame, W / 2 - 0.075, fyc, D / 2, dyn);
        var beamsX = [-W / 2 + 0.075];
        for (var b = 1; b < u.slupyX.length - 1; b++) {
          box(0.13, FB, D - 0.28, M.frame, u.slupyX[b], fyc, D / 2, dyn);
          beamsX.push(u.slupyX[b]);
        }
        beamsX.push(W / 2 - 0.075);

        /* lamele (InstancedMesh) */
        var pitch = 0.2;
        var zIn0 = 0.13, zIn1 = D - 0.15;
        var n = Math.floor((zIn1 - zIn0) / pitch);
        var zStart = (zIn0 + zIn1) / 2 - (n - 1) * pitch / 2;
        var bays = beamsX.length - 1;
        var lamGeo = new THREE.BoxGeometry(1, 0.026, 0.205);
        lamellaMesh = new THREE.InstancedMesh(lamGeo, M.frame, n * bays);
        lamellaMesh.castShadow = true; lamellaMesh.receiveShadow = true;
        var yL = FY + H + FB - 0.07;
        for (var by = 0; by < bays; by++) {
          var xa = beamsX[by] + 0.07, xb = beamsX[by + 1] - 0.07;
          for (var k = 0; k < n; k++) {
            lamellaData.push({ x: (xa + xb) / 2, y: yL, z: zStart + k * pitch, len: xb - xa - 0.01 });
          }
        }
        dyn.add(lamellaMesh);
        applyLamellae();

        if (s.led) {
          var ly = FY + H - 0.004;
          box(W - 0.4, 0.008, 0.03, M.led, 0, ly, D - 0.11, dyn, { cast: false, receive: false });
          box(W - 0.4, 0.008, 0.03, M.led, 0, ly, 0.09, dyn, { cast: false, receive: false });
          beamsX.forEach(function (bx, idx) {
            var off = idx === 0 ? 0.04 : idx === beamsX.length - 1 ? -0.04 : 0;
            box(0.03, 0.008, D - 0.5, M.led, bx + off, ly, D / 2, dyn, { cast: false, receive: false });
          });
        }
      }

      /* rolety ZIP */
      var dropMax = H - 0.13;
      function blind(len, cx, cz, alongZ, cassetteY) {
        var g = new THREE.Group();
        var cas = new THREE.Mesh(new THREE.BoxGeometry(alongZ ? 0.11 : len + 0.02, 0.12, alongZ ? len + 0.02 : 0.11), M.frame);
        cas.position.set(cx, cassetteY - 0.06, cz); cas.castShadow = true; g.add(cas);
        var fg = new THREE.PlaneGeometry(len, 1);
        fg.translate(0, -0.5, 0);
        if (alongZ) fg.rotateY(Math.PI / 2);
        var fab = new THREE.Mesh(fg, M.fabric);
        fab.position.set(cx, cassetteY - 0.12, cz);
        fab.castShadow = true; fab.renderOrder = 1;
        g.add(fab);
        var bar = new THREE.Mesh(new THREE.BoxGeometry(alongZ ? 0.035 : len, 0.045, alongZ ? len : 0.035), M.frame);
        bar.castShadow = true; g.add(bar);
        // prowadnice
        [-1, 1].forEach(function (sgn) {
          var gx = alongZ ? cx : cx + sgn * (len / 2 + 0.02);
          var gz = alongZ ? cz + sgn * (len / 2 + 0.02) : cz;
          box(0.045, dropMax, 0.045, M.frame, gx, FY + dropMax / 2, gz, g);
        });
        dyn.add(g);
        blinds.push({ fab: fab, bar: bar, top: cassetteY - 0.12, cx: cx, cz: cz });
      }
      var cy = FY + H;
      var zSideLen = postZ - P / 2 - 0.1 - 0.05;
      if (s.rolety.lewa) blind(zSideLen, -W / 2 + 0.07, 0.07 + zSideLen / 2, true, cy);
      if (s.rolety.prawa) blind(zSideLen, W / 2 - 0.07, 0.07 + zSideLen / 2, true, cy);
      if (s.rolety.przod) {
        for (var q = 0; q < u.slupyX.length - 1; q++) {
          var xl = u.slupyX[q] + P / 2 + 0.03, xr = u.slupyX[q + 1] - P / 2 - 0.03;
          blind(xr - xl, (xl + xr) / 2, postZ - P / 2 - 0.06, false, cy);
        }
      }
      /* kliny boczne nad roletą przy dachu spadzistym */
      if (!flat && (s.rolety.lewa || s.rolety.prawa)) {
        var wedgeMat = s.dach === 'szklo' ? M.glass : M.poly;
        [['lewa', -W / 2 + 0.03], ['prawa', W / 2 - 0.03]].forEach(function (pair) {
          if (!s.rolety[pair[0]]) return;
          var yb = cy, zEnd = D - 0.16;
          var yTop0 = yTopFront + rise * (1 - 0.02 / D) - 0.11;
          var yTop1 = yTopFront + rise * (1 - zEnd / D) - 0.11;
          var gg = new THREE.BufferGeometry();
          gg.setAttribute('position', new THREE.Float32BufferAttribute([
            0, yb, 0.05, 0, yTop0, 0.05, 0, yTop1, zEnd, 0, yb, zEnd
          ], 3));
          gg.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 0, 1, D / 0.32, 1, D / 0.32, 0], 2));
          gg.setIndex([0, 1, 2, 0, 2, 3]);
          gg.computeVertexNormals();
          var wm = new THREE.Mesh(gg, wedgeMat);
          wm.position.x = pair[1]; wm.renderOrder = 2;
          dyn.add(wm);
        });
      }
      applyBlinds();

      /* meble i zieleń */
      var sx = -Math.min(0.9, W * 0.18), sz = Math.max(0.75, D * 0.36);
      var sofa = new THREE.Group();
      box(2.1, 0.12, 0.84, M.sofaBase, 0, 0.08, 0, sofa);
      box(2.1, 0.26, 0.84, M.sofa, 0, 0.27, 0, sofa);
      box(2.1, 0.42, 0.2, M.sofa, 0, 0.58, -0.32, sofa);
      box(0.18, 0.5, 0.84, M.sofa, -1.0, 0.4, 0, sofa);
      box(0.18, 0.5, 0.84, M.sofa, 1.0, 0.4, 0, sofa);
      sofa.position.set(sx, FY, sz);
      dyn.add(sofa);
      var tz = sz + 1.05;
      if (tz + 0.3 < D - 0.2) {
        box(0.95, 0.04, 0.6, M.tableTop, sx, FY + 0.4, tz, dyn);
        box(0.7, 0.36, 0.4, M.sofaBase, sx, FY + 0.18, tz, dyn);
      }
      [-1, 1].forEach(function (sgn, i) {
        var px = sgn * (W / 2 + 1.15), pz = D - 0.1;
        box(0.48, 0.55, 0.48, M.planter, px, 0.275, pz, dyn);
        var bush = new THREE.Mesh(new THREE.IcosahedronGeometry(0.38, 1), i ? M.leaf2 : M.leaf);
        bush.position.set(px, 0.86, pz); bush.scale.set(1, 1.15, 1); bush.castShadow = true;
        bush.rotation.y = i * 1.3;
        dyn.add(bush);
      });

      /* światło LED (noc) */
      ledLights.forEach(function (l, i) {
        l.position.set((i - 1) * W / 3, FY + H - 0.15, D * 0.5);
      });

      /* słońce i cień */
      sun.target.position.set(0, 0, D / 2);
      sun.position.set(6.5, 8.5, D / 2 + 5.5);
      sun.shadow.camera.updateProjectionMatrix();

      return ledLen;
    }

    var tmpM = new THREE.Matrix4(), tmpQ = new THREE.Quaternion(), tmpE = new THREE.Euler(), tmpP = new THREE.Vector3(), tmpS = new THREE.Vector3();
    function applyLamellae() {
      if (!lamellaMesh) return;
      tmpE.set(-cur.angle * DEG, 0, 0);
      tmpQ.setFromEuler(tmpE);
      for (var i = 0; i < lamellaData.length; i++) {
        var L = lamellaData[i];
        tmpP.set(L.x, L.y, L.z); tmpS.set(L.len, 1, 1);
        tmpM.compose(tmpP, tmpQ, tmpS);
        lamellaMesh.setMatrixAt(i, tmpM);
      }
      lamellaMesh.instanceMatrix.needsUpdate = true;
    }

    function applyBlinds() {
      var dropMax = dims.h - 0.13;
      var h = Math.max(0.001, cur.drop * dropMax);
      blinds.forEach(function (b) {
        b.fab.scale.y = h;
        b.fab.visible = cur.drop > 0.004;
        b.bar.position.set(b.cx, b.top - h - 0.02, b.cz);
      });
    }

    /* ---------- dzień / noc ---------- */
    function applyLighting() {
      scene.background = night ? skyNight : skyDay;
      var fogCol = night ? 0x1b2230 : 0xebe8e2;
      if (!scene.fog) scene.fog = new THREE.Fog(fogCol, 26, 70); else scene.fog.color.setHex(fogCol);
      hemi.intensity = night ? 0.12 : 0.28;
      hemi.color.setHex(night ? 0x8fa3d6 : 0xe3edf5);
      sun.intensity = night ? 0.22 : 3.4;
      sun.color.setHex(night ? 0x9fb3ff : 0xfff1df);
      renderer.toneMappingExposure = night ? 1.1 : 1.05;
      M.winGlass.emissiveIntensity = night ? 0.55 : 0;
      M.led.emissiveIntensity = ledOn ? (night ? 5 : 0.35) : 0;
      ledLights.forEach(function (l) { l.intensity = ledOn && night ? 2.4 : 0; });
      ['frame', 'wall', 'deck', 'sofa', 'ground', 'plinth'].forEach(function (k) {
        M[k].envMapIntensity = night ? 0.08 : (k === 'frame' ? 0.7 : 0.22);
      });
      dirty = true;
    }

    /* ---------- kamera ---------- */
    var controls = new OrbitControls(camera, canvas);
    controls.enableDamping = !reduceMotion;
    controls.dampingFactor = 0.08;
    controls.minDistance = 3;
    controls.maxDistance = 24;
    controls.maxPolarAngle = Math.PI * 0.485;
    controls.minAzimuthAngle = -1.75;
    controls.maxAzimuthAngle = 1.75;
    controls.screenSpacePanning = true;
    controls.addEventListener('change', function () {
      var t = controls.target;
      t.x = THREE.MathUtils.clamp(t.x, -6, 6);
      t.y = THREE.MathUtils.clamp(t.y, 0.3, 4);
      t.z = THREE.MathUtils.clamp(t.z, -0.5, 7);
      dirty = true;
    });

    var PRESETS = {
      perspektywa: { az: 34, el: 15, k: 1 },
      przod: { az: 0, el: 7, k: 1.02 },
      bok: { az: 78, el: 10, k: 1.02 },
      gora: { az: 18, el: 58, k: 1.05 },
      nocny: { az: 22, el: 3, k: 0.92, ty: 0.42 }
    };
    var camTween = null;
    function presetPose(name) {
      var p = PRESETS[name] || PRESETS.perspektywa;
      var aspect = camera.aspect || 1.5;
      var tv = Math.tan(camera.fov * DEG / 2), th = tv * aspect;
      var fitV = Math.max(dims.d * 1.2, dims.h + 1.6, 4.2) * 0.5 / tv;
      var fitH = (dims.w + 2.6) * 0.5 / th;
      var r = (Math.max(fitV, fitH) * 1.2 + 2.3) * p.k;
      r = Math.min(r, controls.maxDistance);
      var target = new THREE.Vector3(0, FY + dims.h * (p.ty || 0.55), dims.d * 0.5);
      var az = p.az * DEG, el = p.el * DEG;
      var pos = new THREE.Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)).multiplyScalar(r).add(target);
      return { pos: pos, target: target };
    }
    function setPreset(name, instant) {
      var pose = presetPose(name);
      if (instant || reduceMotion) {
        camera.position.copy(pose.pos); controls.target.copy(pose.target); controls.update();
        camTween = null; dirty = true; return;
      }
      camTween = { t: 0, fromP: camera.position.clone(), fromT: controls.target.clone(), toP: pose.pos, toT: pose.target };
    }

    /* ---------- pętla renderowania (render na żądanie) ---------- */
    var last = performance.now();
    var running = true;
    function loop(now) {
      if (!running) return;
      requestAnimationFrame(loop);
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      var animating = false;
      if (camTween) {
        camTween.t = Math.min(1, camTween.t + dt / 0.7);
        var e = 1 - Math.pow(1 - camTween.t, 3);
        camera.position.lerpVectors(camTween.fromP, camTween.toP, e);
        controls.target.lerpVectors(camTween.fromT, camTween.toT, e);
        if (camTween.t >= 1) camTween = null;
        animating = true;
      }
      var k = reduceMotion ? 1 : Math.min(1, dt * 7);
      if (Math.abs(tgt.angle - cur.angle) > 0.05) {
        cur.angle += (tgt.angle - cur.angle) * k; applyLamellae(); animating = true;
      } else if (cur.angle !== tgt.angle) { cur.angle = tgt.angle; applyLamellae(); animating = true; }
      if (Math.abs(tgt.drop - cur.drop) > 0.002) {
        cur.drop += (tgt.drop - cur.drop) * k; applyBlinds(); animating = true;
      } else if (cur.drop !== tgt.drop) { cur.drop = tgt.drop; applyBlinds(); animating = true; }
      var moved = controls.update();
      if (dirty || moved || animating) {
        renderer.render(scene, camera);
        dirty = false;
      }
    }

    function resize() {
      var el = canvas.parentElement;
      var w = Math.max(1, el.clientWidth), h = Math.max(1, el.clientHeight);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      dirty = true;
    }
    if (window.ResizeObserver) new ResizeObserver(resize).observe(canvas.parentElement);
    window.addEventListener('resize', resize);
    resize();

    /* ---------- API ---------- */
    var first = true;
    function update(s, u) {
      var key = [s.w, s.d, s.h, s.dach, s.rolety.lewa, s.rolety.prawa, s.rolety.przod, s.led].join('|');
      if (key !== curKey) {
        var old = { d: dims.d, h: dims.h };
        build(s, u);
        curKey = key;
        if (first) {
          cur.angle = tgt.angle = s.kat; cur.drop = tgt.drop = s.rozwiniecie / 100;
          applyLamellae(); applyBlinds();
          setPreset(s.noc ? 'nocny' : 'perspektywa', true); first = false;
        } else if (!camTween) {
          // przesuń kamerę razem ze środkiem konstrukcji
          var delta = new THREE.Vector3(0, (s.h - old.h) * 0.55, (s.d - old.d) * 0.5);
          camera.position.add(delta); controls.target.add(delta);
        }
      }
      var ral = s.ralObj;
      M.frame.color.set(ral.hex);
      M.frame.metalness = ral.metalik ? 0.65 : 0.35;
      M.frame.roughness = ral.metalik ? 0.36 : 0.5;
      var ledCol = s.barwa === 'neutralna' ? 0xfff0dc : 0xffc785;
      M.led.emissive.setHex(ledCol);
      ledLights.forEach(function (l) { l.color.setHex(ledCol); });
      tgt.angle = s.kat;
      tgt.drop = s.rozwiniecie / 100;
      var nightChanged = night !== !!s.noc || ledOn !== !!s.led;
      night = !!s.noc; ledOn = !!s.led;
      if (nightChanged || first === false) applyLighting();
      dirty = true;
    }

    function snapshot(w, h) {
      var size = new THREE.Vector2();
      renderer.getSize(size);
      var pr = renderer.getPixelRatio();
      var asp = camera.aspect;
      var savedPos = camera.position.clone(), savedTarget = controls.target.clone();
      renderer.setPixelRatio(1);
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      // stały, czytelny kadr do PDF — niezależnie od ekranu i obrotu kamery
      var pose = presetPose(night ? 'nocny' : 'perspektywa');
      camera.position.copy(pose.pos); camera.lookAt(pose.target);
      renderer.render(scene, camera);
      var url = canvas.toDataURL('image/jpeg', 0.9);
      camera.position.copy(savedPos); controls.target.copy(savedTarget); camera.lookAt(savedTarget);
      renderer.setPixelRatio(pr);
      renderer.setSize(size.x, size.y, false);
      camera.aspect = asp; camera.updateProjectionMatrix();
      renderer.render(scene, camera);
      return url;
    }

    applyLighting();
    requestAnimationFrame(loop);

    return {
      update: update,
      setPreset: setPreset,
      snapshot: snapshot,
      renderer: renderer
    };
  }

  window.TarvioScena = { create: create };
})();
