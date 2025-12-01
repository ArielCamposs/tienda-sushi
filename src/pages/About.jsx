import { motion } from 'framer-motion';
import { Fish, Award, Heart, ChefHat } from 'lucide-react';

export default function About() {
    return (
        <div className="pt-24 min-h-screen bg-sakana-beige">

            {/* 1. HERO DE HISTORIA */}
            <section className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Texto */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-sakana-red font-bold tracking-widest uppercase block mb-2">Nuestra Historia</span>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-sakana-dark mb-6 leading-tight">
                            Honor, Pasión y <br />
                            <span className="text-sakana-red">Cuchillos Afilados</span>.
                        </h1>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Nacimos en 2015 con una misión simple pero obsesiva: traer el verdadero espíritu de las barras de sushi de Osaka a la ciudad. No buscamos ser los más rápidos, buscamos la perfección en cada grano de arroz.
                        </p>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            "SakanaDelight" no es solo un nombre, es nuestra promesa: el deleite del pescado fresco (Sakana), respetado y preparado con técnicas ancestrales fusionadas con la audacia moderna.
                        </p>

                        <div className="border-l-4 border-sakana-red pl-6 italic text-xl text-sakana-dark font-serif">
                            "La comida no es solo sustento, es una ceremonia que conecta el alma del chef con el corazón del comensal."
                        </div>
                    </motion.div>

                    {/* Imagen Composición */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sakana-gold/20 rounded-full blur-2xl -z-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop"
                            alt="Chef cortando pescado"
                            className="rounded-3xl shadow-2xl w-full object-cover h-[600px]"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs hidden md:block">
                            <p className="text-sakana-dark font-bold text-lg mb-1">Kenji Tanaka</p>
                            <p className="text-sm text-gray-500">Fundador & Itamae Principal</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. NUESTROS PILARES (Grid) */}
            <section className="bg-sakana-dark text-white py-20 mt-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-sakana-gold mb-4">El Código Sakana</h2>
                        <p className="opacity-70 max-w-2xl mx-auto">Cuatro principios inquebrantables que guían nuestra cocina cada día.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: Fish, title: "Frescura Radical", desc: "Si no llegó hoy del puerto, no entra en nuestra cocina. Sin excepciones." },
                            { icon: ChefHat, title: "Maestría", desc: "Nuestros chefs entrenan años antes de tocar su primer nigiri." },
                            { icon: Heart, title: "Omotenashi", desc: "Hospitalidad japonesa: anticipar tus deseos antes de que los pidas." },
                            { icon: Award, title: "Calidad", desc: "Usamos solo arroz premium de grano corto y vinagre envejecido." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors text-center group"
                            >
                                <div className="w-16 h-16 mx-auto bg-sakana-red rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(230,57,70,0.4)]">
                                    <item.icon size={32} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. GALERÍA BENTO */}
            <section className="py-20 container mx-auto px-6">
                <h2 className="text-4xl font-serif font-bold text-center text-sakana-dark mb-12">Nuestra Atmósfera</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
                    <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl">
                        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Restaurant Interior" />
                    </div>
                    <div className="relative group overflow-hidden rounded-2xl">
                        <img src="https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=2064&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Sushi Detail" />
                    </div>
                    <div className="relative group overflow-hidden rounded-2xl">
                        <img src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Plating" />
                    </div>
                    <div className="col-span-2 relative group overflow-hidden rounded-2xl">
                        <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Drinks" />
                    </div>
                </div>
            </section>

        </div>
    );
}
