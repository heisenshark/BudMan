import { Observable, of} from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../Transaction';
// import { getRandomTrans } from '../mock-data'

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
  private apiUrl_acc = "http://localhost:5000/accounts"
  private apiUrl_cat = "http://localhost:5000/categories"

  constructor(private http:HttpClient) { }

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

  getCategories():Observable<string[]>{
    return this.http.get<string[]>(this.apiUrl_cat)
  }

  getAccounts():Observable<string[]>{
    return this.http.get<string[]>(this.apiUrl_acc)
  }


}
