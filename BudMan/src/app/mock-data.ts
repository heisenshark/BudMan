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

export function createRandomTransaction(): Transaction {
  return {
    amount: Math.floor(Math.random() * 2000 - 1000),
    name: faker.commerce.product(),
    category: faker.word.noun(),
    account: faker.commerce.department(),
    date: faker.date.past()
  }
}
export function getRandomTrans(n: number): Transaction[] {
  const transactions: Transaction[] = []
  Array.from({ length: n }).forEach(() => {
    transactions.push(createRandomTransaction())
  })
  return transactions
}
const httpClient = new HttpClient(new HttpXhrBackend({
  build: () => new XMLHttpRequest()
}))



