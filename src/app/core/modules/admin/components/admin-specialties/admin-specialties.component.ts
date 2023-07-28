import { Component } from '@angular/core';
import { SpecialtiesService } from 'src/app/core/services/specialties.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Specialty } from 'src/app/core/interfaces/specialty.interface';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { MatTableDataSource } from '@angular/material/table';

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
  specialties: Specialty[] = [];

  dataSource!: MatTableDataSource<Specialty>;
  columnsToDisplay = ['name', 'doctorIds', 'id'];
  searchInput = '';
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Specialty;

  constructor(
    private dataBase: SpecialtiesService,
    private dialogService: ConfirmationDialogService
  ) {
    this.dataBase.getSpecialties().subscribe({
      next: specialties => {
        this.specialties = specialties as Specialty[];
        this.dataSource = new MatTableDataSource(this.specialties);
        this.dataSource.filterPredicate = (data: Specialty, filter: string): boolean => {
          const dataStr = Object.keys(data)
            .reduce((currentTerm: string, key: string) => {
              return currentTerm + (data as { [key: string]: any })[key] + '◬';
            }, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();

          const transformedFilter = filter
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();

          return dataStr.indexOf(transformedFilter) != -1;
        };
      },
      error: error => alert('Data could not be loaded,check your internet conection!'),
    });
  }

  confirmDeleteDialog(id: string, name: string) {
    const options = {
      title: 'Stergere specializare',
      message: `Esti sigur ca vrei sa stergi specializarea ${name}?`,
      cancelText: 'Nu',
      confirmText: 'Da',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        if (id) {
          this.dataBase.deleteSpecialty(id);
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
