import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-delete-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-delete-article.component.html',
  styleUrls: ['./modal-delete-article.component.scss']
})
export class ModalDeleteArticleComponent {
  @Input() isVisible: boolean = false; // Menentukan apakah modal terlihat atau tidak
  @Input() deleteAll: boolean = false; // Menentukan apakah akan menghapus artikel yang ditandai atau hanya satu artikel
  @Input() selectedArticlesCount: number = 0; // Jumlah artikel yang dipilih
  @Output() closeModal = new EventEmitter<void>(); // Event emitter untuk menutup modal
  @Output() confirmDelete = new EventEmitter<void>(); // Event emitter untuk mengonfirmasi penghapusan

  close() {
    this.closeModal.emit(); // Menutup modal
  }

  confirm() {
    this.confirmDelete.emit(); // Konfirmasi penghapusan artikel
  }
}
