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
  createTask(task: Partial<Task>): Observable<any> {
    return this.http.post(`${this.url}/tasks`, JSON.stringify(task), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
