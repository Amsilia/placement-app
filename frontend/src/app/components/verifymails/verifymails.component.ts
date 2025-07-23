// src/app/components/verifymails/verifymails.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verifymails',
  templateUrl: './verifymails.component.html',
  styleUrls: ['./verifymails.component.css']
})
export class VerifymailsComponent implements OnInit {
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Ambil token dari URL
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      // Panggil fungsi verifikasi di AuthService
      this.authService.verifyEmail(token).subscribe({
        next: (response) => {
          this.message = 'Email berhasil diverifikasi. Silakan login.';
        },
        error: (error) => {
          this.message = 'Link verifikasi tidak valid atau sudah kedaluwarsa.';
        },
      });
    } else {
      this.message = 'Token verifikasi tidak ditemukan.';
    }
  }
}
