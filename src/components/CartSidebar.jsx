// src/components/CartSidebar.jsx
// Carrito con bloqueo por horario + zona de reparto + costo delivery
// e inclusión de dirección (calle + ciudad) en el mensaje de WhatsApp.

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useStoreStatus, STORE_SCHEDULE } from "../hooks/useStoreStatus";
import {
    useDeliveryCalculator,
    STORE_LOCATION,
    ZONAS_DELIVERY,
} from "../hooks/useDeliveryCalculator";
import { useDelivery } from "../context/DeliveryContext";

export default function CartSidebar() {
    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        cartTotal,
    } = useCart();

    // Estado de tienda (abierto/cerrado)
    const { isOpen } = useStoreStatus(STORE_SCHEDULE);

    // Dirección seleccionada
    const { address } = useDelivery();

    // Cálculo de distancia y costo
    const { distanceKm, costoDelivery, isInZone } = useDeliveryCalculator(
        address && address.lat && address.lng
            ? { lat: address.lat, lng: address.lng }
            : null,
        { storeLocation: STORE_LOCATION, zonas: ZONAS_DELIVERY }
    );

    const totalConDelivery = cartTotal + (costoDelivery || 0);

    const handleCheckout = () => {
        // Bloqueos de seguridad
        if (!isOpen || !isInZone || cart.length === 0 || !address?.text) return;

        // Número de WhatsApp de la tienda (sin +56)
        const numeroCelular = "931342699";
        const phone = `56${numeroCelular}`; // Chile: 56931342699

        let message = "Hola SakanaDelight! 🍣 Quiero pedir lo siguiente:\n\n";

        cart.forEach((item) => {
            message += `▪️ ${item.quantity}x ${item.name} - $${(
                item.price * item.quantity
            ).toLocaleString("es-CL")}\n`;
        });

        message += `\n💰 Subtotal: $${cartTotal.toLocaleString("es-CL")}`;

        if (costoDelivery != null) {
            message += `\n🚚 Delivery estimado: $${costoDelivery.toLocaleString(
                "es-CL"
            )}`;
            message += `\n🔢 Total aprox: $${totalConDelivery.toLocaleString(
                "es-CL"
            )}`;
        }

        if (address?.text) {
            // Aquí va calle + ciudad (formatted_address de Google)
            message += `\n📍 Dirección: ${address.text}`;
        }

        const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
            message
        )}`;
        window.open(url, "_blank");
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 z-[90] backdrop-blur-sm"
                    />

                    {/* Panel lateral */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-white z-[100] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b flex justify-between items-center bg-sakana-dark text-white">
                            <h2 className="text-xl font-serif font-bold flex items-center gap-2">
                                <ShoppingBag size={20} /> Tu Pedido
                            </h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:text-sakana-red transition bg-white/10 rounded-full"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Lista de productos */}
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
                                cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 items-center bg-white p-2 rounded-xl"
                                    >
                                        <img
                                            src={
                                                item.img ||
                                                "https://placehold.co/100x100/F4E9D8/1A1A1A?text=Sushi"
                                            }
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-lg shadow-sm bg-gray-100"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-sakana-dark text-sm truncate">
                                                {item.name}
                                            </h4>
                                            <p className="text-sakana-red font-bold text-sm">
                                                ${item.price.toLocaleString("es-CL")}
                                            </p>

                                            <div className="flex items-center gap-3 mt-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-sakana-red hover:text-white hover:border-transparent transition"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="text-sm font-bold w-6 text-center">
                                                    {item.quantity}
                                                </span>
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

                        {/* Footer: totales, delivery y botón */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t bg-gray-50 pb-safe">
                                {/* Subtotal productos */}
                                <div className="flex justify-between items-center mb-2 text-sm">
                                    <span className="text-gray-500">Subtotal productos</span>
                                    <span className="text-2xl font-bold text-sakana-dark font-serif">
                                        ${cartTotal.toLocaleString("es-CL")}
                                    </span>
                                </div>

                                {/* Distancia */}
                                <div className="flex justify-between items-center mb-2 text-sm">
                                    <span className="text-gray-500">Distancia estimada</span>
                                    <span className="font-medium">
                                        {distanceKm
                                            ? `${distanceKm.toFixed(2)} km`
                                            : "Selecciona dirección"}
                                    </span>
                                </div>

                                {/* Costo delivery */}
                                <div className="flex justify-between items-center mb-3 text-sm">
                                    <span className="text-gray-500">Delivery</span>
                                    <span className="font-bold">
                                        {costoDelivery != null
                                            ? `$${costoDelivery.toLocaleString("es-CL")}`
                                            : "--"}
                                    </span>
                                </div>

                                {/* Total con delivery si existe */}
                                {costoDelivery != null && (
                                    <div className="flex justify-between items-center mb-3 text-sm">
                                        <span className="text-gray-500">Total aprox.</span>
                                        <span className="font-bold text-sakana-dark">
                                            ${totalConDelivery.toLocaleString("es-CL")}
                                        </span>
                                    </div>
                                )}

                                {/* Mensajes de bloqueo */}
                                {!address.lat && (
                                    <p className="text-xs text-amber-600 mb-1">
                                        Selecciona tu dirección para calcular el reparto.
                                    </p>
                                )}

                                {!isInZone && address.lat && (
                                    <p className="text-xs text-red-500 mb-1">
                                        Lo sentimos, aún no llegamos a esa zona 🛑
                                    </p>
                                )}

                                {!isOpen && (
                                    <p className="text-xs text-red-500 mb-1">
                                        El local está cerrado. Los pedidos se habilitan en horario
                                        de atención.
                                    </p>
                                )}

                                <button
                                    onClick={handleCheckout}
                                    disabled={
                                        !isOpen || !isInZone || !address?.text || cart.length === 0
                                    }
                                    className={`w-full font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg
                    ${!isOpen || !isInZone || !address?.text || cart.length === 0
                                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                            : "bg-green-600 hover:bg-green-700 text-white"
                                        }`}
                                >
                                    {!address?.text
                                        ? "Selecciona tu dirección"
                                        : !isInZone
                                            ? "Fuera de zona de reparto"
                                            : !isOpen
                                                ? "Local cerrado"
                                                : "Finalizar pedido por WhatsApp"}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
