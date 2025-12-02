// src/pages/PromotionsPage.jsx
import { motion } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";
import PromoCard from "../components/PromoCard";
import { promociones, loadSettingsPromos } from "../data/promotions";
import { useCart } from "../context/CartContext";

export default function PromotionsPage() {
    const { addToCart } = useCart();
    const settingsPromos = loadSettingsPromos();

    const promosActivas = settingsPromos.promocionesActivas
        ? promociones.filter((p) => p.activo)
        : [];

    const handleAddPromoToCart = (promo) => {
        // Usar la misma estructura que en Home.jsx
        addToCart({
            id: `promo-${promo.id}`,
            name: promo.titulo,
            price: promo.precioPromo,
            img: promo.img,
            desc: promo.descripcion,
            isPromo: true,
        });
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-sakana-beige via-orange-50 to-sakana-beige relative overflow-hidden">
            {/* Padding superior para compensar navbar fijo (navbar tiene top-8 + altura) */}
            <div className="pt-32 pb-20 px-4 md:px-6">
                {/* Elementos decorativos de fondo */}
                <div className="absolute top-20 left-0 w-96 h-96 bg-sakana-red/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-300/10 rounded-full blur-3xl"></div>

                {/* Patrón de fondo */}
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/seigaiha.png')]"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header mejorado */}
                    <motion.header
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16 text-center space-y-6"
                    >
                        {/* Badge superior */}
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-sakana-red/10 border border-sakana-red/20 rounded-full">
                            <Flame className="w-5 h-5 text-sakana-red animate-pulse" />
                            <span className="text-sakana-red text-sm font-bold uppercase tracking-[0.2em]">
                                Ofertas Especiales
                            </span>
                            <Sparkles className="w-4 h-4 text-sakana-gold" />
                        </div>

                        {/* Título principal */}
                        <h1 className="text-5xl md:text-7xl font-black text-sakana-dark leading-tight">
                            Promociones del <span className="text-sakana-red">Día</span>
                        </h1>

                        {/* Subtítulo */}
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Aprovecha nuestros combos exclusivos con descuentos increíbles.
                            <span className="block mt-2 text-sakana-red font-semibold">
                                ¡Ofertas válidas solo por tiempo limitado! 🔥
                            </span>
                        </p>

                        {/* Línea decorativa */}
                        <div className="flex items-center justify-center gap-3 pt-4">
                            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-sakana-red"></div>
                            <Sparkles className="w-5 h-5 text-sakana-gold" />
                            <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-sakana-red"></div>
                        </div>
                    </motion.header>

                    {/* Grid de promociones */}
                    {promosActivas.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20"
                        >
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                                <Flame className="w-12 h-12 text-gray-400" />
                            </div>
                            <p className="text-xl text-gray-500 font-medium">
                                Por ahora no hay promociones activas.
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                                Vuelve pronto para descubrir nuevas ofertas. 💫
                            </p>
                        </motion.div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {promosActivas.map((promo, index) => (
                                <motion.div
                                    key={promo.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <PromoCard
                                        promo={promo}
                                        onAdd={handleAddPromoToCart}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
