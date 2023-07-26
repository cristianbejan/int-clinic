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
  reactiveFormGroup = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
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
      name: this.reactiveFormGroup.controls.name.value,
      doctorIds: [],
      description: this.reactiveFormGroup.controls.description.value,
      serviceIds: [],
    };
    this.databBase.addSpecialty(newSpecialty);
    this.location.back();
  }

  updateSpecialty() {
    const editedSpecialty = {
      id: this.id,
      name: this.reactiveFormGroup.controls.name.value,
      doctorIds: this.specialtyRef.doctorIds ?? [],
      description: this.reactiveFormGroup.controls.description.value,
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
      this.reactiveFormGroup.patchValue({
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
