import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientAppointmentComponent } from './components/patient-appointment/patient-appointment.component';
import { PatientComponent } from './components/patient.component';

const ROUTES: Routes = [
  {
    path: '',
    component: PatientComponent,
    children: [
      {
        path: 'appointment',
        component: PatientAppointmentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
