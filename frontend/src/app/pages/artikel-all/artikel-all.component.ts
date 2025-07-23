import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AllBlogsComponent } from "../../components/all-blogs/all-blogs.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { NavbarUsersComponent } from '../../components/users/navbar/navbar.component-users';
import { LoginCheckService } from '../../services/login-check.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-artikel-all',
  standalone: true,
  imports: [
    NavbarComponent,
    NavbarUsersComponent,
    AllBlogsComponent,
    FooterComponent,
    CommonModule,
],
  templateUrl: './artikel-all.component.html',
  styleUrl: './artikel-all.component.scss'
})
export class ArtikelAllComponent implements OnInit{
  isUserLoggedIn: boolean = false;

  constructor(private loginCheckService : LoginCheckService) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.loginCheckService.checkLoginForPortal();
  }

}
