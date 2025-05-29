import { Component, ViewChild } from '@angular/core';
import { TaskFormComponent } from './task-form/task-form.component';

interface Task {
  id: string;
  date: string;
  entityName: string;
  taskType: string;
  time: string;
  contactPerson: string;
  notes?: string;
  status: 'Open' | 'Closed';
}

@Component({
  selector: 'app-tasks-table',
  imports: [TaskFormComponent],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.css',
})
export class TasksTableComponent {
  
  tasks: Task[] = [
    {
      id: '1',
      date: '01/09/2025',
      entityName: 'ABC Private Limited',
      taskType: 'Call',
      time: '1:00 p.m',
      contactPerson: 'Frodo Baggins',
      notes: 'Important task',
      status: 'Open',
    },
    {
      id: '2',
      date: '01/09/2025',
      entityName: 'ABC Private Limited',
      taskType: 'Call',
      time: '1:00 p.m',
      contactPerson: 'Frodo Baggins',
      notes: 'Important task',
      status: 'Open',
    },
    {
      id: '3',
      date: '01/09/2025',
      entityName: 'ABC Private Limited',
      taskType: 'Call',
      time: '1:00 p.m',
      contactPerson: 'Frodo Baggins',
      notes: 'Important task',
      status: 'Closed',
    },
    {
      id: '4',
      date: '01/09/2025',
      entityName: 'ABC Private Limited',
      taskType: 'Call',
      time: '1:00 p.m',
      contactPerson: 'Frodo Baggins',
      notes: 'Important task',
      status: 'Open',
    },
    {
      id: '5',
      date: '01/09/2025',
      entityName: 'ABC Private Limited',
      taskType: 'Call',
      time: '1:00 p.m',
      contactPerson: 'Frodo Baggins',
      notes: 'Important task',
      status: 'Open',
    },
  ];

  @ViewChild('myModal', { static: false }) modal?: TaskFormComponent;

  showBackdrop = false;

  setShowBackdrop(){
    this.showBackdrop = true;
  }

  hideShowBackdrop(){
    this.showBackdrop = false;
  }

  openModal() {
    this.modal?.open();
    this.setShowBackdrop();
  }
}
