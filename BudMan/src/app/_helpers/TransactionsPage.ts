import { Transaction } from '../Transaction';
export interface TransacionsPage{
  totalItems:number,
  totalPages:number,
  currentPage:number,
  transactions:Transaction[]
}
