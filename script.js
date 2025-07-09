document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
  
    if (formulario) {
      formulario.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional
  
        // Obtener los valores del formulario
        const nombre = formulario.querySelector('input[type="text"]').value;
        const whatsapp = formulario.querySelector('input[type="tel"]').value;
        const sabores = formulario.querySelector('textarea').value;
  
        // Aquí podrías integrar una API para enviar el mensaje (ej. a WhatsApp Business, email, etc.)
        // Por ahora, solo mostraremos un mensaje en la consola y una alerta amigable.
        console.log('--- Nuevo Pedido de Catita\'s Donuts ---');
        console.log(`Nombre: ${nombre}`);
        console.log(`WhatsApp: ${whatsapp}`);
        console.log(`Sabores solicitados: ${sabores}`);
        console.log('--------------------------------------');
  
        // Mensaje de confirmación para el usuario
        alert(`¡Gracias por tu pedido, ${nombre}! Catita te contactará pronto al ${whatsapp} para coordinar tus deliciosas donas. 🍩✨`);
  
        // Opcional: limpiar el formulario después del envío
        formulario.reset();
      });
    }
  });