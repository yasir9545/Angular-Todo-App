import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../Services/todo.service';
import { Todo } from '../../Model/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  isModalOpen = false;
  modalData: { mode: string; todo?: { id: number; title: string } } = {
    mode: 'add',
  };

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  private loadTodos(): void {
    this.todos = this.todoService.getTodos();
  }

  openModal(mode: 'add' | 'edit', todo?: Todo): void {
    this.modalData = {
      mode,
      todo: todo ? { id: todo.id, title: todo.title } : undefined,
    };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  handleSave(title: string): void {
    if (this.modalData.mode === 'edit' && this.modalData.todo) {
      this.todoService.updateTodo(this.modalData.todo.id, title);
      this.showAlert('Todo edited successfully');
    } else {
      this.todoService.addTodo(title);
      this.showAlert('Todo added successfully');
    }
    this.loadTodos();
    this.closeModal();
  }

  delete(todo: Todo): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(todo.id);
      this.showAlert('Todo deleted successfully');
      this.loadTodos();
    }
  }

  private showAlert(message: string): void {
    alert(message);
  }
}
