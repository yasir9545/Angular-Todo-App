import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.css'],
})
export class TodoModalComponent implements OnChanges {
  @Input() data: { mode: string; todo?: { id: number; title: string; description: string; date: string } } = {
    mode: 'add',
  };
  @Output() save = new EventEmitter<{ title: string; description: string; date: string }>();
  @Output() close = new EventEmitter<void>();

  title: string = '';
  description: string = '';
  date: string = '';
  modalTitle: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      if (this.data.mode === 'edit' && this.data.todo) {
        this.title = this.data.todo.title;
        this.description = this.data.todo.description;
        this.date = this.data.todo.date;
        this.modalTitle = 'Edit Todo';
      } else {
        this.title = '';
        this.description = '';
        this.date = this.currentDateTime();
        this.modalTitle = 'Add Todo';
      }
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  onSave(event: Event): void {
    event.preventDefault();
    this.save.emit({
      title: this.title,
      description: this.description,
      date: this.date
    });
    this.closeModal();
  }

  currentDateTime(): string {
    return new Date().toISOString();
  }
}
