// src/hooks/useDeliveryCalculator.js
// Calcula distancia en KM, determina si está dentro del radio y el costo de delivery.

import { useMemo } from "react";

// Coordenadas fijas del local (ejemplo: Santiago centro)
export const STORE_LOCATION = {
    lat: -32.4496,
    lng: -71.2317,
};

// Reglas de costo
export const ZONAS_DELIVERY = [
    { maxKm: 3, costo: 1000 },
    { maxKm: 5, costo: 2000 },
    { maxKm: 8, costo: 3000 },
];

// Haversine en KM (lat/lon en grados)
function haversineKm(lat1, lon1, lat2, lon2) {
    if (lat1 == null || lat2 == null || lon1 == null || lon2 == null) return null;

    const R = 6371; // radio tierra km
    const toRad = (v) => (v * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const rLat1 = toRad(lat1);
    const rLat2 = toRad(lat2);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rLat1) *
        Math.cos(rLat2) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Hook principal
export function useDeliveryCalculator(userLocation, config = {}) {
    const {
        storeLocation = STORE_LOCATION,
        zonas = ZONAS_DELIVERY,
        maxKm = zonas.at(-1)?.maxKm ?? 8,
    } = config;

    return useMemo(() => {
        if (
            !userLocation ||
            userLocation.lat == null ||
            userLocation.lng == null
        ) {
            return {
                distanceKm: null,
                costoDelivery: null,
                isInZone: false,
                matchedZone: null,
            };
        }

        const distanceKm = haversineKm(
            storeLocation.lat,
            storeLocation.lng,
            userLocation.lat,
            userLocation.lng
        );

        if (distanceKm == null) {
            return {
                distanceKm: null,
                costoDelivery: null,
                isInZone: false,
                matchedZone: null,
            };
        }

        const matchedZone = zonas.find((z) => distanceKm <= z.maxKm) ?? null;

        const isInZone = distanceKm <= maxKm && !!matchedZone;
        const costoDelivery = matchedZone ? matchedZone.costo : null;

        return {
            distanceKm,
            costoDelivery,
            isInZone,
            matchedZone,
        };
    }, [userLocation, storeLocation, zonas, maxKm]);
}
