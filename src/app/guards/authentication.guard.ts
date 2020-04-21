import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.getCurrentUser()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

  getCurrentUser(): boolean {
    let value = false;
    this.authenticationService.currentUser.subscribe(user => {
      if (user != null) {
        value = true;
      }
    });
    return value;
  }

}
