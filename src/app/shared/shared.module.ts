import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectableListComponent } from './components/selectable-list/selectable-list.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SelectableListComponent,
    ToastComponent
  ],
  exports:[SelectableListComponent,ToastComponent]
})
export class SharedModule { }
