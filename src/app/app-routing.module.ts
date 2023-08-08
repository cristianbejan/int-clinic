import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './core/components/home-page/home-page.component';
import { PatientAuthGuard } from './core/shared/patient-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'admin',
    loadChildren: () => import('./core/modules/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'patient',
    canActivateChild: [PatientAuthGuard],
    loadChildren: () => import('./core/modules/patient/patient.module').then(m => m.PatientModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./core/modules/user/user.module').then(m => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
