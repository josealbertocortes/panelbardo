import React from 'react';

function ProductSection() {
  const products = [
    {
      name: 'Pasteles Artesanales',
      description: 'Deliciosos pasteles hechos a mano con recetas tradicionales.',
      image: '/images/pasteluno.jpeg', // Placeholder image, replace with actual URL
    },
    {
      name: 'Tartas Caseras',
      description: 'Tartas frescas con frutas de temporada y rellenos cremosos.',
      image: '/images/pasteldos.jpeg', // Placeholder image, replace with actual URL
    },
    {
      name: 'Galletas y Dulces',
      description: 'Variedad de galletas y dulces para todos los gustos.',
      image: '/images/pasteltres.jpeg', // Placeholder image, replace with actual URL
    },
  ];

  return (
    <section id="productos" className="@container">
      <div className="@[480px]:px-6 px-4 pb-6 pt-5">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4 text-center @[480px]:text-2xl">
          Productos Destacados
        </h2>
        <div className="flex overflow-x-auto gap-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {products.map((product, index) => (
            <div key={index} className="min-w-[240px] max-w-[280px] flex-shrink-0 bg-[#1c1c1c] rounded-xl overflow-hidden shadow-lg">
              <div
                className="aspect-[3/4] bg-cover bg-center"
                style={{ backgroundImage: `url(${product.image})` }}
              ></div>
              <div className="p-3 flex flex-col gap-1">
                <p className="text-white text-base font-semibold leading-tight">{product.name}</p>
                <p className="text-[#adadad] text-sm">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
