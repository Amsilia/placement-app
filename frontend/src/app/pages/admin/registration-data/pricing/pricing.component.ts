import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../components/admin/sidebar/sidebar.component';
import { HeaderAdminComponent } from '../../../../components/admin/header/header.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DataPriceComponent } from '../../../../components/admin/data-price/data-price.component';
import { RegistrantPackageService } from '../../../../services/admin/registrant/registrant.package.service';
import { AddPriceComponent } from '../../../../components/admin/data-price-modal/add-price/add-price.component';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderAdminComponent,
    CommonModule,
    DataPriceComponent,
  ],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent implements OnInit {
  isMinimized: boolean = false;
  prices: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  batchId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private registrantPackageService: RegistrantPackageService
  ) {}

  ngOnInit(): void {
    this.batchId = this.route.snapshot.paramMap.get('batchId');
    this.route.paramMap.subscribe((param) => {
      this.batchId = param.get('batchId');
      console.log('Batch Id :', this.batchId);
    });
    this.fetchPrices(String(this.batchId));
  }

  onSidebarToggle(minimized: boolean) {
    this.isMinimized = minimized;
  }

  fetchPrices(batchesId: string): void {
    console.log('%cTESSSSSS', 'color : blue;');
    if (this.batchId) {
      console.log('batch id', this.batchId);
      this.registrantPackageService.getPriceByBathcId(batchesId).subscribe({
        next: (prices) => {
          this.prices = prices.data;
          this.isLoading = false;
          console.log({ prices });
        },
        error: (err) => {
          this.errorMessage = err;
          console.log('%cError fetching prices', 'color: red');
          console.log(err);
          this.isLoading = false;
        },
      });
    }
  }
}
