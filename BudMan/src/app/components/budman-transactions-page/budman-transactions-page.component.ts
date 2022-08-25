import { Component, OnInit } from '@angular/core'
import { UiService } from '../../services/ui.service'
import { Subscription, Observable } from 'rxjs'
import { TransactionService } from 'src/app/services/transaction.service'
import { Transaction } from '../../Transaction'
import { TaskServiceService } from '../../services/task-service.service'
import { getRandomTrans } from '../../mock-data'
import { MatPaginatorModule } from '@angular/material/paginator'
import { PageEvent } from '@angular/material/paginator'
import { date } from 'random-js'
import { DateRange } from '@angular/material/datepicker'
import { FormControl, FormGroup } from '@angular/forms'

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

  categories: any[] = [
    ['prawdziwki', true],
    ['prawdziwki', true],
    ['prawdziwki', true],
    ['prawdziwki', true],
    ['prawdziwki', true],
    ['prawdziwki', true],
    ['prawdziwki', true],
  ];
  accounts = [
    ['oszczędnościowe', true],
    ['debetowe', true],
  ]
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
  pageSizeOptions = [5, 10, 25, 50, 100]
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
    this.categories = []
    this.accounts = []

    this.trasactionService.getTransactions().subscribe(
      (transactions) => {
        this.transactions = transactions
        this.transactionsUI = transactions.slice(0, this.pageSize)
      }
    )

    this.trasactionService.getCategories().subscribe(

      (cats) => cats.map(
        (cat: string) => {
          this.categories.push([cat, true])
        }
      )

    )
    this.trasactionService.getAccounts().subscribe(

      (accs) =>
        accs.map((acc: string) => {
          this.accounts.push([acc, true])
        })

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
      tr => {
        this.transactions.push(tr)
        this.getTransactionsToUI()
      }
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


  fun() {
    console.log(this.categories)
  }

  manipulateFilter(str: string) {
    switch (str) {
      case 'sa':
        this.accounts.forEach(n => n[1] = true)
        break
      case 'da':
        this.accounts.forEach(n => n[1] = false)
        break
      case 'sc':
        this.categories.forEach(n => n[1] = true)
        break
      case 'dc':
        this.categories.forEach(n => n[1] = false)
        break
    }
  }
  filterTransactions() {
    if (Math.random() > 0.7) this.filterError = "erorrTest"
    else this.filterError = null


    this.trasactionService.getTransactions().subscribe(
      (transs) => {
        this.transactions = []
        this.transactions = transs.filter(
          (trans) => {
            let acc = this.accounts.find((n) => { return n[0] == trans.account && n[1] == true })
            let cat = this.categories.find((n) => { return n[0] == trans.category && n[1] == true })
            let td= new Date(trans.date).getTime()
            console.log(`${acc} ${cat} ${new Date(td).getTime() }`)
            return acc != undefined && cat != undefined
              && (this.dateDisabled ||
                (td < this.dateRange.value.end.getTime()
                  && td > this.dateRange.value.start.getTime()))

          }
        )

        this.getTransactionsToUI()
        console.log(transs)
        console.log(this.transactionsUI)
      }
    )


  }
}
