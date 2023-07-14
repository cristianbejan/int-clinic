import { Component } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'IntClinic';

  userData!: Observable<any>;

  constructor(private firestore: Firestore) {
    this.getData();
  }

  addData(f: any) {
    const testCollection = collection(this.firestore, 'Users');
    addDoc(testCollection, f.value)
      .then(() => {
        console.log('Data saved');
      })
      .catch(err => {
        console.log(err);
      });
  }

  getData() {
    const testCollection = collection(this.firestore, 'Users');

    collectionData(testCollection).subscribe(val => {
      console.log(val);
    });

    this.userData = collectionData(testCollection, { idField: 'id' });
  }

  updateData(id: string) {
    const docInstance = doc(this.firestore, 'Users', id);
    const updateData = {
      name: 'updatedName',
    };

    updateDoc(docInstance, updateData)
      .then(() => {
        console.log('Data Changeds');
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteData(id: string) {
    const docInstance = doc(this.firestore, 'Users', id);
    deleteDoc(docInstance).then(() => {
      console.log('Data deleted');
    });
  }
}
