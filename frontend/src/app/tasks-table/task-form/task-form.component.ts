import {
  Component,
  ElementRef,
  inject,
  Input,
  NgModule,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Task } from '../../../interfaces/Task';
import {
  MatButtonToggleAppearance,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { TasksService } from '../../tasks.service';
import { MatDialog } from '@angular/material/dialog';

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
    private formBuilder: FormBuilder
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
    if (this.taskForm.invalid) return;
    this.taskService
      .createTask(this.taskForm.value)
      .subscribe((response: any) => this.tasks.push(response.data));
    this.close();
  }
  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      entityName: ['', Validators.required],
      date: ['', Validators.required],
      taskType: ['', Validators.required],
      status: ['Open', Validators.required],
      notes: [''],
      time: ['', Validators.required],
      contactPerson: ['', Validators.required],
    });
  }
}
