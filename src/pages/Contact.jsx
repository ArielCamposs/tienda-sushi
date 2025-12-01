import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook } from 'lucide-react';

export default function Contact() {
    return (
        <div className="pt-24 min-h-screen bg-sakana-beige">

            {/* Header Simple */}
            <div className="text-center py-12 px-6">
                <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-sakana-red font-bold tracking-widest uppercase"
                >
                    Estamos aquí para ti
                </motion.span>
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl font-serif font-bold text-sakana-dark mt-2"
                >
                    Contáctanos
                </motion.h1>
            </div>

            <div className="container mx-auto px-6 pb-20">
                <div className="grid lg:grid-cols-2 gap-12">

                    {/* COLUMNA IZQUIERDA: Formulario */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-sakana-dark/5"
                    >
                        <h3 className="text-2xl font-serif font-bold text-sakana-dark mb-6">Envíanos un mensaje</h3>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-600">Nombre</label>
                                    <input type="text" placeholder="Tu nombre" className="w-full bg-sakana-beige/30 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-sakana-red focus:ring-1 focus:ring-sakana-red transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-600">Email</label>
                                    <input type="email" placeholder="tucorreo@ejemplo.com" className="w-full bg-sakana-beige/30 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-sakana-red focus:ring-1 focus:ring-sakana-red transition-all" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600">Asunto</label>
                                <select className="w-full bg-sakana-beige/30 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-sakana-red transition-all text-gray-600">
                                    <option>Reserva de Mesa</option>
                                    <option>Consulta sobre Pedido</option>
                                    <option>Eventos Privados</option>
                                    <option>Otro</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600">Mensaje</label>
                                <textarea rows="5" placeholder="¿En qué podemos ayudarte hoy?" className="w-full bg-sakana-beige/30 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-sakana-red focus:ring-1 focus:ring-sakana-red transition-all resize-none"></textarea>
                            </div>

                            <button type="button" className="w-full bg-sakana-dark text-white font-bold py-4 rounded-xl hover:bg-sakana-red transition-colors flex items-center justify-center gap-2 shadow-lg group">
                                Enviar Mensaje
                                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>

                    {/* COLUMNA DERECHA: Info + Mapa */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-8"
                    >
                        {/* Tarjetas de Info */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-sakana-dark/5 hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-sakana-red/10 text-sakana-red rounded-full flex items-center justify-center mb-4">
                                    <MapPin />
                                </div>
                                <h4 className="font-bold text-sakana-dark mb-2">Ubicación</h4>
                                <p className="text-gray-500 text-sm">Av. Providencia 1234,<br />Santiago, Chile</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-sakana-dark/5 hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-sakana-red/10 text-sakana-red rounded-full flex items-center justify-center mb-4">
                                    <Phone />
                                </div>
                                <h4 className="font-bold text-sakana-dark mb-2">Teléfono</h4>
                                <p className="text-gray-500 text-sm">+56 9 1234 5678<br />(02) 2233 4455</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-sakana-dark/5 hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-sakana-red/10 text-sakana-red rounded-full flex items-center justify-center mb-4">
                                    <Mail />
                                </div>
                                <h4 className="font-bold text-sakana-dark mb-2">Email</h4>
                                <p className="text-gray-500 text-sm">contacto@sakanadelight.cl<br />reservas@sakanadelight.cl</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-sakana-dark/5 hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-sakana-red/10 text-sakana-red rounded-full flex items-center justify-center mb-4">
                                    <Clock />
                                </div>
                                <h4 className="font-bold text-sakana-dark mb-2">Horario</h4>
                                <p className="text-gray-500 text-sm">Lun - Dom: 12:30 - 23:00<br />Viernes hasta 00:00</p>
                            </div>
                        </div>

                        {/* Mapa Embebido Estilizado */}
                        <div className="rounded-3xl overflow-hidden shadow-xl h-[300px] relative group">
                            {/* Filtro CSS para mapa en escala de grises/sepia */}
                            <div className="absolute inset-0 bg-sakana-dark/20 pointer-events-none z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.552081826953!2d-70.60477168480038!3d-33.43464748077854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf7433514d47%3A0x74c955b58611f8e4!2sCostanera%20Center!5e0!3m2!1ses!2scl!4v1636582048912!5m2!1ses!2scl"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(100%) contrast(1.2) brightness(0.9)' }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Mapa"
                                className="w-full h-full"
                            ></iframe>
                        </div>

                        {/* Redes Sociales */}
                        <div className="flex justify-center gap-6 pt-4">
                            <a href="#" className="bg-sakana-dark text-white p-3 rounded-full hover:bg-sakana-red hover:-translate-y-1 transition-all"><Instagram size={24} /></a>
                            <a href="#" className="bg-sakana-dark text-white p-3 rounded-full hover:bg-blue-600 hover:-translate-y-1 transition-all"><Facebook size={24} /></a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* FAQ Section */}
            <section className="bg-white py-20 px-6 border-t border-gray-100">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl font-serif font-bold text-center text-sakana-dark mb-12">Preguntas Frecuentes</h2>
                    <div className="space-y-4">
                        {[
                            { q: "¿Tienen opciones veganas?", a: "¡Sí! Tenemos una sección completa de rolls y nigiris veganos con tofu marinado y vegetales frescos." },
                            { q: "¿Hacen despachos a toda la ciudad?", a: "Cubrimos todo Santiago Centro, Providencia, Las Condes y Ñuñoa. Para otras comunas, consúltanos por WhatsApp." },
                            { q: "¿Necesito reservar?", a: "Recomendamos reservar especialmente para viernes y fines de semana. Puedes hacerlo aquí mismo." }
                        ].map((faq, i) => (
                            <details key={i} className="group bg-sakana-beige/20 rounded-xl p-6 cursor-pointer border border-transparent hover:border-sakana-dark/10 transition-all">
                                <summary className="font-bold text-sakana-dark text-lg flex justify-between items-center list-none">
                                    {faq.q}
                                    <span className="text-sakana-red group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="text-gray-600 mt-4 leading-relaxed pl-2 border-l-2 border-sakana-red/20">
                                    {faq.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
