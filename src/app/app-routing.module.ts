import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './core/components/home-page/home-page.component';

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
    loadChildren: () => import('./core/modules/patient/patient.module').then(m => m.PatientModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
