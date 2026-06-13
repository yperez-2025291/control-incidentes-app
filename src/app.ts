import type { Prioridad, EstadoIncidente } from "./types/incidentes.types.js";
import { registrarIncidente, listarIncidentes } from "./services/registro.service.js";
import { actualizarEstado, resolverIncidente } from "./services/solucion.service.js";
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenu(): void {
    console.log("\n=== CONTROL DE INCIDENTES C27 ===");
    console.log("1. Registrar nuevo incidente");
    console.log("2. Listar todos los incidentes");
    console.log("3. Actualizar estado de incidente");
    console.log("4. Resolver incidente");
    console.log("5. Salir");
}

function pregunta(pregunta: string): Promise<string> {
    return new Promise(resolve => {
        rl.question(pregunta, resolve);
    });
}

export async function iniciarApp(): Promise<void> {
    let continuar = true;

    while (continuar) {
        mostrarMenu();
        const opcion = await pregunta("Seleccione una opción: ");

        switch (opcion) {
            case "1":
                const titulo = await pregunta("Título: ");
                const descripcion = await pregunta("Descripción: ");
                const reportadoPor = await pregunta("Reportado por: ");
                const prioridad = await pregunta("Prioridad (baja/media/alta): ") as Prioridad;
                
                if (prioridad === "baja" || prioridad === "media" || prioridad === "alta") {
                    registrarIncidente(titulo, descripcion, reportadoPor, prioridad);
                } else {
                    console.log("[ERROR] Prioridad no válida");
                }
                break;

            case "2":
                listarIncidentes();
                break;

            case "3":
                const idActualizar = parseInt(await pregunta("ID del incidente: "));
                const nuevoEstado = await pregunta("Nuevo estado (abierto/en progreso/resuelto): ") as EstadoIncidente;
                actualizarEstado(idActualizar, nuevoEstado);
                break;

            case "4":
                const idResolver = parseInt(await pregunta("ID del incidente: "));
                const solucion = await pregunta("Describa la solución aplicada: ");
                resolverIncidente(idResolver, solucion);
                break;

            case "5":
                console.log("¡Hasta luego!");
                continuar = false;
                break;

            default:
                console.log("[ERROR] Opción no válida");
        }
    }
    
    rl.close();
}
