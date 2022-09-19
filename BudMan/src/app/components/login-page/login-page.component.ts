import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private authSErvice:AuthServiceService ) { }

  public login:string = ""
  public password:string = ""
  ngOnInit(): void {
  }

  logIn() {
    console.log('dupa')
    this.authSErvice.signIn(this.login,this.password)
  }

}
