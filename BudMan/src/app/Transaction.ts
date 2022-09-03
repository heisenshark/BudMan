export interface Transaction{
  id?:string
  amount:number
  name: string
  category:string
  account:{
    id:string,
    name:string
  }
  date: Date
}
