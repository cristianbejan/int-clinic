export interface Doctor {
  id: string;
  name: string;
  phone: number;
  email: string;
  address: string;
  password: string;
  speciality_id: string;
  patient_ids: string[];
}
