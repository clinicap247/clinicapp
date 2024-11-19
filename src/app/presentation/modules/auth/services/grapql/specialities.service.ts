import { Injectable } from '@angular/core';
import { GraphQLQueryBuilder } from '../GraphQlQueryBuilder';
import { Result } from '../Result.type';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {
  private graphqlEndpoint =
    // 'https://0f81-179-60-117-159.ngrok-free.app/graphql';
    environment.api_url;

  // Fetch specialties with dynamic fields
  async getSpecialties(
    params: { [key: string]: any } = {}
  ): Promise<Result<any, string>> {
    try {
      const queryBuilder = new GraphQLQueryBuilder();
      const query = queryBuilder
        .setRootType('query')
        .openBlock('specialities')
        .addFieldsFromParams(params) // Dynamically add fields
        .closeBlock()
        .close()
        .build();

      const {specialities ,errors} = await GraphQLQueryBuilder.fetchQuery(query, this.graphqlEndpoint);



      if (errors) {
        return { isSuccess: false, error: errors[0].message };
      }

      return { isSuccess: true, value: specialities };
    } catch (error: any) {
      return { isSuccess: false, error: error.message };
    }
  }

  // Fetch speciality by ID with dynamic fields
  async getspecialityById(
    id: string,
    params: { [key: string]: any } = {}
  ): Promise<Result<any, string>> {
    try {
      const queryBuilder = new GraphQLQueryBuilder();
      const query = queryBuilder
        .addFieldWithArgs('speciality', { id })
        .openBlock('speciality')
        .addFieldsFromParams(params) // Dynamically add fields
        .closeBlock()
        .close()
        .build();
      const { data, errors } = await GraphQLQueryBuilder.fetchQuery(query, this.graphqlEndpoint);

      if (errors) {
        return { isSuccess: false, error: errors[0].message };
      }

      return { isSuccess: true, value: data.speciality };
    } catch (error: any) {
      return { isSuccess: false, error: error.message };
    }
  }

  // Create a speciality with dynamic fields
  async createspeciality(input: { [key: string]: any }, params? : {[key:string] :any}): Promise<Result<any, string>> {
    try {
      const mutationBuilder = new GraphQLQueryBuilder();
      const mutation = mutationBuilder
        .setRootType('mutation')
        .addFieldWithArgs('createSpeciality', { input }) // Add the mutation with input args
        .addFieldsFromParams(params?? {})
        .closeBlock() // Close the createSpeciality block
        .close() // Close the root mutation
        .build();

      const resp = await GraphQLQueryBuilder.fetchQuery(mutation, this.graphqlEndpoint);

      // {"data":{"createSpeciality":{"id":"16","name":"sucha"}}}
      if (resp.errors) {
        return { isSuccess: false, error: resp.errors[0].message };
      }

      return { isSuccess: true, value: resp.createSpeciality };


    } catch (error: any) {
      return { isSuccess: false, error: error.message };
    }
  }

  // Update a speciality with dynamic fields
  async updatespeciality(
    id: string,
    input: { [key: string]: any },
    params : {[key:string] :any}
  ): Promise<Result<any,string>> {
    try{
      const mutationBuilder = new GraphQLQueryBuilder();

      const mutation = mutationBuilder
        .setRootType('mutation') // Set the root type to 'mutation'
        .addFieldWithArgs('updateSpeciality', {id, input}) // Add the mutation field with args (id and params)
        .addFieldsFromParams(params?? {})
        .closeBlock() // Close the createSpeciality block
        .close() // Close the root mutation
        .build();

      console.log(mutation);

      console.log(input);

      const resp = await GraphQLQueryBuilder.fetchQuery(mutation, this.graphqlEndpoint);

      if (resp.errors) {
        return { isSuccess: false, error: resp.errors[0].message };
      }

      return { isSuccess: true, value: resp.updateSpeciality };

    }catch(error : any) {
      return { isSuccess: false, error: error.message };
    }
  }

  // Delete a speciality
  async deletespeciality(id: string): Promise<Result<any, string>> {
    try {
      const mutationBuilder = new GraphQLQueryBuilder();
      const mutation = mutationBuilder
        .setRootType('mutation')
        .addDeleteMutation('deleteSpeciality', { id }) // Mutation without returning any fields
        .build();

      const resp = await GraphQLQueryBuilder.fetchQuery(mutation, this.graphqlEndpoint);

      if (resp.errors) {
        return { isSuccess: false, error: resp.errors[0].message };
      }

      return { isSuccess: true, value: resp.deleteSpeciality }; // No return data expected
    } catch (error: any) {
      return { isSuccess: false, error: error.message };
    }
  }


}
