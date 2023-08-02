import { Component, OnInit } from '@angular/core';
import { combineLatest, filter } from 'rxjs';
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
  clinics: Clinic[] = [];
  appointmentData!: Appointment;
  selectedClinic!: Clinic;

  constructor(
    private clinicService: ClinicService,
    private dataStoreService: DataStoreService
  ) {}

  ngOnInit(): void {
    this.getClinics();
  }

  getClinics() {
    console.log('get clinics');

    combineLatest([this.dataStoreService.appointmentDetails])
      .pipe(filter(([data]) => !!data))
      .subscribe(([data]) => {
        this.appointmentData = data;

        this.clinicService.getClinics().subscribe(clinics => {
          this.clinics = clinics.filter(clinic => clinic.specialtyIds?.includes(this.appointmentData.specialtyId));
        });
      });
  }

  pickClinic(clinic: Clinic) {
    this.selectedClinic = clinic;
    this.sendPickedClinic();
  }

  sendPickedClinic() {
    const newData = { ...this.appointmentData, clinicId: this.selectedClinic.id };
    this.dataStoreService.addData(newData);
  }

  isActive(item: Clinic) {
    return this.selectedClinic && this.selectedClinic.id === item.id;
  }
}
