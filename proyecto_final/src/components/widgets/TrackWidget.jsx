'use client';

import React, { useState } from 'react';
import { searchSpotify } from '@/lib/spotify'; 
import { useDebounce } from '@/lib/utils'; 

export default function TrackWidget({ selectedTracks, onUpdate }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Búsqueda con retardo para evitar spam de peticiones a la API
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Máximo de canciones que Spotify permite como semilla
    const MAX_TRACKS = 5; 

    // --- Lógica de Búsqueda ---
    React.useEffect(() => {
        if (debouncedSearchTerm) {
            fetchTracks(debouncedSearchTerm);
        } else {
            setSearchResults([]);
        }
    }, [debouncedSearchTerm]);

    const fetchTracks = async (query) => {
        setLoading(true);
        setError(null);
        try {
            // Usamos la función de búsqueda de Spotify con el tipo 'track'
            const data = await searchSpotify(query, 'track', 10);
            
            if (data && data.items) {
                // Mapeamos los resultados para obtener solo la información necesaria
                const tracks = data.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists.map(a => a.name).join(', '),
                    album: track.album.name,
                    image: track.album.images[2]?.url || '/placeholder.png' 
                }));
                setSearchResults(tracks);
            } else {
                setSearchResults([]);
            }
        } catch (e) {
            console.error("Error fetching tracks:", e);
            setError("Error al buscar canciones.");
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };
    
    // --- Lógica de Selección ---
    const handleSelectTrack = (track) => {
        const isSelected = selectedTracks.some(t => t.id === track.id);
        
        if (isSelected) {
            
            onUpdate(selectedTracks.filter(t => t.id !== track.id));
        } else if (selectedTracks.length < MAX_TRACKS) {
            
            onUpdate([...selectedTracks, track]);
            setSearchTerm(''); 
            setSearchResults([]);
        }
    };

    const isTrackSelected = (trackId) => selectedTracks.some(t => t.id === trackId);

    return (
        <div className="bg-gray-800 p-5 rounded-xl shadow-lg h-full flex flex-col">
            <h3 className="text-xl font-bold mb-3 text-green-400">🎶 Canciones Favoritas (Seeds)</h3>
            <p className="text-sm text-gray-400 mb-4">Busca y selecciona hasta {MAX_TRACKS} canciones para guiar las recomendaciones.</p>

            
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Busca una canción..."
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-green-500 focus:border-green-500 mb-4"
            />
            
            
            {selectedTracks.length === MAX_TRACKS && (
                <p className="text-red-400 text-sm mb-3">Límite de {MAX_TRACKS} canciones alcanzado.</p>
            )}

            
            <div className={`overflow-y-auto ${searchResults.length > 0 ? 'border-t border-gray-700 pt-3' : ''} flex-grow`}>
                {loading && <p className="text-center text-gray-400">Cargando resultados...</p>}
                {error && <p className="text-center text-red-400">{error}</p>}
                
                
                {searchResults.map(track => (
                    <div
                        key={track.id}
                        onClick={() => handleSelectTrack(track)}
                        className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors 
                                    ${isTrackSelected(track.id) ? 'bg-green-600' : 'hover:bg-gray-700'} 
                                    ${isTrackSelected(track.id) ? 'text-white' : 'text-gray-200'}
                                    ${selectedTracks.length === MAX_TRACKS && !isTrackSelected(track.id) ? 'opacity-50 cursor-not-allowed' : ''}
                                    mb-1`}
                    >
                        <img src={track.image} alt={track.name} className="w-8 h-8 rounded mr-3" />
                        <div>
                            <p className="text-sm font-semibold truncate">{track.name}</p>
                            <p className="text-xs text-gray-300 truncate">{track.artist}</p>
                        </div>
                    </div>
                ))}
            </div>

            
            {selectedTracks.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                    <h4 className="font-semibold text-gray-300 mb-2">Seleccionadas ({selectedTracks.length}/{MAX_TRACKS}):</h4>
                    {selectedTracks.map(track => (
                        <div key={track.id} className="flex justify-between items-center bg-gray-700 p-2 rounded mb-1">
                            <span className="text-sm truncate mr-2">{track.name} por {track.artist}</span>
                            <button 
                                onClick={() => handleSelectTrack(track)}
                                className="text-red-400 hover:text-red-300 text-sm font-bold"
                                title="Remover"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}