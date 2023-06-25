window.addEventListener('message', function(event) {
    // Verificar si el evento proviene del código del juego
    if (event.origin === 'https://tu-sitio-web.com') {

        // Verificar el mensaje recibido

        if (event.data === 'nivel1Completado') {
            // Desbloquear niveles 2 y 3
            var nivel2 = document.getElementById("cir_Two");
            var nivel3 = document.getElementById("cir_Third");
            nivel2.style.opacity = "1";
            nivel2.style.cursor = "pointer";
            nivel3.style.opacity = "1";
            nivel3.style.cursor = "pointer";
        }
    }
});