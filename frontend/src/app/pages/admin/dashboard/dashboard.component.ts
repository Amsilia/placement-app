import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../components/admin/sidebar/sidebar.component';
import { HeaderAdminComponent } from '../../../components/admin/header/header.component';
import { CommonModule } from '@angular/common';
import { Chart, ChartType } from 'chart.js/auto';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../../services/admin/dashboard/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderAdminComponent,
    CommonModule,
    FormsModule
  ],
// >>>>>>> 574a57aca9f16113a98fdbf58297fce411a72b2f
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isMinimized = false;
  onSidebarToggle(isMinimized: boolean): void {
    this.isMinimized = isMinimized;
    console.log('Sidebar toggled, minimized:', this.isMinimized);
  }

  // Data properties
  dashboardData: any = {};
  registrantsByYear: any[] = [];
  registrantsByBatch: any[] = [];
  registrantsByPackage: any[] = [];

  // Dropdown selections
  selectedBatch = 1;
  // selectedYear = new Date().getFullYear();
  selectedYear: number = 2024;
  availableBatches: string[] = ['Batch 1', 'Batch 2', 'Batch 3'];
  availableYears: string[] = ['2024', '2023', '2022'];

  private registrationChart: Chart | undefined;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    // console.log(this.dashboardData, 'Dashboard Data');
    this.fetchDashboardData();
    this.fetchRegistrantsByYear();
    this.fetchRegistrantsByBatch();
    this.fetchRegistrantsByPackage();
  }

  fetchDashboardData(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data.data;
        console.log('Dashboard data:', this.dashboardData);
      },
      error: (err) => console.error('Error fetching dashboard data:', err),
    });
  }

  fetchRegistrantsByYear(): void {
    this.dashboardService.getRegistrantsByYear(this.selectedYear).subscribe({
      next: (response) => {
        this.registrantsByYear = response.data;
        console.log('Registrant by year :', this.registrantsByYear);
        this.updateChart();
      },
      error: (err) => console.error('Error fetching registrants by year:', err),
    });
  }

  fetchRegistrantsByBatch(): void {
    this.dashboardService.getRegistrantsByBatch(this.selectedBatch).subscribe({
      next: (response) => {
        this.registrantsByBatch = response.data;
      },
      error: (err) =>
        console.error('Error fetching registrants by batch:', err),
    });
  }

  fetchRegistrantsByPackage(): void {
    this.dashboardService.getRegistrantsByPackage().subscribe({
      next: (response) => {
        this.registrantsByPackage = response.data;
      },
      error: (err) =>
        console.error('Error fetching registrants by package:', err),
    });
  }

  updateChart(): void {
    const chartData = {
      labels: this.registrantsByYear.map((item) => item.month),
      datasets: [
        {
          label: 'Registrations',
          data: this.registrantsByYear.map((item) => item.total),
          backgroundColor: 'rgba(0, 144, 255, 0.7)',
          borderColor: 'rgba(214, 233, 245)',
          borderWidth: 1,
          barThickness: 12,
        },
      ],
    };

    if (this.registrationChart) {
      this.registrationChart.destroy();
    }

    this.registrationChart = new Chart('registrationChart', {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true, suggestedMax: 125 },
        },
      },
    });
  }

  onYearChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedYear = +target.value;
    console.log('Selected Year:', this.selectedYear);
    this.fetchRegistrantsByYear();
  }

  onBatchChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedBatch = +target.value;
    this.fetchRegistrantsByBatch();
  }
}
