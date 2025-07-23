  import { Injectable } from '@angular/core';
  import { AuthService } from './auth.service';
  import { BehaviorSubject } from 'rxjs';

  @Injectable({
    providedIn: 'root',
  })
  export class LoginCheckService {
    private isLoggedInSubject = new BehaviorSubject<boolean>(
      this.authService.isAuth()
    );
    public isLoggedIn$ = this.isLoggedInSubject.asObservable();
    constructor(private authService: AuthService) {}

    checkLoginForPortal(): boolean {
      return this.authService.isAuth();
    }

    updateLoginStatus(): void {
      const status = this.authService.isAuth();
      this.isLoggedInSubject.next(status);
    }

    // startTokenExpiryCheck(intervalMs: number = 10000): void {
    //   setInterval(() => {
    //     const isExpired = this.authService.isTokenExpired();
    //     if (isExpired && this.isLoggedInSubject.value) {
    //       this.authService.logout().subscribe(() => {
    //         this.updateLoginStatus();
    //         location.reload();
    //       });
    //     }
    //   }, intervalMs);
    // }
  }
