import { Patient } from './patient.interface';

export interface AppointmentIds {
  clinicId: string;
  date: string;
  doctorId: string;
  patient: Patient;
  serviceId: string;
  specialtyId: string;
  timeSlot: string;
  extraDetails: object;
}
