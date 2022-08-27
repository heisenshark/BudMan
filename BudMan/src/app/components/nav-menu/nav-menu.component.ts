import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { UiService } from '../../services/ui.service';
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

      })),
      state('closed', style({
        transform: 'translateX(100%)',
      })),
      transition('closed => open', [
        animate('0.3s')
      ]),
      transition('open => closed', [
        animate('0.3s')
      ])
    ])
  ]
})
export class NavMenuComponent implements OnInit {


  isClosed:boolean = true;

  constructor(private uiService: UiService) {
    uiService.onShowMobile().subscribe(
      (n) => this.isClosed = !n
    )
  }

  ngOnInit(): void {
  }

  toggle() {
    this.uiService.showMobile(false)
  }

}
