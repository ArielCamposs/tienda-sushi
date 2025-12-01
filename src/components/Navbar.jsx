// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext'; // <--- 1. Importar el hook

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // <--- 2. AQUÍ ESTABA EL ERROR. Debes extraer cartCount del hook.
    const { setIsCartOpen, cartCount } = useCart();

    const isHomePage = location.pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navbarClasses = !isHomePage || isScrolled
        ? 'bg-sakana-dark/95 backdrop-blur-md shadow-lg py-3 border-b border-white/10'
        : 'bg-gradient-to-b from-black/80 to-transparent py-6';

    const navLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'Menú', path: '/menu' },
        { name: 'Nosotros', path: '/nosotros' },
        { name: 'Contacto', path: '/contacto' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarClasses}`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-xl transition-colors ${!isHomePage || isScrolled ? 'bg-sakana-red text-white' : 'bg-white text-sakana-red'
                            }`}>
                            S
                        </div>
                        <span className={`text-2xl font-serif font-bold tracking-tight ${!isHomePage || isScrolled ? 'text-white' : 'text-white drop-shadow-md'
                            }`}>
                            Sakana<span className="text-sakana-red">Delight</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`font-medium text-base tracking-wide transition-colors relative group ${!isHomePage || isScrolled ? 'text-gray-300 hover:text-sakana-red' : 'text-white hover:text-sakana-red drop-shadow-sm'
                                    }`}
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sakana-red transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Botón Carrito - Visible en móvil y desktop */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className={`relative p-2 rounded-full transition-colors group ${!isHomePage || isScrolled ? 'hover:bg-white/10 text-white' : 'hover:bg-white/20 text-white'
                                }`}>
                            <ShoppingBag className="w-6 h-6 group-hover:text-sakana-red transition-colors" />

                            {/* Badge del contador */}
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 w-4 h-4 bg-sakana-red text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-sakana-dark animate-bounce">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden text-white p-2 hover:bg-white/20 rounded-full transition"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 bg-sakana-dark z-40 md:hidden flex flex-col items-center justify-center gap-8"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-3xl font-serif font-bold text-white hover:text-sakana-red transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
