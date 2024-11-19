import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GraphQLQueryBuilder } from '../GraphQlQueryBuilder';
import { Result } from '../Result.type';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
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
        .openBlock('doctors')
        .addField('id')
        .addField('code')
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

      const { doctors, errors } = await GraphQLQueryBuilder.fetchQuery(
        query,
        this.graphqlEndpoint
      );

      if (errors) {
        return { isSuccess: false, error: errors[0].message };
      }

      return { isSuccess: true, value: doctors };
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
      const { consultingRoom, errors } = await GraphQLQueryBuilder.fetchQuery(
        query,
        this.graphqlEndpoint
      );

      if (errors) {
        return { isSuccess: false, error: errors[0].message };
      }

      return { isSuccess: true, value: consultingRoom };
    } catch (error: any) {
      return { isSuccess: false, error: error.message };
    }
  }

  // Create a speciality with dynamic fields
  async create(
    input: { [key: string]: any },
    params?: { [key: string]: any }
  ): Promise<Result<any, string>> {
    const mutationBuilder = new GraphQLQueryBuilder();

    // Add the createDoctor mutation with input variable
    mutationBuilder
      .addFunctionWithArgs('createDoctor', {input : '$input'}) // Correctly binding the input variable
      .addField('id')
      .addField('code')
      .openBlock('user') // Open the user block for user fields
      .addField('fullName')
      .addField('email')
      .closeBlock() // Close user block
      .closeBlock(); // Close createDoctor block

    // Build the full mutation string
    const mutation = mutationBuilder.build();

    console.log('Generated Mutation:', mutation);

    // Ensure proper query formatting
    const query = `mutation CreateDoctor($input: DoctorInput!) { ${mutation} }`;

    // Construct the final payload query
    const payload = {
      query,
      variables: { input },  // Pass the actual input data here
    };

    try {
      // Make the GraphQL request
      const response = await fetch(environment.api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Sending the request with the payload
      });

      const resp = await response.json();

      if (resp.errors) {
        console.error('GraphQL Error:', resp.errors[0].message);
        return { isSuccess: false, error: resp.errors[0].message }; // Return error if there are GraphQL errors
      }

      console.log('Mutation Success:', resp.data.createDoctor);
      return { isSuccess: true, value: resp.data.createDoctor }; // Return success with the response data
    } catch (error: any) {
      console.error('Error:', error.message);
      return { isSuccess: false, error: error.message }; // Handle any network errors
    }
  }


  // Update a speciality with dynamic fields
  async update(
    id: string,
    input: { [key: string]: any },
    params?: { [key: string]: any }
  ): Promise<Result<any, string>> {
    try{
      const mutationBuilder = new GraphQLQueryBuilder();

      const mutation = mutationBuilder
        .setRootType('mutation') // Set the root type to 'mutation'
        .addFieldWithArgs('updateDoctor', { id, input}) // Add the mutation field with args (id and params)
        .addField('id')
        .addField('code')
        .openBlock('user') // Open the user block for user fields
        .addField('id')
        .addField('fullName')
        .addField('email')

        .closeBlock() // Close the createSpeciality block
        .close() // Close the root mutation
        .close()
        .build();

      const resp = await GraphQLQueryBuilder.fetchQuery(mutation, this.graphqlEndpoint);

      if (resp.errors) {
        return { isSuccess: false, error: resp.errors[0].message };
      }

      return { isSuccess: true, value: resp.updateDoctor };

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
        .addDeleteMutation('deleteDoctor', { id }) // Mutation without returning any fields
        .build();

      const resp = await GraphQLQueryBuilder.fetchQuery(
        mutation,
        this.graphqlEndpoint
      );

      if (resp.errors) {
        return { isSuccess: false, error: resp.errors[0].message };
      }

      return { isSuccess: true, value: resp.deleteConsultingRoom }; // No return data expected
    } catch (error: any) {
      return { isSuccess: false, error: error.message };
    }
  }
}
