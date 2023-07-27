import {
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Services } from '../interfaces/services.interface';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  services!: DocumentData[];

  constructor(private dataBase: Firestore) {
    this.getServices();
  }

  addService(newService: Omit<Services, 'id'>) {
    const serviceCollection = collection(this.dataBase, 'Services');

    addDoc(serviceCollection, newService)
      .then(() => {
        console.log('Serviciul a fost adaugat cu succes!');
      })
      .catch(err => {
        console.log(err);
      });
  }

  getServices() {
    const servicesCollection = collection(this.dataBase, 'Services');

    return collectionData(servicesCollection, { idField: 'id' });
  }

  getService(id: string): Observable<DocumentData> {
    const serviceReference = doc(this.dataBase, 'Services', id);
    return from(getDoc(serviceReference));
  }

  updateService(editedService: Services) {
    const serviceReference = doc(this.dataBase, 'Services', editedService.id);
    const updatedService = {
      name: editedService.name,
      price: editedService.price,
      description: editedService.description,
      specialtyIds: editedService.specialtyIds ?? [],
    };

    updateDoc(serviceReference, updatedService)
      .then(() => {
        console.log('Serviciul a fost editat cu succes');
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteService(id: string) {
    const serviceReference = doc(this.dataBase, 'Services', id);

    deleteDoc(serviceReference).then(() => {
      console.log('Serviciul a fost sters cu succes');
    });
  }
}