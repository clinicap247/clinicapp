import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { FileInputComponent } from "../../../../shared/components/custom-inputs/file-input/file-input.component";
import { MultipleFileInputComponent } from "../../../../shared/components/custom-inputs/multiple-file-input/multiple-file-input.component";
import { Appointment } from '../../../../../../models/appointment.model';

@Component({
  selector: 'app-detail-patient-appointment-item',
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent,
    NgTemplateOutlet,
    FileInputComponent,
    MultipleFileInputComponent
],
  templateUrl: './detail-patient-appointment-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPatientAppointmentItemComponent {

  @Input()appointment! : Appointment;

  constructor() { }



 }
