import type { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
//Only when the url is https://clinicapp-drbva9enacewftf0.brazilsouth-01.azurewebsites.net/graphql

//If been for auth pass the request normall

 if (req.url.split('/').includes('auth')) {
  return next(req);
}


  if (!req.url.split('/').includes('graphql')) {
    return next(req);
  }


  const token = localStorage.getItem('token');

  if (token) {
    const newReq= req.clone({
      headers : req.headers.append('Authorization', `Bearer ${token}`),
    });

    console.log(newReq);
    return next(newReq);
  }

  return next(req);


};
