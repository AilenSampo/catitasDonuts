





/***********************
 *  DATOS DE LAS DONAS *
 ***********************/
const donutsTacc = [
  { id: 1, name: "Chocolate con Cobertura de Chocolate", description: "Dona de masa de chocolate cubierta con baño de chocolate liso.", image: "images/sabores_donitas/chocolate_cobertura_chocolate.jpg", category: "tacc" },
  { id: 2, name: "Vainilla con Cobertura de Chocolate", description: "Dona de masa vainilla con cobertura lisa de chocolate.", image: "images/sabores_donitas/vainilla_chocolate.jpg", category: "tacc" },
  { id: 3, name: "Limón con Glaseado de Limón", description: "Dona de masa vainilla con cobertura lisa sabor limón color celeste.", image: "images/sabores_donitas/limon.jpg", category: "tacc" }
];

// const donutsSinTacc = [
//   { id: 4, name: "Chocolate con Cobertura de Chocolate (Sin TACC)", description: "Dona de masa de chocolate cubierta con baño de chocolate liso. Sin TACC.", image: "images/sabores_donitas/chocolate_cobertura_chocolate.png", category: "sintacc" },
//   { id: 5, name: "Vainilla con Cobertura de Chocolate (Sin TACC)", description: "Dona de masa vainilla con cobertura lisa de chocolate. Sin TACC.", image: "images/sabores_donitas/vainilla_chocolate.png", category: "sintacc" },
//   { id: 6, name: "Chocolate con Dulce de Leche y Cobertura de Chocolate (Sin TACC)", description: "Dona de masa de chocolate con un cono de dulce de leche en el centro y baño de chocolate liso. Sin TACC.", image: "images/sabores_donitas/chocolate_dulce_de_leche.png", category: "sintacc" }
// ];

/* ===========================================================
   ESTADO ÚNICO + PERSISTENCIA + UI
   =========================================================== */
(function () {
  const LS_LIMIT = 'donitasLimit';
  const LS_SELECTION = 'donitasSeleccion';

  // Estado único
  let currentLimit   = parseInt(localStorage.getItem(LS_LIMIT), 10) || 12;
  let selectedDonuts = JSON.parse(localStorage.getItem(LS_SELECTION)) || {}; // {id: qty}

  // Puente global (evita desincronías)
  window.selectedDonuts  = selectedDonuts;
  window.getCurrentLimit = () => currentLimit;

  // Refs UI
  const btn12 = document.getElementById('select-12');
  const btn18 = document.getElementById('select-18');
  const elSelected = document.getElementById('selected-count');
  const elLimit = document.getElementById('current-limit');
  const elResumenTotal = document.getElementById('contador-donas-resumen'); // "X/Y"
  const elResumenItems = document.getElementById('lista-sabores-resumen');  // <ul>
  const submitPedidoButton = document.getElementById('submit-pedido-button');
  const formulario = document.getElementById('formulario');

  // Helpers
  const persist = () => {
    localStorage.setItem(LS_LIMIT, String(currentLimit));
    localStorage.setItem(LS_SELECTION, JSON.stringify(window.selectedDonuts));
  };

  const getSelectedCount = () =>
    Object.values(window.selectedDonuts).reduce((acc, n) => acc + Number(n || 0), 0);

  function paintActive(limit) {
    if (!btn12 || !btn18) return;
    btn12.classList.toggle('active', limit === 12);
    btn18.classList.toggle('active', limit === 18);
  }

  function refreshCardQty(id) {
    const span = document.querySelector(`.cantidad-selector[data-id="${id}"] .cantidad-actual`);
    if (span) span.textContent = window.selectedDonuts[id] || 0;
  }

  function updateResumenItems() {
    if (!elResumenItems) return;
    elResumenItems.innerHTML = '';
    const all = [...donutsTacc,];
    Object.entries(window.selectedDonuts).forEach(([id, qty]) => {
      qty = Number(qty || 0);
      if (qty > 0) {
        const d = all.find(x => String(x.id) === String(id));
        const li = document.createElement('li');
        li.textContent = `${qty} x ${d ? d.name : 'Sabor ' + id}`;
        elResumenItems.appendChild(li);
      }
    });
  }

  function sanitizeSelection() {
    const validIds = new Set([...donutsTacc,].map(d => String(d.id)));
    for (const id of Object.keys(window.selectedDonuts)) {
      const qty = Number(window.selectedDonuts[id] || 0);
      if (!validIds.has(String(id)) || qty <= 0 || Number.isNaN(qty)) {
        delete window.selectedDonuts[id];
      }
    }
    persist();
  }

  function updateTotalsUI() {
    const total = getSelectedCount();
    if (elSelected) elSelected.textContent = total;
    if (elLimit) elLimit.textContent = currentLimit;
    if (elResumenTotal) elResumenTotal.textContent = `${total}/${currentLimit}`;

    const totalSel = document.querySelector('.total-selected'); // color opcional
    if (totalSel) totalSel.style.color = (total === currentLimit) ? '#25c4ea' : '#f06bb4';

    if (submitPedidoButton) submitPedidoButton.disabled = total !== currentLimit;
  }

  // Acciones públicas
  function setLimit(limit) {
    currentLimit = limit;
    persist();
    paintActive(limit);
    updateResumenItems();
    updateTotalsUI();
  }

  function incrementDonut(id) {
    if (getSelectedCount() >= currentLimit) return;
    window.selectedDonuts[id] = (window.selectedDonuts[id] || 0) + 1;
    persist();
    refreshCardQty(id);
    updateResumenItems();
    updateTotalsUI();

    const span = document.querySelector(`.cantidad-selector[data-id="${id}"] .cantidad-actual`);
    if (span) span.animate([{ transform: 'scale(1.15)' }, { transform: 'scale(1)' }], { duration: 140 });
  }

  function decrementDonut(id) {
    if ((window.selectedDonuts[id] || 0) > 0) {
      window.selectedDonuts[id] -= 1;
      if (window.selectedDonuts[id] === 0) delete window.selectedDonuts[id];
      persist();
      refreshCardQty(id);
      updateResumenItems();
      updateTotalsUI();
    }
  }

  // Exponer para onclick inline
  window.incrementDonut = incrementDonut;
  window.decrementDonut = decrementDonut;
  window.setLimit = setLimit;

  // Cards
  function crearCard(dona) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${dona.image}" alt="${dona.name}" loading="lazy">
      <h3>${dona.name}</h3>
      <p>${dona.description}</p>
      <div class="cantidad-selector" data-id="${dona.id}">
        <button type="button" onclick="decrementDonut(${dona.id})">−</button>
        <span class="cantidad-actual">${window.selectedDonuts[dona.id] || 0}</span>
        <button type="button" onclick="incrementDonut(${dona.id})">+</button>
      </div>
    `;
    return card;
  }

  function renderDonas(lista, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
    lista.forEach(dona => container.appendChild(crearCard(dona)));
  }

  function renderAllDonas() {
    renderDonas(donutsTacc, "donuts-tacc-container");
    // renderDonas(donutsSinTacc, "donuts-sintacc-container");
  }

  // Reset combo (opcional si tenés el botón)
  document.getElementById('reset-combo')?.addEventListener('click', () => {
    window.selectedDonuts = {};
    persist();
    document.querySelectorAll('.cantidad-actual').forEach(e => e.textContent = '0');
    updateResumenItems();
    updateTotalsUI();
  });

  // Init seguro
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    renderAllDonas();
    sanitizeSelection();

    btn12?.addEventListener('click', () => setLimit(12));
    btn18?.addEventListener('click', () => setLimit(18));

    setLimit(currentLimit);
    Object.keys(window.selectedDonuts).forEach(id => refreshCardQty(id));
    updateResumenItems();
    updateTotalsUI();

    // Envío por WhatsApp
    if (formulario) {
      formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        const total = getSelectedCount();
        if (total !== currentLimit) {
          alert(`Seleccioná exactamente ${currentLimit} donitas 😊`);
          return;
        }

        const nombre   = formulario.querySelector('input[type="text"]')?.value || "";
        const whatsapp = formulario.querySelector('input[type="tel"]')?.value || "";
        const detalle  = document.getElementById('detalle-pedido')?.value || "";

        const all = [...donutsTacc,];
        const items = Object.entries(window.selectedDonuts)
          .map(([id, qty]) => {
            const d = all.find(x => String(x.id) === String(id));
            return `${qty} x ${d ? d.name : ('Sabor ' + id)}`;
          }).join(', ');

        let msg = `¡Hola Catita! Soy ${nombre}. Quiero mi combo de ${currentLimit} donitas.\nSabores: ${items}.`;
        if (detalle)  msg += `\nDetalles: ${detalle}.`;
        if (whatsapp) msg += `\nMi WhatsApp: ${whatsapp}.`;

        window.open(`https://wa.me/+5493517918029?text=${encodeURIComponent(msg)}`, '_blank');

        // reset
        formulario.reset();
        window.selectedDonuts = {};
        persist();
        document.querySelectorAll('.cantidad-actual').forEach(e => e.textContent = '0');
        setLimit(12);
        updateResumenItems();
        updateTotalsUI();
      });
    }
  }
})();
