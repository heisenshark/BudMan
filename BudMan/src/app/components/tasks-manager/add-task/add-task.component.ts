import { Component, OnInit, EventEmitter } from '@angular/core'
import { Task } from '../../../Task'
import { Output } from '@angular/core'
import { UiService } from 'src/app/services/ui.service'
import { Subscription } from 'rxjs'
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  task: string = ""
  day: string = ""
  reminder: boolean = false
  showAddTask: boolean = false
  subscription:Subscription
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter<Task>()

  constructor(private uiservice: UiService) {
    this.subscription = this.uiservice.onToggle()
      .subscribe(v => this.showAddTask = v)
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.task) {
      alert('please add some task name')
      return
    }

    const t = {
      text: this.task,
      day: this.day,
      reminder: this.reminder
    }

    this.onAddTask.emit(t)

    //TODO - emit event
    this.task = ''
    this.day = ''
    this.reminder = false

  }

}
