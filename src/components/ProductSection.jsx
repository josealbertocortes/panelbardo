import React from 'react';

function ProductSection() {
  const products = [
    {
      name: 'Pasteles Artesanales',
      description: 'Deliciosos pasteles hechos a mano con recetas tradicionales.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC13F9OmYIADf4u_EOVdOkw74QqcUvnjkcRYVRAnRosOHrPWQVbk2qo64DkvXuKMvdkRXbH_LkX9-Sjp8iuYO0kgKSVuzYFa9h77HPDWw0IrPkkAUS-srRCI13U974FVHWuxr8zk6Q2l2wvP4ryfpoyChxSD4e48t7E9zUfLOmGfCn3ngaoeCFRK_PN5yucj1iYvYsLzCDlpy6edx-CpzvR-YhgksBhC7rSSZTLe14-frodaWWzhZErYd73fmoPaJ5818Y0POKGKdo',
    },
    {
      name: 'Tartas Caseras',
      description: 'Tartas frescas con frutas de temporada y rellenos cremosos.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVwax8GxLZP6Ab2fE2uT6v80tt7oInYd4aHt2dC0RRPnZyB9wBv8PWLqZpjlDtkuGrlG6mzloC7bO6J89vCnbNLamyeeJlCTLdOrUG9CTCLonr-XPO8-tO05iB4xu62Cy5GGoRf90n63BmP1jvQKVOC1P7t3pZP5NnjAwTwI9DVYITHL7pEqvlR0BIeDqGkdyEv4LOHeDXsc9uVzUwPDOEPOWOgOrAAkTI_S765Jr6uRa6yWJKrf8KIgOXAOfFFYHFnafsr3G0tuw',
    },
    {
      name: 'Galletas y Dulces',
      description: 'Variedad de galletas y dulces para todos los gustos.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxdEjEG7wU4l6FQKN5eN7LBJsCO87sxUNtjHClXo59eOKOiJLHKBLDtXezd7FJgwhyLOFhMjEWsMdJGdjjKJRZLx6zvuQPEeuEP8VapuX8SYzC0sHwwyA525HD7YgGFLHRvwXDFeLUtWSQmu-n1vrrTSExCYmONNb0QdlaHmgm0H9XcgojsxIOJ69eF3TGykTKkhir0nuSNy3D1EylgqBg7Tx7oK5246xTpovaHweEC3QZSaokO4-0oX8YkuepGvWe_-Xlo6Rrsac',
    },
  ];

  return (
    <section id="productos">
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Productos Destacados</h2>
      <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-stretch p-4 gap-3">
          {products.map((product, index) => (
            <div key={index} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
              <div
                className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl flex flex-col"
                style={{ backgroundImage: `url("${product.image}")` }}
              ></div>
              <div>
                <p className="text-white text-base font-medium leading-normal">{product.name}</p>
                <p className="text-[#adadad] text-sm font-normal leading-normal">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductSection;