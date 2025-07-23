import { Injectable } from '@angular/core';
import { ApiService } from '../base/api.base.services';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrantService {
  private readonly endpoint = 'registrants';
  private readonly transactionEndpoint = 'my-transaction';
  private readonly historyEndpoint = `${this.endpoint}/${this.transactionEndpoint}`;
  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  /**
   * Creates a new registrant using the API with bearer token authentication.
   * @param data The data to submit for creating a registrant.
   * @returns An Observable of the response from the API.
   */
  createRegistrant(data: any): Observable<any> {
    const token = this.authService.getAuthToken();
    console.log('Ini Tokennya :', token);
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    console.log('Ini Headersnya', headers);
    return this.apiService.post(`${this.endpoint}`, data, { headers });
  }

  myTransaction(): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    return this.apiService.get(`${this.historyEndpoint}?embed=cost,status`, {
      headers,
    });
  }
}
