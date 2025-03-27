import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      if (localStorage.getItem('token')) {
        return true;
      } else {
        this.router.navigateByUrl('unauthorized');
        return false;
      }
    } catch (error) {
      this.router.navigateByUrl('unauthorized');
      return false;
    }
  }
}
