// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import About from './pages/About';
import CartSidebar from './components/CartSidebar';
import ScrollToTop from './components/ScrollToTop';
import HeaderStatus from "./components/HeaderStatus";
import PromotionsPage from "./pages/PromotionsPage";

function App() {
  return (
    <div className="min-h-screen bg-sakana-beige font-sans selection:bg-sakana-red selection:text-white">
      <HeaderStatus />
      <Navbar />
      <CartSidebar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/promociones" element={<PromotionsPage />} />
      </Routes>

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
