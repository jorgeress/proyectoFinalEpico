'use client';
import React from 'react';

// Mapeo simple para mostrar categorías de popularidad
const getPopularityLabel = (minPop) => {
    if (minPop >= 80) return "Hits Mundiales (Mainstream)";
    if (minPop >= 50) return "Éxitos Populares";
    if (minPop >= 30) return "Joyas Conocidas";
    return "Descubrimientos (Underground)";
};

export default function PopularityWidget({ popularity, onUpdate }) {
    // Usamos el primer valor del array [min, max] como el valor del slider (el mínimo)
    const [minPopularity, setMinPopularity] = React.useState(popularity[0]);

    const MIN_RANGE = 0;
    const MAX_RANGE = 100;
    
    const handleChange = (event) => {
        const newMinPop = parseInt(event.target.value);
        setMinPopularity(newMinPop);
        
        // El rango siempre es [mínimo seleccionado, 100]
        onUpdate([newMinPop, MAX_RANGE]); 
    };

    
    const fillPercentage = ((minPopularity - MIN_RANGE) / (MAX_RANGE - MIN_RANGE)) * 100;
    const trackStyle = {
        background: `linear-gradient(to right, #10B981 ${fillPercentage}%, #4B5563 ${fillPercentage}%)`
    };

    return (
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg h-full">
            
            <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">Popularidad Mínima</h3>
            
            <p className="text-sm text-gray-400 mb-4">
                ¿Qué tan populares deben ser las canciones generadas?
            </p>

            <div className="mt-6">
                
                <div className="flex justify-between items-baseline mb-2">
                    <span className="text-2xl font-bold text-green-400">{minPopularity}</span>
                    <span className="text-sm text-gray-300">{getPopularityLabel(minPopularity)}</span>
                </div>

                
                <input
                    type="range"
                    min={MIN_RANGE}
                    max={MAX_RANGE}
                    value={minPopularity}
                    onChange={handleChange}
                    style={trackStyle}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer range-lg 
                               [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:w-4 
                               [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none 
                               [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg"
                />

                
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0 (Raro)</span>
                    <span>100 (Hit Global)</span>
                </div>
            </div>
        </div>
    );
}