import { Component, Input, ViewChild } from '@angular/core';
import { TaskFormComponent } from './task-form/task-form.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TasksService } from '../tasks.service';
import { Task } from '../../interfaces/Task';
import { EditTaskFormComponent } from './edit-task-form/edit-task-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSortModule, Sort } from '@angular/material/sort';

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'app-tasks-table',
  imports: [
    TaskFormComponent,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    MatButtonToggleModule,
    MatSortModule,
  ],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.css',
})
export class TasksTableComponent {
  tasks: Task[] = [];
  dialogConfig = new MatDialogConfig();
  @ViewChild('myModal', { static: false }) modal?: TaskFormComponent;
  @ViewChild('editModal', { static: false }) editModal?: EditTaskFormComponent;
  @ViewChild(MatMenuTrigger) trigger?: MatMenuTrigger;
  showBackdrop = false;
  sortedData: Task[] = [];
  constructor(public dialog: MatDialog, private taskService: TasksService) {
    this.sortedData = this.tasks.slice();
  }
  showFilter: boolean = false;
  setShowFilter() {
    this.showFilter = !this.showFilter;
  }

  statusColor = (status: string) => {
    return status === 'Open' ? 'text-warning' : 'text-success';
  };

  sortData(event: Sort) {
    if (!event.active || event.direction === '') {
      this.sortedData = this.tasks;
      return;
    }
    this.sortedData = this.tasks.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      switch (event.active) {
        case 'date':
          return compare(a.date, b.date, isAsc);
        case 'entityName':
          return compare(a.entityName, b.entityName, isAsc);
        case 'taskType':
          return compare(a.taskType, b.taskType, isAsc);
        case 'time':
          return compare(a.time, b.time, isAsc);
        case 'contactPerson':
          return compare(a.contactPerson, b.contactPerson, isAsc);
        case 'notes':
          return compare(a.notes || '', b.notes || '', isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        default:
          return 0;
      }
    });
  }

  dataSource = new MatTableDataSource(this.sortedData);
  setShowBackdrop() {
    this.showBackdrop = true;
    this.dialogConfig.hasBackdrop = true;
    this.dialog.open(TaskFormComponent, this.dialogConfig);
  }
  displayedColumns: string[] = [
    'date',
    'entityName',
    'taskType',
    'time',
    'contactPerson',
    'notes',
    'status',
    'options',
  ];
  applyFilter(event: Event) {
    event.preventDefault();
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setEditModal() {
    this.showBackdrop = true;
    this.dialogConfig.hasBackdrop = true;
    this.dialog.open(EditTaskFormComponent, this.dialogConfig);
  }

  hideShowBackdrop() {
    this.showBackdrop = false;
    this.dialogConfig.hasBackdrop = false;
  }

  getTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks.tasks;
      this.dataSource = new MatTableDataSource(this.tasks);
    });
  }

  toggleMenu() {
    this.trigger?.openMenu();
  }

  applyTaskTypeFilter(type: string, event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      this.tasks = this.tasks.filter((task) => task.taskType === type);
      this.dataSource = new MatTableDataSource(this.tasks);
    } else {
      this.getTasks();
    }
  }

  openEditModal(id: string | undefined) {
    const dialogRef = this.dialog.open(EditTaskFormComponent, {
      height: '100vh',
      width: '50vw',
      data: {
        taskId: id,
      },
    });
    dialogRef.afterClosed().subscribe();
  }
  changeStatus(id: string | undefined) {
    this.taskService.changeTaskStatus(id).subscribe();
    this.getTasks();
  }
  ngOnInit() {
    this.getTasks();
  }

  createDuplicate(id: string | undefined) {
    const task = this.tasks.find((task) => task._id === id) as Partial<Task>;
    this.taskService
      .createTask(task)
      .subscribe((res: any) => this.tasks.push(res.data));
  }

  deleteTask(id: string | undefined) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.getTasks();
    });
  }
  openModal() {
    this.modal?.open();
    this.setShowBackdrop();
  }
}
