import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-university-student',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CKEditorModule
  ],
  templateUrl: './university-student.component.html',
  styleUrl: './university-student.component.scss'
})
export class UniversityStudentComponent {

  @Input() isEditing!: boolean;
  public Editor = ClassicEditor;

  public editorConfig = {
    toolbar: [
      'heading', 
      '|',
      'bold', 'italic', 'underline', 
      '|',
      'numberedList', 
      '|',
      'undo', 'redo' 
    ]
  };

  // Changed packageData to an array of packages
  packageData = [
    {
      name: 'Special Price',
      price: 'IDR 24,999,999',
      description: `Fast Track Japan Job Placement
        - Pembelajaran Bahasa Jepang mulai N5 sampai N3
        - Pendampingan Pembuatan CV sesuai standar Jepang
        - Pendampingan dan Simulasi Interview
        - Matchmaking dan Seleksi Pekerjaan`
    }
  ];

  saveChanges() {
    console.log("Data saved:", this.packageData);
  }

  cancelChanges() {
    console.log("Changes canceled");
  }

  // Method to add a new package
  addPackage() {
    this.packageData.push({
      name: '',
      price: '',
      description: ''
    });
    console.log("Package added:", this.packageData);
  }

  // Method to delete the current package
  deletePackage(index: number) {
    this.packageData.splice(index, 1);
    console.log("Package deleted:", this.packageData);
  }
}