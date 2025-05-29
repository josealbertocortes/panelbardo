import React from 'react';

// Componente funcional que representa la cabecera del sitio
function Header() {
  return (
<header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#363636] px-5 sm:px-10 py-3">
  <div class="flex items-center gap-4 text-white">
    <div class="size-4">
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
          fill="currentColor"
        ></path>
      </svg>
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
