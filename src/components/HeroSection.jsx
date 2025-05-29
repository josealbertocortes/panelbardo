import React from 'react';

function HeroSection() {
  return (
    <section id="inicio" className="px-4 py-8 sm:py-12 md:py-16">
      <div className="container mx-auto">
        <div
          className="flex min-h-[480px] flex-col items-center justify-center gap-6 rounded-xl bg-cover bg-center bg-no-repeat p-4 sm:gap-8"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDj8dTD6tKj6GcZFrYyPrnnsht1hRQbXD4kzzr3w2gY_DFo1SS0EUAGO58J5HVdXQeuMdAyexqabz2bkAG5iqKXzt-voPToF0HKDn0nU2gpD8nvFVsf8JQn9UE3y9WpwdNGfSnBHft3f6miuKL687wK_yKg7o2fZCYEnuwDfU4h7jhFqheqh4gO12P4uNZUmdo3jGSe5ROcE-DupKP-E713GpE3yFMmVUhwQp3a8NM1h9pqw-7RJw3k1-1zZYX4YbcJ54Sj7sasNFk")',
          }}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Bienvenido a Pan El Bardo
            </h1>
            <h2 className="text-sm font-normal leading-normal text-white sm:text-base">
              Disfruta de nuestros productos artesanales y caseros, hechos con amor y los mejores ingredientes.
            </h2>
          </div>
          <a
            href="#productos"
            className="mt-4 flex h-10 min-w-[84px] max-w-[480px] items-center justify-center rounded-full bg-[#141414] px-4 text-sm font-bold text-white transition-all hover:bg-[#1f1f1f] sm:h-12 sm:px-6 sm:text-base"
          >
            <span className="truncate">Ver Productos</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
