import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-delete-modaltestimoni',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './delete-modaltestimoni.component.html',
  styleUrl: './delete-modaltestimoni.component.scss'
})
export class DeleteModaltestimoniComponent {

  @Input() isVisible: boolean = false; // Menentukan apakah modal terlihat atau tidak
  @Input() deleteAll: boolean = false; // Menentukan apakah akan menghapus artikel yang ditandai atau hanya satu artikel
  @Input() selectedTestimoniCount: number = 0; // Jumlah testimonial yang dipilih
  @Output() closeModal = new EventEmitter<void>(); // Event emitter untuk menutup modal
  @Output() confirmDelete = new EventEmitter<void>(); // Event emitter untuk mengonfirmasi penghapusan

  close() {
    this.closeModal.emit(); // Menutup modal
  }

  confirm() {
    this.confirmDelete.emit(); // Konfirmasi penghapusan artikel
  }
}
