// src/components/AddressPicker.jsx
// Selector de dirección: Autocomplete + mapa + pin draggable + clic en mapa
// Guarda texto legible (calle + ciudad) y lat/lng en DeliveryContext.

import { useCallback, useRef, useState } from "react";
import {
    GoogleMap,
    Marker,
    useJsApiLoader,
    Autocomplete,
} from "@react-google-maps/api";
import { useDelivery } from "../context/DeliveryContext";

// Tamaño del mapa
const containerStyle = {
    width: "100%",
    height: "320px",
};

// Centro por defecto: La Ligua, Chile
const defaultCenter = {
    lat: -32.4496,
    lng: -71.2317,
};

const libraries = ["places"];

export default function AddressPicker() {
    const { address, setLocation } = useDelivery();

    const initialCenter =
        address.lat && address.lng
            ? { lat: address.lat, lng: address.lng }
            : defaultCenter;

    const [mapCenter, setMapCenter] = useState(initialCenter);
    const [markerPos, setMarkerPos] = useState(initialCenter);

    const autocompleteRef = useRef(null);
    const mapRef = useRef(null);
    const geocoderRef = useRef(null);

    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const onLoadMap = useCallback((map) => {
        mapRef.current = map;
        if (window.google && window.google.maps) {
            geocoderRef.current = new window.google.maps.Geocoder();
        }
    }, []);

    // Actualiza pin + centro + contexto, y si hace falta obtiene calle+ciudad
    const updatePosition = async (lat, lng, textFromPlace) => {
        let text = textFromPlace ?? address.text ?? "";

        // Si no hay texto (solo coordenadas), usar reverse geocoding
        if (!text && geocoderRef.current) {
            try {
                const { results } = await geocoderRef.current.geocode({
                    location: { lat, lng },
                });
                if (results && results[0]) {
                    text = results[0].formatted_address; // incluye calle + ciudad
                }
            } catch (e) {
                console.warn("Error al hacer reverse geocoding", e);
            }
        }

        const pos = { lat, lng };
        setMarkerPos(pos);
        setMapCenter(pos);

        setLocation({
            text: text || address.text || "",
            lat,
            lng,
        });

        if (mapRef.current) {
            mapRef.current.panTo(pos);
            mapRef.current.setZoom(16);
        }
    };

    const onMarkerDragEnd = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        updatePosition(lat, lng);
    };

    const onMapClick = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        updatePosition(lat, lng);
    };

    const onPlaceChanged = () => {
        if (!autocompleteRef.current) return;
        const place = autocompleteRef.current.getPlace();
        if (!place || !place.geometry) return;

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const text = place.formatted_address ?? place.name ?? "";

        updatePosition(lat, lng, text);
    };

    // Fallback si falla Maps: solo input texto (sin mapa)
    if (loadError) {
        return (
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Dirección (modo manual, Maps no disponible)
                </label>
                <input
                    type="text"
                    value={address.text}
                    onChange={(e) =>
                        setLocation({ text: e.target.value || "", lat: null, lng: null })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="Calle, número, comuna"
                />
            </div>
        );
    }

    if (!isLoaded) {
        return <p className="text-sm text-gray-500">Cargando mapa…</p>;
    }

    return (
        <div className="space-y-3">
            <label className="text-sm font-medium">Selecciona tu dirección</label>

            {/* Input Autocomplete */}
            <Autocomplete
                onLoad={(ac) => (autocompleteRef.current = ac)}
                onPlaceChanged={onPlaceChanged}
            >
                <input
                    type="text"
                    defaultValue={address.text}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="Escribe tu dirección (ej: Prat 123, La Ligua)"
                />
            </Autocomplete>

            {/* Mapa + pin draggable + clic para fijar */}
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={14}
                onLoad={onLoadMap}
                onClick={onMapClick}
                options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                }}
            >
                <Marker position={markerPos} draggable onDragEnd={onMarkerDragEnd} />
            </GoogleMap>

            <p className="text-[11px] text-gray-500">
                Puedes mover el pin o hacer clic en el mapa para fijar el punto exacto
                de entrega.
            </p>
        </div>
    );
}
