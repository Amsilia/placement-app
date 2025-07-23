import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/utils/toast.service';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderAdminComponent implements OnInit {
  isDropdownOpen = false; // Status dropdown
  initials: string = ''; // Inisial pengguna
  userName: string = '';
  userEmail: string = '';
  profileImage: string | null = null;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.loadUserData();
  }
  private loadUserData() {
    this.authService.getMyAccount().subscribe({
      next: (response) => {
        const data = response.data;
        this.userName = data.fullname || data.username;
        this.userEmail = data.email;
        this.profileImage = data.avatar || ''; // Jika avatar tidak ada, gunakan string kosong
      },
      error: (error) => {
        console.error('Failed to load user data', error);
      },
    });
  }
  // Toggle dropdown visibility
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Navigate to Profile page
  navigateToProfile() {
    this.isDropdownOpen = false;
    this.router.navigate(['/admin/profile']);
  }

  // Logout and redirect
  logout() {
    console.log('Logging Out ....!');
    this.authService.logout().subscribe({
      next: () => {
        this.toastService.showToast('Success', 'Logout Berhasil', 'success');
        this.router.navigate(['/']);
        location.reload();
      },
      error: (error) => {
        this.toastService.showToast('Error', error.error.message, 'error');
        console.error('Logout failed', error);
      },
    });
  }
  getUserInitials(): string {
    const nameParts = this.userName.split(' ');
    const initials = nameParts.map((part) => part[0]).join('');
    return initials.toUpperCase();
  }
}
