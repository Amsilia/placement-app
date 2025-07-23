import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/utils/toast.service';
import { convertBase64ToBlob } from '../../../services/utils/convert-blob.services';

@Component({
  selector: 'app-profile-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss'],
})
export class ProfileAdminComponent implements OnInit {
  username: string = '';
  fullName: string = '';
  phoneNumber: string = '';

  initials: string = '';
  profilePicture: string | null = null;
  isEditing: boolean = false;

  tempData: any = {}; // Temporary data for rollback

  @ViewChild('fileInput') fileInput!: ElementRef;
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
        // console.log({ data });
        this.username = data.username;
        this.fullName = data.fullname;
        this.phoneNumber = data.no_handphone;
        this.profilePicture = data.avatar || '';
      },
      error: (error) => {
        console.error('Error loading admin data:', error);
      },
    });
  }

  toggleEdit() {
    this.isEditing = true;

    // Save current data for cancel
    this.tempData = {
      username: this.username,
      fullName: this.fullName,
      phoneNumber: this.phoneNumber,
      profilePicture: this.profilePicture,
    };
  }

  saveChanges() {
    // console.log('Data saved:', this.tempData);
    if (this.isEditing === true) {
      // console.log(this.isEditing, 'isEditing ?');
      const updateData: any = {};
      const formData = new FormData();
      if (this.profilePicture && typeof this.profilePicture === 'string') {
        if (this.profilePicture.startsWith('data:')) {
          const fileBlob = convertBase64ToBlob(this.profilePicture);
          formData.append('avatar', fileBlob, 'avatar.png');
          updateData.avatar = '[File Uploaded]';
        } else if (this.profilePicture.startsWith('http')) {
          console.log('Logo is a server URL, no upload needed.');
        }
      }

      if (this.fullName !== this.tempData.fullName) {
        updateData.fullname = this.fullName;
        console.log(updateData.fullName, 'Full name');
        console.log(this.fullName, 'FUll Name 1');
        formData.append('fullname', this.fullName);
      }

      if (this.phoneNumber !== this.tempData.phoneNumber) {
        updateData.no_handphone = this.phoneNumber;
        formData.append('no_handphone', this.phoneNumber);
      }
      if (Object.keys(updateData).length === 0) {
        console.log('%cTidak ada perubahan yang perlu disimpan', 'color: red;');
        this.isEditing = false;
        return;
      }
      if (updateData == null) {
        console.log('%cTidak ada perubahan yang perlu disimpan', 'color: red;');
        this.isEditing = false;
        return;
      }
      this.authService.updateMyAccount(formData).subscribe({
        next: (response) => {
          this.isEditing = false;
          this.loadAdminData();
          this.updateInitials();
          console.log('Admin Data Successfully uptodate', response);
          this.toastService.showToast('Success', 'Update Berhasil', 'success');
        },
        error: (error) => {
          console.log({ error });
          this.toastService.showToast('Error', error.error.message, 'error');
        },
      });
    }
  }

  cancelEdit() {
    this.isEditing = false;

    // Restore original data
    this.username = this.tempData.username;
    this.fullName = this.tempData.fullName;
    this.phoneNumber = this.tempData.phoneNumber;
    this.profilePicture = this.tempData.profilePicture;

    this.updateInitials();
    console.log('Edit canceled. Data restored:', this.tempData);
  }

  // Update initials dynamically
  updateInitials() {
    this.initials = this.getInitials(this.fullName);
  }

  // Generate initials from full name
  getInitials(name: string): string {
    const words = name.split(' ');
    return words.length > 1
      ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
      : name[0].toUpperCase();
  }

  // Trigger file input
  uploadProfilePicture() {
    this.fileInput.nativeElement.click();
  }

  // Handle file selection
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePicture = e.target.result;
        console.log('Profile picture uploaded:', this.profilePicture);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // Remove profile picture
  removeProfilePicture() {
    this.profilePicture = null;
    console.log('Profile picture removed');
  }
}
