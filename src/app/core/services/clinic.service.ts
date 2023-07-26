import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Observable, from, map } from 'rxjs';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Clinic } from '../interfaces/clinic.interface';
@Injectable({
  providedIn: 'root',
})
export class ClinicService {
  constructor(private firestore: Firestore) {}

  addData(formData: FormGroup) {
    const clinicsCollection = collection(this.firestore, 'clinics');
    addDoc(clinicsCollection, formData.value)
      .then(() => {
        console.log('Data saved');
      })
      .catch(err => {
        console.log(err);
      });
  }

  getClinics(): Observable<Clinic[]> {
    const clinicsCollection = collection(this.firestore, 'clinics');
    return collectionData(clinicsCollection, { idField: 'id' }).pipe(map((data: DocumentData[]) => data as Clinic[]));
  }

  getClinic(id: string): Observable<DocumentData> {
    const selectedClinic = doc(this.firestore, 'clinics', id);
    return from(getDoc(selectedClinic));
  }

  updateData(id: string, formData: FormGroup) {
    const docInstance = doc(this.firestore, 'clinics', id);
    updateDoc(docInstance, formData.value)
      .then(() => {
        console.log('Data Changed');
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateImage(id: string, imageUrl: string) {
    const docInstance = doc(this.firestore, 'clinics', id);
    updateDoc(docInstance, {
      imageUrl: imageUrl,
    })
      .then(() => {
        console.log('Image Changed');
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteData(id: string) {
    const docInstance = doc(this.firestore, 'clinics', id);
    deleteDoc(docInstance).then(() => {
      console.log('Data deleted');
    });
  }
}
