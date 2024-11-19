import { Appointment } from "./appointment.model";

export interface Consultation {
  id : number;
  consultation_date : string;
  diagnosis : string;
  status : number;
  consultation : Appointment;
}
