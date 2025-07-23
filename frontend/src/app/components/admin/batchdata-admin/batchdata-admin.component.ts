import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddBatchComponent } from '../batchmodal/add-batch/add-batch.component';
import { EditBatchComponent } from '../batchmodal/edit-batch/edit-batch.component';
import { DeleteBatchComponent } from '../batchmodal/delete-batch/delete-batch.component';
import { RegistrantPackageService } from '../../../services/admin/registrant/registrant.package.service';
import { BatchUpdate } from '../interface/batch.interface';

@Component({
  selector: 'app-batchdata-admin',
  standalone: true,
  imports: [
    CommonModule,
    AddBatchComponent,
    EditBatchComponent,
    DeleteBatchComponent,
  ],
  providers: [DatePipe],
  templateUrl: './batchdata-admin.component.html',
  styleUrl: './batchdata-admin.component.scss',
})
export class BatchdataAdminComponent {
  @Input() batches: any[] = [];
  // @Input() packagesId: string = '';
  packagesId: string = '';

  dropdownIndex: number | null = null; // Index dropdown yang sedang aktif

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private registrantPackageService: RegistrantPackageService
  ) {
    this.activeRoute.params.subscribe((params) => {
      this.packagesId = params['packagesId'];
      console.log('INI PAKET ID', this.packagesId);
    });
  }

  formatDateRange(startDate: string, endDate: string): string {
    const formattedStartDate = this.datePipe.transform(startDate, 'd MMM yyyy');
    const formattedEndDate = this.datePipe.transform(endDate, 'd MMM yyyy');
    return `${formattedStartDate} → ${formattedEndDate}`;
  }
  // Fungsi untuk membuka/menutup dropdown
  toggleDropdown(index: number, event: Event) {
    event.stopPropagation(); // Mencegah event klik merambat ke elemen lain
    this.dropdownIndex = this.dropdownIndex === index ? null : index;
  }

  onEdit(batch: any) {
    console.log('Edit batch:', batch);
    this.dropdownIndex = null;
  }

  onDelete(batch: any) {
    console.log('Hapus batch:', batch);
    this.dropdownIndex = null;
  }

  onViewData(event: Event, batchId: number) {
    event.stopPropagation();
    console.log('Navigasi ke data pendaftar batch ID:', batchId);
  }

  onAddBatch() {
    console.log('Tambah Batch button clicked');
  }

  navigateToRegistrant(batchId: string) {
    this.router.navigate([`/admin/data-package/data-registran/${batchId}`]);
  }
  navigateToPriceData(batchId: string) {
    this.router.navigate([`/admin/data-package/data-prices/${batchId}`]);
  }

  // MODAL ADD BATCH
  openAddBatchModal(modal: AddBatchComponent) {
    modal.openModal();
  }

  onBatchAdded(newBatch: {
    batch_number: string;
    start_date: Date;
    end_date: Date;
    open_at: Date;
    close_at: Date;
    is_active: boolean;
  }) {
    if (!this.packagesId) {
      console.error('Package ID tidak ditemukan!');
      return;
    }

    const batchData = {
      package_id: this.packagesId,
      batch_number: newBatch.batch_number,
      start_date: newBatch.start_date,
      end_date: newBatch.end_date,
      open_at: newBatch.open_at,
      close_at: newBatch.close_at,
      is_active: newBatch.is_active,
    };

    this.registrantPackageService.createBatches(batchData).subscribe({
      next: (response) => {
        console.log('Batch berhasil ditambahkan:', response.data);
        this.batches.push({
          ...response.data,
          dateRange: `${this.datePipe.transform(
            response.data.start_date,
            'd MMM yyyy'
          )} → ${this.datePipe.transform(
            response.data.end_date,
            'd MMM yyyy'
          )}`,
        });
      },
      error: (error) => {
        console.error('Gagal menambahkan batch:', error);
      },
    });
  }

  onModalClosed() {
    console.log('Modal ditutup.');
  }

  // MODAL EDIT BATCH
  openEditBatchModal(modal: EditBatchComponent, batch: any) {
    const batchData = {
      id: batch.id,
      name: batch.name,
      start_date: batch.start_date,
      end_date: batch.end_date,
      is_active: batch.is_active
    };
    modal.openModal(batchData);
  }
  

  onBatchUpdated(updatedBatch: BatchUpdate) {
    const index = this.batches.findIndex(batch => batch.id === updatedBatch.id);
    if (index !== -1) {
      this.batches[index] = {
        ...this.batches[index],
        ...updatedBatch
      };
    }
  
  }

  // MODAL DELETE BATCH
  openDeleteBatchModal(
    modal: DeleteBatchComponent,
    batch: { id: number; name: string }
  ) {
    modal.openModal(batch);
  }

  onBatchDeleted(batchId: number) {
    this.batches = this.batches.filter((batch) => batch.id !== batchId);
    console.log(`Batch dengan ID ${batchId} telah dihapus.`);
  }
}
