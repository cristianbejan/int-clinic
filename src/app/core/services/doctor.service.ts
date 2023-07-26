import { Injectable } from '@angular/core';

import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  DocumentData,
  getDoc,
} from '@angular/fire/firestore';

import { Doctor } from '../interfaces/doctor.interface';
import { Observable, from, of } from 'rxjs';
// import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private firestore: Firestore) {}

  addDoctor(doctor: Doctor): Observable<DocumentData> {
    const doctorCollection = collection(this.firestore, 'doctors');
    return from(addDoc(doctorCollection, doctor));
  }

  getDoctors(): Observable<DocumentData[]> {
    const doctorCollection = collection(this.firestore, 'doctors');
    return collectionData(doctorCollection, { idField: 'id' });
  }

  getDoctor(id: string): Observable<DocumentData> {
    const selectedDoctor = doc(this.firestore, 'doctors', id);
    return from(getDoc(selectedDoctor));
  }

  updateDoctor(id: string, updatedData: DocumentData): Observable<void> {
    const selectedDoctor = doc(this.firestore, 'doctors', id);

    return from(updateDoc(selectedDoctor, updatedData));
  }

  deleteDoctor(id: string): Observable<void> {
    const selectedDoctor = doc(this.firestore, 'doctors', id);
    return from(deleteDoc(selectedDoctor));
  }
}
