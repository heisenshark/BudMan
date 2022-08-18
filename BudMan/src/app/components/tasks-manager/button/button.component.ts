import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor() { }

  @Input() color:string ='white'
  @Input() text:string = 'Click'

  @Output() buttonClick = new EventEmitter()

  ngOnInit(): void {
  }

  onClick(){
      this.buttonClick.emit()
  }
}
