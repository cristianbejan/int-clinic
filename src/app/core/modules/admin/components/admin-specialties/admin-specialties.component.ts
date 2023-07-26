import { Component, Input } from '@angular/core';
import { SpecialtiesService } from 'src/app/core/services/specialties.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Specialty } from 'src/app/core/interfaces/specialty.interface';

@Component({
  selector: 'app-admin-specialties',
  templateUrl: './admin-specialties.component.html',
  styleUrls: ['./admin-specialties.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('150ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminSpecialtiesComponent {
  columnsToDisplay = ['name', 'doctorIds', 'id'];
  searchInput = '';
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Specialty;
  specialties: Specialty[] = [];

  constructor(private dataBase: SpecialtiesService) {
    this.dataBase.getSpecialties().subscribe({
      next: specialties => {
        this.specialties = specialties as Specialty[];
      },
      error: error => alert('Data could not be loaded,check your internet conection!'),
    });
  }

  deleteSpecialty(id: string) {
    this.dataBase.deleteSpecialty(id);
  }
}
