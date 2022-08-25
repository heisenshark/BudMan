import { Component, OnInit } from '@angular/core'
import { UiService } from '../../services/ui.service'
import { Subscription, Observable } from 'rxjs'
import { TransactionService } from 'src/app/services/transaction.service'
import { Transaction } from '../../Transaction'
import { TaskServiceService } from '../../services/task-service.service'
import { getRandomTrans } from '../../mock-data'
import { MatPaginatorModule } from '@angular/material/paginator'
import { PageEvent } from '@angular/material/paginator'

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
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  range: any
  startDate: Date = new Date();
  picker: Date = new Date();
  dateDisabled: boolean = false;
  addTransSub: Subscription
  showAddTrans: boolean = false

  transactions: Transaction[] = []//[{'id':1, 'amount':123,'name':'xd','category':'sadsad','account':'asd','date':new Date()}]
  transactionsUI: Transaction[] = []
  pageSize: number = 5
  pageIndex: number = 0
  pageSizeOptions = [6, 5, 10, 25, 50, 100]
  pageEvent!: PageEvent

  constructor(private uiService: UiService,
    private trasactionService: TransactionService
  ) {
    this.addTransSub =
      uiService
        .onToggleAddTransaction()
        .subscribe(val => this.showAddTrans = val)

  }

  ngOnInit(): void {
    this.trasactionService.getTransactions().subscribe(
      (transactions) => {
        this.transactions = transactions
        this.transactionsUI = transactions.slice(0, this.pageSize)
      }
    )
  }

  onAddTransactionClick() {
    this.uiService.displayAddTransaction(true)
  }

  getTransactionsToUI() {
    if (this.pageEvent) {
      this.pageIndex = this.pageEvent.pageIndex
      this.pageSize = this.pageEvent.pageSize
    }
    let en = (this.pageIndex + 1) * this.pageSize
    let st = (this.pageIndex) * this.pageSize
    this.transactionsUI = this.transactions.slice(st, en > this.transactions.length ? undefined : en)
  }

  deleteTransaction(t: Transaction) {
    if (t.id == undefined) return
    this.trasactionService.deleteTransaction(t.id).subscribe(
      () => {
        this.transactions = this.transactions.filter(trans => trans.id != t.id)
        this.getTransactionsToUI()
      }
    )
  }
  openEditWindow(t: Transaction) {
    this.uiService.setEdittedTransaction(t)
    this.uiService.displayAddTransaction(true)
  }
  aaa() {
    this.trasactionService.addTransaction(getRandomTrans(1)[0]).subscribe((trans) => {
      this.transactions.push(trans)
      this.getTransactionsToUI()
    })
    //this.trasactionService.randomShit()
  }
  addTransaction(t: Transaction) {
    this.trasactionService.addTransaction(t).subscribe(
      tr => { this.transactions.push(tr) }

    )
  }
  editTransaction(t: Transaction) {
    this.trasactionService.updateTransaction(t).subscribe((tr) => {
      let man = this.transactions.find((tr) => { return tr.id == t.id })
      if (!man) return
      Object.assign(man, t)
      this.getTransactionsToUI()
    })
  }
}
