import { Component } from '@angular/core';
import { Services } from 'src/app/core/interfaces/services.interface';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-choose-service',
  templateUrl: './choose-service.component.html',
  styleUrls: ['./choose-service.component.scss'],
})
export class ChooseServiceComponent {
  services!: Services[];
  selected: any;
  isTrue = false;

  constructor(private servicesService: ServicesService) {
    this.servicesService.getServices().subscribe(services => (this.services = services as Services[]));
  }

  pickedService(service: Services) {
    this.isTrue = !this.isTrue;

    if (this.isTrue) {
      this.selected = service;
      return service;
    }
    this.selected = null;
    return service;
  }

  isActive(item: any) {
    return this.selected === item;
  }
}
