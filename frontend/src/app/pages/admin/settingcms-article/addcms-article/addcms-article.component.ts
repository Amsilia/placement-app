import { Component } from '@angular/core';
import { HeaderAdminComponent } from "../../../../components/admin/header/header.component";
import { SidebarComponent } from "../../../../components/admin/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { AddArticlepageCmsComponent } from '../../../../components/admin/setting-article/add-articlepage-cms/add-articlepage-cms.component';

@Component({
  selector: 'app-addcms-article',
  standalone: true,
  imports: [
    HeaderAdminComponent,
     SidebarComponent,
     AddArticlepageCmsComponent,
     CommonModule
    
    ],
  templateUrl: './addcms-article.component.html',
  styleUrl: './addcms-article.component.scss'
})
export class AddcmsArticleComponent {
  isMinimized = false;


  
  onSidebarToggle(minimized: boolean) {
    this.isMinimized = minimized;
  }
}
