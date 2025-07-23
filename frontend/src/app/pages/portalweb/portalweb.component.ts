import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ProblemSolvedComponent } from '../../components/problem-solved/problem-solved.component';
import { FlowregistSectionComponent } from '../../components/flowregist-section/flowregist-section.component';
import { PricingComponent } from '../../components/pricing/pricing.component';
import { TestimoniSectionComponent } from '../../components/testimoni-section/testimoni-section.component';
import { FaseSectionComponent } from '../../components/fase-section/fase-section.component';
import { BlogComponent } from '../../components/blog/blog.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarUsersComponent } from '../../components/users/navbar/navbar.component-users';
import { LoginCheckService } from '../../services/login-check.service';
import { CommonModule } from '@angular/common';
import { BrandsCareerComponent } from '../../components/brands-career/brands-career.component';
import { NavigationUtilsService } from '../../services/utils/navigation-utils.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-portalweb',
  standalone: true,
  imports: [
    NavbarComponent,
    NavbarUsersComponent,
    HeroSectionComponent,
    ProblemSolvedComponent,
    FlowregistSectionComponent,
    PricingComponent,
    TestimoniSectionComponent,
    FaseSectionComponent,
    BlogComponent,
    BrandsCareerComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './portalweb.component.html',
  styleUrl: './portalweb.component.scss',
})
export class PortalwebComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  isLoggedIn: boolean = false;
  constructor(
    private loginCheckService: LoginCheckService,
    private navigationUtils: NavigationUtilsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.loginCheckService.checkLoginForPortal();
    this.route.fragment.subscribe((fragment) => {
      this.navigationUtils.handleFragmentScroll(fragment);
    });

    this.authService.getLoginStatus().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.authService.getMyAccountStatus();
  }
}
