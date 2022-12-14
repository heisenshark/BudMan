
export interface AccountModel{
  id:string,
  name:string,
  active:boolean,
  balance:number
}

export interface CategoryModel{
  id:number,
  name:string,
  status:boolean
}

export interface UserModel{
  id:string,
  login:string,
  accounts:AccountModel[],
  categories:CategoryModel[]
}
