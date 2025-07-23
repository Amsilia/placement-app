import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isMinimized = false;

  constructor(private router: Router) {}

  @Output() sidebarToggle = new EventEmitter<boolean>();

  toggleSidebar() {
    this.isMinimized = !this.isMinimized;
    this.sidebarToggle.emit(this.isMinimized);  // Emit status minimisasi
  }

  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }
}
