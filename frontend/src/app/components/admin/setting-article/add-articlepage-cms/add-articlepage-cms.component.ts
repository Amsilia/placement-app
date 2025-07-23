import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ArticleService } from '../../../../services/artikel/article.service';
import { ToastService } from '../../../../services/utils/toast.service';

@Component({
  selector: 'app-add-articlepage-cms',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-articlepage-cms.component.html',
  styleUrls: ['./add-articlepage-cms.component.scss']
})
export class AddArticlepageCmsComponent {
  public Editor = ClassicEditor;
  isSubmitting = false;
  form: FormGroup;
  imagePreview: string | null = null; 
  socialMedia = { instagram: '', whatsapp: '', facebook: '', twitter: '' };

  editorConfig = {
    toolbar: [
      'fontFamily', 'fontSize', '|',
      'bold', 'italic', 'underline', '|',
      'link', 'bulletedList', 'numberedList', '|',
      'undo', 'redo',
    ],
    placeholder: 'Masukkan Deskripsi Artikel...',
  };

  constructor(private articleService: ArticleService, private toastService: ToastService) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      content: new FormControl('', Validators.required),
      image: new FormControl(null, Validators.required),
      is_published: new FormControl(true, Validators.required),
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
      this.form.patchValue({ image: file });
    }
  }

  removeImage(): void {
    this.imagePreview = null;
    this.form.patchValue({ image: null });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastService.showToast('Warning', 'Silakan lengkapi semua field yang diperlukan!', 'error');
      return;
    }
    try {
      this.isSubmitting = true;
      const formData = new FormData();
      Object.keys(this.form.controls).forEach(key => {
        formData.append(key, this.form.get(key)?.value);
      });

      this.articleService.createArticle(formData).subscribe({
        next: (res) => {
          this.isSubmitting = false;
          this.toastService.showToast('Success', 'Artikel Berhasil di Tambahkan!', 'success');
          this.form.reset();
          this.imagePreview = null;
          console.log(res);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.toastService.showToast('Error', 'Artikel Gagal di Tambahkan!', 'error');
          console.error(err);
        },
      });
    } catch (error) {
      this.isSubmitting = false;
      console.error(error);
    }
  }

  cancel(): void {
    this.form.reset();
    this.imagePreview = null;
  }
}
