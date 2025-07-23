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
  selector: 'app-special-regisrant',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './special-regisrant.component.html',
  styleUrl: './special-regisrant.component.scss',
})
export class SpecialRegisrantComponent implements OnInit {
  form: FormGroup;
  currentStep = 1;
  priceId: string | null = null;
  isSubmitting = false;
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
      document: new FormControl(null, Validators.required),
      institution: new FormControl('', Validators.required),
      last_education: new FormControl('', Validators.required),
      agreeTerms: new FormControl(false, Validators.requiredTrue),
    });
  }

  ngOnInit(): void {
    console.log('Document control value:', this.form.get('document')?.value);
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

  // Handle drag and drop
  onDragOver(event: DragEvent) {
    event.preventDefault(); // Prevent default to allow drop
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault(); // Prevent default action (open as link for some elements)
    if (event.dataTransfer?.files) {
      const file = event.dataTransfer.files[0];
      if (file) {
        this.form.patchValue({ document: file });
        console.log('File dropped:', file);
      }
    }
  }
  // Handle file input change
  onFileChange(event: any) {
    const file = event.target.files[0];
    const allowedExtensions = ['jpg', 'png', 'jpeg', 'pdf'];
    const maxSize = 2 * 1024 * 1024; // 2 MB

    if (file) {
      const fileSizeValid = file.size <= maxSize;
      const fileExtensionValid = allowedExtensions.includes(
        file.type.split('/')[1]
      );
      console.log(file, 'Upload File');

      console.log('File is valid', fileSizeValid);
      if (!fileSizeValid) {
        console.error('File terlalu besar, maksimal 2MB.');
      }
      if (!fileExtensionValid) {
        console.error('Ekstensi file tidak valid.');
      }
      if (fileSizeValid && fileExtensionValid) {
        this.form.patchValue({ document: file });
      }
    }
  }

  // Open file browser when clicking the upload area
  onFileUpload(event: any) {
    const inputField = event.target.querySelector('input[type="file"]');
    if (inputField) {
      inputField.click();
    }
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
    try {
      this.isSubmitting = true;
      console.log('MAsukkk gezz');
      console.log('Document control value:', this.form.get('document')?.value);
      console.log('Form valid:', this.form.valid);
      console.log('Form Raw Value:', this.form.getRawValue());

      const formData = new FormData();
      formData.append('price_id', this.priceId || '');
      formData.append('fullname', this.form.get('fullname')?.value);
      formData.append('email', this.form.get('email')?.value);
      formData.append('no_handphone', this.form.get('no_handphone')?.value);
      formData.append(
        'employment_status',
        this.form.get('employment_status')?.value
      );
      formData.append('age', this.form.get('age')?.value);
      formData.append('document', this.form.get('document')?.value);
      formData.append('institution', this.form.get('institution')?.value);
      formData.append('last_education', this.form.get('last_education')?.value);
      formData.append(
        'agreeTerms',
        this.form.get('agreeTerms')?.value ? 'true' : 'false'
      );

      console.log('Form Data to Submit:', formData);

      this.registrantService.createRegistrant(formData).subscribe({
        next: (response) => {
          this.currentStep = 3;
          this.isSubmitting = false;
          this.toastService.showToast("Success !", "Pendaftaran Berhasil", "success" )
          console.log('Registrant created!', response);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.toastService.showToast("Failed !", "Pendaftaran Gagal !", "error")
          console.error('Failed to create registrant', error);
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  goToHome() {
    // Navigate to home page (assuming Angular routing is set up)
    window.location.href = '/';
  }
}
