import { Injectable } from '@angular/core';
import { ApiService } from '../base/api.base.services';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private apiService: ApiService, private authService: AuthService) {}

  /**
   * Retrieves a list of articles from the API for public view.
   *
   * @param page The page to retrieve. Defaults to 1.
   * @param limit The number of articles to retrieve per page. Defaults to 8.
   * @param search An optional search query to filter the articles.
   * @param isPublished Filter by published status. Defaults to true.
   * @returns An Observable of the API response.
   */
  getPublicArticles(
    page: number = 1,
    limit: number | null = 8,
    search: string = '',
    isPublished: boolean = true
  ): Observable<any> {
    let params = new HttpParams().set('page', page.toString());

    if (limit !== null) {
      params = params.set('limit', limit.toString());
    }

    if (search) {
      params = params.set('search[title]', search);
    }

    if (isPublished) {
      params = params.set('is_published[eq]', 'true');
    }

    return this.apiService.get<any>('articles', { params });
  }

  /**
   * Retrieves a list of all articles from the API for admin view (potentially unpublished).
   *
   * @param page The page to retrieve. Defaults to 1.
   * @param limit The number of articles to retrieve per page. Defaults to 100.
   * @param search An optional search query to filter the articles by title.
   * @returns An Observable of the API response.
   */
  getAllArticles(
    page: number = 1,
    limit: number | null = 100,
    search: string = ''
  ): Observable<any> {
    let params = new HttpParams().set('page', page.toString());
    if (limit !== null) {
      params = params.set('limit', limit.toString());
    }
    if (search) {
      params = params.set('search[title]', search);
    }
    return this.apiService.get<any>('articles', { params });
  }

  /**
   * Retrieves a single article by its slug.
   * Used for public viewing of a specific article.
   *
   * @param slug The slug of the article.
   * @returns An Observable of the API response.
   */
  getArticleBySlug(slug: string): Observable<any> {
    console.log(
      '%cDEBUG (ArticleService): Getting Article Detail by Slug',
      'background: #222; color: #bada55; font-size: 20px'
    );
    // Tambahkan header otentikasi jika endpoint ini memerlukan admin auth
    const headers = this.authService.createAuthHeaders();
    return this.apiService.get<any>(`articles/${slug}`, { headers });
  }

  /**
   * Creates a new article.
   *
   * @param data The article data to be created (can be FormData for file uploads).
   * @returns An Observable of the API response.
   */
  createArticle(data: any): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    return this.apiService.post<any>('articles', data, { headers });
  }

  // --- Metode untuk EDIT ARTIKEL ---

  /**
   * Retrieves a single article by its ID (UUID).
   * This is typically used for fetching article details for editing.
   *
   * @param id The ID (UUID string) of the article.
   * @returns An Observable of the API response.
   */
  getArticleById(id: string): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    // Endpoint ini tetap ada, meskipun kita menggunakan getArticleBySlug untuk load di frontend
    return this.apiService.get<any>(`articles/${id}`, { headers });
  }

  /**
   * Updates an existing article.
   *
   * @param id The ID (UUID string) of the article to update.
   * @param data The updated article data (can be FormData for file uploads).
   * @returns An Observable of the API response.
   */
  updateArticle(id: string, data: any): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    // >>>>>> PERUBAHAN KRITIS: UBAH .post MENJADI .put DI SINI <<<<<<
    return this.apiService.put<any>(`articles/${id}`, data, { headers }); // <-- BERHASIL DI POSTMAN SEBAGAI PUT
  }

  // --- Metode untuk DELETE ---

  /**
   * Deletes a single article by its ID (UUID).
   *
   * @param id The ID (UUID string) of the article to delete.
   * @returns An Observable of the API response.
   */
  deleteArticle(id: string): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    return this.apiService.delete<any>(`articles/${id}`, { headers });
  }

  /**
   * Deletes multiple articles by their IDs (UUIDs).
   *
   * @param ids An array of article IDs (UUID strings) to delete.
   * @returns An Observable of the API response.
   */
  deleteMultipleArticles(ids: string[]): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    // Asumsi backend memiliki endpoint untuk multiple delete, contoh: /api/articles/bulk-delete
    return this.apiService.post<any>(`articles/bulk-delete`, { ids }, { headers });
  }
}