import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './core/components/admin/admin.component';
import { AddDoctorComponent } from './core/components/admin/add-doctor/add-doctor.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    // children: [
    //   {
    //     path: 'doctor',
    //     component: AddDoctorComponent,
    //   },
    // ],
  },
  { path: 'doctor', component: AddDoctorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
