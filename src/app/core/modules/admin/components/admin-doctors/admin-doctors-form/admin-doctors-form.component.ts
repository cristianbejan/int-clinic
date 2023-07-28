import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Doctor } from 'src/app/core/interfaces/doctor.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { ImageUploadService } from 'src/app/core/services/image-upload.service';

enum FormSubmitState {
  ADD = 'Adauga doctor',
  EDIT = 'Salveaza modificarile',
}

@Component({
  selector: 'app-admin-doctors-form',
  templateUrl: './admin-doctors-form.component.html',
  styleUrls: ['./admin-doctors-form.component.scss'],
})
export class AdminDoctorsFormComponent implements OnInit {
  public readonly specialities = [
    {
      id: 1,
      name: 'Cardiology',
    },
    {
      id: 2,
      name: 'Dermatology',
    },
    {
      id: 3,
      name: 'Endocrinology',
    },
    {
      id: 4,
      name: 'Surgery',
    },
    {
      id: 5,
      name: 'Oftalmology',
    },
  ];

  doctorId!: string;
  buttonText: string = FormSubmitState.ADD;
  imageUrl!: string;

  constructor(
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private dialogService: ConfirmationDialogService,
    private formBuilder: FormBuilder,
    private imageUploadService: ImageUploadService
  ) {}
  doctorForm = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: Validators.required }),
    lastName: new FormControl('', { nonNullable: true, validators: Validators.required }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{3}( ?)[0-9]{3}( ?)[0-9]{4}$')],
    }),
    adress: new FormControl('', { nonNullable: true, validators: Validators.required }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    }),
    password: new FormControl('', { nonNullable: true, validators: Validators.required }),
    specialtyIds: new FormControl([''], { nonNullable: true, validators: Validators.required }),
    description: new FormControl('', { nonNullable: true, validators: Validators.required }),
    imageUrl: new FormControl('', { nonNullable: true }),
  });

  email = this.doctorForm.controls.email;
  ngOnInit(): void {
    this.doctorId = this.route.snapshot.params['id'];
    this.doctorService
      .getDoctor(this.doctorId)
      .pipe(
        tap(result => {
          this.buttonText = FormSubmitState.EDIT;
          const doctor = result['data']() as Doctor;
          this.imageUrl = doctor.imageUrl;

          this.doctorForm.patchValue({
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            phone: doctor.phone,
            adress: doctor.adress,
            email: doctor.email,
            password: doctor.password,
            specialtyIds: doctor.specialtyIds,
            description: doctor.description,
            imageUrl: doctor.imageUrl,
          });
        })
      )
      .subscribe();
  }

  onFormSubmit() {
    if (this.doctorId) {
      const options = {
        title: 'Salveaza modificarile',
        message: `Doriti sa modificati informatiile acestui doctor?`,
        cancelText: 'Nu',
        confirmText: 'Da',
      };
      this.dialogService.open(options);

      this.dialogService.confirmed().subscribe(confirmed => {
        if (!confirmed) {
          return;
        }
        this.doctorService.updateDoctor(this.doctorId, this.doctorForm.value);
        this.doctorService.updateImage(this.doctorId, this.imageUrl);
        this.router.navigate(['admin/doctors']);
      });
    } else {
      this.doctorService.addDoctor(this.doctorForm.getRawValue());
      this.authService.SignUp(this.doctorForm.controls.email.value, this.doctorForm.controls.password.value);
      this.doctorForm.reset();
      this.router.navigate(['admin/doctors']);
    }

    if (event) {
      this.uploadImage(event);
    }
  }

  onCloseForm() {
    this.router.navigate(['admin/doctors']);
  }

  getErrorMessage() {
    return this.email.hasError('pattern') ? 'Email Invalid' : '';
  }

  uploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }

    this.imageUploadService.uploadImage(file, 'doctors').subscribe(downloadURL => {
      this.imageUrl = downloadURL;
      this.doctorForm.get('imageUrl')?.setValue(downloadURL);
    });
  }

  confirmCancelDialog() {
    const options = {
      title: 'Inchidere Formular',
      message: `Esti sigur ca vrei sa inchizi formularul?`,
      cancelText: 'Nu',
      confirmText: 'Da',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.router.navigate(['admin/doctors']);
      }
    });
  }

  confirmResetDialog() {
    const options = {
      title: 'Resetare Formular',
      message: `Esti sigur ca vrei sa resetezi formularul?`,
      cancelText: 'Nu',
      confirmText: 'Da',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.doctorForm.reset();
      }
    });
  }
}
