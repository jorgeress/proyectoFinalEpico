// /components/widgets/LimitWidget.jsx
'use client';

import React from 'react';

export default function LimitWidget({ limit, onUpdate }) {
    
    // Rango mínimo y máximo para las canciones
    const MIN_LIMIT = 10;
    const MAX_LIMIT = 50;

    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-2xl">
            <h3 className="text-xl font-semibold mb-4 text-white">📏 Límite de Canciones</h3>
            <p className="text-3xl font-bold text-green-400 mb-4">{limit}</p>
            
            <input
                type="range"
                min={MIN_LIMIT}
                max={MAX_LIMIT}
                step="5" // Permite pasos de 5 en 5 (10, 15, 20, ...)
                value={limit}
                onChange={(e) => onUpdate(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer range-lg accent-green-500"
            />
            
            <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>{MIN_LIMIT}</span>
                <span>{MAX_LIMIT}</span>
            </div>
            <p className="text-sm text-gray-500 mt-3">Define la cantidad de canciones a generar.</p>
        </div>
    );
}