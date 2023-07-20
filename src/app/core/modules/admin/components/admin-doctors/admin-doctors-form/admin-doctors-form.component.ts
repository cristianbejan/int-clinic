import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Doctor } from 'src/app/core/interfaces/doctor.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { DoctorService } from 'src/app/core/services/doctor.service';

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

  constructor(
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  doctorForm = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: Validators.required }),
    lastName: new FormControl('', { nonNullable: true, validators: Validators.required }),
    phone: new FormControl('', { nonNullable: true, validators: Validators.required }),
    adress: new FormControl('', { nonNullable: true, validators: Validators.required }),
    email: new FormControl('', { nonNullable: true, validators: Validators.required }),
    password: new FormControl('', { nonNullable: true, validators: Validators.required }),
    specialtyIds: new FormControl([''], { nonNullable: true, validators: Validators.required }),
    description: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.params['id'];
    this.doctorService
      .getDoctor(this.doctorId)
      .pipe(
        tap(result => {
          this.buttonText = FormSubmitState.EDIT;
          const doctor = result['data']() as Doctor;

          this.doctorForm.patchValue({
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            phone: doctor.phone,
            adress: doctor.adress,
            email: doctor.email,
            password: doctor.password,
            specialtyIds: doctor.specialtyIds,
            description: doctor.description,
          });
        })
      )
      .subscribe();
  }

  onFormSubmit() {
    if (this.doctorId) {
      this.doctorService.updateDoctor(this.doctorId, this.doctorForm.value);
    } else {
      this.doctorService.addDoctor(this.doctorForm.getRawValue());
      this.authService.SignUp(this.doctorForm.controls.email.value, this.doctorForm.controls.password.value);
    }
    this.doctorForm.reset();
    this.router.navigate(['admin/doctors']);
  }

  onCloseForm() {
    this.router.navigate(['admin/doctors']);
  }
}
