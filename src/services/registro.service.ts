import type { IIncidente, Prioridad, EstadoIncidente } from "../types/interfaces.types.js";
import { incidentesDB, obtenerNuevoId } from "../data/incidentes.data.js";

export function registrarIncidente(
    titulo: string,
    descripcion: string,
    reportadoPor: string,
    prioridad: Prioridad
): void {
    if (!titulo || !descripcion || !reportadoPor) {
        console.log("[ERROR] Todos los campos son obligatorios");
        return;
    }

    const nuevoIncidente: IIncidente = {
        id: obtenerNuevoId(),
        titulo: titulo,
        descripcion: descripcion,
        reportadoPor: reportadoPor,
        prioridad: prioridad,
        estado: "abierto",
        fechaCreacion: new Date()
    };

    incidentesDB.push(nuevoIncidente);
    console.log(`[ÉXITO] Incidente #${nuevoIncidente.id} registrado correctamente`);
}

export function listarIncidentes(): void {
    if (incidentesDB.length === 0) {
        console.log("[ALERTA] No hay incidentes registrados");
        return;
    }

    console.log("\n--- LISTADO DE INCIDENTES ---");
    incidentesDB.forEach(incidente => {
        console.log(`#${incidente.id} - ${incidente.titulo} [${incidente.estado}] - Prioridad: ${incidente.prioridad}`);
    });
}
