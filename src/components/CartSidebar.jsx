import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

    const handleCheckout = () => {
        // Número chileno: código país 56 + número sin 0 inicial
        const numeroCelular = "931342699"; // Tu número sin el 0 inicial
        const phone = `56${numeroCelular}`; // Resultado: 56931342699

        let message = "Hola SakanaDelight! 🍣 Quiero pedir lo siguiente:\n\n";
        cart.forEach(item => {
            message += `▪️ ${item.quantity}x ${item.name} - $${(item.price * item.quantity).toLocaleString('es-CL')}\n`;
        });
        message += `\n💰 *Total: $${cartTotal.toLocaleString('es-CL')}*`;

        const encodedMessage = encodeURIComponent(message);

        // Usar wa.me que funciona en todos los dispositivos
        const url = `https://wa.me/${phone}?text=${encodedMessage}`;

        window.open(url, '_blank');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay Oscuro (z-index alto para estar sobre todo) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-sm"
                    />

                    {/* Panel Lateral (z-index más alto que el overlay) */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        // w-full en móvil para ocupar toda la pantalla, ancho fijo en desktop
                        className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-white z-[210] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b flex justify-between items-center bg-sakana-dark text-white">
                            <h2 className="text-xl font-serif font-bold flex items-center gap-2">
                                <ShoppingBag size={20} /> Tu Pedido
                            </h2>
                            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:text-sakana-red transition bg-white/10 rounded-full">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Lista de Productos */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <ShoppingBag size={40} className="opacity-20" />
                                    </div>
                                    <p className="text-lg font-medium">Tu carrito está vacío.</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-4 text-sakana-red font-bold hover:underline"
                                    >
                                        Volver al menú
                                    </button>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="flex gap-4 items-center bg-white p-2 rounded-xl">
                                        <img
                                            src={item.img || 'https://placehold.co/100x100?text=Sushi'}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-lg shadow-sm bg-gray-100"
                                        />
                                        <div className="flex-1 min-w-0"> {/* min-w-0 evita desbordes de texto */}
                                            <h4 className="font-bold text-sakana-dark text-sm truncate">{item.name}</h4>
                                            <p className="text-sakana-red font-bold text-sm">${item.price.toLocaleString('es-CL')}</p>

                                            <div className="flex items-center gap-3 mt-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-sakana-red hover:text-white hover:border-transparent transition"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-sakana-red hover:text-white hover:border-transparent transition"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-300 hover:text-red-500 transition p-2 hover:bg-red-50 rounded-full"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer Total y Checkout */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t bg-gray-50 pb-safe"> {/* pb-safe para iOS */}
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-500 font-medium">Total Estimado</span>
                                    <span className="text-3xl font-bold text-sakana-dark font-serif">
                                        ${cartTotal.toLocaleString('es-CL')}
                                    </span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all active:scale-95"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
                                        fill="currentColor" className="w-6 h-6">
                                        <path
                                            d="M16 .6C7.6.6 1 7.4 1 15.8c0 2.7.8 5.2 2.1 7.4L1 31l8-2.1c2 1.1 4.4 1.7 7 1.7 8.4 0 15-6.8 15-15.2C31 7.4 24.4.6 16 .6zm0 27.2c-2.3 0-4.4-.6-6.2-1.7l-.4-.2-4.8 1.3L6 22.9l-.3-.5c-1.2-1.8-1.9-3.9-1.9-6.1 0-6.4 5.1-11.6 11.2-11.6s11.2 5.2 11.2 11.6-5.1 11.6-11.2 11.6zm6.2-8.7c-.3-.2-1.7-.9-1.9-1-.3-.1-.5-.2-.7.2s-.8 1-.9 1.1-.3.2-.6.1-1.2-.4-2.2-1.4c-.8-.7-1.3-1.6-1.4-1.9s0-.4.1-.5l.5-.6c.2-.2.3-.4.4-.6.1-.2 0-.4 0-.6s-.7-1.7-1-2.3c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.1-1.2 2.7 1.2 3.1 1.4 3.3c.2.2 2.3 3.6 5.9 5 2.9 1.1 3.5 1 4.1.9.6-.1 2-.8 2.3-1.6s.3-1.4.2-1.6c-.1-.3-.3-.4-.6-.6z" />
                                    </svg>

                                    Realizar Pedido por WhatsApp
                                </button>

                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
