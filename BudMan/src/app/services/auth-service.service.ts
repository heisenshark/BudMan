import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { firstValueFrom, Observable, concat, mergeMap, switchMap, take } from 'rxjs'
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
  currentUser!: loggedUser

  constructor(private http: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) {
    this.getUser().subscribe(user => this.currentUser = user)
  }

  public signIn(login: string, password: string) {

    this.http.post<Object>(`${this.apiUrl}/signin`,
      {
        "username": login,
        "password": password
      },
      httpOptions
    )
      .subscribe(
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

  public getUser(): Observable<loggedUser> {
    return this.http.get<loggedUser>(`${this.apiUrl}/user`)
  }

  isLoggedIn(): boolean {
    return this.cookie.getCookie("logged") === "true"
  }
}
