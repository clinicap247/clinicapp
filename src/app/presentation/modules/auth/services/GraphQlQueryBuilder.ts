export class GraphQLQueryBuilder {
  private query: string;

  constructor() {
    this.query = '';
  }

  static async fetchQuery(query: string, endpoint: string) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    if (data.errors) {
      throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
    }
    return data.data;
  }

  // Set the root type as query or mutation
  setRootType(type: 'query' | 'mutation'): this {
    this.query += `${type} {\n`;
    return this;
  }

  // Add a field with arguments (key-value pairs)
  addFieldWithArgs(field: string, args: { [key: string]: any }): this {
    const formatValue = (value: any): string => {
      if (typeof value === 'string') {
        return `"${value}"`;
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        // Recursively format objects for GraphQL argument syntax
        return `{ ${Object.entries(value).map(([k, v]) => `${k}: ${formatValue(v)}`).join(', ')} }`;
      } else {
        return `${value}`;
      }
    };

    const argsString = Object.entries(args)
      .map(([key, value]) => `${key}: ${formatValue(value)}`)
      .join(', ');

    this.query += `  ${field}(${argsString}) {\n`;
    return this;
  }


  addFunctionWithArgs(field: string, args: { [key: string]: any }): this {
    const formatValue = (value: any): string => {
      if (typeof value === 'string') {
        return `${value}`;
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        // Recursively format objects for GraphQL argument syntax
        return `{ ${Object.entries(value).map(([k, v]) => `${k}: ${formatValue(v)}`).join(', ')} }`;
      } else {
        return `${value}`;
      }
    };

    const argsString = Object.entries(args)
      .map(([key, value]) => `${key}: ${formatValue(value)}`)
      .join(', ');

    this.query += `  ${field}(${argsString}) {\n`;
    return this;
  }

  // Open a nested block (for fields within fields)
  openBlock(field: string): this {
    this.query += `    ${field} {\n`;
    return this;
  }

  // Add a field (e.g., 'name', 'id', etc.)
  addField(field: string): this {
    this.query += `      ${field}\n`;
    return this;
  }

  // Close a block (close nested field or action)
  closeBlock(): this {
    this.query += `    }\n`;
    return this;
  }

  // Close the root block of the query
  close(): this {
    this.query += '}\n';
    return this;
  }

  // Build and return the final query string
  build(): string {
    return this.query;
  }

  // Add fields from a params object, based on boolean values
  addFieldsFromParams(params: { [key: string]: any }): this {
    for (const [field, include] of Object.entries(params)) {
      if (include === true) {
        this.addField(field);
      }
    }
    return this;
  }

  // New method to handle deleteSpeciality mutation with no fields to return
  addDeleteMutation(field: string, args: { [key: string]: any }): this {
    const argsString = Object.entries(args)
      .map(([key, value]) => `${key}: "${value}"`) // Format value as string
      .join(', ');

    this.query += `  ${field}(${argsString})\n}\n`;  // No return fields after the mutation name
    return this;
  }

  addMutation(field: string, args: { [key: string]: any }, returnFields: string[]): this {
    this.setRootType('mutation')
      .addFieldWithArgs(field, args);

    returnFields.forEach(field => this.addField(field));

    this.close();
    return this;
  }
}
