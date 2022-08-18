import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tasks-item',
  templateUrl: './tasks-item.component.html',
  styleUrls: ['./tasks-item.component.scss'],
})
export class TasksItemComponent implements OnInit {
  @Input() task: Task = {
    id: 0,
    text: 'NULLL',
    day: 'TEST DAY',
    reminder: false,
  };

  @Output() onDeleteEvent = new EventEmitter()
  @Output() onToggleEvent = new EventEmitter()

  faTimes = faTimes
  constructor() {}

  ngOnInit(): void {}

  onDelete(val: Task){
    console.log('dupa')
    this.onDeleteEvent.emit()
  }

  onToggleReminder(){
    this.onToggleEvent.emit()
  }
}
