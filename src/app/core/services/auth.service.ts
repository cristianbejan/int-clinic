import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Patient } from '../interfaces/patient.interface';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<Patient>(`patients/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  SignUp(email: string, pass: string, role: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, pass)
      .then(result => {
        if (result.user) {
          console.log(result.user);
          this.setUserData(result.user, role);
        }
      })
      .catch(err => console.log(err.message));
  }

  pacientSignUp(pass: string, patient: Patient) {
    return this.afAuth
      .createUserWithEmailAndPassword(patient.email, pass)
      .then(result => {
        if (!result.user) {
          return;
        }
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`patients/${result.user.uid}`);

        const patientData = {
          uid: result.user.uid,
          email: patient.email,
          imageUrl: patient.imageUrl,
          displayName: patient.lastName + ' ' + patient.firstName,
          gender: patient.gender,
          phone: patient.phone,
          role: 'patient',
        };

        return userRef.set(patientData, {
          merge: true,
        });
      })
      .catch(err => console.log(err.message));
  }

  SignIn(email: string, pass: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, pass)
      .then(result => {
        console.log(result.user);
      })
      .catch(err => Promise.reject(err));
  }

  patientGoogleSignIn() {
    return this.afAuth
      .signInWithPopup(new GoogleAuthProvider())
      .then(result => {
        if (!result.user) {
          return;
        }
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`patients/${result.user.uid}`);

        const patientData = {
          uid: result.user.uid,
          email: result.user.email,
          imageUrl: result.user.photoURL,
          displayName: result.user.displayName,
          gender: null,
          phone: result.user.phoneNumber,
          role: 'patient',
        };

        return userRef.set(patientData, {
          merge: true,
        });
      })
      .catch(err => console.log(err.message));
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      console.log('Sign Out Succesfully');
    });
  }

  setUserData(user: any, role: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`patients/${user.uid}`);

    const userData = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
      role,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  sendPasswordResetEmail(email: string) {
    return this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.router.navigate(['verify-email']);
      })
      .catch(error => {
        console.error('Error sending password reset email:', error);
      });
  }
}
