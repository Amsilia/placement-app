import { Component, OnInit } from '@angular/core';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PricesService } from '../../services/pricing/prices.service';

// Interface untuk struktur data 'Price' dari API
interface Price {
  id: string;
  package_id: string;
  batch_id: string;
  name: string; // Nama price (e.g., "Normal Price", "Paket 1 Jerman")
  icon: string | null;
  amount: number;
  special_condition: string | null;
  created_at: string;
  updated_at: string;
  batch: any; // Anda bisa definisikan interface Batch jika perlu detail
  package: { // <-- Nested package object
    id: string;
    name: string; // Nama paket (e.g., "Kursus Bahasa Jepang")
    description: string | null; // <-- Ini deskripsinya
    created_at: string;
    updated_at: string;
  };
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CurrencyFormatPipe, CommonModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
  prices: Price[] = []; // Ubah tipe menjadi Price[]

  isLoading: boolean = true; // Tambahkan loading state
  errorMessage: string | null = null; // Tambahkan error state

  constructor(private router: Router, private pricesService: PricesService) {}

  ngOnInit(): void {
    this.loadPrices();
  }

  loadPrices(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const openStatus = true; // Sesuai logika Anda
    this.pricesService.getPrices(openStatus).subscribe(
      (response) => {
        console.log('DEBUG: API Response Prices (raw):', response); // <-- Log respons mentah dari API
        if (response && response.data) {
          this.prices = response.data; // Data sudah harus sesuai dengan interface Price[]
          console.log('DEBUG: Data prices after assignment:', this.prices); // <-- SANGAT PENTING: Log ini
        } else {
          this.prices = [];
          this.errorMessage = 'Tidak ada data paket yang tersedia.';
          console.warn('DEBUG: Respons API prices tidak memiliki properti data atau data kosong.');
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('ERROR fetching prices:', error);
        this.errorMessage = 'Gagal memuat data paket. Silakan coba lagi.';
        this.isLoading = false;
      }
    );
  }

  /**
   * Navigate to the appropriate price page based on special condition.
   * @param price - The price object containing special_condition.
   */
  navigateToPrice(price: Price): void { // Ubah tipe parameter menjadi Price
    const routePath = price.special_condition
      ? '/special-price'
      : '/normal-price';
    this.router.navigate([`${routePath}/${price.id}`]);
  }
}