import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authorizationTokenInterceptor } from '@core/interceptors/authorization-token.interceptor';
import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ToastComponent } from '@shared/components/toast/toast.component';

@NgModule({
  declarations: [
    PrivateComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrivateRoutingModule,
    ToastComponent
],
  providers:[
    provideHttpClient(
      withInterceptors([authorizationTokenInterceptor])
    )
  ]
})
export class PrivateModule { }
