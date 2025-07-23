import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-mini-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './mini-navigation.component.html',
  styleUrl: './mini-navigation.component.scss'
})
export class MiniNavigationComponent {
  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
