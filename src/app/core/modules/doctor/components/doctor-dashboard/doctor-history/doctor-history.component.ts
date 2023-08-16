import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-doctor-history',
  templateUrl: './doctor-history.component.html',
  styleUrls: ['./doctor-history.component.scss'],
})
export class DoctorHistoryComponent implements OnInit {
  appointmentsText: any[] = [];
  todayDate: Date = new Date();
  doctorUid: string | undefined;

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user?.role === 'doctor') {
        this.doctorUid = user.uid;

        this.fetchDoctorAppointments();
      }
    });
  }

  fetchDoctorAppointments(): void {
    if (this.doctorUid) {
      this.appointmentService.queryAppointmentsDoctor(this.doctorUid).subscribe(appointments => {
        this.appointmentsText = appointments.map((appointment: any) => {
          return {
            ...appointment,
            formattedDate: appointment.date.toDate().toString().split(' ').slice(0, 4).join(' ') as Date,
          };
        });
      });
    }
  }
}
