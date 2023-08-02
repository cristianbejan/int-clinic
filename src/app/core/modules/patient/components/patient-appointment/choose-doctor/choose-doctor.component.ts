import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { tap, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Appointment } from 'src/app/core/interfaces/appointment.interface';
import { Clinic } from 'src/app/core/interfaces/clinic.interface';
import { Doctor } from 'src/app/core/interfaces/doctor.interface';
import { Specialty } from 'src/app/core/interfaces/specialty.interface';
import { ClinicService } from 'src/app/core/services/clinic.service';
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
  currentAppointment!: Appointment;
  clinicSelected!: Clinic;
  selected!: Doctor;

  constructor(
    private doctorService: DoctorService,
    private specialtyService: SpecialtiesService,
    private clinicService: ClinicService,
    private dataStoreService: DataStoreService
  ) {}

  ngOnInit(): void {
    this.getDoctors();
    this.getSpecialties();
    this.dataStoreService.appointmentDetails.subscribe(data => (this.currentAppointment = data));
  }
  getDoctors() {
    combineLatest([this.dataStoreService.appointmentDetails])
      .pipe(filter(([data]) => !!data))
      .subscribe(([data]) => {
        this.currentAppointment = data;

        const filteredDoctorsBySpecialtyAndClinic: DocumentData = [];

        this.doctorService
          .getDoctors()
          .pipe(
            tap(doctors => {
              const filteredDoctorsBySpecialty = doctors.filter(doctor => {
                return doctor['specialtyIds'].includes(this.currentAppointment.specialtyId);
              });
              this.doctors = filteredDoctorsBySpecialty as Doctor[];
            })
          )
          .subscribe();

        if (this.currentAppointment.clinicId) {
          this.clinicService.getClinic(this.currentAppointment.clinicId).subscribe(clinic => {
            this.clinicSelected = clinic['data']() as Clinic;

            this.doctors.forEach(doctor => {
              if (doctor.id !== undefined) {
                if (this.clinicSelected.doctorIds?.includes(doctor.id)) {
                  filteredDoctorsBySpecialtyAndClinic['push'](doctor);
                }
              }
            });
            this.doctors = filteredDoctorsBySpecialtyAndClinic as Doctor[];
          });
        }
      });
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
    if (doctor.id) {
      const data = { ...this.currentAppointment, doctorId: doctor.id };
      this.dataStoreService.addData(data);
    }
  }

  isActive(item: Doctor) {
    return this.selected && this.selected.id === item.id;
  }
}
