import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { PatientComponent } from './patient.component';
import { DetailPatientComponent } from './pages/detail-patient/detail-patient.component';


const routes: Routes = [
  {
    path : '',
    component: PatientComponent,
    children: [
      {
        path : 'list',
        component : ListComponent,
      },
      {
        path : 'appointments',
        component: AppointmentComponent,
      },
      {
        path : 'detail/:id',
        component : DetailPatientComponent,
      },

      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: '**', redirectTo: 'error/404' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
