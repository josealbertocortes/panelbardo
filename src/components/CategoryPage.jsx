// src/components/CategoryPage.jsx (o src/pages/CategoryPage.jsx)
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

const WHATSAPP_NUMBER = '5215528508289'; // ¡Asegúrate de que este número esté correcto!

function CategoryPage() {
  const { categoryName } = useParams();
  const [productsInCategory, setProductsInCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=product&fields.categoria[match]=${categoryName}`;

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
            name: item.fields.title,
            description: item.fields.descripcion,
            price: item.fields.precio,
            category: item.fields.categoria,
            image: imageAsset ? imageAsset.fields.file.url : '/images/placeholder.jpeg',
          };
        });

        setProductsInCategory(fetchedProducts);

      } catch (e) {
        console.error("Error al cargar productos de la categoría desde Contentful:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  if (loading) return <div className="text-white text-center py-20">Cargando productos de {categoryName}...</div>;
  if (error) return <div className="text-red-500 text-center py-20">Error al cargar productos: {error.message}. Asegúrate de que la categoría exista en Contentful y que tus credenciales son correctas.</div>;

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#1a1a1a] dark group/design-root overflow-x-hidden"
         style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      {/* HEADER AJUSTADO PARA RESPONSIVIDAD */}
      <div className="layout-container flex h-full grow flex-col px-4 sm:px-8 md:px-20 lg:px-40 py-10">
        <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-8">
          Productos de la categoría: {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
        </h2>

        {/* CONTENEDOR DE LA CUADRÍCULA DE PRODUCTOS - AJUSTADO PARA RESPONSIVIDAD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 max-w-screen-xl mx-auto justify-items-center w-full">
          {productsInCategory.length > 0 ? (
            productsInCategory.map((product) => (
              <div key={product.id} className="flex h-full w-full max-w-xs sm:max-w-sm flex-col gap-4 rounded-lg bg-[#2a2a2a] p-4 shadow-lg text-center items-center">
                <div
                  className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl flex flex-col"
                  style={{ backgroundImage: `url("https:${product.image}")` }}
                ></div>
                <div>
                  <p className="text-white text-lg font-medium leading-normal mb-1">{product.name}</p>
                  <p className="text-[#adadad] text-sm font-normal leading-normal">{product.description}</p>
                  {/* <p className="text-white text-md font-bold mt-2">${product.price ? product.price.toFixed(2) : 'N/A'}</p> */}
                </div>
                
                {/* Botón "Pedir" para cada producto */}
                <div className="flex justify-center mt-auto w-full">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, quisiera pedir el producto: ${product.name} (Categoría: ${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-green-500 hover:bg-green-600 text-white text-sm font-bold leading-normal tracking-[0.015em] transition duration-300 w-full"
                  >
                    <span className="truncate">Pedir {product.name}</span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center text-lg col-span-full">
              No se encontraron productos en esta categoría.
            </p>
          )}
        </div>

        {/* Botón para volver a la página principal o a la sección de productos */}
        <div className="flex px-4 py-3 justify-center mt-10 w-full max-w-md mx-auto"> {/* Ajustado para centrar y limitar ancho */}
          <Link
            to="/#productos"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-black text-white text-sm font-bold leading-normal tracking-[0.015em] w-full"
          >
            <span className="truncate">Volver a todos los productos</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;