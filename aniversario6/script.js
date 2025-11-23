/* Archivo: script.js (Versión FINAL y COMPLETA) */

// -----------------------------------
// 1. DATA DE LAS PIEZAS COLECCIONABLES (CONFIGURA ESTO)
// -----------------------------------

// Códigos secretos que se deben escanear con el QR.
const PIEZAS_SECRETAS = {
    '01': 'SOL-FLOR-123', 
    '02': 'LUNA-AZUL-456',  
    '03': 'ESTRELLA-ROJA-789',  
    '04': 'CARTA-OCULTA-101', 
    '05': 'CORAZON-ORO-202',
    '06': 'FINAL-FELIZ-303',
};

// Contenido detallado de cada pieza.
const CONTENIDO_PIEZAS = {
    '01': {
        titulo: 'El Abrazo Inicial',
        descripcion: 'La primera pieza de la colección. Representa el inicio de nuestra jornada. Fue creada con mucho cariño el 1 de enero de 2025.',
        imagen: 'assets/pieza-01.jpg',
        silueta: 'assets/silueta-01.png',
        fechaDesbloqueo: '2025-01-01', 
        videoUrl: 'https://www.youtube.com/embed/ID_DEL_PRIMER_VIDEO' // <-- REEMPLAZA
    },
    '02': {
        titulo: 'El Camino Recorrido',
        descripcion: 'Una pieza que simboliza la perseverancia y los desafíos superados. ¡Nunca te rindas!',
        imagen: 'assets/pieza-02.jpg',
        silueta: 'assets/silueta-02.png',
        fechaDesbloqueo: '2025-01-15',
        videoUrl: 'https://www.youtube.com/embed/ID_DEL_SEGUNDO_VIDEO' // <-- REEMPLAZA
    },
    '03': {
        titulo: 'El Tesoro Escondido',
        descripcion: 'La pieza que guarda el secreto más grande de todos. Solo se revela a los más curiosos.',
        imagen: 'assets/pieza-03.jpg',
        silueta: 'assets/silueta-03.png',
        fechaDesbloqueo: '2025-02-01',
        videoUrl: '' // Sin video en este ejemplo
    },
    '04': {
        titulo: 'La Promesa Eterna',
        descripcion: 'Una representación de la fe inquebrantable y el amor que perdura a través del tiempo.',
        imagen: 'assets/pieza-04.jpg',
        silueta: 'assets/silueta-04.png',
        fechaDesbloqueo: '2025-02-15',
        videoUrl: 'https://www.youtube.com/embed/ID_DEL_CUARTO_VIDEO' // <-- REEMPLAZA
    },
    '05': {
        titulo: 'El Vuelo Compartido',
        descripcion: 'Esta pieza celebra la libertad y el hecho de volar juntos hacia el futuro.',
        imagen: 'assets/pieza-05.jpg',
        silueta: 'assets/silueta-05.png',
        fechaDesbloqueo: '2025-03-01',
        videoUrl: ''
    },
    '06': {
        titulo: 'El Final Feliz',
        descripcion: 'La culminación de nuestra historia, un recordatorio de que cada esfuerzo vale la pena.',
        imagen: 'assets/pieza-06.jpg',
        silueta: 'assets/silueta-06.png',
        fechaDesbloqueo: '2025-03-15',
        videoUrl: ''
    },
};


// -----------------------------------
// 2. CONSTANTES y ELEMENTOS DEL DOM (NO TOCAR)
// -----------------------------------

const PANTALLAS = {
    INTRO: 'pantalla-introduccion',
    COLECCION: 'pantalla-coleccion',
    DETALLE: 'pantalla-detalle',
};

const gridColeccion = document.querySelector('.coleccion-grid');
const contenidoDetalle = document.getElementById('contenido-detalle');


// -----------------------------------
// 3. FUNCIONES DE UTILIDAD (NO TOCAR)
// -----------------------------------

function mostrarPantalla(idPantalla) {
    document.querySelectorAll('.pantalla').forEach(p => {
        p.classList.remove('activa');
        p.style.display = 'none';
    });

    const pantalla = document.getElementById(idPantalla);
    if (pantalla) {
        pantalla.classList.add('activa');
        pantalla.style.display = 'flex';
    }

    if (idPantalla === PANTALLAS.COLECCION) {
        generarMapaColeccion();
    }
}

function desbloquearPieza(id) {
    let piezasDesbloqueadas = JSON.parse(localStorage.getItem('coleccion_desbloqueada')) || [];
    
    if (!piezasDesbloqueadas.includes(id)) {
        piezasDesbloqueadas.push(id);
        localStorage.setItem('coleccion_desbloqueada', JSON.stringify(piezasDesbloqueadas));
        return true; // Desbloqueo exitoso
    }
    return false; // Ya estaba desbloqueada
}

function cargarDetallePieza(id) {
    const pieza = CONTENIDO_PIEZAS[id];
    
    let mediaHTML;
    if (pieza.videoUrl && pieza.videoUrl.includes('embed')) { // Verificación simple para embed
        mediaHTML = `
            <div class="video-container">
                <iframe src="${pieza.videoUrl}" title="Video de la pieza ${pieza.titulo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `;
    } else if (pieza.imagen) {
        mediaHTML = `<img src="${pieza.imagen}" alt="${pieza.titulo}">`;
    } else {
        mediaHTML = '';
    }

    contenidoDetalle.innerHTML = `
        <button id="btn-volver-mapa">← Volver a la Colección</button>
        ${mediaHTML}
        <h1>${pieza.titulo}</h1>
        <p>${pieza.descripcion}</p>
    `;

    document.getElementById('btn-volver-mapa').addEventListener('click', () => {
        mostrarPantalla(PANTALLAS.COLECCION);
    });
}


// -----------------------------------
// 4. LÓGICA CENTRAL (MAPA y QR)
// -----------------------------------

/**
 * Genera el grid de la colección, mostrando la imagen si está desbloqueada 
 * o la silueta y "Nombre Misterioso" si está bloqueada.
 */
function generarMapaColeccion() {
    let piezasDesbloqueadas = JSON.parse(localStorage.getItem('coleccion_desbloqueada')) || [];
    gridColeccion.innerHTML = ''; 

    Object.keys(PIEZAS_SECRETAS).forEach(id => {
        const estaDesbloqueada = piezasDesbloqueadas.includes(id);
        const contenido = CONTENIDO_PIEZAS[id];
        
        const div = document.createElement('div');
        div.id = `pieza-${id}`;
        div.classList.add('coleccion-item');
        
        const fechaLimite = new Date(contenido.fechaDesbloqueo);
        const fechaLegible = fechaLimite.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
        
        if (estaDesbloqueada) {
            // ✅ Desbloqueado: Muestra la foto y es clickeable para ver el detalle
            div.innerHTML = `
                <h3>${contenido.titulo}</h3>
                <img src="${contenido.imagen}" alt="Pieza Desbloqueada ${id}" style="max-width: 90%; max-height: 80%; border-radius: 5px;">
            `;
            div.addEventListener('click', () => {
                cargarDetallePieza(id);
                mostrarPantalla(PANTALLAS.DETALLE);
            });
            
        } else {
            // 🔒 Bloqueado: Muestra la silueta negra y el mensaje "Nombre Misterioso"
            div.classList.add('bloqueada');
            div.innerHTML = `
                <div class="silueta-container">
                    <img src="${contenido.silueta}" alt="Silueta Coleccionable ${id}">
                </div>
                <h3>Nombre Misterioso</h3>
                <p>Disponible el: ${fechaLegible}</p>
            `;
            
            // Al hacer clic en una pieza bloqueada, pide escanear
            div.addEventListener('click', () => {
                alert(`¡Esta pieza está bloqueada! Para desbloquear "${contenido.titulo}", debes escanear el Código QR correspondiente.`);
            });
        }
        
        gridColeccion.appendChild(div);
    });
}

/**
 * Verifica si la URL tiene un código QR válido y desbloquea en segundo plano.
 * No salta a la pantalla de detalle.
 */
function verificarDesbloqueo() {
    const urlParams = new URLSearchParams(window.location.search);
    const idPieza = urlParams.get('pieza'); 
    const codigoIngresado = urlParams.get('codigo'); 

    if (idPieza && codigoIngresado) {
        
        // 1. Verificar si el código secreto es correcto
        if (PIEZAS_SECRETAS[idPieza] === codigoIngresado) {
            
            const fueDesbloqueadaAhora = desbloquearPieza(idPieza); // Intenta desbloquear y guarda el estado
            
            // 2. Notificación y limpieza de URL
            if (fueDesbloqueadaAhora) {
                alert(`🎉 ¡Éxito! La Pieza #${idPieza} ("${CONTENIDO_PIEZAS[idPieza].titulo}") ha sido identificada y desbloqueada. ¡Presiona CONTINUAR para ver el Mapa de la Colección!`);
            } else {
                alert(`La Pieza #${idPieza} ("${CONTENIDO_PIEZAS[idPieza].titulo}") ya estaba desbloqueada. ¡Presiona CONTINUAR para revisarla!`);
            }
            
            // Limpia la URL para ocultar el código secreto y evitar problemas
            window.history.replaceState({}, document.title, window.location.pathname);
        } else {
             // Notificación en caso de código incorrecto (opcional)
             // alert('Código QR inválido. Intenta escanear un código de colección válido.');
             window.history.replaceState({}, document.title, window.location.pathname); // Limpia URL
        }
    }
}


// -----------------------------------
// 5. INICIALIZACIÓN
// -----------------------------------

function iniciarApp() {
    // 1. Revisa si hay un código QR en la URL
    verificarDesbloqueo();
    
    // 2. Muestra siempre la pantalla de introducción al cargar la página.
    mostrarPantalla(PANTALLAS.INTRO);
    
    // 3. Evento para el botón de "CONTINUAR" (Intro -> Colección)
    document.getElementById('btn-continuar').addEventListener('click', () => {
        mostrarPantalla(PANTALLAS.COLECCION);
    });

    console.log("App iniciada. Lista para la detección de QR.");
}

// Inicia la aplicación cuando el DOM esté completamente cargado.
document.addEventListener('DOMContentLoaded', iniciarApp);