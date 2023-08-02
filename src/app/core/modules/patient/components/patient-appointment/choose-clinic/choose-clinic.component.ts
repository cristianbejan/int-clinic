import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Appointment } from 'src/app/core/interfaces/appointment.interface';
import { Clinic } from 'src/app/core/interfaces/clinic.interface';
import { ClinicService } from 'src/app/core/services/clinic.service';
import { DataStoreService } from 'src/app/core/services/data-store.service';

@Component({
  selector: 'app-choose-clinic',
  templateUrl: './choose-clinic.component.html',
  styleUrls: ['./choose-clinic.component.scss'],
})
export class ChooseClinicComponent implements OnInit {
  clinics!: Clinic[];
  selectedClinic!: Clinic;
  receivedAppointment!: Appointment;
  updatedAppointment!: Appointment;

  constructor(
    private clinicService: ClinicService,
    private dataStoreService: DataStoreService
  ) {}

  ngOnInit(): void {
    this.getClinics();
  }

  getClinics() {
    combineLatest([this.dataStoreService.appointmentDetails])
      .pipe(filter(([data]) => !!data))
      .subscribe(([data]) => {
        this.receivedAppointment = data;

        this.clinicService.getClinics().subscribe(clinics => {
          this.clinics = clinics.filter(clinic => clinic.specialtyIds?.includes(this.receivedAppointment.specialtyId));
        });
      });
  }

  isActive(item: Clinic) {
    return this.selectedClinic === item;
  }

  pickedClinic(clinic: Clinic) {
    this.selectedClinic = clinic;
    if (clinic.id) {
      this.updatedAppointment = {
        ...this.receivedAppointment,
        clinicId: clinic.id,
      };
    }
    this.dataStoreService.addData(this.updatedAppointment);
  }
}
