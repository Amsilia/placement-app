import { Injectable } from '@angular/core';
import { ApiService } from '../../base/api.base.services';
import { Observable, tap, catchError } from 'rxjs';
import { AuthService } from '../../auth.service';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EditPaketbatchService {

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  editPackageData(paket: { id: string; name: string; description: string }): Observable<any> {
    const headers = this.authService.createAuthHeaders();

    // Mengirim data yang diperbarui
    return this.apiService.put<any>(`packages/${paket.id}`, {
      name: paket.name,
      description: paket.description
    }, { headers }).pipe(
      // Jika response berhasil, kita akan menangani respons data
      tap((response) => {
        console.log('Paket berhasil diperbarui:', response);
      })
    );
  }

  editBatchData(batch: { 
    id: string; 
    name: string;       // Sesuai dengan API response
    start_date: string;
    end_date: string;
    is_active?: boolean // Optional karena tidak selalu diupdate
  }): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    return this.apiService.put<any>(
      `batches/${batch.id}`,
      {
        name: batch.name,
        start_date: batch.start_date,
        end_date: batch.end_date,
        is_active: batch.is_active
      },
      { headers }
    );
  }
}
