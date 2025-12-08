"use client";

export default function ArtistWidget({ onChange }) {
  return (
    <div>
      <p>Widget de artistas (por implementar)</p>
      <button onClick={() => onChange([{id:'test'}])}>Seleccionar artista de prueba</button>
    </div>
  );
}
