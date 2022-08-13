import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {



  @Input()Name:string = 'Name'
  @Input()Category:string = 'Category'
  @Input()Account:string = 'Account'
  @Input()Date: Date|string = 'Date'
  @Input()Amount:number|string = 'Amount'
  @Input()IsHeader:boolean = false

  BorderColors: string[] = [
      'rgb(243,97,97)',
      'rgb(112,243,97)'
  ];
  color: string
  constructor() {
    this.color = this.GetColor()
  }

  ngOnInit(): void {
  }
  GetColor():string{
    return this.BorderColors[Math.floor( Math.random()*2)%2]
  }
}
