/*****************************
 *  DATOS — ENTRE CAPAS
 *  Agregá o editá los alfajores en este array.
 *  Para cada uno: name, description, image (ruta desde raíz), emoji (fallback).
 *****************************/
const alfajores = [
  {
    id: 1,
    name: "Clásico",
    description: "Dos tapas de harina de almendras rellenas de ganache de chocolate Bariloche. Endulzado solo con miel.",
    image: "images/entre_capas/clasico.jpg",
    emoji: "🍫"
  },
  {
    id: 2,
    name: "Dulce de Leche",
    description: "Tapas de almendra rellenas de dulce de leche cremoso. Sin azúcar agregada.",
    image: "images/entre_capas/dulce.jpg",
    emoji: "🍮"
  },
  {
    id: 3,
    name: "Mixto — Ganache & Dulce",
    description: "Lo mejor de los dos mundos: ganache Bariloche y dulce de leche entre tapas de harina de almendras.",
    image: "images/entre_capas/mixto.jpg",
    emoji: "✨"
  }
];

/*****************************
 *  ESTADO
 *****************************/
const cantidades = {};

function getTotal() {
  return Object.values(cantidades).reduce((sum, n) => sum + n, 0);
}

function incrementar(id) {
  cantidades[id] = (cantidades[id] || 0) + 1;
  actualizarQty(id);
  actualizarResumen();
}

function decrementar(id) {
  if ((cantidades[id] || 0) > 0) {
    cantidades[id]--;
    if (cantidades[id] === 0) delete cantidades[id];
    actualizarQty(id);
    actualizarResumen();
  }
}

function actualizarQty(id) {
  const el = document.querySelector(`.ec-qty[data-id="${id}"]`);
  if (el) el.textContent = cantidades[id] || 0;
}

function actualizarResumen() {
  const lista = document.getElementById('ec-resumen-lista');
  if (!lista) return;

  lista.innerHTML = '';
  const entries = Object.entries(cantidades).filter(([, q]) => q > 0);

  if (entries.length === 0) {
    lista.innerHTML = '<li class="ec-resumen-empty">Todavía no seleccionaste nada 🍫</li>';
    return;
  }

  entries.forEach(([id, qty]) => {
    const alf = alfajores.find(a => String(a.id) === String(id));
    const li = document.createElement('li');
    li.textContent = `${qty} × Entre Capas ${alf ? alf.name : 'Alfajor ' + id}`;
    lista.appendChild(li);
  });
}

/*****************************
 *  RENDER CARDS
 *****************************/
function crearCard(alf) {
  const card = document.createElement('div');
  card.className = 'ec-card';

  // Si tiene imagen real, usarla; si no, mostrar emoji como placeholder
  const imgHTML = `
    <img class="ec-card-img" src="${alf.image}" alt="${alf.name}"
      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
    <div class="ec-card-placeholder" style="display:none">${alf.emoji}</div>
  `;

  card.innerHTML = `
    ${imgHTML}
    <div class="ec-card-body">
      <h3 class="ec-card-name">Entre Capas — ${alf.name}</h3>
      <p class="ec-card-desc">${alf.description}</p>
      <div class="ec-stepper">
        <button type="button" onclick="decrementar(${alf.id})">−</button>
        <span class="ec-qty" data-id="${alf.id}">${cantidades[alf.id] || 0}</span>
        <button type="button" onclick="incrementar(${alf.id})">+</button>
      </div>
    </div>
  `;
  return card;
}

function renderCatalogo() {
  const container = document.getElementById('ec-catalogo-container');
  if (!container) return;
  container.innerHTML = '';
  alfajores.forEach(alf => container.appendChild(crearCard(alf)));
}

/*****************************
 *  MENU HAMBURGUESA
 *****************************/
function initHamburger() {
  const btn = document.querySelector('.hamburger-menu');
  const nav = document.getElementById('main-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
  });
}

/*****************************
 *  INIT
 *****************************/
document.addEventListener('DOMContentLoaded', () => {
  renderCatalogo();
  initHamburger();

  // Reset selección
  document.getElementById('ec-reset')?.addEventListener('click', () => {
    Object.keys(cantidades).forEach(k => delete cantidades[k]);
    document.querySelectorAll('.ec-qty').forEach(el => el.textContent = '0');
    actualizarResumen();
  });

  // Submit → WhatsApp
  const form = document.getElementById('ec-formulario');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    if (getTotal() === 0) {
      alert('Seleccioná al menos un alfajor 🍫');
      return;
    }

    const nombre  = document.getElementById('ec-nombre')?.value.trim() || '';
    const tel     = document.getElementById('ec-telefono')?.value.trim() || '';
    const detalle = document.getElementById('ec-detalle')?.value.trim() || '';

    const items = Object.entries(cantidades)
      .filter(([, q]) => q > 0)
      .map(([id, qty]) => {
        const alf = alfajores.find(a => String(a.id) === String(id));
        return `${qty} x Entre Capas ${alf ? alf.name : 'Alfajor ' + id}`;
      })
      .join(', ');

    let msg = `¡Hola Catita! Soy ${nombre}. Quiero pedir alfajores Entre Capas.\nSelección: ${items}.`;
    if (detalle) msg += `\nDetalles: ${detalle}.`;
    if (tel)     msg += `\nMi WhatsApp: ${tel}.`;

    window.open(`https://wa.me/+543517393613?text=${encodeURIComponent(msg)}`, '_blank');

    // Resetear todo
    form.reset();
    Object.keys(cantidades).forEach(k => delete cantidades[k]);
    document.querySelectorAll('.ec-qty').forEach(el => el.textContent = '0');
    actualizarResumen();
  });
});
