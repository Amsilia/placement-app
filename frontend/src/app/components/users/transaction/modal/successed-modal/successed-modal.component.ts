import { CommonModule, DatePipe, DecimalPipe } from '@angular/common'; // Tambahkan DatePipe, DecimalPipe
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs'; // Untuk konversi Observable ke Promise
import { environment } from '../../../../../../environment/environment'; // Pastikan path ini benar

// Definisi Interface untuk Struktur Data Transaksi
// PENTING: SESUAIKAN INTERFACE INI DENGAN RESPON API ADONISJS ANDA!
interface TransactionDetail {
  id?: string; // Mungkin ID transaksi dari API
  status: string;
  amount: number;
  created_at: string; // Tanggal dan waktu transaksi dari API
  fullname: string; // Nama pengirim dari API (misal: registrant fullname)
  // Contoh field tambahan dari API Anda jika ada:
  // no_handphone?: string;
  // institution?: string;
  // last_education?: string;
  // document?: string;
  // transfer_proof?: string;
}

@Component({
  selector: 'app-successed-modal',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe, // Tambahkan DatePipe
    DecimalPipe // Tambahkan DecimalPipe
  ],
  templateUrl: './successed-modal.component.html',
  styleUrl: './successed-modal.component.scss'
})
export class SuccessedModalComponent implements OnInit {

  @Input() transactionId!: string; // ID transaksi yang diterima dari komponen parent
  @Output() close = new EventEmitter<void>();

  transaction: TransactionDetail | null = null; // Data transaksi yang akan diisi dari API

  copied = false;
  isLoading = true; // Status loading saat mengambil data
  errorMessage: string | null = null; // Pesan error jika terjadi kesalahan

  // Injeksi HttpClient untuk membuat panggilan API
  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Pastikan transactionId ada sebelum memanggil API
    if (this.transactionId) {
      this.fetchTransactionDetails();
    } else {
      this.errorMessage = 'Transaction ID tidak tersedia untuk memuat detail.';
      this.isLoading = false;
    }
  }

  async fetchTransactionDetails() {
    this.isLoading = true;
    this.errorMessage = null; // Reset error message

    try {
      // PENTING: SESUAIKAN ENDPOINT API ANDA DI SINI
      // Contoh: const apiUrl = `${environment.apiUrl}/api/transactions/${this.transactionId}`;
      // Jika endpoint Anda adalah untuk mendapatkan satu registran yang berisi detail transaksi:
      const apiUrl = `${environment.baseUrl}/api/registrants/${this.transactionId}`;

      // Melakukan panggilan GET ke API
      const response: any = await lastValueFrom(this.http.get(apiUrl));

      // PENTING: SESUAIKAN PEMETAAN DATA INI DENGAN STRUKTUR RESPON API ANDA
      // Asumsi respons API adalah objek dengan properti 'data' yang berisi detail transaksi
      if (response && response.data) {
        this.transaction = {
          id: response.data.id,
          status: response.data.status || 'Diterima', // Gunakan status dari API, default 'Diterima'
          amount: response.data.price, // Asumsi price adalah jumlah transaksi
          created_at: response.data.created_at,
          fullname: response.data.fullname, // Nama pengirim dari API
          // Tambahkan pemetaan field lain jika diperlukan:
          // no_handphone: response.data.no_handphone,
          // institution: response.data.institution,
          // last_education: response.data.last_education,
        };
      } else {
        this.errorMessage = 'Data transaksi tidak ditemukan dalam respons API.';
      }
    } catch (error: any) {
      console.error('Error saat mengambil detail transaksi:', error);
      this.errorMessage = `Gagal memuat detail transaksi. Coba lagi. (${error.message || 'Error tidak diketahui'})`;
    } finally {
      this.isLoading = false; // Selesai loading, baik berhasil atau gagal
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
    // Gunakan optional chaining (?) dan fallback untuk nilai yang mungkin null
    const transactionIdDisplay = this.transactionId || 'Tidak Tersedia';
    const transactionStatusDisplay = this.transaction?.status || 'Tidak Tersedia';
    const transactionAmountDisplay = this.transaction?.amount ? this.transaction.amount.toLocaleString('id-ID') : 'Tidak Tersedia';
    const senderNameDisplay = this.transaction?.fullname || 'Tidak Tersedia'; 

    
    const message = `Halo, saya ingin bertanya mengenai transaksi atas nama ${senderNameDisplay} dengan ID: ${transactionIdDisplay}. dengan jumlah: Rp${transactionAmountDisplay}.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
}