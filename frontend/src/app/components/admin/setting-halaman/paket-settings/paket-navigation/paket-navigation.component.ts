import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-paket-navigation',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './paket-navigation.component.html',
  styleUrl: './paket-navigation.component.scss'
})
export class PaketNavigationComponent {

  @Input() isEditing: boolean = false; // Mode edit dari parent
  @Output() packageSelected = new EventEmitter<string>();
  @Output() packageAdded = new EventEmitter<void>(); // Emit event untuk menambah paket baru

  selectedPackage = 'graduate';

  selectPackage(packageType: string) {
    this.selectedPackage = packageType;
    this.packageSelected.emit(packageType);
  }

  addPackage() {
    // Emit event ke komponen induk untuk menambahkan paket baru
    this.packageAdded.emit();
    console.log('Tambah Paket clicked');
  }
}