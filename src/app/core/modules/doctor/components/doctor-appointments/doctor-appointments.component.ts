import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Appointment } from 'src/app/core/interfaces/appointment.interface';
import { AppointmentService } from 'src/app/core/services/appointment.service';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.scss'],
  providers: [],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('150ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DoctorAppointmentsComponent {
  appointments: Appointment[] = [];
  doctorId!: string;
  dateNow!: Date;
  searchInput = '';
  columnsToDisplay = ['Nume pacient', 'Specializare', 'Serviciu'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Appointment;

  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 15, 20, 30];
  sortField = 'lastName';
  sortDirection: 'asc' | 'desc' = 'asc';
  showFirstLastButtons = true;
  loading = true;
  color: ThemePalette = 'primary';
  diameter = 50;

  constructor(private appointmentService: AppointmentService) {
    this.dateNow = new Date();
    this.appointmentService.getAppointments().subscribe(appointments => {
      this.appointments = appointments as Appointment[];
      console.log(this.appointments);
    });
  }
}
