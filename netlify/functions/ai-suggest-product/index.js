// netlify/functions/ai-suggest-product.cjs
const { GoogleGenerativeAI } = require("@google/generative-ai");
const contentful = require("contentful"); // Importa el SDK de Contentful para Node.js

// Credenciales de Contentful para la Netlify Function
// Asegúrate de que estas variables de entorno estén configuradas en Netlify
const CONTENTFUL_SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID; // Usamos el mismo nombre que en Vite
const CONTENTFUL_ACCESS_TOKEN = process.env.VITE_CONTENTFUL_ACCESS_TOKEN; // Usamos el mismo nombre

// Inicializa el cliente de Contentful en la función
const contentfulClient = contentful.createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const { userAntojo } = JSON.parse(event.body);

        // 1. Obtener los productos de Contentful para dárselos a la IA
        const contentfulResponse = await contentfulClient.getEntries({
          content_type: 'product',
          select: 'fields.title,fields.descripcion', // Solo necesitamos título y descripción
          limit: 100 // Limita para evitar payloads muy grandes, ajusta según tu catálogo
        });

        const products = contentfulResponse.items.map(item => ({
          title: item.fields.title,
          description: item.fields.descripcion,
        }));

        // Construir la lista de productos para el prompt
        let productsListForPrompt = products.map(p => `- Nombre: ${p.title}, Descripción: ${p.description}`).join('\n');

        // 2. Construir el prompt para la IA
        let prompt = `Eres un experto en panadería y pastelería. Un cliente ha descrito su antojo. Basándote en este antojo y en la lista de nuestros productos disponibles, sugiere el producto más adecuado de nuestra lista.

        Nuestros productos son los siguientes:
        ${productsListForPrompt}

        Antojo del cliente: "${userAntojo}"

        Responde SOLAMENTE con el nombre exacto del producto sugerido de la lista. Si no estás seguro o no hay una coincidencia clara, responde 'N/A'.`;

        // 3. Llamada a la API de IA (usando el modelo "Pro")
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // O "models/gemini-1.0-pro" si esa es la que funciona para ti
        const result = await model.generateContent(prompt);
        const response = await result.response;
   

        // 4. Limpiar la sugerencia para obtener solo el nombre del producto
        // Intentar limpiar la sugerencia para que sea solo el nombre.
        // Esto es crucial y puede requerir ajuste basado en el comportamiento de tu IA.
        // Un patrón común es esperar el nombre exacto, o intentar extraerlo.
        // Aquí intentamos limpiar cualquier cosa que no sea el nombre del producto
        // y tomamos la primera línea.
        //suggestionText = suggestionText.split('\n')[0].replace(/[^a-zA-Z0-9\sÁÉÍÓÚáéíóúüÜñÑ]/g, '').trim();

        // Puedes añadir una comprobación extra aquí si quieres asegurarte de que la sugerencia
        // de la IA sea uno de los productos de tu lista.
        // const isProductValid = products.some(p => p.title.toLowerCase() === suggestionText.toLowerCase());
        // if (!isProductValid && suggestionText !== 'N/A') {
        //     suggestionText = 'N/A'; // Forzar a N/A si no es un producto conocido
        // }


        return {
            statusCode: 200,
            body: JSON.stringify({ suggestedProductName: response }),
        };

    } catch (error) {
        console.error("Error calling AI function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al obtener sugerencia de IA', error: error.message }),
        };
    }
};