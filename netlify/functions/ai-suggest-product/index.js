// netlify/functions/ai-suggest-product.js
const { GoogleGenerativeAI } = require("@google/generative-ai"); // O la librería de tu proveedor de IA (ej., openai)

// Asegúrate de tener tu clave de API de IA configurada como variable de entorno en Netlify
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // O process.env.OPENAI_API_KEY

// Initialize GoogleGenerativeAI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const { preferences } = JSON.parse(event.body);

        // Construir el prompt para la IA
        let prompt = "Basado en las siguientes preferencias para una panadería/pastelería, sugiere un producto de nuestra lista. Responde SOLAMENTE con el nombre del producto sugerido. Si no puedes sugerir nada, responde 'N/A'.\n\n";
        prompt += "Nuestras categorías de productos son: pan-dulce, pasteles, pan-salado, pan-frutal, postres-chocolate, bebidas-cafe.\n\n";
        prompt += "Ejemplos de productos: Concha, Cuernito, Pan de Muerto, Pastel de Chocolate, Empanada de Cajeta, Cafe Latte.\n\n";

        let userPreferences = [];
        if (preferences.dulce) userPreferences.push("dulce");
        if (preferences.salado) userPreferences.push("salado");
        if (preferences.frutal) userPreferences.push("frutal");
        if (preferences.chocolate) userPreferences.push("chocolate");
        if (preferences.cafe) userPreferences.push("café");

        if (userPreferences.length > 0) {
            prompt += `Las preferencias del cliente son: ${userPreferences.join(', ')}.`;
        } else {
            prompt += "El cliente no tiene preferencias específicas, sugiere un producto popular.";
        }

        // Aquí iría la lógica para llamar a la API de IA
        // Ejemplo con Google Gemini API:
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // O el modelo que estés usando
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let suggestionText = response.text.trim();

        // Limpiar la sugerencia para obtener solo el nombre del producto
        // La IA puede añadir texto extra, así que intentamos extraer solo el nombre
        // Esto es crucial y puede requerir ajuste basado en el comportamiento de tu IA.
        suggestionText = suggestionText.split('\n')[0].replace(/[^a-zA-Z0-9\s]/g, '').trim(); // Eliminar caracteres especiales y tomar la primera línea


        return {
            statusCode: 200,
            body: JSON.stringify({ suggestedProductName: suggestionText }),
        };

    } catch (error) {
        console.error("Error calling AI function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al obtener sugerencia de IA', error: error.message }),
        };
    }
};