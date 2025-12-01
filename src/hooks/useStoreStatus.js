// src/hooks/useStoreStatus.js
// Lógica de horario de la tienda (Chile, America/Santiago)

import { useEffect, useState } from "react";

// Config global de horarios (ejemplo: todos los días 12:00–23:00)
export const STORE_SCHEDULE = [
    {
        days: [0, 1, 2, 3, 4, 5, 6], // 0 = Domingo, 1 = Lunes, ...
        open: "12:00",
        close: "23:40",
        label: "12:00–23:40",
    },
];

// Obtiene hora y día actuales en zona horaria de Chile
function getChileNow() {
    const formatter = new Intl.DateTimeFormat("es-CL", {
        timeZone: "America/Santiago",
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        weekday: "short",
    });

    const parts = formatter.formatToParts(new Date());
    const hour = Number(parts.find((p) => p.type === "hour").value);
    const minute = Number(parts.find((p) => p.type === "minute").value);
    const weekdayStr = parts.find((p) => p.type === "weekday").value.toLowerCase();

    // Mapea "lun", "mar", "mié", "jue", "vie", "sáb", "dom" a 1..6,0
    const key = weekdayStr.slice(0, 3);
    const map = { lun: 1, mar: 2, mié: 3, jue: 4, vie: 5, sáb: 6, sab: 6, dom: 0 };
    const day = map[key] ?? 0;

    return { day, hour, minute };
}

function timeToMinutes(timeStr) {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
}

function computeStatus(schedule) {
    const { day, hour, minute } = getChileNow();
    const today = schedule.find((slot) => slot.days.includes(day));

    if (!today) {
        return {
            isOpen: false,
            todaysLabel: "Cerrado hoy",
            reason: "closed-today",
        };
    }

    const nowM = hour * 60 + minute;
    const openM = timeToMinutes(today.open);
    const closeM = timeToMinutes(today.close);

    const isOpen = nowM >= openM && nowM < closeM; // sin horarios cruzando medianoche
    const todaysLabel = today.label ?? `${today.open}–${today.close}`;

    return {
        isOpen,
        todaysLabel,
    };
}

// Hook reutilizable
export function useStoreStatus(schedule = STORE_SCHEDULE) {
    const [status, setStatus] = useState(() => computeStatus(schedule));

    useEffect(() => {
        // Recalcular cada minuto
        const id = setInterval(() => {
            setStatus(computeStatus(schedule));
        }, 60 * 1000);

        return () => clearInterval(id);
    }, [schedule]);

    return status; // { isOpen, todaysLabel }
}
