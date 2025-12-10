'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Importaciones de utilidades y servicios
import { 
    getMyProfile, 
    generatePlaylist, 
    createPlaylist, 
    addTracksToPlaylist
} from '@/lib/spotify'; 
import { getAccessToken, logout } from '@/lib/auth'; 

// Importaciones de componentes 
import Header from '@/components/Header';
import PlaylistDisplay from '@/components/PlaylistDisplay';
import GenreWidget from '@/components/widgets/GenreWidget';
import ArtistWidget from '@/components/widgets/ArtistWidget';
import PopularityWidget from '@/components/widgets/PopularityWidget';
import DecadeWidget from '@/components/widgets/DecadeWidget';
import TrackWidget from '@/components/widgets/TrackWidget'; 

// --- 1. Estado Inicial ---
const initialPreferences = {
    genres: [],
    artists: [],
    tracks: [], 
    popularity: [50, 100], 
    decades: ['2000', '2010', '2020'],
    
};


export default function DashboardPage() {
    const router = useRouter();
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [user, setUser] = useState(null); 
    const [preferences, setPreferences] = useState(initialPreferences);
    const [playlist, setPlaylist] = useState([]);
    const [loadingPlaylist, setLoadingPlaylist] = useState(false);
    const [error, setError] = useState(null);

    // --- 2. Inicialización: Obtener Perfil de Usuario ---
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Lógica de autenticación inicial 
                await getAccessToken(); 
                
                const profile = await getMyProfile();
                if (profile) {
                    setUser(profile);
                } else {
                    
                    throw new Error("Fallo al cargar perfil.");
                }
            } catch (err) {
                console.error("Error al obtener perfil o token:", err);
                logout(); 
                router.push('/');
            } finally {
                setLoadingProfile(false);
            }
        };

        fetchProfile();
    }, [router]);

    // --- 3. Funciones de Manejo de Estado y Playlist ---
    
    // Función central para actualizar cualquier preferencia
    const updatePreferences = (key, value) => {
        setPreferences(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Generar Playlist (Usada por el botón principal y el botón "Refrescar")
    const handleGenerate = async () => {
        setLoadingPlaylist(true);
        setError(null);
        if (preferences.genres.length === 0) {
            setError("Selecciona al menos un género.");
            setLoadingPlaylist(false);
            return;
        }

        try {
            const newTracks = await generatePlaylist(preferences);
            if (newTracks && newTracks.length > 0) {
                setPlaylist(newTracks);
            } else {
                setPlaylist([]);
                setError("No se encontraron canciones con las preferencias seleccionadas.");
            }
        } catch (err) {
            console.error("Error generando playlist:", err);
            setError("No se pudo generar la playlist. Inténtalo de nuevo o ajusta los filtros.");
        } finally {
            setLoadingPlaylist(false);
        }
    };

    // Añadir más canciones
    const handleAddMoreTracks = async () => {
        setLoadingPlaylist(true);
        setError(null);
        try {
            // Pasamos un límite menor para no sobrecargar
            const additionalTracks = await generatePlaylist(preferences, 15); 
            
            const existingIds = new Set(playlist.map(t => t.id));
            const uniqueNewTracks = additionalTracks.filter(t => !existingIds.has(t.id));

            setPlaylist(prev => [...prev, ...uniqueNewTracks]);
        } catch (err) {
            console.error("Error añadiendo tracks:", err);
            setError("No se pudo añadir más música.");
        } finally {
            setLoadingPlaylist(false);
        }
    };
    
    // Eliminar una canción
    const handleRemoveTrack = (trackId) => {
        setPlaylist(prev => prev.filter(track => track.id !== trackId));
    };


    // --- 4. FUNCIONALIDAD OPCIONAL: GUARDAR EN SPOTIFY 
const handleSavePlaylist = async () => {
    
    if (!playlist.length || !user) { 
        alert('Genera una playlist y asegúrate de que tu perfil esté cargado.');
        return;
    }

    setLoadingPlaylist(true);
    try {
        // 1. Crear la playlist
        const playlistName = `Taste Mixer - ${new Date().toLocaleDateString()}`;
       
        const newPlaylist = await createPlaylist(user.id, playlistName); 

        if (!newPlaylist || !newPlaylist.id) {
            throw new Error('Fallo en la API al crear playlist.');
        }

        // 2. Obtener las URIs
        const trackUris = playlist.map(track => track.uri);

        // 3. Añadir las canciones
        await addTracksToPlaylist(newPlaylist.id, trackUris);

        alert(`¡Playlist "${playlistName}" guardada con éxito en tu Spotify!`);

    } catch (error) {
        console.error("Error al guardar en Spotify:", error);
        alert('Error al guardar la playlist. Verifica tus permisos de modificación.');
    } finally {
        setLoadingPlaylist(false);
    }
};


    if (loadingProfile) {
        
        return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white text-2xl">Cargando datos de Spotify...</div>;
    }

    // --- 5. Renderizado ---
    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Header user={user} />

                <h1 className="text-4xl font-extrabold text-green-500 mt-6 mb-10">Spotify Taste Mixer</h1>
                
                
                <h2 className="text-2xl font-semibold text-gray-200 mb-5"> Ajustes de Preferencia</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    
                    <GenreWidget 
                        selectedGenres={preferences.genres} 
                        onUpdate={genres => updatePreferences('genres', genres)} 
                    />
                    
                    <ArtistWidget 
                        selectedArtists={preferences.artists} 
                        onUpdate={artists => updatePreferences('artists', artists)} 
                    />
                    
                    <DecadeWidget
                        selectedDecades={preferences.decades}
                        onUpdate={decades => updatePreferences('decades', decades)}
                    />
                    
                    <PopularityWidget
                        popularity={preferences.popularity} 
                        onUpdate={range => updatePreferences('popularity', range)} 
                    />

                    <TrackWidget 
                        selectedTracks={preferences.tracks} 
                        onUpdate={tracks => updatePreferences('tracks', tracks)} 
                    />
                    
                </div>
                
                {/* BOTÓN PRINCIPAL DE GENERACIÓN */}
                <div className="text-center my-8">
                    <button
                        onClick={handleGenerate}
                        disabled={loadingPlaylist || preferences.genres.length === 0}
                        className="px-10 py-4 text-xl font-bold rounded-full bg-green-500 text-gray-900 
                                hover:bg-green-400 transition-transform transform hover:scale-105 disabled:opacity-50"
                    >
                        {loadingPlaylist ? 'Generando...' : 'Generar Playlist'}
                    </button>
                    {preferences.genres.length === 0 && (
                        <p className="text-red-400 mt-2">Selecciona al menos un género para generar la playlist.</p>
                    )}
                </div>

                <hr className="border-gray-700 my-8" />
                
                {/* SECCIÓN DE VISUALIZACIÓN DE PLAYLIST */}
                {error && (
                    <div className="bg-red-900 text-red-300 p-4 rounded mb-6">{error}</div>
                )}
                
                <PlaylistDisplay
                    tracks={playlist}
                    onRemoveTrack={handleRemoveTrack}
                    onRefreshPlaylist={handleGenerate} 
                    onAddMoreTracks={handleAddMoreTracks}
                    onSaveToSpotify={handleSavePlaylist} 
                    loading={loadingPlaylist}
                />

            </div>
        </div>
    );
}