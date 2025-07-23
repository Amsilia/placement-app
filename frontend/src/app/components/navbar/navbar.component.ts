import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { SitesService } from '../../services/portal/sites.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavigationUtilsService } from '../../services/utils/navigation-utils.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('fadeSlide', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateY(-30%)',
        })
      ),
      transition('void => *', [
        animate(
          '800ms ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0)',
          })
        ),
      ]),
      transition('* => void', [
        animate(
          '800ms ease-in',
          style({
            opacity: 0,
            transform: 'translateY(-30%)',
          })
        ),
      ]),
    ]),
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translateY(0%)',
          opacity: 1,
        })
      ),
      state(
        'out',
        style({
          transform: 'translateY(100%)',
          opacity: 0,
        })
      ),
      transition('out => in', [animate('300ms ease-in-out')]),
      transition('in => out', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  faBars = faBars;
  faTimes = faTimes;
  sites: any;

  constructor(
    private sitesService: SitesService,
    private navigationUtil: NavigationUtilsService
  ) {}
  ngOnInit(): void {
    this.sitesService.getSites().subscribe({
      next: (data) => (this.sites = data.data),
      error: (error) => console.error('Error fetching sites:', error),
    });
  }

  isNavbarOpen = false;
  menuState = 'out';

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
    this.menuState = this.isNavbarOpen ? 'in' : 'out';
  }
  navigateToSection(sectionId: string): void {
    this.navigationUtil.navigateToSection(sectionId);
  }
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 640) {
      this.isNavbarOpen = false;
    }
  }
}
