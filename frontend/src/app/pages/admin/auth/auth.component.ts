import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/utils/toast.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  isSubmitting: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private authServices: AuthService,
    private router: Router,
    private toastServices: ToastService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;
      this.isSubmitting = true;
      console.log(this.loginForm.value);
      this.authServices
        .login({ email, password: password, rememberMe })
        .subscribe({
          next: (response) => {
            console.log('Response', response);
            this.authServices.setToken(
              response.data.token,
              response.data.jwtToken
            );
            this.toastServices.showToast(
              'Login Berhasil !',
              'Login Berhasil',
              'success'
            );
            this.isSubmitting = false;
            this.router.navigate(['/admin/dashboard']);
          },
          error: (error) => {
            this.isSubmitting = false;
            this.toastServices.showToast(
              'Login Gagal !',
              error.error.message,
              'error'
            );
            console.log('Login Failed ===', error);
          },
        });
    }
  }
}
