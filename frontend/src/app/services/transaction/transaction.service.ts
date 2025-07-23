import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://127.0.0.1:3333/api/transactions';

  constructor(private http: HttpClient) {}

  getTransactionByRegistrantId(registrantId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/by-registrant/${registrantId}`);
  }
}


