import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { AuthService } from './core/services/auth.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AdminComponent } from './core/components/admin/admin.component';
import { AddDoctorComponent } from './core/components/admin/add-doctor/add-doctor.component';

@NgModule({
  declarations: [AppComponent, AdminComponent, AddDoctorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FormsModule,
    AngularFireAuthModule,
  ],
  providers: [AuthService, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent],
})
export class AppModule {}
