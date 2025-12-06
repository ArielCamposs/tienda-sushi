import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';

const SLIDES = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=60&w=1200&auto=format&fit=crop",
        title: "Sabor Legendario",
        subtitle: "La auténtica tradición japonesa en tu paladar."
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=60&w=1200&auto=format&fit=crop",
        title: "Frescura Absoluta",
        subtitle: "Pescado seleccionado diariamente del puerto."
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1540648639573-8c848de23f0a?q=60&w=1200&auto=format&fit=crop",
        title: "Arte Comestible",
        subtitle: "Cada roll es una obra maestra de nuestros itamae."
    }
];

export default function Hero() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="relative h-screen w-full overflow-hidden">
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={1200}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="h-full w-full"
            >
                {SLIDES.map((slide, index) => (
                    <SwiperSlide key={slide.id} className="relative">
                        {/* Imagen de Fondo con Overlay Oscuro */}
                        <div className="absolute inset-0 bg-black/40 z-10" />

                        {/* Imagen con animación de Ken Burns suave */}
                        <div className="absolute inset-0 overflow-hidden">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                width={1200}
                                height={800}
                                fetchPriority={slide.id === 1 ? "high" : "low"}
                                loading={slide.id === 1 ? "eager" : "lazy"}
                                decoding="async"
                                className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-out ${activeIndex === index ? 'scale-110' : 'scale-100'
                                    }`}
                            />
                        </div>

                        {/* Contenido Centrado */}
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                            <AnimatePresence mode="wait">
                                {activeIndex === index && (
                                    <motion.div
                                        key={slide.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex flex-col items-center"
                                    >
                                        <motion.span
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2, duration: 0.6 }}
                                            className="text-sakana-gold font-bold tracking-[0.3em] uppercase mb-4 bg-black/50 px-4 py-1 rounded backdrop-blur-sm"
                                        >
                                            Sakana Delight
                                        </motion.span>

                                        <motion.h1
                                            initial={{ y: 50, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
                                            className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 drop-shadow-lg"
                                        >
                                            {slide.title}
                                        </motion.h1>

                                        <motion.p
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5, duration: 0.6 }}
                                            className="text-xl md:text-2xl text-gray-100 max-w-2xl font-light mb-8"
                                        >
                                            {slide.subtitle}
                                        </motion.p>

                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.7, duration: 0.4 }}
                                        >
                                            <Link to="/menu">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="bg-sakana-red text-white text-lg font-bold px-10 py-4 rounded-full shadow-[0_0_20px_rgba(230,57,70,0.6)] hover:bg-red-600 transition-all"
                                                >
                                                    Ordenar Ahora
                                                </motion.button>
                                            </Link>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
