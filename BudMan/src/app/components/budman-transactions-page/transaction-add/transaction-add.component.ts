import { Component, Inject, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { FormControl } from '@angular/forms'
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core'
import { string } from 'random-js'
import { Transaction } from '../../../Transaction';
import { UiService } from '../../../services/ui.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class TransactionAddComponent implements OnInit {

  @Output() onAddTransaction: EventEmitter<Transaction> = new EventEmitter<Transaction>()
  @Output() onEditTransaction: EventEmitter<Transaction> = new EventEmitter<Transaction>()

  isEdit = false
  transToEdit!: any
  public name: string = ''
  public category: string = ''
  public account: string = ''
  public amount: string = ''
  date = new FormControl(new Date())

  error: string = ''
  info: string = ''

  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private uiService: UiService
  ) {
    this._locale = 'en-GB'
    _adapter.setLocale(this._locale)
  }

  ngOnInit(): void {
    this.transToEdit = this.uiService.getEdittedTrans()
    if(this.transToEdit == null) return
    this.isEdit=true
    console.log(this.transToEdit)
    console.log('dupa')
    let trans = (this.transToEdit as Transaction)
    //this.account = trans.account
    this.name = trans.name
    this.category = trans.category
    this.amount = `${trans.amount}`
    this.date.setValue(trans.date)
  }

  onSubmit() {
    this.info = ''
    this.amount = this.amount.toString().replace(',', '.')
    if (this.amount == undefined || +this.amount == 0) {
      this.error = 'Please Specify amount'
      return
    }
    if (this.name == '') {
      this.error = 'Please Specify a name'
      return
    }
    if (this.account == '') {
      this.error = 'Please Specify account'
      return
    }
    if (this.category == '') {
      this.error = 'Please Specify category'
      return
    }
    if (this.date.value == null) {
      this.error = 'Something went wrong'
      return
    }
    let  t :Transaction= {
      amount: +this.amount,
      name: this.name,
      category: this.category,
      account: {
        id:"sdfsdf",
        name:"234",
      },
      date: this.date.value
    }

    if (!this.isEdit) {
      this.onAddTransaction.emit(t)
      this.info = 'Transaction Added'
    }
    else {
      t.id = this.transToEdit.id
      this.onEditTransaction.emit(t)
      this.info = 'Transaction Editted'
      this.uiService.clearEdittedTrans()
      this.hideAddTrans()
    }
    this.error = ''
    this.name = this.amount = this.category = this.account = ''
    this.date.setValue(new Date())
  }

  hideAddTrans() {
    this.uiService.displayAddTransaction(false)
  }

}
