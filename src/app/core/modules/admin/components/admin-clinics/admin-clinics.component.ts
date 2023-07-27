import { Component, ViewChild } from '@angular/core';
import { ClinicService } from 'src/app/core/services/clinic.service';
import { Clinic } from 'src/app/core/interfaces/clinic.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';

@Component({
  selector: 'app-admin-clinics',
  templateUrl: './admin-clinics.component.html',
  styleUrls: ['./admin-clinics.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminClinicsComponent {
  clinics!: Clinic[];

  columnsToDisplay = ['name', 'phone', 'email', 'address'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Clinic;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Clinic>;
  constructor(
    private clinicService: ClinicService,
    private dialogService: ConfirmationDialogService
  ) {
    this.getClinics();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getClinics() {
    this.clinicService.getClinics().subscribe(clinics => {
      this.clinics = clinics;
      this.dataSource = new MatTableDataSource(clinics);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data: Clinic, filter: string): boolean => {
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
    });
  }

  confirmDeleteDialog(id: string, name: string) {
    const options = {
      title: 'Stergere Clinica',
      message: `Esti sigur ca vrei sa stergi clinica ${name} ?`,
      cancelText: 'Nu',
      confirmText: 'Da',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        if (id) {
          this.clinicService.deleteData(id);
        }
      }
    });
  }
}
