import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputTextComponent } from '../../../shared/components/form-inputs/input-text/input-text.component';
import { FormTemplateComponent } from '../../../shared/components/form-template/form-template.component';
import { ModalFormComponent } from '../../../shared/components/modal-form/modal-form.component';
import { ActionType } from '../../../shared/enum/action';
import { DialogService } from '../../../shared/services/Dialog.service';
import { ModalService } from '../../../shared/services/Modal.service';
import { DynamicForm } from '../../../shared/types/dynamic.types';
import { DetailPatientHeaderComponent } from "../../components/detail-patient/detail-patient-header/detail-patient-header.component";
import { DetailPatientProfileComponent } from "../../components/detail-patient/detail-patient-profile/detail-patient-profile.component";
import { DetailPatientAppointmentComponent } from "../../components/detail-patient/detail-patient-appointment/detail-patient-appointment.component";

@Component({
  selector: 'app-detail-patient',
  standalone: true,
  imports: [
    CommonModule,
    DetailPatientHeaderComponent,
    DetailPatientProfileComponent,
    DetailPatientAppointmentComponent
],
  templateUrl: './detail-patient.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPatientComponent {


 }
