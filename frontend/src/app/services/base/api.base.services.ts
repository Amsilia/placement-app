import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = `${environment.baseUrl}/api`;

  constructor(private http: HttpClient) {}

  /**
   * Makes a GET request to the API.
   *
   * @param endpoint The endpoint to make the request to.
   * @param params The parameters to pass in the query string.
   * @return An Observable of the response data.
   */
  get<T>(
    endpoint: string,
    options: { params?: any; headers?: HttpHeaders } = {}
  ): Observable<T> {
    console.log(`Fetching data from endpoint: ${endpoint}`, options);
    console.log('Request Headers:', options.headers?.get('Authorization'));
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get<T>(url, options).pipe(
      tap((response) => {
        console.log('API Response from ${endpoint}`, options', response);
      })
    );
  }

  /**
   * Make a POST request to the API.
   * @param endpoint The endpoint to make the request to.
   * @param data The data to send in the request body.
   * @param options Optional options to send with the request (e.g., headers).
   * @return An Observable of the response data.
   */
  post<T>(
    endpoint: string,
    data: any,
    options: { [key: string]: any } = {}
  ): Observable<T> {
    console.log('Sending request'); // Log endpoint tujuan
    console.log('Data:', data); // Log data yang dikirim
    console.log('Options:', options); // Log headers
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, {
      responseType: 'json' as const,
      observe: 'body' as const,
      ...options,
    });
  }

  /**
   * Make a PUT request to the API.
   *
   * @param endpoint The endpoint to make the request to.
   * @param data The data to send in the request body.
   * @return An Observable of the response data.
   */
  put<T>(
    endpoint: string,
    data: any,
    options: { [key: string]: any } = {}
  ): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, {
      responseType: 'json' as const,
      observe: 'body' as const,
      ...options,
    });
  }

  delete<T>(endpoint: string, options: { headers?: HttpHeaders } = {}): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, options);
  }
}
