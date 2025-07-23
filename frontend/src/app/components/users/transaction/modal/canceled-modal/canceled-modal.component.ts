// src/app/components/canceled-modal/canceled-modal.component.ts
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../../../environment/environment'; // Pastikan path ini benar

// Definisi Interface untuk Struktur Data Transaksi
// PENTING: SESUAIKAN INTERFACE INI DENGAN RESPON API ADONISJS ANDA!
interface TransactionDetail {
  id?: string; // ID transaksi dari API
  status: string; // Status transaksi dari API (misal: "Ditolak", "Dibatalkan", "Kadaluarsa", dll.)
  amount: number; // Jumlah transaksi dari API
  created_at: string; // Tanggal dan waktu transaksi dari API (dalam format ISO string)
  fullname: string; // Nama pengirim dari API
  description?: string; // Keterangan atau alasan pembatalan dari API jika ada
  // Tambahkan field lain jika ada
}

@Component({
  selector: 'app-canceled-modal', // Selector komponen
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './canceled-modal.component.html', // Template HTML
  styleUrl: './canceled-modal.component.scss' // File styling
})
export class CanceledModalComponent implements OnInit { // Nama kelas komponen

  @Input() transactionId!: string; // ID transaksi yang diterima dari komponen parent
  @Output() close = new EventEmitter<void>();

  transaction: TransactionDetail | null = null;

  copied = false;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if (this.transactionId) {
      this.fetchTransactionDetails();
    } else {
      this.errorMessage = 'Transaction ID tidak tersedia untuk memuat detail.';
      this.isLoading = false;
    }
  }

  async fetchTransactionDetails() {
    this.isLoading = true;
    this.errorMessage = null;

    try {
      // PENTING: SESUAIKAN ENDPOINT API ANDA DI SINI
      // Ini harusnya endpoint yang mengembalikan detail transaksi berdasarkan ID
      const apiUrl = `${environment.baseUrl}/api/registrants/${this.transactionId}`;

      const response: any = await lastValueFrom(this.http.get(apiUrl));

      // PENTING: SESUAIKAN PEMETAAN DATA INI DENGAN STRUKTUR RESPON API ANDA
      if (response && response.data) {
        this.transaction = {
          id: response.data.id,
          status: response.data.status || 'Dibatalkan', // Ambil status dari API, default 'Dibatalkan'
          amount: response.data.price || 0,
          created_at: response.data.created_at,
          fullname: response.data.fullname,
          // Contoh field 'description' yang mungkin ada di API Anda
          description: response.data.cancellation_reason || response.data.rejection_reason || 'Belum ada konfirmasi yang diterima, dan batas waktu sudah terlewati'
        };
      } else {
        this.errorMessage = 'Data transaksi tidak ditemukan dalam respons API.';
      }
    } catch (error: any) {
      console.error('Error saat mengambil detail transaksi (Canceled):', error);
      this.errorMessage = `Gagal memuat detail transaksi. Coba lagi. (${error.message || 'Error tidak diketahui'})`;
    } finally {
      this.isLoading = false;
    }
  }

  closeModal() {
    this.close.emit();
  }

  copyToClipboard() {
    if (this.transactionId) {
        navigator.clipboard.writeText(this.transactionId).then(
            () => {
                this.copied = true;
                setTimeout(() => {
                    this.copied = false;
                }, 2000);
            },
            (err) => {
                console.error('Gagal menyalin teks ke clipboard: ', err);
                alert('Gagal menyalin ID transaksi.');
            }
        );
    } else {
        alert('ID transaksi tidak tersedia untuk disalin.');
    }
  }

  openWhatsAppChat() {
    const phoneNumber = '62881026867351';
    const transactionIdDisplay = this.transactionId || 'Tidak Tersedia';
    const transactionStatusDisplay = this.transaction?.status || 'Tidak Tersedia';
    const transactionAmountDisplay = this.transaction?.amount ? this.transaction.amount.toLocaleString('id-ID') : 'Tidak Tersedia';
    const senderNameDisplay = this.transaction?.fullname || 'Tidak Tersedia';

    const message = `Halo, saya ingin bertanya mengenai transaksi atas nama ${senderNameDisplay} dengan ID: ${transactionIdDisplay}. Status: ${transactionStatusDisplay}. Jumlah: Rp${transactionAmountDisplay}.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  // Helper untuk styling status berdasarkan nilai dinamis
  getStatusColorClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'ditolak':
      case 'dibatalkan':
      case 'kadaluarsa':
        return 'bg-[#BB2D3B]'; // Merah
      case 'diterima':
      case 'selesai':
        return 'bg-[#198754]'; // Hijau
      case 'pending':
      case 'menunggu_pembayaran':
        return 'bg-[#FFC107]'; // Kuning
      default:
        return 'bg-gray-500'; // Default abu-abu
    }
  }

  // Helper untuk mendapatkan warna background di bagian 'Body'
  getBodyBackgroundColorClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'ditolak':
      case 'dibatalkan':
      case 'kadaluarsa':
        return 'bg-[#FFEAED]'; // Merah muda untuk batal
      case 'diterima':
      case 'selesai':
        return 'bg-[#D4EDDA]'; // Hijau muda untuk sukses
      case 'pending':
      case 'menunggu_pembayaran':
        return 'bg-[#FFF3CD]'; // Kuning muda untuk pending
      default:
        return 'bg-gray-100'; // Default abu-abu muda
    }
  }
}