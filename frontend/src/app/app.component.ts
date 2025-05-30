import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksTableComponent } from './tasks-table/tasks-table.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TasksTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'task-manager';
}
