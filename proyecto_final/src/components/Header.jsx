'use client'

import { useRouter } from 'next/navigation';

export default function Header({ user }) {
  const router = useRouter();

  const handleLogout = () => {
    // 1. Añadimos una confirmación de seguridad antes de cerrar sesión
    if (confirm('¿Estás seguro de que quieres cerrar tu sesión de Spotify?')) {
      
      localStorage.clear();
      // Usamos el router para redirigir
      router.push("/");
    }
  };

  
  if (!user) {
    return (
      <header className="flex justify-end p-4">
        <p className="text-gray-400">Cargando perfil...</p>
      </header>
    );
  }

  
  const profileImageUrl = user.images?.[0]?.url;

  return (
    <header className="flex justify-between items-center py-4 px-0 border-b border-gray-700">
      
      
      <div className="flex items-center space-x-3">
        
        {profileImageUrl && (
          <img 
            src={profileImageUrl} 
            alt={user.display_name || 'Usuario'}
            className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
          />
        )}
        
        
        <h2 className="text-white font-medium text-lg">
          Hola, **{user.display_name || 'Usuario'}**
        </h2>
      </div>

      
      <button 
        onClick={handleLogout} 
        
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold text-sm transition-colors shadow-md"
      >
        Cerrar Sesión
      </button>
      
    </header>
  );
}