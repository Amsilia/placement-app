import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { ToastService } from '../../../services/utils/toast.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;
  showPassword = false;
  passwordCriteria = {
    hasLower: false,
    hasUpper: false,
    hasNumber: false,
    isLength: false,
  };

  constructor(private authServices: AuthService, private router: Router, private toastService : ToastService) {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      fullname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, this.passwordValidator.bind(this)]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', [Validators.required]),
    });
  }
  // Custom Password Validator
  passwordValidator(control: AbstractControl) {
    const value = control.value || '';
    this.passwordCriteria.hasLower = /[a-z]/.test(value);
    this.passwordCriteria.hasUpper =
      /[A-Z]/.test(value) && value.match(/[A-Z]/g)?.length === 1; // Only 1 uppercase letter
    this.passwordCriteria.hasNumber = /[0-9]/.test(value);
    this.passwordCriteria.isLength = value.length >= 8;

    // Return invalid if any criteria is not met
    return this.passwordCriteria.hasLower &&
      this.passwordCriteria.hasUpper &&
      this.passwordCriteria.hasNumber &&
      this.passwordCriteria.isLength
      ? null
      : { passwordInvalid: true };
  }
  validatePassword() {
    this.registerForm.controls['password'].updateValueAndValidity();
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    if (this.registerForm.valid && !this.isSubmitting) {  
      this.isSubmitting = true; 
      const userData = this.registerForm.value;
      console.log("Data :", userData)
      this.authServices.register(userData).subscribe(
        (response) => {
          // alert('Pendaftaran Berhasil, Silahkan Cek Email Anda');
          this.toastService.showToast('Success', 'Pendaftaran Berhasil, Silahkan Cek Email Anda', 'success');
          this.router.navigate(['/register-success']);
          this.isSubmitting = false;
        },
        (error) => {
          this.toastService.showToast('Register Gagal !', "Akun telah terdaftar", 'error');
          console.error('Pendaftaran Gagal', error);
          this.isSubmitting = false;
        }
      );
    }
  }
}
