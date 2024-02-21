import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateUserService implements CanLoad {
  constructor(private cookie: CookieService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // Case 1: If user login via Login Credentials check data
    if (this.cookie.check('username') && this.cookie.check('token')) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
