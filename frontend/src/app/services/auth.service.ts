import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
// import { inject } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //   private BaseUrl = process.env['BASE_URL'];
  //   private Url = `${this.BaseUrl}/api/auth`;
  private Url = `${environment.baseUrl}/auth`;
  private apiUrl = `${environment.baseUrl}/api`;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private routes: Router
  ) {}

  /**
   * Registers a new user in the application.
   * @param userData An object containing the user's data, which must include at least the username, email, and password.
   * @returns An Observable that emits the newly registered user's data.
   */
  register(userData: any): Observable<any> {
    return this.http.post(`${this.Url}/register`, userData);
  }

  verifyEmail(token: string) {
    return this.http.get(
      `${environment.baseUrl}/auth/verify-email?token=${token}`
    );
  }

  /**
   * Logs in to the application.
   * @param data An object containing the user's email, password, and rememberMe flag.
   * @returns An Observable that emits the logged in user's token.
   */
  login(data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }): Observable<any> {
    const authHeader = 'Basic ' + btoa(data.email + ':' + data.password);
    const headers = new HttpHeaders({
      Authorization: authHeader,
    });
    return this.http.post(
      `${this.Url}/login`,
      { rememberMe: data.rememberMe },
      { headers }
    );
  }

  /**
   * Sets the user's authentication token and JWT token as cookies.
   * @param token The user's authentication token.
   * @param jwtToken The user's JWT token.
   */
  setToken(token: string, jwtToken: string): void {
    this.cookieService.set('token', token, { path: '/' });
    this.cookieService.set('jwtToken', jwtToken, { path: '/' });
  }

  isTokenExpired(): boolean {
    const jwtToken = this.getJwtToken();
    if (!jwtToken) return true;

    try {
      const decode: any = jwtDecode(jwtToken);
      const now = Math.floor(Date.now() / 1000);
      return decode.exp < now;
    } catch (error) {
      console.log(error);
      return true;
    }
  }

  getRole(): string | null {
    const jwtToken = this.getJwtToken();
    if (!jwtToken) return null;

    try {
      const decode: any = jwtDecode(jwtToken);
      // return decoded.role?.code || null;
      return decode.user.role?.code || null;
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }

  /**
   * Gets the user's authentication token from a cookie.
   * @returns The user's authentication token, or an empty string if the cookie is not set.
   */
  getAuthToken(): string {
    return this.cookieService.get('token');
  }

  /**
   * Creates the HTTP headers with Authorization.
   *
   * @returns HttpHeaders with Authorization token.
   */
  createAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  /**
   * Gets the user's JWT token from a cookie.
   * @returns The user's JWT token, or an empty string if the cookie is not set.
   */
  getJwtToken(): string {
    return this.cookieService.get('jwtToken');
  }

  /**
   * Checks if the user is authenticated by verifying the presence of an authentication token.
   * @returns True if the authentication token exists, otherwise false.
   */
  isAuth(): boolean {
    const authToken = this.getAuthToken();
    const isTokenExpired = this.isTokenExpired();
    console.log(isTokenExpired);
    return !!authToken && !isTokenExpired;
  }

  // Get account info
  getMyAccount(): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get(`${environment.baseUrl}/api/my-account`, { headers });
  }

  updateMyAccount(userData: any): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.put(`${this.apiUrl}/my-account`, userData, { headers });
  }

  // Logout user
  logout(): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.post(`${this.Url}/logout`, {}, { headers }).pipe(
      tap(() => {
        this.routes.navigate(['/']);
        this.cookieService.delete('token');
        this.cookieService.delete('jwtToken');
      })
    );
  }

  private isLoggedIn$ = new BehaviorSubject<boolean>(this.isAuth());
  getLoginStatus(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  updateAuthState() {
    this.isLoggedIn$.next(this.isAuth());
  }
  getMyAccountStatus(): void {
    this.getMyAccount().subscribe({
      next: (response) => {
        console.log('User authenticated:', response);
        this.updateAuthState(); // Perbarui status login
      },
      error: (err) => {
        console.log('%cERRRORRRRRRRRRR', 'color: red');
        console.error('Authentication failed or token expired:', err);
        this.isLoggedIn$.next(false);
        this.cookieService.delete('token');
        this.cookieService.delete('jwtToken');
      },
    });
  }
}
