// /components/widgets/DecadeWidget.jsx
'use client';
import React from 'react';

// Definimos las décadas disponibles
const availableDecades = [
    '1970',
    '1980',
    '1990',
    '2000',
    '2010',
    '2020',
];

export default function DecadeWidget({ selectedDecades, onUpdate }) {
    
    const handleToggle = (decade) => {
        
        const newDecades = selectedDecades.includes(decade)
            ? selectedDecades.filter(d => d !== decade)
            : [...selectedDecades, decade];
            
        onUpdate(newDecades);
    };

    return (
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg h-full">
            
            <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">Décadas Musicales</h3>
            <p className="text-sm text-gray-400 mb-4">
                Filtra por la década de lanzamiento de las canciones.
            </p>
            <div className="flex flex-wrap gap-2">
                {availableDecades.map(decade => (
                    <button
                        key={decade}
                        onClick={() => handleToggle(decade)}
                        className={`
                            px-4 py-2 text-sm rounded-full transition-colors duration-200
                            ${selectedDecades.includes(decade) 
                                ? 'bg-green-600 text-white font-bold' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }
                        `}
                    >
                        {decade}s
                    </button>
                ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">Puedes seleccionar múltiples décadas.</p>
        </div>
    );
}