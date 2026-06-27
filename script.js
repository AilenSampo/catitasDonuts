document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.hamburger-menu');
  const nav = document.getElementById('main-nav');

  if(!btn || !nav) return;

  const closeMenu = () => {
    nav.classList.remove('is-open');
    btn.classList.remove('is-open');
    btn.setAttribute('aria-expanded','false');
    document.body.classList.remove('no-scroll');
  };

  const toggleMenu = () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    btn.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('no-scroll', open);
  };

  btn.addEventListener('click', toggleMenu);
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeMenu(); });

  // Cerrar al clickear fuera
  document.addEventListener('click', (e) => {
    if(nav.classList.contains('is-open') && !nav.contains(e.target) && !btn.contains(e.target)){
      closeMenu();
    }
  });
});


/***********************
 *  DATOS DE LAS DONAS *
 ***********************/
const donutsTacc = [ 
  // COCO
  { 
    id: 1, 
    name: "Coco con Cobertura de Chocolate", 
    description: "Dona de masa sabor coco cubierta con baño de chocolate liso.", 
    image: "images/sabores_donitas/coco-clasica.jpeg", 
    category: "clasica" 
  },
  { 
    id: 2, 
    name: "Coco Rellena de Dulce de Leche con Cobertura de Chocolate", 
    description: "Dona de coco rellena de dulce de leche y cubierta con baño de chocolate.", 
    image: "images/sabores_donitas/coco-clasica-dulce.jpeg", 
    category: "rellena_dulce" 
  },
  { 
    id: 3, 
    name: "Coco Rellena Block / Bon o Bon / Nutella con Cobertura de Chocolate", 
    description: "Dona de coco rellena a elección (Block, Bon o Bon o Nutella) con baño de chocolate.", 
    image: "images/sabores_donitas/cococ-clasica-premium.jpeg", 
    category: "rellena_premium" 
  },

  // NARANJA
  // { 
  //   id: 4, 
  //   name: "Naranja con Cobertura de Chocolate", 
  //   description: "Dona de masa sabor naranja cubierta con baño de chocolate liso.", 
  //   image: "images/sabores_donitas/naranja_chocolate.jpg", 
  //   category: "clasica" 
  // },
  // { 
  //   id: 5, 
  //   name: "Naranja Rellena de Dulce de Leche con Cobertura de Chocolate", 
  //   description: "Dona de naranja rellena de dulce de leche y cubierta con baño de chocolate.", 
  //   image: "images/sabores_donitas/naranja_dulcedeleche.jpg", 
  //   category: "rellena_dulce" 
  // },
  // { 
  //   id: 6, 
  //   name: "Naranja Rellena Block / Bon o Bon / Nutella con Cobertura de Chocolate", 
  //   description: "Dona de naranja rellena a elección (Block, Bon o Bon o Nutella) con baño de chocolate.", 
  //   image: "images/sabores_donitas/naranja_premium.jpg", 
  //   category: "rellena_premium" 
  // },

  // VAINILLA
  { 
    id: 7, 
    name: "Vainilla con Cobertura de Chocolate", 
    description: "Dona de masa vainilla cubierta con baño de chocolate liso.", 
    image: "images/sabores_donitas/vainilla-clasica.jpeg", 
    category: "clasica" 
  },
  { 
    id: 8, 
    name: "Vainilla Rellena de Dulce de Leche con Cobertura de Chocolate", 
    description: "Dona de vainilla rellena de dulce de leche y cubierta con baño de chocolate.", 
    image: "images/sabores_donitas/vainilla-dulce.jpeg", 
    category: "rellena_dulce" 
  },
  { 
    id: 9, 
    name: "Vainilla Rellena Block / Bon o Bon / Nutella con Cobertura de Chocolate", 
    description: "Dona de vainilla rellena a elección (Block, Bon o Bon o Nutella) con baño de chocolate.", 
    image: "images/sabores_donitas/vailinna-premium.jpeg", 
    category: "rellena_premium" 
  },

  // CHOCOLATE
  { 
    id: 10, 
    name: "Chocolate con Cobertura de Chocolate", 
    description: "Dona de masa de chocolate cubierta con baño de chocolate liso.", 
    image: "images/sabores_donitas/chocolate-clasica.jpeg", 
    category: "clasica" 
  },
  { 
    id: 11, 
    name: "Chocolate Rellena de Dulce de Leche con Cobertura de Chocolate", 
    description: "Dona de chocolate rellena de dulce de leche y cubierta con baño de chocolate.", 
    image: "images/sabores_donitas/chocolate-rellena-dulce.jpeg", 
    category: "rellena_dulce" 
  },
  { 
    id: 12, 
    name: "Chocolate Rellena Block / Bon o Bon / Nutella con Cobertura de Chocolate", 
    description: "Dona de chocolate rellena a elección (Block, Bon o Bon o Nutella) con baño de chocolate.", 
      image: "images/sabores_donitas/chocolate-rellena-dulce.jpeg", 
    category: "rellena_premium" 
  }
];

// const donutsSinTacc = [
//   { id: 4, name: "Chocolate con Cobertura de Chocolate (Sin TACC)", description: "Dona de masa de chocolate cubierta con baño de chocolate liso. Sin TACC.", image: "images/sabores_donitas/chocolate_cobertura_chocolate.png", category: "sintacc" },
//   { id: 5, name: "Vainilla con Cobertura de Chocolate (Sin TACC)", description: "Dona de masa vainilla con cobertura lisa de chocolate. Sin TACC.", image: "images/sabores_donitas/vainilla_chocolate.png", category: "sintacc" },
//   { id: 6, name: "Chocolate con Dulce de Leche y Cobertura de Chocolate (Sin TACC)", description: "Dona de masa de chocolate con un cono de dulce de leche en el centro y baño de chocolate liso. Sin TACC.", image: "images/sabores_donitas/chocolate_dulce_de_leche.png", category: "sintacc" }
// ];

/* ===========================================================
   PRECIOS POR CATEGORÍA
   =========================================================== */
const PRECIOS_DONA = {
  18: { clasica: 9500,  rellena_dulce: 13700, rellena_premium: 15500 },
  24: { clasica: 12100, rellena_dulce: 17700, rellena_premium: 19800 }
};

function calcularPrecioDonas(seleccion, limite) {
  const precios = PRECIOS_DONA[limite] || PRECIOS_DONA[18];
  const unitarios = {};
  Object.keys(precios).forEach(cat => { unitarios[cat] = precios[cat] / limite; });

  let total = 0;
  Object.entries(seleccion).forEach(([id, qty]) => {
    qty = Number(qty || 0);
    if (qty <= 0) return;
    const dona = donutsTacc.find(d => String(d.id) === String(id));
    if (dona) total += qty * (unitarios[dona.category] || 0);
  });
  return Math.round(total);
}

function formatPesoDona(n) {
  return '$' + n.toLocaleString('es-AR');
}

function detallePrecioDonas(seleccion, limite) {
  const precios = PRECIOS_DONA[limite] || PRECIOS_DONA[18];
  const porCategoria = {};
  Object.entries(seleccion).forEach(([id, qty]) => {
    qty = Number(qty || 0);
    if (qty <= 0) return;
    const dona = donutsTacc.find(d => String(d.id) === String(id));
    if (dona) porCategoria[dona.category] = (porCategoria[dona.category] || 0) + qty;
  });
  return Object.entries(porCategoria).map(([cat, qty]) => {
    const labels = { clasica: 'Clásicas', rellena_dulce: 'Rellenas DDL', rellena_premium: 'Premium' };
    const unit = precios[cat] / limite;
    return `${qty} ${labels[cat] || cat} × ${formatPesoDona(Math.round(unit))}`;
  }).join(' + ');
}

function actualizarTotalDonas() {
  const box    = document.getElementById('dona-total-box');
  const valor  = document.getElementById('dona-total-valor');
  const detalle = document.getElementById('dona-total-detalle');
  if (!box) return;

  const seleccion = window.selectedDonuts || {};
  const limite    = window.getCurrentLimit ? window.getCurrentLimit() : 18;
  const count     = Object.values(seleccion).reduce((s, n) => s + Number(n || 0), 0);

  if (count === 0) { box.style.display = 'none'; return; }

  const total = calcularPrecioDonas(seleccion, limite);
  box.style.display  = 'flex';
  valor.textContent  = formatPesoDona(total);
  detalle.textContent = detallePrecioDonas(seleccion, limite);
}

/* ===========================================================
   ESTADO ÚNICO + PERSISTENCIA + UI
   =========================================================== */
(function () {
  const LS_LIMIT = 'donitasLimit';
  const LS_SELECTION = 'donitasSeleccion';

  const WEBHOOK_URL = "https://hook.us2.make.com/vjmr04bzx8uv8z3mlm8cwonchg5t46a9";

    // Enviar pedido a Make
  function enviarPedidoAMake({ nombre, whatsapp, detalle }) {
    if (!WEBHOOK_URL) return;

    // Armar array de sabores a partir de selectedDonuts
    const saboresArray = Object.entries(window.selectedDonuts).map(([id, qty]) => {
      const dona = donutsTacc.find(x => String(x.id) === String(id));
      return {
        id: Number(id),
        sabor: dona ? dona.name : `Sabor ${id}`,
        cantidad: Number(qty || 0)
      };
    });

    const payload = {
      cliente: nombre,
      telefono: whatsapp,
      unidades: getCurrentLimit(),   // usa tu estado actual
      comentarios: detalle,
      sabores: saboresArray
    };

    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(() => {
        console.log("Pedido enviado a Make ✅");
      })
      .catch(err => {
        console.error("Error al enviar a Make", err);
      });
  }


  // Estado único
  let currentLimit   = parseInt(localStorage.getItem(LS_LIMIT), 10) || 18;
  let selectedDonuts = JSON.parse(localStorage.getItem(LS_SELECTION)) || {}; // {id: qty}

  // Puente global (evita desincronías)
  window.selectedDonuts  = selectedDonuts;
  window.getCurrentLimit = () => currentLimit;

  // Refs UI
  const btn18 = document.getElementById('select-18');
  const btn24 = document.getElementById('select-24');
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
    if (!btn18 || !btn24) return;
    btn18.classList.toggle('active', limit === 18);
    btn24.classList.toggle('active', limit === 24);
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

    const totalSel = document.querySelector('.total-selected');
    if (totalSel) totalSel.style.color = (total === currentLimit) ? '#25c4ea' : '#f06bb4';

    if (submitPedidoButton) submitPedidoButton.disabled = total !== currentLimit;

    actualizarTotalDonas();
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

    btn18?.addEventListener('click', () => setLimit(18));
    btn24?.addEventListener('click', () => setLimit(24));

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

        const precioTotal = calcularPrecioDonas(window.selectedDonuts, currentLimit);
        const precioDetalle = detallePrecioDonas(window.selectedDonuts, currentLimit);
        let msg = `¡Hola Catita! Soy ${nombre}. Quiero mi combo de ${currentLimit} donitas.\nSabores: ${items}.\nTotal: ${formatPesoDona(precioTotal)} (${precioDetalle}).`;
        if (detalle)  msg += `\nDetalles: ${detalle}.`;
        if (whatsapp) msg += `\nMi WhatsApp: ${whatsapp}.`;

        enviarPedidoAMake({ nombre, whatsapp, detalle });

        window.open(`https://wa.me/+543517918029?text=${encodeURIComponent(msg)}`, '_blank');

        // reset
        formulario.reset();
        window.selectedDonuts = {};
        persist();
        document.querySelectorAll('.cantidad-actual').forEach(e => e.textContent = '0');
        setLimit(18);
        updateResumenItems();
        updateTotalsUI();
      });
    }
  }
})();
