import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  animations: [
    trigger('openclose', [
      state('open', style({
        transform: 'translateX(0%)',
        backgroundColor: 'blue'

      })),
      state('closed', style({
        transform: 'translateX(100%)',
        backgroundColor: 'yellow'

      })),
      transition('closed => open', [
        animate('0.5s')
      ]),
      transition('open => closed', [
        animate('0.5s')
      ])
    ])
  ]
})
export class NavMenuComponent implements OnInit {


  @Input()  isOpen:boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
            isClosed:boolean = true;
  constructor() {
  }

  ngOnInit(): void {
  }

  toggle() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen)
  }

}
