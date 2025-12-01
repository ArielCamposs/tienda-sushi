// src/pages/Home.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Flame, CheckCircle } from 'lucide-react';

// Componentes Propios
import Hero from '../components/Hero';
import Marquee from '../components/Marquee'; // Tu cinta de texto roja
import OrderTracker from '../components/OrderTracker';
import { useCart } from '../context/CartContext';

// Librerías Externas
import InfiniteCarousel from 'react-fast-marquee'; // <--- Renombrado para evitar conflicto

export default function Home() {
    const { addToCart } = useCart();

    // Datos para Favoritos
    const FAVORITES = [
        { id: 101, name: "Volcano Roll", price: 12900, img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070", desc: "Erupción de sabor con salsa spicy y camarón." },
        { id: 102, name: "Tuna Tataki", price: 14500, img: "https://images.unsplash.com/photo-1617196034438-61e8c128373e?q=80&w=2070", desc: "Atún sellado con sésamo y ponzu." },
        { id: 103, name: "Geisha Ebi", price: 9900, img: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925", desc: "Delicadeza de salmón rellena de camarón." },
        { id: 104, name: "Nigiri Premium", price: 8900, img: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=2064", desc: "Selección del itamae del día." },
    ];

    return (
        <>
            {/* 1. HERO PRINCIPAL */}
            <Hero />

            {/* 2. CINTA DE TEXTO EN MOVIMIENTO */}
            <Marquee />

            {/* 3. SECCIÓN FAVORITOS INFINITOS (NUEVO DISEÑO DARK) */}
            <section className="relative py-24 bg-sakana-dark overflow-hidden">

                {/* Fondo Animado */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/seigaiha.png')] opacity-30 animate-pulse"></div>
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-sakana-red rounded-full blur-[150px] opacity-40 animate-blob"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[150px] opacity-30 animate-blob animation-delay-2000"></div>
                </div>

                {/* Título */}
                {/* Título Rediseñado de Alto Impacto */}
                <div className="relative z-10 container mx-auto px-6 mb-16 text-center">

                    {/* Texto de Fondo Gigante (Decorativo) */}
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[12rem] font-black text-white/[0.03] whitespace-nowrap pointer-events-none select-none font-sans tracking-tighter leading-none">
                        BEST SELLERS
                    </span>

                    {/* Subtítulo pequeño y elegante */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block mb-2"
                    >
                        <span className="text-sakana-gold font-serif italic text-2xl tracking-wide">
                            ~ Selección del Chef ~
                        </span>
                    </motion.div>

                    {/* TÍTULO PRINCIPAL ANIMADO */}
                    <motion.h2
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-none"
                    >
                        <span className="block text-white drop-shadow-xl">LEGENDARY</span>
                        {/* Texto Gradiente Fuego */}
                        <span className="block bg-gradient-to-r from-sakana-red via-orange-500 to-sakana-red animate-text-gradient">
                            SUSHI
                        </span>
                    </motion.h2>

                </div>

                {/* Carrusel Infinito */}
                <div className="relative z-10">
                    {/* Sombras laterales */}
                    <div className="absolute top-0 left-0 h-full w-16 md:w-32 bg-gradient-to-r from-sakana-dark to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 h-full w-16 md:w-32 bg-gradient-to-l from-sakana-dark to-transparent z-20 pointer-events-none"></div>

                    <InfiniteCarousel
                        gradient={false}
                        speed={40}
                        pauseOnHover={true}
                        className="py-8"
                    >
                        {/* Duplicamos array para asegurar loop visual perfecto */}
                        {[...FAVORITES, ...FAVORITES].map((item, idx) => (
                            <div
                                key={`${item.id}-${idx}`}
                                className="mx-6 w-[300px] md:w-[350px] group relative"
                            >
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 shadow-2xl">

                                    <div className="h-64 w-full overflow-hidden relative">
                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-sakana-dark via-transparent to-transparent opacity-80"></div>
                                        <span className="absolute top-4 right-4 bg-white/90 backdrop-blur text-sakana-dark font-bold px-4 py-1 rounded-full shadow-lg">
                                            ${item.price.toLocaleString('es-CL')}
                                        </span>
                                    </div>

                                    <div className="p-6 relative">
                                        <div className="flex gap-1 mb-2">
                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className="text-sakana-gold fill-sakana-gold" />)}
                                        </div>
                                        <h3 className="text-2xl font-serif font-bold text-white mb-2">{item.name}</h3>
                                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{item.desc}</p>

                                        <button
                                            onClick={() => addToCart(item)}
                                            className="w-full bg-sakana-red hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-colors shadow-[0_0_20px_rgba(230,57,70,0.3)]"
                                        >
                                            Añadir al Pedido
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </InfiniteCarousel>
                </div>
            </section>

            {/* 4. SECCIÓN SOBRE NOSOTROS (RESUMEN) */}
            <section className="bg-sakana-beige py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-5 w-1/2 h-full bg-[url('https://www.transparenttextures.com/patterns/seigaiha.png')]"></div>

                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-sakana-red rounded-full opacity-20 blur-2xl"></div>
                        <img
                            src="https://images.unsplash.com/photo-1583623025817-d180a2221d0a?q=80&w=2071"
                            alt="Chef"
                            className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-sakana-red font-bold tracking-widest uppercase">Nuestra Esencia</span>
                        <h2 className="text-4xl font-serif font-bold text-sakana-dark mt-4 mb-6">
                            Más que Sushi, una <span className="text-sakana-red decoration-sakana-gold underline decoration-wavy">Tradición</span>.
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            En SakanaDelight no solo servimos comida, honramos siglos de técnica japonesa.
                            Cada corte de pescado es seleccionado al amanecer y cada grano de arroz es cocinado a la perfección.
                        </p>
                        <div className="flex gap-8 mt-8">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-white rounded-full shadow-md text-sakana-red"><Clock /></div>
                                <div><p className="font-bold text-sakana-dark">30 Min</p><p className="text-xs text-gray-500">Entrega Promedio</p></div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-white rounded-full shadow-md text-sakana-red"><Star /></div>
                                <div><p className="font-bold text-sakana-dark">4.9/5</p><p className="text-xs text-gray-500">Calificación</p></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 5. SECCIÓN TESTIMONIOS */}
            <section className="py-20 px-6 container mx-auto bg-white">
                <h2 className="text-center text-3xl font-serif font-bold mb-12 text-sakana-dark">Lo que dicen nuestros Nakamas</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-sakana-beige/30 p-8 rounded-2xl border border-sakana-dark/5 hover:shadow-lg transition-all">
                            <div className="flex text-sakana-gold mb-4"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></div>
                            <p className="italic text-gray-600 mb-6">"El mejor sushi que he probado en la ciudad. El arroz tiene la temperatura perfecta y la entrega fue rapidísima."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden"><img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" /></div>
                                <div>
                                    <span className="font-bold text-sm block text-sakana-dark">Cliente Feliz</span>
                                    <span className="text-xs text-green-600 flex items-center gap-1"><CheckCircle size={10} /> Verificado</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. CTA FINAL + TRACKER DEMO */}
            <section className="bg-sakana-dark text-white py-20 px-6 relative overflow-hidden">
                {/* Decoración */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-sakana-red/10 rounded-full blur-3xl"></div>

                <div className="container mx-auto text-center relative z-10">
                    <h2 className="text-3xl font-serif mb-8">¿Hambre? Tu pedido llega volando</h2>
                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl max-w-3xl mx-auto border border-white/10">
                        <OrderTracker currentStep={3} />
                    </div>
                    <Link to="/menu" className="mt-12 inline-flex items-center gap-2 bg-sakana-red text-white font-bold text-xl px-12 py-4 rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(230,57,70,0.5)]">
                        HACER PEDIDO AHORA <ArrowRight />
                    </Link>
                </div>
            </section>
        </>
    );
}
