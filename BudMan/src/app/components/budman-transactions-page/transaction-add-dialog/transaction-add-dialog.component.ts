import { Component, EventEmitter, OnInit, Output ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl } from '@angular/forms'
import { Transaction } from 'src/app/Transaction'
import { UiService } from '../../../services/ui.service';
import { TransactionService } from '../../../services/transaction.service';
import { CategoryModel, AccountModel } from '../../../_helpers/HelperModels';

export interface TransactionDialogData{
   name: string
   category: string
   account: string
   amount: string
}

@Component({
  selector: 'app-transaction-add-dialog',
  templateUrl: './transaction-add-dialog.component.html',
  styleUrls: ['./transaction-add-dialog.component.scss']
})
export class TransactionAddDialogComponent implements OnInit {

  @Output() onAddTransaction: EventEmitter<Transaction> = new EventEmitter<Transaction>()
  @Output() onEditTransaction: EventEmitter<Transaction> = new EventEmitter<Transaction>()


  isEdit = false
  transToEdit!: any
  public name: string = ''
  public category!: CategoryModel
  public account!: AccountModel
  public amount: string = ''
  date = new FormControl(new Date())

  error: string = ''
  info: string = ''

  accounts:AccountModel[] = []
  categories:CategoryModel[] = []

  constructor(
    public dialogRef: MatDialogRef<TransactionAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransactionDialogData,
    private uiService:UiService,
    private transactions:TransactionService
  ) {
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
    // this.transactions.getAccounts().subscribe(
    //   (n)=>{
    //     this.accounts = n
    //   }
    // )
    // transactions.getUserFull().subscribe(()=>{

    // })
    console.log('dupa')
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
    if (this.account == undefined) {
      this.error = 'Please Specify account'
      return
    }
    if (this.category == undefined) {
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
      account: this.account,
      date: this.date.value,
      categoryId:123
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
    this.name = this.amount = ''

    this.date.setValue(new Date())
  }

  hideAddTrans() {
    this.uiService.displayAddTransaction(false)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
