// src/components/HeaderStatus.jsx
import { useStoreStatus, STORE_SCHEDULE } from "../hooks/useStoreStatus";

export default function HeaderStatus() {
    const { isOpen, todaysLabel } = useStoreStatus(STORE_SCHEDULE);

    return (

        <div className="fixed top-0 left-0 right-0 z-[60] w-full text-[11px] md:text-xs">
            {/* Barra principal compacta */}
            <div
                className={`w-full px-3 py-1 flex items-center justify-center gap-2 font-semibold
        ${isOpen ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}
            >
                <span
                    className={`inline-flex w-2 h-2 rounded-full ${isOpen ? "bg-emerald-200" : "bg-red-200"
                        }`}
                />
                <span className="uppercase tracking-[0.18em]">
                    {isOpen ? "TIENDA ABIERTA" : "TIENDA CERRADA"}
                </span>
                <span className="opacity-70">·</span>
                <span className="px-2 py-0.5 rounded-full bg-black/15 border border-white/10">
                    Horario de hoy: {todaysLabel}
                </span>
            </div>
        </div>
    );
}
