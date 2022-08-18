import { Component, OnInit } from '@angular/core'

import { TASKS } from '../../../mock-tasks'
import { Task } from 'src/app/Task'
import { TaskServiceService } from 'src/app/services/task-service.service'

import { Observable, of } from 'rxjs'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = TASKS;

  constructor(private taskService: TaskServiceService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks
    })
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((n) => n.id != task.id))
      )
  }

  toggleTask(task: Task) {
    task.reminder = !task.reminder
    this.taskService.updateTaskReminder(task).subscribe()
  }

  onAddTask(task:Task) {
    this.taskService.addTask(task).subscribe((t) =>(this.tasks.push(t) ))
  }
}
