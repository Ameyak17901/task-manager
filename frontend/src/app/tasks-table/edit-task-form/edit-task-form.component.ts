import {
  Component,
  ElementRef,
  Inject,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonToggleAppearance,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { TasksService } from '../../tasks.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-edit-task-form',
  imports: [
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-task-form.component.html',
  styleUrl: './edit-task-form.component.css',
})
export class EditTaskFormComponent {
  @ViewChild('editModal', { static: false })
  editModal?: ElementRef<HTMLDivElement> = undefined;
  @Input() appearance: MatButtonToggleAppearance = 'standard';
  @Input() dialog: MatDialog = inject(MatDialog);
  @Input() taskId: string = '';

  picker = new FormControl();
  taskForm = new FormGroup({
    entityName: new FormControl(),
    date: new FormControl(),
    taskType: new FormControl(),
    status: new FormControl(),
    notes: new FormControl(),
    time: new FormControl(),
    contactPerson: new FormControl(),
  });

  constructor(
    private taskService: TasksService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskId = this.data.taskId;
  }
  // showModal() {

  //   if (this.editModal) {
  //     this.editModal.nativeElement.style.display = 'block';
  //   }
  // }

  onSubmit(event: Event) {
    try {
      event.preventDefault();

      this.taskService
        .editTask(this.taskForm.value, this.taskId)
        .subscribe((res) => {
          console.log(res, this.taskId);
          this.taskService.getTasks();
          this.taskForm.reset();
        });
    } catch (error) {
      console.log(error);
    }
    // console.log(this.taskForm.value);
    // this.closeModal();
  }

  // closeModal() {
  //   if (this.editModal) {
  //     this.editModal.nativeElement.style.display = 'none';
  //     this.dialog.closeAll();
  //   }
  // }
}
