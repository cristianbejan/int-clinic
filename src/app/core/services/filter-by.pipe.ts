import { Pipe, PipeTransform } from '@angular/core';
import { Specialty } from '../interfaces/specialty.interface';
import { Doctor } from '../interfaces/doctor.interface';
import { Services } from '../interfaces/services.interface';
import { SpecialtiesService } from './specialties.service';
import { Clinic } from '../interfaces/clinic.interface';
import { MatTableDataSource } from '@angular/material/table';

@Pipe({
  name: 'filterBy',
})
export class FilterByPipe implements PipeTransform {
  transform(unsortedArray: MatTableDataSource<Doctor>, searchedInput: string): MatTableDataSource<Doctor> {
    const sortedArray = unsortedArray.filteredData.filter((clinicEntity: Specialty | Doctor | Services | Clinic) =>
      Object.values(clinicEntity).find((attributesInEntities: any) => {
        if (typeof attributesInEntities == 'number') {
          const searchedInputToNumber = Number(searchedInput);

          return searchedInputToNumber === attributesInEntities;
        }
        if (typeof attributesInEntities !== 'object') {
          const equalizedStringInEntities = attributesInEntities
            .normalize('NFD')
            .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
          const equalizedStringInSearchInput = searchedInput
            .normalize('NFD')
            .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');

          return equalizedStringInEntities.toLowerCase().includes(equalizedStringInSearchInput.toLowerCase());
        }
        return attributesInEntities.includes(searchedInput);
      })
    );
    const matTable = new MatTableDataSource(sortedArray);
    console.log(matTable);
    return matTable;
  }
}
