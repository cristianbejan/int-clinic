import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore
  ) {}

  userData: any;

  SignUp(email: string, pass: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, pass)
      .then(result => {
        this.SetUserData(result.user);
        console.log(result);
      })
      .catch(err => console.log(err.message));
  }

  SignIn(email: string, pass: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, pass)
      .then(result => {
        console.log(result.user);
      })
      .catch(err => console.log(err.message));
  }

  GoogleSignIn() {
    return this.afAuth
      .signInWithPopup(new GoogleAuthProvider())
      .then(result => console.log(result.user))
      .catch(err => console.log(err.message));
  }

  SignOut() {
    return this.afAuth.signOut().then(result => console.log(result));
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const userData = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
    };

    return userRef.set(userData);
  }
}
