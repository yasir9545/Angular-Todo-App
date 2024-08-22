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
  @Input() data: { mode: string; todo?: { id: number; title: string } } = {
    mode: 'add',
  };
  @Output() save = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  title: string = '';
  modalTitle: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      if (this.data.mode === 'edit' && this.data.todo) {
        this.title = this.data.todo.title;
        this.modalTitle = 'Edit Todo';
      } else {
        this.title = '';
        this.modalTitle = 'Add Todo';
      }
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  onSave(event: Event): void {
    event.preventDefault();
    this.save.emit(this.title);
    this.closeModal();
  }
}
