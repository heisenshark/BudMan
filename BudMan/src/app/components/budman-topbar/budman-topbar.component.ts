import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-budman-topbar',
  templateUrl: './budman-topbar.component.html',
  styleUrls: ['./budman-topbar.component.scss']
})
export class BudmanTopbarComponent implements OnInit {

  constructor() { }

  menuOpen:boolean = false
  navOpen:boolean = false;

  ngOnInit(): void {
  }


  openMenu(value:boolean){
    this.navOpen = true;
  }

  menuIsOpen() {

  }
}
