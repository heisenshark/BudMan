import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'

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

  constructor(private http: HttpClient) { }

  public signIn(login: string, password: string) {

    this.http.post<Object>(`${this.apiUrl}/signin`,
      {
        "username": login,
        "password": password
      },
      httpOptions
    ).
      subscribe((n) => {
        console.log(n)
        console.log((n as HttpResponse<any>).headers)

      })


  }

  signUp() {

  }


}
