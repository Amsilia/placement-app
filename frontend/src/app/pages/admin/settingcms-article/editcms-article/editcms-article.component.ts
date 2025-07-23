import { Component } from '@angular/core';
import { SidebarComponent } from "../../../../components/admin/sidebar/sidebar.component";
import { HeaderAdminComponent } from "../../../../components/admin/header/header.component";
import { CommonModule } from '@angular/common';
import { EditArticlepageCmsComponent } from "../../../../components/admin/setting-article/edit-articlepage-cms/edit-articlepage-cms.component";

@Component({
  selector: 'app-editcms-article',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderAdminComponent,
    CommonModule,
    EditArticlepageCmsComponent
],
  templateUrl: './editcms-article.component.html',
  styleUrl: './editcms-article.component.scss'
})
export class EditcmsArticleComponent {
  isMinimized = false;


  
  onSidebarToggle(minimized: boolean) {
    this.isMinimized = minimized;
  }
}
