import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'; // Import OnInit
import { TestimoniService } from '../../services/admin/testimoni/testimoni.service'; // <-- Import TestimoniService

// Jika Anda ingin menggunakan Toastr untuk notifikasi di UI publik, uncomment baris ini:
// import { ToastrService } from 'ngx-toastr';

interface Testimonial {
  name: string;
  role: string; // Ini akan diisi dari field 'job' atau 'employment' dari API
  company: string; // Ini bisa dari field 'company' jika ada, atau dikosongkan
  imageUrl: string; // URL gambar profil dari API
  content: string; // Konten testimoni dari API
}

@Component({
  selector: 'app-testimoni-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimoni-section.component.html',
  styleUrls: ['./testimoni-section.component.scss'],
})
export class TestimoniSectionComponent implements OnInit { // Implement OnInit

  testimonials: Testimonial[] = []; // Data testimoni dari API
  currentIndex = 0; // Untuk slider

  isLoading: boolean = true; // Indikator loading
  errorMessage: string | null = null; // Pesan error

  constructor(
    private testimoniService: TestimoniService, // <-- Inject TestimoniService
    // private toastr: ToastrService // Jika menggunakan Toastr
  ) {}

  ngOnInit(): void {
    this.loadPublicTestimonials(); // Muat testimoni dari API saat komponen diinisialisasi
  }

  loadPublicTestimonials() {
    this.isLoading = true;
    this.errorMessage = null;

    // Memanggil getAllTestimonies dari service
    // isPublished: true akan memfilter hanya testimoni yang berstatus 'Publik'
    this.testimoniService.getAllTestimonies(1, null, '', true).subscribe(
      (response: any) => { // Menggunakan 'any' untuk fleksibilitas parsing respons API
        console.log('DEBUG: API Response for public testimonials:', response);
        if (response && response.data && Array.isArray(response.data)) {
          this.testimonials = response.data.map((item: any) => ({
            name: item.name || 'Anonim',
            role: item.employment || item.job || 'Pekerjaan Tidak Diketahui', // <-- Sesuaikan dengan 'employment' atau 'job' dari API
            company: item.company || '', // <-- Asumsi ada field 'company' di API, jika tidak, bisa dihapus atau kosongkan
            imageUrl: item.image_url || 'assets/image/default-profile.webp', // <-- URL gambar dari API, berikan default jika null
            content: item.content || 'Tidak ada testimoni.',
          }));
          // Jika ingin hanya mengambil 3 testimoni teratas atau jumlah tertentu:
          // this.testimonials = this.testimonials.slice(0, 3);
        } else {
          this.testimonials = [];
          this.errorMessage = 'Tidak ada testimoni yang tersedia.';
          console.warn('DEBUG: Respons API testimoni publik tidak memiliki properti data atau data kosong.');
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('ERROR: Gagal memuat testimoni publik:', error);
        this.errorMessage = error.error?.message || 'Gagal memuat testimoni. Silakan coba lagi nanti.';
        // Jika menggunakan Toastr: this.toastr.error(this.errorMessage, 'Gagal!');
        this.isLoading = false;
      }
    );
  }

  get visibleTestimonials(): Testimonial[] {
    // Memastikan ada cukup testimoni untuk di-slice agar tidak error
    if (this.testimonials.length === 0) {
      return [];
    }
    // Jika jumlah testimoni kurang dari 3, tampilkan semua yang ada
    if (this.testimonials.length <= 3) {
      return this.testimonials;
    }
    // Logika slicing untuk slider 3 testimoni
    const endIndex = this.currentIndex + 3;
    if (endIndex <= this.testimonials.length) {
      return this.testimonials.slice(this.currentIndex, endIndex);
    } else {
      // Jika slice akan melampaui akhir array, gabungkan bagian akhir dan awal
      return this.testimonials.slice(this.currentIndex).concat(this.testimonials.slice(0, endIndex - this.testimonials.length));
    }
  }

  nextSlide() {
    if (this.testimonials.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length; // Geser satu per satu
      // Jika ingin geser 3 per 3:
      // this.currentIndex = (this.currentIndex + 3) % this.testimonials.length;
    }
  }

  prevSlide() {
    if (this.testimonials.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length; // Geser satu per satu
      // Jika ingin geser 3 per 3:
      // this.currentIndex = (this.currentIndex - 3 + this.testimonials.length) % this.testimonials.length;
    }
  }
}