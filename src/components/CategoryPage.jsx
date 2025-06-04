// src/components/CategoryPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../contentfulClient'; // <--- Importa el cliente de Contentful

// TU NÚMERO DE TELÉFONO DE WHATSAPP AQUÍ (formato internacional, sin +, sin 00)
const WHATSAPP_NUMBER = 'TU_NUMERO_DE_WHATSAPP_AQUI'; // ¡CAMBIA ESTO!

function CategoryPage() {
  const { categoryName } = useParams();
  const [productsInCategory, setProductsInCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        // Filtrar por el campo 'categoria' en Contentful
        const response = await client.getEntries({
          content_type: 'product',
          'fields.categoria[in]': categoryName, // Filtra por el campo 'categoria'
          order: 'sys.createdAt',
        });

        const fetchedProducts = response.items.map(item => ({
          id: item.sys.id,
          name: item.fields.nombre,
          description: item.fields.descripcion,
          image: item.fields.imagen?.fields?.file?.url,
          category: item.fields.categoria,
          price: item.fields.precio,
        }));
        
        setProductsInCategory(fetchedProducts);
      } catch (e) {
        setError(e);
        console.error(`Error al cargar productos de la categoría ${categoryName} desde Contentful:`, e);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]); // Asegúrate de que se ejecute cuando categoryName cambie

  if (loading) return <div className="text-white text-center py-10">Cargando productos de {categoryName}...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Error al cargar productos: {error.message}</div>;

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#1a1a1a] dark group/design-root overflow-x-hidden"
         style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col px-40 py-10">
        <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-8">
          Productos de la categoría: {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
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
                  {/* <p className="text-white text-md font-bold mt-2">${product.price?.toFixed(2)}</p> */}
                </div>
                
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