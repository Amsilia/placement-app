import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-add-paket',
  standalone: true,
  imports: [CommonModule, FormsModule, CKEditorModule],
  templateUrl: './add-paket.component.html',
  styleUrl: './add-paket.component.scss',
})
export class AddPaketComponent {
  @Output() paketAdded = new EventEmitter<{
    name: string;
    description: string;
  }>();
  @Output() modalClosed = new EventEmitter<void>();

  isVisible: boolean = false;
  packageName: string = '';
  packageDescription: string = '';
  public Editor = ClassicEditor;
  public editorConfig = {
    toolbar: [
      'fontFamily',
      'fontSize',
      '|',
      'bold',
      'italic',
      'underline',
      '|',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'undo',
      'redo',
    ],
    placeholder: 'Masukkan deskripsi paket...',
  };
  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.packageName && this.packageDescription) {
      this.paketAdded.emit({
        name: this.packageName,
        description: this.packageDescription,
      });
      this.closeModal();
    }
  }
}
