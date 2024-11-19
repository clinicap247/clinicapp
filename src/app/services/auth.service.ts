import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _http = inject(HttpClient);

  _api = 'https://8a6b-179-60-117-159.ngrok-free.app/login';

  constructor() { }

  login(email : string, password : string) {
    return this._http.post(this._api, { email, password }).pipe(
      map((response : any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', email);
        return response;
      })
    )
  }

}
