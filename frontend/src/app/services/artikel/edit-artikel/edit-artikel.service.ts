import { Injectable } from '@angular/core';
import { ApiService } from '../../base/api.base.services';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { AuthService } from '../../auth.service';


@Injectable({
  providedIn: 'root'
})
export class EditArtikelService {

  constructor(private apiService: ApiService, private authService: AuthService) {}


  // EditArticledata();
}
