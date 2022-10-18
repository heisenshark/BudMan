import { Observable, of, concat,switchMap,map ,catchError,tap,takeLast, Subject} from 'rxjs';
import { HttpClient,HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Transaction } from '../Transaction';
// import { getRandomTrans } from '../mock-data'
import { AuthServiceService } from './auth-service.service';
import { AccountModel, UserModel, CategoryModel } from '../_helpers/HelperModels';
import { TransacionsPage } from '../_helpers/TransactionsPage';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

const httpOptions2 = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*"
  })
}




@Injectable({
  providedIn: 'root'
})
export class TransactionService implements OnInit{
  private apiUrl = "http://localhost:8080/api/v1/transactions/"
  private apiUrl_acc = "http://localhost:8080/api/v1/users/"

  onAddTrans: Subject<Transaction> = new Subject<Transaction>()
  onEditTrans: Subject<Transaction> = new Subject<Transaction>()

  accounts: AccountModel[] =[]
  categories: CategoryModel[] =[]
  userid:string = ""
  constructor(private http:HttpClient,
    private auth:AuthServiceService) {

      this.getFullUser().subscribe(
        x=>{
          this.accounts = x.accounts
          this.categories = x.categories
          this.userid = x.id
          console.log(x)
        }
      )

    }

  ngOnInit(): void {
      this.getFullUser().subscribe(
        x=>{
          this.accounts = x.accounts
          this.categories = x.categories
          console.log(x)
        }
      )
  }

  getTransactions(page:number,size:number,accounts:string[],categories:number[]):Observable<TransacionsPage>{
    let params:HttpParams = new HttpParams().set('page',page).set('size',size)
    return this.http.post<TransacionsPage>(`${this.apiUrl}filter/pagination`,
    {
      "accounts":accounts,
      "categories":categories
    }
    ,{params:params})
  }

  addTransaction(trans:Transaction):Observable<Transaction>{
    return this.http.post<Transaction>(this.apiUrl+`add`,
    {
      "amount": trans.amount,
      "name": trans.name,
      "accountId": trans.accountId,
      "date": trans.date,
      "categoryId": trans.categoryId
    }
    ,httpOptions)
  }

  deleteTransaction(trans:Transaction){
    const url = `${this.apiUrl}delete/${trans.id}`
    return this.http.delete(url,{responseType:'text'})
  }
  updateTransaction(trans:Transaction){
    console.log(`${trans.id}`)
    const url = `${this.apiUrl_acc}${this.userid}/${trans.accountId}/update`
    return this.http.put<Transaction>(url,    {
      "id":trans.id,
      "amount": trans.amount,
      "name": trans.name,
      "accountId": trans.accountId,
      "date": trans.date,
      "categoryId": trans.categoryId
    }
    ,httpOptions)
  }

  getAccounts():Observable<AccountModel[]>{
    let firstReq = this.auth.getUser();
    let nxtrq = firstReq.pipe(
      switchMap((res1) => res1 != undefined
        ? this.http.get<AccountModel[]>(this.apiUrl_acc + `${res1.id}/account/`).pipe(
          map((res2) => res2 ),
          catchError(() => of())
        )
        : of()
      )
    )
    return nxtrq;
  }
  getCategories():Observable<AccountModel[]>{
    let firstRequest = this.auth.getUser();
    let nextRequest = firstRequest.pipe(
      switchMap((res1) => res1 != undefined
        ? this.http.get<AccountModel[]>(this.apiUrl_acc + `${res1.id}/account/`).pipe(
          map((res2) => res2 ),
          catchError(() => of())
        )
        : of()
      )
    )
    return nextRequest;
  }
  getFullUser(): Observable<UserModel>{
    let firstReq = this.auth.getUser();
    // let nxtrq = firstReq.pipe(
    //   switchMap((res1) => res1 != undefined
    //     ? this.http.get<UserModel>(this.apiUrl_acc + `${res1.id}`).pipe(
    //       map((res2) => res2 ),
    //       catchError(() => of())
    //     )
    //     : of()
    //   )
    // )
    let nxtrq = firstReq.pipe(
      switchMap(res => {
        if(res == undefined)throw new Error("request not completed")
        return this.http.get<UserModel>(this.apiUrl_acc + `${res.id}`)
      }),
      catchError(()=>of())
    )
    return nxtrq;
  }
}
