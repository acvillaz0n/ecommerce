import { NgModule } from '@angular/core';
import { authorizationTokenInterceptor } from './interceptors/authorization-token.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingService } from './services/loading.service';
import { loadingInterceptor } from './interceptors/loading.interceptor';

@NgModule({
  imports:[LoadingComponent],
  exports:[LoadingComponent],
  providers:[
    LoadingService,
    provideHttpClient(
      withInterceptors([authorizationTokenInterceptor, loadingInterceptor])
    )
  ]
})
export class CoreModule { }
