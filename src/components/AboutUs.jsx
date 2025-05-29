import React from 'react';

function AboutUs() {
  return (
<section id="aboutus" class="py-10 px-4">
  <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
    <div class="w-full md:w-1/2">
      <img
        src="/images/pastelcinco.jpeg" // Replace with the actual image URL
        alt="Una imagen de Pan El Bardo"
        class="w-full h-auto object-cover rounded-lg shadow-lg"
      />
      </div>

    <div class="w-full md:w-1/2 text-center md:text-left">
      <h2 class="text-white text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em] mb-4">
        Sobre Nosotros
      </h2>
      <p class="text-[#adadad] text-base md:text-lg font-normal leading-relaxed">
        En Pan El Bardo, nos apasiona crear productos de panadería y pastelería que te hagan sentir como en casa. Utilizamos ingredientes frescos y de alta calidad, y cada
        producto es elaborado con cuidado y dedicación. Nuestra misión es endulzar tus momentos especiales con sabores auténticos y recuerdos inolvidables.
      </p>
      <p class="text-[#adadad] text-base md:text-lg font-normal leading-relaxed mt-4">
        Desde nuestras recetas tradicionales hasta las innovaciones diarias, cada bocado es una experiencia. Visítanos y descubre el sabor de la tradición.
      </p>
    </div>
  </div>
</section>
  );
}

export default AboutUs;
