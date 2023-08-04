import { Clinic } from './clinic.interface';
import { Doctor } from './doctor.interface';
import { Services } from './services.interface';
import { Specialty } from './specialty.interface';

export interface Appointment {
  specialty: Specialty;
  service: Services;
  doctor: Doctor;
  clinic: Clinic;
  date: string;
  timeSlot: string;
  extraDetails: {
    comment: any;
    file: {
      name: string;
      url: string;
    };
  };
  // patientID: string
  // date: string
  // timeSlot: string
  // extraMentions: string
}
