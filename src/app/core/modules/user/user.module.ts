import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignUpComponent } from './components/user-sign-up/user-sign-up.component';
import { UserRoutingModule } from './user-routing.module';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [UserComponent, UserLoginComponent, UserSignUpComponent],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    UserRoutingModule,
    MatRadioModule,
  ],
})
export class UserModule {}
