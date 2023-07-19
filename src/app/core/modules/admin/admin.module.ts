import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDoctorsComponent } from './components/admin-doctors/admin-doctors.component';
import { AdminClinicsComponent } from './components/admin-clinics/admin-clinics.component';
import { AdminSpecialtiesComponent } from './components/admin-specialties/admin-specialties.component';
import { AdminSpecialtiesFormComponent } from './components/admin-specialties/admin-specialties-form/admin-specialties-form.component';
import { AdminDoctorsFormComponent } from './components/admin-doctors/admin-doctors-form/admin-doctors-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

import { MatTabsModule } from '@angular/material/tabs';
const COMPONENTS = [AdminComponent];

@NgModule({
  declarations: [
    ...COMPONENTS,
    AdminDoctorsComponent,
    AdminDoctorsFormComponent,
    AdminClinicsComponent,
    AdminSpecialtiesComponent,
    AdminSpecialtiesFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
  ],
})
export class AdminModule {}
