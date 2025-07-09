document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const saboresSelect = document.getElementById('sabores-select');
    const listaSabores = document.getElementById('lista-sabores'); // Para mostrar los sabores elegidos
    let cantidadDonas = 0; // Variable para almacenar la cantidad seleccionada

    // Cambiamos a un Array para permitir duplicados
    const saboresSeleccionados = []; // Ahora es un array, no un Set

    if (formulario) {
        // --- Manejar la selección de la cantidad de donas ---
        const radioCantidad6 = document.getElementById('cantidad6');
        const radioCantidad12 = document.getElementById('cantidad12');

        radioCantidad6.addEventListener('change', () => {
            cantidadDonas = parseInt(radioCantidad6.value);
            // Al cambiar la cantidad, reseteamos la selección de sabores
            saboresSeleccionados.length = 0; // Vacía el array
            actualizarListaSabores();
            actualizarPlaceholderSabores();
        });

        radioCantidad12.addEventListener('change', () => {
            cantidadDonas = parseInt(radioCantidad12.value);
            // Al cambiar la cantidad, reseteamos la selección de sabores
            saboresSeleccionados.length = 0; // Vacía el array
            actualizarListaSabores();
            actualizarPlaceholderSabores();
        });

        // --- Manejar la selección de sabores ---
        saboresSelect.addEventListener('change', () => {
            const selectedOption = saboresSelect.options[saboresSelect.selectedIndex];
            const saborElegido = selectedOption.value;

            // Evita agregar el placeholder si se selecciona por error
            if (saborElegido === "" || selectedOption.disabled) { // También verifica si es la opción deshabilitada
                return;
            }

            if (cantidadDonas === 0) {
                alert('¡Primero seleccioná la cantidad de donas (6 o 12)!');
                saboresSelect.value = ""; // Restablece la selección
                return;
            }

            if (saboresSeleccionados.length < cantidadDonas) { // Usamos .length ahora
                saboresSeleccionados.push(saborElegido); // Agregamos el sabor al array
                actualizarListaSabores();
            } else {
                alert(`¡Ya seleccionaste la cantidad máxima de ${cantidadDonas} sabores! Si querés cambiar, eliminá alguno.`);
            }
            
            // Restablece la selección para que el usuario pueda elegir el mismo sabor de nuevo o no quede "marcado"
            saboresSelect.value = ""; 
        });

        // Función para actualizar la lista visual de sabores
        function actualizarListaSabores() {
            listaSabores.innerHTML = ''; // Limpia la lista existente
            
            // Para contar cuántas veces se repite cada sabor
            const conteoSabores = {};
            saboresSeleccionados.forEach(sabor => {
                conteoSabores[sabor] = (conteoSabores[sabor] || 0) + 1;
            });

            // Mostrar los sabores con su cantidad
            Object.keys(conteoSabores).forEach(sabor => {
                const li = document.createElement('li');
                const cantidad = conteoSabores[sabor];
                li.textContent = `${sabor} (${cantidad})`; // Muestra "Chocolate (x2)"

                // Agregar un botón para eliminar UNA UNIDAD de ese sabor
                const botonEliminar = document.createElement('button');
                botonEliminar.textContent = 'X';
                botonEliminar.classList.add('boton-eliminar-sabor');
                botonEliminar.addEventListener('click', () => {
                    // Encontrar y eliminar solo la primera ocurrencia de ese sabor
                    const index = saboresSeleccionados.indexOf(sabor);
                    if (index > -1) {
                        saboresSeleccionados.splice(index, 1); // Elimina un elemento en el índice encontrado
                    }
                    actualizarListaSabores(); // Redibuja la lista
                    actualizarPlaceholderSabores(); // Actualiza el texto del select
                });
                li.appendChild(botonEliminar);
                listaSabores.appendChild(li);
            });
            actualizarPlaceholderSabores(); // Para actualizar el texto del selector
        }

        // Función para actualizar el texto del placeholder/primera opción del select
        function actualizarPlaceholderSabores() {
            const saboresRestantes = cantidadDonas - saboresSeleccionados.length;
            if (cantidadDonas > 0) {
                if (saboresRestantes > 0) {
                    saboresSelect.options[0].textContent = `Elegí ${saboresRestantes} sabores más...`;
                } else {
                    saboresSelect.options[0].textContent = `¡Ya elegiste tus ${cantidadDonas} sabores!`;
                }
            } else {
                saboresSelect.options[0].textContent = "Selecciona tus sabores (primero elegí la cantidad)";
            }
            
            // Deshabilitar/Habilitar el select según la cantidad de donas elegidas
            saboresSelect.disabled = (cantidadDonas === 0 || saboresRestantes === 0);
            saboresSelect.options[0].disabled = true; // Asegura que la primera opción no sea seleccionable
        }
        
        // Inicializar el estado del selector al cargar la página
        actualizarPlaceholderSabores();


        // --- Manejar el envío del formulario ---
        formulario.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

            // Validar que se haya seleccionado la cantidad y los sabores
            if (cantidadDonas === 0) {
                alert('Por favor, seleccioná la cantidad de donas (6 o 12).');
                return;
            }

            if (saboresSeleccionados.length !== cantidadDonas) {
                alert(`¡Debes seleccionar exactamente ${cantidadDonas} sabores! Llevas ${saboresSeleccionados.length}.`);
                return;
            }

            // Obtener los valores del formulario
            const nombre = formulario.querySelector('input[type="text"]').value;
            const whatsapp = formulario.querySelector('input[type="tel"]').value;
            const saboresFinal = saboresSeleccionados.join(', '); // El array ya tiene todos los sabores

            // Aquí podrías integrar una API para enviar el mensaje (ej. a WhatsApp Business, email, etc.)
            // Por ahora, solo mostraremos un mensaje en la consola y una alerta amigable.
            console.log('--- Nuevo Pedido de Catita\'s Donuts ---');
            console.log(`Nombre: ${nombre}`);
            console.log(`WhatsApp: ${whatsapp}`);
            console.log(`Cantidad de donas: ${cantidadDonas}`);
            console.log(`Sabores solicitados: ${saboresFinal}`);
            console.log('--------------------------------------');

            // Mensaje de confirmación para el usuario
            alert(`¡Gracias por tu pedido, ${nombre}! Pediste ${cantidadDonas} donas con los sabores: ${saboresFinal}. Catita te contactará pronto al ${whatsapp} para coordinar. 🍩✨`);

            // Opcional: limpiar el formulario después del envío
            formulario.reset();
            saboresSeleccionados.length = 0; // Limpiar el array de sabores seleccionados
            cantidadDonas = 0; // Resetear la cantidad
            actualizarListaSabores(); // Limpiar la lista visual
            actualizarPlaceholderSabores(); // Resetear el placeholder y deshabilitar select
        });
    }
});