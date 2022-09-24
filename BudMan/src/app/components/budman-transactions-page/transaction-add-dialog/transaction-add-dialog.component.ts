import { Component, EventEmitter, OnInit, Output ,Inject, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Transaction } from 'src/app/Transaction'
import { UiService } from '../../../services/ui.service';
import { TransactionService } from '../../../services/transaction.service';
import { CategoryModel, AccountModel } from '../../../_helpers/HelperModels';
import { BudmanTransactionsPageComponent } from '../budman-transactions-page.component';

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
  transactionGroup!: FormGroup;

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

  accountSelected!:AccountModel
  constructor(
    public dialogRef: MatDialogRef<TransactionAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransactionDialogData,
    private uiService:UiService,
    private transactions:TransactionService,
    private fb: FormBuilder ) {


      this.transactionGroup = new FormGroup({
        category: new FormControl(),
        account: new FormControl(),
        date: new FormControl(),
        amount:new FormControl(),
        name:new FormControl()
      })

  }
  ngOnInit(): void {
    console.log('dialog opened init ')
    this.isEdit= false
    this.accounts = this.transactions.accounts
    this.categories = this.transactions.categories
    console.log(this.uiService.getEdittedTrans())
    this.transToEdit = this.uiService.getEdittedTrans()
    if(this.transToEdit == null) return
    this.isEdit=true
    console.log(this.transToEdit)
    console.log('dupa')
    let trans = (this.transToEdit as Transaction)

    //this.account = trans.account
    this.name = trans.name


    this.transactionGroup = this.fb.group({
      category: [null,Validators.required],
      account: [null,Validators.required],
      date: new FormControl(trans.date),
      amount:new FormControl(trans.amount),
      name:new FormControl(trans.name)
    })


    //this.category = trans.category

    const toSelect = this.categories.find(c => c.id == trans.category.id);
    this.transactionGroup.controls['category'].setValue(toSelect);

    const acc = this.accounts.find(c => c.id == trans.account.id);
    this.transactionGroup.controls['account'].setValue(acc);

    //console.log(this.category)
    //this.amount = `${trans.amount}`
    //this.date.setValue(trans.date)


    // this.patientCategory.get('patientCategory').setValue(toSelect);
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

    console.table([this.transactionGroup.value])

    this.info = ''
    this.amount = this.amount.toString().replace(',', '.')

    let  t :Transaction= {
      amount: +this.transactionGroup.get('amount')?.value,
      name: this.transactionGroup.get('name')?.value,
      category: this.transactionGroup.get('category')?.value,
      account: this.transactionGroup.get('account')?.value,
      date: this.transactionGroup.get('date')?.value,
      categoryId: (this.transactionGroup.get('category')?.value as CategoryModel).id
    }

    if (!this.isEdit) {
      this.transactions.addTransaction(t).subscribe()
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
  getAccs(){
    return this.transactions.accounts
  }
  getCats(){
    return this.transactions.categories.filter(x=>x.status==true)
  }
}
