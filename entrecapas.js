/*****************************
 *  DATOS — ENTRE CAPAS
 *  Agregá o editá los alfajores en este array.
 *  Para cada uno: name, description, image (ruta desde raíz), emoji (fallback).
 *****************************/
const alfajores = [
  {
    id: 1,
    name: "Relleno Bariloche",
    description: "Tapas de harina de almendras bañadas en chocolate, rellenas de ganache Bariloche. Endulzado con miel, sin azúcar agregada.",
    image: "images/productos/alfajoresbañados.png",
    emoji: "🍫"
  },
  {
    id: 2,
    name: "Relleno Bon o Bon",
    description: "Tapas de almendra bañadas en chocolate, rellenas de dulce de leche con centro de Bon o Bon. El favorito de todos. 🤩",
    image: "images/productos/alfajorbonobon.png",
    emoji: "✨"
  }
];

/*****************************
 *  PRECIOS
 *****************************/
const PRECIO_UNIDAD       = 3000;
const PRECIO_PROMO_UNIDAD = 2900; // 17400 / 6 — aplica a TODAS las unidades desde 6

function calcularTotal(unidades) {
  return unidades >= 6
    ? unidades * PRECIO_PROMO_UNIDAD
    : unidades * PRECIO_UNIDAD;
}

function formatPeso(n) {
  return '$' + n.toLocaleString('es-AR');
}

function detalleCalculo(unidades) {
  if (unidades >= 6) {
    return `${unidades} unidades x ${formatPeso(PRECIO_PROMO_UNIDAD)} c/u (precio promo)`;
  }
  return `${unidades} unidad${unidades > 1 ? 'es' : ''} × ${formatPeso(PRECIO_UNIDAD)}`;
}

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
  const lista      = document.getElementById('ec-resumen-lista');
  const totalBox   = document.getElementById('ec-total-box');
  const totalValor = document.getElementById('ec-total-valor');
  const totalDetalle = document.getElementById('ec-total-detalle');
  if (!lista) return;

  lista.innerHTML = '';
  const entries = Object.entries(cantidades).filter(([, q]) => q > 0);

  if (entries.length === 0) {
    lista.innerHTML = '<li class="ec-resumen-empty">Todavía no seleccionaste nada 🍫</li>';
    if (totalBox) totalBox.style.display = 'none';
    return;
  }

  entries.forEach(([id, qty]) => {
    const alf = alfajores.find(a => String(a.id) === String(id));
    const li = document.createElement('li');
    li.textContent = `${qty} × Entre Capas ${alf ? alf.name : 'Alfajor ' + id}`;
    lista.appendChild(li);
  });

  const unidades = getTotal();
  const total    = calcularTotal(unidades);
  if (totalBox)    totalBox.style.display = 'flex';
  if (totalValor)  totalValor.textContent  = formatPeso(total);
  if (totalDetalle) totalDetalle.textContent = detalleCalculo(unidades);
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

    const unidades = getTotal();
    const total    = calcularTotal(unidades);
    let msg = `¡Hola Catita! Soy ${nombre}. Quiero pedir alfajores Entre Capas.\nSelección: ${items}.\nTotal: ${formatPeso(total)} (${detalleCalculo(unidades)}).`;
    if (detalle) msg += `\nDetalles: ${detalle}.`;
    if (tel)     msg += `\nMi WhatsApp: ${tel}.`;

    window.open(`https://wa.me/+543517918029?text=${encodeURIComponent(msg)}`, '_blank');

    // Resetear todo
    form.reset();
    Object.keys(cantidades).forEach(k => delete cantidades[k]);
    document.querySelectorAll('.ec-qty').forEach(el => el.textContent = '0');
    actualizarResumen();
  });
});
