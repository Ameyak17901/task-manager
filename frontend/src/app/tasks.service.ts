import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/Task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get(`${this.url}/tasks`);
  }

  createTask(task: Partial<Task>): Observable<any> {
    return this.http.post(`${this.url}/tasks`, JSON.stringify(task), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  editTask(task: Partial<Task>, id: string): Observable<any> {
    console.log(id, task);
    return this.http.put(`${this.url}/tasks/${id}`, JSON.stringify(task), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  changeTaskStatus(id: string | undefined) {
    return this.http.put(`${this.url}/tasks/${id}/status`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
