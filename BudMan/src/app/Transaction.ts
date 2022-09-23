import { CategoryModel, AccountModel } from './_helpers/HelperModels';
export interface Transaction{
  id?:string
  amount:number
  name: string
  category:CategoryModel
  account:AccountModel
  date: Date
  categoryId:number
}
