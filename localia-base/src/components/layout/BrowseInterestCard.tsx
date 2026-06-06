
import React from 'react';

//Imagenes actuales que tenemos 
import artisanImg from '../../assets/brand/artisan.jpg';
import foodImg from '../../assets/brand/food.jpg';
import cultureImg from '../../assets/brand/culture.jpg';
import beachImg from '../../assets/brand/beach.jpg';
import mountainImg from '../../assets/brand/montain.jpg';
import townImg from '../../assets/brand/town.jpg';

const categories = [
  { name: 'Artisan Goods', img: artisanImg },
  { name: 'Local Food', img: foodImg },
  { name: 'Culture', img: cultureImg },
  { name: 'The Beach', img: beachImg },
  { name: 'The Mountain', img: mountainImg },
  { name: 'Town Places', img: townImg },
];



function BrowseInterest(){
  return (
    <section className="w-full bg-[#EBF0F9] py-16 px-6 flex flex-col items-center">
      <div className="w-full max-w-[1200px]">
        <div className='mb-6'>
            <h2 className="text-3xl font-bold  mb-2 text-left">Browse by Interest</h2>
        <p className="text-sm text-gray-600 mb-10 text-left">Explore experiences designed around what you love</p>

        </div>
        {/* Cuadrícula de 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <div key={index} className="relative h-64 rounded-3xl overflow-hidden shadow-md group cursor-pointer">
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Degradado superior para que el texto blanco resalte siempre */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent p-6">
                <h3 className="text-white font-bold text-xl tracking-wide">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseInterest;