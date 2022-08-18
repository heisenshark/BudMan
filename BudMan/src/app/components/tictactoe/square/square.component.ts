import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {BoardComponent} from "../board/board.component";

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {
  @Input() val:'X'|'O'|'' = ''

  constructor() {
  }

  ngOnInit(): void {
  }
  getColor():string{
    switch (this.val){
      case 'X':
        return `linear-gradient(45deg, rgba(251,63,63,1) 0%, rgba(252,187,70,1) 100%)`
      case 'O':
          return 'linear-gradient(45deg, rgba(63,251,124,1) 0%, rgba(70,228,252,1) 100%)'
      case "":
        return "linear-gradient(45deg, rgba(63,94,251,1) 0%, rgba(163,70,252,1) 100%)"
    }

  }
}