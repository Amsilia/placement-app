// src/app/services/admin/registrant/registrant.package.service.ts
import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/base/api.base.services'; // Pastikan PATH ini BENAR
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../auth.service'; // Pastikan PATH ini BENAR
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegistrantPackageService {
  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  // --- Metode yang sudah ada, tidak banyak perubahan ---
  getAllPackages(): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    return this.apiService.get<any>('packages', { headers });
  }

  getBatches(): Observable<any> {
    return this.apiService.get<any>('batches');
  }

  createPackage(data: any): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    return this.apiService.post<any>('packages', data, { headers });
  }

  updatePackage(data: any): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    return this.apiService.put<any>('packages', data, { headers });
  }

  getBatchByPackageId(packageId: string): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    return this.apiService.get<any>(`packages/${packageId}/batches`, {
      headers,
    });
  }

  createBatches(data: {
    package_id: string;
    batch_number: string;
    start_date: Date;
    end_date: Date;
    open_at: Date;
    close_at: Date;
    is_active: boolean;
  }): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    return this.apiService.post<any>('batches', data, { headers });
  }

  createBatch(data: any): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    return this.apiService.post<any>('batches', data, { headers });
  }

  getPrices(): Observable<any> {
    return this.apiService.get<any>('prices');
  }

  getPriceByBathcId(batchId: string): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    return this.apiService.get<any>(`batches/${batchId}/prices`, {
      headers,
    });
  }

  createPrice(data: any): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    return this.apiService.post<any>('prices', data, { headers });
  }
  // --- Akhir metode yang sudah ada ---


  /**
   * Mengambil data pendaftar berdasarkan ID Batch dengan paginasi, pencarian, dan filter.
   * @param batchId ID dari batch yang akan diambil datanya.
   * @param page Nomor halaman saat ini (default: 1).
   * @param limit Jumlah item per halaman (default: 10, disesuaikan dengan frontend).
   * @param search Query pencarian (akan dipetakan ke 'search[fullname]' di backend).
   * @param status (Opsional) Filter berdasarkan status.
   * @param priceType (Opsional) Filter berdasarkan tipe harga.
   * @returns Observable berisi respons API.
   */
  getRegistrantByBatchId(
    batchId: string, // Disarankan string jika itu UUID
    page: number = 1,
    limit: number = 10, // Default 10 agar cocok dengan itemsPerPage di komponen
    search: string = '',
    status?: string | null, // Opsional, bisa null atau string
    priceType?: string | null // Opsional, bisa null atau string
  ): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    let params = new HttpParams();

    params = params.set('page', page.toString());
    params = params.set('limit', limit.toString());

    if (search) {
      // Sesuai dengan response JSON Anda, parameter search adalah 'search[fullname]'
      params = params.set('search[fullname]', search);
    }

    if (status) { // Hanya tambahkan ke params jika bukan null/undefined/kosong
      params = params.set('status', status);
    }

    if (priceType) { // Hanya tambahkan ke params jika bukan null/undefined/kosong
      // Asumsi parameter di backend adalah 'priceType' sesuai ngModel Anda
      params = params.set('priceType', priceType);
    }

    // Jika Anda memiliki sorting via API, tambahkan params di sini
    // if (sortBy && sortOrder) {
    //   params = params.set('sortBy', sortBy);
    //   params = params.set('sortOrder', sortOrder);
    // }

    return this.apiService.get<any>(`batches/${batchId}/registrants`, { headers, params })
      .pipe(
        tap((response: any) => {
          console.log('API Response Registrants:', response);
        })
      );
  }

  /**
   * Mengambil detail satu pendaftar berdasarkan ID.
   * @param registrantId ID pendaftar.
   * @returns Observable berisi detail pendaftar.
   */
  getRegistrantById(registrantId: string): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    // Endpoint Anda: 'registrants/${registrantId}'
    return this.apiService.get<any>(`registrants/${registrantId}`, { headers });
  }

  /**
   * Mengupdate data pendaftar.
   * @param registrantId ID pendaftar yang akan diupdate.
   * @param data Data yang akan diupdate.
   * @returns Observable berisi respons API.
   */
  updateRegistrant(registrantId: string, data: any): Observable<any> {
    const headers = this.authService.createAuthHeaders();
   
    return this.apiService.put<any>(`registrants/${registrantId}`, data, { headers });
  }

  /**
   * Menghapus pendaftar.
   * @param registrantId ID pendaftar yang akan dihapus.
   * @returns Observable berisi respons API.
   */
  deleteRegistrant(registrantId: string): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    // Sesuaikan endpoint DELETE Anda. Contoh: 'registrants/${registrantId}' atau 'batches/${batchId}/registrants/${registrantId}'
    // Untuk lebih umum, asumsikan ada endpoint langsung ke registrant.
    return this.apiService.delete<any>(`registrants/${registrantId}`, { headers });
  }
}