export interface Doctor {
  id?: string;
  firstName: string;
  lastName: string;
  phone: number | null;
  adress: string;
  email: string;
  password: string;
  specialtyIds: string[];
}
