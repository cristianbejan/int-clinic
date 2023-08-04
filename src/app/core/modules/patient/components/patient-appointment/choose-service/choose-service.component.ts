import { Component } from '@angular/core';
import { Appointment } from 'src/app/core/interfaces/appointment.interface';
import { Services } from 'src/app/core/interfaces/services.interface';
import { Specialty } from 'src/app/core/interfaces/specialty.interface';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { ServicesService } from 'src/app/core/services/services.service';
import { SpecialtiesService } from 'src/app/core/services/specialties.service';

@Component({
  selector: 'app-choose-service',
  templateUrl: './choose-service.component.html',
  styleUrls: ['./choose-service.component.scss'],
})
export class ChooseServiceComponent {
  services: Services[] = [];
  selected!: Services;
  specialtyOption!: Specialty;
  isTrue = false;
  searchedInput = '';
  receivedAppointment!: Appointment;

  dataTest!: any;

  constructor(
    private servicesService: ServicesService,
    private specialtyService: SpecialtiesService,
    private dataStoreService: DataStoreService
  ) {
    this.servicesService.getServices().subscribe(services => (this.services = services as Services[]));
    this.dataStoreService.appointmentDetails.subscribe(data => {
      this.dataTest = data;

      this.receivedAppointment = data;
      if (data.specialtyId === '') {
        return;
      }
      this.specialtyService.getSpecialty(data.specialtyId).subscribe(specialty => {
        this.specialtyOption = specialty['data']();
        this.services = this.services.filter(service => this.specialtyOption.serviceIds.includes(service.id));
      });
    });
  }

  pickedService(service: Services) {
    // this.isTrue = !this.isTrue;
    this.selected = service;

    this.sendPickedService();
  }

  sendPickedService() {
    const data: Appointment = { ...this.receivedAppointment, serviceId: this.selected.id };

    this.dataStoreService.addData(data);
  }

  isActive(item: Services) {
    return this.selected === item;
  }
}
