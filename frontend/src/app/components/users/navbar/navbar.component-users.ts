import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/utils/toast.service';
import { NavigationUtilsService } from '../../../services/utils/navigation-utils.service';

@Component({
  selector: 'app-navbar-users',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component-users.html',
  styleUrl: './navbar.component-users.scss',
  animations: [
    trigger('fadeSlide', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateY(-30%)',
        })
      ),
      transition('void => *', [
        animate(
          '800ms ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0)',
          })
        ),
      ]),
      transition('* => void', [
        animate(
          '800ms ease-in',
          style({
            opacity: 0,
            transform: 'translateY(-30%)',
          })
        ),
      ]),
    ]),
  ],
})
export class NavbarUsersComponent implements OnInit {
  isNavbarOpen = false;
  isProfileMenuOpen = false;

  userName: string = '';
  userEmail: string = '';
  profileImage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private navigationUtil: NavigationUtilsService
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
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Toggle profile dropdown menu
  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  // Navigate to the profile edit page
  navigateToProfile() {
    this.router.navigate(['/profile']);
    this.isProfileMenuOpen = false;
  }

  // Logout logic (could be improved with real authentication logic)
  logout() {
    console.log('Logging Out');
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

  goHome() {
    window.location.href = '/';
  }
  // Function to get user initials (like BS from Benny Spencer)
  getUserInitials(): string {
    const nameParts = this.userName.split(' ');
    const initials = nameParts.map((part) => part[0]).join('');
    return initials.toUpperCase();
  }
  // navigateToSection(sectionId: string): void {
  //   if (this.router.url === '/') {
  //     const element = document.getElementById(sectionId);
  //     if (element) {
  //       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //     }
  //   } else {
  //     this.router.navigate(['/'], { fragment: sectionId });
  //   }
  // }
  navigateToSection(sectionId: string): void {
    this.navigationUtil.navigateToSection(sectionId);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 640) {
      this.isNavbarOpen = false;
    }
  }
}
