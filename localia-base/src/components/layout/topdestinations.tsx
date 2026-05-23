// src/components/TopDestinations.tsx
import React from 'react';
import destinationImg from '../../assets/brand/destination-placeholder.jpg'; 

function TopDestinations(){
  // Simulamos las 4 tarjetas idénticas del diseño
  const cards = Array(4).fill(null);

  return (
    <section className="w-full mx-auto px-6 py-16 bg-white">
      {/* Encabezado de Sección */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-[#1F294E]">Top destinations near you</h2>
        <button className="px-6 py-3 bg-[#D4D977] text-[#1F294E] rounded-full font-semibold hover:bg-[#c2c76b] transition-all cursor-pointer text-sm">
          Find more places
        </button>
      </div>

      {/* Contenedor de Tarjetas con la Flecha de Slider */}
      <div className="relative flex gap-6 overflow-x-auto pb-4 scrollbar-none">
        {cards.map((_, index) => (
          <div key={index} className="flex-1 bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-4 flex flex-col gap-3">
            <img 
              src={destinationImg} 
              alt="Destination" 
              className="w-full h-48 object-cover rounded-2xl"
            />
            <span className="text-[#4D55C8] font-semibold text-sm px-1">Location</span>
            <p className="text-xs text-gray-500 leading-relaxed px-1">
              Localia offers you the comfort of discovering new ways to enjoy your trip. No fixed plans — just hidden places to explore and share.
            </p>
          </div>
        ))}

        {/* Botón Flotante Siguiente del Slider */}
        <button className="absolute -right-4 top-[40%] w-10 h-10 rounded-full bg-[#4D55C8] text-white flex items-center justify-center shadow-lg hover:bg-[#616BFD] transition-all cursor-pointer z-10">
          ➔
        </button>
      </div>
    </section>
  );
};

export default TopDestinations;