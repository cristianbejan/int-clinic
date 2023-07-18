import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDoctorsComponent } from './components/admin-doctors/admin-doctors.component';
import { AdminClinicsComponent } from './components/admin-clinics/admin-clinics.component';
import { AdminSpecialtiesComponent } from './components/admin-specialties/admin-specialties.component';
import { AdminSpecialtiesFormComponent } from './components/admin-specialties/admin-specialties-form/admin-specialties-form.component';

const COMPONENTS = [AdminComponent];

@NgModule({
  declarations: [
    ...COMPONENTS,
    AdminDoctorsComponent,
    AdminClinicsComponent,
    AdminSpecialtiesComponent,
    AdminSpecialtiesFormComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
