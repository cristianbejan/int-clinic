import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.scss'],
})
export class UserSignUpComponent {
  hide = true;

  signUpForm = new FormGroup({});
}
