"use client"
import React from 'react';
import TrackCard from './TrackCard';


export default function PlaylistDisplay({ tracks, onRemoveTrack, onRefreshPlaylist, onAddMoreTracks, onSaveToSpotify }) {

    
    const showManagementButtons = tracks.length > 0;

    return (
        <div className="bg-gray-900 p-6 rounded-xl shadow-2xl h-full">
            <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-3">
                <h2 className="text-2xl font-bold text-white">
                    ✨ Playlist Generada ({tracks.length} {tracks.length === 1 ? 'canción' : 'canciones'})
                </h2>
                
                
                <div className="flex space-x-3">
                    
                    
                    <button
                        onClick={onRefreshPlaylist}
                        className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors flex items-center shadow-md"
                        title="Refrescar y Regenerar la playlist completa"
                    >
                        🔄 Refrescar
                    </button>

                    
                    <button
                        onClick={onAddMoreTracks}
                        className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded-full transition-colors flex items-center shadow-md"
                        title="Añadir más canciones a la lista actual"
                    >
                        ➕ Añadir Más
                    </button>
                    
                    
                    {showManagementButtons && (
                        <button
                            onClick={onSaveToSpotify}
                            className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors flex items-center shadow-md"
                            title="Guardar la playlist actual en tu cuenta de Spotify"
                        >
                            💾 Guardar
                        </button>
                    )}

                </div>
            </div>

            {tracks.length === 0 ? (
                <p className="text-center text-gray-400 py-10">
                    Usa los widgets para seleccionar tus preferencias y haz clic en "Generar Playlist".
                </p>
            ) : (
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                    {tracks.map((track, index) => (
                        <TrackCard 
                            key={track.id + index} 
                            track={track} 
                            onRemove={onRemoveTrack} 
                            
                        />
                    ))}
                </div>
            )}
        </div>
    );
}