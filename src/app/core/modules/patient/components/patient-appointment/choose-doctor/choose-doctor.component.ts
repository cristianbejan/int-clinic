import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Appointment } from 'src/app/core/interfaces/appointment.interface';
import { Doctor } from 'src/app/core/interfaces/doctor.interface';
import { Specialty } from 'src/app/core/interfaces/specialty.interface';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { SpecialtiesService } from 'src/app/core/services/specialties.service';

@Component({
  selector: 'app-choose-doctor',
  templateUrl: './choose-doctor.component.html',
  styleUrls: ['./choose-doctor.component.scss'],
})
export class ChooseDoctorComponent implements OnInit {
  doctors: Doctor[] = [];
  specialties: Specialty[] = [];
  subjectData!: Appointment;
  selected: any;

  constructor(
    private doctorService: DoctorService,
    private specialtyService: SpecialtiesService,
    private dataStoreService: DataStoreService
  ) {}

  ngOnInit(): void {
    this.getDoctors();
    this.getSpecialties();
    this.dataStoreService.appointmentDetails.subscribe(data => (this.subjectData = data));
  }
  getDoctors() {
    return this.doctorService
      .getDoctors()
      .pipe(
        tap(data => {
          this.doctors = data as Doctor[];
        })
      )
      .subscribe();
  }

  getSpecialties() {
    return this.specialtyService
      .getSpecialties()
      .pipe(
        tap(data => {
          this.specialties = data as Specialty[];
        })
      )
      .subscribe();
  }

  getSpecialtyNames(specialtyIds: string[]): string[] {
    const specialtyNames = specialtyIds.map(specialtyId => {
      const specialty = this.specialties.find(spec => spec.id === specialtyId);
      return specialty ? specialty.name : '';
    });
    return specialtyNames;
  }

  selectedDoctor(doctor: Doctor) {
    this.selected = doctor;
    const data = { ...this.subjectData, doctorId: doctor.id };
    this.dataStoreService.addData(data);
  }

  isActive(item: any) {
    return this.selected === item;
  }
}
