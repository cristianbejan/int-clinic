import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './components/doctor.component';
import { DoctorAppointmentsComponent } from './components/doctor-appointments/doctor-appointments.component';
import { DoctorFilterComponent } from './components/doctor-filter/doctor-filter.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorComponent,
    children: [
      {
        path: 'appointments',
        component: DoctorAppointmentsComponent,
        children: [
          {
            path: 'filter',
            component: DoctorFilterComponent,
            children: [],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
