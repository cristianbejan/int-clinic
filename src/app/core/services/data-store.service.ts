import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointment } from '../interfaces/appointment.interface';

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  appointmentDetails = new BehaviorSubject<Appointment>({
    specialtyId: '',
    serviceId: '',
    doctorId: '',
    clinicId: '',
  });

  addData(data: any) {
    return this.appointmentDetails.next(data);
  }
}
