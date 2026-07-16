export class StatsView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render({ total, completed, active }) {
    this.container.textContent = `Total: ${total} | Completadas: ${completed} | Activas: ${active}`;
  }
}
