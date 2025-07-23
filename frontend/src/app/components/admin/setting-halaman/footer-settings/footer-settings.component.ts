import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingSitesService } from '../../../../services/admin/setting/setting-sites.service';
import { convertBase64ToBlob } from '../../../../services/utils/convert-blob.services';

@Component({
  selector: 'app-footer-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer-settings.component.html',
  styleUrl: './footer-settings.component.scss',
})
export class FooterSettingsComponent implements OnInit {
  // Data
  tempData: any = {};
  logo2: string | ArrayBuffer | null = '';
  footer_desc: string = '';
  // socialMedia = {
  //   instagram: '',
  //   facebook: '',
  //   x: '',
  // };
  url_instagram = '';
  url_facebook = '';
  url_x = '';
  address: string = '';
  email: string = '';
  phone: string = '';
  isEditing: boolean = false;
  showToast: boolean = true;

  constructor(private settingSites: SettingSitesService) {}
  ngOnInit(): void {
    this.loadSitesData();
  }

  private loadSitesData() {
    this.settingSites.getSites().subscribe({
      next: (response) => {
        const sites = response.data;
        this.logo2 = sites.logo2;
        this.footer_desc = sites.footer_desc;
        this.url_instagram = sites.url_instagram;
        this.url_facebook = sites.url_facebook;
        this.url_x = sites.url_x;
        this.address = sites.address;
        this.email = sites.email;
        this.phone = sites.contact;

        console.log({ sites });
      },
      error: (err) => {
        console.error('Error loading sites data:', err);
      },
    });
  }

  @ViewChild('fileInput') fileInput!: ElementRef;

  toggleEdit() {
    this.isEditing = true;
    // Simpan data ke tempData sebelum mode edit
    this.tempData = {
      logo2: this.logo2,
      footer_desc: this.footer_desc,
      url_instagram: this.url_instagram,
      url_facebook: this.url_facebook,
      url_x: this.url_x,
      address: this.address,
      email: this.email,
      contact: this.phone,
    };
  }

  saveChanges() {
    try {
      console.log(
        '%cOtw Save Sites Footer',
        'background: #222; color: #bada55; font-size: 20px'
      );
      if (this.isEditing == true) {
        console.log(this.isEditing, 'isEditing ?');
        const updateData: any = {};
        const formData = new FormData();
        if (this.logo2 && typeof this.logo2 === 'string') {
          if (this.logo2.startsWith('data:')) {
            const fileBlob = convertBase64ToBlob(this.logo2);
            formData.append('logo2', fileBlob, 'logo.png');
            updateData.logo2 = '[File Uploaded]';
          } else if (this.logo2.startsWith('http')) {
            console.log('Logo is a server URL, no upload needed.');
          }
        }

        if (this.footer_desc !== this.tempData.footer_desc) {
          updateData.footer_desc = this.footer_desc;
          formData.append('footer_desc', this.footer_desc);
        }
        if (this.url_instagram !== this.tempData.url_instagram) {
          updateData.url_instagram = this.url_instagram;
          formData.append('url_instagram', this.url_instagram);
        }
        if (this.url_facebook !== this.tempData.url_facebook) {
          updateData.url_facebook = this.url_facebook;
          formData.append('url_facebook', this.url_facebook);
        }

        if (this.url_x !== this.tempData.url_x) {
          updateData.url_x = this.url_x;
          formData.append('url_x', this.url_x);
        }

        if (this.address !== this.tempData.address) {
          updateData.address = this.address;
          formData.append('address', this.address);
        }

        if (this.email !== this.tempData.email) {
          updateData.email = this.email;
          formData.append('email', this.email);
        }

        if (this.phone !== this.tempData.contact) {
          updateData.contact = this.phone;
          formData.append('contact', this.phone);
        }

        if (Object.keys(updateData).length === 0) {
          console.log(
            '%cTidak ada perubahan yang perlu disimpan',
            'color: red;'
          );
          this.isEditing = false;
          return;
        }
        if (updateData == null) {
          console.log(
            '%cTidak ada perubahan yang perlu disimpan',
            'color: red;'
          );
          this.isEditing = false;
          return;
        }
        this.settingSites.updateSites(formData).subscribe({
          next: (response) => {
            console.log(
              '%cUpdate Success',
              'background: #222; color: #bada55; font-size: 20px'
            );
            this.isEditing = false;
            this.loadSitesData();
            console.log('Updated sites data:', response);
          },
          error: (err) => {
            console.error('Error updating sites data:', err);
          },
        });
      }
    } catch (error) {
      console.log(
        '%cERROR : ',
        'background: #222; color: #bada55; font-size: 20px',
        error
      );
    }
  }

  cancelEdit() {
    this.isEditing = false;

    // Kembalikan data ke nilai awal dari tempData
    this.logo2 = this.tempData.logo2;
    this.footer_desc = this.tempData.footer_desc;
    this.url_instagram = this.tempData.url_instagram;
    this.url_facebook = this.tempData.url_facebook;

    console.log('Edit canceled. Data restored:', this.tempData);
  }

  uploadLogo() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logo2 = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  /**
   * Reset logo to empty string and log a message.
   */
removeLogo() {
    this.logo2 = '';
    console.log('Logo removed');
  }
}
