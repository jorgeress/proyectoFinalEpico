'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import PlaylistDisplay from '@/components/PlaylistDisplay';
import { generatePlaylist } from '@/lib/spotify';

export default function DashboardPage() {
  const [user, setUser] = useState({ display_name: 'Usuario de prueba' }); // temporal
  const [preferences, setPreferences] = useState({
    artists: [],
    genres: [],
    decades: [],
    popularity: [20, 90],
  });
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generatePlaylist(preferences);
    setTracks(result || []);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <Header user={user} />

      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Aquí luego irán los widgets */}
      <div className="mb-4">
        <p>Widgets aquí (Artist, Genre, Decade, Mood, Popularity)</p>
      </div>

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generando...' : 'Generar Playlist'}
      </button>

      <div className="mt-6">
        <PlaylistDisplay tracks={tracks} />
      </div>
    </div>
  );
}
