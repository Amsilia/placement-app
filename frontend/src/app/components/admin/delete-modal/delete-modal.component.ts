import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {
  @Input() isAnySelected: boolean = false;
  @Input() isVisible: boolean = false;
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  onConfirm() {
    this.confirmDelete.emit();
  }

  onCancel() {
    this.closeModal.emit();
  }

}

