import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-pagination-article',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './pagination-article.component.html',
  styleUrl: './pagination-article.component.scss'
})
export class PaginationArticleComponent {

  @Input() totalItems: number = 0; // Total jumlah item
  @Input() itemsPerPage: number = 10; // Jumlah item per halaman
  @Input() currentPage: number = 1; // Halaman aktif
  @Output() pageChange = new EventEmitter<number>(); // Emit perubahan halaman
  @Output() itemsPerPageChange = new EventEmitter<number>(); // Emit perubahan jumlah item per halaman

  perPageOptions: number[] = [10, 20, 30, 50]; // Opsi jumlah item per halaman

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage); // Total jumlah halaman
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }

  getPages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const totalPages = this.totalPages;
  
    if (totalPages <= 7) {
      // Jika total halaman <= 7, tampilkan semua halaman
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Halaman awal
      pages.push(1);
      if (this.currentPage > 4) {
        pages.push('...');
      }
  
      // Halaman tengah (di sekitar halaman aktif)
      const startPage = Math.max(2, this.currentPage - 2);
      const endPage = Math.min(totalPages - 1, this.currentPage + 2);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
  
      // Halaman akhir
      if (this.currentPage < totalPages - 3) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
  
    return pages;
  }
  

  onItemsPerPageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(selectElement.value);
    this.currentPage = 1; // Reset ke halaman pertama
    this.itemsPerPageChange.emit(this.itemsPerPage);
    this.pageChange.emit(this.currentPage); // Emit halaman pertama
  }
} 
