import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-budman-topbar',
  templateUrl: './budman-topbar.component.html',
  styleUrls: ['./budman-topbar.component.scss']
})
export class BudmanTopbarComponent implements OnInit {

  constructor() { }

  menuOpen:boolean = false

  ngOnInit(): void {
  }

  navOpen:boolean = false;

  openMenu(value:boolean){
    this.navOpen = true;
  }

  menuIsOpen() {

  }
}
