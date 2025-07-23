import { Injectable } from '@angular/core';
import { ApiService } from '../base/api.base.services';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  private sitesCache: any = null;
  constructor(private apiService: ApiService) { }

  // getSites() : Observable<any> {
  //   if (this.sitesChace){
  //     return of(this.sitesChace)
  //   }
  //   // return this.apiService.get<any>('sites');
  //   return this.apiService.get<any>('sites').pipe(
  //     tap((data) => {
  //       this.sitesChace = data
  //     })
  //   )
  // }
  getSites(): Observable<any> {
    if (this.sitesCache) {
      // Menggunakan data dari cache jika sudah ada
      return of(this.sitesCache);
    }

    // Melakukan fetch dari API jika cache kosong, lalu menyimpan di cache
    return this.apiService.get<any>('sites').pipe(
      tap(data => this.sitesCache = data)  // Menyimpan data di cache
    );
  }
}
