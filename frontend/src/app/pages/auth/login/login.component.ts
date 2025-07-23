import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/utils/toast.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  isSubmitting: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(private authServices: AuthService, private router: Router, private toastServices : ToastService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false),
    });
  }

  // onRegister(){
  //   this.router.navigate(['/register'])
  // }
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
            console.log('Login Success ===', response.data.token);
            this.isSubmitting= false;
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.isSubmitting = false;
            this.toastServices.showToast("Login Gagal !", error.error.message, 'error');
            console.log('Login Failed ===', error);
          },
        });
    }
  }
}
