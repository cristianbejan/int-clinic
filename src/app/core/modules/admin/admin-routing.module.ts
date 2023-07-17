import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin.component';
import { AdminDoctorsComponent } from './components/admin-doctors/admin-doctors.component';
import { AdminPatientsComponent } from './components/admin-patients/admin-patients.component';
import { AdminSpecialtiesComponent } from './components/admin-specialties/admin-specialties.component';
import { AdminSpecialtiesFormComponent } from './components/admin-specialties/admin-specialties-form/admin-specialties-form.component';

const ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'doctors',
        component: AdminDoctorsComponent,
      },
      {
        path: 'patients',
        component: AdminPatientsComponent,
      },
      {
        path: 'specialties',
        component: AdminSpecialtiesComponent,
      },
      {
        path: 'specialties/create',
        component: AdminSpecialtiesFormComponent,
      },
      {
        path: 'specialties/:id/edit',
        component: AdminSpecialtiesFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
