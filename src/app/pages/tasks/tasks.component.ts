import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from 'src/app/models/Task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  /**
   * Variable que describe las columnas de la tabla que contiene la lista de tareas
   */
  displayedColumns: string[] = ['id', 'title', 'state', 'delete'];

  /**
   * Declaración del formulario de nueva tarea
   */
  formTask!: FormGroup;

  /**
   * Variable que almacena la lista de tareas
   */
  public tasksList: Task[] = [];


  constructor(
    private taskService: TasksService,
    private _formBuilder: FormBuilder
  ) { }


  ngOnInit() {
    this.getTasksList();

    this.formTask = this._formBuilder.group({
      title: '',
      state: false,
    });
  }

  /**
   * Método que obtiene la lista de tareas a través del TaskService
   */
  getTasksList() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasksList = data;
    });
  }

  /**
   * Método que toma una nueva lista del formulario formTask para agregar una tarea a la API
   */
  createNewTask() {
    let task = new Task();
    let now = new Date();

    task.createdAt = now;
    task.state = this.formTask.value.state;
    task.title = this.formTask.value.title;

    this.taskService.createTask(task).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: error => {
        console.log(error);
      }
    })
  }

  /**
   * Método que elimina una tarea a través de su respectivo id
   * @param task
   */
  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: error => {
        console.log(error);
      }
    })
  }


}
