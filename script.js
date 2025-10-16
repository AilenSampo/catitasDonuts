/*****************
 * Seleccion de cantidad de donas 
 *******************/
document.addEventListener('DOMContentLoaded', () => {
  const btn12 = document.getElementById('select-12');
  const btn18 = document.getElementById('select-18');
  const currentLimitSpan = document.getElementById('current-limit');
  const selectedCountSpan = document.getElementById('selected-count');

  // Recuperar última elección o default 12
  let currentLimit = parseInt(localStorage.getItem('donitasLimit'), 10) || 12;

  // Si llevás un contador real de sabores, reemplazá esta línea con tu lógica
  let selectedCount = 0;

  function paintActive(limit) {
    btn12.classList.remove('active');
    btn18.classList.remove('active');
    const activeBtn = (limit === 12) ? btn12 : btn18;
    activeBtn.classList.add('active');
  }

  function setLimit(limit) {
    currentLimit = limit;
    localStorage.setItem('donitasLimit', String(limit)); // guardar elección
    currentLimitSpan.textContent = limit;
    paintActive(limit);

    // Si querés reiniciar el contador al cambiar de combo:
    selectedCount = 0;
    selectedCountSpan.textContent = selectedCount;
  }

  // Inicializar UI con lo guardado
  setLimit(currentLimit);

  // Listeners (evitamos inline onclick)
  btn12.addEventListener('click', () => setLimit(12));
  btn18.addEventListener('click', () => setLimit(18));
});




/***********************
 *  DATOS DE LAS DONAS *
 ***********************/

/* --- Donas CON TACC --- */
const donutsTacc = [
  {
    id: 1,
    name: "Chocolate con Cobertura de Chocolate",
    description: "Dona de masa de chocolate cubierta con baño de chocolate liso.",
    image: "images/sabores_donitas/chocolate_cobertura_chocolate.png",
    category: "tacc"
  },
  {
    id: 2,
    name: "Vainilla con Cobertura de Chocolate",
    description: "Dona de masa vainilla con cobertura lisa de chocolate.",
    image: "images/sabores_donitas/vainilla_chocolate.png",
    category: "tacc"
  },
  {
    id: 3,
    name: "Limón con Glaseado de Limón",
    description: "Dona de masa vainilla con cobertura lisa sabor limón color celeste.",
    image: "images/sabores_donitas/limon.png",
    category: "tacc"
  }
];

// --- Donas SIN TACC ---
const donutsSinTacc = [
  {
    id: 4,
    name: "Chocolate con Cobertura de Chocolate (Sin TACC)",
    description: "Dona de masa de chocolate cubierta con baño de chocolate liso. Sin TACC.",
    image: "images/sabores_donitas/chocolate_cobertura_chocolate.png",
    category: "sintacc"
  },
  {
    id: 5,
    name: "Vainilla con Cobertura de Chocolate (Sin TACC)",
    description: "Dona de masa vainilla con cobertura lisa de chocolate. Sin TACC.",
    image: "images/sabores_donitas/vainilla_chocolate.png",
    category: "sintacc"
  },
  {
    id: 6,
    name: "Chocolate con Dulce de Leche y Cobertura de Chocolate (Sin TACC)",
    description: "Dona de masa de chocolate con un cono de dulce de leche en el centro y baño de chocolate liso. Sin TACC.",
    image: "images/sabores_donitas/chocolate_dulce_de_leche.png",
    category: "sintacc"
  }
];

// --- Variables del carrito ---
let selectedDonuts = {};
let currentLimit = 12;
let totalSelected = 0;

// --- Referencias ---
const select12Btn = document.getElementById('select-12');
const select18Btn = document.getElementById('select-18');
const selectedCountSpan = document.getElementById('selected-count');
const currentLimitSpan = document.getElementById('current-limit');
const donutsTaccContainer = document.getElementById('donuts-tacc-container');
const donutsSinTaccContainer = document.getElementById('donuts-sintacc-container');
const submitPedidoButton = document.getElementById('submit-pedido-button');
const contadorDonasResumen = document.getElementById('contador-donas-resumen');
const listaSaboresResumen = document.getElementById('lista-sabores-resumen');
const formulario = document.getElementById('formulario');

// --- Función para crear cards ---
function crearCard(dona) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${dona.image}" alt="${dona.name}" loading="lazy">
    <h3>${dona.name}</h3>
    <p>${dona.description}</p>
    <div class="cantidad-selector" data-id="${dona.id}">
      <button onclick="decrementDonut(${dona.id})">-</button>
      <span class="cantidad-actual">${selectedDonuts[dona.id] || 0}</span>
      <button onclick="incrementDonut(${dona.id})">+</button>
    </div>
  `;
  return card;
}

// --- Renderizar donas ---
function renderDonas(lista, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  lista.forEach(dona => container.appendChild(crearCard(dona)));
}

// --- Cargar al iniciar ---
document.addEventListener("DOMContentLoaded", () => {
  renderDonas(donutsTacc, "donuts-tacc-container");
  renderDonas(donutsSinTacc, "donuts-sintacc-container");
});

// --- Funciones del carrito ---
function incrementDonut(id) {
  if (totalSelected >= currentLimit) {
    alert(`¡Ups! Máximo ${currentLimit} donitas en tu combo.`);
    return;
  }
  selectedDonuts[id] = (selectedDonuts[id] || 0) + 1;
  totalSelected++;
  updateCardCounter(id);
  updateTotalSelectedDisplay();
  updateResumenPedido();
  checkSubmitButtonState();
}

function decrementDonut(id) {
  if (selectedDonuts[id] && selectedDonuts[id] > 0) {
    selectedDonuts[id]--;
    totalSelected--;
    updateCardCounter(id);
    updateTotalSelectedDisplay();
    updateResumenPedido();
    checkSubmitButtonState();
  }
}

function updateCardCounter(id) {
  const counter = document.querySelector(`.cantidad-selector[data-id="${id}"] .cantidad-actual`);
  if (counter) {
    counter.textContent = selectedDonuts[id] || 0;
  }
}

function updateTotalSelectedDisplay() {
  selectedCountSpan.textContent = totalSelected;
  contadorDonasResumen.textContent = `${totalSelected}/${currentLimit}`;
}

function checkSubmitButtonState() {
  submitPedidoButton.disabled = totalSelected !== currentLimit;
}

function updateResumenPedido() {
  listaSaboresResumen.innerHTML = '';
  Object.keys(selectedDonuts).forEach(id => {
    const cantidad = selectedDonuts[id];
    if (cantidad > 0) {
      const donut = [...donutsTacc, ...donutsSinTacc].find(d => d.id == id);
      const listItem = document.createElement('li');
      listItem.textContent = `${cantidad} x ${donut.name}`;
      listaSaboresResumen.appendChild(listItem);
    }
  });
}

/*******************************
 *  ENVÍO POR WHATSAPP (FORM)  *
 *******************************/
if (formulario) {
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (totalSelected !== currentLimit) {
      alert(`Seleccioná exactamente ${currentLimit} donitas 😊`);
      return;
    }
    const nombre  = formulario.querySelector('input[type="text"]')?.value || "";
    const whatsapp= formulario.querySelector('input[type="tel"]')?.value || "";
    const detalle = document.getElementById('detalle-pedido')?.value || "";

    const items = Object.keys(selectedDonuts).map(id => {
      const d = donutsAll.find(x => x.id == id);
      return `${selectedDonuts[id]} ${d?.name}`;
    }).join(', ');

    let msg = `¡Hola Catita! Soy ${nombre}. Quiero mi combo de ${currentLimit} donitas.\nSabores: ${items}.`;
    if (detalle) msg += `\nDetalles: ${detalle}.`;
    if (whatsapp) msg += `\nMi WhatsApp: ${whatsapp}.`;

    window.open(`https://wa.me/+5493517918029?text=${encodeURIComponent(msg)}`, '_blank');

    // reset
    formulario.reset();
    selectedDonuts = {};
    totalSelected = 0;
    document.querySelectorAll('.cantidad-actual').forEach(e => e.textContent = '0');
    updateTotalesYResumen();
    setLimit(12);
  });
}
