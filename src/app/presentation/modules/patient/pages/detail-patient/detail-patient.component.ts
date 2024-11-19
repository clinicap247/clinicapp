import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
import { AppointmentsService } from '../../../../../services/grapql/appointments.service';
import { Appointment } from '../../../../../models/appointment.model';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../../../../../models/patient.model';

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
export class DetailPatientComponent implements OnInit {
  ngOnInit(): void {

    this.loadAppointments();
  }



  appointments : Appointment[] = [];

  patient? : Patient

  private activatedRoute = inject(ActivatedRoute);
  private modalService = inject(ModalService);
  private dialogService = inject(DialogService);
  private cdr = inject(ChangeDetectorRef);
  private appointmentsService = inject(AppointmentsService);


  async loadAppointments() {



    const patientId = this.activatedRoute.snapshot.params['id'];

    const result = await this.appointmentsService.getByParams({patientId: parseInt(patientId)});

    if(!result.isSuccess){
      this.dialogService.showError({
        description : result.error
      })
    };


    this.appointments = result.value;

    this.patient = this.appointments[0].patient;


    this.cdr.detectChanges();

  }





 }
