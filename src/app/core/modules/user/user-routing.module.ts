import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignUpComponent } from './components/user-sign-up/user-sign-up.component';

const ROUTES: Routes = [
  {
    path: '',
    component: UserComponent,
    // children: [
    //   {
    //     path: 'login',
    //     component: UserLoginComponent,
    //   },
    //   {
    //     path: 'sign-up',
    //     component: UserSignUpComponent,
    //   },
    // ],
  },
  {
    path: 'login',
    component: UserLoginComponent,
  },
  {
    path: 'sign-up',
    component: UserSignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
