import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router"
import { Observable } from "rxjs"
import { AuthServiceService } from '../services/auth-service.service'

@Injectable()
export class TransactionActivate implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let logged: boolean = this.authService.isLoggedIn()
    if (logged) {
        this.router.navigate(["transactions"])
    }
    return true
  }
}
