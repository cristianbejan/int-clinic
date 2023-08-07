import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent {
  emailFormControl!: FormControl;
  hide = true;

  email = '';
  password = '';

  loginForn = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  }

  onLogin() {
    this.authService.SignIn(this.loginForn.controls.email.value, this.loginForn.controls.password.value);
  }

  onLoginWithGoogle() {
    this.authService.GoogleSignIn();
  }
}

// georgescu@mail.com
// 123456
