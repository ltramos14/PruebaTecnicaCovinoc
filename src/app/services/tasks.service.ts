import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/Task.model';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  /**
   * Método que obtiene la lista de tareas de la API
   */
  getTasks() {
    return this.http.get<Task[]>(`${baseUrl}`);
  }

  /**
   * Método que crea una objeto de tarea en la API
   */
  createTask(task: Task) {
    return this.http.post<Task>(`${baseUrl}`, task);
  }

  /**
   * Método que elimina un objeto de Tarea de la API
   */
  deleteTask(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
