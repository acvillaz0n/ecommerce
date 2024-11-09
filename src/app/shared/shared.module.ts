import { NgModule } from '@angular/core';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  imports: [
    ToastComponent
  ],
  exports:[ToastComponent]
})
export class SharedModule { }
