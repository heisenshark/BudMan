import { Observable, of, concat,switchMap,map ,catchError,tap,takeLast} from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Transaction } from '../Transaction';
// import { getRandomTrans } from '../mock-data'
import { AuthServiceService } from './auth-service.service';
import { AccountModel, UserModel, CategoryModel } from '../_helpers/HelperModels';
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
  private apiUrl_cat = "http://localhost:5000/categories"
  accounts: AccountModel[] =[]
  categories: CategoryModel[] =[]
  userid:string = ""
  constructor(private http:HttpClient,
    private auth:AuthServiceService) {

      this.getUserFull().subscribe(
        x=>{
          this.accounts = x.accounts
          this.categories = x.categories
          this.userid = x.id
          console.log(x)
        }
      )


    }

  ngOnInit(): void {
      this.getUserFull().subscribe(
        x=>{
          this.accounts = x.accounts
          this.categories = x.categories
          console.log(x)
        }
      )
  }

  getTransactions():Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.apiUrl)
  }
  addTransaction(trans:Transaction):Observable<Transaction>{
    return this.http.put<Transaction>(this.apiUrl_acc+`${this.userid}/account/${trans.account.id}/add`,
    {
      "amount": trans.amount,
      "name": trans.name,
      "account": trans.account.id,
      "date": trans.date,
      "categoryId": trans.categoryId
    }
    ,httpOptions)
  }

  deleteTransaction(index:string):Observable<Transaction>{
    const url = `${this.apiUrl}/${index}`
    return this.http.delete<Transaction>(url)
  }
  updateTransaction(trans:Transaction){
    console.log(`${trans.id}`)
    const url = `${this.apiUrl}/${trans.id}`
    return this.http.put<Transaction>(url,trans,httpOptions)
  }
  // randomShit(){
  //   let xd = getRandomTrans(100)
  //   this.http.post<Transaction[]>(this.apiUrl, xd, httpOptions)
  // }

  //category related stuff

  getAccounts():Observable<AccountModel[]>{


    console.log('accounts get')
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


    console.log('accounts get')
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


  getUserFull(): Observable<UserModel>{
    console.log('accounts get')
    let firstReq = this.auth.getUser();
    let nxtrq = firstReq.pipe(
      switchMap((res1) => res1 != undefined
        ? this.http.get<UserModel>(this.apiUrl_acc + `${res1.id}`).pipe(
          map((res2) => res2 ),
          catchError(() => of())
        )
        : of()
      )
    )
    return nxtrq;
  }
}
