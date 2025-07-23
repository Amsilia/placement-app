import { Component, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../../../../components/admin/header/header.component';
import { SidebarComponent } from '../../../../components/admin/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { DataPacketComponent } from '../../../../components/admin/data-packet/data-packet.component';
import { RegistrantPackageService } from '../../../../services/admin/registrant/registrant.package.service';

@Component({
  selector: 'app-all-packet-data',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    SidebarComponent,
    CommonModule,
    DataPacketComponent,
  ],
  templateUrl: './all-packet-data.component.html',
  styleUrl: './all-packet-data.component.scss',
})
export class AllPacketDataComponent implements OnInit {
  isMinimized: boolean = false;
  packages: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private registrantPackageService: RegistrantPackageService) {}

  ngOnInit(): void {
    this.fetchPackages();
  }

  fetchPackages(): void {
    this.registrantPackageService.getAllPackages().subscribe({
      next: (data) => {
        this.packages = data.data;
        this.isLoading = false;
        console.log(this.packages, 'Ini paket');
      },
      error: (err) => {
        this.errorMessage = 'Failed to load package Data';
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  onSidebarToggle(minimized: boolean) {
    this.isMinimized = minimized;
  }
}
