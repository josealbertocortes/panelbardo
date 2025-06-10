// netlify/functions/ai-suggest-product.cjs
const { GoogleGenerativeAI } = require("@google/generative-ai");
const contentful = require("contentful");

// Credenciales de Contentful para la Netlify Function
const CONTENTFUL_SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.VITE_CONTENTFUL_ACCESS_TOKEN;

// Inicializa el cliente de Contentful
const contentfulClient = contentful.createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// --- Variables de caché ---
let cachedProducts = null;
let cacheTimestamp = 0;
const CACHE_LIFETIME = 3 * 24 * 3600 * 1000; // 3 días en milisegundos

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const { userAntojo } = JSON.parse(event.body);

        // 1. Obtener los productos de Contentful (con caché)
        let products;
        const currentTime = Date.now();

        if (cachedProducts && (currentTime - cacheTimestamp < CACHE_LIFETIME)) {
            console.log('Usando catálogo desde caché.');
            products = cachedProducts;
        } else {
            console.log('Catálogo no en caché o expirado, obteniendo de Contentful...');
            const contentfulResponse = await contentfulClient.getEntries({
              content_type: 'product',
              select: 'fields.title,fields.descripcion',
              limit: 100 // Limita para evitar payloads muy grandes, ajusta según tu catálogo
            });

            products = contentfulResponse.items.map(item => ({
              title: item.fields.title,
              description: item.fields.descripcion,
            }));

            // Almacenar en caché
            cachedProducts = products;
            cacheTimestamp = currentTime;
            console.log('Catálogo almacenado en caché.');
        }

        // Si no se encontraron productos (incluso después de intentar recargar)
        if (!products || products.length === 0) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'No se pudieron cargar productos del catálogo.' }),
            };
        }

        // Construir la lista de productos para el prompt
        let productsListForPrompt = products.map(p => `- Nombre: ${p.title}, Descripción: ${p.description}`).join('\n');

        // 2. Construir el prompt para la IA
        let prompt = `Eres un experto en panadería y pastelería. Un cliente ha descrito su antojo. Basándote en este antojo y en la lista de nuestros productos disponibles, sugiere el producto más adecuado de nuestra lista.

        Nuestros productos son los siguientes:
        ${productsListForPrompt}

        Antojo del cliente: "${userAntojo}"

        Responde SOLAMENTE con el nombre exacto del producto sugerido de la lista. Si no estás seguro o no hay una coincidencia clara, responde 'N/A'.`;

        // 3. Llamada a la API de IA (asegúrate de que este sea el modelo deseado y disponible)
        // Por ejemplo: "gemini-pro" (alias para la versión pro), "models/gemini-1.0-pro" (nombre explícito), o "gemini-1.5-flash"
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Cambia esto al modelo deseado

        const result = await model.generateContent(prompt);
        // IMPORTANTE: Acceder al texto de la respuesta correctamente
        const responseText = result.response.candidates[0].content.parts[0].text;

        let suggestedProductName = responseText.trim();
        suggestedProductName = suggestedProductName.split('\n')[0].replace(/[^a-zA-Z0-9\sÁÉÍÓÚáéíóúüÜñÑ]/g, '').trim();

        return {
            statusCode: 200,
            body: JSON.stringify({ suggestedProductName: suggestedProductName }),
        };

    } catch (error) {
        console.error("Error calling AI function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al obtener sugerencia de IA', error: error.message }),
        };
    }
};