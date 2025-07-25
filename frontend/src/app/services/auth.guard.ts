import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole = route.data['role'];
    const isAuth = this.authService.isAuth();
    const userRole = this.authService.getRole();

    if (isAuth) {
      if (expectedRole && userRole === expectedRole) {
        return true;
      } else {
        this.router.navigate(['/access-denied']);
        return false;
      }
    } else {
      // Check jika path termasuk admin
      if (state.url.startsWith('/admin')) {
        this.router.navigate(['/admin/login']);
      } else {
        this.router.navigate(['/login']);
      }
      return false;
    }
  }
}
