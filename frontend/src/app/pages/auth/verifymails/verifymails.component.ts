import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-verifymails',
  standalone: true,
  templateUrl: './verifymails.component.html',
})
export class VerifymailsComponent implements OnInit {
  message: string = '';
  title: string = '';
  feUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const token = params.get('token');
      if (token) {
        this.authService.verifyEmail(token).subscribe({
          next: (response) => {
            console.log('Email verified successfully', response);
            this.title = 'Verifikasi Berhasil!';
            this.message = 'Email berhasil diverifikasi. Silakan login.';
            this.feUrl =  '/login';
          },
          error: (error) => {
            this.title = 'Verifikasi Gagal!';
            this.message = 'Token verifikasi telah kedaluwarsa atau tidak valid.';
            this.feUrl = '/resend-verify-email';
            console.error('Verification failed', error);
          },
        });
      } else {
        this.title = 'Verifikasi Gagal!';
        this.message = 'Token verifikasi tidak ditemukan!';
      }
    });
  }
}
