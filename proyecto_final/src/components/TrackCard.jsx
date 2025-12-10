'use client';

import React from 'react';
import { toggleFavorite, isTrackFavorite } from '@/lib/favorites'; 

export default function TrackCard({ track, onRemove }) {
  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    // Inicializar el estado de favorito
    setIsFavorite(isTrackFavorite(track.id));
  }, [track.id]);

  const handleToggleFavorite = () => {
    toggleFavorite(track);
    setIsFavorite(isTrackFavorite(track.id));
  };

  const formatDuration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors mb-2">
      <div className="flex items-center space-x-4 flex-grow min-w-0">
        
        {track.album?.images?.[0] && (
          <img 
            src={track.album.images[0].url} 
            alt={`Portada de ${track.name}`} 
            className="w-12 h-12 object-cover rounded shadow-md" 
          />
        )}
        
        
        <div className="flex-1 min-w-0 overflow-hidden">
          <p className="text-white font-semibold truncate">{track.name}</p>
          <p className="text-sm text-gray-400 truncate">
            {track.artists.map(a => a.name).join(', ')} - {track.album.name}
          </p>
        </div>
      </div>

      
      <p className="text-sm text-gray-400 mx-4 flex-shrink-0">
        {formatDuration(track.duration_ms)}
      </p>

      
      <div className="flex space-x-3 flex-shrink-0">
        
        <button 
          onClick={handleToggleFavorite}
          className="p-1 text-2xl transition-transform hover:scale-110" 
          aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          {isFavorite ? '❤️' : '♡'} 
        </button>

        
        <button 
          onClick={() => onRemove(track.id)}
          className="p-1 text-2xl transition-transform hover:scale-110"
          aria-label="Eliminar canción de la playlist"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}