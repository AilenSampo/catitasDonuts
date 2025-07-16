document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const cardsDona = document.querySelectorAll('.sabores .card');
    const listaSabores = document.getElementById('lista-sabores');
    const cantidadRadios = document.querySelectorAll('input[name="cantidad"]');
    const detallePedido = document.getElementById('detalle-pedido');
    const contadorDonas = document.getElementById('contador-donas'); // Nueva referencia al contador
    
    let cantidadDonas = 0;
    let saboresSeleccionados = [];
  
    // --- Funciones de Utilidad ---
  
    // Actualiza el estado visual de la lista de chips de sabores
    function actualizarListaSabores() {
      listaSabores.innerHTML = '';
      
      const conteoSabores = {};
      saboresSeleccionados.forEach(sabor => {
        conteoSabores[sabor] = (conteoSabores[sabor] || 0) + 1;
      });
  
      Object.keys(conteoSabores).forEach(sabor => {
        const li = document.createElement('li');
        const cantidad = conteoSabores[sabor];
        li.textContent = `${sabor} (${cantidad})`;
  
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'X';
        botonEliminar.classList.add('boton-eliminar-sabor');
        botonEliminar.title = `Eliminar una ${sabor}`;
        
        botonEliminar.addEventListener('click', (event) => {
          event.stopPropagation();
          const index = saboresSeleccionados.indexOf(sabor);
          if (index > -1) {
            saboresSeleccionados.splice(index, 1);
          }
          actualizarListaSabores();
          actualizarEstadoTarjetas();
          actualizarContadorDonas(); // Actualiza el contador
        });
  
        li.appendChild(botonEliminar);
        listaSabores.appendChild(li);
      });
      actualizarContadorDonas(); 
    }
  

    function actualizarEstadoTarjetas() {
      cardsDona.forEach(card => {
        const sabor = card.dataset.sabor;
        if (saboresSeleccionados.includes(sabor)) {
          card.classList.add('seleccionada');
        } else {
          card.classList.remove('seleccionada');
        }
      });
    }
  

    function actualizarContadorDonas() {
      contadorDonas.textContent = `${saboresSeleccionados.length}/${cantidadDonas}`;
    }

    cantidadRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        cantidadDonas = parseInt(radio.value);
        saboresSeleccionados.length = 0; 
        actualizarListaSabores();
        actualizarEstadoTarjetas();
        actualizarContadorDonas(); /
        
        document.getElementById('sabores').scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  

    cardsDona.forEach(card => {
      card.addEventListener('click', () => {
        const sabor = card.dataset.sabor;
  
        if (cantidadDonas === 0) {
          alert('¡Primero seleccioná la cantidad de donas (6 o 12)!');
          document.querySelector('.cantidad-donas').scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
  
        if (saboresSeleccionados.length < cantidadDonas) {
          saboresSeleccionados.push(sabor);
        } else {
          alert(`¡Ya seleccionaste el límite de ${cantidadDonas} donas! Si quieres este sabor, quita uno de los actuales con el botón 'X' o cambia la cantidad.`);
        }
        
        actualizarListaSabores();
        actualizarEstadoTarjetas();
        actualizarContadorDonas(); 
      });
    });
  
    //  Envío del Formulario 
    if (formulario) {
      formulario.addEventListener('submit', (event) => {
        event.preventDefault();
  
        const nombre = formulario.querySelector('input[type="text"]').value.trim();
        const whatsapp = formulario.querySelector('input[type="tel"]').value.trim();
        const detallesAdicionales = detallePedido.value.trim();
  
        if (!nombre || !whatsapp) {
          alert('Por favor, completa tu nombre y número de WhatsApp.');
          return;
        }
        if (cantidadDonas === 0) {
          alert('Por favor, selecciona cuántas donas quieres (6 o 12).');
          document.querySelector('.cantidad-donas').scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
        if (saboresSeleccionados.length !== cantidadDonas) {
          alert(`¡Debes seleccionar exactamente ${cantidadDonas} sabores! Llevas ${saboresSeleccionados.length}.`);
          document.getElementById('sabores').scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
  
        const saboresFinal = saboresSeleccionados.join(', ');
  
        const numeroCatita = '5493517918029'; 
        
        let mensajeWhatsapp = `¡Hola! Soy ${nombre} y quiero hacer un pedido de Catita's Donuts.\n`;
        mensajeWhatsapp += `Cantidad: ${cantidadDonas} donas.\n`;
        mensajeWhatsapp += `Sabores: ${saboresFinal}.`;
  
        if (detallesAdicionales) {
          mensajeWhatsapp += `\nDetalles adicionales: ${detallesAdicionales}`;
        }
        mensajeWhatsapp += `\nMi número de WhatsApp es: ${whatsapp}. ¡Gracias! 🍩✨`;
  
        console.log('--- Resumen del Pedido ---');
        console.log(`Nombre: ${nombre}`);
        console.log(`WhatsApp: ${whatsapp}`);
        console.log(`Cantidad: ${cantidadDonas}`);
        console.log(`Sabores: ${saboresFinal}`);
        if (detallesAdicionales) {
          console.log(`Detalles: ${detallesAdicionales}`);
        }
        console.log('--------------------------');
  
        alert(`¡Gracias por tu pedido, ${nombre}! Pediste ${cantidadDonas} donas con los sabores: ${saboresFinal}. Catita te contactará pronto al ${whatsapp} para coordinar.`);
  
        window.open(`https://wa.me/${numeroCatita}?text=${encodeURIComponent(mensajeWhatsapp)}`, '_blank');
  
       
        formulario.reset();
        saboresSeleccionados.length = 0;
        cantidadDonas = 0;
        actualizarListaSabores();
        actualizarEstadoTarjetas();
        actualizarContadorDonas(); 
  
        cantidadRadios.forEach(radio => radio.checked = false);
      });
    }
  

    actualizarListaSabores();
    actualizarEstadoTarjetas();
    actualizarContadorDonas(); 
  });