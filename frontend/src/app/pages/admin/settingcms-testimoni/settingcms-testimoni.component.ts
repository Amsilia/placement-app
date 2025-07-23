import { Component, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../../../components/admin/header/header.component';
import { SidebarComponent } from '../../../components/admin/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationTestimonicmsComponent } from '../../../components/admin/setting-testimoni/pagination-testimonicms/pagination-testimonicms.component';
import { DeleteModaltestimoniComponent } from '../../../components/admin/setting-testimoni/delete-modaltestimoni/delete-modaltestimoni.component';

import { TestimoniService } from '../../../services/admin/testimoni/testimoni.service'; // Import TestimoniService
// import { ToastrService } from 'ngx-toastr'; // <-- DIHAPUS: Tidak perlu ngx-toastr

interface Testimoni {
  id?: string; // ID sekarang STRING (UUID) dari API
  date: string;
  name: string;
  job: string;
  status: string; // Misal 'Publik' atau 'Privat'
  selected?: boolean; // Untuk checkbox di tabel
}

@Component({
  selector: 'app-settingcms-testimoni',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    SidebarComponent,
    CommonModule,
    FormsModule,
    PaginationTestimonicmsComponent,
    DeleteModaltestimoniComponent,
  ],
  templateUrl: './settingcms-testimoni.component.html',
  styleUrl: './settingcms-testimoni.component.scss',
})
export class SettingcmsTestimoniComponent implements OnInit {
  isMinimized = false;
  searchQuery: string = '';
  sortOptionsVisible: boolean = false;
  filterOptionsVisible: boolean = false;
  selectedStatus: string | null = null;
  sortType: string = 'date_newest'; // Default sort

  paginatedTestimoni: Testimoni[] = [];
  allTestimoni: Testimoni[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalTestimoniCount = 0;

  isModalVisible = false;
  deleteAll = false;
  selectedTestimoniCount = 0;
  testimoniToDelete: Testimoni | null = null;

  constructor(
    private router: Router,
    private testimoniService: TestimoniService, // Inject TestimoniService
    // private toastr: ToastrService // <-- DIHAPUS: Tidak perlu ngx-toastr
  ) {}

  ngOnInit() {
    this.loadTestimonies();
  }

  onSidebarToggle(minimized: boolean) {
    this.isMinimized = minimized;
  }

  loadTestimonies() {
    this.testimoniService
      .getAllTestimonies(this.currentPage, this.itemsPerPage, this.searchQuery, this.getIsPublishedFilter())
      .subscribe(
        (response: any) => {
          console.log('DEBUG: API Response for testimoni list:', response);
          if (response && response.data) {
            this.paginatedTestimoni = response.data.map((item: any) => ({
              id: item.id,
              date: new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }),
              name: item.name,
              job: item.job,
              status: item.is_published ? 'Publik' : 'Privat',
              selected: false,
            }));
            this.totalTestimoniCount = response.total || this.paginatedTestimoni.length;
          } else {
            this.paginatedTestimoni = [];
            this.totalTestimoniCount = 0;
            console.warn('DEBUG: Respons API testimoni tidak memiliki properti data atau data kosong.');
          }
          this.updateSelectedTestimoniCount();
        },
        (error) => {
          console.error('ERROR: Error fetching testimonies:', error);
          alert('Gagal memuat daftar testimoni.'); // <-- Kembali ke alert atau console log
        }
      );
  }

  getIsPublishedFilter(): boolean | null {
    if (this.selectedStatus === 'Publik') return true;
    if (this.selectedStatus === 'Privat') return false;
    return null;
  }

  filterTestimoni() {
    this.currentPage = 1;
    this.loadTestimonies();
  }

  sortData(sortType: string) {
    this.sortType = sortType;
    let sortedData = [...this.paginatedTestimoni];
    const parseDate = (dateStr: string): number => {
      const [day, month, year] = dateStr.split('/').map(Number);
      return new Date(year, month - 1, day).getTime();
    };

    switch (sortType) {
      case 'name_asc':
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        sortedData.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'date_newest':
        sortedData.sort((a, b) => parseDate(b.date) - parseDate(a.date));
        break;
      case 'date_oldest':
        sortedData.sort((a, b) => parseDate(a.date) - parseDate(b.date));
        break;
    }
    this.paginatedTestimoni = sortedData;
    this.toggleSortOptions();
  }

  navigateToAddTestimoni() {
    this.router.navigate(['/admin/setting-testimoni/add-testimonial']);
  }

  navigateToEditTestimoni(testimoniId: string | undefined) {
    console.log('DEBUG: navigateToEditTestimoni called with ID:', testimoniId);
    if (testimoniId) {
      this.router.navigate(['/admin/setting-testimoni/edit-testimonial', testimoniId]);
    } else {
      console.error('ERROR: Cannot navigate. Testimoni ID is undefined or null.');
      alert('ID testimoni tidak valid. Navigasi Gagal!'); // <-- Kembali ke alert
    }
  }

  onFilterChange() {
    this.filterTestimoni();
  }

  toggleSortOptions() {
    this.sortOptionsVisible = !this.sortOptionsVisible;
  }

  toggleFilterOptions() {
    this.filterOptionsVisible = !this.filterOptionsVisible;
  }

  onPageChange(page: number) {
    if (page === this.currentPage) return;
    this.currentPage = page;
    this.loadTestimonies();
  }

  onItemsPerPageChange(itemsPerPage: number) {
    if (itemsPerPage === this.itemsPerPage) return;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.loadTestimonies();
  }

  onSingleSelect() {
    this.updateSelectedTestimoniCount();
  }

  updateSelectedTestimoniCount() {
    this.selectedTestimoniCount = this.paginatedTestimoni.filter(
      (testimoni) => testimoni.selected
    ).length;
  }

  openDeleteModal(deleteAll: boolean, testimoniToDelete?: Testimoni) {
    this.deleteAll = deleteAll;
    this.testimoniToDelete = deleteAll ? null : testimoniToDelete || null;
    this.isModalVisible = true;
  }

  closeDeleteModal() {
    this.isModalVisible = false;
    this.deleteAll = false;
    this.testimoniToDelete = null;
  }

  confirmDelete() {
    if (this.deleteAll) {
      const selectedTestimoniIds = this.paginatedTestimoni
        .filter((testimoni) => testimoni.selected)
        .map((testimoni) => testimoni.id)
        .filter(Boolean) as string[];

      if (selectedTestimoniIds.length > 0) {
        console.log('DEBUG: Menghapus testimoni yang dipilih:', selectedTestimoniIds);
        this.testimoniService.deleteMultipleTestimonies(selectedTestimoniIds).subscribe(
          (response) => {
            console.log('DEBUG: Testimoni berhasil dihapus:', response);
            alert('Testimoni berhasil dihapus!'); // <-- Kembali ke alert
            this.closeDeleteModal();
            this.loadTestimonies();
          },
          (error) => {
            console.error('ERROR: Gagal menghapus testimoni:', error);
            const errorMessage = error.error?.message || error.message || 'Terjadi kesalahan saat menghapus beberapa testimoni.';
            alert(`Gagal menghapus testimoni: ${errorMessage}`); // <-- Kembali ke alert
            this.closeDeleteModal();
          }
        );
      } else {
        alert('Tidak ada testimoni yang dipilih untuk dihapus.'); // <-- Kembali ke alert
        this.closeDeleteModal();
      }
    } else if (this.testimoniToDelete && this.testimoniToDelete.id) {
      console.log('DEBUG: Menghapus testimoni:', this.testimoniToDelete.id);
      this.testimoniService.deleteTestimoni(this.testimoniToDelete.id).subscribe(
        (response) => {
          console.log('DEBUG: Testimoni berhasil dihapus:', response);
          alert('Testimoni berhasil dihapus!'); // <-- Kembali ke alert
          this.closeDeleteModal();
          this.loadTestimonies();
        },
        (error) => {
          console.error('ERROR: Gagal menghapus testimoni:', error);
          const errorMessage = error.error?.message || error.message || 'Terjadi kesalahan saat menghapus testimoni.';
          alert(`Gagal menghapus testimoni: ${errorMessage}`); // <-- Kembali ke alert
          this.closeDeleteModal();
        }
      );
    } else {
      console.warn('DEBUG: confirmDelete dipanggil tanpa ID testimoni atau testimoni yang dipilih.');
      this.closeDeleteModal();
    }
  }
}
