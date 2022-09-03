import { faker } from '@faker-js/faker'
// import { faker } from '@faker-js/faker/locale/de';
import { Transaction } from './Transaction'

import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http'
import { Injectable } from '@angular/core'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
let apiUrl = "http://localhost:5000/transactions"


const accounts = [
  "account1",
  "account2",
  "account3"
]
const categories = [
  "category1",
  "category2",
  "category3",
  "category4",
  "category5",
  "category6",
  "category7",
  "category8"
]
// export function createRandomTransaction(): Transaction {
//   return {
//     amount: Math.floor(Math.random() * 2000 - 1000),
//     name: faker.commerce.product(),
//     category: categories[Math.floor(Math.random()*categories.length)],
//     account: accounts[Math.floor(Math.random()*accounts.length)],
//     date: faker.date.past(10)
//   }
// }
// export function getRandomTrans(n: number): Transaction[] {
//   const transactions: Transaction[] = []
//   Array.from({ length: n }).forEach(() => {
//     transactions.push(createRandomTransaction())
//   })
//   return transactions
// }
// const httpClient = new HttpClient(new HttpXhrBackend({
//   build: () => new XMLHttpRequest()
// }))


