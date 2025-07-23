import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyFormatPipe } from '../../../pipes/currency-format.pipe';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-pricing-users',
  standalone: true,
  imports: [
    CurrencyFormatPipe,
    CommonModule
  ],
  templateUrl: './pricing-users.component.html',
  styleUrl: './pricing-users.component.scss'
})
export class PricingUsersComponent {

  prices = {
    paket1: { idr: 30000000 },
    paket2: { idr: 24999999 },
    scale: { custom: true },
  };

  constructor(private router: Router) {}

  goToSpecialPrice() {
    this.router.navigate(['/special-price']); // Navigates to the special page
  }

  goToNormalPrice() {
    this.router.navigate(['/normal-price']); // Navigates to the normal page
  }
}
