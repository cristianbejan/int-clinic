export interface Doctor {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  adress: string;
  email: string;
  password: string;
  imageUrl: string;
  specialtyIds: string[];
  description: string;
  assignedSpecialties?: string[];
}
