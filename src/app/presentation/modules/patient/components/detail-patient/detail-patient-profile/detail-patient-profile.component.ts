import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Patient } from '../../../../../../models/patient.model';

@Component({
  selector: 'app-detail-patient-profile',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './detail-patient-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPatientProfileComponent {

  @Input() patient! :Patient;

 }
