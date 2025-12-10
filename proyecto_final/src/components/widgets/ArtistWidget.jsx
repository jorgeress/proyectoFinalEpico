// /components/widgets/ArtistWidget.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { searchSpotify } from '@/lib/spotify';
import { useDebounce } from '@/lib/utils'; 

const MAX_SELECTION = 5;

export default function ArtistWidget({ selectedArtists, onUpdate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Usar el hook de debouncing con un retardo de 500ms
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Función de búsqueda (se ejecuta solo cuando debouncedSearchTerm cambia)
  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchArtists(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  const fetchArtists = async (query) => {
    setLoading(true);
    try {
      const data = await searchSpotify(query, 'artist', 10); 
      setSearchResults(data?.items || []);
    } catch (error) {
      console.error("Error buscando artistas:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleArtist = (artist) => {
    let newSelection;
    const isSelected = selectedArtists.some(a => a.id === artist.id);

    if (isSelected) {
      newSelection = selectedArtists.filter(a => a.id !== artist.id);
    } else if (selectedArtists.length < MAX_SELECTION) {
      const simplifiedArtist = {
        id: artist.id,
        name: artist.name,
        images: artist.images,
      };
      newSelection = [...selectedArtists, simplifiedArtist];
    } else {
      alert(`Solo puedes seleccionar hasta ${MAX_SELECTION} artistas.`);
      return;
    }
    onUpdate(newSelection);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg h-full">
      <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">Artistas Favoritos - Selección ({selectedArtists.length}/{MAX_SELECTION})</h3>
      
      <div className="relative mb-3">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400">🔍</span>
        
        <input
          type="text"
          placeholder="Buscar artistas (ej: Rosalía, Queen)"
          className="w-full p-2 pl-10 bg-gray-700 rounded-lg border border-gray-600 focus:ring-green-500 focus:border-green-500 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="h-48 overflow-y-auto space-y-2 pr-2">
        {loading && <p className="text-center text-green-500">Buscando...</p>}
        
        {searchResults.map(artist => {
          const isSelected = selectedArtists.some(a => a.id === artist.id);
          return (
            <div
              key={artist.id}
              onClick={() => handleToggleArtist(artist)}
              className={`flex items-center p-2 rounded transition cursor-pointer ${
                isSelected ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <img 
                src={artist.images?.[0]?.url || 'https://via.placeholder.com/50'} 
                alt={artist.name} 
                className="w-10 h-10 rounded-full mr-3 object-cover" 
              />
              <span className="flex-grow text-white truncate">{artist.name}</span>
              {isSelected && <span className="text-white ml-2">✅</span>}
            </div>
          );
        })}

        {!loading && searchTerm && searchResults.length === 0 && (
            <p className="text-gray-400 text-center">No se encontraron artistas para "{searchTerm}".</p>
        )}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-700">
        <p className="text-sm font-medium text-gray-300 mb-2">Seleccionados:</p>
        <div className="flex flex-wrap gap-2">
            {selectedArtists.map(artist => (
                 <span key={artist.id} className="text-xs bg-green-900 text-green-300 px-3 py-1 rounded-full cursor-default">
                    {artist.name}
                 </span>
            ))}
        </div>
      </div>
    </div>
  );
}