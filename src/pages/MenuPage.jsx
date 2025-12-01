// src/pages/MenuPage.jsx
import { motion } from "framer-motion";
import Menu from "../components/Menu";
import AddressPicker from "../components/AddressPicker"; // <--- IMPORTANTE

export default function MenuPage() {
    return (
        <div className="pt-24 min-h-screen bg-sakana-beige relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-sakana-red/5 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute top-40 left-10 w-96 h-96 bg-sakana-gold/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

            {/* Header Section with Animations */}
            <div className="text-center py-16 relative z-10">
                {/* Animated Title */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-6xl md:text-7xl font-serif font-bold mb-4 relative inline-block">
                        <span className="bg-gradient-to-r from-sakana-dark via-sakana-red to-sakana-dark bg-clip-text text-transparent animate-text-gradient">
                            Nuestro Menú
                        </span>
                        {/* Decorative underline */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-transparent via-sakana-red to-transparent"
                        />
                    </h1>
                </motion.div>

                {/* Animated Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-lg md:text-xl text-gray-600 mt-6 font-medium"
                >
                    <span className="inline-block">✨</span> Selecciona tus favoritos y{" "}
                    <span className="text-sakana-red font-bold">
                        disfruta la experiencia
                    </span>
                    <span className="inline-block ml-1">🍣</span>
                </motion.p>

                {/* Decorative Divider */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex items-center justify-center gap-3 mt-8"
                >
                    <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-sakana-red"></div>
                    <div className="w-3 h-3 rounded-full bg-sakana-red animate-pulse"></div>
                    <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-sakana-red"></div>
                </motion.div>
            </div>

            {/* SECCIÓN: SELECCIONAR DIRECCIÓN + MAPA */}
            <section className="relative z-10 container mx-auto px-6 pb-10">
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                    <h2 className="text-2xl font-serif font-bold mb-4 text-sakana-dark">
                        Dirección de entrega
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">
                        Busca tu dirección o mueve el pin en el mapa para fijar el punto
                        exacto de entrega.
                    </p>
                    <AddressPicker />
                </div>
            </section>

            {/* CATÁLOGO */}
            <div className="relative z-10">
                <Menu />
            </div>
        </div>
    );
}

