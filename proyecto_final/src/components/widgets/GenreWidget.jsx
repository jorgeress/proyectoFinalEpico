
"use client"
import React from 'react';

const availableGenres = [ 
  'pop', 
  'rock', 
  'hip-hop', 
  'electronic', 
  'indie', 
  'r&b', 
  'latin', 
  'jazz', 
  'metal', 
  'dance', 
  'soul',
  'country', 
  'punk',
  'classical',
  'folk',
  'reggae',
  'blues',
  'christian',
  'world-music'
];
export default function GenreWidget({ selectedGenres, onUpdate }) {
  
  const handleToggle = (genre) => {
    
    const newGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
      
    onUpdate(newGenres);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg h-full">
      <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">🎶 Géneros Musicales</h3>
      <div className="flex flex-wrap gap-2">
        {availableGenres.map(genre => (
          <button
            key={genre}
            onClick={() => handleToggle(genre)}
            className={`
              px-4 py-2 text-sm rounded-full transition-colors duration-200
              ${selectedGenres.includes(genre) 
                ? 'bg-green-600 text-white font-bold' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }
            `}
          >
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3">Selecciona al menos un género.</p>
    </div>
  );
}