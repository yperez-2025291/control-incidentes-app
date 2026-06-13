import type { EstadoIncidente } from "../types/incidentes.types.js";
import { incidentesDB } from "../data/incidentes.data.js";

export function actualizarEstado(id: number, nuevoEstado: EstadoIncidente): void {
    const incidente = incidentesDB.find(inc => inc.id === id);
    
    if (incidente) {
        incidente.estado = nuevoEstado;
        console.log(`[ÉXITO] Incidente #${id} actualizado a: ${nuevoEstado}`);
    } else {
        console.log(`[ERROR] No se encontró el incidente con ID ${id}`);
    }
}

export function resolverIncidente(id: number, solucion: string): void {
    const incidente = incidentesDB.find(inc => inc.id === id);
    
    if (!incidente) {
        console.log(`[ERROR] Incidente #${id} no existe`);
        return;
    }

    if (incidente.estado === "resuelto") {
        console.log(`[ALERTA] El incidente #${id} ya estaba resuelto`);
        return;
    }

    incidente.estado = "resuelto";
    console.log(`[ÉXITO] Incidente #${id} resuelto`);
    console.log(`Solución aplicada: ${solucion}`);
}
