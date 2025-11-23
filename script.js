/* ------------------------------------------------------------- */
/* 1. Datos del Mapa y las Piezas (EDITA AQUÍ) */
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
    
    // Pieza 4: Casa de Calamardo (FALTA DESCRIPCIÓN)
    'pieza-04': {
        titulo: "Casa de Calamardo",
        descripcion: "PONER_AQUI_DESCRIPCION_PIEZA_4",
        imagen: "assets/imagen-04.jpg", 
        silueta: "assets/silueta-04.png",
        video_url: "PONER_AQUI_URL_DE_YOUTUBE_PIEZA_4"
    },
    
    // Pieza 5: Casa de Arenita (FALTA DESCRIPCIÓN)
    'pieza-05': {
        titulo: "Casa de Arenita",
        descripcion: "PONER_AQUI_DESCRIPCION_PIEZA_5",
        imagen: "assets/imagen-05.jpg", 
        silueta: "assets/silueta-05.png",
        video_url: "PONER_AQUI_URL_DE_YOUTUBE_PIEZA_5"
    },
    
    // Pieza 6: Balde de Carnada (FALTA DESCRIPCIÓN)
    'pieza-06': {
        titulo: "Balde de Carnada",
        descripcion: "PONER_AQUI_DESCRIPCION_PIEZA_6",
        imagen: "assets/imagen-06.jpg", 
        silueta: "assets/silueta-06.png",
        video_url: "PONER_AQUI_URL_DE_YOUTUBE_PIEZA_6"
    }
};

/* ------------------------------------------------------------- */
/* 2. Lógica de Navegación y Desbloqueo */
/* ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    
    // Eventos de los botones de navegación
    document.getElementById('btn-continuar').addEventListener('click', () => {
        mostrarPantalla('pantalla-coleccion');
    });

    document.getElementById('btn-volver-mapa').addEventListener('click', () => {
        mostrarPantalla('pantalla-coleccion');
    });

    // Añadir el evento de clic a cada pieza del mapa
    document.querySelectorAll('.coleccion-item').forEach(item => {
        item.addEventListener('click', () => {
            const piezaId = item.id;
            
            // Si la pieza está bloqueada, la desbloqueamos con un clic
            if (item.classList.contains('bloqueada')) {
                item.classList.remove('bloqueada');
                mostrarDetalle(piezaId);
            } else {
                // Si ya está desbloqueada, solo mostramos el detalle
                mostrarDetalle(piezaId);
            }
        });
    });

    // Función para mostrar solo una pantalla
    function mostrarPantalla(id) {
        document.querySelectorAll('.pantalla').forEach(pantalla => {
            pantalla.classList.remove('activa');
        });
        document.getElementById(id).classList.add('activa');
    }

    // Función para mostrar el detalle de una pieza
    function mostrarDetalle(piezaId) {
        const data = mapaDeTesoros[piezaId];
        const detalleContainer = document.getElementById('contenido-detalle');
        
        if (!data) return;

        // Extrae el ID de YouTube del URL completo
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
    
    
    /* ------------------------------------------------------------- */
    /* 3. Lógica del Código QR (Permite saltar con la URL) */
    /* ------------------------------------------------------------- */
    
    function verificarHash() {
        // Verifica si la URL tiene un #ID, lo que indica que viene de un QR
        const hash = window.location.hash.substring(1); 

        if (hash) {
            const piezaElemento = document.getElementById(hash);
            
            if (piezaElemento && mapaDeTesoros[hash]) {
                // Desbloquea la pieza y salta a la vista de detalle
                piezaElemento.classList.remove('bloqueada');
                mostrarDetalle(hash);
            } else {
                 // Si no es un ID válido, va a la colección
                mostrarPantalla('pantalla-coleccion');
            }
        } else {
            // Si no hay hash, comienza en la introducción
            mostrarPantalla('pantalla-introduccion');
        }
    }
    
    // Llama a la función al inicio para verificar si viene de un QR
    verificarHash();

});