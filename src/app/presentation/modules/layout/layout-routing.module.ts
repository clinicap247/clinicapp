import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [

  {
    path : 'patient',
    component : LayoutComponent,
    loadChildren : () =>
      import('../patient/patient.module').then(m => m.PatientModule),
  },
  {
    path : 'doctor',
    component : LayoutComponent,
    loadChildren : () =>
       import('../doctor/doctor.module').then( m => m.DoctorModule)
  },
  { path: '', redirectTo: 'patient', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
