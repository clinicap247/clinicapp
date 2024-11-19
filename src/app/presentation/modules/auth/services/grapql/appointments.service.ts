import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Result } from '../Result.type';
import { GraphQLQueryBuilder } from '../GraphQlQueryBuilder';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  // query MyQuery {
  //   appointments {
  //     appointmentDate
  //     id
  //     slotNumber
  //     status
  //     doctorShedule {
  //       dayOfWeek
  //       endTime
  //       doctor {
  //         code
  //         id
  //       }
  //       id
  //       slotDuration
  //       speciality {
  //         id
  //         name
  //       }
  //       startTime
  //       status
  //       totalSlots
  //     }
  //   }
  // }


  private graphqlEndpoint =
  // 'https://0f81-179-60-117-159.ngrok-free.app/graphql';
  environment.api_url;


  constructor() {

  }


  async getItems() : Promise<Result<any, string>> {

    //Add on fields with the example of the top
    try {
      const queryBuilder = new GraphQLQueryBuilder();
      const query = queryBuilder
        .setRootType('query')
        .openBlock('appointments')
        .addField('appointmentDate')
        .addField('id')
        .addField('slotNumber')
        .addField('status')
        .openBlock('doctorShedule')
        .addField('dayOfWeek')
        .addField('endTime')
        .openBlock('doctor')
        .addField('code')
        .addField('id')
        .closeBlock()
        .addField('id')
        .addField('slotDuration')
        .openBlock('speciality')
        .addField('id')
        .addField('name')
        .closeBlock()
        .addField('startTime')
        .addField('status')
        .addField('totalSlots')
        .closeBlock()
        .openBlock('patient')
        .addField('id')
        .addField('address')
        .addField('phone')
        .addField('birthdate')
        .openBlock('user')
        .addField('id')
        .addField('fullName')
        .addField('email')
        .openBlock('roles')
        .addField('id')
        .addField('name')
        .closeBlock()
        .closeBlock() // Closes `user`
        .closeBlock()
        .close()
        .close()
        .build();
         // Dynamically add fields

      const {appointments ,errors} = await GraphQLQueryBuilder.fetchQuery(query, this.graphqlEndpoint);

      if (errors) {
        return { isSuccess: false, error: errors[0].message };
      }

      return { isSuccess: true, value: appointments };
    } catch (error: any) {
      return { isSuccess: false, error: error.message };
    }

  }


  async createItem(
    input: { [key: string]: any },
    params?: { [key: string]: any }
  ): Promise<Result<any, string>> {
    try {
      const mutationBuilder = new GraphQLQueryBuilder();
      const mutation = mutationBuilder
        .setRootType('mutation')
        .addFieldWithArgs('createAppointment', { input }) // Add the mutation with input args
        .addField('appointmentDate')
        .addField('id')
        .addField('slotNumber')
        .addField('status')
        .openBlock('doctorShedule')
        .addField('dayOfWeek')
        .addField('endTime')
        .openBlock('doctor')
        .addField('code')
        .addField('id')
        .closeBlock()
        .addField('id')
        .addField('slotDuration')
        .openBlock('speciality')
        .addField('id')
        .addField('name')
        .closeBlock()
        .addField('startTime')
        .addField('status')
        .addField('totalSlots')
        .closeBlock()
        .close()
        .build();

      const { createAppointment, errors } = await GraphQLQueryBuilder.fetchQuery(mutation, this.graphqlEndpoint);

      if (errors) {
        return { isSuccess: false, error: errors[0].message };
      }

      return { isSuccess: true, value: createAppointment };


    }catch(error : any) {
      return { isSuccess: false, error: error.message };

    }

  }


  async getByParams(params : {[key:string] :any}) {
    try {
      const queryBuilder = new GraphQLQueryBuilder();
      const query = queryBuilder
        .setRootType('query')
        .addFieldWithArgs('appointments', { params }) // Dynamically add fields
        .addField('appointmentDate')
        .addField('id')
        .addField('slotNumber')
        .openBlock('patient')
        .addField('id')
        .addField('address')
        .addField('phone')
        .addField('birthdate')
        .openBlock('user')
        .addField('id')
        .addField('fullName')
        .addField('email')
        .openBlock('roles')
        .addField('id')
        .addField('name')
        .closeBlock()
        .closeBlock() // Closes `user`
        .closeBlock()
        .addField('status')
        .openBlock('doctorShedule')
        .addField('dayOfWeek')
        .addField('endTime')
        .openBlock('doctor')
        .addField('code')
        .addField('id')
        .openBlock('user')
        .addField('id')
        .addField('fullName')
        .closeBlock()
        .closeBlock()
        .addField('id')
        .addField('slotDuration')
        .openBlock('speciality')
        .addField('id')
        .addField('name')
        .closeBlock()
        .addField('startTime')
        .addField('status')
        .addField('totalSlots')
        .closeBlock()
        .close()
        .close()
        .build();

      const {appointments ,errors} = await GraphQLQueryBuilder.fetchQuery(query, this.graphqlEndpoint);

      if (errors) {
        return { isSuccess: false, error: errors[0].message };
      }



      return { isSuccess: true, value: appointments };
    } catch (error: any) {
      return { isSuccess: false, error: error.message };
    }
  }




}
