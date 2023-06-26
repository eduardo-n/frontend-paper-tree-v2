import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      try {
        if(sessionStorage.getItem('loggedUser')){
          return true;
        } else {
          this.router.navigateByUrl('/autenticacao');
          return false;
        }
      }
      catch {
        this.router.navigateByUrl('/autenticacao');
        return false;
      }
  }

}
