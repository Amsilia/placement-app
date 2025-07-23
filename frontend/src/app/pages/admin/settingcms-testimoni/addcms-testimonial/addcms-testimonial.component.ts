import { Component } from '@angular/core';
import { HeaderAdminComponent } from "../../../../components/admin/header/header.component";
import { SidebarComponent } from "../../../../components/admin/sidebar/sidebar.component";
import { AddTestimonicmsComponent } from "../../../../components/admin/setting-testimoni/add-testimonicms/add-testimonicms.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addcms-testimonial',
  standalone: true,
  imports: [HeaderAdminComponent, SidebarComponent, AddTestimonicmsComponent, CommonModule],
  templateUrl: './addcms-testimonial.component.html',
  styleUrl: './addcms-testimonial.component.scss'
})
export class AddcmsTestimonialComponent {
  isMinimized = false;


  
  onSidebarToggle(minimized: boolean) {
    this.isMinimized = minimized;
  }
}
