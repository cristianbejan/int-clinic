import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientAppointmentComponent } from './components/patient-appointment/patient-appointment.component';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './components/patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { ChooseClinicComponent } from './components/patient-appointment/choose-clinic/choose-clinic.component';
import { ChooseSpecialtyComponent } from './components/patient-appointment/choose-specialty/choose-specialty.component';
import { ChooseDoctorComponent } from './components/patient-appointment/choose-doctor/choose-doctor.component';
import { ChooseServiceComponent } from './components/patient-appointment/choose-service/choose-service.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    PatientAppointmentComponent,
    PatientComponent,
    ChooseClinicComponent,
    ChooseSpecialtyComponent,
    ChooseDoctorComponent,
    ChooseServiceComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatCardModule,
    MatGridListModule,
  ],
  providers: [],
})
export class PatientModule {}
