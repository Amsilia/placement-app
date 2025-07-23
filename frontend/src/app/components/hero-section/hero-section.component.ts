import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SitesService } from '../../services/portal/sites.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent implements OnInit {

  sites: any;

  constructor(private sitesService: SitesService) { }
  // ngOnInit(): void {
  //   // this.sitesService.getSites().subscribe(
  //   //   (data) => {
  //   //     this.sites = data.data
  //   //     console.log(data.data, "===sites data")
  //   //   }
  //   // )
  //   this.fetchSites();
  //   console.log(this.sites, "===sites init")
  // }
  ngOnInit(): void {
    this.sitesService.getSites().subscribe({
      next: (data) => this.sites = data.data,
      error: (error) => console.error('Error fetching sites:', error)
    });
  }
 
  // private fetchSites() {
  //   this.sitesService.getSites().subscribe({
  //     next: (response) => {
  //       this.sites = response.data; 
  //       console.log(this.sites)
  //     },
  //     error: (error) => {
  //       console.error('Error fetching sites:', error);
  //     }
  //   });
  // }
  
  
  
  // @Input() batchNumber: string = 
  // @Input() title: string = "this.sites[0].title"
  // @Input() description: string = "this.sites[0].description"
  @Input() imagePath: string = 'assets/image/Header2.png';
}
