import { Injectable } from '@angular/core';
import { ApiService } from '../base/api.base.services';
import { Observable, of, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PricesService {
  private priceCache: any = null;
  constructor(private apiService: ApiService) {}

  getPrices(open: boolean): Observable<any> {
    // let params = new HttpParams().set('open')

    if (this.priceCache) {
      return of(this.priceCache);
    }
    const params = new HttpParams().set('open', open.toString());

    return this.apiService
      .get<any>('prices', { params })
      .pipe(tap((data) => (this.priceCache = data)));
  }
}
