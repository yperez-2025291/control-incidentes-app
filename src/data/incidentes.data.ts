import type { IIncidente } from "../types/interfaces.types.js";

export const incidentesDB: IIncidente[] = [];

let contadorId = 1;

export function obtenerNuevoId(): number {
    return contadorId++;
}
