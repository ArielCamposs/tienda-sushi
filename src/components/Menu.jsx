// src/components/Menu.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext'; // Importamos el hook del carrito

// Datos de Ejemplo (Idealmente esto vendría de una API o archivo JSON separado)
const PRODUCTS = [
    // ROLLS
    { id: 1, name: "Dragon Roll", price: 12900, category: "Rolls", desc: "Camarón furay, palta, envuelto en anguila y salsa unagi.", img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, name: "California Sake", price: 8900, category: "Rolls", desc: "Salmón, palta, envuelto en sésamo tostado.", img: "https://images.unsplash.com/photo-1617196034438-61e8c128373e?q=80&w=2070&auto=format&fit=crop" },
    { id: 3, name: "Tori Roll", price: 9500, category: "Rolls", desc: "Pollo teriyaki, queso crema, cebollín frito.", img: "https://images.unsplash.com/photo-1558985250-27a406d64cb3?q=80&w=2070&auto=format&fit=crop" },
    { id: 4, name: "Avocado Special", price: 10500, category: "Rolls", desc: "Salmón, queso crema, envuelto en palta premium.", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop" },

    // NIGIRIS
    { id: 5, name: "Sake Nigiri", price: 4500, category: "Nigiris", desc: "Bolita de arroz cubierta con salmón fresco (2 un).", img: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=2064&auto=format&fit=crop" },
    { id: 6, name: "Ebi Nigiri", price: 4200, category: "Nigiris", desc: "Bolita de arroz con camarón ecuatoriano (2 un).", img: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop" },

    // SASHIMI
    { id: 7, name: "Sashimi Mixto", price: 14900, category: "Sashimi", desc: "Cortes finos de salmón, atún y pulpo (9 cortes).", img: "https://images.unsplash.com/photo-1534482421-64566f976cfa?q=80&w=2069&auto=format&fit=crop" },

    // BEBIDAS
    { id: 8, name: "Ramune Original", price: 3500, category: "Bebidas", desc: "Gaseosa japonesa tradicional sabor original.", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" },
    { id: 9, name: "Cerveza Asahi", price: 4500, category: "Bebidas", desc: "Cerveza dry lager japonesa importada.", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" },
];

const CATEGORIES = ["Todos", "Rolls", "Nigiris", "Sashimi", "Bebidas"];

export default function Menu() {
    const [activeFilter, setActiveFilter] = useState("Todos");
    const { addToCart } = useCart(); // Usamos la función del contexto global

    // Filtrado de productos
    const filteredProducts = activeFilter === "Todos"
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === activeFilter);

    return (
        <section className="py-12 px-6 container mx-auto" id="menu">

            {/* Filtros Estilo Tab con Animaciones */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap justify-center gap-4 mb-12 sticky top-24 z-30 bg-sakana-beige/90 backdrop-blur py-4 rounded-xl"
            >
                {CATEGORIES.map((cat, index) => (
                    <motion.button
                        key={cat}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-6 py-2 rounded-full border font-medium transition-all duration-300 ${activeFilter === cat
                                ? 'bg-sakana-red text-white border-sakana-red shadow-lg shadow-sakana-red/30'
                                : 'bg-white text-sakana-dark border-gray-200 hover:border-sakana-red hover:text-sakana-red hover:shadow-md'
                            }`}
                    >
                        {cat}
                    </motion.button>
                ))}
            </motion.div>

            {/* Grid de Productos con Animación */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
                <AnimatePresence mode='popLayout'>
                    {filteredProducts.map(product => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProductCard
                                product={product}
                                onAdd={addToCart} // Pasamos la función directamente al card
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Mensaje si no hay productos (por si acaso) */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                    <p className="text-xl">No hay productos en esta categoría aún.</p>
                </div>
            )}
        </section>
    );
}
