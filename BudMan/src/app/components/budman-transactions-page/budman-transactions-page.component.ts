import { Component, OnInit } from '@angular/core'
import { UiService } from '../../services/ui.service'
import { Subscription, Observable, switchMap} from 'rxjs'
import { TransactionService } from 'src/app/services/transaction.service'
import { Transaction } from '../../Transaction'
// import { getRandomTrans } from '../../mock-data'
import { MatPaginatorModule } from '@angular/material/paginator'
import { PageEvent } from '@angular/material/paginator'
import { date } from 'random-js'
import { DateRange } from '@angular/material/datepicker'
import { FormControl, FormGroup } from '@angular/forms'
import { TransactionAddDialogComponent, TransactionDialogData } from './transaction-add-dialog/transaction-add-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import { CategoryModel, AccountModel } from '../../_helpers/HelperModels';

interface Food {
  value: string
  viewValue: string
}
@Component({
  selector: 'app-budman-transactions-page',
  templateUrl: './budman-transactions-page.component.html',
  styleUrls: ['./budman-transactions-page.component.scss']
})
export class BudmanTransactionsPageComponent implements OnInit {
  options: any[] = [
    'xd',
    'hf'
  ];

  public categories: [CategoryModel,boolean][] = [];
  public accounts: [AccountModel,boolean][] = [];
  filterError: string | null = null

  range: any
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  startDate: Date = new Date();
  picker: Date = new Date();
  dateDisabled: boolean = true;
  addTransSub: Subscription
  showAddTrans: boolean = false

  transactions: Transaction[] = []//[{'id':1, 'amount':123,'name':'xd','category':'sadsad','account':'asd','date':new Date()}]
  transactionsUI: Transaction[] = []
  pageSize: number = 25
  pageIndex: number = 0
  pageCount: number = 0
  totalItems:number =0
  pageSizeOptions = [5, 10, 25, 50, 100]
  pageEvent!: PageEvent

  dialogdata: TransactionDialogData | undefined

  constructor(private uiService: UiService,
    private trasactionService: TransactionService,
    public dialog: MatDialog
  ) {
    this.addTransSub =
      uiService
        .onToggleAddTransaction()
        .subscribe(val => {
          console.log('dupa')
          this.showAddTrans = val})
  }
  //TODO: przechowywanie wszystkich transakcji w jakimś serwisie
  //TODO: rozbić to gówno na jakieś mniejsze komponenty

  ngOnInit(): void {
    this.trasactionService.getFullUser().subscribe(
      x=>{
        this.accounts = x.accounts.map((acc) => [acc, true])
        this.categories = x.categories.map(x=>[x,true])
        let cat = this.categories.map(n=>n[0].id)
        let acc = this.accounts.map(n=>n[0].id)
        this.trasactionService.getTransactions(this.pageIndex,this.pageSize,acc,cat).subscribe(
          (transPage) => {
            this.transactions = transPage.transactions
            this.pageIndex = transPage.currentPage
            this.pageCount =transPage.totalPages
            this.totalItems = transPage.totalItems
            this.transactions.forEach(x =>{
              x.category = this.getCategoryById(x.categoryId)
              x.accountMod = this.getAccountById(x.accountId)
            })
            this.transactionsUI = transPage.transactions
            console.log(transPage)
              }
        )

      }
    )

    this.trasactionService.onAddTrans.subscribe(
      n=>{
        console.log('dupa')
        console.log(n.id)
        this.transactions.push(n)
        this.getTransactionsToUI()
      }
    )

    this.trasactionService.onEditTrans.subscribe(
      t=>{
        this.transactions.forEach( x => {
          if(x.id===t.id)
            Object.assign(x,t)
        })
        this.getTransactionsToUI()
      }
    )
  }

  onAddTransactionClick() {
    const dialogRef = this.dialog.open(TransactionAddDialogComponent, {
      width: '400px',
    })

    dialogRef.afterClosed().subscribe(result => {
      this.uiService.clearEdittedTrans()
      console.log(this.uiService.getEdittedTrans())
      this.dialogdata = result
    })

  }

  getTransactionsToUI() {
    if (this.pageEvent) {
      this.pageIndex = this.pageEvent.pageIndex
      this.pageSize = this.pageEvent.pageSize
    }

    // let en = (this.pageIndex + 1) * this.pageSize
    // let st = (this.pageIndex) * this.pageSize
    // this.transactionsUI = this.transactions.slice(st, en > this.transactions.length ? undefined : en)
    let cat = this.categories.filter(n=>n[1]).map(n=>n[0].id)
    let acc = this.accounts.filter(n=>n[1]).map(n=>n[0].id)
    this.trasactionService.getTransactions(this.pageIndex,this.pageSize,acc,cat).subscribe(
  (transPage) => {
        this.transactions = transPage.transactions
        this.pageIndex = transPage.currentPage
        this.pageCount =transPage.totalPages
        this.totalItems = transPage.totalItems
        this.transactions.forEach(x =>{
          x.category = this.getCategoryById(x.categoryId)
          x.accountMod = this.getAccountById(x.accountId)
        })
        this.transactionsUI = transPage.transactions
        console.log(transPage)
      }
    )

}

  deleteTransaction(t: Transaction) {
    if (t.id == undefined) return
    this.trasactionService.deleteTransaction(t).subscribe(
      (trans) => {
        console.log(trans)
        this.transactions = this.transactions.filter(tt => tt.id != t.id)
        this.getTransactionsToUI()
      }
    )
  }
  openEditWindow(t: Transaction) {
    this.uiService.setEdittedTransaction(t)
    const dialogRef = this.dialog.open(TransactionAddDialogComponent, {
      width: '400px',
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      this.uiService.clearEdittedTrans()
      console.log(this.uiService.getEdittedTrans())
      this.dialogdata = result
    })

  }
  editTransaction(t: Transaction) {
    this.trasactionService.updateTransaction(t).subscribe((tr) => {
      let man = this.transactions.find((tr) => { return tr.id == t.id })
      if (!man) return
      Object.assign(man, t)
      this.getTransactionsToUI()
    })
  }


  fun() {
    console.log(this.categories)
  }

  manipulateFilter(str: string) {
    switch (str) {
      case 'selectAccounts':
        this.accounts.forEach(n => n[1] = true)
        break
      case 'deselectAccounts':
        this.accounts.forEach(n => n[1] = false)
        break
      case 'selectCategories':
        this.categories.forEach(n => n[1] = true)
        break
      case 'deselectCategories':
        this.categories.forEach(n => n[1] = false)
        break
    }
  }
  filterTransactions() {
    this.pageIndex = 0
    this.getTransactionsToUI()
  }

  calculateBalance(): number {
    // return this.transactions.reduce(
    //   (acc, val) => {
    //     return acc + val.amount
    //   }
    //   , 0
    // )
    return 0
  }

  getCategoryById(id:number):CategoryModel{
    let xd = this.categories.find(x => x[0].id==id)
    if(xd == undefined)
      throw new Error("dup");
    return xd[0]
  }

  getAccountById(id:string):AccountModel{
    let xd = this.accounts.find(x=>x[0].id==id)
    if(xd==undefined)
      throw new Error("dupa")
    return xd[0]
  }
}
