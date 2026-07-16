export class FilterView {
  constructor(buttonSelector, onFilterChange) {
    this.buttons = Array.from(document.querySelectorAll(buttonSelector));
    this.onFilterChange = onFilterChange;
    this._bindEvents();
  }

  _bindEvents() {
    this.buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        this.setActive(filter);
        this.onFilterChange(filter);
      });
    });
  }

  setActive(filter) {
    this.buttons.forEach((button) => {
      const isActive = button.getAttribute('data-filter') === filter;
      button.classList.toggle('active', isActive);
    });
  }
}
