import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-flowregist-section',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './flowregist-section.component.html',
  styleUrls: ['./flowregist-section.component.scss']
})
export class FlowregistSectionComponent {
  registrationSteps = [
    {
      step: 1,
      title: 'Isi Form',
      description: 'Pilih layanan yang Anda butuhkan. Selanjutnya lengkapi form yang tersedia.',
      icon: 'assets/image/icons/pencil-square.svg',
      stepnumber: 'assets/image/icons/number1.svg'
    },
    {
      step: 2,
      title: 'Konfirmasi Pendaftaran',
      description: 'Data Anda telah masuk dalam daftar pendaftar. Tim kami akan menghubungi Anda melalui WhatsApp/email untuk konfirmasi.',
      icon: 'assets/image/icons/card-checklist.svg',
      stepnumber: 'assets/image/icons/number2.svg'
    },
    {
      step: 3,
      title: 'Lakukan Pembayaran',
      description: 'Silakan lakukan pembayaran melalui Virtual Account yang dikirimkan ke email atau WhatsApp. Anda dapat memilih pembayaran penuh atau cicilan.',
      icon: 'assets/image/icons/wallet.svg',
      stepnumber: 'assets/image/icons/number3.svg'

    },
    {
      step: 4,
      title: 'Siap Memulai!',
      description: 'Setelah verifikasi pembayaran selesai, pendaftaran Anda telah berhasil dan Anda siap memulai program yang dipilih.',
      icon: 'assets/image/icons/calendar2.svg',
      stepnumber: 'assets/image/icons/number4.svg'
    }
  ];
}
