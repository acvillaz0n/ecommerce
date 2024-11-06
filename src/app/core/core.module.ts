import { NgModule } from '@angular/core';
import { authorizationTokenInterceptor } from './interceptors/authorization-token.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

@NgModule({
  providers:[
    provideHttpClient(
      withInterceptors([authorizationTokenInterceptor])
    )
  ]
})
export class CoreModule { }
