import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent {
  hide = true;

  email = '';
  password = '';

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    this.authService
      .SignIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .then(() => {
        this.router.navigate(['patient']);
      })
      .catch(err => {
        console.log('eroare login', err.message);
      });
  }

  onLoginWithGoogle() {
    this.authService.patientGoogleSignIn().then(() => {
      this.router.navigate(['patient']);
    });
  }
}

// cristibejan@live.com
// 123456
