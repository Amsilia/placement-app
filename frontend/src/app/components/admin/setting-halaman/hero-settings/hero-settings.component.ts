import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingSitesService } from '../../../../services/admin/setting/setting-sites.service';
import { Router } from '@angular/router';
import { convertBase64ToBlob } from '../../../../services/utils/convert-blob.services';

@Component({
  selector: 'app-hero-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-settings.component.html',
  styleUrls: ['./hero-settings.component.scss'],
})
export class HeroSettingsComponent implements OnInit {
  showToast: boolean = true;
  logo: string | ArrayBuffer | null = '';
  isEditing: boolean = false;
  sublineBatch: string = 'Batch 1';
  // private originalData: any = {};
  title: string = '';
  description: string = '';
  private tempData: any = {};

  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(
    private router: Router,
    private settingSites: SettingSitesService
  ) {}
  ngOnInit(): void {
    this.loadSitesData();
  }
  // logo: string = '';
  private loadSitesData() {
    this.settingSites.getSites().subscribe({
      next: (response) => {
        const sites = response.data;
        this.logo = sites.logo1;
        this.title = sites.hero_title;
        this.description = sites.hero_desc;
        this.sublineBatch = sites.subline;

        console.log({ sites });
      },
      error: (err) => {
        console.error('Error loading sites data:', err);
      },
    });
  }

  // Variabel sementara untuk menyimpan data asli

  toggleEdit() {
    this.isEditing = true;
    // Simpan data asli ke variabel sementara
    this.tempData = {
      logo: this.logo,
      sublineBatch: this.sublineBatch,
      title: this.title,
      description: this.description,
    };
  }

  saveChanges() {
    try {
      console.log(
        '%cOtw Save Sites',
        'background: #222; color: #bada55; font-size: 20px'
      );

      if (this.isEditing) {
        console.log(this.isEditing, 'isEditing ?');

        const updateData: any = {}; 
        const formData = new FormData(); 
        if (this.logo && typeof this.logo === 'string') {
          if (this.logo.startsWith('data:')) {
            // Jika logo adalah Base64, konversi ke Blob dan tambahkan ke FormData
            const fileBlob = convertBase64ToBlob(this.logo);
            formData.append('logo1', fileBlob, 'logo.png');
            updateData.logo1 = '[File Uploaded]'; // Untuk log/debug
          } else if (this.logo.startsWith('http')) {
            // Jika logo berupa URL dari server, tidak perlu dikirim
            console.log('Logo is a server URL, no upload needed.');
          }
        }
        if (this.title !== this.tempData.title) {
          updateData.hero_title = this.title;
          formData.append('hero_title', this.title);
        }
        if (this.description !== this.tempData.description) {
          updateData.hero_desc = this.description;
          formData.append('hero_desc', this.description);
        }
        if (this.sublineBatch !== this.tempData.sublineBatch) {
          updateData.subline = this.sublineBatch;
          formData.append('subline', this.sublineBatch);
        }

        // Jika tidak ada perubahan
        if (Object.keys(updateData).length === 0) {
          console.log(
            '%cTidak ada perubahan yang perlu disimpan',
            'color: red;'
          );
          this.isEditing = false;
          return;
        }

        // Log untuk debug
        console.log('Update Terbaru (updateData):', updateData);

        // Kirim data menggunakan FormData
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
      console.error('Error in saveChanges:', error);
    }
  }

  cancelEdit() {
    this.isEditing = false;

    // Kembalikan data ke nilai awal dari tempData
    this.logo = this.tempData.logo;
    this.sublineBatch = this.tempData.sublineBatch;
    this.title = this.tempData.title;
    this.description = this.tempData.description;

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
        this.logo = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  removeLogo() {
    this.logo = '';
    console.log('Logo removed');
  }
}
