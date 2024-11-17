import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { FileInputComponent } from "../../../../shared/components/custom-inputs/file-input/file-input.component";
import { MultipleFileInputComponent } from "../../../../shared/components/custom-inputs/multiple-file-input/multiple-file-input.component";

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


  constructor() { }

    isOpen = false;

    onExpand() {
      this.isOpen = !this.isOpen;
    }

 }
