import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/services/auth.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DoctorService } from './core/services/doctor.service';
import { ConfirmationDialogComponent } from './core/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HomePageComponent } from './core/components/home-page/home-page.component';

@NgModule({
  declarations: [AppComponent, ConfirmationDialogComponent, HomePageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [AuthService, DoctorService, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent],
})
export class AppModule {}
