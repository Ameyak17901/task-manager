import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-task-form',
  imports: [],
  templateUrl: './edit-task-form.component.html',
  styleUrl: './edit-task-form.component.css',
})
export class EditTaskFormComponent {
  @ViewChild('editModal', { static: true })
  editModal?: ElementRef<HTMLDivElement> = undefined;

  showModal() {
    if (this.editModal) {
      this.editModal.nativeElement.style.display = 'block';
    }
  }

  closeModal() {
    if (this.editModal) {
      this.editModal.nativeElement.style.display = 'none';
    }
  }
}
