import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RegistrantService } from '../../../services/registrant/registrant.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../services/utils/toast.service';

@Component({
  selector: 'app-normal-regisrant',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './normal-regisrant.component.html',
  styleUrl: './normal-regisrant.component.scss',
})
export class NormalRegisrantComponent implements OnInit {
  form: FormGroup;
  currentStep = 1; // To track the current step
  priceId: string | null = null;
  isSubmitting : boolean = false;
  constructor(
    private registrantService: RegistrantService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastService : ToastService
  ) {
    this.form = new FormGroup({
      fullname: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      email: new FormControl({ value: '', disabled: true }),
      no_handphone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      employment_status: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      institution: new FormControl('', Validators.required),
      last_education: new FormControl(''),
      agreeTerms: new FormControl(false, Validators.requiredTrue),
    });
  }

  ngOnInit(): void {
    this.loadUserData();
    this.route.paramMap.subscribe((params) => {
      this.priceId = params.get('id');
      console.log('Price ID:', this.priceId);
    });
  }

  private loadUserData() {
    this.authService.getMyAccount().subscribe({
      next: (response) => {
        const data = response.data;
        this.form.patchValue({
          fullname: data.fullname || data.username,
          email: data.email,
        });
      },
      error: (error) => {
        console.error('Failed to load user data', error);
      },
    });
  }
  goToNextStep() {
    if (this.currentStep < 3) {
      this.currentStep += 1;
    }
  }

  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
    }
  }

 onSubmit() {
  this.isSubmitting = true;
  if (this.form.valid) {
    const formData = {
      ...this.form.getRawValue(),
      price_id: this.priceId,
    };
this.registrantService.createRegistrant(formData).subscribe({
  next: (response) => {
    this.isSubmitting = false;

    const paymentUrl = response.data.payment_url; // <-- disini

    if (paymentUrl) {
      window.location.href = paymentUrl;
    } else {
      this.toastService.showToast('Error', 'URL pembayaran tidak tersedia', 'error');
      console.error('payment_url not found in response');
    }
  },
  error: (error) => {
    this.isSubmitting = false;
    this.toastService.showToast('Failed', 'Pendaftaran gagal', 'error');
    console.error('Create registrant error', error);
  },
});

  }
}


  goToHome() {

    window.location.href = '/';
  }
}
