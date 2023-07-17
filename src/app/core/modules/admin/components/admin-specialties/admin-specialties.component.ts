import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-specialties',
  templateUrl: './admin-specialties.component.html',
  styleUrls: ['./admin-specialties.component.scss'],
})
export class AdminSpecialtiesComponent {
  public readonly specialties = [
    {
      id: 1,
      name: 'Cardiología',
    },
    {
      id: 2,
      name: 'Dermatología',
    },
    {
      id: 3,
      name: 'Endocrinología',
    },
  ];
}
