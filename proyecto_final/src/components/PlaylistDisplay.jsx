'use client';

export default function PlaylistDisplay({ tracks = [] }) {
  if (!tracks.length) return <p>No hay canciones aún.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Tu Playlist</h2>
      <ul>
        {tracks.map(track => (
          <li key={track.id}>
            {track.name} — {track.artists?.map(a => a.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}
