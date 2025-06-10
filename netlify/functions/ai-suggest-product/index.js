// netlify/functions/ai-suggest-product.cjs
const { GoogleGenerativeAI } = require("@google/generative-ai");
const contentful = require("contentful");

const CONTENTFUL_SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.VITE_CONTENTFUL_ACCESS_TOKEN;

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

        const contentfulResponse = await contentfulClient.getEntries({
          content_type: 'product',
          select: 'fields.title,fields.descripcion',
          limit: 100
        });

        const products = contentfulResponse.items.map(item => ({
          title: item.fields.title,
          description: item.fields.descripcion,
        }));

        let productsListForPrompt = products.map(p => `- Nombre: ${p.title}, Descripción: ${p.description}`).join('\n');

        let prompt = `Eres un experto en panadería y pastelería. Un cliente ha descrito su antojo. Basándote en este antojo y en la lista de nuestros productos disponibles, sugiere el producto más adecuado de nuestra lista.

        Nuestros productos son los siguientes:
        ${productsListForPrompt}

        Antojo del cliente: "${userAntojo}"

        Responde SOLAMENTE con el nombre exacto del producto sugerido de la lista. Si no estás seguro o no hay una coincidencia clara, responde 'N/A'.`;

        // AQUÍ ASEGÚRATE DE USAR EL MODELO CORRECTO
        // Si quieres "Pro", usa "gemini-pro" o "models/gemini-1.0-pro".
        // Si quieres "Flash", usa "gemini-flash" o "models/gemini-1.5-flash".
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // <-- CAMBIA ESTO AL MODELO DESEADO ("gemini-pro" para Pro, "gemini-1.5-flash" para Flash, etc.)

        const result = await model.generateContent(prompt);
        // IMPORTANTE: Acceder al texto de la respuesta correctamente
        const responseText = result.response.candidates[0].content.parts[0].text;

        let suggestedProductName = responseText.trim(); // Eliminar el salto de línea final

        // Limpiar la sugerencia de cualquier caracter no deseado (como en soluciones anteriores)
        suggestedProductName = suggestedProductName.split('\n')[0].replace(/[^a-zA-Z0-9\sÁÉÍÓÚáéíóúüÜñÑ]/g, '').trim();

        // DEVOLVEMOS SÓLO EL NOMBRE DEL PRODUCTO
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