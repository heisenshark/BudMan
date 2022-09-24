import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { firstValueFrom, Observable, concat,mergeMap,switchMap,take } from 'rxjs'
import { CookieService } from './cookie-service.service'
import { Router } from '@angular/router'
import { AccountModel } from '../_helpers/HelperModels'

export interface loggedUser {
  username: string,
  id: string
  roles: string[]
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  private apiUrl = "http://localhost:8080/api/auth"
  private JWTcookie: string = ""
  currentUser!: loggedUser

  constructor(private http: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) {
    this.getUser().subscribe(x=>this.currentUser = x)
  }

  public signIn(login: string, password: string) {

    this.http.post<Object>(`${this.apiUrl}/signin`,
      {
        "username": login,
        "password": password
      },
      httpOptions
    ).
      subscribe(
        {
          next: (n) => {
            this.cookie.setCookie({ name: "logged", value: "true" })
            this.router.navigateByUrl("/transactions")
            this.currentUser = n as loggedUser
            console.log(this.currentUser)
          },
          error: () => {
            this.cookie.setCookie({ name: "logged", value: "false" })
          }
        }
      )
  }

  signUp() {

  }

  public register(login: string, password: string, email: string): Observable<any> {
    return this.http.post<Object>(`${this.apiUrl}/signup`,
      {
        "username": login,
        "password": password,
        "email": email
      },
      httpOptions
    )
  }
  public logout() {
    this.http.get(`${this.apiUrl}/logout`).subscribe(() => { })
    this.cookie.setCookie({ name: "logged", value: "false" })
    this.router.navigateByUrl("/login")
    this.currentUser = { id: "", username: "", roles: [] }
  }

  public getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';')
    console.log(document.cookie)
    let caLen: number = ca.length
    let cookieName = `${name}=`
    let c: string

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '')
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length)
      }
    }
    return ''
  }

  public getUser(): Observable<loggedUser> {
    return this.http.get<loggedUser>(`${this.apiUrl}/user`)
    //this.http.get<AccountModel[]>('localhost:8080/api/v1/users/631c9ad60962f2743489ba61/account/').subscribe(x=>console.log(x))

    // xd.pipe((n) => {
    //   n.subscribe(
    //     n => {
    //       this.currentUser = n as loggedUser
    //       console.log(this.currentUser)
    //     }
    //   )
    //   return n
    // })
    // return xd
  }



  isLoggedIn(): boolean {
    return this.cookie.getCookie("logged") == "true"
  }

}