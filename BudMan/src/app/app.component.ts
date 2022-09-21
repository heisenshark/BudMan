import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UiService } from './services/ui.service'
import { AuthServiceService } from './services/auth-service.service';
import { CookieService } from './services/cookie-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "BudMan"

  constructor(private router: Router,
              private authService:AuthServiceService,
              private cookie:CookieService
    ) {
      console.log(this.cookie.getCookie("logged"))
  }

  hasRoute(route: string) {
    return this.router.url === route
  }

  getTheme(): boolean {
    return UiService.darkTheme
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
}
