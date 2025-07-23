import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../base/api.base.services';
import { AuthService } from '../../auth.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

 

  /**
   * Retrieves a list of registrants by year from the API.
   *
   * @param year Year to filter the registrants data.
   * @returns An Observable of the API response.
   */
  getRegistrantsByYear(year: number): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    console.log('Headernya :', headers);
    const params = { year };
    return this.apiService.get<any>('dashboard/registrant-year', {
      headers,
      params,
    });
  }

  /**
   * Fetch overall dashboard data.
   *
   * @returns An Observable of the API response.
   */
  getDashboardData(): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    console.log('Fetch API Dashboard data', headers);
    return this.apiService.get<any>('dashboard/data', { headers });
  }

  /**
   * Retrieves registrants data by batch.
   *
   * @param batch Batch number to filter the registrants data.
   * @returns An Observable of the API response.
   */
  getRegistrantsByBatch(batch: number): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    const params = { batch };
    return this.apiService.get<any>('dashboard/registrant-batch', {
      headers,
      params,
    });
  }

  /**
   * Retrieves registrants data by package.
   *
   * @returns An Observable of the API response.
   */
  getRegistrantsByPackage(): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    return this.apiService.get<any>('dashboard/registrant-package', {
      headers,
    });
  }
}
