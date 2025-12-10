'use client';
import React from 'react';

const moodAttributes = [
    { key: 'danceability', label: 'Bailabilidad', emoji: '🕺' },
    { key: 'energy', label: 'Energía', emoji: '⚡' },
    { key: 'acousticness', label: 'Acústica', emoji: '🎻' },
    
];

export default function MoodWidget({ mood, onUpdate }) {
    
    
    const handleChange = (key, event) => {
        const newValue = parseFloat(event.target.value);
        
        // Actualizamos el estado con el nuevo valor del atributo
        onUpdate({
            ...mood,
            [key]: newValue, 
        });
    };
    
    // Función para formatear el valor de 0.0 a 1.0 en porcentaje
    const formatValue = (value) => (value * 100).toFixed(0);

    return (
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg h-full">
            
            <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">Atributos Musicales (Mood)</h3>
            <p className="text-sm text-gray-400 mb-4">
                Ajusta las características tonales y emocionales de las canciones (0 = Bajo, 1 = Alto).
            </p>

            <div className="space-y-6">
                {moodAttributes.map(attr => (
                    <div key={attr.key}>
                        <div className="flex justify-between items-baseline mb-1">
                            
                            <label htmlFor={attr.key} className="text-gray-300 font-medium flex items-center">
                                {attr.emoji} {attr.label}
                            </label>
                            <span className="text-lg font-bold text-green-400">{formatValue(mood[attr.key])}%</span>
                        </div>
                        
                        <input
                            type="range"
                            id={attr.key}
                            min="0.0"
                            max="1.0"
                            step="0.05"
                            value={mood[attr.key]}
                            onChange={(e) => handleChange(attr.key, e)}
                            style={{
                                background: `linear-gradient(to right, #10B981 ${mood[attr.key] * 100}%, #4B5563 ${mood[attr.key] * 100}%)`
                            }}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer 
                                        [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:w-4 
                                        [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none 
                                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}