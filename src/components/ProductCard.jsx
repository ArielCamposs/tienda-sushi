import { Plus, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductCard({ product, onAdd }) {
    // Generador de nombre japonés falso para estética (puedes poner reales si los tienes)
    const japName = product.category === "Rolls" ? "マキ" :
        product.category === "Nigiris" ? "握り" : "刺身";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="relative w-full group select-none"
        >
            {/* Tarjeta Base */}
            <div className="relative bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-visible mt-12 pb-4">

                {/* Decoración Japonesa Vertical (Sutil) */}
                <div className="absolute top-4 right-4 z-0 opacity-10 font-serif font-bold text-4xl writing-vertical-rl text-sakana-red select-none pointer-events-none">
                    {japName}
                </div>

                {/* Imagen Flotante (Se sale del contenedor por arriba) */}
                <div className="relative -mt-12 mx-auto w-44 h-44 z-10 drop-shadow-xl group-hover:drop-shadow-2xl transition-all duration-500 group-hover:scale-110">
                    {/* Círculo decorativo detrás de la comida */}
                    <div className="absolute inset-2 rounded-full bg-sakana-beige opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-110 transition-all duration-500 -z-10 blur-md"></div>

                    <img
                        src={product.img}
                        alt={product.name}
                        width={176}
                        height={176}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover rounded-full border-4 border-white shadow-sm"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=60&w=200' }}
                    />

                    {/* Badge de Categoría Flotante */}
                    <span className="absolute bottom-0 right-0 bg-sakana-dark text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        {product.category}
                    </span>
                </div>

                {/* Contenido Info */}
                <div className="px-6 pt-6 pb-2 text-center relative z-20">
                    <h3 className="text-xl font-serif font-bold text-sakana-dark group-hover:text-sakana-red transition-colors leading-tight mb-2">
                        {product.name}
                    </h3>

                    <p className="text-gray-400 text-sm font-light line-clamp-2 min-h-[2.5em]">
                        {product.desc || "Ingredientes frescos seleccionados por nuestro itamae."}
                    </p>
                </div>

                {/* Footer: Precio y Acción */}
                <div className="px-6 pt-4 pb-4 flex items-center justify-between mt-2 border-t border-dashed border-gray-200 mx-4">
                    <div className="flex flex-col items-start">
                        <span className="text-xs text-gray-400 uppercase font-bold">Precio</span>
                        <span className="text-xl font-bold text-sakana-dark font-serif">
                            ${product.price.toLocaleString('es-CL')}
                        </span>
                    </div>

                    <button
                        onClick={() => onAdd && onAdd(product)}
                        className="relative overflow-hidden bg-sakana-red text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-[0_4px_14px_0_rgba(230,57,70,0.39)] hover:shadow-[0_6px_20px_rgba(230,57,70,0.23)] hover:bg-red-600 transition-all active:scale-95 group/btn"
                    >
                        {/* Icono Normal */}
                        <Plus size={24} className="absolute group-hover/btn:scale-0 transition-transform duration-300" />

                        {/* Icono Hover (Bolsa) */}
                        <ShoppingBag size={20} className="absolute scale-0 group-hover/btn:scale-100 transition-transform duration-300" />
                    </button>
                </div>

            </div>
        </motion.div>
    );
}
