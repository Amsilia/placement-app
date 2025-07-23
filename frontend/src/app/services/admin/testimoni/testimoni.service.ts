import { Injectable } from '@angular/core';
import { ApiService } from '../../base/api.base.services';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root',
})
export class TestimoniService {
 
  private resourcePath = 'testimonials';

  constructor(private apiService: ApiService, private authService: AuthService) {}

  getAllTestimonies(
    page: number = 1,
    limit: number | null = 10,
    search: string = '',
    isPublished: boolean | null = null
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit ? limit.toString() : '1000');

    if (search) {
      params = params.set('search[name]', search);
      // Jika backend mendukung pencarian berdasarkan 'job' juga:
      // params = params.set('search[job]', search);
    }

    if (isPublished !== null) {
      params = params.set('is_published[eq]', isPublished.toString());
    }
    
    const headers = this.authService.createAuthHeaders();
    // Gunakan resourcePath di sini
    return this.apiService.get<any>(this.resourcePath, { params, headers });
  }

  getTestimoniById(id: string): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    // Gabungkan resourcePath dengan ID
    return this.apiService.get<any>(`${this.resourcePath}/${id}`, { headers });
  }

  createTestimoni(data: any): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    // Gunakan resourcePath di sini
    return this.apiService.post<any>(this.resourcePath, data, { headers });
  }

  updateTestimoni(id: string, data: any): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    // Gabungkan resourcePath dengan ID
    return this.apiService.put<any>(`${this.resourcePath}/${id}`, data, { headers });
  }

  deleteTestimoni(id: string): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    // Gabungkan resourcePath dengan ID
    return this.apiService.delete<any>(`${this.resourcePath}/${id}`, { headers });
  }

  deleteMultipleTestimonies(ids: string[]): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    const options = {
      headers: headers,
      body: { ids: ids }
    };
    // Gunakan resourcePath di sini
    return this.apiService.delete<any>(this.resourcePath, options);
  }
}