import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPriceComponent } from '../data-price-modal/add-price/add-price.component';
import { DeletePriceComponent } from '../data-price-modal/delete-price/delete-price.component';
import { EditPriceComponent } from '../data-price-modal/edit-price/edit-price.component';
import { RegistrantPackageService } from '../../../services/admin/registrant/registrant.package.service';

@Component({
  selector: 'app-data-price',
  standalone: true,
  imports: [
    CommonModule,
    AddPriceComponent,
    DeletePriceComponent,
    EditPriceComponent,
  ],
  templateUrl: './data-price.component.html',
  styleUrl: './data-price.component.scss',
})
export class DataPriceComponent {
  @Input() prices: any[] = [];
  batchId: string = '';
  dropdownIndex: number | null = null;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private registrantPackageService: RegistrantPackageService
  ) {
    this.activateRoute.params.subscribe((params) => {
      this.batchId = params['batchId'];
      // console.log('Batch ID:', this.batchId);
    });
  }

  onPriceAdded(newPrice: {
    batch_id: string;
    name: string;
    // description: string;
    amount: any;
    special_condition?: string;
  }) {
    if (!this.batchId) {
      console.error('batch ID Not Found 404 !');
      return;
    }

    const priceData = {
      batch_id: this.batchId,
      name: newPrice.name,
      // description: newPrice.description,
      amount: newPrice.amount,
      special_condition: newPrice.special_condition,
    };

    this.registrantPackageService.createPrice(priceData).subscribe({
      next: (res) => {
        // console.log('prices Added:', res);
        this.prices.push({
          ...res.data,
        });
      },
      error: (e) => {
        throw e;
      },
    });
  }
  openAddPriceModal(modal: AddPriceComponent) {
    modal.openModal();
  }

  onModalClosed() {
    console.log('Modal ditutup.');
  }
  onAddPrice() {
    console.log('Button Add Clicked !');
  }
  toggleDropdown(index: number, event: Event) {
    event.stopPropagation(); // Mencegah event klik merambat ke elemen lain
    this.dropdownIndex = this.dropdownIndex === index ? null : index;
  }
  onEdit(batch: any) {
    console.log('Edit Prices:', batch);
    this.dropdownIndex = null;
  }

  onDelete(batch: any) {
    console.log('Hapus batch:', batch);
    this.dropdownIndex = null;
  }
}
