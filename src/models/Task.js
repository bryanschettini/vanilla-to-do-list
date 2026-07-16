/**
 * Crea una nueva tarea.
 * Mantener la creación en un solo lugar evita duplicar esta lógica
 * (nombre significativo + responsabilidad única).
 */
export function createTask(id, text) {
  return {
    id,
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  };
}
