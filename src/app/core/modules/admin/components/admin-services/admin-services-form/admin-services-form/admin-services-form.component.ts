import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/core/services/services.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Services } from 'src/app/core/interfaces/services.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-services-form',
  templateUrl: './admin-services-form.component.html',
  styleUrls: ['./admin-services-form.component.scss'],
})
export class AdminServicesFormComponent {
  servicesForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    price: new FormControl('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
  });
  serviceRef!: Services;
  editRoute = false;
  id!: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private databBase: ServicesService,
    private location: Location
  ) {}

  addService() {
    const newService = {
      name: this.servicesForm.controls.name.value,
      price: Number(this.servicesForm.controls.price.value),
      description: this.servicesForm.controls.description.value,
      specialtyIds: [],
    };
    this.databBase.addService(newService);
    this.location.back();
  }

  updateService() {
    const editedService = {
      id: this.id,
      name: this.servicesForm.controls.name.value,
      price: Number(this.servicesForm.controls.price.value),
      description: this.servicesForm.controls.description.value,
      specialtyIds: this.serviceRef.specialtyIds ?? [],
    };
    this.databBase.updateService(editedService);
    this.location.back();
  }

  editState(result: ParamMap) {
    this.editRoute = true;
    this.id = result.get('id') as string;

    this.databBase.getService(this.id).subscribe(service => {
      this.serviceRef = service['data']();
      this.servicesForm.patchValue({
        name: this.serviceRef.name,
        price: this.serviceRef.price.toString(),
        description: this.serviceRef.description,
      });
    });
  }

  back() {
    this.location.back();
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(route => {
      if (route.has('id')) {
        this.editState(route);
      }
    });
  }
}
