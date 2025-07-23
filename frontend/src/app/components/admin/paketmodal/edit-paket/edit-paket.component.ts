import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditPaketbatchService } from '../../../../services/admin/edit-batchpacket/edit-paketbatch.service';

@Component({
  selector: 'app-edit-paket',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './edit-paket.component.html',
  styleUrl: './edit-paket.component.scss'
})
export class EditPaketComponent {

  @Input() paket: { id: string; name: string; description: string } = { id: '', name: '', description: '' };
  @Output() paketUpdated = new EventEmitter<{ id: string; name: string; description: string }>();
  @Output() modalClosed = new EventEmitter<void>();

  isVisible = false;
  isSubmitting = false;
  updateSuccess = false; // Variabel untuk status update
  errorMessage: string | null = null; // Untuk error handling

  constructor(private editPaketbatchService: EditPaketbatchService) {}

  openModal(paket: { id: string; name: string; description: string }) {
    this.paket = { ...paket }; // Create a copy to prevent two-way binding issues
    this.isVisible = true;
    this.updateSuccess = false; // Reset status ketika modal dibuka
    this.errorMessage = null; // Reset error message
  }

  closeModal() {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.isSubmitting = true;

    // Panggil service untuk update data
    this.editPaketbatchService.editPackageData(this.paket).subscribe({
      next: (response : any) => {
        console.log('Paket berhasil diperbarui:', response);
        this.updateSuccess = true; // Tandai update berhasil
        this.paketUpdated.emit(this.paket); // Emit event jika perlu
        this.closeModal();
      },
      error: (error : any) => {
        console.error('Error saat memperbarui paket:', error);
        this.errorMessage = 'Terjadi kesalahan saat memperbarui paket'; // Menampilkan pesan error
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}

