import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaketNavigationComponent } from "./paket-navigation/paket-navigation.component";
import { GraduateStudentComponent } from "./graduate-student/graduate-student.component";
import { UniversityStudentComponent } from "./university-student/university-student.component";

@Component({
  selector: 'app-paket-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PaketNavigationComponent,
    GraduateStudentComponent,
    UniversityStudentComponent
],
  templateUrl: './paket-settings.component.html',
  styleUrls: ['./paket-settings.component.scss']
})
export class PaketSettingsComponent {

  isEditing = false;
  selectedPackage = 'graduate';
  packages: Array<any> = [];

  addNewPackage(packageData: any) {
    this.packages.push(packageData);
  }

  addNewPackageFromNavigation() {
    const newPackage = {
      name: 'New Package',
      icon: '',
      iconPreview: '',
      price: '',
      description: '',
    };
  
    this.packages.push(newPackage);
    console.log('New package added from navigation:', newPackage);
  
    // Pilih paket baru secara otomatis
    this.selectedPackage = 'graduate';
  }
  
deletePackage() {
  console.log('Paket dihapus');
  // Tambahkan logika untuk menghapus paket jika diperlukan
}
  

  onPackageSelected(packageType: string) {
    this.selectedPackage = packageType;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveChanges() {
    this.isEditing = false;
  }
}
