import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router


@Component({
  selector: 'app-register-success',
  standalone: true,
  imports: [],
  templateUrl: './register-success.component.html',
  styleUrl: './register-success.component.scss'
})
export class RegisterSuccessComponent {
  constructor(private router: Router) {}

  // Redirect to the home page when OK is clicked
  goToHome() {
    this.router.navigate(['/']); // Navigates to the home page
  }
} 
