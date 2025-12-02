// src/components/PromoCard.jsx
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";

export default function PromoCard({ promo, onAdd }) {
    const { titulo, descripcion, precioPromo, img } = promo;

    return (
        <motion.article
            whileHover={{ y: -8 }}
            className="group bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-transparent hover:border-sakana-red/30 transition-all duration-300 hover:shadow-2xl"
        >
            {/* Imagen con overlay y badge */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={img}
                    alt={titulo}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                {/* Badge "Oferta del día" */}
                <div className="absolute top-4 left-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-sakana-red text-white shadow-lg border border-white/20">
                        <Sparkles className="w-3 h-3" />
                        Oferta del día
                    </div>
                </div>

                {/* Precio destacado en la imagen */}
                <div className="absolute bottom-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                        <span className="text-2xl font-black text-sakana-red">
                            ${precioPromo.toLocaleString("es-CL")}
                        </span>
                    </div>
                </div>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-4">
                {/* Título */}
                <h3 className="text-xl font-bold text-sakana-dark group-hover:text-sakana-red transition-colors">
                    {titulo}
                </h3>

                {/* Descripción */}
                <p className="text-sm text-gray-600 leading-relaxed">
                    {descripcion}
                </p>

                {/* Separador decorativo */}
                <div className="flex items-center gap-2 py-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    <Sparkles className="w-4 h-4 text-sakana-gold" />
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                </div>

                {/* Badge de precio especial */}
                <div className="flex items-center justify-center">
                    <span className="text-xs font-semibold text-sakana-red bg-sakana-red/10 px-3 py-1.5 rounded-full border border-sakana-red/20">
                        💰 Precio especial online
                    </span>
                </div>

                {/* Botón de agregar */}
                <button
                    onClick={() => onAdd(promo)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sakana-red to-red-600 text-white py-3.5 text-sm font-bold hover:from-sakana-dark hover:to-sakana-dark transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105"
                >
                    <ShoppingBag className="w-4 h-4" />
                    Agregar promoción
                </button>
            </div>
        </motion.article>
    );
}
