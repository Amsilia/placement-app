// src/app/components/admin/edit-modal/edit-modal.component.ts
import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegistrantPackageService } from '../../../services/admin/registrant/registrant.package.service';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Input() registrant: any | null = null;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveData: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('fileInput') fileInput: any;

  editedRegistrant: any = {};

  uploadedFile: File | null = null;
  uploadedFilePreview: string | undefined | null = null;

  dropdownOpen = false;
  statusOptions = ['Menunggu', 'Diterima', 'Berlangsung', 'Ditolak', 'Selesai'];

  // Tambahkan opsi untuk last_education sesuai dengan constraint database
  educationOptions: string[] = [
    'SD',
    'SMP',
    'SMA',
    'Diploma',
    'S1',
    'S2',
    'S3'
  ];

  // Tambahkan opsi untuk employment_status juga
  employmentStatusOptions: string[] = [
    'pelajar/mahasiswa',
    'bekerja',
    'belum bekerja',

  ];

  private statusNameToIdMap: { [key: string]: string } = {
    'Menunggu': 'b01bc537-5106-4cf4-a47d-78f8db699c3f',
    'Diterima': 'a7bfd346-7a2f-401a-ba22-bcbc22bc648c',
    'Berlangsung': '2a798997-40f7-45a3-ac4e-677f2ca8d330',
    'Ditolak': '6da17ad6-955e-428b-8e80-2f3b348ea864',
    'Selesai': '771dc424-927f-4625-b0f9-94a1e27db93b',
  };

  constructor(
    private registrantPackageService: RegistrantPackageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['registrant']) {
      if (this.registrant) {
        this.editedRegistrant = { ...this.registrant };

        // Handle status mapping
        if (this.registrant.status_id) {
            this.editedRegistrant.status = this.getStatusNameById(this.registrant.status_id) || this.registrant.status;
        } else if (this.registrant.status) {
            this.editedRegistrant.status_id = this.statusNameToIdMap[this.registrant.status] || '';
        }
        
        if (!this.editedRegistrant.status) {
            this.editedRegistrant.status = 'Menunggu';
            this.editedRegistrant.status_id = this.statusNameToIdMap['Menunggu'];
        }

        // Pastikan last_education memiliki nilai default yang valid
        if (!this.editedRegistrant.last_education || !this.educationOptions.includes(this.editedRegistrant.last_education)) {
          this.editedRegistrant.last_education = 'SMA'; // Default value
        }

        // Pastikan employment_status memiliki nilai default yang valid
        if (!this.editedRegistrant.employment_status || !this.employmentStatusOptions.includes(this.editedRegistrant.employment_status)) {
          this.editedRegistrant.employment_status = 'bekerja'; // Default value
        }

        // Handle transfer proof preview
        if (this.editedRegistrant.transfer_proof) {
          this.uploadedFilePreview = this.getFullFileUrl(this.editedRegistrant.transfer_proof);
        } else {
          this.uploadedFilePreview = undefined;
        }
        this.uploadedFile = null;
      } else {
        this.editedRegistrant = {};
        this.uploadedFilePreview = undefined;
        this.uploadedFile = null;
      }
    }
  }

  close(): void {
    this.closeModal.emit();
    this.uploadedFile = null;
    this.uploadedFilePreview = undefined;
    this.editedRegistrant = {};
  }

  save(): void {
    // Validasi data sebelum mengirim
    if (!this.validateData()) {
      return;
    }

    // Gunakan object biasa, bukan FormData jika API menerima JSON
    const updateData = {
      fullname: this.editedRegistrant.fullname || '',
      no_handphone: this.editedRegistrant.no_handphone || '',
      age: parseInt(this.editedRegistrant.age) || 0,
      employment_status: this.editedRegistrant.employment_status || 'belum bekerja',
      last_education: this.editedRegistrant.last_education || 'SMA/SMK',
      institution: this.editedRegistrant.institution || '',
      price: parseFloat(this.editedRegistrant.price) || 0,
      status_id: this.editedRegistrant.status_id
    };

    // Log data yang akan dikirim untuk debugging
    console.log('Data yang akan dikirim:', updateData);

    if (this.registrant && this.registrant.id) {
        this.registrantPackageService.updateRegistrant(this.registrant.id, updateData).subscribe({
            next: (response) => {
                console.log('Update successful:', response);
                this.saveData.emit(this.editedRegistrant);
                this.close();
            },
            error: (error) => {
                console.error('Update failed:', error);
                const errorMessage = error.error?.message || 'Terjadi kesalahan tidak dikenal.';
                alert('Gagal menyimpan perubahan: ' + errorMessage);
            }
        });
    } else {
        console.error('Registrant ID is missing for update.');
        alert('Tidak dapat menyimpan: ID pendaftar tidak ditemukan.');
    }
  }

  private validateData(): boolean {
    // Validasi required fields
    if (!this.editedRegistrant.fullname || this.editedRegistrant.fullname.trim() === '') {
      alert('Nama lengkap wajib diisi');
      return false;
    }

    if (!this.editedRegistrant.no_handphone || this.editedRegistrant.no_handphone.trim() === '') {
      alert('Nomor handphone wajib diisi');
      return false;
    }

    // Validasi last_education harus sesuai dengan constraint
    if (!this.educationOptions.includes(this.editedRegistrant.last_education)) {
      alert('Pendidikan terakhir tidak valid. Pilih dari opsi yang tersedia.');
      return false;
    }

    // Validasi employment_status
    if (!this.employmentStatusOptions.includes(this.editedRegistrant.employment_status)) {
      alert('Status pekerjaan tidak valid. Pilih dari opsi yang tersedia.');
      return false;
    }

    // Validasi age
    const age = parseInt(this.editedRegistrant.age);
    if (isNaN(age) || age < 1 || age > 100) {
      alert('Umur harus berupa angka antara 1-100');
      return false;
    }

    // Validasi status_id
    if (!this.editedRegistrant.status_id) {
      alert('Status wajib dipilih');
      return false;
    }

    return true;
  }

  // File upload handlers (tidak berubah)
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.handleFileUpload(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.handleFileUpload(file);
    }
  }

  handleFileUpload(file: File): void {
    this.uploadedFile = file;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.uploadedFilePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  // Status dropdown handlers
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  setStatus(statusName: string): void {
    this.editedRegistrant.status = statusName;
    this.editedRegistrant.status_id = this.statusNameToIdMap[statusName];
    this.dropdownOpen = false;
  }

  statusColor(status: string | undefined): string {
    switch (status) {
      case 'Menunggu':
        return 'bg-[#FF9807] text-white';
      case 'Diterima':
        return 'bg-[#198754] text-white';
      case 'Berlangsung':
        return 'bg-[#212529] text-white';
      case 'Ditolak':
        return 'bg-[#BB2D3B] text-white';
      case 'Selesai':
        return 'bg-[#6C757D] text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  }

  private getStatusNameById(statusId: string): string | undefined {
    for (const name in this.statusNameToIdMap) {
      if (this.statusNameToIdMap.hasOwnProperty(name) && this.statusNameToIdMap[name] === statusId) {
        return name;
      }
    }
    return undefined;
  }

  getFullFileUrl(path: string | undefined): string | undefined {
    if (!path) return undefined;
    const BASE_URL_STORAGE = 'http://127.0.0.1:3333'; // Perbaiki typo 'ttp' menjadi 'http'
    return `${BASE_URL_STORAGE}/${path}`;
  }

  getFileNameFromPath(path: string | undefined): string | undefined {
    if (!path) return undefined;
    try {
      const parts = path.split('/');
      return parts[parts.length - 1];
    } catch {
      return path;
    }
  }
}