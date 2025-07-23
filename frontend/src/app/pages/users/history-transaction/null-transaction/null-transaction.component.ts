import { Component } from '@angular/core';
import { MiniNavigationComponent } from "../../../../components/users/mini-navigation/mini-navigation.component";
import { NavbarUsersComponent } from "../../../../components/users/navbar/navbar.component-users";
import { HistoryNullComponent } from "../../../../components/users/transaction/history-null/history-null.component";

@Component({
  selector: 'app-null-transaction',
  standalone: true,
  imports: [MiniNavigationComponent, NavbarUsersComponent, HistoryNullComponent],
  templateUrl: './null-transaction.component.html',
  styleUrl: './null-transaction.component.scss'
})
export class NullTransactionComponent {

}
