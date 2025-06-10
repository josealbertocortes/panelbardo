// src/components/AISuggestionSection.jsx
import React, { useState } from 'react';
import { client } from '../contentfulClient';
import Button from './Button';

const WHATSAPP_NUMBER = '5215528508289';

function AISuggestionSection() {
  const [suggestedProduct, setSuggestedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [antojo, setAntojo] = useState(''); // Nuevo estado para el antojo del usuario
  const [showInput, setShowInput] = useState(false); // Para mostrar/ocultar el campo de texto

  // Función para buscar un producto por su nombre en Contentful (igual que antes)
  const findProductByName = async (productName) => {
    try {
      const response = await client.getEntries({
        content_type: 'product',
        'fields.title[match]': productName, // O 'fields.nombre[match]'
        limit: 1 // Solo necesitamos uno
      });

      if (response.items.length > 0) {
        const item = response.items[0];
        const imageAsset = response.includes && response.includes.Asset && response.includes.Asset.find(
          asset => asset.sys.id === item.fields.imagen.sys.id
        );

        return {
          id: item.sys.id,
          name: item.fields.title,
          description: item.fields.descripcion,
          price: item.fields.precio,
          category: item.fields.categoria ? item.fields.categoria[0] : 'general',
          image: imageAsset ? `https:${imageAsset.fields.file.url}` : '/images/placeholder.jpeg',
        };
      }
      return null;
    } catch (e) {
      console.error("Error al buscar producto por nombre en Contentful:", e);
      return null;
    }
  };

  // Lógica para llamar a la Netlify Function para la sugerencia de IA
  const generateAISuggestion = async () => {
    if (!antojo.trim()) { // Validar que el antojo no esté vacío
        setError(new Error('Por favor, escribe tu antojo para que la IA pueda ayudarte.'));
        return;
    }

    setLoading(true);
    setError(null);
    setSuggestedProduct(null);

    try {
      const response = await fetch('/.netlify/functions/ai-suggest-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userAntojo: antojo }), // Enviamos el texto del antojo
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la sugerencia de IA');
      }

      const data = await response.json();
      const suggestedProductName = data.suggestedProductName;

      if (suggestedProductName && suggestedProductName !== 'N/A') {
        const product = await findProductByName(suggestedProductName);
        if (product) {
          setSuggestedProduct(product);
        } else {
          setError(new Error(`No se encontró un producto en el catálogo con el nombre: "${suggestedProductName}". Intenta ser más específico o general en tu antojo.`));
        }
      } else {
        setSuggestedProduct(null);
        setError(new Error('La IA no pudo generar una sugerencia de producto válida para tu antojo. Por favor, intenta de nuevo o describe tu antojo de otra manera.'));
      }

    } catch (e) {
      console.error("Error generating AI suggestion:", e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppOrderLink = () => {
    if (!suggestedProduct) return '#';
    const message = `Hola, quisiera pedir la sugerencia de IA para mi antojo de "${antojo}": "${suggestedProduct.name}" (${suggestedProduct.category ? `Categoría: ${suggestedProduct.category.charAt(0).toUpperCase() + suggestedProduct.category.slice(1)}` : 'Producto Sugerido'}).`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="ai-suggestion" className="py-10 px-4 bg-[#1a1a1a]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-6">
          ¿No sabes qué pedir? ¡Cuéntanos tu antojo!
        </h2>
        <p className="text-[#adadad] text-base md:text-lg font-normal leading-relaxed mb-8">
          Describe lo que se te antoja en este momento y nuestra IA te sugerirá algo delicioso de nuestro menú.
        </p>

        <div className="mb-8">
          <Button
            onClick={() => setShowInput(!showInput)}
            className="bg-gray-700 hover:bg-gray-600 text-white max-w-xs"
          >
            {showInput ? 'Ocultar Campo de Antojo' : 'Quiero una sugerencia'}
          </Button>
        </div>

        {showInput && (
          <div className="bg-[#2a2a2a] p-6 rounded-lg shadow-lg mb-8 transition-all duration-300 ease-in-out">
            <h3 className="text-white text-xl font-semibold mb-4">Describe tu antojo:</h3>
            <label className="flex flex-col mb-6">
                <textarea
                    name="antojo"
                    placeholder="Ej. 'Algo dulce y con chocolate', 'Un pan crujiente para el desayuno', 'Algo para acompañar mi café'"
                    className="rounded-xl text-white border border-[#4d4d4d] bg-neutral-800 min-h-[100px] px-4 py-3 placeholder:text-[#adadad] text-base focus:outline-none focus:ring-0 resize-none"
                    value={antojo}
                    onChange={(e) => setAntojo(e.target.value)}
                    required
                ></textarea>
            </label>

            <div className="flex justify-center">
                <Button
                    onClick={generateAISuggestion}
                    className="bg-purple-600 hover:bg-purple-700 text-white max-w-xs"
                    disabled={loading}
                >
                    {loading ? 'La IA está pensando...' : '¡Dame una sugerencia!'}
                </Button>
            </div>
          </div>
        )}

        {suggestedProduct && (
          <div className="bg-[#2a2a2a] p-6 rounded-lg shadow-lg mt-8 animate-fade-in">
            <h3 className="text-white text-2xl md:text-3xl font-semibold mb-4">
              ¡Nuestra sugerencia para ti es:
            </h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/3">
                <img
                  src={suggestedProduct.image}
                  alt={suggestedProduct.name}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="w-full md:w-2/3 text-center md:text-left">
                <p className="text-white text-xl font-bold leading-normal mb-2">{suggestedProduct.name}</p>
                <p className="text-[#adadad] text-base font-normal leading-relaxed mb-4">
                  {suggestedProduct.description}
                </p>
                <p className="text-white text-lg font-bold mb-4">
                  {suggestedProduct.price ? `$${suggestedProduct.price.toFixed(2)}` : 'Precio no disponible'}
                </p>
                <div className="flex justify-center">
                    <Button
                        onClick={getWhatsAppOrderLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-600 text-white max-w-xs"
                    >
                        <span className="truncate">Pedir {suggestedProduct.name}</span>
                    </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="text-red-500 mt-4">Error: {error.message}</p>
        )}
        {!suggestedProduct && !loading && !error && showInput && (
          <p className="text-[#adadad] mt-4">
            Escribe tu antojo y haz clic en "¡Dame una sugerencia!" para encontrar tu próximo favorito.
          </p>
        )}
        {!suggestedProduct && !loading && !error && !showInput && (
          <p className="text-[#adadad] mt-4">
            Haz clic en "Quiero una sugerencia" para comenzar a describir tu antojo.
          </p>
        )}
      </div>
    </section>
  );
}

export default AISuggestionSection;