import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../components/admin/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from '../../../components/admin/header/header.component';
import { HeroSettingsComponent } from "../../../components/admin/setting-halaman/hero-settings/hero-settings.component";
import { PaketSettingsComponent } from "../../../components/admin/setting-halaman/paket-settings/paket-settings.component";
import { FooterSettingsComponent } from "../../../components/admin/setting-halaman/footer-settings/footer-settings.component";

@Component({
  selector: 'app-setting-pages',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    HeaderAdminComponent,
    HeroSettingsComponent,
    PaketSettingsComponent,
    FooterSettingsComponent
],
  templateUrl: './setting-pages.component.html',
  styleUrl: './setting-pages.component.scss'
})
export class SettingPagesComponent implements OnInit{
  
  ngOnInit(): void {
    
  }
  isMinimized = false;

  onSidebarToggle(minimized: boolean) {
    this.isMinimized = minimized;
  }

  private loadSitesData() {
    
  }
}
