// src/app/pages/admin/registration-data/data-registrant/data-registrant.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { SidebarComponent } from '../../../../components/admin/sidebar/sidebar.component';
import { HeaderAdminComponent } from '../../../../components/admin/header/header.component';
import { PaginationComponent } from '../../../../components/admin/pagination/pagination.component';
import { DetailModalComponent } from '../../../../components/admin/detail-modal/detail-modal.component';
import { EditModalComponent } from '../../../../components/admin/edit-modal/edit-modal.component';
import { DeleteModalComponent } from '../../../../components/admin/delete-modal/delete-modal.component';
import { RegistrantPackageService } from '../../../../services/admin/registrant/registrant.package.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-data-registrant',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderAdminComponent,
    CommonModule,
    FormsModule,
    PaginationComponent,
    DetailModalComponent,
    EditModalComponent,
    DeleteModalComponent,
  ],
  templateUrl: './data-registrant.component.html',
  styleUrls: ['./data-registrant.component.scss'],
})
export class DataRegistrantComponent implements OnInit {
  registrants: any[] = [];

  batchId: string | null = null;
  batchName: string = '';
  batchPeriod: string = '';

  loading = false;
  errorMessage: string = '';

  isMinimized = false;
  isModalVisible = false;
  isEditModalVisible = false;
  isDeleteModalVisible: boolean = false;

  selectedRegistrant: any = null;
  registrantIdToDelete: string | null = null;

  searchQuery: string = '';
  selectedStatus: string | null = null;
  selectedPriceType: string | null = null;

  filterOptionsVisible = false;
  sortOptionsVisible = false;

  currentPage = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  lastPage: number = 1;

  isAnySelected: boolean = false;

  private searchSubject = new Subject<string>();


  constructor(
    private registrantPackageService: RegistrantPackageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.batchId = params.get('batchId');
      console.log('NGONINIT: batchId retrieved from route params:', this.batchId);
      if (this.batchId) {
        this.fetchRegistrants();
      } else {
        this.errorMessage = 'Batch ID tidak ditemukan di URL. Pastikan Anda mengakses URL yang benar (e.g., /admin/data-package/:batchId/registrant).';
        console.error(this.errorMessage);
        const allParams: { [key: string]: string | string[] } = {};
        params.keys.forEach(key => {
            const value = params.get(key);
            if (value) {
                allParams[key] = value;
            }
        });
        console.error('Missing batchId. All route params:', allParams);
      }
    });

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.searchQuery = searchTerm;
      this.currentPage = 1;
      this.fetchRegistrants();
    });
  }

  fetchRegistrants(): void {
    console.log('FETCH REGISTRANTS CALLED. Current batchId:', this.batchId);
    if (!this.batchId) {
      this.errorMessage = 'Batch ID tidak tersedia untuk memuat data.';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.registrantPackageService.getRegistrantByBatchId(
      this.batchId,
      this.currentPage,
      this.itemsPerPage,
      this.searchQuery,
      this.selectedStatus,
      this.selectedPriceType
    ).subscribe({
      next: (response) => {
        this.registrants = response.data.map((r: any) => ({
          ...r,
          selected: false,
          registeredDate: new Date(r.registered_date),
          priceType: r.price_type || r.price || '-',
          // --- PERBAIKAN DI SINI UNTUK STATUS (LANGSUNG DARI API) ---
          // Sekarang, properti 'status' sudah ada di objek 'r' dari API list
          status: r.status // Cukup gunakan properti 'status' langsung dari respons API
        }));

        this.totalItems = response.total;
        this.currentPage = response.page;
        this.itemsPerPage = response.perPage;
        this.lastPage = response.lastPage;

        this.loading = false;
        this.checkIfAnySelected();
      },
      error: (err) => {
        console.error('Error fetching registrants:', err);
        this.errorMessage = 'Gagal memuat data pendaftar. Silakan coba lagi.';
        this.loading = false;
      }
    });
  }

  onPageChange(newPage: number): void {
    if (newPage !== this.currentPage) {
      this.currentPage = newPage;
      this.fetchRegistrants();
    }
  }

  onItemsPerPageChange(newLimit: number): void {
    if (newLimit !== this.itemsPerPage) {
      this.itemsPerPage = newLimit;
      this.currentPage = 1;
      this.fetchRegistrants();
    }
  }

  onSearchInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchSubject.next(inputElement.value);
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.fetchRegistrants();
  }

  sortData(criteria: string): void {
    switch (criteria) {
      case 'name_asc':
        this.registrants.sort((a, b) => a.fullname.localeCompare(b.fullname));
        break;
      case 'name_desc':
        this.registrants.sort((a, b) => b.fullname.localeCompare(a.fullname));
        break;
      case 'date_newest':
        this.registrants.sort((a, b) => b.registeredDate.getTime() - a.registeredDate.getTime());
        break;
      case 'date_oldest':
        this.registrants.sort((a, b) => a.registeredDate.getTime() - b.registeredDate.getTime());
        break;
    }
    this.sortOptionsVisible = false;
  }

  exportToExcel(): void {
    if (this.registrants.length === 0) {
      alert('Tidak ada data untuk diekspor.');
      return;
    }

    const dataToExport = this.registrants.map(reg => ({
      'Tanggal Daftar': reg.registeredDate.toLocaleDateString('id-ID'),
      'Nama Lengkap': reg.fullname,
      'Email': reg.email || '-',
      'Nomor WhatsApp': reg.no_handphone || '-', // Menggunakan no_handphone
      'Jenis Paket': reg.priceType,
      'Status': reg.status
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Pendaftar');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, 'Data Pendaftar');
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
  }

  onSidebarToggle(minimized: boolean): void {
    this.isMinimized = minimized;
  }

  checkIfAnySelected(): void {
    this.isAnySelected = this.registrants.some((registrant) => registrant.selected);
  }

  onSelectAll(event: any): void {
    const isChecked = event.target.checked;
    this.registrants.forEach((registrant) => (registrant.selected = isChecked));
    this.checkIfAnySelected();
  }

  onSingleSelect(): void {
    this.checkIfAnySelected();
  }

  toggleFilterOptions(): void {
    this.filterOptionsVisible = !this.filterOptionsVisible;
    if (this.filterOptionsVisible) this.sortOptionsVisible = false;
  }

  toggleSortOptions(): void {
    this.sortOptionsVisible = !this.sortOptionsVisible;
    if (this.sortOptionsVisible) this.filterOptionsVisible = false;
  }

  onDetail(registrantDataRingkas: any): void {
    if (!registrantDataRingkas || !registrantDataRingkas.id) {
      console.error('Registrant ID is missing for detail view.');
      this.errorMessage = 'Gagal menampilkan detail: ID pendaftar tidak ditemukan.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.registrantPackageService.getRegistrantById(registrantDataRingkas.id).subscribe({
      next: (response) => {
        this.selectedRegistrant = response.data;
        this.loading = false;
        this.isModalVisible = true;
        console.log('Detail Registrant fetched and set:', this.selectedRegistrant);
      },
      error: (err) => {
        console.error('Error fetching registrant details:', err);
        this.errorMessage = 'Gagal memuat detail pendaftar. Silakan coba lagi.';
        this.loading = false;
        this.isModalVisible = false;
      }
    });
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedRegistrant = null;
    this.errorMessage = '';
  }

  onEdit(registrant: any): void {
    this.selectedRegistrant = { ...registrant };
    this.isEditModalVisible = true;
  }

  closeEditModal(): void {
    this.isEditModalVisible = false;
    this.selectedRegistrant = null;
    this.fetchRegistrants();
  }

  saveEditedData(updatedRegistrant: any): void {
    this.registrantPackageService.updateRegistrant(updatedRegistrant.id, updatedRegistrant).subscribe({
      next: (response) => {
        console.log('Registrant updated successfully:', response);
        this.closeEditModal();
      },
      error: (err) => {
        console.error('Error updating registrant:', err);
        this.errorMessage = 'Gagal menyimpan perubahan. Silakan coba lagi.';
      }
    });
  }

  onDelete(registrantId: string): void {
    this.registrantIdToDelete = registrantId;
    this.isDeleteModalVisible = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalVisible = false;
    this.registrantIdToDelete = null;
  }

  confirmDelete(): void {
    if (this.registrantIdToDelete) {
      this.registrantPackageService.deleteRegistrant(this.registrantIdToDelete).subscribe({
        next: () => {
          console.log('Registrant deleted successfully.');
          this.closeDeleteModal();
          this.fetchRegistrants();
        },
        error: (err) => {
          console.error('Error deleting registrant:', err);
          this.errorMessage = 'Gagal menghapus pendaftar. Silakan coba lagi.';
          this.closeDeleteModal();
        }
      });
    } else {
      this.closeDeleteModal();
    }
  }
}