import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../components/admin/sidebar/sidebar.component';
import { HeaderAdminComponent } from '../../../../components/admin/header/header.component';
import { CommonModule } from '@angular/common';
import { BatchdataAdminComponent } from '../../../../components/admin/batchdata-admin/batchdata-admin.component';
import { RegistrantPackageService } from '../../../../services/admin/registrant/registrant.package.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-batch-data',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderAdminComponent,
    CommonModule,
    BatchdataAdminComponent,
  ],
  templateUrl: './all-batch-data.component.html',
  styleUrl: './all-batch-data.component.scss',
})
export class AllBatchDataComponent implements OnInit {
  isMinimized: boolean = false;
  batches: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  packagesId: string | null = null;

  constructor(
    private registrantPackageService: RegistrantPackageService,
    private route: ActivatedRoute
  ) {}

  
  ngOnInit(): void {
    this.packagesId = this.route.snapshot.paramMap.get('packagesId');
    this.route.paramMap.subscribe((params) => {
      this.packagesId = params.get('packagesId');
      console.log('Paket ID:', this.packagesId);
    })
    let test = this.packagesId;
    console.log({ test });
    this.fetchBatches(String(this.packagesId));
  }

  fetchBatches(packagesId: string): void {
    if (this.packagesId) {
      this.registrantPackageService.getBatchByPackageId(packagesId).subscribe({
        next: (data) => {
          this.batches = data.data;
          this.isLoading = false;
          console.log(this.batches, 'Ini Batch Data');
        },
        error: (err) => {
          this.errorMessage = 'Failed to load Batch Data';
          console.log(err, 'Engror paket Id');
          this.isLoading = false;
        },
      });
    }
  }

  onSidebarToggle(minimized: boolean) {
    this.isMinimized = minimized;
  }
}
