import { Observable, of} from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../Transaction';
import { getRandomTrans } from '../mock-data'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = "http://localhost:5000/transactions"

  constructor(private http:HttpClient) { }

  getTransactions():Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.apiUrl)
  }
  addTransaction(trans:Transaction):Observable<Transaction>{
    return this.http.post<Transaction>(this.apiUrl,trans,httpOptions)
  }

  deleteTransaction(index:number):Observable<Transaction>{
    const url = `${this.apiUrl}/${index}`
    return this.http.delete<Transaction>(url)
  }
  updateTransaction(trans:Transaction){
    console.log(`${trans.id}`)
    const url = `${this.apiUrl}/${trans.id}`
    return this.http.put<Transaction>(url,trans,httpOptions)
  }
  randomShit(){
    let xd = getRandomTrans(100)
    this.http.post<Transaction[]>(this.apiUrl, xd, httpOptions)
  }
}
