import { Injectable } from '@angular/core';
import { ApiService } from '../../base/api.base.services';
import { Observable, tap, catchError } from 'rxjs';
import { AuthService } from '../../auth.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeletePaketbatchService {

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  deletePackageData(packageId: number): Observable<any> {
    const options = {
      headers: this.authService.createAuthHeaders()
    };
    return this.apiService.delete<any>(`packages/${packageId}`, options);
  }
}
