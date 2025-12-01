// src/context/DeliveryContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const DeliveryContext = createContext();

const LS_KEY = "sakanaDeliveryAddress";

export function DeliveryProvider({ children }) {
    const [address, setAddress] = useState(() => {
        const saved = localStorage.getItem(LS_KEY);
        return saved ? JSON.parse(saved) : { text: "", lat: null, lng: null };
    });

    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(address));
    }, [address]);

    const setLocation = ({ text, lat, lng }) => {
        setAddress((prev) => ({
            ...prev,
            text: text ?? prev.text,
            lat: lat ?? prev.lat,
            lng: lng ?? prev.lng,
        }));
    };

    return (
        <DeliveryContext.Provider value={{ address, setAddress, setLocation }}>
            {children}
        </DeliveryContext.Provider>
    );
}

export const useDelivery = () => useContext(DeliveryContext);
