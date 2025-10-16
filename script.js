/*****************
 * Seleccion de cantidad de donas 
 *******************/
// document.addEventListener('DOMContentLoaded', () => {
//   const btn12 = document.getElementById('select-12');
//   const btn18 = document.getElementById('select-18');
//   const currentLimitSpan = document.getElementById('current-limit');
//   const selectedCountSpan = document.getElementById('selected-count');

//   // Recuperar última elección o default 12
//   let currentLimit = parseInt(localStorage.getItem('donitasLimit'), 10) || 12;

//   // Si llevás un contador real de sabores, reemplazá esta línea con tu lógica
//   let selectedCount = 0;

//   function paintActive(limit) {
//     btn12.classList.remove('active');
//     btn18.classList.remove('active');
//     const activeBtn = (limit === 12) ? btn12 : btn18;
//     activeBtn.classList.add('active');
//   }

//   function setLimit(limit) {
//     currentLimit = limit;
//     localStorage.setItem('donitasLimit', String(limit)); // guardar elección
//     currentLimitSpan.textContent = limit;
//     paintActive(limit);

//     // Si querés reiniciar el contador al cambiar de combo:
//     selectedCount = 0;
//     selectedCountSpan.textContent = selectedCount;
//   }

//   // Inicializar UI con lo guardado
//   setLimit(currentLimit);

//   // Listeners (evitamos inline onclick)
//   btn12.addEventListener('click', () => setLimit(12));
//   btn18.addEventListener('click', () => setLimit(18));
// });




/***********************
 *  DATOS DE LAS DONAS *
 ***********************/

/* --- Donas CON TACC --- */
// const donutsTacc = [
//   {
//     id: 1,
//     name: "Chocolate con Cobertura de Chocolate",
//     description: "Dona de masa de chocolate cubierta con baño de chocolate liso.",
//     image: "images/sabores_donitas/chocolate_cobertura_chocolate.png",
//     category: "tacc"
//   },
//   {
//     id: 2,
//     name: "Vainilla con Cobertura de Chocolate",
//     description: "Dona de masa vainilla con cobertura lisa de chocolate.",
//     image: "images/sabores_donitas/vainilla_chocolate.png",
//     category: "tacc"
//   },
//   {
//     id: 3,
//     name: "Limón con Glaseado de Limón",
//     description: "Dona de masa vainilla con cobertura lisa sabor limón color celeste.",
//     image: "images/sabores_donitas/limon.png",
//     category: "tacc"
//   }
// ];

// // --- Donas SIN TACC ---
// const donutsSinTacc = [
//   {
//     id: 4,
//     name: "Chocolate con Cobertura de Chocolate (Sin TACC)",
//     description: "Dona de masa de chocolate cubierta con baño de chocolate liso. Sin TACC.",
//     image: "images/sabores_donitas/chocolate_cobertura_chocolate.png",
//     category: "sintacc"
//   },
//   {
//     id: 5,
//     name: "Vainilla con Cobertura de Chocolate (Sin TACC)",
//     description: "Dona de masa vainilla con cobertura lisa de chocolate. Sin TACC.",
//     image: "images/sabores_donitas/vainilla_chocolate.png",
//     category: "sintacc"
//   },
//   {
//     id: 6,
//     name: "Chocolate con Dulce de Leche y Cobertura de Chocolate (Sin TACC)",
//     description: "Dona de masa de chocolate con un cono de dulce de leche en el centro y baño de chocolate liso. Sin TACC.",
//     image: "images/sabores_donitas/chocolate_dulce_de_leche.png",
//     category: "sintacc"
//   }
// ];

// window.selectedDonuts = window.selectedDonuts || {};

// // --- Variables del carrito ---
// // let selectedDonuts = {};
// // let currentLimit = 12;
// // let totalSelected = 0;

// // --- Referencias ---
// const select12Btn = document.getElementById('select-12');
// const select18Btn = document.getElementById('select-18');
// const selectedCountSpan = document.getElementById('selected-count');
// const currentLimitSpan = document.getElementById('current-limit');
// const donutsTaccContainer = document.getElementById('donuts-tacc-container');
// const donutsSinTaccContainer = document.getElementById('donuts-sintacc-container');
// const submitPedidoButton = document.getElementById('submit-pedido-button');
// const contadorDonasResumen = document.getElementById('contador-donas-resumen');
// const listaSaboresResumen = document.getElementById('lista-sabores-resumen');
// const formulario = document.getElementById('formulario');

// // --- Función para crear cards ---
// function crearCard(dona) {
//   const card = document.createElement("div");
//   card.className = "card";
//   card.innerHTML = `
//     <img src="${dona.image}" alt="${dona.name}" loading="lazy">
//     <h3>${dona.name}</h3>
//     <p>${dona.description}</p>
//     <div class="cantidad-selector" data-id="${dona.id}">
//       <button type="button" onclick="decrementDonut(${dona.id})">−</button>
//       <span class="cantidad-actual">${selectedDonuts[dona.id] || 0}</span>
//       <button type="button" onclick="incrementDonut(${dona.id})">+</button>
//     </div>
//   `;
//   return card;
// }

// // --- Renderizar donas ---
// function renderDonas(lista, containerId) {
//   const container = document.getElementById(containerId);
//   container.innerHTML = "";
//   lista.forEach(dona => container.appendChild(crearCard(dona)));
// }

// // --- Cargar al iniciar ---
// // document.addEventListener("DOMContentLoaded", () => {
// //   renderDonas(donutsTacc, "donuts-tacc-container");
// //   renderDonas(donutsSinTacc, "donuts-sintacc-container");
// // });

// if (window.refreshCardQty && window.selectedDonuts) {
//     Object.keys(window.selectedDonuts).forEach(id => refreshCardQty(id));
//   }

// if (window.updateTotalsUI) updateTotalsUI();
// if (window.updateResumenItems) updateResumenItems();


// // --- Funciones del carrito ---
// function incrementDonut(id) {
//   if (totalSelected >= currentLimit) {
//     alert(`¡Ups! Máximo ${currentLimit} donitas en tu combo.`);
//     return;
//   }
//   selectedDonuts[id] = (selectedDonuts[id] || 0) + 1;
//   totalSelected++;
//   updateCardCounter(id);
//   updateTotalSelectedDisplay();
//   updateResumenPedido();
//   checkSubmitButtonState();
// }

// function decrementDonut(id) {
//   if (selectedDonuts[id] && selectedDonuts[id] > 0) {
//     selectedDonuts[id]--;
//     totalSelected--;
//     updateCardCounter(id);
//     updateTotalSelectedDisplay();
//     updateResumenPedido();
//     checkSubmitButtonState();
//   }
// }

// function updateCardCounter(id) {
//   const counter = document.querySelector(`.cantidad-selector[data-id="${id}"] .cantidad-actual`);
//   if (counter) {
//     counter.textContent = selectedDonuts[id] || 0;
//   }
// }

// function updateTotalSelectedDisplay() {
//   selectedCountSpan.textContent = totalSelected;
//   contadorDonasResumen.textContent = `${totalSelected}/${currentLimit}`;
// }

// function checkSubmitButtonState() {
//   submitPedidoButton.disabled = totalSelected !== currentLimit;
// }

// function updateResumenPedido() {
//   listaSaboresResumen.innerHTML = '';
//   Object.keys(selectedDonuts).forEach(id => {
//     const cantidad = selectedDonuts[id];
//     if (cantidad > 0) {
//       const donut = [...donutsTacc, ...donutsSinTacc].find(d => d.id == id);
//       const listItem = document.createElement('li');
//       listItem.textContent = `${cantidad} x ${donut.name}`;
//       listaSaboresResumen.appendChild(listItem);
//     }
//   });
// }

/***********************
 *  DATOS DE LAS DONAS *
 ***********************/
const donutsTacc = [
  { id: 1, name: "Chocolate con Cobertura de Chocolate", description: "Dona de masa de chocolate cubierta con baño de chocolate liso.", image: "images/sabores_donitas/chocolate_cobertura_chocolate.png", category: "tacc" },
  { id: 2, name: "Vainilla con Cobertura de Chocolate", description: "Dona de masa vainilla con cobertura lisa de chocolate.", image: "images/sabores_donitas/vainilla_chocolate.png", category: "tacc" },
  { id: 3, name: "Limón con Glaseado de Limón", description: "Dona de masa vainilla con cobertura lisa sabor limón color celeste.", image: "images/sabores_donitas/limon.png", category: "tacc" }
];

const donutsSinTacc = [
  { id: 4, name: "Chocolate con Cobertura de Chocolate (Sin TACC)", description: "Dona de masa de chocolate cubierta con baño de chocolate liso. Sin TACC.", image: "images/sabores_donitas/chocolate_cobertura_chocolate.png", category: "sintacc" },
  { id: 5, name: "Vainilla con Cobertura de Chocolate (Sin TACC)", description: "Dona de masa vainilla con cobertura lisa de chocolate. Sin TACC.", image: "images/sabores_donitas/vainilla_chocolate.png", category: "sintacc" },
  { id: 6, name: "Chocolate con Dulce de Leche y Cobertura de Chocolate (Sin TACC)", description: "Dona de masa de chocolate con un cono de dulce de leche en el centro y baño de chocolate liso. Sin TACC.", image: "images/sabores_donitas/chocolate_dulce_de_leche.png", category: "sintacc" }
];

/* ===========================================================
   ESTADO ÚNICO + PERSISTENCIA + UI (sin duplicados)
   =========================================================== */
(function () {
  const LS_LIMIT = 'donitasLimit';
  const LS_SELECTION = 'donitasSeleccion';

  // Estado (único)
  let currentLimit = parseInt(localStorage.getItem(LS_LIMIT), 10) || 12;
  let selectedDonuts = JSON.parse(localStorage.getItem(LS_SELECTION)) || {}; // {id: qty}
  window.selectedDonuts = selectedDonuts;        // ← cards y resumen usan el MISMO objeto
  window.getCurrentLimit = () => currentLimit;   // ← util si algo externo lee el límite

  
  // UI refs (tus IDs reales)
  const btn12 = document.getElementById('select-12');
  const btn18 = document.getElementById('select-18');
  const elSelected = document.getElementById('selected-count');
  const elLimit = document.getElementById('current-limit');
  const elResumenTotal = document.getElementById('contador-donas-resumen');   // <- TUS IDS
  const elResumenItems = document.getElementById('lista-sabores-resumen');    // <- TUS IDS
  const submitPedidoButton = document.getElementById('submit-pedido-button');
  const formulario = document.getElementById('formulario');

  // Helpers
  // const getSelectedCount = () =>
  //   Object.values(selectedDonuts).reduce((a, n) => a + Number(n || 0), 0);
  const getSelectedCount = () =>
  Object.values(window.selectedDonuts).reduce((acc, n) => acc + Number(n || 0), 0);


  const persist = () => {
    localStorage.setItem(LS_LIMIT, String(currentLimit));
    localStorage.setItem(LS_SELECTION, JSON.stringify(selectedDonuts));
  };

  function paintActive(limit) {
    if (!btn12 || !btn18) return;
    btn12.classList.toggle('active', limit === 12);
    btn18.classList.toggle('active', limit === 18);
  }

  function refreshCardQty(id) {
    const span = document.querySelector(`.cantidad-selector[data-id="${id}"] .cantidad-actual`);
    if (span) span.textContent = selectedDonuts[id] || 0;
  }

  function updateResumenItems() {
    if (!elResumenItems) return;
    elResumenItems.innerHTML = '';
    const all = [...donutsTacc, ...donutsSinTacc];
    Object.entries(selectedDonuts).forEach(([id, qty]) => {
      if (qty > 0) {
        const d = all.find(x => String(x.id) === String(id));
        const li = document.createElement('li');
        li.textContent = `${qty} x ${d ? d.name : 'Sabor ' + id}`;
        elResumenItems.appendChild(li);
      }
    });
  }

  function updateTotalsUI() {
    const total = getSelectedCount();
    if (elSelected) elSelected.textContent = total;
    if (elLimit) elLimit.textContent = currentLimit;
    if (elResumenTotal) elResumenTotal.textContent = `${total}/${currentLimit}`;

    // colorcito opcional al llegar al límite
    const totalSel = document.querySelector('.total-selected');
    if (totalSel) totalSel.style.color = (total === currentLimit) ? '#25c4ea' : '#f06bb4';

    if (submitPedidoButton) submitPedidoButton.disabled = total !== currentLimit;
  }

  // Acciones públicas (usadas por los botones +/−)
  function setLimit(limit) {
    currentLimit = limit;
    persist();
    paintActive(limit);
    updateResumenItems();
    updateTotalsUI();
  }

  function incrementDonut(id) {
    if (getSelectedCount() >= currentLimit) return;
    selectedDonuts[id] = (selectedDonuts[id] || 0) + 1;
    persist();
    refreshCardQty(id);
    updateResumenItems();
    updateTotalsUI();

    const span = document.querySelector(`.cantidad-selector[data-id="${id}"] .cantidad-actual`);
    if (span) span.animate([{ transform: 'scale(1.15)' }, { transform: 'scale(1)' }], { duration: 140 });
  }

  function decrementDonut(id) {
    if ((selectedDonuts[id] || 0) > 0) {
      selectedDonuts[id] -= 1;
      if (selectedDonuts[id] === 0) delete selectedDonuts[id];
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

  // Render de cards (usa tu estructura)
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
  const taccEl = document.getElementById('donuts-tacc-container');
  const sinEl  = document.getElementById('donuts-sintacc-container');

  if (taccEl && Array.isArray(donutsTacc)) {
    taccEl.innerHTML = '';
    donutsTacc.forEach(d => taccEl.appendChild(crearCard(d)));
  }

  if (sinEl && Array.isArray(donutsSinTacc)) {
    sinEl.innerHTML = '';
    donutsSinTacc.forEach(d => sinEl.appendChild(crearCard(d)));
  }
}

// Llamada segura: si el DOM ya está listo, renderiza ya; si no, espera.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderAllDonas);
} else {
  renderAllDonas();
}


  // Inicialización segura
  // document.addEventListener('DOMContentLoaded', () => {
  //   renderDonas(donutsTacc, "donuts-tacc-container");
  //   renderDonas(donutsSinTacc, "donuts-sintacc-container");

  //   // listeners de 12/18
  //   if (btn12) btn12.addEventListener('click', () => setLimit(12));
  //   if (btn18) btn18.addEventListener('click', () => setLimit(18));

  //   setLimit(currentLimit);                 // pinta botón activo y totales
  //   Object.keys(selectedDonuts).forEach(id => refreshCardQty(id));
  //   updateResumenItems();
  //   updateTotalsUI();
  // });

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
      const all = [...donutsTacc, ...donutsSinTacc];

      const items = Object.entries(selectedDonuts)
        .map(([id, qty]) => {
          const d = all.find(x => String(x.id) === String(id));
          return `${qty} x ${d ? d.name : ('Sabor ' + id)}`;
        }).join(', ');

      let msg = `¡Hola Catita! Soy ${nombre}. Quiero mi combo de ${currentLimit} donitas.\nSabores: ${items}.`;
      if (detalle)  msg += `\nDetalles: ${detalle}.`;
      if (whatsapp) msg += `\nMi WhatsApp: ${whatsapp}.`;

      window.open(`https://wa.me/+5493517918029?text=${encodeURIComponent(msg)}`, '_blank');

      // reset UI + estado
      formulario.reset();
      selectedDonuts = {};
      persist();
      document.querySelectorAll('.cantidad-actual').forEach(e => e.textContent = '0');
      setLimit(12);
      updateResumenItems();
      updateTotalsUI();
    });
  }
})();



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

/* -------- INTEGRACIÓN SEGURO (PEGA AL FINAL DE TU JS) -------- */
(function () {
  // NOMBRES de keys en localStorage
  const LS_LIMIT = 'donitasLimit';
  const LS_SELECTION = 'donitasSeleccion';

  // Recupero estado persistido o valores por defecto
  let currentLimit = parseInt(localStorage.getItem(LS_LIMIT), 10) || 12;
  let selectedDonuts = JSON.parse(localStorage.getItem(LS_SELECTION)) || {}; // {id: qty}

    window.selectedDonuts   = selectedDonuts; 
    window.getCurrentLimit  = () => currentLimit;
  // Elementos UI (ajustá IDs si los tenés distintos)
  const elSelected = document.getElementById('selected-count');
  const elLimit = document.getElementById('current-limit');
  const elResumenTotal = document.getElementById('resumen-total');
  const elResumenItems = document.getElementById('resumen-items');

  function persist() {
    localStorage.setItem(LS_LIMIT, String(currentLimit));
    localStorage.setItem(LS_SELECTION, JSON.stringify(selectedDonuts));
  }

  function getSelectedCount() {
    return Object.values(selectedDonuts).reduce((a, n) => a + Number(n || 0), 0);
  }

  function updateTotalsUI() {
    const total = getSelectedCount();
    if (elSelected) elSelected.textContent = total;
    if (elLimit) elLimit.textContent = currentLimit;
    if (elResumenTotal) elResumenTotal.textContent = `${total}/${currentLimit}`;

    // Color si llega al límite (opcional)
    const totalSel = document.querySelector('.total-selected');
    if (totalSel) totalSel.style.color = (total === currentLimit) ? '#25c4ea' : '#f06bb4';
  }

  function updateResumenItems() {
    if (!elResumenItems) return;
    elResumenItems.innerHTML = '';
    Object.entries(selectedDonuts).forEach(([id, qty]) => {
      if (qty > 0) {
        // Si tenés un array global DONAS ó similar, podés sacar el nombre real:
        let name = (window.DONAS || []).find(d => String(d.id) === String(id))?.name || `Sabor ${id}`;
        const div = document.createElement('div');
        div.textContent = `${qty} x ${name}`;
        elResumenItems.appendChild(div);
      }
    });
  }

  function refreshCardQty(id) {
    const span = document.querySelector(`.cantidad-selector[data-id="${id}"] .cantidad-actual`);
    if (span) span.textContent = selectedDonuts[id] || 0;
  }

  // function setLimit(limit) {
  //   currentLimit = limit;
  //   persist();
  //   // Actualizo estilos de botones si existen
  //   const b12 = document.getElementById('select-12');
  //   const b18 = document.getElementById('select-18');
  //   if (b12) b12.classList.toggle('active', limit === 12);
  //   if (b18) b18.classList.toggle('active', limit === 18);

  //   // Si al cambiar de límite querés resetear las cantidades, descomentá:
  //   // selectedDonuts = {}; persist(); document.querySelectorAll('.cantidad-actual').forEach(e => e.textContent = '0');

  //   updateResumenItems();
  //   updateTotalsUI();
  // }

 function incrementDonut(id) {
  if (getSelectedCount() >= currentLimit) return;
  window.selectedDonuts[id] = (window.selectedDonuts[id] || 0) + 1;
  localStorage.setItem(LS_SELECTION, JSON.stringify(window.selectedDonuts));
  refreshCardQty(id);
  updateResumenItems();
  updateTotalsUI();

    // pequeña anim (opcional)
    const span = document.querySelector(`.cantidad-selector[data-id="${id}"] .cantidad-actual`);
    if (span) span.animate([{ transform: 'scale(1.15)' }, { transform: 'scale(1)' }], { duration: 140 });
  }

  function incrementDonut(id) {
  if (getSelectedCount() >= currentLimit) return;
  window.selectedDonuts[id] = (window.selectedDonuts[id] || 0) + 1;
  localStorage.setItem(LS_SELECTION, JSON.stringify(window.selectedDonuts));
  refreshCardQty(id);
  updateResumenItems();
  updateTotalsUI();
  }


  // Exponer funciones si usás onclick inline en HTML (ej. onclick="incrementDonut(1)")
  window.incrementDonut = incrementDonut;
  window.decrementDonut = decrementDonut;
  window.setLimit = setLimit;

  // Inicializo UI
  // Si tus elementos tienen otros IDs, asegurate de cambiar arriba.
  // Si renderizás las cards después (por ejemplo con fetch), llamá a refreshCardQty(id) cuando termines el render.
  setLimit(currentLimit);
  // refresco cantidades en cards existentes:
  Object.keys(selectedDonuts).forEach(id => refreshCardQty(id));
  updateResumenItems();
  updateTotalsUI();

  // Opcional: listeners para los botones 12/18 si no los tenés
  const b12 = document.getElementById('select-12');
  const b18 = document.getElementById('select-18');
  if (b12) b12.addEventListener('click', () => setLimit(12));
  if (b18) b18.addEventListener('click', () => setLimit(18));

})();

Object.values(window.selectedDonuts).reduce((a,b)=>a+Number(b||0),0)

