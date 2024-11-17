import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-detail-patient-profile',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './detail-patient-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPatientProfileComponent { }
