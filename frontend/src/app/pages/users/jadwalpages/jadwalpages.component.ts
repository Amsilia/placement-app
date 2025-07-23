import { Component } from '@angular/core';
import { NavbarUsersComponent } from "../../../components/users/navbar/navbar.component-users";
import { MiniNavigationComponent } from "../../../components/users/mini-navigation/mini-navigation.component";
import { JadwalNullComponent } from "../../../components/users/jadwal/jadwal-null/jadwal-null.component";
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-jadwalpages',
  standalone: true,
  imports: [
    NavbarUsersComponent, 
    MiniNavigationComponent, 
    JadwalNullComponent,
    RouterModule
  ],
  templateUrl: './jadwalpages.component.html',
  styleUrl: './jadwalpages.component.scss'
})
export class JadwalpagesComponent {
  constructor(private router: Router) {}
}
