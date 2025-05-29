import React from 'react';

function HeroSection() {
  return (
    <section id='inicio'> 
    <div className="@container">
      <div className="@[480px]:p-4">
        <div
          className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
          style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDj8dTD6tKj6GcZFrYyPrnnsht1hRQbXD4kzzr3w2gY_DFo1SS0EUAGO58J5HVdXQeuMdAyexqabz2bkAG5iqKXzt-voPToF0HKDn0nU2gpD8nvFVsf8JQn9UE3y9WpwdNGfSnBHft3f6miuKL687wK_yKg7o2fZCYEnuwDfU4h7jhFqheqh4gO12P4uNZUmdo3jGSe5ROcE-DupKP-E713GpE3yFMmVUhwQp3a8NM1h9pqw-7RJw3k1-1zZYX4YbcJ54Sj7sasNFk")' }}
        >
          <div className="flex flex-col gap-2 text-center">
            <h1
              className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]"
            >
              Bienvenido a Pan El Bardo
            </h1>
            <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
              Disfruta de nuestros productos artesanales y caseros, hechos con amor y los mejores ingredientes.
            </h2>
          </div>
          <a href="#productos"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#141414] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
          >
            <span className="truncate" >Ver Productos</span>
          </a>
        </div>
      </div>
    </div>
    </section>
  );
}

export default HeroSection;