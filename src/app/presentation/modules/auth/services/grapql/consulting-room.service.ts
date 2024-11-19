import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GraphQLQueryBuilder } from '../GraphQlQueryBuilder';
import { Result } from '../Result.type';

@Injectable({
  providedIn: 'root'
})
export class ConsultingRoomService {

  private graphqlEndpoint =
  // 'https://0f81-179-60-117-159.ngrok-free.app/graphql';
  environment.api_url;

// Fetch specialties with dynamic fields
async getAll(
  params: { [key: string]: any } = {}
): Promise<Result<any, string>> {
  try {
    const queryBuilder = new GraphQLQueryBuilder();
    const query = queryBuilder
      .setRootType('query')
      .openBlock('consultingRooms')
      .addFieldsFromParams(params) // Dynamically add fields
      .closeBlock()
      .close()
      .build();

    const {consultingRooms ,errors} = await GraphQLQueryBuilder.fetchQuery(query, this.graphqlEndpoint);



    if (errors) {
      return { isSuccess: false, error: errors[0].message };
    }

    return { isSuccess: true, value: consultingRooms };
  } catch (error: any) {
    return { isSuccess: false, error: error.message };
  }
}

// Fetch speciality by ID with dynamic fields
async getById(
  id: string,
  params: { [key: string]: any } = {}
): Promise<Result<any, string>> {
  try {
    const queryBuilder = new GraphQLQueryBuilder();
    const query = queryBuilder
      .addFieldWithArgs('consultingRoom', { id })
      .openBlock('consultingRoom')
      .addFieldsFromParams(params) // Dynamically add fields
      .closeBlock()
      .close()
      .build();
    const { consultingRoom, errors } = await GraphQLQueryBuilder.fetchQuery(query, this.graphqlEndpoint);

    if (errors) {
      return { isSuccess: false, error: errors[0].message };
    }

    return { isSuccess: true, value: consultingRoom };
  } catch (error: any) {
    return { isSuccess: false, error: error.message };
  }
}

// Create a speciality with dynamic fields
async create(input: { [key: string]: any }, params? : {[key:string] :any}): Promise<Result<any, string>> {
  try {
    const mutationBuilder = new GraphQLQueryBuilder();
    const mutation = mutationBuilder
      .setRootType('mutation')
      .addFieldWithArgs('createConsultingRoom', { input }) // Add the mutation with input args
      .addFieldsFromParams(params?? {})
      .closeBlock() // Close the createSpeciality block
      .close() // Close the root mutation
      .build();

    const resp = await GraphQLQueryBuilder.fetchQuery(mutation, this.graphqlEndpoint);

    // {"data":{"createSpeciality":{"id":"16","name":"sucha"}}}
    if (resp.errors) {
      return { isSuccess: false, error: resp.errors[0].message };
    }

    return { isSuccess: true, value: resp.createConsultingRoom };


  } catch (error: any) {
    return { isSuccess: false, error: error.message };
  }
}

// Update a speciality with dynamic fields
async update(
  id: string,
  input: { [key: string]: any },
  params : {[key:string] :any}
): Promise<Result<any,string>> {
  try{
    const mutationBuilder = new GraphQLQueryBuilder();

    const mutation = mutationBuilder
      .setRootType('mutation') // Set the root type to 'mutation'
      .addFieldWithArgs('updateConsultingRoom', { id, input}) // Add the mutation field with args (id and params)
      .addFieldsFromParams(params?? {})
      .closeBlock() // Close the createSpeciality block
      .close() // Close the root mutation
      .build();

    const resp = await GraphQLQueryBuilder.fetchQuery(mutation, this.graphqlEndpoint);

    if (resp.errors) {
      return { isSuccess: false, error: resp.errors[0].message };
    }

    return { isSuccess: true, value: resp.updateConsultingRoom };

  }catch(error : any) {
    return { isSuccess: false, error: error.message };
  }
}

// Delete a speciality
async delete(id: string): Promise<Result<any, string>> {
  try {
    const mutationBuilder = new GraphQLQueryBuilder();
    const mutation = mutationBuilder
      .setRootType('mutation')
      .addDeleteMutation('deleteConsultingRoom', { id }) // Mutation without returning any fields
      .build();

    const resp = await GraphQLQueryBuilder.fetchQuery(mutation, this.graphqlEndpoint);

    if (resp.errors) {
      return { isSuccess: false, error: resp.errors[0].message };
    }

    return { isSuccess: true, value: resp.deleteConsultingRoom }; // No return data expected
  } catch (error: any) {
    return { isSuccess: false, error: error.message };
  }
}


}
