import { Doctor } from "./doctor.model";
import { DoctorSchedule } from "./doctorSchedule.model";
import { Patient } from "./patient.model";

export interface Appointment {
  id : number;
  appointmentDate : string;
  slot_number : number;
  status : number;
  patient : Patient;
  doctorShedule : DoctorSchedule;

}
