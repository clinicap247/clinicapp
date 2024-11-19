import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GraphQLQueryBuilder } from '../GraphQlQueryBuilder';
import { Result } from '../Result.type';

@Injectable({
  providedIn: 'root',
})
export class CustomService {
  private graphqlEndpoint =
    // 'https://0f81-179-60-117-159.ngrok-free.app/graphql';
    environment.api_url;

  constructor() {}

  //   query {
  //     doctors {
  //         id
  //         user {
  //             id
  //             fullName
  //         }
  //     }
  //     specialities {
  //         id
  //         name
  //     }
  //     consultingRooms {
  //         id
  //         roomName
  //     }
  // }

  async loadDoctorsSpecialtiesConsultingRooms(): Promise<Result<any, string>> {
    try {
      const queryBuilder = new GraphQLQueryBuilder();
      const query = queryBuilder
        .setRootType('query')
        .openBlock('doctors')
        .addField('id')
        .openBlock('user')
        .addField('id')
        .addField('fullName')
        .closeBlock()
        .closeBlock()
        .openBlock('specialities')
        .addField('id')
        .addField('name')
        .closeBlock()
        .openBlock('consultingRooms')
        .addField('id')
        .addField('roomName')
        .closeBlock()
        .close()
        .build();

      const { errors, doctors, specialities, consultingRooms } =
        await GraphQLQueryBuilder.fetchQuery(query, this.graphqlEndpoint);

      if (errors) {
        return { isSuccess: false, error: errors[0].message };
      }

      return {
        isSuccess: true,
        value: {
          doctors,
          specialties: specialities,
          consultingRooms,
        },
      };
    } catch (error: any) {
      return { isSuccess: false, error: error.message };
    }
  }

  async loadDoctorsSchedulesPatients(): Promise<Result<any, string>> {
    try {
      const queryBuilder = new GraphQLQueryBuilder();
      const query = queryBuilder
        .setRootType('query')
        .openBlock('doctors')
        .addField('id')
        .openBlock('user')
        .addField('id')
        .addField('fullName')
        .closeBlock()
        .closeBlock()
        .openBlock('specialities')
        .addField('id')
        .addField('name')
        .closeBlock()
        .openBlock('patients')
        .addField('id')
        .openBlock('user')
        .addField('fullName')
        .closeBlock()
        .closeBlock()
        .close()
        .build();

      const { errors, doctors, specialities, patients } =
        await GraphQLQueryBuilder.fetchQuery(query, this.graphqlEndpoint);

      if (errors) {
        return { isSuccess: false, error: errors[0].message };
      }

      return {
        isSuccess: true,
        value: {
          doctors,
          specialties: specialities,
          patients,
        },
      };
    } catch (error: any) {
      return { isSuccess: false, error: error.message };
    }
  }
}
