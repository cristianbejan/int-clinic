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
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { ChooseExtraComponent } from './components/patient-appointment/choose-extra/choose-extra.component';
import { ChooseDateComponent } from './components/patient-appointment/choose-date/choose-date.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FilterByPipe } from '../../services/filter-by.pipe';
import { ScrollButtonComponent } from '../../components/scroll-button/scroll-button.component';

@NgModule({
  declarations: [
    PatientAppointmentComponent,
    PatientComponent,
    ChooseClinicComponent,
    ChooseSpecialtyComponent,
    ChooseDoctorComponent,
    ChooseServiceComponent,
    ChooseExtraComponent,
    ChooseDateComponent,
    FilterByPipe,
    ScrollButtonComponent,
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
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  providers: [],
})
export class PatientModule {}
