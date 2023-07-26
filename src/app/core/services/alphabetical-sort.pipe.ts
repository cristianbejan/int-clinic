import { Pipe, PipeTransform } from '@angular/core';
import { Specialty } from '../interfaces/specialty.interface';
import { Doctor } from '../interfaces/doctor.interface';
import { Services } from '../interfaces/services.interface';

@Pipe({
  name: 'alphabeticalOrder',
})
export class AlphabeticalOrderPipe implements PipeTransform {
  transform(specialties: (Specialty | Doctor | Services)[]): (Specialty | Doctor | Services)[] {
    //specialties.sort((a, b) => (a['name'] < b['name'] ? -1 : 1));

    return specialties;
  }
}
