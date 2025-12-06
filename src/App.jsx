// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import HeaderStatus from "./components/HeaderStatus";

// Lazy load de páginas para reducir bundle inicial
const Home = lazy(() => import('./pages/Home'));
const MenuPage = lazy(() => import('./pages/MenuPage'));
const About = lazy(() => import('./pages/About'));
const PromotionsPage = lazy(() => import('./pages/PromotionsPage'));
const CartSidebar = lazy(() => import('./components/CartSidebar'));

// Loading fallback simple y ligero
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-sakana-beige">
    <div className="text-sakana-red text-xl font-bold animate-pulse">Cargando...</div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-sakana-beige font-sans selection:bg-sakana-red selection:text-white">
      <HeaderStatus />
      <Navbar />
      <Suspense fallback={null}>
        <CartSidebar />
      </Suspense>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/promociones" element={<PromotionsPage />} />
        </Routes>
      </Suspense>

      <footer className="bg-sakana-dark text-white py-12 border-t-4 border-sakana-red text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-serif font-bold mb-4">Sakana<span className="text-sakana-red">Delight</span></h2>
          <p className="opacity-60">© 2025 - El mejor sushi de la ciudad.</p>
        </div>
      </footer>
    </div>
  )
}

export default App;
