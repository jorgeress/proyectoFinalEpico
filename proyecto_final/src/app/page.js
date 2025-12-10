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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 bg-gray-800/80 backdrop-blur-xl p-10 md:p-12 rounded-2xl shadow-2xl max-w-md w-full text-center border border-gray-700/50">
        
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
            <div className="relative">
              <img 
                src="/Spotify_Primary_Logo_RGB_White.png" 
                alt="Spotify Logo" 
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight bg-gradient-to-r from-green-400 via-green-300 to-emerald-400 bg-clip-text text-transparent">
          Spotify Epico Mixer
        </h1>
        
        <p className="text-green-400/80 text-sm font-semibold mb-6 tracking-wide uppercase">
          Personaliza tu creacion de playlists
        </p>
        
        <p className="text-gray-300 mb-8 text-base leading-relaxed">
          Genera playlists únicas basadas en tus artistas favoritos, géneros musicales y preferencias personales.
        </p>
        
        <div className="mb-8 space-y-3 text-left">
          <div className="flex items-center space-x-3 text-gray-300">
            <span className="text-green-400">✓</span>
            <span className="text-sm">Análisis personalizado de tus gustos</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <span className="text-green-400">✓</span>
            <span className="text-sm">Recomendaciones inteligentes</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <span className="text-green-400">✓</span>
            <span className="text-sm">Obten un flow único</span>
          </div>
        </div>
        
        <button 
          onClick={handleLogin}
          className="group relative w-full px-8 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-green-500 to-green-600 text-gray-900 
                    hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/50 
                    flex items-center justify-center space-x-3 overflow-hidden"
        >
          <span className="relative z-10 text-2xl group-hover:scale-110 transition-transform duration-300">🎧</span>
          <span className="relative z-10">Conectar con Spotify</span>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        <p className="text-xs text-gray-500 mt-6 flex items-center justify-center space-x-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Autenticación segura con Spotify</span>
        </p>
      </div>

      <div className="mt-8 text-gray-500 text-xs text-center">
        <p>Disfruta de música sin límites</p>
      </div>
    </div>
  );
}