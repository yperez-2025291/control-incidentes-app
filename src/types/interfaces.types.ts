import type { Prioridad, EstadoIncidente } from "./incidentes.types.js";
export type { Prioridad, EstadoIncidente };

export interface IIncidente {
    readonly id: number;
    titulo: string;
    descripcion: string;
    reportadoPor: string;
    prioridad: Prioridad;
    estado: EstadoIncidente;
    fechaCreacion: Date;
}

