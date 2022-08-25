import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { Transaction } from '../Transaction';
@Injectable({
  providedIn: 'root'
})
export class UiService {

  private showAddTask:boolean = false
  private subject:any = new Subject()
  private showAddTransaction = false
  private addTransactionSubject:any = new Subject()

  private edittedTrans:Transaction|null= null
  constructor() { }

  toggleAddTask():void {
    this.showAddTask = !this.showAddTask
    this.subject.next(this.showAddTask)
  }

  onToggle():Observable<any>{
    return this.subject.asObservable()
  }

  displayAddTransaction(show:boolean):void {
    this.showAddTransaction = show
    this.addTransactionSubject.next(this.showAddTransaction)
  }

  onToggleAddTransaction():Observable<any>{
    return this.addTransactionSubject.asObservable()
  }

  setEdittedTransaction(trans: Transaction){
    this.edittedTrans = trans
  }

  clearEdittedTrans(){
    this.edittedTrans = null
  }

  getEdittedTrans(){
    return this.edittedTrans
  }
}
