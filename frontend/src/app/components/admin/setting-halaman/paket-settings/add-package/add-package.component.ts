import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule, CommonModule, CKEditorModule],
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent {
  public Editor = ClassicEditor;

  @Input() isEditing: boolean = false; // Kontrol mode edit

  @Output() packageAdded = new EventEmitter<any>();
  @Output() packageDeleted = new EventEmitter<void>();

  // Data untuk paket baru
  newPackage = {
    name: '',
    icon: '',
    iconPreview: '',
    price: '',
    description: ''
  };

  // Konfigurasi CKEditor
  public editorConfig = {
    toolbar: [
      'heading', '|', 'bold', 'italic', 'numberedList', 'bulletedList', '|', 'undo', 'redo'
    ],
  };

  private editorInstance: any;

  // Tangani instance editor saat siap
  onEditorReady(editor: any) {
    this.editorInstance = editor;
    this.setEditorReadonly();
  }

private setEditorReadonly() {
  if (this.editorInstance) {
    this.editorInstance.enableReadOnlyMode(!this.isEditing);
  }
}


onIconChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input?.files && input.files.length > 0) {
    const file = input.files[0];
    const reader = new FileReader();

    // Baca file dan simpan URL lokal untuk preview
    reader.onload = () => {
      this.newPackage.iconPreview = reader.result as string; // URL untuk preview gambar
      this.newPackage.icon = file.name; // Nama file
    };

    reader.readAsDataURL(file);
  }
}



  // Emit data paket baru ke komponen utama
  addNewPackage() {
    if (this.newPackage.name && this.newPackage.price && this.newPackage.description) {
      this.packageAdded.emit(this.newPackage);
      this.resetForm();
    } else {
      alert('Harap lengkapi semua kolom!');
    }
  }

  // Emit event untuk menghapus paket
  onDelete() {
    this.packageDeleted.emit();
  }

  // Reset form
  resetForm() {
    this.newPackage = {
      name: '',
      icon: '',
      iconPreview: '', 
      price: '',
      description: ''
    };
  }
}
