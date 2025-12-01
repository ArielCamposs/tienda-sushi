// src/components/OrderTracker.jsx
import { CheckCircle, Clock, Package, Home } from 'lucide-react';

const STEPS = [
    { id: 1, label: "Recibido", icon: Clock },
    { id: 2, label: "Preparación", icon: Package }, // Icono conceptual de caja/sushi
    { id: 3, label: "En Camino", icon: Home },      // Icono conceptual
    { id: 4, label: "Entregado", icon: CheckCircle },
];

export default function OrderTracker({ currentStep = 2 }) { // 2 = Preparación
    return (
        <div className="w-full py-8">
            <div className="relative flex justify-between items-center w-full max-w-3xl mx-auto">
                {/* Línea de fondo */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-sakana-ink/10 -z-10 rounded"></div>

                {/* Línea de progreso */}
                <div
                    className="absolute top-1/2 left-0 h-1 bg-sakana-green -z-0 rounded transition-all duration-1000"
                    style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                ></div>

                {STEPS.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = step.id <= currentStep;

                    return (
                        <div key={step.id} className="flex flex-col items-center bg-sakana-beige px-2">
                            <div className={`
                w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500
                ${isActive ? 'bg-sakana-green border-sakana-green text-white scale-110 shadow-lg' : 'bg-white border-gray-300 text-gray-300'}
              `}>
                                <Icon size={20} />
                            </div>
                            <span className={`mt-2 text-xs md:text-sm font-medium ${isActive ? 'text-sakana-ink' : 'text-gray-400'}`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
