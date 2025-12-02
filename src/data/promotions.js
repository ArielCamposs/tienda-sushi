// src/data/promotions.js

// Promociones fijas (editar aquí para cambiar combos)
export const promociones = [
    {
        id: 1,
        productos: [1, 5], // IDs de tus productos normales (ej: rolls del menú)
        precioPromo: 9990,
        titulo: "Combo Salmón Lovers",
        descripcion: "2 rolls + bebida 🍶",
        img: "/images/promos/salmon-lovers.jpg",
        activo: true,
        destacado: true, // para mostrarlo en Home como "oferta del día"
    },
    {
        id: 2,
        productos: [3, 7],
        precioPromo: 11990,
        titulo: "Combo Amigos",
        descripcion: "2 rolls a elección + gyosas",
        img: "/images/promos/combo-amigos.jpg",
        activo: true,
        destacado: false,
    },
];

// Ajustes globales de promociones
export const settingsPromosDefault = {
    promocionesActivas: true,
    descuentoPorCantidad: {
        minCantidad: 2, // mínimo de rolls
        porcentaje: 10, // % que se descuenta del subtotal de esos productos
    },
};

// Opcional: leer/guardar ajustes en localStorage
const STORAGE_KEY = "sakana_settings_promos";

export function loadSettingsPromos() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return settingsPromosDefault;
        return { ...settingsPromosDefault, ...JSON.parse(saved) };
    } catch {
        return settingsPromosDefault;
    }
}

export function saveSettingsPromos(settings) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
        // ignorar errores de storage
    }
}
