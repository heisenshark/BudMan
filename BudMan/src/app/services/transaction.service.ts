import { Observable, of, concat,switchMap,map ,catchError,tap,takeLast} from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../Transaction';
// import { getRandomTrans } from '../mock-data'
import { AuthServiceService } from './auth-service.service';
import { AccountModel, UserModel } from '../_helpers/HelperModels';
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
export class TransactionService {
  private apiUrl = "http://localhost:8080/api/v1/transactions/"
  private apiUrl_acc = "http://localhost:8080/api/v1/users/"
  private apiUrl_cat = "http://localhost:5000/categories"

  constructor(private http:HttpClient,
    private auth:AuthServiceService) { }


  getTransactions():Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.apiUrl)
  }
  addTransaction(trans:Transaction):Observable<Transaction>{
    return this.http.post<Transaction>(this.apiUrl,trans,httpOptions)
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
