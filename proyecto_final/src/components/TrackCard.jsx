"use client";
export default function TrackCard({ track }) {
  return (
    <div className="bg-neutral-800 p-3 rounded">
      <p className="font-bold">{track.name}</p>
      <span className="text-sm opacity-70">{track.artist}</span>
    </div>
  )
}
