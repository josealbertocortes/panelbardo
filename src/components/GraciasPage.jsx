import React from 'react';

function GraciasPage() {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#1a1a1a] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 py-10 flex flex-1 justify-center md:px-40 md:py-5"> {/* Ajuste de padding para responsividad */}
          <div className="layout-content-container flex flex-col w-full max-w-[960px] py-5"> {/* w-full y max-w */}
            <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5 sm:text-3xl md:text-4xl"> {/* Ajuste de tamaño de texto */}
              Gracias por contactarnos
            </h2>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4 text-center sm:text-lg"> {/* Ajuste de tamaño de texto */}
              Hemos recibido tu mensaje y te responderemos lo antes posible.
            </p>
            <div className="flex px-4 py-3 justify-center mt-4"> {/* Añadido mt-4 para espacio */}
            <div class="flex px-4 py-3 justify-center">
  <a
    href="https://wa.me/TU_NUMERO_DE_WHATSAPP_AQUI?text=Hola%2C%20quisiera%20saber%20mas%20sobre%20sus%20servicios."
    class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-black text-white text-sm font-bold leading-normal tracking-[0.015em]"
    target="_blank" rel="noopener noreferrer" 
  >
    <span class="truncate">Contactar por WhatsApp</span>
  </a>
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraciasPage;