import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../base/api.base.services';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root',
})
export class SettingSitesService {
  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  getSites() {
    return this.apiService.get<any>('sites');
  }

  updateSites(sitesData : any) {
    const headers = this.authService.createAuthHeaders();
    return this.apiService.post<any>('sites', sitesData, { headers });
  }

  
}
