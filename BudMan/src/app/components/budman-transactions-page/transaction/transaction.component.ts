import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common'
import { Transaction } from '../../../Transaction';
import { TransactionService } from '../../../services/transaction.service';
import { integer } from 'random-js'
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  @Input() Name: string = 'Name'
  @Input() Category: string = 'Category'
  @Input() Account: string = 'Account'
  @Input() Datee: Date | null= null
  @Input() Amount: number | string = 'Amount'
  @Input() IsHeader: boolean = false
  @Input() transaction!: Transaction

  @Output() onEdit = new EventEmitter<Transaction>()
  @Output() onDelete = new EventEmitter<Transaction>()

  DateOutput: Date | string = 'date'
  BorderColors: string[] = [
    'rgb(243,97,97)',
    'rgb(112,243,97)'
  ];
  color!: string
  constructor(private datePipe: DatePipe
    ) {
    if (typeof this.Datee == "string")
      console.log('dupa')
  }

  ngOnInit(): void {
    this.DateOutput = this.getDate()
    this.color = this.GetColor()

  }
  GetColor(): string {
    if( this.Amount >0)return this.BorderColors[1]
    else return this.BorderColors[0]
    // return this.BorderColors[Math.floor(Math.random() * 2) % 2]
  }

  getDate(): string {
    if (this.Datee == null) return 'date'
    let xd: string | null = this.datePipe.transform(this.Datee, 'dd/MM/yyyy')
    if (typeof xd == "string") return xd
    return 'date'
  }

}
