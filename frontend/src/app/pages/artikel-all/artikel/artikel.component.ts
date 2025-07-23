import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/artikel/header/header.component';
import { ContentComponent } from "../../../components/artikel/content/content.component";
import { NavbarUsersComponent } from "../../../components/users/navbar/navbar.component-users";
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { LoginCheckService } from '../../../services/login-check.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artikel',
  standalone: true,
  template:
   `<HeaderComponent []>`,
  imports: [
    HeaderComponent,
    ContentComponent,
    NavbarUsersComponent,
    CommonModule,
    NavbarComponent
],
  templateUrl: './artikel.component.html',
  styleUrl: './artikel.component.scss'
})
export class ArtikelComponent {
  isUserLoggedIn: boolean = false;
  articleId: string | null = null;

  constructor(private loginCheckService: LoginCheckService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.loginCheckService.checkLoginForPortal();
    this.articleId = this.route.snapshot.paramMap.get('slug'); 
  }
}
