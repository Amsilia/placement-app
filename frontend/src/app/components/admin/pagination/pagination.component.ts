// src/app/components/admin/pagination/pagination.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  // Inputs dari parent DataRegistrantComponent
  @Input() totalItems = 0; // Harus dimulai dari 0 atau nilai default yang realistis
  @Input() itemsPerPage = 10;
  @Input() currentPage = 1;
  // Hapus @Input() batchId: string | null = null;
  // Hapus @Output() dataFetched = new EventEmitter<any[]>();

  // Outputs ke parent DataRegistrantComponent
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  perPageOptions = [10, 20, 30, 50, 100]; // Pilihan item per halaman
  visiblePages: (number | string)[] = [];

  // Hapus properti yang tidak seharusnya ada di komponen dumb ini
  // registrants: any[] = [];
  // loading = false;
  // errorMessage = '';
  // searchQuery = '';

  constructor() {
    // Tidak ada service injection di sini!
  }

  ngOnInit() {
    this.updateVisiblePages();
  }

  // Penting: Hanya perbarui tampilan paginasi saat input berubah
  ngOnChanges(changes: SimpleChanges) {
    // Hanya perbarui visiblePages jika ada perubahan pada totalItems, itemsPerPage, atau currentPage
    if (changes['totalItems'] || changes['itemsPerPage'] || changes['currentPage']) {
      this.updateVisiblePages();
    }
  }

  get totalPages(): number {
    return this.itemsPerPage > 0 ? Math.ceil(this.totalItems / this.itemsPerPage) : 0;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      // Hanya emit event, tidak panggil API di sini
      this.pageChange.emit(page);
      // updateVisiblePages akan dipanggil oleh ngOnChanges di parent setelah currentPage berubah
    }
  }

  onItemsPerPageChange(): void {
    // Hanya emit event, tidak panggil API di sini
    this.itemsPerPageChange.emit(this.itemsPerPage);
    // updateVisiblePages akan dipanggil oleh ngOnChanges di parent setelah itemsPerPage berubah
  }

  updateVisiblePages(): void {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const visiblePages: (number | string)[] = [];

    // Logika untuk menampilkan deret angka halaman (1, 2, ..., N)
    if (totalPages <= 7) { // Ubah batas untuk display semua halaman jika sedikit
        for (let i = 1; i <= totalPages; i++) {
            visiblePages.push(i);
        }
    } else {
        visiblePages.push(1);
        if (currentPage > 3) visiblePages.push('...');
        if (currentPage > 2) visiblePages.push(currentPage - 1);
        visiblePages.push(currentPage);
        if (currentPage < totalPages - 1) visiblePages.push(currentPage + 1);
        if (currentPage < totalPages - 2) visiblePages.push('...');
        visiblePages.push(totalPages);

        // Filter duplikat dan pastikan urutan
        const uniquePages = Array.from(new Set(visiblePages));
        this.visiblePages = uniquePages.sort((a, b) => {
            if (a === '...') return 1;
            if (b === '...') return -1;
            return (a as number) - (b as number);
        });
    }
  }
}



