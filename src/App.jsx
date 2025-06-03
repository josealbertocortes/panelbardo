import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importa tus componentes de sección
import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs';
import ContactForm from './components/ContactForm';
import ProductsSection from './components/ProductSection'; // Lo crearemos en el siguiente paso
import Footer from './components/Footer'; // Lo crearemos en el siguiente paso
import GraciasPage from './components/GraciasPage'; // Tu componente de página de gracias
import CategoryPage from './components/CategoryPage';

// Define un componente de Layout para el header y footer (opcional pero bueno para mantener el layout)
function MainLayout({ children }) {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#1a1a1a] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif', scrollBehavior: 'smooth' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header - Actualizado para usar <Link> */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#363636] px-5 sm:px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="size-4">
            <img
                src="/images/logo.webp" // Asegúrate de que esta ruta sea correcta y con la extensión .webp
                alt="Logo de Pan El Bardo"
                className="h-auto w-12" // Ajusta el tamaño según necesites (h-8, h-10, h-12)
              />
            </div>
            <Link to="/" className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Pan El Bardo</Link>
          </div>
          <nav className="hidden md:flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <Link to="/" className="text-white text-sm font-medium leading-normal">Inicio</Link>
              <Link to="/productos" className="text-white text-sm font-medium leading-normal">Productos</Link>
              <Link to="/sobre-nosotros" className="text-white text-sm font-medium leading-normal">Sobre Nosotros</Link>
              <Link to="/contacto" className="text-white text-sm font-medium leading-normal">Contacto</Link>
            </div>
          </nav>
        </header>

        {/* Contenido de la página (children serán tus rutas) */}
        <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                {children} {/* Aquí se renderizarán los componentes de tus rutas */}
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
        <Route path="/productos" element={<MainLayout><ProductsSection /></MainLayout>} />
        <Route path="/sobre-nosotros" element={<MainLayout><AboutUs /></MainLayout>} />
        <Route path="/contacto" element={<MainLayout><ContactForm /></MainLayout>} />
        <Route path="/gracias" element={<MainLayout><GraciasPage /></MainLayout>} /> {/* Ruta para la página de gracias */}
        <Route path="/productos/:categoryName" element={<CategoryPage />} />
        {/* Puedes añadir una ruta 404 si lo deseas */}
        {/* <Route path="*" element={<MainLayout><div>404 Not Found</div></MainLayout>} /> */}
      </Routes>
    </Router>
  );
}

export default App;