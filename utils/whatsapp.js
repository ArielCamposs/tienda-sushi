const handleCheckout = () => {
    const numeroCelular = "931342699"; // Sin 0 inicial
    const phone = `569${numeroCelular}`;

    let message = "Hola SakanaDelight! 🍣 Quiero pedir lo siguiente:\n\n";
    cart.forEach(item => {
        message += `▪️ ${item.quantity}x ${item.name} - $${(item.price * item.quantity).toLocaleString('es-CL')}\n`;
    });
    message += `\n💰 *Total: $${cartTotal.toLocaleString('es-CL')}*`;

    const encodedMessage = encodeURIComponent(message);

    // Detectar dispositivo
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    // URL según dispositivo
    const url = isMobile
        ? `whatsapp://send?phone=${phone}&text=${encodedMessage}`   // Abre la app
        : `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`; // Web

    window.open(url, '_blank');
};
