import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GraphQLQueryBuilder } from '../GraphQlQueryBuilder';
import { Result } from '../Result.type';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private graphqlEndpoint =
    // 'https://0f81-179-60-117-159.ngrok-free.app/graphql';
    environment.api_url;

  async getAll(
    params: { [key: string]: any } = {}
  ): Promise<Result<any, string>> {
    try {
      const queryBuilder = new GraphQLQueryBuilder();
      const query = queryBuilder
        .setRootType('query')
        .openBlock('patients')
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
        .closeBlock() // Closes `doctors`
        .close() // Closes the root query block
        .build();

      const { patients, errors } = await GraphQLQueryBuilder.fetchQuery(
        query,
        this.graphqlEndpoint
      );

      if (errors) {
        return { isSuccess: false, error: errors[0].message };
      }

      return { isSuccess: true, value: patients };
    } catch (error: any) {
      return { isSuccess: false, error: error.message };
    }
  }

  async getById(id: number): Promise<Result<any, string>> {
    try {
      const queryBuilder = new GraphQLQueryBuilder();
      const query = queryBuilder
        .setRootType('query')
        .addFieldWithArgs('patient', { id })
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
        .closeBlock() // Closes `user`
        .closeBlock() // Closes `doctors`
        .close() // Closes the root query block
        .build();

      const { patients, errors } = await GraphQLQueryBuilder.fetchQuery(
        query,
        this.graphqlEndpoint
      );

      if (errors) {
        return { isSuccess: false, error: errors[0].message };
      }

      return { isSuccess: true, value: patients };
    } catch (error: any) {
      return { isSuccess: false, error: error.message };
    }
  }

  async create(
    input: { [key: string]: any },
    params?: { [key: string]: any }
  ): Promise<Result<any, string>> {
    const mutationBuilder = new GraphQLQueryBuilder();

    // Add the createDoctor mutation with input variable
    mutationBuilder
      .setRootType('mutation')
      .addFieldWithArgs('createPatient', { input }) // Correctly binding the input variable
      .addField('id')
      .addField('address')
      .addField('phone')
      .addField('birthdate')
      .openBlock('user') // Open the user block for user fields
      .addField('id')
      .addField('fullName')
      .addField('email')
      .openBlock('roles')
      .addField('id')
      .addField('name')
      .closeBlock() // Close roles block
      .closeBlock() // Close user block
      .closeBlock() // Close createDoctor block
      .closeBlock();

    // Build the full mutation string
    const mutation = mutationBuilder.build();

    console.log('Generated Mutation:', mutation);

    // Ensure proper query formatting
   try{
    const { createPatient, errors } = await GraphQLQueryBuilder.fetchQuery(
      mutation,
      this.graphqlEndpoint
    );

    if (errors) {
      return { isSuccess: false, error: errors[0].message };
    }

    return { isSuccess: true, value: createPatient };

   }catch(error : any) {
      return { isSuccess: false, error: error.message };
   }
  }
}
