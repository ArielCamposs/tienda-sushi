// src/components/SelectAddressButton.jsx
import { useDelivery } from "../context/DeliveryContext";

export default function SelectAddressButton({ onClick }) {
    const { address } = useDelivery();

    return (
        <button
            type="button"
            onClick={onClick} // aquí abrirás tu modal/drawer con <AddressPicker />
            className="text-[11px] md:text-xs px-3 py-1.5 rounded-full 
                 bg-white/10 text-white border border-white/20 
                 hover:bg-white/20 transition-colors line-clamp-1 max-w-[220px] text-left"
        >
            {address.text
                ? `Entrega en: ${address.text}`
                : "Seleccionar dirección"}
        </button>
    );
}
