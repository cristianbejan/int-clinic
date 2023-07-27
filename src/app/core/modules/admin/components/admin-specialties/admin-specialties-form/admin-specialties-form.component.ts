import { Component, OnInit } from '@angular/core';
import { SpecialtiesService } from 'src/app/core/services/specialties.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Specialty } from 'src/app/core/interfaces/specialty.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-specialties-form',
  templateUrl: './admin-specialties-form.component.html',
  styleUrls: ['./admin-specialties-form.component.scss'],
})
export class AdminSpecialtiesFormComponent {
  specialtyForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
  });
  specialtyRef!: Specialty;
  editRoute = false;
  id!: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private databBase: SpecialtiesService,
    private location: Location
  ) {}

  addSpecialty() {
    const newSpecialty = {
      name: this.specialtyForm.controls.name.value,
      doctorIds: [],
      description: this.specialtyForm.controls.description.value,
      serviceIds: [],
    };
    this.databBase.addSpecialty(newSpecialty);
    this.location.back();
  }

  updateSpecialty() {
    const editedSpecialty = {
      id: this.id,
      name: this.specialtyForm.controls.name.value,
      doctorIds: this.specialtyRef.doctorIds ?? [],
      description: this.specialtyForm.controls.description.value,
      serviceIds: this.specialtyRef.serviceIds ?? [],
    };
    this.databBase.updateSpecialty(editedSpecialty);
    this.location.back();
  }

  editState(route: ParamMap) {
    this.editRoute = true;
    this.id = route.get('id') as string;

    this.databBase.getSpecialty(this.id).subscribe(dbResponse => {
      this.specialtyRef = dbResponse['data']();
      this.specialtyForm.patchValue({
        name: this.specialtyRef.name,
        description: this.specialtyRef.description,
      });
    });
  }

  back() {
    this.location.back();
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(route => {
      if (route.has('id')) {
        return this.editState(route);
      }
    });
  }
}
