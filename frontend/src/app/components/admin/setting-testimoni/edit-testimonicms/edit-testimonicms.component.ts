import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestimoniService } from '../../../../services/admin/testimoni/testimoni.service'; // Pastikan path ini benar

// Jika Anda ingin menggunakan Toastr, uncomment baris di bawah
// import { ToastrService } from 'ngx-toastr';

// Interface untuk struktur data respons API testimoni saat mengambil detail
interface TestimoniApiResponse {
  // Asumsikan respons API memiliki properti 'data' yang berisi objek testimoni
  data: {
    id: string; // ID testimoni (UUID)
    name: string;
    // >>>>>> PERUBAHAN KRITIS DI INTERFACE <<<<<<
    employment: string; // <-- UBAH/TAMBAHKAN INI SESUAI NAMA FIELD DI BACKEND (BUKAN 'job')
    // Jika backend masih mengirim 'job' DAN 'employment' untuk pekerjaan,
    // maka mungkin perlu mempertahankan 'job' dan menambah 'employment'
    // Tapi jika 'job' tidak digunakan untuk pekerjaan, hapus saja.
    // Untuk saat ini, kita asumsikan backend menggunakan 'employment'.
    // >>>>>> AKHIR PERUBAHAN KRITIS <<<<<<
    content: string; // Konten testimoni
    is_published: boolean;
    image_url: string | null; // URL gambar profil
    // Tambahkan field lain yang relevan dari respons API
  };
  message?: string;
  statusCode?: number;
}

@Component({
  selector: 'app-edit-testimonicms',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './edit-testimonicms.component.html',
  styleUrl: './edit-testimonicms.component.scss'
})
export class EditTestimonicmsComponent implements OnInit {

  testimoniId: string | null = null;
  imagePreview: string | null = null;
  selectedFile: File | null = null;

  status: boolean = true;
  name: string = '';
  employment: string = ''; // Properti komponen sudah bernama 'employment'
  testimoniContent: string = '';

  isLoading: boolean = true;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testimoniService: TestimoniService,
    // private toastr: ToastrService // Jika menggunakan Toastr
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('DEBUG (Edit Testimoni Component): ID from URL params:', id);
      if (id) {
        this.testimoniId = id;
        this.loadTestimoniDetails(this.testimoniId);
      } else {
        this.errorMessage = 'ID Testimoni tidak ditemukan di URL.';
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigate(['/admin/setting-testimoni']);
        }, 2000);
      }
    });
  }

  loadTestimoniDetails(id: string): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.testimoniService.getTestimoniById(id).subscribe(
      (response: TestimoniApiResponse) => {
        console.log('DEBUG (Edit Testimoni Component): API Response for details:', response);
        if (response && response.data) {
          const testimoniData = response.data;
          this.name = testimoniData.name || '';
          // >>>>>> PERBAIKAN KRITIS DI SINI <<<<<<
          this.employment = testimoniData.employment || ''; // <-- MENGISI DARI testimoniData.employment
          // Jika Anda tidak yakin backend mengembalikan 'employment', bisa pakai:
          // this.employment = (testimoniData as any).employment || (testimoniData as any).job || '';
          // Tapi asumsikan 'employment' adalah yang benar.
          // >>>>>> AKHIR PERBAIKAN KRITIS <<<<<<
          this.testimoniContent = testimoniData.content || '';
          this.status = testimoniData.is_published;

          if (testimoniData.image_url) {
            this.imagePreview = testimoniData.image_url;
          } else {
            this.imagePreview = null;
          }
        } else {
          console.error('ERROR (Edit Testimoni Component): Unexpected API response structure or data is null:', response);
          this.errorMessage = 'Struktur respons API tidak sesuai. Data testimoni tidak dapat dimuat.';
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error('ERROR (Edit Testimoni Component): Error fetching testimoni details:', error);
        this.errorMessage = error.error?.message || 'Gagal memuat detail testimoni. Silakan coba lagi.';
        this.isLoading = false;
      }
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.imagePreview = null;
    this.selectedFile = null;
  }

  onSubmit(): void {
    if (!this.testimoniId) {
      this.errorMessage = 'ID Testimoni tidak ditemukan untuk diperbarui.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('employment', this.employment); // Mengirim 'employment' ke backend
    formData.append('content', this.testimoniContent);
    formData.append('is_published', this.status.toString());

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    } else if (this.imagePreview === null) {
      formData.append('image', 'null');
    }

    this.testimoniService.updateTestimoni(this.testimoniId, formData).subscribe(
      (response: any) => {
        console.log('DEBUG: Testimoni berhasil diperbarui:', response);
        this.successMessage = 'Testimoni berhasil diperbarui!';
        // Jika menggunakan Toastr, uncomment: this.toastr.success('Testimoni berhasil diperbarui!', 'Sukses!');
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigate(['/admin/setting-testimoni']);
        }, 2000);
      },
      (error: any) => {
        console.error('ERROR: Gagal memperbarui testimoni:', error);
        this.errorMessage = error.error?.message || 'Gagal memperbarui testimoni. Silakan coba lagi.';
        // Jika menggunakan Toastr, uncomment: this.toastr.error(this.errorMessage, 'Gagal!');
        this.isLoading = false;
      }
    );
  }

  goBack(): void {
    console.log('Navigating back to testimoni list.');
    this.router.navigate(['/admin/setting-testimoni']);
  }
}