import React from 'react';

// Componente funcional que representa la cabecera del sitio
function Header() {
  return (
<header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#363636] px-5 sm:px-10 py-3">
  <div class="flex items-center gap-4 text-white">
    <div class="size-4">
    <img
          src="/images/logo.webp" // Asegúrate de que esta ruta sea correcta y con la extensión .webp
          alt="Logo de Pan El Bardo"
          className="h-auto w-12" // Ajusta el tamaño según necesites (h-8, h-10, h-12)
        />
    </div>
    <h2 class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Pan El Bardo</h2>
  </div>

  <nav class="hidden md:flex flex-1 justify-end gap-8">
    <div class="flex items-center gap-9">
      <a class="text-white text-sm font-medium leading-normal" href="#">Inicio</a>
      <a class="text-white text-sm font-medium leading-normal" href="#productos">Productos</a>
      <a class="text-white text-sm font-medium leading-normal" href="#aboutus">Sobre Nosotros</a>
      <a class="text-white text-sm font-medium leading-normal" href="#talkus">Contacto</a>
    </div>
  </nav>

  </header>
  );
}

export default Header;
