import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Task } from '../../../interfaces/Task';
import {
  MatButtonToggleAppearance,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { TasksService } from '../../tasks.service';
import {
  MatDialog,
} from '@angular/material/dialog';

@Component({
  selector: 'app-task-form',
  imports: [MatButtonToggleModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  @ViewChild('myModal', { static: false })
  modal?: ElementRef<HTMLDivElement> = undefined;
  @Input() appearance: MatButtonToggleAppearance = 'standard';
  @Input() tasks: Task[] = [];
  taskForm = new FormGroup({
    entityName: new FormControl(),
    date: new FormControl(),
    taskType: new FormControl(),
    status: new FormControl(),
    notes: new FormControl(),
    time: new FormControl(),
    contactPerson: new FormControl(),
  });

  @Input() dialog: MatDialog = inject(MatDialog);

  constructor(
    private taskService: TasksService,
  ) {}

  open() {
    if (this.modal) {
      this.modal.nativeElement.style.display = 'block';
    }
  }

  close() {
    if (this.modal) {
      this.modal.nativeElement.style.display = 'none';
      this.dialog.closeAll();
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.taskService
      .createTask(this.taskForm.value)
      .subscribe((response: any) => this.tasks.push(response.data));
    this.close();
  }
}
