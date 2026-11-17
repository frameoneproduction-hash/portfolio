// Demo mapy gwiazd 3D z flagami. Pozycje przybliżone (RA w godzinach, Dec w stopniach, odległość w latach świetlnych).
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const STARS = [
  ['Syriusz', 'Sirius', 6.75, -16.7, 8.6, '#cfe0ff', 1.6], ['Kanopus', 'Canopus', 6.40, -52.7, 310, '#fff4e0', 1.4],
  ['Alfa Centauri', 'Rigil Kentaurus', 14.66, -60.8, 4.4, '#fff1c9', 1.3], ['Arktur', 'Arcturus', 14.26, 19.2, 37, '#ffcf8a', 1.3],
  ['Wega', 'Vega', 18.62, 38.8, 25, '#d6e4ff', 1.3], ['Kapella', 'Capella', 5.28, 46.0, 43, '#fff0c4', 1.2],
  ['Rigel', 'Rigel', 5.24, -8.2, 860, '#c9dcff', 1.3], ['Procjon', 'Procyon', 7.65, 5.2, 11.5, '#fff7e6', 1.1],
  ['Betelgeza', 'Betelgeuse', 5.92, 7.4, 550, '#ffb07a', 1.3], ['Achernar', 'Achernar', 1.63, -57.2, 139, '#cfe0ff', 1.1],
  ['Altair', 'Altair', 19.85, 8.9, 16.7, '#f2f5ff', 1.1], ['Aldebaran', 'Aldebaran', 4.60, 16.5, 65, '#ffbd86', 1.1],
  ['Antares', 'Antares', 16.49, -26.4, 550, '#ff9a6a', 1.2], ['Kłos Panny', 'Spica', 13.42, -11.2, 250, '#c6d8ff', 1.1],
  ['Polluks', 'Pollux', 7.76, 28.0, 34, '#ffd39a', 1.0], ['Fomalhaut', 'Fomalhaut', 22.96, -29.6, 25, '#eef3ff', 1.0],
  ['Deneb', 'Deneb', 20.69, 45.3, 2600, '#eef3ff', 1.2], ['Regulus', 'Regulus', 10.14, 12.0, 79, '#d8e5ff', 1.0],
  ['Gwiazda Polarna', 'Polaris', 2.53, 89.3, 430, '#fff4d6', 1.0], ['Kastor', 'Castor', 7.58, 31.9, 51, '#eef3ff', 0.9],
  ['Bellatrix', 'Bellatrix', 5.42, 6.3, 250, '#cddcff', 0.9], ['Mirfak', 'Mirfak', 3.41, 49.9, 510, '#fff3d6', 0.9],
  ['Alnilam', 'Alnilam', 5.60, -1.2, 1300, '#c9dbff', 0.9], ['Dubhe', 'Dubhe', 11.06, 61.8, 123, '#ffd39a', 0.9],
  ['Alkaid', 'Alkaid', 13.79, 49.3, 104, '#d2e0ff', 0.8], ['Mizar', 'Mizar', 13.40, 54.9, 83, '#eef3ff', 0.8],
  ['Algol', 'Algol', 3.14, 40.96, 90, '#d6e4ff', 0.8], ['Hamal', 'Hamal', 2.12, 23.5, 66, '#ffcf96', 0.8],
  ['Denebola', 'Denebola', 11.82, 14.6, 36, '#f4f7ff', 0.8], ['Słońce', 'Sun', 0, 0, 0, '#fff2b0', 1.2],
];

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 5000);
camera.position.set(0, 60, 260);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
document.getElementById('scene').appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; controls.dampingFactor = 0.08; controls.minDistance = 15; controls.maxDistance = 900;

// Pozycja: kierunek z RA/Dec, odległość w skali logarytmicznej (żeby bliskie i dalekie gwiazdy były widoczne naraz)
function pos(ra, dec, ly) {
  if (!ly) return new THREE.Vector3(0, 0, 0);
  const r = 30 + 70 * Math.log10(ly + 1);
  const a = ra / 24 * Math.PI * 2, d = dec * Math.PI / 180;
  return new THREE.Vector3(r * Math.cos(d) * Math.cos(a), r * Math.sin(d), -r * Math.cos(d) * Math.sin(a));
}

// Okrągła miękka tekstura punktu
function dotTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(255,255,255,.85)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}
const tex = dotTexture();

// Tło: przykładowe słabe gwiazdy (losowe, nie do wyboru)
{
  const n = 4000, p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = Math.random() * 2 - 1, t = Math.random() * Math.PI * 2, r = 120 + Math.random() * 700;
    const s = Math.sqrt(1 - u * u);
    p.set([r * s * Math.cos(t), r * u * 0.6, r * s * Math.sin(t)], i * 3);
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p, 3));
  scene.add(new THREE.Points(g, new THREE.PointsMaterial({ size: 1.6, map: tex, transparent: true, depthWrite: false, color: 0x8fa0c8, opacity: 0.7 })));
}

// Gwiazdy z nazwami
const stars = STARS.map(([pl, en, ra, dec, ly, color, mag], id) => ({ id, pl, en, ra, dec, ly, color, mag, p: pos(ra, dec, ly) }));
const sprites = stars.map(s => {
  const m = new THREE.SpriteMaterial({ map: tex, color: s.color, transparent: true, depthWrite: false });
  const sp = new THREE.Sprite(m); sp.position.copy(s.p); const k = 7 * s.mag; sp.scale.set(k, k, 1); sp.userData.star = s;
  scene.add(sp); return sp;
});

// Flagi: zapis w przeglądarce
const KEY = 'mapa-gwiazd-flagi-v1';
let flags = {};
try { flags = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { flags = {}; }
const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(flags)); } catch (e) {} };
const COLORS = ['#ffcf5a', '#ff6b6b', '#5ad1ff', '#7cf29a', '#c792ff', '#ffffff'];
const flagEls = {};
function renderFlags() {
  Object.values(flagEls).forEach(el => el.remove());
  for (const k in flagEls) delete flagEls[k];
  const list = document.getElementById('mylist-in'); list.innerHTML = '';
  Object.entries(flags).forEach(([id, f]) => {
    const el = document.createElement('div'); el.className = 'flag';
    el.innerHTML = '<span class="pole"></span><span class="cloth"></span>';
    el.querySelector('.cloth').textContent = f.text || stars[id].pl;
    el.querySelector('.cloth').style.background = f.color;
    el.title = f.desc || '';
    el.addEventListener('click', () => select(stars[id]));
    document.body.appendChild(el); flagEls[id] = el;
    const b = document.createElement('button');
    b.innerHTML = '<i></i><span></span>'; b.querySelector('i').style.background = f.color;
    b.querySelector('span').textContent = (f.text || stars[id].pl) + ' · ' + stars[id].pl;
    b.addEventListener('click', () => { select(stars[id]); focus(stars[id]); });
    list.appendChild(b);
  });
  document.getElementById('mylist').hidden = !Object.keys(flags).length;
}

// Panel gwiazdy
const panel = document.getElementById('panel');
let current = null, color = COLORS[0];
const colorsEl = document.getElementById('colors');
COLORS.forEach(c => {
  const b = document.createElement('button'); b.style.background = c; b.setAttribute('aria-label', 'Kolor ' + c);
  b.addEventListener('click', () => { color = c; [...colorsEl.children].forEach(x => x.setAttribute('aria-pressed', String(x === b))); });
  colorsEl.appendChild(b);
});
function select(s) {
  current = s; const f = flags[s.id] || {};
  document.getElementById('p-name').textContent = s.pl;
  document.getElementById('p-meta').textContent = s.ly ? `${s.en} · ok. ${s.ly.toLocaleString('pl-PL')} lat świetlnych od Ziemi` : 'Nasza gwiazda';
  document.getElementById('f-text').value = f.text || '';
  document.getElementById('f-desc').value = f.desc || '';
  color = f.color || COLORS[0];
  [...colorsEl.children].forEach(x => x.setAttribute('aria-pressed', String(rgb(x.style.background) === color)));
  document.getElementById('del').disabled = !flags[s.id];
  panel.hidden = false;
}
function rgb(v) { const m = v.match(/\d+/g); return m ? '#' + m.slice(0, 3).map(n => (+n).toString(16).padStart(2, '0')).join('') : v; }
document.getElementById('close').onclick = () => { panel.hidden = true; current = null; };
document.getElementById('save').onclick = () => {
  if (!current) return;
  flags[current.id] = { text: document.getElementById('f-text').value.trim(), desc: document.getElementById('f-desc').value.trim(), color };
  persist(); renderFlags(); document.getElementById('del').disabled = false;
};
document.getElementById('del').onclick = () => { if (!current) return; delete flags[current.id]; persist(); renderFlags(); panel.hidden = true; };

// Wybór gwiazdy kliknięciem
const ray = new THREE.Raycaster(), mouse = new THREE.Vector2();
let down = null;
renderer.domElement.addEventListener('pointerdown', e => { down = [e.clientX, e.clientY]; });
renderer.domElement.addEventListener('pointerup', e => {
  if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 5) return;
  mouse.set(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  ray.setFromCamera(mouse, camera);
  const hit = ray.intersectObjects(sprites)[0];
  if (hit) select(hit.object.userData.star);
});

// Wyszukiwanie po nazwie (PL lub łacińskiej/angielskiej)
const q = document.getElementById('q'), sug = document.getElementById('sug');
const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l');
q.addEventListener('input', () => {
  const v = norm(q.value.trim()); sug.innerHTML = '';
  if (!v) { sug.hidden = true; return; }
  stars.filter(s => norm(s.pl).includes(v) || norm(s.en).includes(v)).slice(0, 8).forEach(s => {
    const li = document.createElement('li'), b = document.createElement('button');
    b.textContent = s.pl + (s.pl !== s.en ? ' (' + s.en + ')' : '');
    b.onclick = () => { sug.hidden = true; q.value = s.pl; select(s); focus(s); };
    li.appendChild(b); sug.appendChild(li);
  });
  sug.hidden = !sug.children.length;
});
q.addEventListener('keydown', e => { if (e.key === 'Enter') sug.querySelector('button')?.click(); });

// Płynny lot kamery do gwiazdy
let fly = null;
function focus(s) {
  const target = s.p.clone(), dir = camera.position.clone().sub(controls.target).normalize();
  fly = { t: 0, fromT: controls.target.clone(), toT: target, fromP: camera.position.clone(), toP: target.clone().add(dir.multiplyScalar(60)) };
}

const v = new THREE.Vector3();
function frame() {
  requestAnimationFrame(frame);
  if (fly) {
    fly.t = Math.min(1, fly.t + 0.03); const k = 1 - Math.pow(1 - fly.t, 3);
    controls.target.lerpVectors(fly.fromT, fly.toT, k); camera.position.lerpVectors(fly.fromP, fly.toP, k);
    if (fly.t >= 1) fly = null;
  }
  controls.update();
  renderer.render(scene, camera);
  // flagi nad gwiazdami, widoczne przy każdym przybliżeniu
  for (const id in flagEls) {
    v.copy(stars[id].p).project(camera);
    const el = flagEls[id];
    if (v.z > 1) { el.classList.add('hidden'); continue; }
    el.classList.remove('hidden');
    el.style.left = ((v.x + 1) / 2 * innerWidth) + 'px';
    el.style.top = ((1 - v.y) / 2 * innerHeight) + 'px';
  }
}
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });

// Przykładowa flaga przy pierwszym wejściu, żeby było widać, jak to wygląda
if (!Object.keys(flags).length) { flags[4] = { text: 'Nasza gwiazda', desc: 'Przykładowa flaga — możesz ją zmienić lub usunąć.', color: '#ffcf5a' }; }
renderFlags();
frame();
