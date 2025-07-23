import { Component } from '@angular/core';
import { HeaderAdminComponent } from "../../../../components/admin/header/header.component";
import { SidebarComponent } from "../../../../components/admin/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { EditTestimonicmsComponent } from "../../../../components/admin/setting-testimoni/edit-testimonicms/edit-testimonicms.component";

@Component({
  selector: 'app-editcms-testimonial',
  standalone: true,
  imports: [HeaderAdminComponent, SidebarComponent,
    CommonModule, EditTestimonicmsComponent],
  templateUrl: './editcms-testimonial.component.html',
  styleUrl: './editcms-testimonial.component.scss'
})
export class EditcmsTestimonialComponent {
  isMinimized = false;


  
  onSidebarToggle(minimized: boolean) {
    this.isMinimized = minimized;
  }
}
