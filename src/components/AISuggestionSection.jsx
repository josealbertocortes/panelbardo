// src/components/AISuggestionSection.jsx
import React, { useState } from 'react'; // Mantener useState para el estado
import { client } from '../contentfulClient'; // Importa el cliente de Contentful
import Button from './Button'; // Reutilizamos el componente Button

const WHATSAPP_NUMBER = '5215528508289';

function AISuggestionSection() {
  const [suggestedProduct, setSuggestedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preferences, setPreferences] = useState({
    dulce: false,
    salado: false,
    frutal: false,
    chocolate: false,
    cafe: false,
  });
  const [showPreferences, setShowPreferences] = useState(false);

  // Función para buscar un producto por su nombre en Contentful
  const findProductByName = async (productName) => {
    try {
      const response = await client.getEntries({
        content_type: 'product',
        'fields.title[match]': productName, // O 'fields.nombre[match]' si tu campo es 'nombre'
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
    setLoading(true);
    setError(null);
    setSuggestedProduct(null);

    try {
      const response = await fetch('https://animated-griffin-34376c.netlify.app/.netlify/functions/ai-suggest-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferences }),
      });
      console.log("Response from AI function:", response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la sugerencia de IA');
      }

      const data = await response.json();
      const suggestedProductName = data.suggestedProductName;

      if (suggestedProductName && suggestedProductName !== 'N/A') {
        // Buscar el producto en Contentful basado en la sugerencia de la IA
        const product = await findProductByName(suggestedProductName);
        if (product) {
          setSuggestedProduct(product);
        } else {
          setError(new Error(`No se encontró un producto en Contentful con el nombre: "${suggestedProductName}".`));
          // Opcional: Podrías buscar por categoría si la IA sugiere una categoría
        }
      } else {
        setSuggestedProduct(null); // La IA no pudo sugerir nada o sugirió 'N/A'
        setError(new Error('La IA no pudo generar una sugerencia de producto válida. Intenta con diferentes preferencias.'));
      }

    } catch (e) {
      console.error("Error generating AI suggestion:", e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setPreferences(prev => ({ ...prev, [name]: checked }));
  };

  const getWhatsAppOrderLink = () => {
    if (!suggestedProduct) return '#';
    const message = `Hola, quisiera pedir su sugerencia de IA: "${suggestedProduct.name}" (${suggestedProduct.category ? `Categoría: ${suggestedProduct.category.charAt(0).toUpperCase() + suggestedProduct.category.slice(1)}` : 'Producto Sugerido'}).`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="ai-suggestion" className="py-10 px-4 bg-[#1a1a1a]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-6">
          ¿No sabes qué pedir? ¡La IA te ayuda!
        </h2>
        <p className="text-[#adadad] text-base md:text-lg font-normal leading-relaxed mb-8">
          Cuéntanos un poco de tus gustos y te daremos una deliciosa sugerencia.
        </p>

        <div className="mb-8 flex justify-center">
          <Button
            onClick={() => setShowPreferences(!showPreferences)}
            className="bg-gray-700 hover:bg-gray-600 text-white max-w-xs" // Añadir max-w-xs
          >
            {showPreferences ? 'Ocultar Preferencias' : 'Ajustar Preferencias'}
          </Button>
        </div>

        {showPreferences && (
          <div className="bg-[#2a2a2a] p-6 rounded-lg shadow-lg mb-8 transition-all duration-300 ease-in-out">
            <h3 className="text-white text-xl font-semibold mb-4">Mis gustos son...</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {Object.keys(preferences).map(key => (
                <label key={key} className="flex items-center text-white cursor-pointer">
                  <input
                    type="checkbox"
                    name={key}
                    checked={preferences[key]}
                    onChange={handlePreferenceChange}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-base">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </label>
              ))}
            </div>
            <div className="flex justify-center">
                <Button
                    onClick={generateAISuggestion}
                    className="bg-purple-600 hover:bg-purple-700 text-white max-w-xs" // Añadir max-w-xs
                    disabled={loading}
                >
                    {loading ? 'La IA está pensando...' : '¡Dame una sugerencia de IA!'}
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
                <Button
                  onClick={getWhatsAppOrderLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <span className="truncate">Pedir {suggestedProduct.name}</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="text-red-500 mt-4">Error: {error.message}</p>
        )}
        {!suggestedProduct && !loading && !error && showPreferences && (
          <p className="text-[#adadad] mt-4">
            Ajusta tus preferencias y haz clic en "¡Dame una sugerencia de IA!" para encontrar tu próximo favorito.
          </p>
        )}
        {!suggestedProduct && !loading && !error && !showPreferences && (
          <p className="text-[#adadad] mt-4">
            Haz clic en "Ajustar Preferencias" para comenzar a recibir sugerencias de nuestra IA.
          </p>
        )}
      </div>
    </section>
  );
}

export default AISuggestionSection;