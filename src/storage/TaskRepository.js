const STORAGE_KEY = 'tasks';

/**
 * Único responsable de leer y escribir tareas en localStorage.
 * Si el día de mañana cambiamos a una API o IndexedDB, solo se
 * reemplaza esta clase (OCP/DIP) sin tocar la lógica de negocio.
 */
export class LocalStorageTaskRepository {
  getAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error('Error al leer las tareas del almacenamiento local:', error);
      return [];
    }
  }

  saveAll(tasks) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error al guardar las tareas en el almacenamiento local:', error);
    }
  }
}
