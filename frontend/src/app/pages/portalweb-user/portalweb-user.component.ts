import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ProblemSolvedComponent } from '../../components/problem-solved/problem-solved.component';
import { FlowregistSectionComponent } from '../../components/flowregist-section/flowregist-section.component';
import { PricingUsersComponent } from "../../components/users/pricing-users/pricing-users.component";
import { TestimoniSectionComponent } from '../../components/testimoni-section/testimoni-section.component';
import { FaseSectionComponent } from '../../components/fase-section/fase-section.component';
import { BlogComponent } from '../../components/blog/blog.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarUsersComponent } from '../../components/users/navbar/navbar.component-users';
import { CommonModule } from '@angular/common';
import { BrandsCareerComponent } from "../../components/brands-career/brands-career.component";

@Component({
  selector: 'app-portalweb-user',
  standalone: true,
  imports: [
    NavbarUsersComponent,
    HeroSectionComponent,
    ProblemSolvedComponent,
    FlowregistSectionComponent,
    TestimoniSectionComponent,
    PricingUsersComponent,
    FaseSectionComponent,
    BlogComponent,
    FooterComponent,
    CommonModule,
    BrandsCareerComponent
],
  templateUrl: './portalweb-user.component.html',
  styleUrl: './portalweb-user.component.scss'
})
export class PortalwebUserComponent {
  
}
