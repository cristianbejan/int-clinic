import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ImageUploadService } from 'src/app/core/services/image-upload.service';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.scss'],
})
export class UserSignUpComponent {
  imageUrl!: string;
  hide = true;

  constructor(
    private authService: AuthService,
    private imageUploadService: ImageUploadService,
    private router: Router
  ) {}

  signUpForm = new FormGroup({
    lastName: new FormControl('', { nonNullable: true, validators: Validators.required }),
    firstName: new FormControl('', { nonNullable: true, validators: Validators.required }),
    gender: new FormControl('', { nonNullable: true, validators: Validators.required }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{3}( ?)[0-9]{3}( ?)[0-9]{4}$')],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    }),
    password: new FormControl('', { nonNullable: true, validators: Validators.required }),
    imageUrl: new FormControl(`${this.imageUrl}`, { nonNullable: true }),
  });

  onSignUp(): void {
    this.authService.pacientSignUp(this.signUpForm.controls.password.value, this.signUpForm.getRawValue()).then(() => {
      this.router.navigate(['patient']);
    });
    this.signUpForm.reset();
  }

  uploadImage(event: Event) {
    const file = (event?.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }

    this.imageUploadService.uploadImage(file, 'doctors').subscribe(downloadURL => {
      this.imageUrl = downloadURL;
      this.signUpForm.get('imageUrl')?.setValue(downloadURL);
    });
  }
}
