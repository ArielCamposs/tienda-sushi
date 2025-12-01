export default function Marquee() {
    return (
        <div className="bg-sakana-red py-4 overflow-hidden whitespace-nowrap border-y-4 border-sakana-dark">
            <div className="inline-block animate-marquee">
                <span className="text-white font-bold text-2xl mx-8 uppercase tracking-widest">🍣 Sushi Fresco</span>
                <span className="text-sakana-dark font-bold text-2xl mx-8">★</span>
                <span className="text-white font-bold text-2xl mx-8 uppercase tracking-widest">Envío Gratis</span>
                <span className="text-sakana-dark font-bold text-2xl mx-8">★</span>
                <span className="text-white font-bold text-2xl mx-8 uppercase tracking-widest">Sabor Tradicional</span>
                <span className="text-sakana-dark font-bold text-2xl mx-8">★</span>
                <span className="text-white font-bold text-2xl mx-8 uppercase tracking-widest">Sakana Delight</span>
                <span className="text-sakana-dark font-bold text-2xl mx-8">★</span>
                {/* Repetir para asegurar que llene pantalla */}
                <span className="text-white font-bold text-2xl mx-8 uppercase tracking-widest">🍣 Sushi Fresco</span>
                <span className="text-sakana-dark font-bold text-2xl mx-8">★</span>
                <span className="text-white font-bold text-2xl mx-8 uppercase tracking-widest">Envío Gratis</span>
            </div>
        </div>
    );
}
