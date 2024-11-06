import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

let activeRequest = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingSvc = inject(LoadingService);
  loadingSvc.show();
  activeRequest++;
  return next(req).pipe(
    finalize(() => {
      activeRequest--;
      if(activeRequest==0){
        loadingSvc.hide();
      }
    })
  );
};
