// src/app/components/admin/detail-modal/detail-modal.component.ts
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Jika ada form di modal

@Component({
  selector: 'app-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule // Jika perlu FormsModule
  ],
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnChanges { // Hapus OnInit karena tidak ada fetch di sini
  @Input() isVisible: boolean = false;
  @Input() registrant: any | null = null; // Ini akan menerima data detail lengkap dari parent

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  isCopied: { [key: string]: boolean } = { phone: false, email: false };

  // Properti untuk menampilkan data (agar lebih rapi dan bisa handle null/undefined)
  displayData: {
    fullname?: string;
    status?: string;
    no_handphone?: string;
    email?: string;
    age?: number;
    employment_status?: string;
    last_education?: string;
    institution?: string;
    price?: number; // Ini adalah harga paket, bukan priceType
    documentUrl?: string; // URL dokumen
    documentName?: string; // Nama dokumen
    // Tambahkan properti lain yang Anda butuhkan
  } = {};


  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['registrant'] && this.registrant) {
      // Data registrant baru diterima, update displayData
      this.displayData = {
        fullname: this.registrant.fullname || '-',
        status: this.registrant.status || '-', // Perhatikan properti 'status' dari API
        no_handphone: this.registrant.no_handphone || '-',
        email: this.registrant.email || '-', // API response tidak ada email, tapi mungkin dari list data sebelumnya?
        age: this.registrant.age || '-',
        employment_status: this.registrant.employment_status || '-',
        last_education: this.registrant.last_education || '-',
        institution: this.registrant.institution || '-',
        price: this.registrant.price || 0, // Harga dari detail API
        documentUrl: this.registrant.document ? this.getFullDocumentUrl(this.registrant.document) : undefined, // URL dokumen
        documentName: this.registrant.document ? this.getFileNameFromUrl(this.registrant.document) : undefined, // Nama dokumen
        // ... isi properti lain dari respons API detail
      };
      // Reset status copy jika data berubah
      this.isCopied = { phone: false, email: false };
    } else if (changes['registrant'] && !this.registrant) {
      // Jika registrant menjadi null, reset displayData
      this.displayData = {};
    }
  }

  close(): void {
    this.closeModal.emit();
  }

  copyToClipboard(type: string, value: string | undefined): void {
    if (value) {
      navigator.clipboard.writeText(value).then(() => {
        this.isCopied[type] = true;
        setTimeout(() => {
          this.isCopied[type] = false;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Gagal menyalin. Pastikan browser Anda mengizinkan akses clipboard.');
      });
    }
  }

  // Helper untuk mendapatkan URL dokumen penuh jika backend hanya mengembalikan path
  // Asumsi: URL dokumen penuh adalah BASE_URL_STORAGE/path/to/document.pdf
  getFullDocumentUrl(path: string): string {
    // Anda perlu menentukan BASE_URL_STORAGE atau URL tempat dokumen disimpan
    // Contoh: 'http://localhost:3333/uploads'
    const BASE_URL_STORAGE = 'http://localhost:3333/uploads'; // <<< SESUAIKAN INI
    return `${BASE_URL_STORAGE}/${path}`;
  }

  // Helper untuk mendapatkan nama file dari URL atau path
  getFileNameFromUrl(url: string): string {
    try {
      const parts = url.split('/');
      return parts[parts.length - 1];
    } catch {
      return url; // Fallback jika tidak bisa di-parse
    }
  }
}