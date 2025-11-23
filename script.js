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
        video_url: "PONER_AQUI_URL_DE_YOUTUBE_PIEZA_1" // Recuerda poner un link de YouTube aquí
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
/* 2. Lógica de Navegación y Desbloqueo (CORREGIDA) */
/* ------------------------------------------------------------- */

// Variable global para guardar la pieza escaneada por QR
let piezaDesbloqueadaPorQR = null;

document.addEventListener('DOMContentLoaded', () => {

    // --- Funciones de Utilidad ---

    function mostrarPantalla(id) {
        document.querySelectorAll('.pantalla').forEach(pantalla => {
            pantalla.classList.remove('activa');
        });
        document.getElementById(id).classList.add('activa');
    }

    function mostrarDetalle(piezaId) {
        const data = mapaDeTesoros[piezaId];
        const detalleContainer = document.getElementById('contenido-detalle');
        
        // ... (el resto de la función mostrarDetalle es el mismo: inyecta HTML) ...
        
        if (!data) return;

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

    // --- 1. Lógica del Botón 'CONTINUAR' (Maneja el Desbloqueo del QR) ---

    document.getElementById('btn-continuar').addEventListener('click', () => {
        
        // Muestra la pantalla de la colección (el mapa)
        mostrarPantalla('pantalla-coleccion');
        
        // Si hay una pieza guardada del QR, la desbloquea e ingresa
        if (piezaDesbloqueadaPorQR) {
            const piezaId = piezaDesbloqueadaPorQR;
            const item = document.getElementById(piezaId);

            // Desbloquea la pieza específica
            item.classList.remove('bloqueada');
            
            // Va al detalle
            mostrarDetalle(piezaId); 
            
            // Limpia la variable para que no se active de nuevo
            piezaDesbloqueadaPorQR = null; 
        }
    });

    // --- 2. Lógica del Mapa (NO SE PUEDE HACER TRAMPA) ---

    document.getElementById('btn-volver-mapa').addEventListener('click', () => {
        mostrarPantalla('pantalla-coleccion');
    });

    document.querySelectorAll('.coleccion-item').forEach(item => {
        item.addEventListener('click', () => {
            
            // Si la pieza está bloqueada, NO HACEMOS NADA (No se puede hacer trampa)
            if (item.classList.contains('bloqueada')) {
                // Puedes añadir un sonido de 'bloqueado' si quieres, pero por ahora solo se ignora el clic.
                return; 
            } else {
                // Si ya está desbloqueada (porque fue revelada por un QR), muestra el detalle
                mostrarDetalle(item.id);
            }
        });
    });

    // --- 3. Lógica de Inicio (Guarda el ID del QR) ---

    function verificarHash() {
        const hash = window.location.hash.substring(1); // Obtiene solo el ID (ej: 'pieza-01')

        if (hash && mapaDeTesoros[hash]) {
            // Si viene de un QR, guarda la pieza y siempre muestra la INTRODUCCIÓN
            piezaDesbloqueadaPorQR = hash;
            mostrarPantalla('pantalla-introduccion');
        } else {
            // Si no hay QR o es inválido, muestra la INTRODUCCIÓN normal
            mostrarPantalla('pantalla-introduccion');
        }
    }
    
    // Inicia la lógica del QR al cargar la página
    verificarHash();

});