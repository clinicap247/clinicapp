import { HttpErrorResponse, HttpStatusCode, type HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { errorHandler } from '../handlers/error.handler';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error) => {
      // console.log('Error por aqui');

      // console.log(error);
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.log(`Error event`);
        } else {
          const errorType = errorHandler(error);
          console.log(error);

          switch (errorType) {
            case HttpStatusCode.BadRequest:
              break;

            case 401:
              localStorage.removeItem('token');
              localStorage.removeItem('email');
              router.navigateByUrl('/auth/login');
              break;
          }

          throw new Error("Expiro la sesion,iniciar nuevamente sesion");
        }
      } else {
        console.log('An error ocurred');
      }
      return throwError(() => new Error(error.statusText));
    })
  )

};
