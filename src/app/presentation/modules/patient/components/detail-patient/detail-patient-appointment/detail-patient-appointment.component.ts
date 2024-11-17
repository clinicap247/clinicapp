import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DetailPatientAppointmentItemComponent } from "../detail-patient-appointment-item/detail-patient-appointment-item.component";

@Component({
  selector: 'app-detail-patient-appointment',
  standalone: true,
  imports: [
    CommonModule,
    DetailPatientAppointmentItemComponent
],
  templateUrl: './detail-patient-appointment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPatientAppointmentComponent { }
