import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authorizationTokenInterceptor } from '@core/interceptors/authorization-token.interceptor';
import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SharedModule } from '@shared/shared.module';
import { loadingInterceptor } from '@core/interceptors/loading.interceptor';

@NgModule({
  declarations: [
    PrivateComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PrivateRoutingModule,
],
  providers:[
    provideHttpClient(
      withInterceptors([authorizationTokenInterceptor,loadingInterceptor]))
  ]
})
export class PrivateModule { }
