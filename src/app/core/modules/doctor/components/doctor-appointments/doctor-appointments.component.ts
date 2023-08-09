import { Component } from '@angular/core';
import { Appointment } from 'src/app/core/interfaces/appointment.interface';
import { AppointmentService } from 'src/app/core/services/appointment.service';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.scss'],
  providers: [],
})
export class DoctorAppointmentsComponent {
  appointments: Appointment[] = [];
  doctorId!: string;
  dateNow!: Date;
  searchInput = '';

  constructor(private appointmentService: AppointmentService) {
    this.dateNow = new Date();
    this.appointmentService
      .getAppointments()
      .subscribe(appointments => (this.appointments = appointments as Appointment[]));
  }

  filterAppointments() {
    //
  }
}
