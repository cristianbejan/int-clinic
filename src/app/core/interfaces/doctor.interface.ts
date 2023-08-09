export interface Doctor {
  id?: string;
  uid?: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  phone: string;
  adress: string;
  email: string;
  password: string;
  imageUrl: string;
  specialtyIds: string[];
  description: string;
  assignedSpecialties?: string[];
  role?: string;
}
