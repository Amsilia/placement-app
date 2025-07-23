import { Component } from '@angular/core';
import { NavbarUsersComponent } from "../../../components/users/navbar/navbar.component-users";
import { MiniNavigationComponent } from "../../../components/users/mini-navigation/mini-navigation.component";
import { TableProfileComponent } from "../../../components/users/table-profile/table-profile.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NavbarUsersComponent,
    MiniNavigationComponent,
    TableProfileComponent,
    RouterModule
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(private router: Router) {}
}
