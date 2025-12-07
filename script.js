/* ------------------------------------------------------------- */
/* 1. Datos del Mapa y las Piezas (CONTENIDO) */
/* ------------------------------------------------------------- */

const mapaDeTesoros = {
    // Pieza 1: Crustáceo Cascarudo
    'pieza-01': {
        titulo: "Crustáceo Cascarudo",
        descripcion: "Sé lo mucho que significa para ti la serie de Bob Esponja. Literalmente fue tu infancia y sé que a la 'Titi' de tu interior, esa niña pequeñita, fue y es muy feliz al verla. Quiero obsequiarte esta primera pieza para que la armes y así, próximamente, puedas ir desbloqueando las demás. Esta pieza me hace recordar mucho el capítulo cuando Calamardo lee el diario de Bob Esponja y hace como gallina, me parece muy gracioso. Bueno, para finalizar, ¡quién sabe si puedas tener un mini Fondo de Bikini! jejeje...",
        imagen: "assets/imagen-01.jpg", 
        silueta: "assets/silueta-01.png",
        video_url: "PONER_AQUI_URL_DE_YOUTUBE_PIEZA_1" 
    },
    
    // Pieza 2: Casa de Bob Esponja
    'pieza-02': {
        titulo: "Casa de Bob Esponja",
        descripcion: "¡¡Vive en una piña debajo del mar, BOB ESPONJA!! Jejeje, perdón, es una canción increíble que hace recordar mi infancia y creo que la tuya también. Bueno, amor, esta pieza me hace recordar un episodio cuando Gary se vuelve loco por una pelotita roja, y demuestra que aunque se interpongan obstáculos, siempre te buscaré a ti, mi amada, y te daré todo mi amor por el resto de mi vida...",
        imagen: "assets/imagen-02.jpg", 
        silueta: "assets/silueta-02.png",
        video_url: "PONER_AQUI_URL_DE_YOUTUBE_PIEZA_2" 
    },
    
    // Pieza 3: Casa de Patricio
    'pieza-03': {
        titulo: "Casa de Patricio",
        descripcion: "Patricio Estrella me hace recordar que, aunque yo sea un poco menso, cuando estoy a tu lado siempre soy feliz y siento que puedo hacerlo todo, siento una conexión tan real. Un episodio que recuerdo mucho en la casa de Patricio es cuando él invita a Bob Esponja y todo es de tierra, ¡ja, ja, es increíble! Amor, quiero que todo sea contigo. Quiero construir mi futuro a tu lado, conseguir mi primera cocina, mi primer sofá, refrigeradora y otras cosas para nuestra casa.",
        imagen: "assets/imagen-03.jpg", 
        silueta: "assets/silueta-03.png",
        video_url: "PONER_AQUI_URL_DE_YOUTUBE_PIEZA_3"
    },
    
    // Pieza 4: Casa de Calamardo (PENDIENTE DE DESCRIPCIÓN)
    'pieza-04': {
        titulo: "Casa de Calamardo",
        descripcion: "PONER_AQUI_DESCRIPCION_PIEZA_4",
        imagen: "assets/imagen-04.jpg", 
        silueta: "assets/silueta-04.png",
        video_url: "PONER_AQUI_URL_DE_YOUTUBE_PIEZA_4" 
    },
    
    // Pieza 5: Casa de Arenita (PENDIENTE DE DESCRIPCIÓN)
    'pieza-05': {
        titulo: "Casa de Arenita",
        descripcion: "PONER_AQUI_DESCRIPCION_PIEZA_5",
        imagen: "assets/imagen-05.jpg", 
        silueta: "assets/silueta-05.png",
        video_url: "PONER_AQUI_URL_DE_YOUTUBE_PIEZA_5" 
    },
    
    // Pieza 6: Balde de Carnada (PENDIENTE DE DESCRIPCIÓN)
    'pieza-06': {
        titulo: "Balde de Carnada",
        descripcion: "PONER_AQUI_DESCRIPCION_PIEZA_6",
        imagen: "assets/imagen-06.jpg", 
        silueta: "assets/silueta-06.png",
        video_url: "PONER_AQUI_URL_DE_YOUTUBE_PIEZA_6"
    }
};

/* ------------------------------------------------------------- */
/* 2. Lógica de Navegación, Cronómetro y Desbloqueo */
/* ------------------------------------------------------------- */

// Variable global para guardar la pieza escaneada por QR
let piezaDesbloqueadaPorQR = null;

// Establece la fecha y hora EXACTA de la CARTA #1 
// EJEMPLO: Martes 9 de Diciembre de 2025 a las 9:00 AM. ¡AJUSTA EL AÑO Y LA HORA!
const fechaObjetivo = new Date("December 9, 2025 09:00:00").getTime(); 

let intervaloCronometro; // Variable para controlar el cronómetro

// --- Funciones de Utilidad ---

function mostrarPantalla(id) {
    document.querySelectorAll('.pantalla').forEach(pantalla => {
        pantalla.classList.remove('activa');
    });
    document.getElementById(id).classList.add('activa');
}

function actualizarCronometro() {
    const ahora = new Date().getTime();
    let diferencia = fechaObjetivo - ahora;

    if (diferencia < 0) {
        clearInterval(intervaloCronometro);
        const cronometroElemento = document.getElementById("cronometro");
        if (cronometroElemento) {
             cronometroElemento.innerHTML = "¡LA CARTA #1 ESTÁ AQUÍ!";
        }
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    // Formatea el resultado SIN asteriscos
    const cronometroElemento = document.getElementById("cronometro");
    if (cronometroElemento) {
        cronometroElemento.innerHTML = 
            `${dias} Días, ${horas} Horas, ${minutos} Minutos, ${segundos} Segundos`;
    }
}

function mostrarDetalle(piezaId) {
    const data = mapaDeTesoros[piezaId];
    const detalleContainer = document.getElementById('contenido-detalle');
    
    if (!data) return;

    // Guarda el estado de desbloqueo permanentemente en el navegador (localStorage)
    localStorage.setItem(piezaId, 'desbloqueado'); 

    // Extrae el ID de YouTube
    const videoIdMatch = data.video_url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|(?:embed|v)\/))([^&?]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    
    let videoEmbedHtml = '';
    if (videoId) {
        videoEmbedHtml = `
            <div class="video-container">
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>`;
    }
    
    // Contenido que se inyecta en la pantalla de detalle
    detalleContainer.innerHTML = `
        <h2>${data.titulo}</h2>
        <p>${data.descripcion}</p>
        <p><strong>Fecha especial:</strong> ${data.fecha || 'PONER AQUÍ FECHA'}</p>
        
        <img src="${data.imagen}" alt="${data.titulo}">
        
        ${videoEmbedHtml}
    `;
    
    mostrarPantalla('pantalla-detalle');
}

// --- Inicio del DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Inicia el cronómetro
    intervaloCronometro = setInterval(actualizarCronometro, 1000);
    actualizarCronometro();

    // --- Carga el estado guardado al iniciar (localStorage) ---
    function cargarEstadoGuardado() {
        document.querySelectorAll('.coleccion-item').forEach(item => {
            const piezaId = item.id;
            
            if (localStorage.getItem(piezaId) === 'desbloqueado') {
                item.classList.remove('bloqueada'); 
            }
        });
    }
    
    cargarEstadoGuardado();
    
    // --- 1. Lógica del Botón 'CONTINUAR' (Maneja el Desbloqueo del QR) ---

    document.getElementById('btn-continuar').addEventListener('click', () => {
        mostrarPantalla('pantalla-coleccion');
        
        if (piezaDesbloqueadaPorQR) {
            const piezaId = piezaDesbloqueadaPorQR;
            const item = document.getElementById(piezaId);

            item.classList.remove('bloqueada'); // Desbloquea la pieza
            
            mostrarDetalle(piezaId); // Guarda en localStorage y muestra detalle
            
            piezaDesbloqueadaPorQR = null; // Limpia la variable
        }
    });

    // --- 2. Lógica del Mapa (Evita trampa) ---

    document.getElementById('btn-volver-mapa').addEventListener('click', () => {
        mostrarPantalla('pantalla-coleccion');
    });

    document.querySelectorAll('.coleccion-item').forEach(item => {
        item.addEventListener('click', () => {
            
            if (item.classList.contains('bloqueada')) {
                return; 
            } else {
                mostrarDetalle(item.id);
            }
        });
    });

    // --- 3. Lógica de Inicio (Guarda el ID del QR) ---

    function verificarHash() {
        const hash = window.location.hash.substring(1); 

        if (hash && mapaDeTesoros[hash]) {
            // Guarda la pieza y siempre muestra la INTRODUCCIÓN primero
            piezaDesbloqueadaPorQR = hash;
            mostrarPantalla('pantalla-introduccion');
        } else {
            // Muestra la INTRODUCCIÓN normal
            mostrarPantalla('pantalla-introduccion');
        }
    }
    
    verificarHash();

});