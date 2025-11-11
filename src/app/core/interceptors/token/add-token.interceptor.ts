import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../../../features/authentication/services/storage.service';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService)


  req = req.clone({
    setHeaders: {
      authorization: 'Bearer '+storage.getToken() || '',
    },
  });



  return next(req);
};
