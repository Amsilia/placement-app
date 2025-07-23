import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './services/utils/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SpeakSenpai';
  toastVisible = false;
  toastTitle = '';
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    // Subscribe ke toastState dan cek jika ada data
    this.toastService.toastState$.subscribe((toast) => {
      if (toast) {
        // Hanya menampilkan toast jika ada data valid
        this.toastTitle = toast.title;
        this.toastMessage = toast.message;
        this.toastType = toast.type;
        this.showToast();
      }
    });
  }

  showToast() {
    this.toastVisible = true;
    setTimeout(() => (this.toastVisible = false), 3000);
  }
}
