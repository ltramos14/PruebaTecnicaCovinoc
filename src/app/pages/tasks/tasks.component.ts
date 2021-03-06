import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/models/Task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  /**
   * Variable que contiene el conjunto de datos representados en la tabla
   */
  tasksList!: MatTableDataSource<Task>;

  /**
   * Variable que describe las columnas de la tabla que contiene la lista de tareas
   */
  displayedColumns: string[] = ['id', 'title', 'state', 'delete'];

  /**
   * Variable que almacena la lista de tareas
   */
  tasks: Task[] = [];

  /**
   * Declaración del formulario de nueva tarea
   */
  formTask!: FormGroup;


  constructor(
    private taskService: TasksService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
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
      this.tasks = data;
      this.tasksList = new MatTableDataSource(this.tasks);
    });
  }

  /**
   * Método que toma una nueva lista del formulario formTask para agregar una tarea a la API
   */
  createNewTask() {
    let task = new Task();
    let now = new Date();

    if (this.formTask.value.title === "") {
      this._snackBar.open('Debes asignarle un título a la tarea', 'OK', {
        duration: 3000,
      });
    } else {
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
  }

  /**
   * Método que elimina una tarea a través de su respectivo id
   * @param task
   */
  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.ngOnInit();
        this._snackBar.open('Tarea eliminada correctamente', 'OK', {
          duration: 3000,
        });
      },
      error: error => {
        console.log(error);
      }
    })
  }

  /**
   * Método que genera un evento de búsqueda de los tareas existentes en la tabla
   * cada vez que se escribe una palabra en el input de buscar
   */
  searchTask(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tasksList.filter = filterValue.trim().toLowerCase();
  }
}
