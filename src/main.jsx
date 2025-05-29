import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // This is where your main App component will be
import './index.css'; // For global styles, or Tailwind CSS setup

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);