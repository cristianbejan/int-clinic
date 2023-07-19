import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { tap } from 'rxjs';
import { Doctor } from 'src/app/core/interfaces/doctor.interface';
import { DoctorService } from 'src/app/core/services/doctor.service';

@Component({
  selector: 'app-admin-doctors-form',
  templateUrl: './admin-doctors-form.component.html',
  styleUrls: ['./admin-doctors-form.component.scss'],
})
export class AdminDoctorsFormComponent {
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

  constructor(
    private doctorService: DoctorService,
    private activeRoute: ActivatedRoute
  ) {}

  doctorForm = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: Validators.required }),
    lastName: new FormControl('', { nonNullable: true, validators: Validators.required }),
    phone: new FormControl(null, { nonNullable: true, validators: Validators.required }),
    adress: new FormControl('', { nonNullable: true, validators: Validators.required }),
    email: new FormControl('', { nonNullable: true, validators: Validators.required }),
    password: new FormControl('', { nonNullable: true, validators: Validators.required }),
    specialtyIds: new FormControl([], { nonNullable: true, validators: Validators.required }),
  });

  onFormSubmit() {
    this.doctorService.addDoctor(this.doctorForm.getRawValue());

    this.doctorForm.reset();
  }
}
