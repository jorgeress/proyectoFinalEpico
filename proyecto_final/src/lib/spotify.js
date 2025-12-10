import { getAccessToken, refreshAccessToken, logout } from './auth';
import { getFavoriteTrackIds } from './favorites'; 

// --- BASE URL: DEBE SER LA URL REAL DE LA API DE SPOTIFY ---
const BASE_URL = 'https://api.spotify.com/v1'; 


/**
 * Función genérica para hacer peticiones a la API de Spotify, incluyendo
 * manejo de token, refresco automático y errores 401.
 */
async function spotifyRequest(endpoint, method = 'GET', body = null) {
    let token = getAccessToken();
    
    const fetchUrl = `${BASE_URL}${endpoint}`; 
    
    // Intentar refrescar si getAccessToken devolvió null
    if (!token) {
        token = await refreshAccessToken();
        if (!token) {
            logout(); 
            return null;
        }
    }

    let headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    // 1. Primera Petición
    let response = await fetch(fetchUrl, options);

    // Manejo de Error 401: Token Expirado o Inválido (durante la petición)
    if (response.status === 401) {
        const newToken = await refreshAccessToken(); 

        if (newToken) {
            options.headers['Authorization'] = `Bearer ${newToken}`;
            response = await fetch(fetchUrl, options); 
        } else {
            logout();
            return null;
        }
    }

    if (!response.ok) {
        console.error(`Error en Spotify API: ${response.status} - ${response.statusText}`);
        return null;
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return response.json();
    }
    return response;
}


// --- FUNCIONES PÚBLICAS DE SPOTIFY ---

export async function getMyProfile() {
    const endpoint = '/me'; 
    return await spotifyRequest(endpoint);
}

export async function searchSpotify(query, type, limit = 10) {
    const endpoint = `/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}`; 
    const data = await spotifyRequest(endpoint);
    return data ? data[`${type}s`] : null; 
}


// --- LÓGICA DE GENERACIÓN DE PLAYLIST (FILTRADO LOCAL) ---

export async function generatePlaylist(preferences, limit = 30) {
    // Se elimina 'mood' de la desestructuración
    const { artists, genres, tracks, decades, popularity } = preferences; 
    let allTracks = [];
    const MAX_TRACKS_PER_SEED = 15;

    // A. Top Tracks de Artistas Seleccionados
    for (const artist of artists) {
        const data = await spotifyRequest(
            `/artists/${artist.id}/top-tracks?market=US` 
        );
        if (data && data.tracks) {
            allTracks.push(...data.tracks.slice(0, MAX_TRACKS_PER_SEED));
        }
    }

    // B. Tracks por Géneros
    for (const genre of genres) {
        const data = await spotifyRequest(
            `/search?q=genre:"${genre}"&type=track&limit=${MAX_TRACKS_PER_SEED}` 
        );
        if (data && data.tracks && data.tracks.items) {
            allTracks.push(...data.tracks.items);
        }
    }

    // C. Tracks Individuales Seleccionados (Widget de Seeds)
    if (tracks.length > 0) {
        const trackIds = tracks.map(t => t.id).join(',');
        const data = await spotifyRequest(`/tracks?ids=${trackIds}`);
        if (data && data.tracks) {
            allTracks.push(...data.tracks);
        }
    }
    
    // D. Tracks Favoritos (Likes Guardados Localmente)
    const favoriteIds = getFavoriteTrackIds();
    if (favoriteIds.length > 0) {
        const favoriteTrackIdsString = favoriteIds.slice(0, 10).join(',');
        const data = await spotifyRequest(`/tracks?ids=${favoriteTrackIdsString}`);
        if (data && data.tracks) {
            allTracks.push(...data.tracks); 
        }
    }

    // Eliminar duplicados antes de filtrar
    allTracks = Array.from(new Map(allTracks.map(track => [track.id, track])).values());

    // --- 2. FILTRADO LOCAL (Décadas, Popularidad) ---
    
    // 2.1. Filtrar por Popularidad
    if (popularity) {
        const [min] = popularity; 
        allTracks = allTracks.filter(track => track.popularity >= min);
    }
    
    // 2.2. Filtrar por Década
    if (decades.length > 0) {
        allTracks = allTracks.filter(track => {
            const releaseDate = track.album?.release_date;
            if (!releaseDate) return false;
            
            const year = new Date(releaseDate).getFullYear();
            return decades.some(decade => {
                const decadeStart = parseInt(decade);
                return year >= decadeStart && year < decadeStart + 10;
            });
        });
    }

    // --- 3. LIMPIEZA FINAL ---
    
    // Limitar al número final (30)
    const finalTracks = Array.from(
        new Map(allTracks.map(track => [track.id, track])).values()
    ).slice(0, limit);

    return finalTracks;
}

/**
 * Crea una nueva playlist vacía para el usuario actual.
 * @param {string} userId - ID del usuario de Spotify.
 * @param {string} name - Nombre de la nueva playlist.
 * @returns {object} Objeto de la playlist creada.
 */
export async function createPlaylist(userId, name) {
    const endpoint = `/users/${userId}/playlists`;
    const body = {
        name: name,
        description: 'Playlist generada por Taste Mixer.',
        public: true // Puedes cambiar a false si quieres que sea privada
    };
    return await spotifyRequest(endpoint, 'POST', body);
}

/**
 * Añade una lista de canciones a una playlist existente.
 * @param {string} playlistId - ID de la playlist destino.
 * @param {string[]} trackUris - Array de URIs de las canciones (ej: 'spotify:track:ID').
 * @returns {object} Respuesta de la API (snapshot_id).
 */
export async function addTracksToPlaylist(playlistId, trackUris) {
    const endpoint = `/playlists/${playlistId}/tracks`;
    const body = {
        uris: trackUris
    };
    // Spotify solo permite un máximo de 100 canciones por petición
    return await spotifyRequest(endpoint, 'POST', body);
}