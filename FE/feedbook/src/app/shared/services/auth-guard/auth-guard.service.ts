import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    if (this.auth.isAuthenticated()) {
      return true
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false
  }
}
