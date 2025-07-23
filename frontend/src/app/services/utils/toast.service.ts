import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastState = new BehaviorSubject<{
    title: string;
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  toastState$ = this.toastState.asObservable();

  showToast(
    title: string,
    message: string,
    type: 'success' | 'error' = 'success'
  ) {
    this.toastState.next({ title, message, type });
  }
}
