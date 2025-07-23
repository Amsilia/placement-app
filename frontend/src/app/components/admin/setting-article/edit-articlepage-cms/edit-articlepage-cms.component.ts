import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../../../services/artikel/article.service';

// Interface untuk struktur data respons API secara keseluruhan
interface ArticleApiResponse {
  // Asumsikan respons API memiliki properti 'data' yang berisi objek artikel
  data: { // <-- Ini adalah objek yang menampung data artikel
    id: string; // ID adalah STRING (UUID)
    slug: string;
    title: string;
    content: string;
    is_published: boolean;
    image_url: string | null;
    social_media: {
      instagram: string;
      whatsapp: string;
      facebook: string;
      twitter: string;
    };
    // Tambahkan field lain yang ada di dalam objek 'data' dari API jika diperlukan
  };
  message?: string; // Biasanya ada pesan sukses dari API
  statusCode?: number; // Kode status HTTP dari API
  // Tambahkan properti lain yang mungkin ada di root level respons API
}

@Component({
  selector: 'app-edit-articlepage-cms',
  standalone: true,
  imports: [CommonModule, FormsModule, CKEditorModule],
  templateUrl: './edit-articlepage-cms.component.html',
  styleUrl: './edit-articlepage-cms.component.scss',
})
export class EditArticlepageCmsComponent implements OnInit {
  public Editor = ClassicEditor;

  articleId: string | null = null; // Menyimpan ID (UUID) artikel dari respons API
  articleSlug: string | null = null; // Menyimpan SLUG dari URL
  imagePreview: string | null = null;
  selectedFile: File | null = null;

  status: boolean = true; // Status artikel: Publik (true) atau Privat (false)
  judulArtikel: string = ''; // Judul artikel
  deskripsi: string = ''; // Deskripsi artikel
  socialMedia = {
    instagram: '',
    whatsapp: '',
    facebook: '',
    twitter: '',
  };

  isLoading: boolean = true; // Indikator loading data
  errorMessage: string | null = null; // Pesan error
  successMessage: string | null = null; // Pesan sukses

  editorConfig = {
    toolbar: [
      'fontFamily', 'fontSize', '|',
      'bold', 'italic', 'underline', '|',
      'link', 'bulletedList', 'numberedList', '|',
      'undo', 'redo'
    ],
    placeholder: 'Masukkan Deskripsi Artikel...',
  };

  constructor(
    private route: ActivatedRoute, // Inject ActivatedRoute untuk membaca parameter URL
    private router: Router, // Inject Router untuk navigasi
    private articleService: ArticleService // Inject ArticleService untuk interaksi API
  ) {}

  ngOnInit(): void {
    // Mengambil SLUG dari parameter URL (karena rute sudah diubah ke :slug)
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug'); // Ambil 'slug' dari parameter URL
      console.log('DEBUG (Edit Component): SLUG from URL params:', slug); // Log untuk debugging
      if (slug) {
        this.articleSlug = slug; // Simpan slug yang didapat dari URL
        this.loadArticleDetails(this.articleSlug); // Muat detail artikel menggunakan SLUG
      } else {
        this.errorMessage = 'SLUG Artikel tidak ditemukan di URL.';
        this.isLoading = false;
        // Opsional: Redirect kembali ke halaman daftar setelah beberapa detik
        setTimeout(() => {
          this.router.navigate(['/admin/setting-article']);
        }, 3000);
      }
    });
  }

  // Fungsi untuk memuat detail artikel dari API, sekarang menggunakan SLUG
  loadArticleDetails(slug: string): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    // Panggil getArticleBySlug dari service (karena ini yang berhasil di Postman)
    this.articleService.getArticleBySlug(slug).subscribe(
      (response: ArticleApiResponse) => { // Menggunakan interface ArticleApiResponse yang diperbaiki
        console.log('DEBUG (Edit Component): API Response for details by slug:', response);

        // >>>>>> BAGIAN KRITIS YANG DIPERBAIKI: Mengakses data dari response.data <<<<<<
        // Pastikan response memiliki properti 'data' dan 'data' itu sendiri bukan null/undefined
        if (response && response.data) {
          const articleData = response.data; // <-- Ambil objek artikel dari properti 'data'

          this.articleId = articleData.id; // Mengisi ID (UUID) dari data API
          this.judulArtikel = articleData.title || ''; // Mengisi judul, default string kosong
          this.deskripsi = articleData.content || ''; // Mengisi deskripsi, default string kosong
          this.status = articleData.is_published; // Mengisi status publikasi

          if (articleData.image_url) {
            this.imagePreview = articleData.image_url; // Mengisi preview gambar jika ada URL
          } else {
            this.imagePreview = null; // Pastikan null jika tidak ada URL gambar
          }

          // Mengisi data social media, default string kosong jika null/undefined
          if (articleData.social_media) {
            this.socialMedia.instagram = articleData.social_media.instagram || '';
            this.socialMedia.whatsapp = articleData.social_media.whatsapp || '';
            this.socialMedia.facebook = articleData.social_media.facebook || '';
            this.socialMedia.twitter = articleData.social_media.twitter || '';
          } else {
            // Jika social_media itu sendiri bisa null dari API
            this.socialMedia = { instagram: '', whatsapp: '', facebook: '', twitter: '' };
          }
        } else {
          console.error('ERROR (Edit Component): Unexpected API response structure or data is null:', response);
          this.errorMessage = 'Struktur respons API tidak sesuai atau data kosong. Data artikel tidak dapat dimuat.';
        }
        // >>>>>> AKHIR BAGIAN KRITIS <<<<<<

        this.isLoading = false; // Nonaktifkan loading state
      },
      (error: any) => { // Tambahkan tipe 'any' untuk error
        console.error('ERROR (Edit Component): Error fetching article details by slug:', error);
        this.errorMessage = error.error?.message || 'Gagal memuat detail artikel. Silakan coba lagi.';
        this.isLoading = false;
      }
    );
  }

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
    this.imagePreview = null; // Hapus preview gambar
    this.selectedFile = null; // Hapus referensi file yang dipilih
    // Saat onSubmit, ini akan menyebabkan 'image': 'null' terkirim
  }

  onSubmit(): void {
    if (!this.articleId) { // Pastikan ID artikel ada sebelum mencoba update
      this.errorMessage = 'ID Artikel tidak ditemukan untuk diperbarui.';
      return;
    }

    this.isLoading = true; // Aktifkan loading state saat menyimpan
    this.errorMessage = null; // Reset pesan error
    this.successMessage = null; // Reset pesan sukses

    const formData = new FormData(); // Buat objek FormData untuk mengirim data
    formData.append('title', this.judulArtikel);
    formData.append('content', this.deskripsi);
    formData.append('is_published', this.status.toString()); // Convert boolean status to string

    // Tambahkan data social media ke FormData
    formData.append('social_media[instagram]', this.socialMedia.instagram);
    formData.append('social_media[whatsapp]', this.socialMedia.whatsapp);
    formData.append('social_media[facebook]', this.socialMedia.facebook);
    formData.append('social_media[twitter]', this.socialMedia.twitter);

    // Tambahkan file gambar baru atau flag untuk menghapus gambar lama
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    } else if (this.imagePreview === null) {
      // Jika gambar dihapus dari preview dan tidak ada file baru, kirim 'null' ke backend
      formData.append('image', 'null');
    }
    // Jika imagePreview masih ada tapi selectedFile null, berarti tidak ada perubahan gambar,
    // tidak perlu mengirim 'image' lagi karena backend akan mempertahankan gambar lama.

    // >>>>>> PERUBAHAN KRITIS: HAPUS BARIS INI <<<<<<
    // formData.append('_method', 'PUT'); // Baris ini DIHAPUS karena service akan langsung PUT

    // Panggil service untuk memperbarui artikel (menggunakan articleId UUID)
    this.articleService.updateArticle(this.articleId, formData).subscribe(
      (response: any) => { // Tangani respons sukses dari API
        console.log('Artikel berhasil diperbarui:', response);
        this.successMessage = 'Artikel berhasil diperbarui!';
        this.isLoading = false; // Nonaktifkan loading
        // Redirect kembali ke halaman daftar artikel setelah sukses
        setTimeout(() => {
          this.router.navigate(['/admin/setting-article']);
        }, 2000);
      },
      (error: any) => { // Tangani error dari API
        console.error('ERROR updating article:', error);
        this.errorMessage = error.error?.message || 'Gagal memperbarui artikel. Silakan coba lagi.';
        this.isLoading = false; // Nonaktifkan loading
      }
    );
  }

  cancel(): void {
    console.log('Navigating back to articles list.');
    this.router.navigate(['/admin/setting-article']); // Kembali ke halaman daftar artikel
  }
}