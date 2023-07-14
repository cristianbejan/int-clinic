export interface Patient {
  id: string;
  name: string;
  phone: number;
  email: string;
  address: string;
  password: string;
  speciality_ids: string[];
  doctor_ids: string[];
}
