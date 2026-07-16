import './style.css';
import { LocalStorageTaskRepository } from './storage/TaskRepository.js';
import { TaskService } from './services/TaskService.js';
import { applyFilter } from './filters/taskFilters.js';
import { TaskListView } from './ui/TaskListView.js';
import { StatsView } from './ui/StatsView.js';
import { FilterView } from './ui/FilterView.js';

class TodoApp {
  constructor() {
    this.taskService = new TaskService(new LocalStorageTaskRepository());
    this.currentFilter = 'all';

    this.taskListView = new TaskListView('taskList', {
      onToggle: (id) => this.handleToggle(id),
      onDelete: (id) => this.handleDelete(id),
    });
    this.statsView = new StatsView('stats');
    this.filterView = new FilterView('.filter-btn', (filter) => this.handleFilterChange(filter));

    this.taskInput = document.getElementById('taskInput');
    this.addButton = document.getElementById('addBtn');
  }

  init() {
    this._bindEvents();
    this._refresh();
  }

  _bindEvents() {
    this.addButton.addEventListener('click', () => this.handleAddTask());
    this.taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.handleAddTask();
      }
    });
  }

  handleAddTask() {
    try {
      this.taskService.addTask(this.taskInput.value);
      this.taskInput.value = '';
      this._refresh();
    } catch (error) {
      alert(error.message);
    }
  }

  handleToggle(id) {
    this.taskService.toggleTask(id);
    this._refresh();
  }

  handleDelete(id) {
    this.taskService.deleteTask(id);
    this._refresh();
  }

  handleFilterChange(filter) {
    this.currentFilter = filter;
    this._refresh();
  }

  _refresh() {
    const filteredTasks = applyFilter(this.taskService.getTasks(), this.currentFilter);
    this.taskListView.render(filteredTasks);
    this.statsView.render(this.taskService.getStats());
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new TodoApp().init();
});
