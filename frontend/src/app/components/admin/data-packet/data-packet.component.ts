import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AddPaketComponent } from '../paketmodal/add-paket/add-paket.component';
import { EditPaketComponent } from '../paketmodal/edit-paket/edit-paket.component';
import { DeletePaketComponent } from '../paketmodal/delete-paket/delete-paket.component';
import { RegistrantPackageService } from '../../../services/admin/registrant/registrant.package.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../services/utils/toast.service';

@Component({
  selector: 'app-data-packet',
  standalone: true,
  imports: [
    CommonModule,
    AddPaketComponent,
    EditPaketComponent,
    DeletePaketComponent,
  ],
  templateUrl: './data-packet.component.html',
  styleUrl: './data-packet.component.scss',
})
export class DataPacketComponent {
  @Input() packages: any[] = [];
  isSubmitting: boolean = false;
  dropdownIndex: number | null = null; // Index dropdown yang sedang aktif
  form: FormGroup;
  constructor(
    private router: Router,
    private registrantPackageService: RegistrantPackageService,
    private toastService: ToastService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  // Fungsi untuk membuka/menutup dropdown
  toggleDropdown(index: number, event: Event) {
    event.stopPropagation(); // Mencegah event klik merambat ke elemen lain
    this.dropdownIndex = this.dropdownIndex === index ? null : index;
  }

  // Fungsi untuk tombol Edit
  onEdit(paket: any) {
    // console.log('Edit paket:', paket);
    this.dropdownIndex = null; // Tutup dropdown setelah klik
  }

  // Fungsi untuk tombol Hapus
  onDelete(paket: any) {
    // console.log('Hapus paket:', paket);
    this.dropdownIndex = null; // Tutup dropdown setelah klik
  }

  goToDetail(paketId: string): void {
    // this.router.navigate([`/admin/batch-data/packages/`, paketId]);
    this.router.navigate([`/admin/data-package/${paketId}/batches`]);
  }

  // Fungsi untuk menambah paket
  onAddpaket() {
    // console.log('Tambah paket button clicked');
  }

  // MODAL ADD paket
  openAddpaketModal(modal: AddPaketComponent) {
    modal.openModal();
  }

 
  onPackagesAdded(newPackage : {name: string; description: string}) {
    this.isSubmitting = true;
    this.registrantPackageService.createPackage(newPackage).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.toastService.showToast(
          'Success',
          'Penambahan Paket Pendaftaran Berhasil',
          'success'
        );
        this.packages.push(response.data);

      },
      error: (error) => {
        this.toastService.showToast(
          'Failed',
          'Penambahan Paket Pendaftaran Gagal',
          'error'
        );
        console.error('Failed to add package', error);
      },
    })
  }

  onModalClosed() {
    console.log('Modal ditutup.');
  }

  // MODAL EDIT BATCH
  openEditpaketModal(
    modal: EditPaketComponent,
    paket: { id: string; name: string; description: string }
  ) {
    const transformedpaket = { ...paket, description: paket.description };
    modal.openModal(transformedpaket);
  }

  onpaketUpdated(updatedpaket: { id: string; name: string; description: string }) {
    const index = this.packages.findIndex(
      (paket) => paket.id === updatedpaket.id
    );
    if (index !== -1) {
      this.packages[index] = {
        ...updatedpaket,
        slug: updatedpaket.name.toLowerCase().replace(/ /g, '-'), // Generate slug
        description: updatedpaket.description,
      };
    }
    // console.log('paket diperbarui:', updatedpaket);
  }

  // MODAL DELETE paket
  openDeletepaketModal(
    modal: DeletePaketComponent,
    paket: { id: number; name: string }
  ) {
    modal.openModal(paket);
  }

  onpaketDeleted(paketId: number) {
    this.packages = this.packages.filter((paket) => paket.id !== paketId);
    // console.log(`paket dengan ID ${paketId} telah dihapus.`);
  }
}
