import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent {
  hide = true;

  users: User[] = [];

  email = '';
  password = '';

  error: { message: string } = { message: '' };

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', { validators: Validators.required }),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    const email = this.loginForm.controls.email.value as string;
    const password = this.loginForm.controls.password.value as string;

    this.authService
      .signIn(email, password)
      .then(() => {
        return this.authService.getCurrentUserUid().then(data => {
          this.authService.getUserRole(data).subscribe(role => {
            if (role === 'patient') {
              this.router.navigate(['patient']);
            }
            if (role === 'doctor') {
              this.router.navigate(['admin']);
            }
            if (role === 'admin') {
              this.router.navigate(['admin']);
            }
          });
        });
      })
      .catch(error => {
        console.log('Firebase error code:', error.code);
        if (error.code === 'auth/user-not-found') {
          this.error.message = 'User-ul nu a fost gasit.';
        } else if (error.code === 'auth/invalid-email') {
          this.error.message = 'Email obligatoriu';
        } else if (error.code === 'auth/invalid-password') {
          this.error.message = 'Parola obligatorie';
        } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email') {
          this.error.message = 'Email sau parola incorecte. Te rog sa incerci din nou';
        } else if (error.code === 'auth/missing-password') {
          this.error.message = 'Parola obligatorie';
        } else if (error.code === 'auth/too-many-requests') {
          this.error.message = 'Cont blocat, numărul de cereri depășite';
        } else {
          this.error.message = 'Eroare interna, te rog sa incerci mai tarziu';
        }
      });
  }

  onLoginWithGoogle() {
    this.authService.patientGoogleSignIn().then(() => {
      this.router.navigate(['patient']);
    });
  }

  onRouterSignUp() {
    this.router.navigate(['sign-up']);
  }
}
