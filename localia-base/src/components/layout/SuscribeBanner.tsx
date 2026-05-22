// src/components/SubscribeBanner.tsx
import React from 'react';

function SubscribeBanner(){
  return (
    <section className="w-full bg-[#E27855] py-20 px-6 flex flex-col items-center text-white text-center">
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
          Explore what’s waiting for you on your next adventure
        </h2>

        {/* Formulario Inline */}
        <div className="w-full flex flex-col sm:flex-row gap-4 justify-center">
          <input 
            type="email" 
            placeholder="Email" 
            className="flex-1 h-12 rounded-full px-6 text-[#1F294E] bg-white outline-none placeholder:text-gray-400"
          />
          <button className="h-12 px-8 bg-[#4D55C8] hover:bg-[#616BFD] transition-all text-white font-medium rounded-full cursor-pointer shadow-md">
            Suscribe
          </button>
        </div>

        <p className="text-xs text-white/80 leading-relaxed">
          We’ll send you inspiring updates and information about our experiences.
        </p>
      </div>
    </section>
  );
};

export default SubscribeBanner;