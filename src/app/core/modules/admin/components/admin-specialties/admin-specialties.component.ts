import { Component, ViewChild, Output } from '@angular/core';
import { SpecialtiesService } from 'src/app/core/services/specialties.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Specialty } from 'src/app/core/interfaces/specialty.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ThemePalette } from '@angular/material/core';
import { tap } from 'rxjs';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';

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
  specialties!: Specialty[];
  searchInput = '';

  columnsToDisplay = ['name', 'doctorIds', 'id'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Specialty;

  pageSize = 5;
  pageSizeOptions: number[] = [5, 7, 10, 15, 20, 30];
  sortField = 'lastName';
  sortDirection: 'asc' | 'desc' = 'asc';
  showFirstLastButtons = true;

  @Output() dataSource!: MatTableDataSource<Specialty>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  loading = true;
  color: ThemePalette = 'primary';
  diameter = 50;

  constructor(
    private dataBase: SpecialtiesService,
    private dialogService: ConfirmationDialogService
  ) {
    this.dataBase
      .getSpecialties()
      .pipe(
        tap(data => {
          this.specialties = data as Specialty[];
          this.dataSource = new MatTableDataSource(this.specialties);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading = false;
        })
      )
      .subscribe();
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
}
