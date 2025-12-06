import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

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
        image: "https://images.unsplash.com/photo-1617196034438-61e8c128373e?q=60&w=1200&auto=format&fit=crop",
        title: "Arte Comestible",
        subtitle: "Cada roll es una obra maestra de nuestros itamae."
    }
];

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            <Swiper
                modules={[Autoplay, EffectFade, Navigation]}
                effect="fade"
                speed={1000}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="h-full w-full"
            >
                {SLIDES.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative">
                        {/* Imagen de Fondo con Overlay Oscuro */}
                        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay para leer texto */}
                        <img
                            src={slide.image}
                            alt={slide.title}
                            width={1200}
                            height={800}
                            fetchPriority={slide.id === 1 ? "high" : "low"}
                            loading={slide.id === 1 ? "eager" : "lazy"}
                            decoding="async"
                            className="w-full h-full object-cover animate-scale-slow"
                        />

                        {/* Contenido Centrado */}
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                            <motion.span
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-sakana-gold font-bold tracking-[0.3em] uppercase mb-4 bg-black/50 px-4 py-1 rounded backdrop-blur-sm"
                            >
                                Sakana Delight
                            </motion.span>

                            <motion.h1
                                key={slide.title} // Key fuerza la re-animación al cambiar slide
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, type: "spring" }}
                                className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 drop-shadow-lg"
                            >
                                {slide.title}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-xl md:text-2xl text-gray-100 max-w-2xl font-light mb-8"
                            >
                                {slide.subtitle}
                            </motion.p>

                            <Link to="/menu">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-sakana-red text-white text-lg font-bold px-10 py-4 rounded-full shadow-[0_0_20px_rgba(230,57,70,0.6)] hover:bg-red-600 transition-all"
                                >
                                    Ordenar Ahora
                                </motion.button>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
