import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeletePaketbatchService } from '../../../../services/admin/delete-batchpacket/delete-paketbatch.service';
import { ToastService } from '../../../../services/utils/toast.service';


@Component({
  selector: 'app-delete-paket',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './delete-paket.component.html',
  styleUrl: './delete-paket.component.scss'
})
export class DeletePaketComponent {

  @Input() paket: { id: number; name: string } | null = null;
  @Output() paketDeleted = new EventEmitter<number>();
  @Output() modalClosed = new EventEmitter<void>();

  isVisible = false;
  isLoading = false;

  constructor(
    private deletePaketService: DeletePaketbatchService,
    private toastService: ToastService
  ) {}

  openModal(paket: { id: number; name: string }) {
    this.paket = paket;
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  deletepaket() {
    if (!this.paket) return;
    
    this.isLoading = true;
    this.deletePaketService.deletePackageData(this.paket.id).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastService.showToast(
          'Success',
          'Paket berhasil dihapus',
          'success'
        );
        this.paketDeleted.emit(this.paket!.id);
        this.closeModal();
      },
      error: (error) => {
        this.isLoading = false;
        this.toastService.showToast(
          'Failed',
          'Gagal menghapus paket',
          'error'
        );
        console.error('Failed to delete package', error);
      }
    });
  }
}
