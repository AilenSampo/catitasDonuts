// Data de las donitas (incluyendo la categoría TACC/Sin TACC para renderizado)
const donuts = [
    { id: 1, name: "Chocolate", description: "Con cobertura de chocolate y chispitas de colores.", image: "images/dona-choco.png", category: "tacc" },
    { id: 2, name: "Vainilla", description: "Glaseado de frutilla con forma de corazón y sprinkles.", image: "images/dona-frutilla.png", category: "tacc" }, // Usando frutilla como vainilla para la imagen
    { id: 3, name: "Limón", description: "Fresco glaseado de limón con un brillo especial.", image: "images/dona-frutilla.png", category: "tacc" }, // Usando frutilla para la imagen
    { id: 4, name: "Chocolate Sin Tacc", description: "Sabor intenso sin TACC.", image: "images/dona-choco.png", category: "sintacc" },
    { id: 5, name: "Vainilla Sin Tacc", description: "El clásico sabor de vainilla sin TACC.", image: "images/dona-vainilla.png", category: "sintacc" },
    { id: 6, name: "Chocolate con Dulce de Leche Sin Tacc", description: "Doble placer sin TACC: chocolate y dulce de leche.", image: "images/dona-choco-ddl.png", category: "sintacc" }
    // Puedes añadir más tipos de donitas aquí con su respectiva 'category'
];

// Variables de estado del carrito
let selectedDonuts = {}; // {donutId: cantidad}
let currentLimit = 12; // Límite inicial de donitas
let totalSelected = 0; // Contador total de donitas seleccionadas

// Referencias a elementos del DOM (ahora con IDs específicos para tu HTML)
const select12Btn = document.getElementById('select-12');
const select18Btn = document.getElementById('select-18');
const selectedCountSpan = document.getElementById('selected-count');
const currentLimitSpan = document.getElementById('current-limit');
const donutsTaccContainer = document.getElementById('donuts-tacc-container');
const donutsSinTaccContainer = document.getElementById('donuts-sintacc-container');
const submitPedidoButton = document.getElementById('submit-pedido-button'); // Botón de enviar pedido del formulario
const contadorDonasResumen = document.getElementById('contador-donas-resumen');
const listaSaboresResumen = document.getElementById('lista-sabores-resumen');
const formulario = document.getElementById('formulario'); // Referencia al formulario completo

// --- Funciones del Carrito ---

/**
 * Función para renderizar y mostrar las tarjetas de donitas en la sección de sabores.
 * Ahora renderiza en los contenedores específicos (TACC/Sin TACC).
 */
function renderDonutCards() {
    donutsTaccContainer.innerHTML = ''; // Limpia el contenedor TACC
    donutsSinTaccContainer.innerHTML = ''; // Limpia el contenedor Sin TACC

    donuts.forEach(donut => {
        const card = document.createElement('div');
        card.classList.add('card'); // Usa la clase 'card' de tu HTML original
        card.innerHTML = `
            <img src="${donut.image}" alt="${donut.name}">
            <h3>${donut.name}</h3>
            <div class="cantidad-selector" data-id="${donut.id}">
                <button class="restar-dona" onclick="decrementDonut(${donut.id})">-</button>
                <span class="cantidad-actual">${selectedDonuts[donut.id] || 0}</span>
                <button class="sumar-dona" onclick="incrementDonut(${donut.id})">+</button>
            </div>
        `;

        if (donut.category === 'tacc') {
            donutsTaccContainer.appendChild(card);
        } else if (donut.category === 'sintacc') {
            donutsSinTaccContainer.appendChild(card);
        }
    });
    updateTotalSelectedDisplay();
    updateResumenPedido(); // Actualiza el resumen de pedidos
    checkSubmitButtonState(); // Verifica el estado del botón de envío
}

/**
 * Función para establecer el límite de donitas para el combo (12 o 18).
 * @param {number} limit - El nuevo límite de donitas.
 */
function setLimit(limit) {
    currentLimit = limit;
    currentLimitSpan.textContent = limit;
    contadorDonasResumen.textContent = `${totalSelected}/${currentLimit}`; // Actualiza el contador del resumen

    // Actualiza la clase 'active' de los botones de límite
    select12Btn.classList.remove('active');
    select18Btn.classList.remove('active');
    document.getElementById(`select-${limit}`).classList.add('active');

    // Si el total seleccionado excede el nuevo límite, reinicia la selección
    if (totalSelected > currentLimit) {
        selectedDonuts = {}; // Vacía la selección
        totalSelected = 0; // Reinicia el contador
        renderDonutCards(); // Vuelve a renderizar para que los contadores de cada donita se reinicien
        alert(`¡Uy! Te pasaste del nuevo límite de ${currentLimit} donitas. Empecemos de nuevo.`);
    } else {
        updateTotalSelectedDisplay();
        checkSubmitButtonState();
    }
    updateResumenPedido();
}

/**
 * Incrementa la cantidad de una donita específica en la selección.
 * @param {number} id - El ID de la donita a incrementar.
 */
function incrementDonut(id) {
    if (totalSelected >= currentLimit) {
        alert(`¡Ups! Ya seleccionaste el máximo de ${currentLimit} donitas. ¡Tu combo está completo!`);
        return;
    }

    selectedDonuts[id] = (selectedDonuts[id] || 0) + 1;
    totalSelected++;
    updateCardCounter(id);
    updateTotalSelectedDisplay();
    updateResumenPedido(); // Actualiza el resumen de pedidos
    checkSubmitButtonState(); // Verifica el estado del botón de envío
}

/**
 * Decrementa la cantidad de una donita específica en la selección.
 * @param {number} id - El ID de la donita a decrementar.
 */
function decrementDonut(id) {
    if (selectedDonuts[id] && selectedDonuts[id] > 0) {
        selectedDonuts[id]--;
        totalSelected--;
        updateCardCounter(id);
        updateTotalSelectedDisplay();
        updateResumenPedido(); // Actualiza el resumen de pedidos
        checkSubmitButtonState(); // Verifica el estado del botón de envío
    }
}

/**
 * Actualiza el contador numérico mostrado en la tarjeta de una donita.
 * @param {number} id - El ID de la donita cuya tarjeta se va a actualizar.
 */
function updateCardCounter(id) {
    const counterElement = document.querySelector(`.cantidad-selector[data-id="${id}"] .cantidad-actual`);
    if (counterElement) {
        counterElement.textContent = selectedDonuts[id] || 0;
    }
}

/**
 * Actualiza el texto que muestra cuántas donitas se han seleccionado del total permitido.
 */
function updateTotalSelectedDisplay() {
    selectedCountSpan.textContent = totalSelected;
    contadorDonasResumen.textContent = `${totalSelected}/${currentLimit}`;
}

/**
 * Habilita o deshabilita el botón "Enviar pedido" según si se ha alcanzado el límite exacto de donitas.
 */
function checkSubmitButtonState() {
    submitPedidoButton.disabled = totalSelected !== currentLimit;
}

/**
 * Actualiza la lista de sabores seleccionados en la sección de pedidos.
 */
function updateResumenPedido() {
    listaSaboresResumen.innerHTML = ''; // Limpia la lista anterior
    let hasSelectedDonuts = false;

    Object.keys(selectedDonuts).forEach(id => {
        const cantidad = selectedDonuts[id];
        if (cantidad > 0) {
            hasSelectedDonuts = true;
            const donut = donuts.find(d => d.id == id);
            const listItem = document.createElement('li');
            listItem.textContent = `${cantidad} x ${donut.name}`;
            listaSaboresResumen.appendChild(listItem);
        }
    });

    // Muestra u oculta la lista de sabores según si hay donas seleccionadas
    if (hasSelectedDonuts) {
        listaSaboresResumen.style.display = 'block';
    } else {
        listaSaboresResumen.style.display = 'none';
    }
}

// --- Lógica para el envío del formulario (WhatsApp) ---
formulario.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    const nombre = formulario.querySelector('input[type="text"]').value;
    const whatsapp = formulario.querySelector('input[type="tel"]').value;
    const detalleAdicional = document.getElementById('detalle-pedido').value;

    if (totalSelected !== currentLimit) {
        alert('¡Ups! Por favor, selecciona exactamente la cantidad de donitas para tu combo.');
        return;
    }

    const selectedDetails = Object.keys(selectedDonuts)
        .filter(id => selectedDonuts[id] > 0)
        .map(id => {
            const donut = donuts.find(d => d.id == id);
            return `${selectedDonuts[id]} ${donut.name}`; // Formato más simple para WhatsApp
        })
        .join(', ');

    let message = `¡Hola Catita! Soy ${nombre}. `;
    message += `Quisiera mi combo de ${currentLimit} donitas:\n`;
    message += `Mis sabores elegidos son: ${selectedDetails}.`;

    if (detalleAdicional) {
        message += `\nDetalles adicionales: ${detalleAdicional}.`;
    }
    message += `\n¡Espero mi pedido con ansias! Mi WhatsApp es: ${whatsapp}.`;

    const whatsappURL = `https://wa.me/+5493517918029?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');

    // Opcional: Reiniciar el formulario o mostrar un mensaje de éxito
    alert('¡Tu pedido ha sido enviado a Catita! En breve se pondrán en contacto contigo. 💖');
    formulario.reset(); // Limpia el formulario
    selectedDonuts = {}; // Reinicia la selección
    totalSelected = 0;
    renderDonutCards(); // Vuelve a renderizar las tarjetas para resetear los contadores
    setLimit(12); // Vuelve al límite por defecto
});


// --- Lógica del menú hamburguesa (si usas un archivo separado como menu.js, esta parte iría allí) ---
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.getElementById('main-nav');

    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        // Opcional: Cerrar el menú al hacer clic en un enlace (para SPA)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
    }
});


// Inicializar la vista al cargar la página
renderDonutCards();