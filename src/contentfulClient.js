// src/contentfulClient.js
import { createClient } from 'contentful';

// Accede a las variables de entorno
// Asegúrate de que los nombres de las variables coincidan con lo que pusiste en tu .env
const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID; // Para Vite
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN; // Para Vite

// Si usas Create React App, sería:
// const SPACE_ID = process.env.REACT_APP_CONTENTFUL_SPACE_ID;
// const ACCESS_TOKEN = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;
console.log('SPACE_ID:', SPACE_ID);
console.log('ACCESS_TOKEN:', ACCESS_TOKEN);
// Crea el cliente de Contentful
export const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});