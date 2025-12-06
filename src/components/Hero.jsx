import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';

// URLs con diferentes tamaños para móvil vs desktop
const SLIDES = [
    {
        id: 1,
        imageMobile: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=50&w=600&auto=format&fit=crop",
        imageDesktop: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=60&w=1200&auto=format&fit=crop",
        title: "Sabor Legendario",
        subtitle: "La auténtica tradición japonesa en tu paladar."
    },
    {
        id: 2,
        imageMobile: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=50&w=600&auto=format&fit=crop",
        imageDesktop: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=60&w=1200&auto=format&fit=crop",
        title: "Frescura Absoluta",
        subtitle: "Pescado seleccionado diariamente del puerto."
    },
    {
        id: 3,
        imageMobile: "https://images.unsplash.com/photo-1540648639573-8c848de23f0a?q=50&w=600&auto=format&fit=crop",
        imageDesktop: "https://images.unsplash.com/photo-1540648639573-8c848de23f0a?q=60&w=1200&auto=format&fit=crop",
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
                speed={800}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="h-full w-full"
            >
                {SLIDES.map((slide, index) => (
                    <SwiperSlide key={slide.id} className="relative">
                        {/* Overlay Oscuro */}
                        <div className="absolute inset-0 bg-black/40 z-10" />

                        {/* Imagen con srcset para diferentes tamaños */}
                        <picture className="absolute inset-0">
                            <source
                                media="(max-width: 768px)"
                                srcSet={slide.imageMobile}
                            />
                            <source
                                media="(min-width: 769px)"
                                srcSet={slide.imageDesktop}
                            />
                            <img
                                src={slide.imageDesktop}
                                alt={slide.title}
                                width={1200}
                                height={800}
                                fetchPriority={slide.id === 1 ? "high" : "low"}
                                loading={slide.id === 1 ? "eager" : "lazy"}
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                        </picture>

                        {/* Contenido Centrado - Sin animaciones pesadas en móvil */}
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                            <div
                                className={`flex flex-col items-center transition-opacity duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                <span className="text-sakana-gold font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 bg-black/50 px-4 py-1 rounded text-sm md:text-base">
                                    Sakana Delight
                                </span>

                                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-4 md:mb-6 drop-shadow-lg">
                                    {slide.title}
                                </h1>

                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 max-w-2xl font-light mb-6 md:mb-8 px-4">
                                    {slide.subtitle}
                                </p>

                                <Link to="/menu">
                                    <button className="bg-sakana-red text-white text-base md:text-lg font-bold px-8 md:px-10 py-3 md:py-4 rounded-full shadow-lg hover:bg-red-600 active:scale-95 transition-colors">
                                        Ordenar Ahora
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

