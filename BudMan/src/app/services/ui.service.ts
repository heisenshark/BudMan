import { OverlayContainer } from '@angular/cdk/overlay'
import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { Transaction } from '../Transaction';
@Injectable({
  providedIn: 'root'
})
export class UiService {

  public static darkTheme:boolean = localStorage.getItem("mode") == "true"
  private showAddTask:boolean = false
  private subject:any = new Subject()
  private showAddTransaction = false
  private addTransactionSubject:any = new Subject()
  private showMobileNav: boolean = false
  private showMobileNavSubject:any = new Subject()
  darkClassName = 'darkMode';

  private edittedTrans:Transaction|null= null
  constructor(private overlay: OverlayContainer) { }
  ngOnInit(): void {
    if (UiService.darkTheme) {
      this.overlay.getContainerElement().classList.add(this.darkClassName);
    } else {
      this.overlay.getContainerElement().classList.remove(this.darkClassName);
    }

  }

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

  showMobile(b :boolean){
    this.showMobileNav = b
    this.showMobileNavSubject.next(b)
  }

  onShowMobile():Observable<any>{
    return this.showMobileNavSubject.asObservable()
  }

  toggleDarkTheme(){
    UiService.darkTheme=!UiService.darkTheme
    if (UiService.darkTheme) {
      this.overlay.getContainerElement().classList.add(this.darkClassName);
    } else {
      this.overlay.getContainerElement().classList.remove(this.darkClassName);
    }

    localStorage.setItem("mode", UiService.darkTheme?"true":"false" );

  }

}
