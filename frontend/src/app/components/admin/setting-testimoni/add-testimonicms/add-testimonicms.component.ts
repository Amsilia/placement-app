import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // <-- Import Router
import { TestimoniService } from '../../../../services/admin/testimoni/testimoni.service'; // <-- Import TestimoniService

// Jika Anda ingin menggunakan Toastr, uncomment baris di bawah
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-testimonicms',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-testimonicms.component.html',
  styleUrl: './add-testimonicms.component.scss'
})
export class AddTestimonicmsComponent {
  imagePreview: string | null = null;
  selectedFile: File | null = null; // Menyimpan file gambar yang dipilih
  status: boolean = true; // true = Publish, false = Private
  name: string = '';
  employment: string = '';
  testimoni: string = ''; // Konten testimoni

  isLoading: boolean = false; // Indikator loading saat menyimpan
  errorMessage: string | null = null; // Pesan error
  successMessage: string | null = null; // Pesan sukses

  constructor(
    private router: Router, // Inject Router untuk navigasi
    private testimoniService: TestimoniService, // Inject TestimoniService
    // private toastr: ToastrService // Jika Anda menggunakan Toastr
  ) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Simpan file yang dipilih
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result; // Tampilkan preview gambar
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.imagePreview = null;
    this.selectedFile = null; // Hapus referensi file yang dipilih
  }

  // Mengubah nama fungsi 'save' menjadi 'onSubmit' dan menambahkan logika API
  onSubmit(): void {
    this.isLoading = true; // Aktifkan loading
    this.errorMessage = null; // Reset pesan
    this.successMessage = null; // Reset pesan

    // Buat FormData untuk mengirim data, terutama jika ada file
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('employment', this.employment);
    formData.append('content', this.testimoni); // Asumsi backend pakai 'content' untuk teks testimoni
    formData.append('is_published', this.status.toString()); // is_published (boolean) ke string 'true'/'false'

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.testimoniService.createTestimoni(formData).subscribe(
      (response: any) => {
        console.log('DEBUG: Testimoni berhasil ditambahkan:', response);
        this.successMessage = 'Testimoni berhasil ditambahkan!';
        // Jika menggunakan Toastr, uncomment baris di bawah:
        // this.toastr.success('Testimoni berhasil ditambahkan!', 'Sukses!');
        this.isLoading = false;
        // Redirect kembali ke halaman daftar testimoni setelah sukses
        setTimeout(() => {
          this.router.navigate(['/admin/setting-testimoni']);
        }, 2000);
      },
      (error: any) => {
        console.error('ERROR: Gagal menambahkan testimoni:', error);
        this.errorMessage = error.error?.message || 'Gagal menambahkan testimoni. Silakan coba lagi.';
        // Jika menggunakan Toastr, uncomment baris di bawah:
        // this.toastr.error(this.errorMessage, 'Gagal!');
        this.isLoading = false;
      }
    );
  }

  // Mengubah nama fungsi 'cancel' agar lebih jelas dan navigasi kembali
  goBack(): void {
    console.log('Navigating back to testimoni list.');
    this.router.navigate(['/admin/setting-testimoni']); // Kembali ke halaman daftar testimoni
  }
}