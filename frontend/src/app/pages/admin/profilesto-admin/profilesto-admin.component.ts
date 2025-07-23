import { Component, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../../../components/admin/header/header.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/admin/sidebar/sidebar.component';
import { ProfileAdminComponent } from '../../../components/admin/profile-admin/profile-admin.component';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/utils/toast.service';

@Component({
  selector: 'app-profilesto-admin',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    CommonModule,
    SidebarComponent,
    ProfileAdminComponent,
  ],
  templateUrl: './profilesto-admin.component.html',
  styleUrl: './profilesto-admin.component.scss',
})
export class ProfilestoAdminComponent implements OnInit {
  isMinimized = false;
  username: string = '';
  userfullname: string = '';
  contact: string = '';
  avatar: string | ArrayBuffer | null = '';

  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.loadAdminData();
  }

  private loadAdminData() {
    this.authService.getMyAccount().subscribe({
      next: (response) => {
        const data = response.data;
        console.log({ data });
        this.username = data.username;
        this.userfullname = data.fullname;
        this.contact = data.contact;
        this.avatar = data.avatar || '';
      },
    });
  }

  onSidebarToggle(minimized: boolean) {
    this.isMinimized = minimized;
  }
}
