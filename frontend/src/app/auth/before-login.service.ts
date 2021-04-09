import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class BeforeLoginService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (!this.authService.isLoggedIn) { // se non è loggato allora può  (return true)
      return true;
    }

    // Store the attempted URL for redirecting
    this.authService.redirectURL = url;

    // Navigate to the login page with extras
    this.router.navigate(['/dashboard'], {queryParams: {r: url}});
    return false;
  }
}
