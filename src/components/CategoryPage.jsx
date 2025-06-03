// src/components/CategoryPage.jsx (o src/pages/CategoryPage.jsx)
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Reutiliza los mismos datos de productos aquí, o impórtalos de donde los tengas definidos
const allProducts = [
  { id: 1, name: 'Pasteles Artesanales', description: 'Una experiencia indulgente para los verdaderos amantes del cacao', image: '/images/pasteluno.jpeg', category: 'pasteles', price: 25.00 },
  { id: 2, name: 'Paquete pastel', description: 'Descubre un mundo de sabores en nuestro paquete especial.', image: '/images/pasteldos.jpeg', category: 'galletas', price: 40.00 },
  { id: 3, name: 'Pasteles Unicos', description: 'Deléitate con nuestro pastel de chocolate oscuro.', image: '/images/pasteltres.jpeg', category: 'tartas', price: 30.00 },
  { id: 4, name: 'Tarta de Frutas', description: 'Fresca y deliciosa tarta con frutas de temporada.', image: '/images/pastelcuatro.jpeg', category: 'tartas', price: 20.00 },
  { id: 5, name: 'Brownie Especial', description: 'El brownie más chocolatero que hayas probado.', image: '/images/pastelcinco.jpeg', category: 'pasteles', price: 15.00 },
];

// TU NÚMERO DE TELÉFONO DE WHATSAPP AQUÍ (formato internacional, sin +, sin 00)
const WHATSAPP_NUMBER = '5215528508289'; // Ejemplo: para México (52) y un número de celular (1) y el resto del número.

function CategoryPage() {
  const { categoryName } = useParams();
  const [productsInCategory, setProductsInCategory] = useState([]);

  useEffect(() => {
    const filtered = allProducts.filter(
      (product) => product.category.toLowerCase() === categoryName.toLowerCase()
    );
    setProductsInCategory(filtered);
  }, [categoryName]);

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#1a1a1a] dark group/design-root overflow-x-hidden"
         style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col px-40 py-10">
        <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-8">
         {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 max-w-screen-lg mx-auto justify-items-center">
          {productsInCategory.length > 0 ? (
            productsInCategory.map((product) => (
              <div key={product.id} className="flex h-full w-full max-w-sm flex-col gap-4 rounded-lg bg-[#2a2a2a] p-4 shadow-lg text-center items-center">
                <div
                  className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl flex flex-col"
                  style={{ backgroundImage: `url("${product.image}")` }}
                ></div>
                <div>
                  <p className="text-white text-lg font-medium leading-normal mb-1">{product.name}</p>
                  <p className="text-[#adadad] text-sm font-normal leading-normal">{product.description}</p>
                  {/* <p className="text-white text-md font-bold mt-2">${product.price.toFixed(2)}</p>  */}
                </div>
                
                {/* Botón "Pedir" para cada producto */}
                <div className="flex justify-center mt-auto w-full"> {/* mt-auto para empujar el botón hacia abajo */}
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, quisiera pedir el producto: ${product.name} (Categoría: ${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-green-500 hover:bg-green-600 text-white text-sm font-bold leading-normal tracking-[0.015em] transition duration-300 w-full"
                  >
                    <span className="truncate">Pedir {product.name}</span>
                  </a>
                </div>
                {/* FIN del Botón "Pedir" */}

              </div>
            ))
          ) : (
            <p className="text-white text-center text-lg col-span-full">
              No se encontraron productos en esta categoría.
            </p>
          )}
        </div>

        {/* Botón para volver a la página principal o a la sección de productos */}
        <div className="flex px-4 py-3 justify-center mt-10">
          <Link
            to="/#productos"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-black text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Volver a todos los productos</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;