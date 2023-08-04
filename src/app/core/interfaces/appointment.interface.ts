export interface Appointment {
  specialtyId: string;
  serviceId: string;
  doctorId: string;
  clinicId: string;
  date: string;
  timeSlot: string;
  extraDetails: {
    comment: string;
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
