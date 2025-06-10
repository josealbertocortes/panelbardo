// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'; // Asegúrate de instalarlo si aún no lo tienes

// Importa tus componentes de sección
import HeroSection from './components/HeroSection';
import ProductsSection from './components/ProductSection';
import AISuggestionSection from './components/AISuggestionSection'; // <-- Nuevo import
import AboutUs from './components/AboutUs';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import GraciasPage from './components/GraciasPage';
import CategoryPage from './components/CategoryPage';

// Define un componente de Layout para el header y footer (opcional pero bueno para mantener el layout)
function MainLayout({ children }) {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#1a1a1a] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif', scrollBehavior: 'smooth' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header - Actualizado para usar <Link> y HashLink */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#363636] px-5 sm:px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="size-4">
              <img
                src="/images/logo.webp"
                alt="Logo de Pan El Bardo"
                className="h-auto w-12"
              />
            </div>
            <Link to="/" className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Pan El Bardo</Link>
          </div>
          <nav className="hidden md:flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <HashLink smooth to="/#inicio" className="text-white text-sm font-medium leading-normal">Inicio</HashLink>
              <HashLink smooth to="/#productos" className="text-white text-sm font-medium leading-normal">Productos</HashLink>
              {/* <HashLink smooth to="/#ai-suggestion" className="text-white text-sm font-medium leading-normal">Sugerencia IA</HashLink>  */}
              <HashLink smooth to="/#aboutus" className="text-white text-sm font-medium leading-normal">Sobre Nosotros</HashLink>
              <HashLink smooth to="/#talkus" className="text-white text-sm font-medium leading-normal">Contacto</HashLink>
            </div>
          </nav>
        </header>

        {/* Contenido de la página (children serán tus rutas) */}
        {/* Aquí los px-40 se vuelven problematicos, mejor que cada componente maneje su padding lateral */}
        <div className="flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                {children}
            </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

// Componente para la página de inicio que combina todas las secciones
function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductsSection />
      <AISuggestionSection />  
      <AboutUs />
      <ContactForm />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        {/* Mantengo las rutas individuales por si acaso, pero ya no se acceden desde el header principal si usas HashLink */}
        <Route path="/productos" element={<MainLayout><ProductsSection /></MainLayout>} />
        <Route path="/sobre-nosotros" element={<MainLayout><AboutUs /></MainLayout>} />
        <Route path="/contacto" element={<MainLayout><ContactForm /></MainLayout>} />
        <Route path="/gracias" element={<MainLayout><GraciasPage /></MainLayout>} />
        <Route path="/productos/:categoryName" element={<MainLayout><CategoryPage /></MainLayout>} /> {/* <-- Envuelta en MainLayout */}
        {/* Puedes añadir una ruta 404 si lo deseas */}
        {/* <Route path="*" element={<MainLayout><div>404 Not Found</div></MainLayout>} /> */}
      </Routes>
    </Router>
  );
}

export default App;