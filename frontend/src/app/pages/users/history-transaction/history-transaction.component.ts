import { Component, OnInit } from '@angular/core';
import { NavbarUsersComponent } from '../../../components/users/navbar/navbar.component-users';
import { MiniNavigationComponent } from '../../../components/users/mini-navigation/mini-navigation.component';
import { Router, RouterModule } from '@angular/router';
import { DataHistoryComponent } from '../../../components/users/transaction/data-history/data-history.component';
import { RegistrantService } from '../../../services/registrant/registrant.service';
import { CommonModule } from '@angular/common';
import { HistoryNullComponent } from '../../../components/users/transaction/history-null/history-null.component';

@Component({
  selector: 'app-history-transaction',
  standalone: true,
  imports: [
    NavbarUsersComponent,
    MiniNavigationComponent,
    RouterModule,
    DataHistoryComponent,
    HistoryNullComponent,
    CommonModule,
  ],
  templateUrl: './history-transaction.component.html',
  styleUrl: './history-transaction.component.scss',
})
export class HistoryTransactionComponent implements OnInit {
  history: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private registrantService: RegistrantService
  ) {}
  ngOnInit(): void {
    this.fetchHistory();
  }

  fetchHistory() {
    this.registrantService.myTransaction().subscribe({
      next: (data) => {
        console.log({ data });
        this.history = data.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log({ err });
      },
    });
  }
}
