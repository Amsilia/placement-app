import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-batch',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './add-batch.component.html',
  styleUrl: './add-batch.component.scss',
})
export class AddBatchComponent {
  @Output() batchAdded = new EventEmitter<{
    package_id: string;
    batch_number: string;
    start_date: Date;
    end_date: Date;
    open_at: Date;
    close_at: Date;
    is_active: boolean;
  }>();
  @Output() modalClosed = new EventEmitter<void>();

  isVisible = false;
  batchNumber: string = '';
  startDate: any = '';
  endDate: any = '';
  openAt: any = '';
  closeAt: any = '';
  isActive: boolean = true;

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    // Validate required fields
    if (
      this.batchNumber &&
      this.startDate &&
      this.endDate &&
      this.openAt &&
      this.closeAt
    ) {
      this.batchAdded.emit({
        package_id: '', 
        batch_number: this.batchNumber,
        start_date: this.startDate,
        end_date: this.endDate,
        open_at: this.openAt,
        close_at: this.closeAt,
        is_active: this.isActive,
      });
      this.closeModal();
    } else {
      alert('All fields are required!');
    }
  }
}
