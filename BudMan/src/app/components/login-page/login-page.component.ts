import { Component, OnInit } from '@angular/core'
import { AuthServiceService } from '../../services/auth-service.service'
import { Router } from '@angular/router'
import { HttpResponse } from '@angular/common/http'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  title: any


  stateenum = {
    LOGIN: 1,
    REGISTER: 2,
    FORGOTPASSWORD: 3
  }

  public state: any = this.stateenum.LOGIN
  public login: string = ""
  public password: string = ""
  public email: string = ""
  public errorMessage: string = ""
  constructor(private authSErvice: AuthServiceService, private router: Router) {

  }

  ngOnInit(): void {
    switch (this.router.url) {
      case "/login":
        this.title = "log in\nto BudMan"
        this.state = this.stateenum.LOGIN
        break
      case "/register":
        this.title = "Register\nto BudMan"
        this.state = this.stateenum.REGISTER
        break
      case "/forgot":
        this.title = "Tell us your\nemail"
        this.state = this.stateenum.FORGOTPASSWORD
        break
    }
  }

  takeAction() {

    switch (this.router.url) {
      case "/login":
        if (this.login == "" ||
          this.password == "") {
          this.errorMessage = "please fill all fields :(((("
          break
        }
        this.authSErvice.signIn(this.login, this.password)
        break
      case "/register":
        if (this.login == "" ||
          this.email == "" ||
          this.password == "") {
          this.errorMessage = "please fill all fields :(((("
          break
        }
        this.authSErvice.register(this.login, this.password, this.email).subscribe({
          next: data => {
            console.log('dupaasd')
          },
          error: error => {
            console.log('dupa')
          }
        }
        )
        break
      case "/forgot":
        if (this.email == "") {
          this.errorMessage = "please fill all fields :(((("
          break
        }
        this.title = "it wont really work as\n I am not implementing\n sending email in this app"
        break

    }

  }

  hasRoute(route: string) {

    console.log(this.router.url + "   " +
      this.router.url === route
    )
    return this.router.url === route
  }

}
