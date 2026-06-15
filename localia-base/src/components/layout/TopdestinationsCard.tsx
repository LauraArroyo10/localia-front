
import React from 'react';
import destinationImg from '../../assets/brand/destination-placeholder.jpg'; 

function TopDestinations(){
  
  const cards = Array(4).fill(null);

  return (
    
    <section className="w-full bg-white py-16 px-6 flex flex-col items-center">
      
      
      <div className="w-full max-w-[1200px]">

        {/* Encabezado de Sección */}
        <div className="flex justify-between items-center mb-10 w-full max-w-[1200px]">
          <h2 className="text-3xl font-bold text-[#1F294E]">Top destinations near you</h2>
          <button className="px-6 py-3 bg-[#D4D977] text-[#1F294E] rounded-full font-semibold hover:bg-[#c2c76b] transition-all cursor-pointer text-sm">
            Find more places
          </button>
        </div>

        {/* Contenedor de Tarjetas con la Flecha de Slider */}
        <div className="relative flex gap-6 overflow-x-auto pb-4 scrollbar-none w-full">
          {cards.map((_, index) => (
            
            <div key={index} className="flex-1 min-w-[260px] bg-white rounded-3xl overflow-hidden p-4 flex flex-col gap-3">
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

         
        </div>

      </div>
    </section>
  );
};

export default TopDestinations;