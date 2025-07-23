import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationUtilsService {
  constructor(private router: Router) {}

  /**
   * Scroll to a section in the current page or navigate with fragment
   * @param sectionId The ID of the section
   */
  navigateToSection(sectionId: string): void {
    if (this.router.url === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      this.router.navigate(['/'], { fragment: sectionId });
    }
  }

  /**
   * Handle fragment navigation on route changes
   * @param fragment The fragment identifier
   */
  handleFragmentScroll(fragment: string | null): void {
    if (fragment) {
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
