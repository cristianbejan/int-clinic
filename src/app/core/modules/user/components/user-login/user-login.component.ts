import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.SignIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
  }

  onLoginWithGoogle() {
    this.authService.GoogleSignIn();
  }
}

// cristibejan@live.com
// 123456
