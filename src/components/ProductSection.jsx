import React from 'react';

// Aquí puedes importar tus imágenes si las tienes en src/assets
// import producto1Img from '../assets/images/producto1.jpg';
// import producto2Img from '../assets/images/producto2.jpg';
// import producto3Img from '../assets/images/producto3.jpg';

// Define un array de productos para renderizar
// Si usas imágenes de `public/images`, las rutas serían "/images/producto1.jpg"
const products = [
  { id: 1, name: 'Pasteles Artesanales', description: '  Una experiencia indulgente para los verdaderos amantes del cacao', image: '/images/pasteluno.jpeg' },
  { id: 2, name: 'Paquete pastel', description: 'Descubre un mundo de sabores en nuestro paquete especial.', image: '/images/pasteldos.jpeg' },
  { id: 3, name: 'Pasteles Unicos', description: 'Deléitate con nuestro pastel de chocolate oscuro.', image: '/images/pasteltres.jpeg' },
];

function ProductsSection() {
  return (
    <section id="productos" className="py-10 px-4">
      <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-center">
        Productos Destacados
      </h2>

      {/* Ajustes clave para la responsividad y el centrado de 3 productos:

        1.  `grid grid-cols-1`: Por defecto, una columna para móviles.
        2.  `sm:grid-cols-2`: En pantallas pequeñas (`sm`), dos columnas.
        3.  `md:grid-cols-3`: En pantallas medianas (`md`) y grandes, tres columnas.
            Esto es crucial: ¡eliminamos `xl:grid-cols-4` para que nunca intente poner 4 columnas!
        4.  `gap-6 p-4`: Espaciado entre los elementos de la cuadrícula y padding interno.
        5.  `max-w-screen-lg`: Limita el ancho máximo de la cuadrícula.
            Esto evita que los productos se estiren demasiado en monitores muy anchos.
        6.  `mx-auto`: Centra la cuadrícula entera horizontalmente dentro de su contenedor padre.
        7.  `justify-items-center`: Centra el contenido de cada celda de la cuadrícula.
            Esto es útil si tienes 2 productos en una fila de 3 columnas en algún breakpoint,
            el producto se centraría en su celda.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 max-w-screen-lg mx-auto justify-items-center">
        {products.map(product => (
          <div key={product.id} className="flex h-full w-full max-w-sm flex-col gap-4 rounded-lg bg-[#2a2a2a] p-4 shadow-lg text-center items-center">
            {/* Ajustes para el contenido de cada tarjeta de producto:
              - `w-full max-w-sm`: Asegura que la tarjeta ocupe el ancho disponible pero con un máximo.
              - `text-center items-center`: Centra el texto y los elementos dentro de cada tarjeta.
            */}
            <div
              className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl flex flex-col"
              style={{ backgroundImage: `url("${product.image}")` }}
            ></div>
            <div>
              <p className="text-white text-lg font-medium leading-normal mb-1">{product.name}</p>
              <p className="text-[#adadad] text-sm font-normal leading-normal">{product.description}</p>
            </div>
 
          </div>
        ))}
      </div>
    </section>
  );
}


export default ProductsSection;