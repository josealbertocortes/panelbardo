// src/components/ProductsSection.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

function ProductsSection() {
  const [productsToShow, setProductsToShow] = useState([]); // Cambiamos el nombre para claridad
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=product`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const fetchedProducts = data.items.map(item => {
          const imageAsset = data.includes.Asset && data.includes.Asset.find(
            asset => asset.sys.id === item.fields.imagen.sys.id
          );

          return {
            id: item.sys.id,
            name: item.fields.nombre,
            description: item.fields.descripcion,
            price: item.fields.precio,
            category: item.fields.categoria[0],
            image: imageAsset ? imageAsset.fields.file.url : '/images/placeholder.jpeg',
          };
        });

        // --- Lógica nueva para mostrar una de cada categoría ---
        const uniqueCategoryProducts = [];
        const seenCategories = new Set(); // Usamos un Set para llevar un registro de categorías ya vistas

        for (const product of fetchedProducts) {
          const categoryLower = product.category; // Normalizar a minúsculas
          if (!seenCategories.has(categoryLower)) {
            uniqueCategoryProducts.push(product);
            seenCategories.add(categoryLower);
          }
        }
        // --- Fin de la lógica nueva ---

        setProductsToShow(uniqueCategoryProducts); // Actualizamos el estado con los productos filtrados

      } catch (e) {
        console.error("Error al cargar y filtrar productos desde Contentful:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterProducts();
  }, []); // Se ejecuta solo una vez al montar

  if (loading) return <div className="text-white text-center py-20">Cargando categorías...</div>;
  if (error) return <div className="text-red-500 text-center py-20">Error al cargar categorías: {error.message}. Por favor, revisa tus credenciales de Contentful y el ID del modelo.</div>;

  return (
    <section id="productos" className="py-10 px-4">
      <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-center">
        Explora Nuestros Productos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 max-w-screen-lg mx-auto justify-items-center">
        {productsToShow.length > 0 ? ( // Asegurarse de que haya productos para mostrar
          productsToShow.map(product => (
            <div key={product.id} className="flex h-full w-full max-w-sm flex-col gap-4 rounded-lg bg-[#2a2a2a] p-4 shadow-lg text-center items-center">
              <div
                className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl flex flex-col"
                style={{ backgroundImage: `url("https:${product.image}")` }}
              ></div>
              <div>
                {/* Mostramos el nombre de la categoría en lugar del nombre del producto principal */}
                <p className="text-white text-lg font-medium leading-normal mb-1"> {product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                {/* Puedes poner una descripción general de la categoría aquí, o una frase motivadora */}
                <p className="text-[#adadad] text-sm font-normal leading-normal">Descubre la variedad de  {product.category}</p>
              </div>
              
              <div className="flex justify-center mt-auto w-full">
                <Link
                  to={`/productos/${product.category}`}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold leading-normal tracking-[0.015em] transition duration-300 w-full"
                >
                  <span className="truncate">Ver todos los {product.category}</span>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center text-lg col-span-full">No hay categorías disponibles.</p>
        )}
      </div>
    </section>
  );
}

export default ProductsSection;