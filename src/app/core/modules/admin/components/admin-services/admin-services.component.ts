import { Component } from '@angular/core';
import { ServicesService } from 'src/app/core/services/services.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Services } from 'src/app/core/interfaces/services.interface';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminServicesComponent {
  dataSource!: MatTableDataSource<Services>;
  columnsToDisplay = ['name', 'price', 'id'];
  searchInput = '';
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Services;
  services: Services[] = [];

  constructor(
    private dataBase: ServicesService,
    private dialogService: ConfirmationDialogService
  ) {
    this.dataBase.getServices().subscribe({
      next: services => {
        this.services = services as Services[];
        this.dataSource = new MatTableDataSource(this.services);
        this.dataSource.filterPredicate = (data: Services, filter: string): boolean => {
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
      title: 'Stergere serviciu',
      message: `Esti sigur ca vrei sa stergi serviciul ${name}?`,
      cancelText: 'Nu',
      confirmText: 'Da',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        if (id) {
          this.dataBase.deleteService(id);
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
