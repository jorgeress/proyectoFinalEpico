'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) router.push('/dashboard');
  }, [router]);

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <div>
      <h1>Spotify Taste Mixer</h1>
      <button onClick={handleLogin}>Login con Spotify</button>
    </div>
  );
}



