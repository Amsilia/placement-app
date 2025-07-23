import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditPaketbatchService } from '../../../../services/admin/edit-batchpacket/edit-paketbatch.service';

export interface BatchUpdate {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  is_active?: boolean;
}

@Component({
  selector: 'app-edit-batch',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './edit-batch.component.html',
  styleUrl: './edit-batch.component.scss'
})
export class EditBatchComponent {

  @Input() batch: BatchUpdate = {
    id: '',
    name: '',
    start_date: '',
    end_date: '',
    is_active: true
  };


  @Output() batchUpdated = new EventEmitter<BatchUpdate>();

  @Output() modalClosed = new EventEmitter<void>();

  isVisible = false;
  loading = false;

  constructor(private editBatchService: EditPaketbatchService) {}

  openModal(batch: any) {
    this.batch = {
      ...batch,
      id: batch.id.toString(), // Pastikan id menjadi string
    };
    this.isVisible = true;
  }
  

  closeModal() {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.loading = true;

    const updatedBatch: BatchUpdate = {
      id: this.batch.id,
      name: this.batch.name,
      start_date: new Date(this.batch.start_date).toISOString(),
      end_date: new Date(this.batch.end_date).toISOString(),
      is_active: this.batch.is_active
    };

    this.editBatchService.editBatchData(updatedBatch)
      .subscribe({
        next: (response) => {
          console.log('Update berhasil', response);
          this.batchUpdated.emit(response.data); // Emit response data dari API
          this.closeModal();
        },
        error: (error) => {
          console.error('Gagal memperbarui batch', error);
        },
        complete: () => {
          this.loading = false;
        }
      });
  }
}
