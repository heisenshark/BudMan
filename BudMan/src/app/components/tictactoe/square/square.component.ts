import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {BoardComponent} from "../board/board.component";

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {
  @Input() val:'X'|'O'|'' = ''
  @Input() s: number = 0
  @Output() valChange =new EventEmitter<'X'|'O'|''>();

  constructor() {
  }

  ngOnInit(): void {
  }
  @HostListener('click', ['$event']) click(event: { preventDefault: () => void; }) {
    event.preventDefault()
    if(this.val != '')
      return
    this.valChange.emit('X')
    console.log([this.s])
  }
  public static negateVal(v:'X'|'O'|'') :'X'|'O'{
    if(v =='X')return 'O'
    return 'X'
  }
  setVal(v:'X'|'O'|''){
    this.val = v
  }

}