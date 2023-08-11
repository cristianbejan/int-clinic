import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './components/doctor.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { DoctorScheduleVacationComponent } from './components/doctor-schedule-vacation/doctor-schedule-vacation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';
import { DoctorDetailsComponent } from './components/doctor-dashboard/doctor-details/doctor-details.component';
import { DoctorHistoryComponent } from './components/doctor-dashboard/doctor-history/doctor-history.component';
import { DoctorCurrentComponent } from './components/doctor-dashboard/doctor-current/doctor-current.component';

@NgModule({
  declarations: [
    DoctorComponent,
    DoctorScheduleVacationComponent,
    DoctorDashboardComponent,
    DoctorDetailsComponent,
    DoctorHistoryComponent,
    DoctorCurrentComponent,
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTableModule,
    MatTabsModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
})
export class DoctorModule {}
