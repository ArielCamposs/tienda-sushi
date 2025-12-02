// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

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
        ? 'bg-sakana-dark/95 backdrop-blur-xl shadow-2xl py-3 border-b border-sakana-red/20'
        : 'bg-gradient-to-b from-black/90 via-black/70 to-transparent backdrop-blur-sm py-6';

    const navLinks = [
        { name: 'Inicio', path: '/', icon: '🏠' },
        { name: 'Menú', path: '/menu', icon: '🍱' },
        { name: 'Nosotros', path: '/nosotros', icon: '👥' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-7 left-0 right-0 z-50 transition-all duration-300 ${navbarClasses}`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">

                    {/* Logo Mejorado */}
                    <Link to="/" className="flex items-center gap-3 group relative">
                        {/* Icono del Logo con Gradiente */}
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-serif font-bold text-xl shadow-lg relative overflow-hidden ${!isHomePage || isScrolled
                                ? 'bg-gradient-to-br from-sakana-red to-red-700 text-white'
                                : 'bg-gradient-to-br from-white to-gray-100 text-sakana-red'
                                }`}
                        >
                            <span className="relative z-10">S</span>
                            {/* Brillo animado */}
                            <motion.div
                                animate={{
                                    x: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            />
                        </motion.div>

                        {/* Texto del Logo */}
                        <div className="flex flex-col">
                            <span className={`text-2xl font-serif font-bold tracking-tight leading-none ${!isHomePage || isScrolled ? 'text-white' : 'text-white drop-shadow-lg'
                                }`}>
                                Sakana<span className="text-sakana-red">Delight</span>
                            </span>
                            <span className="text-[10px] text-sakana-gold font-medium tracking-widest">
                                PREMIUM SUSHI
                            </span>
                        </div>

                        {/* Efecto de brillo en hover */}
                        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-sakana-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>

                    {/* Desktop Menu Mejorado */}
                    <div className="hidden md:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <motion.div
                                key={link.name}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to={link.path}
                                    className={`px-4 py-2 rounded-lg font-medium text-base tracking-wide transition-all duration-300 relative group flex items-center gap-2 ${location.pathname === link.path
                                        ? 'bg-sakana-red/20 text-sakana-red shadow-lg shadow-sakana-red/20'
                                        : !isHomePage || isScrolled
                                            ? 'text-gray-300 hover:text-white hover:bg-white/10'
                                            : 'text-white hover:text-sakana-red hover:bg-white/10 drop-shadow-sm'
                                        }`}
                                >
                                    <span className="text-sm">{link.icon}</span>
                                    {link.name}
                                    {/* Underline animado */}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sakana-red transition-all group-hover:w-full"></span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex items-center gap-3">
                        {/* Botón Carrito Mejorado */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsCartOpen(true)}
                            className={`relative p-3 rounded-full transition-all duration-300 ${!isHomePage || isScrolled
                                ? 'bg-sakana-red/20 hover:bg-sakana-red text-white shadow-lg shadow-sakana-red/30'
                                : 'bg-white/20 hover:bg-sakana-red text-white backdrop-blur-sm'
                                }`}
                        >
                            <ShoppingBag className="w-5 h-5" />

                            {/* Badge del contador mejorado */}
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-sakana-red to-red-700 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-lg"
                                >
                                    {cartCount}
                                    {/* Pulso animado */}
                                    <span className="absolute inset-0 rounded-full bg-sakana-red animate-ping opacity-75"></span>
                                </motion.span>
                            )}
                        </motion.button>

                        {/* Mobile Toggle Mejorado */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="md:hidden text-white p-3 bg-white/10 hover:bg-sakana-red rounded-full transition-all backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay Mejorado */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-gradient-to-br from-sakana-dark via-sakana-dark to-black z-40 md:hidden flex flex-col items-center justify-center gap-6 backdrop-blur-xl"
                    >
                        {/* Elementos decorativos */}
                        <div className="absolute top-20 right-10 w-40 h-40 bg-sakana-red/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-20 left-10 w-60 h-60 bg-sakana-gold/10 rounded-full blur-3xl"></div>

                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-4xl font-serif font-bold text-white hover:text-sakana-red transition-all flex items-center gap-3 relative group"
                                >
                                    <span className="text-2xl">{link.icon}</span>
                                    {link.name}
                                    <motion.span
                                        className="absolute -bottom-2 left-0 w-0 h-1 bg-sakana-red group-hover:w-full transition-all"
                                    />
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
