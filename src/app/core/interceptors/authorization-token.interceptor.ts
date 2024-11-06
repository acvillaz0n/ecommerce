import { HttpInterceptorFn } from '@angular/common/http';

export const authorizationTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization', `${btoa("EstaEsUnaPrueba")}`),
  });
  return next(reqWithHeader);
};
