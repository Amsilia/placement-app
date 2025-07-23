import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SitesService } from '../../services/portal/sites.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{

  sites: any;
  constructor(private sitesService: SitesService) {}
  ngOnInit(): void {
    this.sitesService.getSites().subscribe({
      next: (data) => this.sites = data.data,
      error: (error) => console.error('Error fetching sites:', error)
    });
  }
  
  currentYear: number = new Date().getFullYear();
  
  // private fetchSites() {
  //   this.sitesService.getSites().subscribe({
  //     next: (response) => {
  //       this.sites = response.data; 
  //       console.log(this.sites)
  //     },
  //     error: (error) => {
  //       console.error('Error fetching articles:', error);
  //     }
  //   })
  // }
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
