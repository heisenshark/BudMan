import { CategoryModel, AccountModel } from './_helpers/HelperModels';
export interface Transaction{
  id?:string
  amount:number
  name: string
  category:CategoryModel
  accountMod:AccountModel
  accountId:string
  date: Date
  categoryId:number
}
