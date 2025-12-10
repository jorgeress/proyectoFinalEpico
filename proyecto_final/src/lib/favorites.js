
const FAVORITES_KEY = 'spotify_favorites';


function getFavorites() {
    if (typeof window === 'undefined') return {};
    try {
        return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '{}');
    } catch (e) {
        console.error("Error parsing favorites from localStorage", e);
        return {};
    }
}


export function getFavoriteTrackIds() {
    const favorites = getFavorites();
    
    return Object.keys(favorites); 
}


export function isTrackFavorite(trackId) {
    const favorites = getFavorites();
    return !!favorites[trackId];
}


export function toggleFavorite(track) {
    if (typeof window === 'undefined') return;

    const favorites = getFavorites();
    const isCurrentlyFavorite = !!favorites[track.id];

    if (isCurrentlyFavorite) {
        // Quitar de favoritos
        delete favorites[track.id];
    } else {
        // Añadir a favoritos
        
        favorites[track.id] = { 
            id: track.id, 
            name: track.name,
            artist: track.artist, 
            image: track.image || track.album.images[0]?.url,
        };
    }

    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
        console.error("Error setting favorites to localStorage", e);
    }
}