import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router"
import { Observable } from "rxjs"
import { AuthServiceService } from '../services/auth-service.service'

@Injectable()
export class LoginActivate implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    let notlogged: boolean = !this.authService.isLoggedIn()

    if (this.router.url == "/login" ||
      this.router.url == "/register" ||
      this.router.url == "/forgot") {
        notlogged && this.router.navigate(["transactions"])
        return true
    }
    if (notlogged)
      this.router.navigate(['login'])
    return true
  }
}
