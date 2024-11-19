import { CommonModule, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { AppointmentHedaerComponent } from '../../components/appointment/appointment-hedaer/appointment-hedaer.component';
import { AppointmentListItemsComponent } from '../../components/appointment/appointment-list-items/appointment-list-items.component';
import { FormControl } from '@angular/forms';
import { InputTextComponent } from '../../../shared/components/form-inputs/input-text/input-text.component';
import { FormTemplateComponent } from '../../../shared/components/form-template/form-template.component';
import { ModalFormComponent } from '../../../shared/components/modal-form/modal-form.component';
import { ActionType } from '../../../shared/enum/action';
import { DialogService } from '../../../shared/services/Dialog.service';
import { ModalService } from '../../../shared/services/Modal.service';
import { DynamicForm } from '../../../shared/types/dynamic.types';
import { ItemList } from '../../../shared/components/item-list/interfaces/ItemList.interfaces';
import { InputSelectComponent } from '../../../shared/components/form-inputs/input-select/input-select.component';
import { DcDirective } from '../../../shared/directives/dc.directive';
import { AppointmentDetailComponent } from '../../components/appointment/appointment-detail/appointment-detail.component';
import { AppointmentsService } from '../../../../../services/grapql/appointments.service';
import { Subject } from 'rxjs';
import { Appointment } from '../../../../../models/appointment.model';
import { responseModalFormMapper } from '../../../shared/utils/mappers/response-modal-form/response-modal-form';
import { InputDateComponent } from '../../../shared/components/form-inputs/input-date/input-date.component';
import { CustomService } from '../../../../../services/grapql/custom.service';
import { SelectComponent } from '../../../shared/components/custom-inputs/select/select.component';
import { generateCsv, downloadCSV } from '../../../../utils/reports.utils';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    CommonModule,
    AppointmentHedaerComponent,
    NgClass,
    AppointmentListItemsComponent,
    DcDirective,
  ],
  templateUrl: './appointment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentComponent implements OnInit {
  ngOnInit(): void {
    this.loadItems();
    this.onLoadListViews();
  }
  onShowItem: boolean = false;
  private modalService = inject(ModalService);
  private dialogService = inject(DialogService);
  private cdr = inject(ChangeDetectorRef);
  private appointmentsService = inject(AppointmentsService);
  private customService = inject(CustomService);

  @ViewChild(DcDirective) dcWrapper!: DcDirective;

  onItemSelected() {
    const viewContainerRef = this.dcWrapper.viewContainerRef;

    viewContainerRef.clear();

    const componentFactory = viewContainerRef.createComponent(
      AppointmentDetailComponent
    );
    // componentFactory.instance.outputdetailListener = this.outputDetailListener;
    // componentFactory.instance.outputProduct = outputProduct;

    this.onShowItem = true;
  }

  schedules: ItemList[] = [];

  patients: ItemList[] = [];

  doctors: ItemList[] = [];
  specialties: ItemList[] = [];

  appointments: Appointment[] = [];

  onAddAppointment() {
    const addForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Cita',
        description: 'Espeficicaciones necesarias de la cita a agregar',
      },
      dynamicFields: [
        {
          component: InputSelectComponent,
          data: {
            title: 'Cita',
            items: this.schedules,
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component: InputSelectComponent,
          data: {
            title: 'Paciente',
            items: this.patients,
          },
          fieldFormControl: new FormControl(''),
        },
      ],
    };

    this.modalService.open(ModalFormComponent, {
      title: `Agregar Cita`,
      size: 'sm',
      forms: [addForm],
      data: {},
      icon: 'assets/icons/heroicons/outline/plus.svg',
      actions: [
        {
          action: ActionType.Create,
          title: 'Agregar',
        },
      ],
    });
  }

  async loadItems() {
    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });

    const result = await this.appointmentsService.getItems();

    notifierDialog.next(0);

    if (!result.isSuccess) {
      this.dialogService.showError({
        description: result.error,
      });
      return;
    }

    this.appointments = result.value;

    this.cdr.detectChanges();
  }

  async onLoadListViews() {
    const result = await this.customService.loadDoctorsSchedulesPatients();

    if (!result.isSuccess) {
      this.dialogService.showError({
        description: result.error,
      });
      return;
    }

    const { doctors, specialties, patients } = result.value;

    // console.log({doctors, specialties, patients});
    this.doctors = doctors;
    this.specialties = specialties;
    this.patients = patients;
    this.cdr.detectChanges();
  }

  onGenerateReport() {

    console.log(this.doctors, this.specialties, this.patients);
    const reportForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Parametros de Reporte',
        description: 'Filtros necesarios para generar el reporte',
      },
      dynamicFields: [
        {
          component: InputSelectComponent,
          data: {
            title: 'Especialidades',
            items: this.specialties,
            id: 'specialityId',
          },
          fieldFormControl: new FormControl(),
        },
        {
          component: InputSelectComponent,
          data: {
            title: 'Doctores',
            items: this.doctors.map((doctor: any) => {
              return {
                id: doctor.id,
                name: doctor.user.fullName,
              };
            }),
            id: 'doctorId',
          },
          fieldFormControl: new FormControl(),
        },
        {
          component: InputSelectComponent,
          data: {
            title: 'Pacientes',
            items: this.patients.map((patient: any) => {
              return {
                id: patient.id,
                name: patient.user.fullName,
              };
            }),
            id: 'patientId',
          },
          fieldFormControl: new FormControl(),
        },
      ],
    };

    this.modalService
      .open(ModalFormComponent, {
        title: `Generar Reporte`,
        size: 'sm',
        forms: [reportForm],
        data: {},
        icon: 'assets/icons/heroicons/outline/plus.svg',
        actions: [
          {
            action: ActionType.Create,
            title: 'Generar',
          },
        ],
      })
      .subscribe({
        next: (resp) => {
          const response = responseModalFormMapper(resp);

          const responseMapped: any = {
            date: response.date,
            specialityId: response.specialityId,
            doctorId: response.doctorId,
            patientId: response.patientId,
          };

          const params = Object.keys(responseMapped).reduce(
            (acc: any, key: string) => {
              if (
                responseMapped[key] !== null &&
                responseMapped[key] !== undefined
              ) {
                acc[key] = responseMapped[key];
              }
              return acc;
            },
            {}
          );

          this.createReport(params);

          // this.inputFacadeService.createReport(params);
        },
        error: (err) => {
          console.log({ err });
        },
        complete: () => {
          console.log('Complete');
        },
      });
  }


  async createReport(params : {[key:string] : any}){

    const notifierDialog: Subject<any> = new Subject();
    this.dialogService.showLoading({
      description: 'Cargando',
      listener: notifierDialog,
    });


    const result = await this.appointmentsService.getByParams(params);

    notifierDialog.next(0);

    if(!result.isSuccess){
      this.dialogService.showError({
        description : result.error
      })
    }

    if(result.value.length === 0){
      this.dialogService.showAlert({
        description : 'No se encontraron registros'
      });
      return
    }

    const reportData = result.value.map((appointment: Appointment) => {
      return {
        id: appointment.id,
        date: appointment.appointmentDate,
        status: appointment.status,
        patient: appointment.patient.user.fullName,
        doctor: appointment.doctorShedule.doctor.user.fullName,
        specialty: appointment.doctorShedule.speciality.name,
      };
    });






    const csvContent = generateCsv(reportData);
    downloadCSV(csvContent, 'reporte.csv');



    this.dialogService.ShowSuccess({
      description : 'Reporte generado'
    })
  }
}
