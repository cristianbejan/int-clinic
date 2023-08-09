import { Component } from '@angular/core';
import { AppointmentIds } from 'src/app/core/interfaces/appointment-ids.interface';
import { Appointment } from 'src/app/core/interfaces/appointment.interface';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ClinicService } from 'src/app/core/services/clinic.service';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { ServicesService } from 'src/app/core/services/services.service';
import { SpecialtiesService } from 'src/app/core/services/specialties.service';

@Component({
  selector: 'app-patient-current',
  templateUrl: './patient-current.component.html',
  styleUrls: ['./patient-current.component.scss'],
})
export class PatientCurrentComponent {
  clientAppointments!: any;
  appointmentsText: any = [];
  todayDate: Date = new Date();

  constructor(
    private appointmentQuery: AppointmentService,
    private authUser: AuthService,
    private clinicService: ClinicService,
    private specialtyService: SpecialtiesService,
    private serviceService: ServicesService,
    private doctorService: DoctorService
  ) {
    this.authUser.user$.subscribe(data => {
      appointmentQuery.dashboardQuery(data.uid).subscribe(data => {
        this.clientAppointments = data as [];
        this.clientAppointments.forEach(
          (appointment: {
            date: any;
            clinicId: string;
            specialtyId: string;
            serviceId: string;
            doctorId: string;
            timeSlot: string;
            extraDetails: object;
          }) => {
            if (appointment.date?.toDate() >= this.todayDate) {
              const data = {
                clinic: {},
                date: new Date(),
                doctor: {},
                service: {},
                specialty: {},
                timeSlot: '',
                extraDetails: {},
              };
              this.clinicService.getClinic(appointment.clinicId).subscribe(res => (data.clinic = res['data']()));
              this.specialtyService
                .getSpecialty(appointment.specialtyId)
                .subscribe(res => (data.specialty = res['data']()));
              this.serviceService.getService(appointment.serviceId).subscribe(res => (data.service = res['data']()));
              this.doctorService.getDoctor(appointment.doctorId).subscribe(res => (data.doctor = res['data']()));
              data.date = appointment.date.toDate().toString().split(' ').slice(0, 4).join(' ') as Date;
              data.timeSlot = appointment.timeSlot;
              data.extraDetails = appointment.extraDetails;

              this.appointmentsText.push(data);
            }
          }
        );
      });
    });
  }
}
