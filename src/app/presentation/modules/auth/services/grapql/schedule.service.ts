import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GraphQLQueryBuilder } from '../GraphQlQueryBuilder';
import { Result } from '../Result.type';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private graphqlEndpoint =
    // 'https://0f81-179-60-117-159.ngrok-free.app/graphql';
    environment.api_url;

  constructor() {}

  //   mutation {
  //     createDoctorShedule (input: {
  //         dayOfWeek: 1 # 1 Lunes, 2 Martes, ....
  //         startTime: "08:30" # "HH:mm" Hora y minutos
  //         endTime: "12:30" # "HH:mm"
  //         slotDuration: "00:30" # HH:mm  1:20  45  1:10 (No se pase de 24 horas)
  //         # Relaciones
  //         doctorId: 1,
  //         specialityId: 1
  //         consultingRoomId: 1
  //     }) {
  //         id
  //         dayOfWeek
  //         startTime
  //         endTime
  //         slotDuration
  //         totalSlots
  //     },

  // }

  // mutation {
  //   createDoctorShedule (input: {
  //       dayOfWeek: 1 # 1 Lunes, 2 Martes, ....
  //       startTime: "08:30" # "HH:mm" Hora y minutos
  //       endTime: "12:30" # "HH:mm"
  //       slotDuration: "00:30" # HH:mm  1:20  45  1:10 (No se pase de 24 horas)
  //       # Relaciones
  //       doctorId: 1,
  //       specialityId: 1
  //       consultingRoomId: 1
  //   }) {
  //       id
  //       dayOfWeek
  //       startTime
  //       endTime
  //       slotDuration
  //       totalSlots

  //   },

  // }

  async loadSchedules(params?: { [key: string]: any }) {
    const mutationBuilder = new GraphQLQueryBuilder();

    // Add the createDoctorSchedule mutation

    const query = mutationBuilder
      .setRootType('query')
      .openBlock('doctorShedules')
      .addField('id')
      .addField('dayOfWeek')
      .addField('startTime')
      .addField('endTime')
      .addField('slotDuration')
      .addField('totalSlots')
      .addField('status')
      .openBlock('doctor')
      .addField('id')
      .addField('code')
      .openBlock('user')
      .addField('id')
      .addField('fullName')
      .closeBlock()
      .closeBlock()
      .openBlock('speciality')
      .addField('id')
      .addField('name')
      .closeBlock()
      .openBlock('consultingRoom')
      .addField('id')
      .addField('roomName')
      .closeBlock()
      .closeBlock()
      .close()
      .build();
    // .setRootType('query')
    // .addFieldWithArgs('doctorShedules', { params })
    // .addField('id')
    // .addField('dayOfWeek')
    // .addField('startTime')
    // .addField('endTime')
    // .addField('slotDuration')
    // .addField('totalSlots')
    // .addField('status')
    // .openBlock('doctor')
    // .addField('id')
    // .addField('code')
    // .openBlock('user')
    // .addField('id')
    // .addField('fullName')
    // .closeBlock()
    // .closeBlock()
    // .openBlock('speciality')
    // .addField('id')
    // .addField('name')
    // .closeBlock()
    // .openBlock('consultingRoom')
    // .addField('id')
    // .addField('roomName')
    // .closeBlock()
    // .closeBlock()
    // .close()  // Close the doctorShedules block
    // .build();

    const { doctorShedules, errors } = await GraphQLQueryBuilder.fetchQuery(
      query,
      this.graphqlEndpoint
    );

    if (errors) {
      return { isSuccess: false, error: errors[0].message };
    }

    return { isSuccess: true, value: doctorShedules };
  }

  // Create a speciality with dynamic fields
  async create(
    input: { [key: string]: any },
    params?: { [key: string]: any }
  ): Promise<Result<any, string>> {
    const mutationBuilder = new GraphQLQueryBuilder();

    // Add the createDoctorSchedule mutation

    const mutation = mutationBuilder
      .setRootType('mutation')
      .addFieldWithArgs('createDoctorShedule', { input }) // Add the mutation with input args
      .addField('id')
      .addField('dayOfWeek')
      .addField('startTime')
      .addField('endTime')
      .addField('slotDuration')
      .addField('totalSlots')
      .openBlock('doctor')
      .addField('id')
      .addField('code')
      .openBlock('user')
      .addField('id')
      .addField('fullName')
      .closeBlock()
      .closeBlock()
      .openBlock('speciality')
      .addField('id')
      .addField('name')
      .closeBlock()
      .openBlock('consultingRoom')
      .addField('id')
      .addField('roomName')
      .closeBlock()
      .close()
      .closeBlock()
      .build();

    const { createDoctorShedule, errors } =
      await GraphQLQueryBuilder.fetchQuery(mutation, this.graphqlEndpoint);

    if (errors) {
      return { isSuccess: false, error: errors[0].message };
    }

    return { isSuccess: true, value: createDoctorShedule };
  }

  // Update a speciality with dynamic fields
}
