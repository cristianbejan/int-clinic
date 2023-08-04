import { Component } from '@angular/core';
import { Appointment } from 'src/app/core/interfaces/appointment.interface';
import { Specialty } from 'src/app/core/interfaces/specialty.interface';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { SpecialtiesService } from 'src/app/core/services/specialties.service';

@Component({
  selector: 'app-choose-specialty',
  templateUrl: './choose-specialty.component.html',
  styleUrls: ['./choose-specialty.component.scss'],
})
export class ChooseSpecialtyComponent {
  specialties: Specialty[] = [];
  selected!: Specialty;
  searchedInput = '';
  appointmentData!: Appointment;

  constructor(
    private specialtyService: SpecialtiesService,
    private dataStoreService: DataStoreService
  ) {
    this.specialtyService.getSpecialties().subscribe(specialties => (this.specialties = specialties as Specialty[]));
    this.getAppointment();
  }

  getAppointment() {
    this.dataStoreService.appointmentDetails.subscribe(data => (this.appointmentData = data));
  }

  isActive(item: Specialty) {
    return this.selected === item;
  }

  pickedSpecialty(specialty: Specialty) {
    this.selected = specialty;
    this.sendPickedSpecialty();
  }

  sendPickedSpecialty() {
    const data: Appointment = { ...this.appointmentData, specialtyId: this.selected.id };
    this.dataStoreService.addData(data);
  }
}
