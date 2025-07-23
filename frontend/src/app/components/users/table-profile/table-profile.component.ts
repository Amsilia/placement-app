import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { convertBase64ToBlob } from '../../../services/utils/convert-blob.services';
@Component({
  selector: 'app-table-profile',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './table-profile.component.html',
  styleUrls: ['./table-profile.component.scss'],
})
export class TableProfileComponent implements OnInit {
  showToast: boolean = true;
  avatar: string | ArrayBuffer | null = '';
  isEditable: boolean = false;

  fullname: string = '';
  userEmail: string = '';
  no_handphone: string = '';
  birth_date: any = '';
  gender: string = '';
  private originalData: any = {};
  registrant: { transactionProofUrl?: string } | null = null;
  constructor(private router: Router, private authServices: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  dismissToast() {
    this.showToast = false;
  }

  enableEdit() {
    this.isEditable = true;
    this.originalData = { ...this.registrant };
  }

  saveChanges() {
    if (this.isEditable) {
      console.log('pass 1');
      const updateData: any = {};
      const formData = new FormData();
      if (this.avatar && typeof this.avatar === 'string') {
        if (this.avatar.startsWith('data:')) {
          const fileBlob = convertBase64ToBlob(this.avatar);
          formData.append('avatar', fileBlob, 'avatar.png');
          updateData.avatar = '[File Uploaded]';
        } else if (this.avatar.startsWith('http')) {
          console.log('Avatar is a server URL, no upload needed.');
        }
      }

      if (this.fullname !== this.originalData.fullname) {
        updateData.fullname = this.fullname;
        formData.append('fullname', this.fullname);
      }

      if (this.no_handphone !== this.originalData.no_handphone) {
        updateData.no_handphone = this.no_handphone;
        formData.append('no_handphone', this.no_handphone);
      }

      if (this.birth_date !== this.originalData.birth_date) {
        updateData.birth_date = this.birth_date;
        formData.append('birth_date', this.birth_date);
      }

      if (this.gender !== this.originalData.gender) {
        updateData.gender = this.gender;
        formData.append('gender', this.gender);
      }

      // if (this.avatar !== this.avatar) {
      //   updateData.avatar = this.avatar;
      // }

      if (Object.keys(updateData).length === 0) {
        console.log('%cTidak ada perubahan yang perlu disimpan', 'color: red;');
        this.isEditable = false;
        return;
      }
      if (updateData == null) {
        console.log('%cError Update', 'color : red;');
      }
      console.log(updateData, 'update Data');
      this.authServices.updateMyAccount(formData).subscribe({
        next: () => {
          console.log('sukses');
          this.isEditable = false;
          this.loadUserData();
        },
        error: (err) => {
          console.error('Error updating profile:', err);
        },
      });
    }
  }

  cancelEdit() {
    this.isEditable = false;
    this.loadUserData();
  }

  private loadUserData() {
    this.authServices.getMyAccount().subscribe({
      next: (response) => {
        const data = response.data;
        this.fullname = data.fullname;
        this.userEmail = data.email;
        this.no_handphone = data.no_handphone;
        this.birth_date = data.birth_date;
        this.gender = data.gender;
        this.avatar = data.avatar || '';

        this.originalData = { ...data };
        console.log({ data });
      },
      error: (err) => {
        console.error('Error loading user data:', err);
      },
    });
  }

  onProfileImageChange(event: Event) {
    if (!this.isEditable) return;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.avatar = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeProfileImage() {
    if (this.isEditable) {
      this.avatar = null;
    }
  }
}
