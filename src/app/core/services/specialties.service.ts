import {
  CollectionReference,
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  DocumentData,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
} from '@angular/fire/firestore';
import { Specialty } from '../interfaces/specialty.interface';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpecialtiesService {
  specialities!: DocumentData[];

  constructor(
    private dataBase: Firestore // @Inject(Object) specilitiesObj: Speciality
  ) {
    this.getSpecialties();
  }

  addSpecialty(newSpecialtyObj: Omit<Specialty, 'id'>) {
    const specialtyCollection = collection(this.dataBase, 'Specialities');

    addDoc(specialtyCollection, newSpecialtyObj)
      .then(() => {
        console.log('Specialty added');
      })
      .catch(err => {
        console.log(err);
      });
  }

  getSpecialties() {
    const specialtyCollection = collection(this.dataBase, 'Specialities');

    return collectionData(specialtyCollection, { idField: 'id' });
  }

  getSpecialty(id: string): Observable<DocumentData> {
    const docReference = doc(this.dataBase, 'Specialities', id);
    return from(getDoc(docReference));
  }

  updateSpecialty(specialtyObject: Specialty) {
    const specialtyInstance = doc(this.dataBase, 'Specialities', specialtyObject.id);
    const updatedSpecialty = {
      id: specialtyObject.id,
      name: specialtyObject.name,
      doctorIds: specialtyObject.doctorIds,
      description: specialtyObject.description,
    };

    updateDoc(specialtyInstance, updatedSpecialty)
      .then(() => {
        console.log('Specialty changed');
      })

      .catch(err => {
        console.log(err);
      });
  }

  // search(searchedInput: string, route: string, options: string) {
  //   const ref = collection(this.dataBase, route);
  //   const refq = query(ref, where(options, '==', searchedInput));

  //   return collectionData(refq) as Observable<Specialty[]>;
  // }

  deleteSpecialty(id: string) {
    const specialtyInstance = doc(this.dataBase, 'Specialities', id);

    deleteDoc(specialtyInstance).then(() => {
      console.log('Specialty deleted');
    });
  }
}
