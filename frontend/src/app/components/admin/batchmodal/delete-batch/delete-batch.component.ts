import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-delete-batch',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './delete-batch.component.html',
  styleUrl: './delete-batch.component.scss'
})
export class DeleteBatchComponent {

  @Input() batch: { id: number; name: string } | null = null;
  @Output() batchDeleted = new EventEmitter<number>();
  @Output() modalClosed = new EventEmitter<void>();

  isVisible = false;

  openModal(batch: { id: number; name: string }) {
    this.batch = batch;
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  deleteBatch() {
    if (this.batch) {
      this.batchDeleted.emit(this.batch.id);
    }
    this.closeModal();
  }
}