import { Component, ViewChild } from '@angular/core';
import { TaskFormComponent } from './task-form/task-form.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TasksService } from '../tasks.service';
import { Task } from '../../interfaces/Task';
import { EditTaskFormComponent } from './edit-task-form/edit-task-form.component';

@Component({
  selector: 'app-tasks-table',
  imports: [
    TaskFormComponent,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    EditTaskFormComponent,
  ],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.css',
})
export class TasksTableComponent {
  tasks: Task[] = [
    // {
    //   id: '1',
    //   date: '01/09/2025',
    //   entityName: 'ABC Private Limited',
    //   taskType: 'Call',
    //   time: '1:00 p.m',
    //   contactPerson: 'Frodo Baggins',
    //   notes: 'Important task',
    //   status: 'Open',
    // },
    // {
    //   id: '2',
    //   date: '01/09/2025',
    //   entityName: 'ABC Private Limited',
    //   taskType: 'Call',
    //   time: '1:00 p.m',
    //   contactPerson: 'Frodo Baggins',
    //   notes: 'Important task',
    //   status: 'Open',
    // },
    // {
    //   id: '3',
    //   date: '01/09/2025',
    //   entityName: 'ABC Private Limited',
    //   taskType: 'Call',
    //   time: '1:00 p.m',
    //   contactPerson: 'Frodo Baggins',
    //   notes: 'Important task',
    //   status: 'Closed',
    // },
    // {
    //   id: '4',
    //   date: '01/09/2025',
    //   entityName: 'ABC Private Limited',
    //   taskType: 'Call',
    //   time: '1:00 p.m',
    //   contactPerson: 'Frodo Baggins',
    //   notes: 'Important task',
    //   status: 'Open',
    // },
    // {
    //   id: '5',
    //   date: '01/09/2025',
    //   entityName: 'ABC Private Limited',
    //   taskType: 'Call',
    //   time: '1:00 p.m',
    //   contactPerson: 'Frodo Baggins',
    //   notes: 'Important task',
    //   status: 'Open',
    // },
  ];
  dialogConfig = new MatDialogConfig();
  @ViewChild('myModal', { static: false }) modal?: TaskFormComponent;
  @ViewChild('editModal', { static: false }) editModal?: EditTaskFormComponent;
  @ViewChild(MatMenuTrigger) trigger?: MatMenuTrigger;

  showBackdrop = false;
  constructor(public dialog: MatDialog, private taskService: TasksService) {}

  setShowBackdrop() {
    this.showBackdrop = true;
    this.dialogConfig.hasBackdrop = true;
    this.dialog.open(TaskFormComponent, this.dialogConfig);
  }

  hideShowBackdrop() {
    this.showBackdrop = false;
    this.dialogConfig.hasBackdrop = false;
  }

  getTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks.tasks;
    });
  }

  toggleMenu() {
    this.trigger?.openMenu();
  }

  openEditModal() {
    this.editModal?.showModal();
  }
  ngOnInit() {
    this.getTasks();
  }

  openModal() {
    this.modal?.open();
    this.setShowBackdrop();
  }
}
