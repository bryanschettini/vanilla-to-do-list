/**
 * Cada filtro es una función independiente. Para agregar un filtro nuevo
 * (por ejemplo "priority") solo se agrega una entrada aquí, sin modificar
 * el código que ya funciona (Open/Closed Principle).
 */
export const taskFilters = {
  all: (tasks) => tasks,
  active: (tasks) => tasks.filter((task) => !task.completed),
  completed: (tasks) => tasks.filter((task) => task.completed),
};

export function applyFilter(tasks, filterName) {
  const filterFn = taskFilters[filterName] || taskFilters.all;
  return filterFn(tasks);
}
