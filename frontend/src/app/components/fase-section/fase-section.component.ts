import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-fase-section',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './fase-section.component.html',
  styleUrl: './fase-section.component.scss',
  animations: [
    trigger('slideToggle', [
      state('collapsed', style({ height: '0px', overflow: 'hidden', padding: '0' })),
      state('expanded', style({ height: '*', padding: '0.5rem 0' })), // Apply padding only when expanded
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class FaseSectionComponent {
  openFaseIndex: number | null = null;

  fases = [
    {
      title: 'Fase Pertama',
      subheading: 'Selama 8 Bulan kamu akan belajar bahasa Jepang sampai N3',
      content: [
        'Menggunakan LMS untuk proses belajar yang lebih fleksibel.',
        'Terdapat 1 kali pertemuan dengan mentor pengajar dalam 1 minggu selama 8 bulan.'
      ]
    },
    {
      title: 'Fase Kedua',
      subheading: 'Pendampingan pembuatan CV/resume sesuai standar perusahaan di Jepang. ',
      content: [
        'Dilakukan secara paralel di bulan keempat/setelah menyelesaikan level N4.',
        'Workshop tatap muka secara daring.'
      ]
    },
    {
      title: 'Fase Ketiga',
      subheading: 'Pendampingan dan simulasi interview pekerjaan.',
      content: [
        'Dilakukan setelah menyelesaikan level N3 sekaligus sebagai bentuk ujian akhir kesiapan kerja.',
        'Workshop tatap muka secara daring baik secara kelompok maupun personal.'
      ]
    },
    {
      title: 'Fase Keempat',
      subheading: 'Matchmaking dan seleksi oleh perusahaan.',
      content: [
        'Kami akan memilihkan tawaran pekerjaan yang sesuai dengan kompetensimu serta mengurus administrasi yang diperlukan untuk proses seleksi.',
        'Proses seleksi pekerjaan secara daring berdasar peruasahaan Jepang yang membuka lowongan'
      ]
    },
  ];

  toggleFase(index: number) {
    this.openFaseIndex = this.openFaseIndex === index ? null : index;
  }
}