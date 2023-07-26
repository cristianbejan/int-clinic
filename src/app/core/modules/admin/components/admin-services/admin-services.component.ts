import { Component } from '@angular/core';
import { ServicesService } from 'src/app/core/services/services.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Services } from 'src/app/core/interfaces/services.interface';

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
  columnsToDisplay = ['name', 'price', 'id'];
  searchInput = '';
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Services;
  services: Services[] = [];

  constructor(private dataBase: ServicesService) {
    this.dataBase.getServices().subscribe({
      next: services => {
        this.services = services as Services[];
      },
      error: error => alert('Data could not be loaded,check your internet conection!'),
    });
  }

  deleteService(id: string) {
    this.dataBase.deleteService(id);
  }
}
