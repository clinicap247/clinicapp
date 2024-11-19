import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {


  private graphqlEndpoint =
  // 'https://0f81-179-60-117-159.ngrok-free.app/graphql';
  environment.api_url;


  constructor() { }




}
